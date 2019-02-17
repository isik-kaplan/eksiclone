from contextlib import suppress
from functools import wraps

from django.urls import re_path

from databases.mainsite.functions import context_from_request


def context_manager(**context):
    def actual_decorator(f):
        @wraps(f)
        def wrapper(self, *args, **kwargs):
            nonlocal context
            _context = context_from_request(self.request)
            _contxt2 = f(self, *args, **kwargs)
            context.update(_context)
            context.update(_contxt2)
            if hasattr(self, '_extra_context'):
                context.update(self._extra_context())
            return context

        return wrapper

    return actual_decorator


def url_manager():
    _urls = []

    def url(route, kwargs=None, name=None):
        def decorator(cls):
            _urls.append(
                re_path(route, cls.as_view(), kwargs, name=name or cls.__name__)
            )
            return cls

        return decorator

    return url, _urls


def class_context_manager(**context):
    def decorator(cls):
        cls.get_context_data = context_manager(**context)(
            cls.get_context_data
        )
        return template_switch(cls)

    return decorator


def template_switch(cls):
    anonymous = '_anonymous.html'
    authenticated = '_authenticated.html'

    def get_template_names(self):
        if not hasattr(self, '_template_name'):
            template = self.template_name
        else:
            template = self._template_name[:-5]
            if self.request.user.is_authenticated:
                template = template + authenticated
            else:
                template = template + anonymous
        return [template]

    cls.get_template_names = get_template_names
    return cls


def order_by(*args, default):
    def actual_decorator(f):
        @wraps(f)
        def wrapper(self, *a, **kw):
            queryset = f(self, *a, **kw)
            _order = str(self.request.GET.get('order')).lower()
            if _order in args:
                order = _order
            else:
                order = default
            self._order = order
            default_prefix = '-' if _order in args and order != 'date' else ''
            return queryset.order_by(default_prefix + order, 'date')

        return wrapper

    return actual_decorator


def suppress_and_return(*excs, instead):
    def actual_decorator(f):
        @wraps(f)
        def wrapper(*a, **kw):
            with suppress(*excs):
                return f(*a, **kw)
            return instead  # pycharm false positive

        return wrapper

    return actual_decorator


def suppress_and_raise(*excs, instead):
    def actual_decorator(f):
        @wraps(f)
        def wrapper(*a, **kw):
            with suppress(*excs):
                return f(*a, **kw)
            raise instead

        return wrapper

    return actual_decorator


def confirm_origin(origin=None):
    def actual_decorator(cls):
        def method(self):
            nonlocal origin
            referer = self.request.META.get('HTTP_REFERER') or ''
            origin = origin or 'http://' + self.request.build_absolute_uri().split('//')[1].split('/')[0]
            # this is supposed to be the base url, // TODO make it pretty
            print(f'referer: {referer}\n' f'origin: {origin}')  # // TODO Log this instead of printing
            return referer.startswith(origin)

        method.__name__ = 'confirm_origin'
        cls.confirm_origin = method
        return cls

    return actual_decorator


__all__ = [
    class_context_manager,
    url_manager,
    context_manager
]
