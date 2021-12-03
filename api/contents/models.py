"""Models for contents app."""
from django.db import models
from ckeditor.fields import RichTextField

content_type = [
    ('BLOCK', 'Block'),
    ('PAGE', 'Page')
]


class BlocksOrContent(models.Model):
    """Model for create table block_or_content."""

    content_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=256)
    var_name = models.CharField(max_length=100)
    content_type = models.CharField(
        max_length=20,
        choices=content_type,
        default="BLOCK"
    )
    url = models.CharField(max_length=120, null=True, blank=True, unique=True)
    description = RichTextField()
    status = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        """Return review id."""
        return str(self.title)


class Slider(models.Model):
    """Model for create table content_slider."""

    slider_id = models.AutoField(primary_key=True)
    content = models.ForeignKey('BlocksOrContent', on_delete=models.CASCADE)
    image = models.ImageField(
        upload_to="images/sliders"
    )
    title = models.CharField(max_length=265)
    small_description = models.CharField(max_length=265)
    read_more_url = models.CharField(max_length=265, default="", blank=True)
    get_started_url = models.CharField(max_length=265, default="", blank=True)
    status = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        """Return slider id."""
        return str(self.slider_id)
