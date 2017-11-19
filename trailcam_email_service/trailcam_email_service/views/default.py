from pyramid.view import view_config


@view_config(route_name='home', renderer='../templates/404.mako')
def my_view(request):
    return {'one': 'werwe', 'project': 'trailcam_email_service'}
