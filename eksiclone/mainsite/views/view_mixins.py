from utils.utility_classes import SafePaginator
from utils.utils import unmake_url


class UrlMixin:
    def __getattr__(self, item):
        try:
            return super().__getattribute__('kwargs')[item]
        except KeyError:
            return super().__getattribute__(item)

    @staticmethod
    def from_url(url):
        return unmake_url(url)


class PaginatorMixin:
    def __init_subclass__(cls, **kwargs):
        cls.paginator_class = SafePaginator
