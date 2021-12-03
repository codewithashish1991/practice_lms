"""Return urls for account app."""
from django.urls import path
from knox.views import LogoutView
from .views import (
    ChangePasswordAPIView as CPAPIView,
    ForgotPasswordAPIView as FPAPIView,
    UserDetailsAPIView,
    UserListAPIView,
    UserLoginAPIView,
    UserRegisterAPIView,
    UserReviewsAPIView,
)

urlpatterns = [
    path('register', UserRegisterAPIView.as_view(), name='user_register'),
    path('reviews', UserReviewsAPIView.as_view(), name="reviews"),
    path('add_review', UserReviewsAPIView.as_view(), name="add_review"),
    path('login', UserLoginAPIView.as_view(), name='user_login'),
    path('logout', LogoutView.as_view(), name='knox_logout'),
    path('update', UserDetailsAPIView.as_view(), name='user_update'),
    path('change_password', CPAPIView.as_view(), name='change_password'),
    path('forgot_password', FPAPIView.as_view(), name='forgot_password'),
    path('reset_password', FPAPIView.as_view(), name='verify_token'),
    path('list', UserListAPIView.as_view(), name='our_team'),
    path('verify_token/<str:token>', FPAPIView.as_view(), name='verify_token'),
    path('<int:pk>', UserDetailsAPIView.as_view(), name='user_details'),
]
