from __future__ import absolute_import
from celery import Celery, bootsteps, Task
from celery.bin import Option
import ConfigParser
from sqlalchemy import create_engine
from trailcam_email_service.models import DBSession


CELERY_APP_NAME = 'trailcam_email_service'


class SqlAlchemySessionTask(Task):
    abstract = True
    _db_session = None

    @property
    def db_session(self):
        if self._db_session is None:
            config = ConfigParser.RawConfigParser()
            config.read(SqlAlchemySessionTask.ini_config_path)
            connection_string = config.get('app:main', 'sqlalchemy.url')
            engine = create_engine(connection_string)
            DBSession.configure(bind=engine)
            self._db_session = DBSession
        return self._db_session


email_celery_app = Celery(CELERY_APP_NAME,
                          broker='amqp://guest@localhost//',
                          backend='rpc',
                          include=['trailcam_email_service.celery.tasks'])

email_celery_app.user_options['worker'].add(
    Option('--ini', dest='ini_config', default=None, help='Ini config file')
)


class CustomArgs(bootsteps.Step):
    def __init__(self, worker, ini_config, **options):
        SqlAlchemySessionTask.ini_config_path = ini_config


email_celery_app.steps['worker'].add(CustomArgs)

email_celery_app.conf.update(
    result_expires=3600,
)

if __name__ == '__main__':
    email_celery_app.start()
