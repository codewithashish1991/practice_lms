"""Register contents app in admin interface."""

from django.contrib import admin
from django.utils.html import mark_safe
from django.conf import settings
from .models import (
    BlocksOrContent,
    Slider,
)


@admin.register(BlocksOrContent)
class BlocksOrContentAdmin(admin.ModelAdmin):
    """Register BlocksOrContent model in admin interface."""

    list_display = (
        'content_id',
        'title',
        'content_type',
        'url',
        'status'
    )
    ordering = ('-created_at',)
    search_fields = ('title', 'content_type', 'url')


@admin.register(Slider)
class SliderAdmin(admin.ModelAdmin):
    """Register Slider model in admin interface."""

    def slider_picture(self, obj):
        """Return category picture."""
        if obj.image:
            return mark_safe(
                '<img src="' + settings.MEDIA_URL + '%s" width="100" />' % (
                    obj.image
                )
            )
        else:
            return "None"

    list_display = (
        'slider_id',
        'content',
        'slider_picture',
        'title',
        'status'
    )
    ordering = ('-created_at',)
    search_fields = ('content__title', 'title')
    readonly_fields = ('slider_picture',)
