from pyramid.view import view_config
from trailcam_email_service.core.email import create_email_connection
from trailcam_email_service.core.ngw import create_ngw
from trailcam_email_service.core.messages import run_pull_all_messages


@view_config(route_name='register_email', renderer='json')
def register_email(request):
    ngw_json = request.json_body
    ngw_info = ngw_json['ngw']
    email_info = ngw_json['email']
    ngw_instance_id = create_ngw(ngw_info)
    email_connection_id = create_email_connection(email_info, ngw_instance_id)
    run_pull_all_messages(email_connection_id)
    return {}
