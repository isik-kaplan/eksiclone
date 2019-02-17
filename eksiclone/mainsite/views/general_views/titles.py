from django.views.generic import ListView

from databases.mainsite.queries import DEFAULT_CHANNEL_QUERIES
from mainsite.app_models import (
    TitleChannel,
)
from mainsite.urls import url
from mainsite.views.view_mixins import (
    UrlMixin,
    PaginatorMixin,
)
from utils.debug import debug
from utils.decorators import suppress_and_return, template_switch


@debug
@template_switch
@url(r'titles/(?P<channel>[a-zA-Z0-9-]+)', name='titles')
class TitlesPage(ListView, UrlMixin, PaginatorMixin):
    _template_name = 'mainsite/titles/titles.html'
    context_object_name = 'titles'

    @suppress_and_return(TitleChannel.DoesNotExist, instead=TitleChannel.objects.none())
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

    def _extra_context(self):
        if self.channel in DEFAULT_CHANNEL_QUERIES:
            description = DEFAULT_CHANNEL_QUERIES[self.channel]['description']
        else:
            description = TitleChannel.from_url(self.channel).description
        return {
            'channel': self.channel,
            'description': description
        }
