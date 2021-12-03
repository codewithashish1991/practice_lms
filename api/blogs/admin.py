"""Register blogs app in admin interface."""
from django.contrib import admin
from django.utils.html import mark_safe
from django.conf import settings
from categories.models import Categorie
from blogs.models import (
    Blog,
    UserComment,
)


@admin.register(Blog)
class BlogsAdmin(admin.ModelAdmin):
    """Register Blog model in admin interface."""

    def blog_picture(self, obj):
        """Return category picture."""
        if obj.image:
            return mark_safe(
                '<img src="' + settings.MEDIA_URL + '%s" width="100" />' % (
                    obj.image
                )
            )
        else:
            return "None"

    def blog_owner(self, obj):
        """Return category picture."""
        if obj.owner_id:
            if obj.owner.first_name or obj.owner.last_name:
                return obj.owner.first_name + ' ' + obj.owner.last_name
            else:
                return obj.owner.username
        else:
            return "None"

    def save_model(self, request, obj, form, change):
        """Return save owner id."""
        if getattr(obj, 'owner_id', None) is None:
            obj.owner = request.user
        obj.save()

    def get_queryset(self, request):
        """Retirn records for respective user only."""
        qs = super(BlogsAdmin, self).get_queryset(request)
        if request.user.is_superuser:
            return qs
        else:
            return qs.filter(owner_id=request.user)

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        """Filter category dropdown for course."""
        if db_field.name == "category":
            kwargs["queryset"] = Categorie.objects.filter(cat_type='BLOG')
        return super().formfield_for_foreignkey(db_field, request, **kwargs)

    list_display = (
        'blog_id',
        'blog_picture',
        'category',
        'title',
        'blog_owner',
        'status',
    )
    ordering = ('-created_at',)
    search_fields = (
        'blog_id',
        'title',
        'category__title',
        'owner__first_name',
        'owner__last_name'
    )
    readonly_fields = ('blog_picture', 'owner', 'no_of_views')


@admin.register(UserComment)
class BlogCommentsAdmin(admin.ModelAdmin):
    """Register UserComment model in admin interface."""

    def comment_by(self, obj):
        """Return category picture."""
        if obj.user_id:
            if obj.user.first_name or obj.user.last_name:
                return obj.user.first_name + ' ' + obj.user.last_name
            else:
                return obj.user.username
        else:
            return "None"

    def comment_type(self, obj):
        """Retrun parent category."""
        if obj.parent is not None:
            return 'Reply of ' + obj.parent
        else:
            'Comment'

    list_display = (
        'comment_id',
        'blog',
        'comment_by',
        'comment_type',
        'comment',
        'status',
    )
