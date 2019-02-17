from django import forms
from django.contrib.auth.forms import PasswordChangeForm


class PasswordForm(PasswordChangeForm):
    old_password2 = forms.CharField(
        label="Old password",
        strip=False,
        widget=forms.PasswordInput(attrs={'autofocus': True}),
    )
