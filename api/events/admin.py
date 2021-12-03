"""Register events app in admin interface."""
from django.contrib import admin
from django.conf import settings
from django.utils.html import mark_safe
from accounts.models import Profile
from events.models import (
    Event,
    EventRegistration,
)


@admin.register(Event)
class EventsAdmin(admin.ModelAdmin):
    """Register event model in admin interface."""

    def event_owner(self, obj):
        """Return event owner name."""
        if obj.owner_id:
            if obj.owner.first_name or obj.owner.last_name:
                return obj.owner.first_name + ' ' + obj.owner.last_name
            else:
                return obj.owner.username
        else:
            return "None"

    def event_photo(self, obj):
        """Return event picture."""
        if obj.event_picture:
            return mark_safe(
                '<img src="' + settings.MEDIA_URL + '%s" width="100" />' % (
                    obj.event_picture
                )
            )
        else:
            return "None"

    def save_model(self, request, obj, form, change):
        """Return save owner id."""
        if getattr(obj, 'owner_id', None) is None:
            obj.owner = request.user
        obj.save()

    def get_queryset(self, request):
        """Retirn records for respective user only."""
        qs = super(EventsAdmin, self).get_queryset(request)
        if request.user.is_superuser:
            return qs
        else:
            return qs.filter(owner_id=request.user)

    list_display = (
        'event_id',
        'event_photo',
        'title',
        'event_owner',
        'venue',
        'city',
        'event_date',
        'no_of_seats',
        'status',
    )
    ordering = ('-event_id', 'event_date',)
    search_fields = ('title', 'city')
    readonly_fields = ('event_photo', 'owner')


@admin.register(EventRegistration)
class EventRegistrationAdmin(admin.ModelAdmin):
    """Register event registration model in admin interface."""

    def name(self, obj):
        """Return event owner name."""
        if obj.users_id:
            if obj.users.first_name or obj.users.last_name:
                return obj.users.first_name + ' ' + obj.users.last_name
            else:
                return obj.users.username
        else:
            return "None"

    def email(self, obj):
        """Return event owner name."""
        if obj.users_id:
            if obj.users.email:
                return obj.users.email
            else:
                return "None"
        else:
            return "None"

    def phone(self, obj):
        """Return event owner name."""
        if obj.users_id:
            profile = Profile.objects.get(users=obj.users_id)
            return profile.phone
        else:
            return "None"

    list_display = (
        'registration_id',
        'events',
        'name',
        'email',
        'phone',
        'no_of_seats',
        'status',
    )

    search_fields = (
        'events__title',
        'users__first_name',
        'users__last_name',
        'users__email',
    )
