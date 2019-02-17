from django.contrib.auth.mixins import LoginRequiredMixin
from django.views import View
from django.http import HttpResponseRedirect
from mainsite.urls import url
from mainsite.views.forms.password_form import PasswordForm
from utils.debug import debug
from utils.decorators import confirm_origin, template_switch


#@debug
@template_switch
@url(r'settings/lights', name='lights')
@confirm_origin()
class Lights(View, LoginRequiredMixin):
    def get(self, request):
        request.user.toggle_lights()
        return HttpResponseRedirect(self.request.META['HTTP_REFERER'])



