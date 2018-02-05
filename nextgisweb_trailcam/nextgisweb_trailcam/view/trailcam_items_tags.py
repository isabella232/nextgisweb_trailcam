# -*- coding: utf-8 -*-
from pyramid.httpexceptions import HTTPForbidden
from ..model import TrailcamItemTag


def get_tags(request):
    page_size = request.GET['page_size'] if 'page_size' in request.GET else None

    DBSession = request.env.core.DBSession
    query = DBSession.query(TrailcamItemTag)
    if page_size:
        query = query.limit(page_size)
    tags = query.all()

    return [{
        'id': tag.id,
        'name': tag.name,
        'description': tag.description
    } for tag in tags]


def create_tag(request):
    pass


def update_tag(request):
    pass


def delete_tag(request):
    pass
