from nextgisweb import db
from nextgisweb.resource import (
    Resource,
    ResourceGroup,
    DataScope,
    Serializer,
    SerializedProperty,
    SerializedResourceRelationship)
from .util import _
from nextgisweb.models import declarative_base

Base = declarative_base()


class EmailConnection(Base, Resource):
    identity = 'trailcam_email_conn'
    cls_display_name = _('Email connection')

    email = db.Column(db.Unicode, unique=True, index=True)
    imap_server = db.Column(db.Unicode)
    imap_server_port = db.Column(db.Integer)
    login = db.Column(db.Unicode)
    password = db.Column(db.Unicode)

    __scope__ = DataScope

    @classmethod
    def check_parent(cls, parent):
        return (parent is None) or isinstance(parent, TrailcamGroup)


class EmailConnectionSerializer(Serializer):
    identity = EmailConnection.identity
    resclass = EmailConnection

    email = SerializedProperty(read=DataScope.read, write=DataScope.write)
    imap_server = SerializedProperty(read=DataScope.read, write=DataScope.write)
    imap_server_port = SerializedProperty(read=DataScope.read, write=DataScope.write)
    login = SerializedProperty(read=DataScope.read, write=DataScope.write)
    password = SerializedProperty(read=DataScope.read, write=DataScope.write)


class TrailcamGroup(Base, Resource):
    identity = 'trailcam_group'
    cls_display_name = _('Trail cameras')

    __scope__ = DataScope

    @classmethod
    def check_parent(cls, parent):
        return (parent is None) or isinstance(parent, ResourceGroup)


class Trailcam(Base, Resource):
    identity = 'trailcam'
    cls_display_name = _('Trail camera')

    __scope__ = DataScope

    lat = db.Column(db.Float)
    lon = db.Column(db.Float)
    is_auto = db.Column(db.Boolean)
    filter = db.Column(db.Unicode)
    email_connection_id = db.Column(db.ForeignKey(Resource.id), nullable=False)

    email_connection = db.relationship(
        Resource, foreign_keys=email_connection_id,
        cascade=False, cascade_backrefs=False)

    @classmethod
    def check_parent(cls, parent):
        return isinstance(parent, TrailcamGroup)


class TrailcamSerializer(Serializer):
    identity = Trailcam.identity
    resclass = Trailcam

    _defaults = dict(read=DataScope.read,
                     write=DataScope.write)

    lat = SerializedProperty(**_defaults)
    lon = SerializedProperty(**_defaults)
    is_auto = SerializedProperty(**_defaults)
    filter = SerializedProperty(**_defaults)
    email_connection = SerializedResourceRelationship(**_defaults)

    def deserialize(self):
        for prop, sp in self.proptab:
            if prop in self.data and not prop in self.keys:
                try:
                    sp.deserialize(self)
                except Exception as exc:
                    self.annotate_exception(exc, sp)
                    raise
