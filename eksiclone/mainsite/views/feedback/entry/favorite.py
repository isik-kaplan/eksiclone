from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import HttpResponse
from django.views.generic import View

from mainsite.app_models import Entry
from mainsite.urls import mainsite_urls as url


@url.re_path('^feedback/fav')
class Favorite(LoginRequiredMixin, View):
    def post(self, request):
        entry = Entry.objects.get(pk=int(request.body))
        if request.user.favs.filter(pk=entry.pk).exists():
            request.user.favs.remove(entry)
        else:
            request.user.favs.add(entry)
        return HttpResponse(status=200)
