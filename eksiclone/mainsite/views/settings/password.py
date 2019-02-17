from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.views import PasswordChangeView

from mainsite.urls import url
from mainsite.views.forms.password_form import PasswordForm
from utils.debug import debug
from utils.decorators import confirm_origin, template_switch


@debug
@template_switch
@url(r'settings/password', name='password')
@confirm_origin()
class Password(PasswordChangeView, LoginRequiredMixin):
    template_name = 'mainsite/settings/password.html'
    form_class = PasswordForm


