# -*- coding: utf-8 -*-
import sqlalchemy as sa
from nextgisweb.models import DBSession
from pyramid.httpexceptions import HTTPNotFound
from sqlalchemy.orm.exc import NoResultFound
from sqlalchemy.sql.expression import extract
from datetime import datetime, timedelta
from ..model import Trailcam, TrailcamItem


def trailcam_dashboard(request):
    trailcam_id = request.matchdict['trailcam_id']

    try:
        trailcam = DBSession.query(Trailcam).get(trailcam_id)
        trailcam_items = trailcam.items
    except NoResultFound:
        raise HTTPNotFound()

    return {
        'trailcam': trailcam,
        'items_count': len(trailcam_items),
        'items_count_by_7_days': get_count_item_for_last_days(trailcam_id),
        'request': request
    }


def get_count_item_for_last_days(trailcam_id, days=7):
    date_now = datetime.now()
    date_7_days_ago = date_now - timedelta(days=days)

    time_group = DBSession.query(extract('months', TrailcamItem.date_original).label('m'),
                                 extract('days', TrailcamItem.date_original).label('d'),
                                 sa.func.count(TrailcamItem.id)) \
        .filter(TrailcamItem.date_original <= date_now) \
        .filter(TrailcamItem.date_original >= date_7_days_ago) \
        .filter(TrailcamItem.trailcam_id == trailcam_id) \
        .group_by('d') \
        .group_by('m') \
        .order_by(sa.desc('m')) \
        .order_by(sa.desc('d')) \
        .all()

    count_by_days = dict(('{0}-{1}'.format(m, d), count) for m, d, count in time_group)
    count_for_last_days = []

    for i in range(days):
        date_i_days_ago = date_now - timedelta(days=i)
        current_key = '{d.month}-{d.day}'.format(d=date_i_days_ago)
        if current_key in count_by_days:
            count_for_last_days.append((date_i_days_ago.isoformat(), count_by_days[current_key]))
        else:
            count_for_last_days.append((date_i_days_ago.isoformat(), 0))

    return count_for_last_days

