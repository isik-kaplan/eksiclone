from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import HttpResponseRedirect
from django.views import View

from mainsite.urls import url
from utils.decorators import confirm_origin


# @debug
@url(r'settings/lights', name='lights')
@confirm_origin()
class Lights(View, LoginRequiredMixin):
    def get(self, request):
        request.user.toggle_lights()
        return HttpResponseRedirect(self.request.META['HTTP_REFERER'])
