from contextlib import suppress

from django import forms

from mainsite.app_models.users import User


class EmailForm(forms.Form):
    old = forms.EmailField()
    old_ = forms.EmailField()
    new = forms.EmailField()
    new_ = forms.EmailField()

    def __init__(self, request, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.request = request

    def clean(self):
        clean_data = super().clean()
        self.validate()
        return clean_data

    def validate(self):
        data = self.cleaned_data
        old = data['old']
        old_ = data['old_']
        new = data['new']
        new_ = data['new_']
        self._validate(old, old_)
        self._validate(new, new_)
        with suppress(self.request.user.DoesNotExist):
            self._validate(self.request.user, User.from_email(old))

    @staticmethod
    def _validate(a, b):
        if a != b:
            raise forms.ValidationError(f'These should be the same: {a} - {b}')

    class Meta:
        model = User
        fields = ('old', 'old_', 'new', 'new_')
