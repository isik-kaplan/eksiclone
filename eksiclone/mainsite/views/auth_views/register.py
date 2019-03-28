from django.http import Http404
from django.urls import reverse_lazy
from django.views.generic import CreateView

from mainsite.urls import mainsite_urls as url
from mainsite.views.forms.registration_form import RegisterForm
from mainsite.views.view_mixins import (
    PaginatorMixin,
)
from utils.debug import debug
from utils.decorators import confirm_origin


@debug
@url.re_path(r'auth/register', name='register')
@confirm_origin()
class RegisterPage(CreateView, PaginatorMixin):
    template_name = 'mainsite/auth/register/register.html'
    form_class = RegisterForm
    success_url = reverse_lazy('login')  # patch the django.urls.reverse

    def post(self, request, *args, **kwargs):
        if self.confirm_origin():
            return super().post(request, *args, **kwargs)
        else:
            raise Http404()
