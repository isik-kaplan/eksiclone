from django import forms

from mainsite.app_models.users import User


class DeleteAccountForm(forms.Form):
    password = forms.CharField()
    action = forms.ChoiceField(
        choices=(
            ('deactivate', 'deactivate'),
            ('delete', 'delete')
        )
    )

    def __init__(self, request, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.request = request

    def validate(self):
        print(self.cleaned_data)
        try:
            if not self.request.user.check_password(self.cleaned_data['password']):
                raise forms.ValidationError('Incorrect password')
        except KeyError:
            raise forms.ValidationError('All fields are required')

    def clean(self):
        clean_data = super().clean()
        self.validate()
        return clean_data

    def do_it(self):
        action = self.cleaned_data['action']
        user = self.request.user
        getattr(user, 'self_' + str(action))()

    class Meta:
        model = User
        fields = ('action', 'password')