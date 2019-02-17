from rest_framework import serializers

from mainsite.app_models import Entry, Title


class CommonMeta:
    model = Entry

    fields = [
        'pk',
        'title',
        'text',
        'author',
        'points',
        'readability'
    ]

    read_only_fields = [
        'pk',
        'author',
        'points',
        'points',
    ]


class EntryApiCreateSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField()
    title = serializers.SlugRelatedField(slug_field='text', queryset=Title.objects.all(), required=True)

    class Meta(CommonMeta):
        pass


class EntryApiSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField()
    title = serializers.StringRelatedField()

    class Meta(CommonMeta):
        pass
