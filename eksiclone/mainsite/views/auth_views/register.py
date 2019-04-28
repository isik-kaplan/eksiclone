from django.urls import reverse_lazy
from django.views.generic import CreateView

from mainsite.urls import mainsite_urls as url
from mainsite.views.forms.registration_form import RegisterForm
from mainsite.views.view_mixins import (
    PaginatorMixin,
)


@url.re_path(r'auth/register', name='register')
class RegisterPage(CreateView, PaginatorMixin):
    template_name = 'mainsite/auth/register/register.html'
    form_class = RegisterForm
    success_url = reverse_lazy('login')

    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)
