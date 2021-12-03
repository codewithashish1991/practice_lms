"""Return urls for crm app."""
from django.urls import path
from .views import (
    EventListAPIView,
    EventDetailsAPIView,
    EventRegisterAPIView
)

urlpatterns = [
    path('list', EventListAPIView.as_view(), name="event_list"),
    path('book_seat', EventRegisterAPIView.as_view(), name="book_seat"),
    path('<str:slug>', EventDetailsAPIView.as_view(), name="event_list"),
]
