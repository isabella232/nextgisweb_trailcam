import transaction
from sqlalchemy import exists
from trailcam_email_service.models import DBSession, NgwInstance, Email


def create_email_connection(email_info, ngw_instance_id):
    ngw_instance = DBSession.query(NgwInstance).get(ngw_instance_id)
    if not ngw_instance:
        raise Exception('NgwInstance with id ==' + ngw_instance_id + ' is not found into database')
    existing_email_connection = DBSession.query(Email).filter(Email.address == email_info['address']).all()
    if existing_email_connection:
        ngw_instances = existing_email_connection[0].ngw_instances
        for ngw_i in ngw_instances:
            if ngw_i.id == ngw_instance_id:
                return existing_email_connection[0].id
        existing_email_connection[0].ngw_instances.append(ngw_instance)
        return existing_email_connection[0].id
    session = DBSession()
    email_connection = Email(**email_info)
    email_connection.ngw_instances.append(ngw_instance)
    session.add(email_connection)
    session.flush()
    session.refresh(email_connection)
    email_connection_id = email_connection.id
    transaction.commit()
    session.close()
    return email_connection_id
