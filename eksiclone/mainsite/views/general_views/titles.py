from django.views.generic import ListView

from databases.mainsite.queries import DEFAULT_CHANNEL_QUERIES
from mainsite.app_models import (
    TitleChannel,
)

from django.http.response import Http404
from mainsite.urls import mainsite_urls as url
from mainsite.views.view_mixins import (
    UrlMixin,
    PaginatorMixin,
)
from utils.decorators import suppress_and_raise


@url.re_path(r'titles/(?P<channel>[a-zA-Z0-9-]+)', name='titles')
class TitlesPage(ListView, UrlMixin, PaginatorMixin):
    template_name = 'mainsite/titles/titles.html'
    context_object_name = 'titles'

    @suppress_and_raise(TitleChannel.DoesNotExist, instead=Http404)
    def get_queryset(self):
        if self.channel in DEFAULT_CHANNEL_QUERIES:
            query_set = DEFAULT_CHANNEL_QUERIES[self.channel]['query']
        else:
            channel = TitleChannel.from_url(self.channel)
            query_set = channel.titles.all()
        return query_set

    @property
    def paginate_by(self):
        user = self.request.user
        _paginate_by = getattr(user, 'title_pref', 10)
        return _paginate_by

    def get_context_data(self, *, object_list=None, **kwargs):
        if self.channel in DEFAULT_CHANNEL_QUERIES:
            description = DEFAULT_CHANNEL_QUERIES[self.channel]['description']
        else:
            description = TitleChannel.from_url(self.channel).description
        return {
            **super().get_context_data(object_list=object_list, **kwargs),
            'channel': self.channel,
            'description': description
        }
