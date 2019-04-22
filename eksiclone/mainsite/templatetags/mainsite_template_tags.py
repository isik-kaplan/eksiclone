import datetime as d

from django import template
from django.utils.timezone import make_aware

register = template.Library()


@register.filter(name="today")
def today_count(title):
    return title.entry_set.filter(
        date__gte=make_aware(
            d.datetime.today() - d.timedelta(days=1)
        )
    ).exclude(readability=False).count()


@register.filter(name='dialog_other')
def dialog_other(dialog, user):
    return dialog.owner == user and dialog.opponent or dialog.owner
