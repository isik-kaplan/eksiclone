from rest_framework import generics

from mainsite.api.urls import url
from mainsite.api.views.serializers.title_serializer import TitleApiSerializer
from mainsite.app_models import Title


@url(r'^titles/(?P<text>[a-zA-Z0-9 ]+)$')
class TitleApi(generics.RetrieveAPIView):
    lookup_field = 'text'
    serializer_class = TitleApiSerializer
    queryset = Title.objects.all()
