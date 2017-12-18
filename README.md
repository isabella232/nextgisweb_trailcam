NextGIS Web extension for trail cameras
=======================================

## Installation

1. Install nextgisweb_trailcam python package:  
`env/bin/pip install -e ./nextgisweb_trailcam/nextgisweb_trailcam`

2. Initialize database for the package:  
`env/bin/nextgisweb --config config.ini initialize_db`

3. Compile translations:
```bash
nextgisweb-i18n --package nextgisweb_trailcam extract trailcam
nextgisweb-i18n --package nextgisweb_trailcam update trailcam
nextgisweb-i18n --package nextgisweb_trailcam compile
```

License
-------------
This program is licensed under GNU GPL v2 or any later version

Commercial support
----------
Need to fix a bug or add a feature to nextgisweb_tracker for NextGIS Web? We provide custom development and support for this software. [Contact us](http://nextgis.ru/en/contact/) to discuss options!

[![http://nextgis.com](http://nextgis.ru/img/nextgis.png)](http://nextgis.com)
