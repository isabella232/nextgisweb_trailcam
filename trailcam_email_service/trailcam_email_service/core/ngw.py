import transaction
from sqlalchemy import exists
from trailcam_email_service.models import NgwInstance, DBSession


def create_ngw(ngw_info):
    existing_ngw_instance = DBSession.query(NgwInstance).filter(NgwInstance.unique_id == ngw_info['unique_id']).all()
    if existing_ngw_instance:
        return existing_ngw_instance[0].id
    session = DBSession()
    ngw_instance = NgwInstance(**ngw_info)
    session.add(ngw_instance)
    session.flush()
    session.refresh(ngw_instance)
    ngw_instance_id = ngw_instance.id
    transaction.commit()
    session.close()
    return ngw_instance_id


def get_ngw_by_unique_id(ngw_info):
    existing_ngw_instance = DBSession.query(NgwInstance).filter(NgwInstance.unique_id == ngw_info['unique_id']).all()
    if existing_ngw_instance:
        return existing_ngw_instance[0]
    raise Exception('NgwInstance with unique id {0} not found'.format(ngw_info['unique_id']))
