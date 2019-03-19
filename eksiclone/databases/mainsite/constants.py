from mainsite.app_models import (
    TitleChannel,
    Title
)

GLOBAL_CONTEXT = {
    'main_channels': TitleChannel.objects.filter(is_main=True),
    'dropdown_channels': TitleChannel.objects.filter(is_main=False),
}

DEFAULT_FIELDS = (
    'today',
    # 'hot',
    'popular',
)

DEFAULT_FIELD = 'today'
DEFAULT_THEME = 'default'
