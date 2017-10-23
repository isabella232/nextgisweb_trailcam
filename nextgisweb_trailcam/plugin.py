# -*- coding: utf-8 -*-
from nextgisweb.webmap.plugin import WebmapPlugin


@WebmapPlugin.registry.register
class TrailcamPlugin(WebmapPlugin):

    @classmethod
    def is_supported(cls, webmap):
        return (
            'ngw-trailcam/webmap/plugin/TrailcamWebMap',
            dict()
        )
