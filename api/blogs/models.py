"""Create model for blogs apps."""
from django.db import models
from django.contrib.auth.models import User
from categories.models import Categorie
from ckeditor.fields import RichTextField


class Blog(models.Model):
    """Create model to create blog table."""

    blog_id = models.AutoField(primary_key=True)
    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )
    category = models.ForeignKey(
        Categorie,
        on_delete=models.CASCADE,
        null=True
    )
    title = models.CharField(max_length=250)
    description = RichTextField()
    slug = models.SlugField(unique=True)
    image = models.ImageField(
        upload_to="images/blogs/"
    )
    no_of_views = models.IntegerField(default=0)
    status = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        """Return review id."""
        return str(self.title)


class UserComment(models.Model):
    """Model for create table user's review of courses."""

    comment_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    parent = models.ForeignKey(
        'self',
        null=True,
        blank=True,
        on_delete=models.CASCADE,
        related_name='subComment'
    )
    blog = models.ForeignKey('Blog', on_delete=models.CASCADE)
    comment = models.TextField(blank=True)
    status = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        """Return review id."""
        return str(self.comment)
