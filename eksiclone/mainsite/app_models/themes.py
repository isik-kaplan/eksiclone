from django.db import models

from mainsite.app_models.common import CommonFields
from utils.model_decorators import slugify, represent


@slugify('-', '-', '-')
@represent(strfields=('name', 'lights'))
class Theme(CommonFields):
    name = models.CharField(max_length=25, null=True, blank=True)
    lights = models.BooleanField()
    is_built_in = models.BooleanField(default=False)
    # TODO implement a more detailed theme option
    # creator = ...
    # details = ...
    path = models.CharField(max_length=1000, null=True, blank=True)

    def opposite(self):
        try:
            return self.__class__.objects.get(name=self.name, lights=not self.lights)
        except self.DoesNotExist:
            return self.__class__.objects.get(name='standard', lights=not self.lights)

    @classmethod
    def built_ins(cls, lights):
        return cls.objects.filter(is_built_in=True, lights=lights)

    class Meta:
        verbose_name_plural = 'Themes'
        unique_together = ('name', 'lights'),
