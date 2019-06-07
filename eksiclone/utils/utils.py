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
    name = name.replace('.', os.sep)
    path = os.sep + path
    modules = []
    for module in glob(name + path, recursive=recursive):
        importable = os.path.splitext(module)[0].replace(os.sep, '.')
        if '__init__' in importable or '__pycache__' in importable:
            continue
        try:
            module = import_module(importable)
        except ModuleNotFoundError:
            module = import_module(importable[:-1])
        modules.append(module)
    return 'done' or modules


def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip


__all__ = [
    create_user,
    make_url,
]
