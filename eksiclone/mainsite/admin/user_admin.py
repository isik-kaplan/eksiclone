from django.contrib import admin

from mainsite.app_models import User
from .base_admin import BaseAdmin


@admin.register(User)
class UserTrophyAdmin(BaseAdmin):
    fields = [
        'last_login',
        'username',
        'first_name',
        'last_name',
        'email',
        'is_staff',
        'is_active',
        'date_joined',
    ]
