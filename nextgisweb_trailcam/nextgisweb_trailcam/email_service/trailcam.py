import pyramid
import requests
from nextgisweb.resource.exception import ValidationError
from ..util import _
from .configs import *
import dateutil.parser
import datetime
from nextgisweb.models import DBSession
import transaction


def pull_messages_from_email(trailcam):
    email_connection = trailcam.email_connection

    current_request = pyramid.threadlocal.get_current_request()

    request_json_data = {
        'ngw': {
            'unique_id': get_ngw_unique_id(current_request),
            'name': get_ngw_instance_name(current_request),
            'url': current_request.application_url
        },
        'email': {
            'address': email_connection.email
        },
        'messages': {
            'regex': trailcam.filter
        }
    }

    trailcam_email_service_url = get_trailcam_service_endpoint_url(current_request, 'messages')
    response = requests.get(trailcam_email_service_url, json=request_json_data)

    status_code = response.status_code
    if status_code == 500:
        raise ValidationError(_('The email is not registered on NextGIS Email System. Try later, please.'))
    elif status_code != 200:
        raise ValidationError(_('NextGIS Email System is unavailable. Try later, please.'))

    messages_info = response.json()

    from nextgisweb_trailcam.model import TrailcamItem
    session = DBSession()

    for message_info in messages_info:
        new_trailcam_item = TrailcamItem()
        email_message_info = message_info['message']
        new_trailcam_item.email_uid = email_message_info['uid']
        new_trailcam_item.date_received = dateutil.parser.parse(email_message_info['received'])
        new_trailcam_item.name = email_message_info['subject']
        new_trailcam_item.message_body = email_message_info['body']
        new_trailcam_item.file = email_message_info['image']
        new_trailcam_item.file_name = email_message_info['image_name']

        extra = message_info['extra']
        if 'month' in extra and 'day' in extra and 'hour' in extra and 'minutes' in extra:
            datetime_original = datetime.datetime(2017, int(extra['month']), int(extra['day']),
                                                  int(extra['hour']), int(extra['minutes']))
            new_trailcam_item.date_original = datetime_original

        session.add(new_trailcam_item)

    transaction.commit()
    session.close()

    return {
        'count': len(messages_info)
    }
