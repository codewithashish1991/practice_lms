"""Validate your data."""
from rest_framework import serializers
from accounts.models import Profile
from events.models import Event, EventRegistration


class EventSerializer(serializers.ModelSerializer):
    """Serializer for event model."""

    first_name = serializers.SerializerMethodField('get_first_name')
    last_name = serializers.SerializerMethodField('get_last_name')
    profile_image = serializers.SerializerMethodField('get_profile_image')
    booked_seat = serializers.SerializerMethodField('get_booked_seat')

    class Meta:
        """Meta information for event model."""

        model = Event
        fields = (
            'event_id',
            'owner',
            'first_name',
            'last_name',
            'profile_image',
            'title',
            'slug',
            'description',
            'venue',
            'city',
            'state',
            'country',
            'event_date',
            'booked_seat',
            'start_at',
            'end_at',
            'no_of_seats',
            'event_picture',
            'status',
            'added_at',
            'updated_at',
        )

    def get_first_name(self, obj):
        """Return owner's first name."""
        return obj.owner.first_name

    def get_last_name(self, obj):
        """Return owner's last name."""
        return obj.owner.last_name

    def get_booked_seat(self, obj):
        """Return no of booked seat."""
        user_id = self.context['user_id']
        if int(user_id) > 0 and obj.event_id:
            registed_event = EventRegistration.objects.filter(
                users_id=user_id,
                events_id=obj.event_id,
            )
            if registed_event:
                return registed_event[0].no_of_seats
            else:
                return 0
        else:
            return 0

    def get_profile_image(self, obj):
        """Return owner's profile image."""
        if obj.owner_id:
            user = Profile.objects.get(users_id=obj.owner_id)
            return str(user.profile_img)
        else:
            return ''


class EventRegistrationSerializer(serializers.ModelSerializer):
    """Serializer for event register model."""

    class Meta:
        """Meta Information for event register model."""

        model = EventRegistration
        fields = (
            'registration_id',
            'events',
            'users',
            'no_of_seats',
            'status',
            'added_at',
            'updated_at',
        )
