from django.contrib import admin

from mainsite.app_models import User
from .base_admin import BaseAdmin


@admin.register(User)
class UserTrophyAdmin(BaseAdmin):
    ...
