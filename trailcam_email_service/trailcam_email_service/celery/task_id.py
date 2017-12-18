import uuid


TASKS_PREFIXES = {
    'pull_all_messages': 'email_%(email_id)s_pull-all'
}


def get_unique_id_task(type_task_name, dict_params=None):
    prefix = TASKS_PREFIXES[type_task_name]
    if dict_params:
        prefix = prefix % dict_params

    unique_task_id = '{prefix}_{uuid4}'.format(
        prefix=prefix,
        uuid4=uuid.uuid4()
    )
    return unique_task_id
