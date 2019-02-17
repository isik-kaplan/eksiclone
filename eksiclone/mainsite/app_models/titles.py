from django.db import models

from mainsite.app_models.common import CommonFields
from utils.model_decorators import slugify, represent


@slugify('text', 'title', 'title_text')
@represent(strfields='text')
class Title(CommonFields):
    text = models.CharField(max_length=50, null=True, unique=True)
    channels = models.ManyToManyField('TitleChannel', related_name="titles")
    creator = models.ForeignKey('User', default=1, on_delete=models.SET_DEFAULT)
