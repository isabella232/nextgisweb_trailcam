# -*- coding: utf-8 -*-
from pyramid.httpexceptions import HTTPForbidden, HTTPNotFound
from sqlalchemy.orm.exc import NoResultFound

from nextgisweb.models import DBSession
from ..model import Trailcam


def trailcam_dashboard(request):
    trailcam_id = request.matchdict['trailcam_id']

    try:
        trailcam = DBSession.query(Trailcam).get(trailcam_id)
        trailcam_items = trailcam.items
    except NoResultFound:
        raise HTTPNotFound()

    return {
        'trailcam': trailcam,
        'items_count': len(trailcam_items),
        'request': request
    }
