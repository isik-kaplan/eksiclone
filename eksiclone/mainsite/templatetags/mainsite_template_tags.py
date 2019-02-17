import datetime as d

from django import template
from django.utils.timezone import make_aware

register = template.Library()


@register.filter(name="today")
def today_count(title):
    return len(
        title.entry_set.filter(
            date__gte=make_aware(
                d.datetime.today() - d.timedelta(days=1)
            )
        ).exclude(readability=False)
    )
