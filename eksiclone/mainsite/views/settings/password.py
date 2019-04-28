from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.views import PasswordChangeView

from mainsite.urls import mainsite_urls as url
from mainsite.views.forms.password_form import PasswordForm


@url.re_path(r'settings/password', name='password')
class Password(PasswordChangeView, LoginRequiredMixin):
    template_name = 'mainsite/settings/password.html'
    form_class = PasswordForm
