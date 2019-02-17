from django.db import models

from mainsite.app_models.common import CommonFields
from utils.model_decorators import slugify, represent


@slugify('name', '-', '-')
@represent(strfields='name')
class UserTrophy(CommonFields):
    name = models.CharField(max_length=100, null=True, blank=True)
    description = models.CharField(max_length=2000, null=True, blank=True)

    class Meta:
        verbose_name_plural = 'UserTrophies'
