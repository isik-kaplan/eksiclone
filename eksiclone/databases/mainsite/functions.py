from mainsite.app_models import (
    TitleChannel,
    User,
)
from databases.mainsite.constants import (
    DEFAULT_FIELDS,
    DEFAULT_FIELD,
    DEFAULT_THEME,
)
from databases.mainsite.queries import (
    DEFAULT_CHANNEL_QUERIES,
)


def context_from_request(request):
    return {
        'index': _get_index_from_request(request),
        'all_titles': _get_all_titles_from_request(request),
        'user': request.user
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


"""context = {
        "index_name": request.COOKIES.get("titles") if request.COOKIES.get("titles") in [*TITLECOOKIES.keys()]+[str(chn) for chn in TitleChannels.objects.all()] else "today",
        "site_name": URL,
        "all_titles": getlast(Title.objects.filter(title_channels__channel__contains=TitleChannels.objects.get(channel=request.COOKIES.get("titles"))).order_by("entry__entry_date2") if request.COOKIES.get("titles") in [str(chn) for chn in TitleChannels.objects.all()] else TITLECOOKIES.get(request.COOKIES.get("titles"), TITLECOOKIES["today"]), title_count),
        "title_channels": TitleChannels.objects.all(),
        "styleconfig": styleconfig,
        "index_body": index_body,
        "index_header": index_header,
        "empty_title_list": empty_title_list
    }"""
