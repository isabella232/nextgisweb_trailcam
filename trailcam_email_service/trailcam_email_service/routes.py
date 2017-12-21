def includeme(config):
    config.add_static_view('static', 'static', cache_max_age=3600)
    config.add_route('home', '/')
    config.add_route('register_email', '/ngw/email/', request_method='POST')
    config.add_route('unregister_email', '/ngw/email/', request_method='DELETE')
    config.add_route('change_email', '/ngw/email/', request_method='PUT')

    config.add_route('get_messages', '/ngw/messages/', request_method='GET')
