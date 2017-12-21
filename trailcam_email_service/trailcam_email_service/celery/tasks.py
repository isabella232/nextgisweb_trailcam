from __future__ import absolute_import, unicode_literals
import datetime, pickle, imaplib, email, transaction
from .celery import email_celery_app, SqlAlchemySessionTask
from trailcam_email_service.models.model import Email, Message


@email_celery_app.task(name='Checking last email messages')
def check_email_messages():
    pass


@email_celery_app.task(name='Getting all messages from email box', bind=True, base=SqlAlchemySessionTask)
def get_all_email_messages(self, email_info):
    connection = imaplib.IMAP4_SSL(email_info['imap_server'])
    connection.login(email_info['login'], email_info['password'])
    connection.select(readonly=False)

    (result, messages) = connection.uid('search', None, 'ALL')

    if result != 'OK':
        connection.close()
        return False

    messages_uids = messages[0].split(' ')
    email_messages_info = []

    for message_uid in messages_uids:
        try:
            ret, data = connection.uid('fetch', message_uid, '(RFC822)')
        except:
            print 'No new emails to read.'
            connection.close()
            return False

        email_message = email.message_from_string(data[0][1])
        if not isinstance(email_message, str):
            email_messages_info.append((message_uid, email_message))
            print 'Message handled: {0}'.format(email_message.get('Subject'))

    connection.close()

    session = self.db_session()

    email_connection = session.query(Email).get(email_info['id'])

    for email_message_info in email_messages_info:
        email_message = email_message_info[1]

        new_message = Message()
        new_message.uid = email_message_info[0]
        new_message.subject = email_message.get('Subject')

        if email_message.is_multipart():
            for part in email_message.walk():
                part_content_type = part.get_content_type()
                if (part_content_type == 'text/plain') or (part_content_type == 'text/html'):
                    new_message.body = part.get_payload(decode=True)
                if ('application' in part_content_type) or ('image' in part_content_type):
                    new_message.image = part.get_payload(decode=True)
                    new_message.image_name = part.get_filename()

        received_headers = email_message.get_all('Received')
        if received_headers:
            datetime_received_str = received_headers[-1].split(';')[-1]
            datetime_received_tz = email.utils.mktime_tz(email.utils.parsedate_tz(datetime_received_str))
            new_message.message_date_received = datetime.datetime.fromtimestamp(datetime_received_tz)

        message_date_str = email_message.get('Date')
        if message_date_str:
            message_date_tz = email.utils.mktime_tz(email.utils.parsedate_tz(message_date_str))
            new_message.message_date = datetime.datetime.fromtimestamp(message_date_tz)

        new_message.received = datetime.datetime.now()
        new_message.message = pickle.dumps(email_message)
        new_message.email = email_connection

        session.add(new_message)

    transaction.commit()
    session.close()
