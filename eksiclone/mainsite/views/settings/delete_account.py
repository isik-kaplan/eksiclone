from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import HttpResponseRedirect
from django.views.generic import FormView

from mainsite.urls import mainsite_urls as url
from mainsite.views.forms.delete_account_form import DeleteAccountForm


@url.re_path(r'settings/delete_account', name='delete_account')
class DeleteAccount(FormView, LoginRequiredMixin):
    template_name = 'mainsite/settings/delete_account.html'
    form_class = DeleteAccountForm

    def get_form_kwargs(self):
        kwargs = super().get_form_kwargs()
        kwargs['request'] = self.request
        return kwargs

    def form_valid(self, form):
        form.do_it()
        return HttpResponseRedirect(self.request.get_raw_uri())
