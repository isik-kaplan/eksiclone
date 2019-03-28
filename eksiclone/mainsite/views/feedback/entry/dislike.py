from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import HttpResponse
from django.views.generic import View

from mainsite.app_models import Entry
from mainsite.urls import mainsite_urls as url


@url.re_path('^feedback/dislike')
class Dislike(LoginRequiredMixin, View):
    def post(self, request):
        entry = Entry.objects.get(pk=int(request.body))
        if request.user.dislikes.filter(pk=entry.pk).exists():
            request.user.dislikes.remove(entry)
        else:
            request.user.dislikes.add(entry)
            request.user.likes.remove(entry)
        return HttpResponse(status=200)
