# encoding: utf-8
import datetime
import sqlalchemy.types as sql_types
import base64


class JsonifyMixin:
    def __init__(self):
        pass

    def as_json_dict(self, prefix=None, **init):
        json_dict = dict()
        for c in self.__table__.columns:
            column_name = c.name
            v = getattr(self, column_name)
            if isinstance(v, datetime.datetime):
                v = v.isoformat()
            if isinstance(c.type, sql_types.Binary):
                v = base64.b64encode(v)
            if prefix:
                column_name = '{}{}'.format(prefix, column_name)
            json_dict[column_name] = v

        for k, v in init.items():
            if prefix:
                k = '{}{}'.format(prefix, k)
            json_dict[k] = v

        return json_dict
