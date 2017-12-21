TRAIL = {
    'register_email': 'ngw/email/',
    'messages': 'ngw/messages/'
}


def get_ngw_instance_name(request):
    return request.env.core.settings_get('core', 'system.full_name')


def get_ngw_unique_id(current_request):
    # TODO: implement support new identification system of NGW instances
    return current_request.env.trailcam.settings['ngw_unique_id']


def get_trailcam_email_service_url(current_request):
    trailcam_email_service_url = current_request.env.trailcam.settings['trailcam_email_service']
    if trailcam_email_service_url[-1:] != '/':
        trailcam_email_service_url += '/'
    return trailcam_email_service_url


def get_trailcam_service_endpoint_url(current_request, endpoint_name, params=dict()):
    endpoint_url = TRAIL[endpoint_name].format(**params)
    full_url = get_trailcam_email_service_url(current_request) + endpoint_url
    return full_url
