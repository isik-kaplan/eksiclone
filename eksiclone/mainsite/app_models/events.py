from django.db import models

from mainsite.app_models.common import CommonFields
from utils.model_decorators import slugify, represent
from datetime import datetime


@slugify('name', '-', '-')
@represent(strfields=['text'])
class Event(CommonFields):
    name = models.CharField(max_length=50, null=True, blank=True)
    short_desc = models.CharField(max_length=250, null=True, blank=True)
    desc = models.CharField(max_length=2500, null=True, blank=True)
    start_date = models.DateTimeField(null=True, blank=True)
    end_date = models.DateTimeField(null=True, blank=True)

    @property
    def active(self):
        return self.start_date < datetime.now() < self.end_date
