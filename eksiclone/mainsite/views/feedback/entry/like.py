from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import HttpResponse
from django.views.generic import View

from mainsite.app_models import Entry
from mainsite.urls import url


@url('^feedback/like')
class Like(LoginRequiredMixin, View):
    def post(self, request):
        entry = Entry.objects.get(pk=int(request.body))
        if request.user.likes.filter(pk=entry.pk).exists():
            request.user.likes.remove(entry)
        else:
            request.user.likes.add(entry)
            request.user.dislikes.remove(entry)
        return HttpResponse(status=200)
