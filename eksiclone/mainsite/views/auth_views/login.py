from django.contrib.auth.views import LoginView

from mainsite.urls import mainsite_urls as url
from mainsite.views.forms.login_form import EmailUsernameAuthForm
from mainsite.views.view_mixins import (
    PaginatorMixin,
)


@url.re_path(r'auth/login', name='login')
class LoginPage(LoginView, PaginatorMixin):
    template_name = 'mainsite/auth/login/login.html'
    form_class = EmailUsernameAuthForm

    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)
