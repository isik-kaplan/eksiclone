from rest_framework import serializers

from mainsite.app_models import Title
from mainsite.api.views.serializers.entry_serializer import EntryApiSerializer


class TitleApiSerializer(serializers.ModelSerializer):
    channels = serializers.StringRelatedField(many=True)
    creator = serializers.StringRelatedField()
    entries = EntryApiSerializer(many=True, source='entry_set')

    class Meta:
        model = Title
        fields = [
            'text',
            'channels',
            'creator',
            'entries'
        ]
