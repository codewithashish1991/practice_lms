"""Register courses app in admin interface."""
from django.utils.html import mark_safe
from django.contrib import admin
from django.conf import settings
from django.db.models import Q
from django.contrib import messages
from django.core.exceptions import FieldDoesNotExist
from accounts.models import Profile
from categories.models import Categorie
from courses.models import (
    Course,
    CourseEnrollUser,
    CourseLeacture,
    CourseUserReview,
)


admin.site.site_header = "AKB Tutorial Points Admin Portal"
admin.site.site_title = "AKBTP Admin Portal"
admin.site.index_title = "Welcome to AKB Tutorial Points Admin Portal"
admin.site.site_url = 'http://localhost:3001/'


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    """Register course model in admin interface."""

    def course_picture(self, obj):
        """Return category picture."""
        if obj.image:
            return mark_safe(
                '<img src="' + settings.MEDIA_URL + '%s" width="100" />' % (
                    obj.image
                )
            )
        else:
            return "None"

    def no_of_leactures(self, obj):
        """Return category picture."""
        if obj.course_id:
            count = CourseLeacture.objects.filter(
                course_id=obj.course_id
            ).count()
            value = '<a href = "/myadmin/courses/courseleacture/?q='
            value = value + str(obj.course_id)
            value = value + '"> %s</a>' % (
                count
            )
            link = mark_safe(value)
            return link
        else:
            return 0

    def course_owner(self, obj):
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
        course_id = getattr(obj, 'course_id', None)
        profile = Profile.objects.get(users=request.user)
        if course_id:
            condition = (Q(
                course_id=course_id
            ) & Q(
                users=obj.owner
            ))
            try:
                CourseEnrollUser.objects.get(condition)
            except CourseEnrollUser.DoesNotExist:
                erl = CourseEnrollUser(
                    course_id=course_id,
                    users=obj.owner,
                    first_name=obj.owner.first_name,
                    last_name=obj.owner.last_name,
                    email=obj.owner.email,
                    phone=profile.phone,
                    status=True
                )
                erl.save()

    def get_queryset(self, request):
        """Retirn records for respective user only."""
        qs = super(CourseAdmin, self).get_queryset(request)
        if request.user.is_superuser:
            return qs
        else:
            return qs.filter(owner_id=request.user)

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        """Filter category dropdown for course."""
        if db_field.name == "category":
            kwargs["queryset"] = Categorie.objects.filter(cat_type='COURSE')
        return super().formfield_for_foreignkey(db_field, request, **kwargs)

    list_display = (
        'course_id',
        'title',
        'category',
        'course_picture',
        'price',
        'no_of_leactures',
        'featured',
        'course_owner',
        'status',
    )
    ordering = ('-created_at',)
    search_fields = (
        'course_id',
        'title',
        'category__category_id',
        'category__title',
        'featured',
        'status'
    )
    readonly_fields = ('course_picture', 'owner')


@admin.register(CourseLeacture)
class CourseLeactureAdmin(admin.ModelAdmin):
    """Register CourseLeacture model in admin interface."""

    def course_id(self, obj):
        """Return category picture."""
        if obj.course.course_id:
            value = '<a href = "/myadmin/courses/course/'
            value = value + str(obj.course.course_id)
            value = value + '/change/"> %s</a>' % (
                obj.course.course_id
            )
            link = mark_safe(value)
            return link
        else:
            return "None"

    def lacture_picture(self, obj):
        """Return category picture."""
        if obj.preview_image:
            return mark_safe(
                '<img src="' + settings.MEDIA_URL + '%s" width="100" />' % (
                    obj.preview_image
                )
            )
        else:
            return "None"

    def get_queryset(self, request):
        """Return records for respective user only."""
        qs = super(CourseLeactureAdmin, self).get_queryset(request)
        if request.user.is_superuser:
            return qs
        else:
            return qs.filter(course__owner=request.user)

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        """
        Return records for respective user only.

        Return all records if user is superadmin.
        """
        if db_field.name and db_field.name == "course":
            if request.user.is_superuser:
                value = Course.objects.all()
            else:
                value = Course.objects.filter(
                    owner=request.user
                )
            kwargs["queryset"] = value

            return super().formfield_for_foreignkey(
                db_field,
                request,
                **kwargs
            )

    list_display = (
        'title',
        'lacture_picture',
        'leacture_no',
        'lacture_type',
        'course_id',
        'durations_in_hours',
        'durations_in_minutes',
        'status'
    )
    search_fields = (
        'title',
        'course__course_id',
        'course__title',
        'status'
    )
    readonly_fields = ('lacture_picture',)


@admin.register(CourseUserReview)
class CourseReviewAdmin(admin.ModelAdmin):
    """Register CourseReviewAdmin model in admin interface."""

    def get_queryset(self, request):
        """Return records for respective user only."""
        qs = super(CourseReviewAdmin, self).get_queryset(request)
        if request.user.is_superuser:
            return qs
        else:
            return qs.filter(course__owner=request.user)

    def reviewer_name(self, obj):
        """Return category picture."""
        if obj.user:
            if obj.user.first_name or obj.user.last_name:
                return obj.user.first_name + ' ' + obj.user.last_name
            else:
                return obj.user.username
        else:
            return "None"

    def make_active(self, request, queryset):
        """Return make active."""
        try:
            queryset.update(status=True)
            messages.success(
                request,
                '''Selected Record(s) Marked as
                Active Successfully !!'''
            )
        except FieldDoesNotExist as e:
            messages.error(
                request,
                str(e)
            )

    admin.site.add_action(make_active, "Make Active")

    list_display = (
        'review_id',
        'reviewer_name',
        'course',
        'review',
        'rating',
        'status'
    )
    ordering = ('-created_at',)


@admin.register(CourseEnrollUser)
class CourseEnrolledUsersAdmin(admin.ModelAdmin):
    """Register CourseReviewAdmin model in admin interface."""

    def get_queryset(self, request):
        """Return records for respective user only."""
        qs = super(CourseEnrolledUsersAdmin, self).get_queryset(request)
        if request.user.is_superuser:
            return qs
        else:
            return qs.filter(course__owner=request.user)

    def student_name(self, obj):
        """Return category picture."""
        if obj.users:
            if obj.users.first_name or obj.users.last_name:
                return obj.users.first_name + ' ' + obj.users.last_name
            else:
                return obj.users.username
        else:
            return "None"

    list_display = (
        'enroll_id',
        'student_name',
        'course',
        'email',
        'phone',
        'status'
    )
    ordering = ('-created_at',)
