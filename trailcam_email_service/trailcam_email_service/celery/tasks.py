from __future__ import absolute_import, unicode_literals
from .celery import email_celery_app, SqlAlchemySessionTask
import imaplib, email
from email.parser import HeaderParser


@email_celery_app.task(name='Checking last email messages')
def check_email_messages():
    pass


@email_celery_app.task(name='Getting all messages from email box', bind=True, base=SqlAlchemySessionTask)
def get_all_email_messages(self, email_info):
    session = self.db_session()
    session.close()

    connection = imaplib.IMAP4_SSL(email_info['imap_server'])
    connection.login(email_info['login'], email_info['password'])
    connection.select(readonly=False)

    (result, messages) = connection.uid('search', None, 'ALL')

    if result != 'OK':
        connection.close()
        return False

    messages_uids = messages[0].split(' ')

    for message_id in messages_uids:
        try:
            ret, data = connection.uid('fetch', message_id, '(RFC822)')
        except:
            print 'No new emails to read.'
            connection.close()
            return False

        msg = email.message_from_string(data[0][1])
        parser = HeaderParser()
        pmsg = parser.parsestr(data[0][1])
        if not isinstance(msg, str):
            print msg.get('Subject')

    connection.close()
