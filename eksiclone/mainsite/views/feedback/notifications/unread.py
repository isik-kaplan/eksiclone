from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import HttpResponse, HttpResponseNotAllowed
from django.views.generic import View

from mainsite.app_models import Notification
from mainsite.urls import mainsite_urls as url


@url.re_path('^notification/unread')
class MarkUnreadNotification(LoginRequiredMixin, View):
    def post(self, request):
        ntfc = Notification.objects.get(pk=int(request.body))
        if ntfc.to == request.user:
            ntfc.read = False
            ntfc.save()
            return HttpResponse(status=200)
        raise HttpResponseNotAllowed
