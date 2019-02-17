from django.contrib import admin

from mainsite.app_models import (
    User,
    UserTrophy,
    Title,
    TitleChannel,
    Entry,
    Theme
)


class ModelAdmin(admin.ModelAdmin):
    readonly_fields = (
        'date',
    )


admin.site.register(User)

for field in (
        UserTrophy,
        # Title,
        TitleChannel,
        Entry,
        Theme):
    admin.site.register(field, ModelAdmin)


class TitleAdmin(ModelAdmin):
    list_display = ['text', 'creator', ]
    # list_editable = ['creator', ]
    list_display_links = ['text', 'creator']


admin.site.register(Title, TitleAdmin)

# admin.site.unregister(_User)
# admin.site.unregister(Group)
