# -*- coding: utf-8 -*-
from nextgisweb.resource import Widget
from ..model import EmailConnection


class EmailConnectionDetailWidget(Widget):
    resource = EmailConnection
    operation = ('create', 'update')
    amdmod = 'ngw-trailcam/resource/EmailConnectionDetail/EmailConnectionDetail'
