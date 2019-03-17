from django import forms

from mainsite.app_models.themes import Theme
from mainsite.app_models.users import User
from utils.decorators import suppress_and_return


class PreferencesForm(forms.Form):
    style = forms.CharField()
    entry_count = forms.IntegerField(max_value=101, min_value=9)
    title_count = forms.IntegerField(max_value=101, min_value=9)

    def __init__(self, request, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.request = request

    @suppress_and_return(Theme.DoesNotExist, instead=Theme.objects.get(name='standard', lights=True))
    def clean_style(self):
        return Theme.objects.get(name=self.cleaned_data['style'], lights=self.request.user.lights)

    class Meta:
        model = User
        fields = ('style', 'entry_count', 'title_count')
