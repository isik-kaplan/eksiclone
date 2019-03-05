from django.contrib import admin

from mainsite.app_models import TitleChannel
from .base_admin import BaseAdmin


@admin.register(TitleChannel)
class TitleChannelAdmin(BaseAdmin):
    ...
