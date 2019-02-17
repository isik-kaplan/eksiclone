from django.db import models

from utils.utils import unmake_url


class CommonFields(models.Model):
    """@DynamicAttrs"""
    date = models.DateTimeField(null=True, blank=True, auto_now_add=True)

    @classmethod
    def from_url(cls, url):
        name = unmake_url(url)
        field = cls.url_field  # noqa
        return cls.objects.get(**{field: name})

    class Meta:
        abstract = True
