from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import HttpResponseRedirect
from django.views.generic import FormView

from mainsite.urls import url
from mainsite.views.forms.email_form import EmailForm
from utils.debug import debug
from utils.decorators import confirm_origin, template_switch


@debug
@template_switch
@url(r'settings/email', name='email')
@confirm_origin()
class Email(FormView, LoginRequiredMixin):
    template_name = 'mainsite/settings/email.html'
    form_class = EmailForm

    def get_form_kwargs(self):
        kwargs = super().get_form_kwargs()
        kwargs['request'] = self.request
        return kwargs

    def form_valid(self, form):
        user = self.request.user
        data = form.cleaned_data
        update = {
            'email': data['new']
        }
        user.update(**update)
        return HttpResponseRedirect(self.request.get_raw_uri())
