from django.db import models

from .queryset import QuerySet


class RandManager(models.manager.BaseManager.from_queryset(QuerySet)):
    ...
