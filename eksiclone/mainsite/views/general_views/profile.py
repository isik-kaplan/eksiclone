from django.db.models import F, Count
from django.views.generic import ListView

from mainsite.app_models import (
    User
)
from mainsite.urls import mainsite_urls as url
from mainsite.views.view_mixins import (
    UrlMixin,
    PaginatorMixin,
)
from utils.decorators import order_by, suppress_and_return


@url.re_path(r'^user/(?P<user>[a-zA-Z0-9-]+)/$', name='profile')
class ProfilePage(ListView, UrlMixin, PaginatorMixin):
    template_name = 'mainsite/profile/profile.html'
    context_object_name = 'entries'

    @suppress_and_return(User.DoesNotExist, instead=User.objects.none())
    @order_by(
        'points',
        not_fields={'points': Count(F('likers'), distinct=True) - Count(F('dislikers'), distinct=True)},
        default='date'
    )
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
        user = User.from_url(self.user)
        _user = self.request.user
        if _user.is_authenticated:
            user_follows = _user.followed_titles.filter(pk=user.pk).exists()
        else:
            user_follows = False
        extra_context = {
            'username': user.username,
            'order': getattr(self, '_order', None),
            'exist': getattr(self.request.user, 'is_author', False),
            'followclass': 'followuser',
            'user_follows': user_follows
        }
        return {**super().get_context_data(object_list=object_list, **kwargs), **extra_context}
