# -*- coding: utf-8 -*-
from pyramid.httpexceptions import HTTPForbidden
from ..model import Trailcam
from ..util import _4326_to_3857
from nextgisweb_trailcam.email_service.trailcam import pull_messages_from_email


def run_pull_trailcam_messages(request):
    trailcam_id = request.matchdict['trailcam_id']

    DBSession = request.env.core.DBSession
    trailcam = DBSession.query(Trailcam).get(trailcam_id)

    return pull_messages_from_email(trailcam)


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
            'id': trailcam.id,
            'name': trailcam.display_name,
            'description': trailcam.description,
            'lon': lon,
            'lat': lat
        })

    return result
