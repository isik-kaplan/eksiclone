from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import HttpResponseRedirect
from django.views import View

from mainsite.urls import mainsite_urls as url


@url.re_path(r'settings/lights', name='lights')
class Lights(View, LoginRequiredMixin):
    def get(self, request):
        request.user.toggle_lights()
        return HttpResponseRedirect(self.request.META['HTTP_REFERER'])
