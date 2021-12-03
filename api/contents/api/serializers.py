"""Validate your data before store."""
from rest_framework import serializers
from contents.models import (
    BlocksOrContent,
    Slider,
)


class BlocksOrContentSerializer(serializers.ModelSerializer):
    """Serializer for BlocksOrContent model."""

    class Meta:
        """Meta Information of BlocksOrContent serializer."""

        model = BlocksOrContent
        fields = (
            'content_id',
            'title',
            'var_name',
            'content_type',
            'url',
            'description',
            'status',
            'created_at',
            'updated_at',
        )


class SliderSerializer(serializers.ModelSerializer):
    """Serializer for Slider model."""

    class Meta:
        """Meta Information of profile serializer."""

        model = Slider
        fields = (
            "slider_id",
            "content",
            "image",
            "title",
            "small_description",
            "read_more_url",
            "get_started_url",
            "status",
            "created_at",
            "updated_at"
        )
