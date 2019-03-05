from django.contrib import admin

from mainsite.app_models import Title
from .base_admin import BaseAdmin


@admin.register(Title)
class TitleAdmin(BaseAdmin):
    ...
