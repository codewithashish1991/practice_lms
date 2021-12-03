"""Validate your data."""
from rest_framework import serializers
from crm.models import (
    Career,
    Contact,
)


class CareerSerializer(serializers.ModelSerializer):
    """Lecture CareerSerializer for carrer model."""

    class Meta:
        """Meta Information of carrer serializer."""

        model = Career
        fields = (
            'career_id',
            'name',
            'email',
            'country',
            'state',
            'city',
            'phone',
            'dob',
            'designation',
            'gender',
            'experience_in_years',
            'experience_in_month',
            'resume',
            'status',
            'created_at',
            'updated_at'
        )


class ContactSerializer(serializers.ModelSerializer):
    """Lecture CareerSerializer for carrer model."""

    class Meta:
        """Meta Information of carrer serializer."""

        model = Contact
        fields = (
            'contact_id',
            'name',
            'email',
            'phone',
            'subject',
            'message',
            'status',
            'created_at',
            'updated_at'
        )
