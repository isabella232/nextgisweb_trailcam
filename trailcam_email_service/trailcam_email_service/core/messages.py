from trailcam_email_service.models import DBSession
from trailcam_email_service.models.model import Message, Email
from trailcam_email_service.celery.tasks import get_all_email_messages
from trailcam_email_service.celery.task_id import get_unique_id_task


def run_pull_all_messages(email_connection_id):
    email_connection = DBSession.query(Email).get(email_connection_id)
    email_info = {
        'imap_server': email_connection.imap_server,
        'login': email_connection.login,
        'password': email_connection.password
    }
    task_unique_id = get_unique_id_task('pull_all_messages', {
        'email_id': email_connection_id
    })
    get_all_email_messages.apply_async(args=[email_info], task_id=task_unique_id)


def raw_message_to_message_item(raw_message):
    message_item = Message()
    pass
