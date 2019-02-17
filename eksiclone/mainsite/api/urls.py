from utils.decorators import url_manager


url, urlpatterns = url_manager()

from django.contrib import admin  # noqa
from django.urls import re_path  # noqa

_ = [re_path(r'addmin/', admin.site.urls, name='whatever')]  # noqa

urlpatterns += _   # noqa
