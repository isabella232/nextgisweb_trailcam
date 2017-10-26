# -*- coding: utf-8 -*-
import json
from pyramid.response import Response
from pyramid.view import view_config


@view_config(renderer='json')
def get_amd_static_url(request):
    subpath = request.POST['subpath']

    response = Response(json.dumps({
        'url': request.route_url('amd_package', subpath=subpath)
    }))
    response.content_type = 'application/json'

    return response
