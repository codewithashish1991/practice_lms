# Generated by Django 3.0.8 on 2020-09-24 06:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('blogs', '0002_auto_20200924_0632'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='blog',
            name='total_views',
        ),
    ]