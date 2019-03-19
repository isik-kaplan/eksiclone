from django import forms
from django.contrib.auth import authenticate
from django.contrib.auth.forms import AuthenticationForm

from mainsite.app_models import User


class EmailUsernameAuthForm(AuthenticationForm):
    def clean(self):
        username = self.cleaned_data.get('username') or ''

        if '@' in username:
            try:
                username = User.from_email(username)
            except User.DoesNotExist:
                username = None

        password = self.cleaned_data.get('password')

        if username is not None and password:
            self.user_cache = authenticate(self.request, username=username, password=password)
            if self.user_cache is None:
                raise forms.ValidationError(
                    self.error_messages['invalid_login'],
                    code='invalid_login',
                    params={'username': self.username_field.verbose_name},
                )
            else:
                self.confirm_login_allowed(self.user_cache)

        return self.cleaned_data

    def get_user(self):
        return self.user_cache
