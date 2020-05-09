from mainsite.urls import mainsite_urls as url
from django.views.generic.detail import SingleObjectMixin
from django.views.generic import DetailView
from mainsite.app_models import (
    Entry
)
from django.http import JsonResponse


@url.re_path(r'fav/(?P<entry_pk>[0-9]+)/$', name='fav')
class Favorite(DetailView, SingleObjectMixin):

    def get(self, request, entry_pk):
        entry = Entry.objects.get(id=entry_pk)
        entry.favorites.add(request.user)
        return JsonResponse({'favs': entry.favorites.count(), 'status': 'OK'})
