# -*- coding: utf-8 -*-
from .settings import *
from .resource import *
from .trailcam import *
from .util import *


def setup_pyramid(comp, config):
    config.add_route(
        'pyramid.control_panel.trailcam',
        '/control-panel/trailcam'
    ).add_view(trailcam_settings, renderer='nextgisweb_trailcam:template/trailcam_settings.mako')

    config.add_route('trailcam.settings', '/api/component/trailcam/settings') \
        .add_view(trailcam_settings_get, request_method='GET', renderer='json') \
        .add_view(trailcam_settings_put, request_method='PUT', renderer='json')

    config.add_route(
        'trailcam.get_amd_static_url',
        '/trailcam/amd/static/url/',
        client=()).add_view(get_amd_static_url)

    config.add_route('trailcam.trailcams', '/api/trailcam/trailcams') \
        .add_view(get_trailcams, request_method='GET', renderer='json')

    add_to_menu(comp)
