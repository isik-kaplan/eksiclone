from django.apps import AppConfig

from utils.utils import glob_init, init


class MainsiteConfig(AppConfig):
    name = 'mainsite'
    models_module = 'app_models'

    def ready(self):
        glob_init('mainsite.app_models.signals', path='**', recursive=True)