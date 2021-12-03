# Generated by Django 3.0.8 on 2020-09-07 08:08

import ckeditor.fields
from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='UserToken',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('token', models.CharField(max_length=100)),
                ('token_type', models.CharField(max_length=100)),
                ('email', models.CharField(max_length=255)),
                ('token_verified', models.BooleanField(max_length=255)),
                ('added_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('profile_img', models.ImageField(blank=True, null=True, upload_to='images/accounts/')),
                ('short_description', models.TextField(blank=True)),
                ('profile_description', ckeditor.fields.RichTextField()),
                ('phone', models.CharField(blank=True, max_length=16, validators=[django.core.validators.RegexValidator(message='Invalid Phone', regex='^(\\+\\d{1,3})?,?\\s?\\d{8,13}')])),
                ('address', models.TextField(blank=True)),
                ('fb_link', models.CharField(blank=True, max_length=216)),
                ('tw_link', models.CharField(blank=True, max_length=216)),
                ('gplus_link', models.CharField(blank=True, max_length=216)),
                ('linkdin_link', models.CharField(blank=True, max_length=216)),
                ('added_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('users', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]