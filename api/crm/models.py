"""Models for courses app."""
from django.db import models
from django.core.validators import RegexValidator
from .validators import validate_file_extension


class Contact(models.Model):
    """Model for create table contacts."""

    phone_regex = RegexValidator(
        regex=r'^(\+\d{1,3})?,?\s?\d{8,13}',
        message="Invalid Phone"
    )
    contact_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    email = models.CharField(max_length=255)
    phone = models.CharField(
        validators=[phone_regex],
        max_length=16,
        blank=True
    )
    subject = models.CharField(max_length=255)
    message = models.TextField()
    status = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Career(models.Model):
    """Model for create table contacts."""

    phone_regex = RegexValidator(
        regex=r'^(\+\d{1,3})?,?\s?\d{8,13}',
        message="Invalid Phone"
    )
    career_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    email = models.CharField(max_length=255)
    country = models.CharField(max_length=255)
    state = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    designation = models.CharField(max_length=120, default='Teacher')
    gender = models.CharField(max_length=20, default='Male')
    phone = models.CharField(
        validators=[phone_regex],
        max_length=16,
        blank=True
    )
    dob = models.DateField()
    experience_in_years = models.IntegerField(default=0)
    experience_in_month = models.IntegerField(default=0)
    resume = models.FileField(
        upload_to="documents/crm/",
        validators=[validate_file_extension])
    status = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
