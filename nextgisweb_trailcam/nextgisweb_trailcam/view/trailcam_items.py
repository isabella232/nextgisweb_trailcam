# -*- coding: utf-8 -*-
from pyramid.httpexceptions import HTTPForbidden, HTTPNotFound

from ..model import Trailcam
from sqlalchemy.orm.exc import NoResultFound


def trailcam_items_editor(request):
    if request.user.keyname == 'guest':
        raise HTTPForbidden()

    trailcam_id = request.matchdict['trailcam_id']

    try:
        trailcam = Trailcam.query() \
            .with_polymorphic('*') \
            .filter(Trailcam.id == trailcam_id) \
            .one()
    except NoResultFound:
        raise HTTPNotFound()

    trailcam_dict = {
        'id': trailcam.id,
        'name': trailcam.display_name,
        'description': trailcam.description
    }

    return {
        'trailcam_detail': trailcam_dict
    }
