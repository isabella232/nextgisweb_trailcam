# -*- coding: utf-8 -*-
import view
from nextgisweb.component import Component, require
from .model import Base
from .util import COMP_ID


class PhototrapComponent(Component):
    identity = COMP_ID
    metadata = Base.metadata

    def initialize(self):
        super(PhototrapComponent, self).initialize()
        from . import plugin

    @require('resource', 'webmap')
    def setup_pyramid(self, config):
        super(PhototrapComponent, self).setup_pyramid(config)
        view.setup_pyramid(self, config)

    def client_settings(self, request):
        return dict()

    settings_info = ()


def pkginfo():
    return dict(components=dict(
        tracker='nextgisweb_phototrap')
    )


def amd_packages():
    return (
        ('ngw-phototrap', 'nextgisweb_phototrap:amd/ngw-phototrap'),
    )

