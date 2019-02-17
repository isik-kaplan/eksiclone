from functools import partial

from django.conf import settings
from django_hosts import patterns, host

from utils.utils import init

patterns = partial(patterns, '')

init('mainsite.api.views')

host_patterns = patterns(
    host(r'www', settings.ROOT_URLCONF, name='www'),
    host(r'api', 'mainsite.api.urls', name='api')
)
