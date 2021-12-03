"""Return urls for crm app."""
from django.urls import path
from .views import (
    CarrerAPIView,
    ContactAPIView
)

urlpatterns = [
    path('carrer', CarrerAPIView.as_view(), name="add_career"),
    path('contact', ContactAPIView.as_view(), name="add_contact"),
]
