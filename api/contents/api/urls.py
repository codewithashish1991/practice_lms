"""Return urls for contents app."""
from django.urls import path
from .views import (
    ContentDetailsAPIView,
    ContentListAPIView,
    SliderListAPIView,
)

urlpatterns = [
    path('', ContentListAPIView.as_view(), name='content_list'),
    path(
        'sliders',
        SliderListAPIView.as_view(),
        name="sliders"
    ),
    path('<int:pk>', ContentDetailsAPIView.as_view(), name='content_details')
]
