from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from mainsite.app_models import User
from .base_admin import BaseAdmin


@admin.register(User)
class UserAdmin(BaseAdmin, UserAdmin):
    fieldsets = None
    fields = [
        'last_login',
        'username',
        'first_name',
        'last_name',
        'email',
        'is_staff',
        'is_active',
        'date_joined',
        'is_author',
        'is_confirmed',
    ]

    search_fields = [
        'username',
    ]

    list_filter = [
        'is_author',
        'is_staff',
        'is_active',
        'is_confirmed',
    ]
