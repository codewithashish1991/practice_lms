"""Create table auth_user_profile and account_usertoken."""
from django.db import models
from django.contrib.auth.models import User
from django.core.validators import RegexValidator
from ckeditor.fields import RichTextField


class Profile(models.Model):
    """create table for user profile."""

    phone_regex = RegexValidator(
        regex=r'^(\+\d{1,3})?,?\s?\d{8,13}',
        message="Invalid Phone"
    )
    users = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_img = models.ImageField(
        upload_to="images/accounts/",
        blank=True,
        null=True
    )
    short_description = models.TextField(blank=True)
    profile_description = RichTextField()
    phone = models.CharField(
        validators=[phone_regex],
        max_length=16,
        blank=True
    )
    address = models.TextField(blank=True)
    fb_link = models.CharField(blank=True, max_length=216)
    tw_link = models.CharField(blank=True, max_length=216)
    gplus_link = models.CharField(blank=True, max_length=216)
    linkdin_link = models.CharField(blank=True, max_length=216)
    added_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class UserToken(models.Model):
    """create table for user token."""

    token = models.CharField(max_length=100)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    token_type = models.CharField(max_length=100)
    email = models.CharField(max_length=255)
    token_verified = models.BooleanField(max_length=255)
    added_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Review(models.Model):
    """create table for user reviews."""

    review_id = models.AutoField(primary_key=True)
    users = models.ForeignKey(User, on_delete=models.CASCADE)
    reviewers = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="reviewers"
    )
    review = models.TextField(blank=True)
    rating = models.IntegerField(default=0)
    status = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        """Return review id."""
        return str(self.review_id)
