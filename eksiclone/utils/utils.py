import os
from glob import glob
from importlib import import_module

from django.contrib.auth import get_user_model


def create_user(*, username, password, email):
    user = get_user_model()
    user = user.objects.create(username=username, email=email)
    user.set_password(password)
    user.save()
    return user


def make_url(field):
    field = str(field).strip()
    return '-'.join(field.split())


def unmake_url(url):
    field = url.replace('-', ' ').strip()
    field = ' '.join(field.split())
    return field


def init(initialize):
    import_module(initialize)


def glob_init(name, path, recursive=False):
    name = name.replace('.', '\\')
    path = '\\' + path
    modules = []
    for module in glob(name + path, recursive=recursive):
        importable = os.path.splitext(module)[0].replace('\\', '.')
        if '__init__' in importable or '__pycache__' in importable:
            continue
        try:
            module = import_module(importable)
        except ModuleNotFoundError:
            module = import_module(importable[:-1])
        modules.append(module)
    return 'done' or modules


__all__ = [
    create_user,
    make_url,
]
