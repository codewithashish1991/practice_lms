"""Validate your data."""
from rest_framework import serializers
from accounts.models import Profile
from django.db.models import Avg
from courses.models import (
    Course,
    CourseEnrollUser,
    CourseLeacture,
    CourseUserReview,
    CourseUserWishList,
)


class Lactureserializers(serializers.ModelSerializer):
    """Lecture serializers for course model."""

    class Meta:
        """Meta Information of lecture serializer."""

        model = CourseLeacture
        fields = (
            'leacture_id',
            'course',
            'leacture_no',
            'title',
            'durations_in_hours',
            'durations_in_minutes',
            'description',
            'preview_image',
            'content_file',
            'lacture_type',
            'status',
            'created_at',
            'updated_at'
        )


class CourseSerializers(serializers.ModelSerializer):
    """Course serializers for course model."""

    category_name = serializers.SerializerMethodField('get_category_name')
    category_slug = serializers.SerializerMethodField('get_category_slug')
    first_name = serializers.SerializerMethodField('get_first_name')
    last_name = serializers.SerializerMethodField('get_last_name')
    user_roles = serializers.SerializerMethodField('get_user_roles')
    social_links = serializers.SerializerMethodField('get_profile_links')
    profile_desc = serializers.SerializerMethodField('get_profile_desc')
    profile_image = serializers.SerializerMethodField('get_profile_image')
    enroll_users = serializers.SerializerMethodField('get_enroll_user')
    review_count = serializers.SerializerMethodField('get_review_count')
    fav_count = serializers.SerializerMethodField('get_fav_count')
    is_enrolled = serializers.SerializerMethodField('get_is_enrolled')
    is_favourite = serializers.SerializerMethodField('get_is_favourite')
    avg_review = serializers.SerializerMethodField('get_avg_review')
    lactures = serializers.SerializerMethodField('get_lactures')

    class Meta:
        """Meta Information of course serializer."""

        model = Course
        fields = (
            'course_id',
            'title',
            'category_name',
            'category_slug',
            'first_name',
            'last_name',
            'profile_image',
            'social_links',
            'profile_desc',
            'user_roles',
            'lactures',
            'category',
            'owner',
            'description',
            'image',
            'durations_in_hours',
            'durations_in_minutes',
            'price',
            'enroll_users',
            'is_enrolled',
            'is_favourite',
            'review_count',
            'fav_count',
            'avg_review',
            'featured',
            'slug',
            'status',
            'created_at',
            'updated_at',
        )

    def get_category_name(self, obj):
        """Return category's title."""
        return obj.category.title

    def get_category_slug(self, obj):
        """Return category's slug."""
        return obj.category.slug

    def get_first_name(self, obj):
        """Return owner's first name."""
        return obj.owner.first_name

    def get_last_name(self, obj):
        """Return owner's last name."""
        return obj.owner.last_name

    def get_user_roles(self, obj):
        """Return owner's last name."""
        return obj.owner.groups.values_list('name', flat=True)

    def get_enroll_user(self, obj):
        """Return cours's enroll user's count."""
        if obj.course_id:
            return CourseEnrollUser.objects.filter(
                course=obj.course_id
            ).count()
        else:
            return 0

    def get_is_enrolled(self, obj):
        """Return cours's enroll user's count."""
        user_id = self.context['user_id']
        if int(user_id) > 0 and obj.course_id:
            user = CourseEnrollUser.objects.filter(
                users=user_id
            ).filter(
                course=obj.course_id
            ).filter(
                status=True
            )
            if user.exists():
                return True
            else:
                return False
        else:
            return False

    def get_is_favourite(self, obj):
        """Return cours's enroll user's count."""
        user_id = self.context['user_id']
        if int(user_id) > 0 and obj.course_id:
            user = CourseUserWishList.objects.filter(
                user=user_id
            ).filter(
                course=obj.course_id
            )
            if user.exists():
                return True
            else:
                return False
        else:
            return False

    def get_review_count(self, obj):
        """Return cours's enroll user's count."""
        if obj.course_id:
            return CourseUserReview.objects.filter(
                course=obj.course_id
            ).count()
        else:
            return 0

    def get_fav_count(self, obj):
        """Return cours's enroll user's count."""
        if obj.course_id:
            return CourseUserWishList.objects.filter(
                course=obj.course_id
            ).count()
        else:
            return 0

    def get_avg_review(self, obj):
        """Return cours's enroll user's count."""
        if obj.course_id:
            return CourseUserReview.objects.filter(
                course=obj.course_id
            ).aggregate(Avg('rating'))
        else:
            return round(0)

    def get_profile_image(self, obj):
        """Return owner's profile image."""
        if obj.owner_id:
            user = Profile.objects.get(users_id=obj.owner_id)
            return str(user.profile_img)
        else:
            return ''

    def get_profile_desc(self, obj):
        """Return owner's profile image."""
        if obj.owner_id:
            user = Profile.objects.get(users_id=obj.owner_id)
            return str(user.profile_description)
        else:
            return ''

    def get_profile_links(self, obj):
        """Return owner's profile image."""
        social_links = {}
        if obj.owner_id:
            user = Profile.objects.get(users_id=obj.owner_id)
            social_links['fb_link'] = user.fb_link
            social_links['tw_link'] = user.tw_link
            social_links['gplus_link'] = user.gplus_link
            social_links['linkdin_link'] = user.linkdin_link
        return social_links

    def get_lactures(self, obj):
        """Return owner's profile image."""
        if obj.course_id:
            lactures = CourseLeacture.objects.filter(
                course_id=obj.course_id
            ).order_by('leacture_no')
            serializer = Lactureserializers(lactures, many=True)
            return serializer.data
        else:
            return ''


class CourseUserReviewSerializers(serializers.ModelSerializer):
    """docstring for CourseUserReviewSerializers."""

    first_name = serializers.SerializerMethodField('get_first_name')
    last_name = serializers.SerializerMethodField('get_last_name')
    profile_image = serializers.SerializerMethodField('get_profile_image')

    class Meta:
        """Meta Information of course serializer."""

        model = CourseUserReview
        fields = (
            'review_id',
            'user',
            'first_name',
            'last_name',
            'profile_image',
            'course',
            'review',
            'rating',
            'status',
            'created_at',
            'updated_at'
        )

    def get_first_name(self, obj):
        """Return owner's first name."""
        return obj.user.first_name

    def get_last_name(self, obj):
        """Return owner's last name."""
        return obj.user.last_name

    def get_profile_image(self, obj):
        """Return owner's profile image."""
        if obj.user_id:
            user = Profile.objects.get(users_id=obj.user_id)
            return str(user.profile_img)
        else:
            return ''


class CourseEnrollUserSerializers(serializers.ModelSerializer):
    """docstring for CourseEnrollUserSerializers."""

    class Meta:
        """Meta Information of course user serializer."""

        model = CourseEnrollUser
        fields = (
            'enroll_id',
            'course',
            'users',
            'first_name',
            'last_name',
            'email',
            'phone',
            'address',
            'status',
            'created_at',
            'updated_at'
        )


class CourseUserWishListSerializers(serializers.ModelSerializer):
    """docstring for CourseUserWishListSerializers."""

    class Meta:
        """Meta Information of course user wishlist serializer."""

        model = CourseUserWishList
        fields = (
            'wishlist_id',
            'user',
            'course',
            'created_at'
        )
