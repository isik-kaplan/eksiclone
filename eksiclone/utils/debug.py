from functools import wraps


class NotAllowedFake(Exception):
    ...


def debug(cls):
    def dec(f):
        @wraps(f)
        def wrapper(self, request, *a, **kw):
            print('requested', cls.__name__, 'method:', request.method)
            return f(self, request, *a, **kw)

        return wrapper

    def requested(self, request, *a, **kw):
        print('requested', cls.__name__, 'method:', request.method)
        raise NotAllowedFake()

    for method in ('post', 'delete', 'get', 'update', 'head'):
        if hasattr(cls, method):
            _method = getattr(cls, method)
            decorated = dec(_method)
            setattr(cls, method, decorated)
        else:
            setattr(cls, method, requested)

    return cls
