from django.contrib import admin

from mainsite.app_models import Entry
from .base_admin import BaseAdmin


@admin.register(Entry)
class EntryAdmin(BaseAdmin):
    readonly_fields = [
        'date',
    ]