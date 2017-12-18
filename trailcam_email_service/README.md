Trailcam email service
==================

Initialize postgres database
---------------
`sudo -s -u postgres`  
`createuser trailcam_email_service -P`  
`createdb trailcam_email_service -O trailcam_email_service`  

Getting Started
---------------
`cd <directory containing this file>`  
`$VENV/bin/pip install -e .`  
`$VENV/bin/initialize_trailcam_email_service_db development.ini`  
`$VENV/bin/pserve development.ini`  

Running Celery
--------------
1. Should install [RabbitMQ](http://www.rabbitmq.com/):
`sudo apt-get install rabbitmq-server`  
2. Run celery worker:  
`celery -A trailcam_email_service worker -l info --ini PATH_TO_INI_CONFIG_WITH_SQLALCH_CONN_STRING`
3. Run flower monitoring on 5555 port:  
`celery flower -A trailcam_email_service worker -l info --address=127.0.0.1 --port=5555`
