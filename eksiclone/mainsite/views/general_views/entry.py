from django.http import Http404
from django.views.generic import DetailView

from mainsite.app_models import (
    Entry
)
from mainsite.urls import url
from mainsite.views.view_mixins import (
    UrlMixin,
    PaginatorMixin,
)
from utils.debug import debug
from utils.decorators import order_by, suppress_and_raise
from utils.next_prev import lazy_next, lazy_prev


@debug
@url(r'^entry/(?P<entry_pk>[0-9]+)/$', name='entry')
class EntryPage(DetailView, UrlMixin, PaginatorMixin):
    template_name = 'mainsite/entry/entry.html'
    context_object_name = 'entry'

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.cached: Entry = None
        self.entries_of = None

    @order_by('points', default='date')
    def _get_queryset(self):
        entry = Entry.objects.get(pk=self.entry_pk)
        self.entries_of = self.request.GET.get('entries_of', 'title')
        if self.entries_of == 'user':
            model = entry.author
        else:
            model = entry.title
        return model.entry_set.filter(readability=True)

    def get_context_data(self, object_list=None, **kwargs):
        query_set = self._get_queryset()
        entry = self.cached
        extra_context = {
            'next': lazy_next(query_set, entry),
            'prev': lazy_prev(query_set, entry),
            'order': getattr(self, '_order', None),
            'entries_of': self.entries_of,
        }
        return {**super().get_context_data(object_list=object_list, **kwargs), **extra_context}

    @suppress_and_raise(Entry.DoesNotExist, instead=Http404)
    def get_object(self, queryset=None):
        self.cached = self._get_queryset().get(pk=self.entry_pk)
        return self.cached
