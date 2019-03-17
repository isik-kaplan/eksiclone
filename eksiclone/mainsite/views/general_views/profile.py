from django.db.models import F, Count
from django.views.generic import ListView

from mainsite.app_models import (
    User
)
from mainsite.urls import url
from mainsite.views.view_mixins import (
    UrlMixin,
    PaginatorMixin,
)
from utils.debug import debug
from utils.decorators import order_by, suppress_and_return, confirm_origin


@debug
@url(r'^user/(?P<user>[a-zA-Z0-9-]+)/$', name='profile')
@confirm_origin()
class ProfilePage(ListView, UrlMixin, PaginatorMixin):
    template_name = 'mainsite/profile/profile.html'
    context_object_name = 'entries'

    @suppress_and_return(User.DoesNotExist, instead=User.objects.none())
    @order_by('points', not_fields={'points': Count(F('likes'))}, default='date')
    def get_queryset(self):
        user = User.from_url(self.user)
        queryset = user.entry_set.filter(readability=True)
        return queryset

    @property
    def paginate_by(self):
        user = self.request.user
        _paginate_by = getattr(user, 'entry_pref', 10)
        return _paginate_by

    def get_context_data(self, *, object_list=None, **kwargs):
        extra_context = {
            'username': self.from_url(self.user),
            'order': getattr(self, '_order', None),
            'exist': getattr(self.request.user, 'is_author', False),
        }
        return {**super().get_context_data(object_list=object_list, **kwargs), **extra_context}
