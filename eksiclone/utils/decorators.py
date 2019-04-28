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
        return cls

    return decorator


def order_by(*args, not_fields=None, default):
    if not_fields is None:
        not_fields = {}
    not_fields = {'_' + k: v for k, v in not_fields.items()}

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
            if '_' + order in not_fields:
                queryset = queryset.annotate(**not_fields)
                order = '_' + order
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


__all__ = [
    class_context_manager,
    url_manager,
    context_manager
]
