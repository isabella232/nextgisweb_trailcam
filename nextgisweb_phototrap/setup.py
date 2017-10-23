from setuptools import setup, find_packages
import sys, os

version = '0.0'

requires = (
    'nextgisweb',
    'requests',
    'pyproj',
    'python-dateutil'
)

entry_points = {
    'nextgisweb.packages': [
        'nextgisweb_tracker = nextgisweb_tracker:pkginfo',
    ],

    'nextgisweb.amd_packages': [
        'nextgisweb_tracker = nextgisweb_tracker:amd_packages',
    ],

}

setup(
    name='nextgisweb_tracker',
    version=version,
    description="Nextgisweb tracker extension",
    long_description="",
    classifiers=[
        "Programming Language :: Python",
        "Framework :: Pylons",
        "Topic :: Internet :: WWW/HTTP",
        "Topic :: Internet :: WWW/HTTP :: WSGI :: Application",
    ],
    author='NextGIS',
    author_email='info@nextgis.ru',
    url='https://github.com/nextgis/nextgisweb_tracker',
    keywords='web pyramid nextgis GIS gps tracker track',
    license='',
    packages=find_packages(exclude=['ez_setup', 'examples', 'tests']),
    include_package_data=True,
    zip_safe=False,
    install_requires=requires,
    entry_points=entry_points,
)
