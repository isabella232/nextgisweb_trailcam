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
from sqlalchemy.dialects.postgresql import ENUM
import json
from jsonify_mixin import JsonifyMixin
from nextgisweb_trailcam.email_service.email import register_email


Base = declarative_base()


class EmailConnection(Base, Resource):
    identity = 'trailcam_email_conn'
    cls_display_name = _('Email connection')

    email = db.Column(db.Unicode, unique=True, index=True)
    imap_server = db.Column(db.Unicode)
    imap_server_port = db.Column(db.Integer)
    login = db.Column(db.Unicode)
    password = db.Column(db.Unicode)
    status = db.Column(ENUM('registered', 'first_pulling', 'ready', 'updating', name='trailcam_email_conn_status_enum'))

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
    status = SerializedProperty(read=DataScope.read, write=DataScope.write)

    def deserialize(self):
        if not self.data['status']:
            register_email(self.data)
            self.data['status'] = 'first_pulling'

        for prop, sp in self.proptab:
            if prop in self.data and not prop in self.keys:
                try:
                    sp.deserialize(self)
                except Exception as exc:
                    self.annotate_exception(exc, sp)
                    raise


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


class TrailcamItem(Base, JsonifyMixin):
    __tablename__ = 'trailcam_items'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email_uid = db.Column(db.Unicode, index=True)
    name = db.Column(db.Unicode, nullable=False)
    description = db.Column(db.Unicode)
    date_received = db.Column(db.DateTime(timezone=True), nullable=False)
    date_original = db.Column(db.DateTime(timezone=True), nullable=False)
    message_body = db.Column(db.Unicode)
    file_name = db.Column(db.Unicode)
    file_path = db.Column(db.Unicode)
    file_path_thumbnail = db.Column(db.Unicode)
    file_size = db.Column(db.BigInteger)

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
    email_connection = db.relationship(Resource, foreign_keys=email_connection_id,
        cascade=False, cascade_backrefs=False)

    items = db.relationship('TrailcamItem', back_populates='trailcam')

    @classmethod
    def check_parent(cls, parent):
        return isinstance(parent, TrailcamGroup)


class TrailcamSerializer(Serializer):
    identity = Trailcam.identity
    resclass = Trailcam

    _defaults = dict(read=DataScope.read, write=DataScope.write)

    id = SerializedProperty(**_defaults)
    lat = SerializedProperty(**_defaults)
    lon = SerializedProperty(**_defaults)
    is_auto = SerializedProperty(**_defaults)
    filter = SerializedProperty(**_defaults)
    email_connection = SerializedResourceRelationship(**_defaults)

    def deserialize(self):
        for prop, sp in self.proptab:
            if prop == 'id':
                continue
            if prop in self.data and not prop in self.keys:
                try:
                    sp.deserialize(self)
                except Exception as exc:
                    self.annotate_exception(exc, sp)
                    raise


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
