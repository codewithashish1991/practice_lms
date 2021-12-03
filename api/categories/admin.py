"""Register category app in admin interface."""

from django.contrib import admin
from .models import Categorie


@admin.register(Categorie)
class CategoryAdmin(admin.ModelAdmin):
    """Register CategoryAdmin model in admin interface."""

    def parent_category(self, obj):
        """Retrun parent category."""
        if obj.parent is not None:
            return obj.parent
        else:
            'NO'

    def type(self, obj):
        """Retrun parent category."""
        if obj.cat_type is not None:
            return obj.cat_type
        else:
            'NO'

    list_display = (
        'title',
        'category_picture',
        'type',
        'parent_category',
        'status'
    )
    ordering = ('-created_at',)
    search_fields = ('title', 'parent__title', 'cat_type')
    readonly_fields = ('category_picture',)
