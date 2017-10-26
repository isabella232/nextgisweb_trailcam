# -*- coding: utf-8 -*-
from nextgisweb.resource import Widget
from ..model import EmailConnection, Trailcam


class EmailConnectionDetailWidget(Widget):
    resource = EmailConnection
    operation = ('create', 'update')
    amdmod = 'ngw-trailcam/resource/EmailConnectionDetail/EmailConnectionDetail'


class TrailcamDetailWidget(Widget):
    resource = Trailcam
    operation = ('create', 'update')
    amdmod = 'ngw-trailcam/resource/TrailcamDetail/TrailcamDetail'
