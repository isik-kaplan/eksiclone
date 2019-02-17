from django import forms
from django.contrib.auth.forms import UserCreationForm

from mainsite.app_models.users import User


class RegisterForm(UserCreationForm):
    email = forms.EmailField(max_length=100, min_length=5, required=True)

    class Meta(UserCreationForm.Meta):
        model = User
        fields = UserCreationForm.Meta.fields + ('email', 'theme')
