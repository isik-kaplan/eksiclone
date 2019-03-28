from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import HttpResponse
from django.views.generic import View

from mainsite.app_models import Entry
from mainsite.urls import mainsite_urls as url


@url.re_path('^feedback/del')
class Delete(LoginRequiredMixin, View):
    def post(self, request):
        entry = Entry.objects.get(pk=int(request.body))
        if request.user == entry.author:
            entry.readability = not entry.readability
            entry.save()
        return HttpResponse(status=200)
