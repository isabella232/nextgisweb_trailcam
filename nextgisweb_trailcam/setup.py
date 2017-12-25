from setuptools import setup, find_packages
import sys, os

version = '0.1.0'

requires = [
    'nextgisweb',
    'requests',
    'pyproj',
    'python-dateutil',
    'geoalchemy2',
    'Pillow',
    'python-resize-image'
]

entry_points = {
    'nextgisweb.packages': [
        'nextgisweb_trailcam = nextgisweb_trailcam:pkginfo',
    ],

    'nextgisweb.amd_packages': [
        'nextgisweb_trailcam = nextgisweb_trailcam:amd_packages',
    ],

}

setup(
    name='nextgisweb_trailcam',
    version=version,
    description="Nextgisweb trailcam extension",
    long_description="",
    classifiers=[
        "Programming Language :: Python",
        "Framework :: Pylons",
        "Topic :: Internet :: WWW/HTTP",
        "Topic :: Internet :: WWW/HTTP :: WSGI :: Application",
    ],
    author='NextGIS',
    author_email='info@nextgis.ru',
    url='https://github.com/nextgis/nextgisweb_trailcam',
    keywords='web pyramid nextgis GIS trailcam',
    license='',
    packages=find_packages(exclude=['ez_setup', 'examples', 'tests']),
    include_package_data=True,
    zip_safe=False,
    install_requires=requires,
    entry_points=entry_points
)
