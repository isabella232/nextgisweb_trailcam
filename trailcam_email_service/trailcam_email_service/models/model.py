from sqlalchemy import Column, Integer, String, ForeignKey, Boolean, Binary, DateTime
from sqlalchemy import Table
from sqlalchemy.orm import (
    relationship
)
from trailcam_email_service.models import Base
from trailcam_email_service.models.jsonify_mixin import JsonifyMixin


class NgwInstance(Base, JsonifyMixin):
    __tablename__ = 'ngw_instances'

    id = Column(Integer, primary_key=True)
    unique_id = Column(String, unique=True, index=True)
    name = Column(String)
    url = Column(String)

    emails = relationship('Email', back_populates='ngw_instance')


class Email(Base, JsonifyMixin):
    __tablename__ = 'emails'

    id = Column(Integer, primary_key=True)
    address = Column(String, unique=True, index=True)
    description = Column(String)
    login = Column(String)
    password = Column(String)
    imap_server = Column(String)
    imap_server_port = Column(Integer, default=933)
    last_checked = Column(DateTime(timezone=True))
    updated = Column(Boolean, default=False)

    ngw_instance_id = Column(Integer, ForeignKey('ngw_instances.id'))
    ngw_instance = relationship('NgwInstance', back_populates='emails')
    messages = relationship('Message', back_populates='email', lazy='joined')


class Message(Base, JsonifyMixin):
    __tablename__ = 'messages'

    id = Column(Integer, primary_key=True)
    uid = Column(String)
    subject = Column(String)
    message_date = Column(DateTime(timezone=True))
    message_date_received = Column(DateTime(timezone=True))
    received = Column(DateTime(timezone=True))
    message = Column(Binary)
    image = Column(Binary)
    image_name = Column(String)

    body = Column(String)

    email_id = Column(Integer, ForeignKey('emails.id'))
    email = relationship('Email', back_populates='messages')
