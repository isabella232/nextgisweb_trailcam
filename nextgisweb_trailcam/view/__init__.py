# -*- coding: utf-8 -*-
from .trailcam_settings import *


def setup_pyramid(comp, config):
    config.add_route(
        'pyramid.control_panel.trailcam',
        '/control-panel/trailcam'
    ).add_view(trailcam_settings, renderer='nextgisweb_trailcam:template/trailcam_settings.mako')

    config.add_route('trailcam.settings', '/api/component/trailcam/settings') \
        .add_view(trailcam_settings_get, request_method='GET', renderer='json') \
        .add_view(trailcam_settings_put, request_method='PUT', renderer='json')
