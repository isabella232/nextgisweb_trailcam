import pyramid
import requests
from nextgisweb.resource.exception import ValidationError
from ..util import _
from .configs import *


def register_email(email_info):
    current_request = pyramid.threadlocal.get_current_request()

    request_json_data = {
        'ngw': {
            'unique_id': get_ngw_unique_id(current_request),
            'name': get_ngw_instance_name(current_request),
            'url': current_request.application_url
        },
        'email': {
            'address': email_info['email'],
            'imap_server': email_info['imap_server'],
            'imap_server_port': email_info['imap_server_port'],
            'description':  email_info['description'] if 'description' in email_info else None,
            'login': email_info['login'],
            'password': email_info['password']
        }
    }

    trailcam_email_service_url = get_trailcam_service_endpoint_url(current_request, 'register_email')
    response = requests.post(trailcam_email_service_url, json=request_json_data)

    status_code = response.status_code
    if status_code == 500:
        raise ValidationError(_('The email is not registered on NextGIS Email System. Try later, please.'))
    elif status_code != 200:
        raise ValidationError(_('NextGIS Email System is unavailable. Try later, please.'))

    return True


