from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import ListView

from mainsite.urls import url
from mainsite.views.view_mixins import (
    UrlMixin,
    PaginatorMixin,
)
from utils.debug import debug


@debug
@url(r'^notifications/(?P<ntfc>[a-zA-Z]+)/$', name='notifications')
class Notifications(LoginRequiredMixin, ListView, UrlMixin, PaginatorMixin):
    template_name = 'mainsite/notifications/notifications.html'
    context_object_name = 'notifications'
    paginate_by = 10

    def get_queryset(self):
        user = self.request.user
        qs = user.notification_set.filter(discarded=False)
        if self.ntfc == 'new':
            qs = qs.filter(read=False)
        else:
            qs = qs.filter(read=True)
        return qs.order_by('-creation_date')

    def get_context_data(self, *, object_list=None, **kwargs):
        return {
            **super().get_context_data(object_list=object_list, **kwargs),
            'new': True if self.ntfc == 'new' else False,
        }
