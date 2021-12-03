"""Return all function for events module."""
from rest_framework.response import Response
from datetime import date
from knox.auth import TokenAuthentication
from rest_framework import generics, permissions
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND
)
from django.db.models import Q
from .serializers import (
    EventSerializer,
    EventRegistrationSerializer
)
from events.models import (
    Event,
    EventRegistration
)


class EventListAPIView(generics.ListAPIView):
    """Return events list."""

    def get(self, request, *args, **kwargs):
        """Return list when method is get."""
        page = request.query_params.get('page', '')
        limit = request.query_params.get('limit', '')
        user_id = request.query_params.get('user_id', 0)
        owner_id = request.query_params.get('ownerId', 0)
        event_type = request.query_params.get('type', '')
        offset = 0
        conditions = Q(status=True)
        if page:
            offset = (int(page) - 1) * int(limit)
        today = date.today()

        if owner_id:
            conditions &= Q(owner_id=owner_id)

        if event_type:
            if event_type == 'past':
                conditions &= Q(event_date__lt=today)
            elif event_type == 'upcomming':
                conditions &= Q(event_date__gt=today)
            elif event_type == 'myevents':
                booked_events = EventRegistration.objects.filter(
                    users_id=user_id
                ).all()
                booked_event_id = []
                for ev in booked_events:
                    booked_event_id.append(ev.events.event_id)
                conditions &= Q(pk__in=booked_event_id)
            else:
                pass
        if limit:
            events = Event.objects.filter(
                conditions
            ).order_by('event_date')[offset:offset + int(limit)]
        else:
            events = Event.objects.filter(conditions).order_by(
                'event_date'
            ).all()
        total_records = Event.objects.filter(conditions).count()
        serrializer = EventSerializer(
            events,
            many=True,
            context={'user_id': user_id}
        )
        return Response({
            'status': 'success',
            'records': serrializer.data,
            'total_records': total_records
        },
            status=HTTP_200_OK
        )


class EventDetailsAPIView(generics.RetrieveAPIView):
    """Return event's details."""

    def get_objects(self, slug):
        """Get particular event queryset."""
        try:
            return Event.objects.get(slug=slug)
        except Event.DoesNotExist:
            return Response({
                'status': 'errors',
                'errors': 'Not Found'
            },
                status=HTTP_404_NOT_FOUND
            )

    def get(self, request, slug, *args, **kwargs):
        """Return event details."""
        user_id = request.query_params.get('userId', 0)
        event = self.get_objects(slug)
        serializer = EventSerializer(
            event,
            context={'user_id': user_id}
        )
        return Response({
            'status': 'success',
            'records': serializer.data
        },
            status=HTTP_200_OK
        )


class EventRegisterAPIView(generics.CreateAPIView):
    """Add users in event register table."""

    permission_class = [permissions.IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def post(self, request, *args, **kwargs):
        """Return add user response."""
        event = Event.objects.get(event_id=request.data.get('events'))
        avilable_seat = event.no_of_seats
        requested_seat = request.data.get('no_of_seats')
        if avilable_seat > 0:
            if avilable_seat >= requested_seat:
                if requested_seat <= 15:
                    condition = (Q(
                        events=request.data.get('events')
                    ) & Q(
                        users=request.data.get('users')
                    ))
                    if EventRegistration.objects.filter(condition).exists():
                        event_register = EventRegistration.objects.get(
                            condition
                        )
                        registred_seat = event_register.no_of_seats
                        serializer = EventRegistrationSerializer(
                            event_register,
                            data=request.data
                        )
                        if requested_seat > registred_seat:
                            changed_seat = requested_seat - registred_seat
                            updated_seat = (
                                avilable_seat - changed_seat
                            )
                        elif requested_seat < registred_seat:
                            changed_seat = registred_seat - requested_seat
                            updated_seat = (
                                avilable_seat + changed_seat
                            )
                        else:
                            updated_seat = avilable_seat
                    else:
                        serializer = EventRegistrationSerializer(
                            data=request.data
                        )
                        updated_seat = (
                            avilable_seat - requested_seat
                        )
                    if serializer.is_valid():
                        serializer.save()
                        event.no_of_seats = updated_seat
                        event.save()

                        msg = '''Your seat booked successfully.'''
                        return Response({
                            'status': 'success',
                            'message': msg
                        },
                            status=HTTP_200_OK
                        )
                    else:
                        return Response({
                            'status': 'errors',
                            'message': serializer.errors
                        },
                            status=HTTP_400_BAD_REQUEST
                        )
                else:
                    msg = 'You can not book more then 15 seats.'
                    return Response({
                        'status': 'errors',
                        'message': msg
                    },
                        status=HTTP_400_BAD_REQUEST
                    )
            else:
                msg = 'only ' + str(
                    avilable_seat
                ) + ' seats are available to book.'
                return Response({
                    'status': 'errors',
                    'message': msg
                },
                    status=HTTP_400_BAD_REQUEST
                )
        else:
            return Response({
                'status': 'errors',
                'message': 'Sorry! event all seat has been already booked.'
            },
                status=HTTP_404_NOT_FOUND
            )
