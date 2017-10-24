# -*- coding: utf-8 -*-
from nextgisweb.env import env
from nextgisweb_trailcam.util import _
from pyramid.httpexceptions import HTTPBadRequest
from nextgisweb import dynmenu as dm

SETTINGS_MODULE_KEY = 'trailcam'
RETRIEVAL_PERIOD_KEY = 'email_retrieval_period'


def trailcam_settings(request):
    request.require_administrator()
    return dict(
        title=_("Trail cameras module settings"),
        dynmenu=request.env.pyramid.control_panel)


def trailcam_settings_get(request):
    request.require_administrator()
    return get_trailcam_settings()


def get_trailcam_settings():
    result = {}

    try:
        result[RETRIEVAL_PERIOD_KEY] = env.core.settings_get(SETTINGS_MODULE_KEY, RETRIEVAL_PERIOD_KEY)
    except KeyError:
        env.core.settings_set(SETTINGS_MODULE_KEY, RETRIEVAL_PERIOD_KEY, 600)
        result[RETRIEVAL_PERIOD_KEY] = 600

    return result


def trailcam_settings_put(request):
    request.require_administrator()

    body = request.json_body
    for k, v in body.iteritems():
        if k == RETRIEVAL_PERIOD_KEY:
            env.core.settings_set(SETTINGS_MODULE_KEY, RETRIEVAL_PERIOD_KEY, v)
        else:
            raise HTTPBadRequest("Invalid key '%s' value!" % k)


def add_to_menu(comp):
    comp.env.pyramid.control_panel.add(
        dm.Link('settings/trailcam', _("Trail cameras"), lambda args: (
            args.request.route_url('pyramid.control_panel.trailcam')))
    )
