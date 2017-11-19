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

