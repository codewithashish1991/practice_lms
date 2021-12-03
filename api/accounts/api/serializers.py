"""Validate your data before store."""
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.db.models import Avg
from rest_framework import serializers
from accounts.models import (
    Profile,
    Review,
    UserToken,
)

User._meta.get_field('email')._unique = True
User._meta.get_field('username')._unique = True


class UserSerializer(serializers.ModelSerializer):
    """Serializer for user model."""

    class Meta:
        """Meta Information of user serializer."""

        model = User
        fields = (
            'id',
            'first_name',
            'last_name',
            'username',
            'email',
            'password',
        )


class ProfileSerializer(serializers.ModelSerializer):
    """Serializer for profile model."""

    groups_names = serializers.SerializerMethodField('get_groups_names')
    users_id = serializers.SerializerMethodField('get_users_id')
    username = serializers.SerializerMethodField('get_username')
    email = serializers.SerializerMethodField('get_email')
    first_name = serializers.SerializerMethodField('get_first_name')
    last_name = serializers.SerializerMethodField('get_last_name')
    is_staff = serializers.SerializerMethodField('get_is_staff')
    user_rating = serializers.SerializerMethodField('get_avg_review')
    user_rating_count = serializers.SerializerMethodField('get_rating_count')

    class Meta:
        """Meta Information of profile serializer."""

        model = Profile
        fields = (
            "groups_names",
            "users_id",
            "username",
            "email",
            "first_name",
            "last_name",
            "is_staff",
            "profile_img",
            "short_description",
            "profile_description",
            "phone",
            "address",
            "fb_link",
            "tw_link",
            "gplus_link",
            "linkdin_link",
            "user_rating",
            "user_rating_count",
            "added_at",
            "updated_at",
        )

    def get_groups_names(self, obj):
        """Return user group id."""
        return obj.users.groups.values_list('name', flat=True)

    def get_users_id(self, obj):
        """Return user id."""
        return obj.users.pk

    def get_username(self, obj):
        """Return username."""
        return obj.users.username

    def get_is_staff(self, obj):
        """Return user is the member of staff."""
        return obj.users.is_staff

    def get_email(self, obj):
        """Return user email."""
        return obj.users.email

    def get_first_name(self, obj):
        """Return user first name."""
        return obj.users.first_name

    def get_last_name(self, obj):
        """Return user last name."""
        return obj.users.last_name

    def get_avg_review(self, obj):
        """Return user rating."""
        if obj.users:
            rating = Review.objects.filter(
                users=obj.users
            ).aggregate(Avg('rating'))
            return rating
        else:
            return round(0)

    def get_rating_count(self, obj):
        """Return user rating."""
        if obj.users:
            rating = Review.objects.filter(
                users=obj.users
            ).count()
            return rating
        else:
            return 0


class RegisterSerializer(serializers.ModelSerializer):
    """Serializer for register user."""

    class Meta:
        """Meta Information of register user serializer."""

        model = User
        fields = (
            'id',
            'first_name',
            'last_name',
            'username',
            'email',
            'password'
        )
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, data):
        """Call function when create user."""
        user = User.objects.create_user(
            first_name=data['first_name'],
            last_name=data['last_name'],
            username=data['username'],
            email=data['email'],
            password=data['password']
        )
        return user


class LoginSerializer(serializers.Serializer):
    """Serializer for login user."""

    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        """Authenticate login user."""
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials.")


class UserResetPasswordSerializer(serializers.Serializer):
    """Serializer for login user."""

    old_password = serializers.CharField(required=True, min_length=8)
    new_password = serializers.CharField(required=True, min_length=8)


class ForgotPasswordSerializer(serializers.ModelSerializer):
    """Serializer for forgot password."""

    class Meta:
        """Meta Information of register user serializer."""

        model = UserToken
        fields = (
            'token',
            'user',
            'token_type',
            'email',
            'token_verified',
            'added_at',
            'updated_at'
        )


class UserReviewSerializers(serializers.ModelSerializer):
    """docstring for CourseUserReviewSerializers."""

    first_name = serializers.SerializerMethodField('get_first_name')
    last_name = serializers.SerializerMethodField('get_last_name')
    profile_image = serializers.SerializerMethodField('get_profile_image')

    class Meta:
        """Meta Information of course serializer."""

        model = Review
        fields = (
            'review_id',
            'users',
            'first_name',
            'last_name',
            'profile_image',
            'reviewers',
            'review',
            'rating',
            'status',
            'created_at',
            'updated_at'
        )

    def get_first_name(self, obj):
        """Return owner's first name."""
        return obj.reviewers.first_name

    def get_last_name(self, obj):
        """Return owner's last name."""
        return obj.reviewers.last_name

    def get_profile_image(self, obj):
        """Return owner's profile image."""
        if obj.reviewers:
            reviewer = Profile.objects.get(users_id=obj.reviewers)
            return str(reviewer.profile_img)
        else:
            return ''
