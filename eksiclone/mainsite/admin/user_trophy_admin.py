from django.contrib import admin

from mainsite.app_models import UserTrophy
from .base_admin import BaseAdmin


@admin.register(UserTrophy)
class UserTrophyAdmin(BaseAdmin):
    ...
