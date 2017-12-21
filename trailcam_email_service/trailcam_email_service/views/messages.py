from pyramid.view import view_config
from trailcam_email_service.core.ngw import get_ngw_by_unique_id
import trailcam_email_service.core.messages as core_messages
import json


@view_config(route_name='get_messages', renderer='json')
def get_messages(request):
    json_body = request.json_body
    ngw_info = json_body['ngw']
    messages_info = json_body['messages']
    email_address = json_body['email']['address']
    ngw_instance = get_ngw_by_unique_id(ngw_info)

    email = None
    for email in ngw_instance.emails:
        if email.address == email_address:
            email = email
            break

    if not email:
        raise Exception('Email "{0}" is not assigned to NGW (unique id = "{1}")'.format(
            email_address, ngw_instance.unique_id
        ))

    messages_with_extra = core_messages.get_messages(email, messages_info)

    messages_result = []

    for m in messages_with_extra:
        message_json = m[0].as_json_dict()
        del message_json['message']
        del message_json['email_id']

        message_result = {
            'message': message_json,
            'extra': m[1]
        }
        messages_result.append(message_result)

    return messages_result
