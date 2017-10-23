# -*- coding: utf-8 -*-
from nextgisweb.webmap.plugin import WebmapPlugin


@WebmapPlugin.registry.register
class PhototrapPlugin(WebmapPlugin):

    @classmethod
    def is_supported(cls, webmap):
        return (
            'ngw-phototrap/webmap/plugin/PhototrapWebMap',
            dict()
        )
