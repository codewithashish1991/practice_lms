"""Register crm app in admin interface."""
from django.contrib import admin
from crm.models import (
    Career,
    Contact,
)


@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    """Register contact model in admin interface."""

    model = Contact
    list_display = (
        'contact_id',
        'name',
        'email',
        'phone',
        'subject',
        'status'
    )


@admin.register(Career)
class CareerAdmin(admin.ModelAdmin):
    """Register career model in admin interface."""

    model = Career
    list_display = (
        'career_id',
        'name',
        'email',
        'designation',
        'experience_in_years',
        'experience_in_month',
        'city',
        'dob',
        'status'
    )
