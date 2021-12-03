"""Models for events app."""
from django.db import models
from django.contrib.auth.models import User
from ckeditor.fields import RichTextField


class Event(models.Model):
    """Model for create table events."""

    event_id = models.AutoField(primary_key=True)
    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='owner'
    )
    title = models.CharField(max_length=250)
    slug = models.SlugField(unique=True)
    description = RichTextField()
    venue = models.TextField()
    city = models.CharField(max_length=150)
    state = models.CharField(max_length=150)
    country = models.CharField(max_length=150)
    event_date = models.DateField()
    start_at = models.TimeField()
    end_at = models.TimeField()
    no_of_seats = models.IntegerField(default=0)
    event_picture = models.ImageField(
        upload_to="images/events"
    )
    status = models.BooleanField(default=True)
    added_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        """Return course title."""
        return self.title


class EventRegistration(models.Model):
    """Model for create table event's users."""

    registration_id = models.AutoField(primary_key=True)
    events = models.ForeignKey(
        'Event',
        on_delete=models.CASCADE,
        related_name='events'
    )
    users = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='registered_user'
    )
    no_of_seats = models.IntegerField(default=0)
    status = models.BooleanField(default=False)
    added_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
