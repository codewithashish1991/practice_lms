"""Return admin interface for user profile."""
from django.contrib import admin
from django.conf import settings
from django.utils.html import mark_safe
from .models import Profile, Review
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User, Group


class UserProflileInline(admin.StackedInline):
    """Add user profile in user form in admin."""

    model = Profile
    max_num = 1
    can_delete = False


class AccountsUserAdmin(UserAdmin):
    """Register  UserProflileInline function in admin panel."""

    def role(self, obj):
        """Return category picture."""
        if obj.id:
            group = Group.objects.filter(user=obj.id)
            gp_arr = group.values_list('name', flat=True)
            value = ''
            count = gp_arr.count()
            for idx, i in enumerate(gp_arr):
                if count == idx + 1:
                    comma = ''
                else:
                    comma = ', '
                value = value + i + comma

            return value
        else:
            return "None"

    def user_serial_no(self, obj):
        """Return category picture."""
        if obj.id:
            return obj.id
        else:
            return "None"

    def profile_img(self, obj):
        """Return category picture."""
        if obj.id:
            user = Profile.objects.get(users_id=obj.id)
            if user.profile_img:
                return mark_safe(
                    '<img src="' + settings.MEDIA_URL + '%s" width="50" />' %
                    (
                        user.profile_img
                    )
                )
            else:
                return mark_safe(
                    '<img src="' + settings.MEDIA_URL +
                    'images/accounts/default.jpg" width="50" />'
                )
        else:
            return "None"

    inlines = [UserProflileInline]
    list_display = (
        'user_serial_no',
        'profile_img',
        'first_name',
        'last_name',
        'email',
        'role',
        'is_staff',
    )
    ordering = ('-id',)
    list_filter = ('groups', 'is_staff')


admin.site.unregister(User)
admin.site.register(User, AccountsUserAdmin)


@admin.register(Review)
class UserReviewAdmin(admin.ModelAdmin):
    """Register CourseReviewAdmin model in admin interface."""

    def user_name(self, obj):
        """Return category picture."""
        if obj.users:
            if obj.users.first_name or obj.users.last_name:
                return obj.users.first_name + ' ' + obj.users.last_name
            else:
                return obj.users.username
        else:
            return "None"

    def reviewer_name(self, obj):
        """Return category picture."""
        if obj.reviewers:
            if obj.reviewers.first_name or obj.reviewers.last_name:
                return obj.reviewers.first_name + ' ' + obj.reviewers.last_name
            else:
                return obj.reviewers.username
        else:
            return "None"

    list_display = (
        'review_id',
        'user_name',
        'reviewer_name',
        'review',
        'rating',
        'status'
    )
    ordering = ('-created_at',)
