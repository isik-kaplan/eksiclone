from rest_framework import generics

from mainsite.api.urls import url
from mainsite.api.views.serializers.entry_serializer import EntryApiCreateSerializer, EntryApiSerializer
from mainsite.api.views.utils.permissions import IsOwnerOrAdmin
from mainsite.app_models import Entry


@url(r'^entry/$')
class EntryCreateApi(generics.CreateAPIView):
    serializer_class = EntryApiCreateSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


@url(r'entry/(?P<pk>\d+)/$')
class EntryDetailApi(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = EntryApiSerializer
    lookup_field = 'pk'
    queryset = Entry.objects.all()
    permission_classes = [IsOwnerOrAdmin]
