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
from sqlalchemy.ext.declarative import DeclarativeMeta
import json

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


trailcam_items_tags_table = db.Table('trailcam_items_tags', Base.metadata,
                                     db.Column('trailcam_id', db.Integer, db.ForeignKey('trailcam_items.id')),
                                     db.Column('tag_id', db.Integer, db.ForeignKey('trailcam_item_tag.id'))
                                     )


class TrailcamItemTag(Base):
    __tablename__ = 'trailcam_item_tag'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.Unicode, nullable=False, unique=True)
    description = db.Column(db.Unicode)

    items = db.relationship('TrailcamItem', secondary=trailcam_items_tags_table, back_populates='tags')


class TrailcamItem(Base):
    __tablename__ = 'trailcam_items'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.Unicode, nullable=False)
    description = db.Column(db.Unicode)
    received = db.Column(db.TIMESTAMP, nullable=False)
    file = db.Column(db.Unicode)

    trailcam_id = db.Column(db.Integer, db.ForeignKey('trailcam.id'))
    trailcam = db.relationship('Trailcam', back_populates='items')

    tags = db.relationship('TrailcamItemTag', secondary=trailcam_items_tags_table, back_populates="items")


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

    items = db.relationship('TrailcamItem', back_populates='trailcam')

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


class AlchemyEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj.__class__, DeclarativeMeta):
            # an SQLAlchemy class
            fields = {}
            for field in [x for x in dir(obj) if not x.startswith('_') and x != 'metadata']:
                data = obj.__getattribute__(field)
                try:
                    json.dumps(data)  # this will fail on non-encodable values, like other classes
                    fields[field] = data
                except TypeError:
                    fields[field] = None
            # a json-encodable dict
            return fields
        return json.JSONEncoder.default(self, obj)
