from django.contrib.auth.mixins import LoginRequiredMixin
from django.db.models import Q
from django.views.generic import ListView
from django_private_chat.models import Dialog

from mainsite.urls import mainsite_urls as url
from mainsite.views.view_mixins import (
    UrlMixin,
    PaginatorMixin,
)


@url.re_path(r'^messages/$', name='messages')
class MessagesPage(LoginRequiredMixin, ListView, UrlMixin, PaginatorMixin):
    template_name = 'mainsite/messages/messages.html'
    context_object_name = 'dialogs'
    success_url = '#'
    paginate_by = 10

    def get_queryset(self):
        user = self.request.user
        return Dialog.objects.filter(Q(owner=user) | Q(opponent=user))
