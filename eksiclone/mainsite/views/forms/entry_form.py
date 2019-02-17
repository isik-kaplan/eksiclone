from django import forms

from mainsite.app_models import Entry, Title
from utils.utils import unmake_url


class EntryCreateForm(forms.Form):
    text = forms.CharField()

    def __init__(self, request, title_text, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.request = request
        self.title_text = title_text

    def clean(self):
        user = self.request.user
        if user.is_anonymous or not user.is_active or not user.is_author or not user.is_confirmed:
            raise forms.ValidationError('User is not allowed to create entries.')
        title = self.title_text
        try:
            title = Title.from_url(title)
        except Title.DoesNotExist:
            title = Title.objects.create(text=unmake_url(title), creator=user)

        self.cleaned_data['title'] = title
        self.cleaned_data['author'] = user
        return self.cleaned_data

    class Meta:
        model = Entry
        fields = ('text', 'title', 'author')
