"""Models for categories app."""

from django.db import models
from django.conf import settings

category_type = [
    ('BLOG', 'Blog Category'),
    ('COURSE', 'Course Category')
]


class Categorie(models.Model):
    """Model for create table categories."""

    category_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=210)
    cat_type = models.CharField(
        max_length=20,
        choices=category_type,
        default="BLOG"
    )
    slug = models.SlugField(unique=True)
    parent = models.ForeignKey(
        'self',
        null=True,
        blank=True,
        on_delete=models.CASCADE,
        related_name='subCategory'
    )
    image = models.ImageField(
        upload_to="images/categories/",
        blank=True,
        null=True
    )
    no_of_courses = models.IntegerField(default=0)
    status = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        """Return category title."""
        return self.title

    def category_picture(self):
        """Return category picture."""
        if self.image:
            from django.utils.html import mark_safe
            return mark_safe(
                '<img src="' + settings.MEDIA_URL + '%s" width="100" />' % (
                    self.image
                )
            )
        else:
            return "None"
