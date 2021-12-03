"""Return urls for blogs app."""
from django.urls import path
from .views import (
    BlogCommentsAPIView,
    BlogDetailsAPIView,
    BlogListAPIView,
)

urlpatterns = [
    path('list', BlogListAPIView.as_view(), name="blogs_list"),
    path('comments', BlogCommentsAPIView.as_view(), name="commet_list"),
    path('comment/add', BlogCommentsAPIView.as_view(), name="add_comment"),
    path('<str:slug>', BlogDetailsAPIView.as_view(), name="event_details"),
]
