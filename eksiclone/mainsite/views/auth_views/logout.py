from django.contrib.auth.views import LogoutView
from django.http import Http404

from mainsite.urls import url
from mainsite.views.view_mixins import (
    PaginatorMixin,
)
from utils.debug import debug
from utils.decorators import confirm_origin


@debug
@url(r'auth/logout', name='logout')
@confirm_origin()
class LogoutPage(LogoutView, PaginatorMixin):
    def dispatch(self, request, *args, **kwargs):
        if self.confirm_origin():
            return super().dispatch(request, *args, **kwargs)
        else:
            raise Http404()
