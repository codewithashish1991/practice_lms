# Generated by Django 3.0.8 on 2020-09-24 06:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blogs', '0003_remove_blog_total_views'),
    ]

    operations = [
        migrations.AddField(
            model_name='blog',
            name='no_of_views',
            field=models.IntegerField(default=0),
        ),
    ]