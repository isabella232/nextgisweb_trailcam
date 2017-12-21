from trailcam_email_service.models import DBSession, Message, Email
from trailcam_email_service.celery.tasks import get_all_email_messages
from trailcam_email_service.celery.task_id import get_unique_id_task
import re


def run_pull_all_messages(email_connection_id):
    email_connection = DBSession.query(Email).get(email_connection_id)
    email_info = {
        'imap_server': email_connection.imap_server,
        'login': email_connection.login,
        'password': email_connection.password,
        'id': email_connection_id
    }
    task_unique_id = get_unique_id_task('pull_all_messages', {
        'email_id': email_connection_id
    })
    get_all_email_messages.apply_async(args=[email_info], task_id=task_unique_id)


def get_messages(email, messages_info):
    messages = email.messages

    if 'regex' in messages_info:
        regex = re.compile(messages_info['regex'])
    else:
        return messages

    messages_filtered = []
    for message in messages:
        match = regex.match(message.subject)
        if match:
            messages_filtered.append((message, match.groupdict()))

    return messages_filtered

