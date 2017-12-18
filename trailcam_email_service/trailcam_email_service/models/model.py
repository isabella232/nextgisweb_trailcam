from sqlalchemy import Column, Integer, String, ForeignKey, Boolean, TIMESTAMP, Binary
from sqlalchemy import Table
from sqlalchemy.orm import (
    relationship
)
from trailcam_email_service.models import Base
from trailcam_email_service.models.jsonify_mixin import JsonifyMixin

ngw_instances_emails_table = Table('ngw_instances_emails', Base.metadata,
                                   Column('ngw_instance_id', Integer, ForeignKey('ngw_instances.id')),
                                   Column('email_id', Integer, ForeignKey('emails.id'))
                                   )


class NgwInstance(Base, JsonifyMixin):
    __tablename__ = 'ngw_instances'

    id = Column(Integer, primary_key=True)
    unique_id = Column(String, unique=True, index=True)
    name = Column(String)
    url = Column(String)

    emails = relationship('Email', secondary=ngw_instances_emails_table, back_populates='ngw_instances')


class Email(Base, JsonifyMixin):
    __tablename__ = 'emails'

    id = Column(Integer, primary_key=True)
    address = Column(String, unique=True, index=True)
    description = Column(String)
    login = Column(String)
    password = Column(String)
    imap_server = Column(String)
    imap_server_port = Column(Integer, default=933)
    last_checked = Column(TIMESTAMP)
    updated = Column(Boolean, default=False)

    ngw_instances = relationship('NgwInstance', secondary=ngw_instances_emails_table, back_populates='emails')
    messages = relationship('Message', back_populates='email', lazy='joined')


class Message(Base, JsonifyMixin):
    __tablename__ = 'messages'

    id = Column(Integer, primary_key=True)
    uid = Column(String)
    subject = Column(String)
    message_date = Column(TIMESTAMP)
    message_date_received = Column(TIMESTAMP)
    received = Column(TIMESTAMP)
    message = Column(Binary)
    email_id = Column(Integer, ForeignKey('emails.id'))
    email = relationship('Email', back_populates='messages')
