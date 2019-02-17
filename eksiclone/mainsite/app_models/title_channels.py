from django.db import models

from mainsite.app_models.common import CommonFields
from utils.model_decorators import slugify, represent


@slugify('name', '-', '-')
@represent(strfields='name')
class TitleChannel(CommonFields):
    name = models.CharField(max_length=50, null=True, blank=True)
    description = models.CharField(max_length=100, null=True, blank=True)
    is_main = models.BooleanField(default=True)
