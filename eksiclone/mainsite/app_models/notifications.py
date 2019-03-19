from django.db import models

from mainsite.app_models.common import CommonFields
from utils.model_decorators import slugify, represent


@slugify('-', '-', '-')
@represent(strfields=('name',))
class Notification(CommonFields):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=250)
    to = models.ForeignKey('User', on_delete=models.CASCADE)
    read = models.BooleanField(default=False)
    discarded = models.BooleanField(default=False)
