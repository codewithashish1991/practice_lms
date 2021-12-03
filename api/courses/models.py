"""Models for courses app."""
from django.db import models
from django.contrib.auth.models import User
from categories.models import Categorie
from ckeditor.fields import RichTextField
from django.core.validators import RegexValidator
from .validators import validate_file_extension


class Course(models.Model):
    """Model for create table courses."""

    course_id = models.AutoField(primary_key=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.ForeignKey(Categorie, on_delete=models.CASCADE)
    title = models.CharField(max_length=250)
    description = RichTextField()
    slug = models.SlugField(unique=True)
    image = models.ImageField(
        upload_to="images/courses/",
        blank=True,
        null=True
    )
    durations_in_hours = models.IntegerField(default=0)
    durations_in_minutes = models.IntegerField(default=0)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    featured = models.BooleanField(default=False)
    status = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        """Return course title."""
        return str(self.course_id) + ' - ' + self.title


class CourseEnrollUser(models.Model):
    """Model for create table course's users."""

    phone_regex = RegexValidator(
        regex=r'^(\+\d{1,3})?,?\s?\d{8,13}',
        message="Invalid Phone"
    )
    enroll_id = models.AutoField(primary_key=True)
    course = models.ForeignKey("Course", on_delete=models.CASCADE)
    users = models.ForeignKey(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.CharField(max_length=250)
    phone = models.CharField(
        validators=[phone_regex],
        max_length=16,
        blank=True
    )
    address = models.TextField(blank=True)
    status = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class CourseUserWishList(models.Model):
    """Model for create table user's wishlist of courses."""

    wishlist_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    course = models.ForeignKey('Course', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)


class CourseUserReview(models.Model):
    """Model for create table user's review of courses."""

    review_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    course = models.ForeignKey('Course', on_delete=models.CASCADE)
    review = models.TextField(blank=True)
    rating = models.IntegerField(default=0)
    status = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        """Return review id."""
        return str(self.review_id)


class CourseLeacture(models.Model):
    """Model for create table course's leacture of courses."""

    lacture_type = [
        ('SAMPLE', 'Sample'),
        ('PAID', 'Paid')
    ]

    leacture_id = models.AutoField(primary_key=True)
    course = models.ForeignKey('Course', on_delete=models.CASCADE)
    lacture_type = models.CharField(
        max_length=20,
        choices=lacture_type,
        default="PAID"
    )
    leacture_no = models.DecimalField(max_digits=5, decimal_places=1)
    title = models.CharField(max_length=200)
    durations_in_hours = models.IntegerField(default=0)
    durations_in_minutes = models.IntegerField(default=0)
    description = RichTextField()
    preview_image = models.ImageField(
        upload_to="images/courses/leactures/",
        blank=True,
        null=True
    )
    content_file = models.FileField(
        upload_to="images/courses/leactures/",
        validators=[validate_file_extension])
    status = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
