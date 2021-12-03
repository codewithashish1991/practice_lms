"""Return urls for courses app."""
from django.urls import path
from .views import (
    CourseDetailsAPIView,
    CourseEnrollUsersAPIView,
    CourseListAPIView,
    CourseReviewsAPIView,
    CourseUserWishListAPIView,
)

urlpatterns = [
    path('', CourseListAPIView.as_view(), name="course_list"),
    path(
        'wishlist',
        CourseListAPIView.as_view(),
        name="course_wishlist"
    ),
    path('add_review', CourseReviewsAPIView.as_view(), name="add_review"),
    path(
        'add_to_favourite',
        CourseUserWishListAPIView.as_view(),
        name="add_favourite"
    ),
    path(
        'add_enroll_user',
        CourseEnrollUsersAPIView.as_view(),
        name="add_user"
    ),
    path('reviews', CourseReviewsAPIView.as_view(), name="reviews"),
    path('<str:slug>', CourseDetailsAPIView.as_view(), name="course_details"),
]
