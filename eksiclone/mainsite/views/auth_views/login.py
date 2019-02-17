from django.contrib.auth.views import LoginView
from django.http import Http404

from mainsite.urls import url
from mainsite.views.forms.login_form import EmailUsernameAuthForm
from mainsite.views.view_mixins import (
    PaginatorMixin,
)
from utils.debug import debug
from utils.decorators import confirm_origin, template_switch


@debug
@template_switch
@url(r'auth/login', name='login')
@confirm_origin()  # change this to a middleware
class LoginPage(LoginView, PaginatorMixin):
    _template_name = 'mainsite/auth/login/login.html'
    form_class = EmailUsernameAuthForm

    def post(self, request, *args, **kwargs):
        if self.confirm_origin():
            return super().post(request, *args, **kwargs)
        else:
            raise Http404()
