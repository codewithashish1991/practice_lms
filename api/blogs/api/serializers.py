"""Validate your data."""
from rest_framework import serializers
from accounts.models import Profile
from blogs.models import (
    Blog,
    UserComment,
)


class BlogSerializer(serializers.ModelSerializer):
    """BlogSerializer serializers for Blog model."""

    first_name = serializers.SerializerMethodField('get_first_name')
    last_name = serializers.SerializerMethodField('get_last_name')
    category_name = serializers.SerializerMethodField('get_category_name')

    class Meta:
        """Meta Information of Blog serializer."""

        model = Blog
        fields = (
            'blog_id',
            'owner',
            'first_name',
            'last_name',
            'category',
            'category_name',
            'title',
            'description',
            'slug',
            'image',
            'no_of_views',
            'status',
            'created_at',
            'updated_at',
        )

    def get_first_name(self, obj):
        """Return user first name."""
        return obj.owner.first_name

    def get_last_name(self, obj):
        """Return user last name."""
        return obj.owner.last_name

    def get_category_name(self, obj):
        """Return category name."""
        return obj.category.title


class BlogCommentsSerializer(serializers.ModelSerializer):
    """BlogCommentsSerializer serializers for UserComment model."""

    first_name = serializers.SerializerMethodField('get_first_name')
    last_name = serializers.SerializerMethodField('get_last_name')
    profile_image = serializers.SerializerMethodField('get_profile_image')

    class Meta:
        """Meta information of BlogCommentsSerializer."""

        model = UserComment
        fields = (
            'comment_id',
            'user',
            'first_name',
            'last_name',
            'profile_image',
            'parent',
            'blog',
            'comment',
            'status',
            'created_at',
            'updated_at',
        )

    def get_profile_image(self, obj):
        """Return owner's profile image."""
        if obj.user_id:
            user = Profile.objects.get(users_id=obj.user_id)
            return str(user.profile_img)
        else:
            return ''

    def get_first_name(self, obj):
        """Return user first name."""
        return obj.user.first_name

    def get_last_name(self, obj):
        """Return user last name."""
        return obj.user.last_name
