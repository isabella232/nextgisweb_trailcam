# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from nextgisweb.i18n import trstring_factory
from pyproj import Proj, transform


COMP_ID = 'trailcam'
_ = trstring_factory(COMP_ID)


def _4326_to_3857(lon_4326, lat_4326):
    in_proj = Proj(init='epsg:4326')
    out_proj = Proj(init='epsg:3857')
    lon_3857, lat_3857 = transform(in_proj, out_proj, lon_4326, lat_4326)
    return lon_3857, lat_3857
