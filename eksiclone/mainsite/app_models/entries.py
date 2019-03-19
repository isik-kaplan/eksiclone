from django.db import models

from mainsite.app_models.common import CommonFields
from utils.model_decorators import slugify, represent


@slugify('pk', '-', '-')
@represent(strfields=['text', 'author'])
class Entry(CommonFields):
    title = models.ForeignKey('Title', on_delete=models.CASCADE)
    text = models.CharField(max_length=2500, null=True, blank=True)
    author = models.ForeignKey('User', default=1, on_delete=models.SET_DEFAULT, null=True, blank=True)
    readability = models.BooleanField(default=True)
    date = models.DateTimeField(auto_now_add=True, blank=True, null=True)

    @property
    def points(self):
        return self.likes.count() - self.dislikes.count()

    class Meta:
        verbose_name_plural = 'Entries'
