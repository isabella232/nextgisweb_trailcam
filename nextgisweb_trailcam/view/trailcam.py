# -*- coding: utf-8 -*-
from nextgisweb.env import env
from nextgisweb_trailcam.util import _
from pyramid.httpexceptions import HTTPBadRequest, HTTPForbidden
from ..util import _4326_to_3857
from ..model import Trailcam


def get_trailcams(request):
    if request.user.keyname == 'guest':
        raise HTTPForbidden()

    trailcams = Trailcam.query() \
        .with_polymorphic('*') \
        .all()

    result = []
    for trailcam in trailcams:
        lon, lat = _4326_to_3857(trailcam.lon, trailcam.lat)
        result.append({
            'name': trailcam.display_name,
            'description': trailcam.description,
            'lon': lon,
            'lat': lat
        })

    return result
