from django.conf.urls import re_path
from django_private_chat import views
from django_urls import UrlManager

mainsite_urls = UrlManager(views_root='mainsite.views')

message_urlpatterns = [
    re_path(
        r'^message/(?P<username>[a-zA-Z0-9-]+)',
        views.DialogListView.as_view(),
        name='message'
    ),
]

mainsite_urls._url_patterns += message_urlpatterns
