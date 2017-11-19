from pyramid.config import Configurator
from trailcam_email_service.models import DBSession
from sqlalchemy import engine_from_config


def main(global_config, **settings):
    engine = engine_from_config(settings, 'sqlalchemy.')
    DBSession.configure(bind=engine)
    config = Configurator(settings=settings)
    config.include('pyramid_mako')
    config.include('.routes')
    config.scan()
    return config.make_wsgi_app()
