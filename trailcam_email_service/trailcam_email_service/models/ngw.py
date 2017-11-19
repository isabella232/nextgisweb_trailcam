from datetime import datetime

from sqlalchemy import Column, Integer, String, DECIMAL, BigInteger, ForeignKey, Sequence, Table, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import (
    scoped_session,
    sessionmaker,
    relationship
)
from .jsonify_mixin import JsonifyMixin
from zope.sqlalchemy import ZopeTransactionExtension

from trailcam_email_service.models import Base
from trailcam_email_service.models.jsonify_mixin import JsonifyMixin


class NgwInstance(Base, JsonifyMixin):
    __tablename__ = 'ngw_instances'

    id = Column(Integer, primary_key=True)
    unique_id = Column(String, unique=True)
    name = Column(String)
    url = Column(String)
    emails = relationship('Email', back_populates='ngw_instance')


class Email(Base, JsonifyMixin):
    __tablename__ = 'emails'

    address = Column(String, nullable=False, primary_key=True)
    description = Column(String)
    ngw_instance_id = Column(Integer, ForeignKey('ngw_instances.id'), primary_key=True)
    ngw_instance = relationship('NgwInstance', back_populates='devices', lazy='joined')
