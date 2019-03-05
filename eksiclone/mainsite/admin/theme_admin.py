from django.contrib import admin

from mainsite.app_models import Theme
from .base_admin import BaseAdmin


@admin.register(Theme)
class ThemeAdmin(BaseAdmin):
    ...
