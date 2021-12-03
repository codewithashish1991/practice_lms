"""Return urls for category app."""
from django.urls import path
from .views import (
    CategoryListAPIView,
)
urlpatterns = [
    path('', CategoryListAPIView.as_view(), name='category_list'),
]
