from databases.mainsite.constants import (
    DEFAULT_FIELDS,
    DEFAULT_FIELD,
)
from databases.mainsite.queries import (
    DEFAULT_CHANNEL_QUERIES,
)
from mainsite.app_models import (
    TitleChannel,
)


def context_from_request(request):
    return {
        'index': _get_index_from_request(request),
        'all_titles': _get_all_titles_from_request(request),
        'user': request.user,
    }


def _get_index_from_request(request):
    cookie = request.COOKIES.get('index')
    if cookie in DEFAULT_FIELDS:
        return cookie
    if cookie in TitleChannel.objects.all():
        return cookie
    return DEFAULT_FIELD


def _get_all_titles_from_request(request):
    title_cookie = request.COOKIES.get('index')
    if title_cookie not in DEFAULT_CHANNEL_QUERIES:
        title_cookie = 'today'
    return DEFAULT_CHANNEL_QUERIES[title_cookie]['query'].all()
