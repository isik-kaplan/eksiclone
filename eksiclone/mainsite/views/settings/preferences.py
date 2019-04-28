from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import HttpResponseRedirect
from django.views.generic import FormView

from mainsite.app_models import Theme
from mainsite.urls import mainsite_urls as url
from mainsite.views.forms.preferences_form import PreferencesForm


@url.re_path(r'settings/preferences', name='preferences')
class Preferences(FormView, LoginRequiredMixin):
    template_name = 'mainsite/settings/preferences.html'
    form_class = PreferencesForm

    def get_form_kwargs(self):
        kwargs = super().get_form_kwargs()
        kwargs['request'] = self.request
        return kwargs

    def get_context_data(self, **kwargs):
        last = super().get_context_data(**kwargs)
        theme = {'built_in_themes': Theme.built_ins(self.request.user.lights).all()}
        last.update(theme)
        return last

    def form_valid(self, form):
        user = self.request.user
        data = form.cleaned_data
        update = {
            'theme': data['style'],
            'entry_pref': data['entry_count'],
            'title_pref': data['title_count']
        }
        user.update(**update)
        return HttpResponseRedirect(self.request.get_raw_uri())
