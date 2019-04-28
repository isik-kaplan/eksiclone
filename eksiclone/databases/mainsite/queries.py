import datetime

from django.db.models import Q, Count, Max, Case, When, BooleanField
from django.utils.timezone import make_aware

from mainsite.app_models import (
    Title,
)

DEFAULT_CHANNEL_QUERIES = {
    'today': {
        'query': Title.objects.annotate(
            last=Max('entry__date'), has_entry=Case(When(entry__readability=True, then=True), output_field=BooleanField())
        ).filter(has_entry=True).order_by('-last'),
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
    # 'hot': {
    #     'query': Title.objects.annotate(
    #         num_entries=Count(
    #             "entry", filter=Q(
    #                 entry__date__gte=make_aware(
    #                     datetime.datetime.today() - datetime.timedelta(days=7)
    #                 )
    #             )
    #         )
    #     ).filter(num_entries__gte=100).order_by('entry__date'),
    #     'description': 'hot'
    # }
}
