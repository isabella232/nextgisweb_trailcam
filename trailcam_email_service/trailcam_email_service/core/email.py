import transaction
from sqlalchemy import exists
from trailcam_email_service.models import DBSession, NgwInstance, Email


def create_email_connection(email_info, ngw_instance_id):
    ngw_instance = DBSession.query(NgwInstance).get(ngw_instance_id)
    if not ngw_instance:
        raise Exception('NgwInstance with id ==' + ngw_instance_id + ' is not found into database')
    existing_email_connection = DBSession.query(Email).filter(Email.address == email_info['address']).all()
    if existing_email_connection:
        ngw_instance = existing_email_connection[0].ngw_instance
        if ngw_instance.id == ngw_instance_id:
            return existing_email_connection[0].id
        else:
            raise Exception('Email "{0}" already assigned with NGW {1}'.format(email_info['address'], ngw_instance.name))
    session = DBSession()
    email_connection = Email(**email_info)
    email_connection.ngw_instance = ngw_instance
    session.add(email_connection)
    session.flush()
    session.refresh(email_connection)
    email_connection_id = email_connection.id
    transaction.commit()
    session.close()
    return email_connection_id
