import datetime

from django.db.models import Q, Count
from django.utils.timezone import make_aware

from mainsite.app_models import (
    Title,
)

DEFAULT_CHANNEL_QUERIES = {
    'today': {
        'query': Title.objects.distinct('text').order_by('text', 'entry__date'),
        'description': 'today',
    },
    'popular': {
        'query': Title.objects.annotate(
            num_entries=Count(
                "entry", filter=Q(
                    entry__date__gte=make_aware(
                        datetime.datetime.today() - datetime.timedelta(days=7)
                    )
                )
            )
        ).order_by("num_entries"),
        'description': 'popular'
    },
    'hot': {
        'query': Title.objects.annotate(
            num_entries=Count(
                "entry", filter=Q(
                    entry__date__gte=make_aware(
                        datetime.datetime.today() - datetime.timedelta(days=7)
                    )
                )
            )
        ).filter(num_entries__gte=100).order_by('entry__date'),
        'description': 'hot'
    }
}
