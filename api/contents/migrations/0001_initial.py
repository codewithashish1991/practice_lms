# Generated by Django 3.0.8 on 2020-09-25 11:40

import ckeditor.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='BlocksOrContent',
            fields=[
                ('content_id', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=256)),
                ('var_name', models.CharField(max_length=100)),
                ('content_type', models.CharField(choices=[('BLOCK', 'Block'), ('PAGE', 'Page')], default='BLOCK', max_length=20)),
                ('url', models.CharField(blank=True, max_length=120, null=True)),
                ('description', ckeditor.fields.RichTextField()),
                ('status', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='Slider',
            fields=[
                ('slider_id', models.AutoField(primary_key=True, serialize=False)),
                ('image', models.ImageField(upload_to='images/sliders')),
                ('title', models.CharField(max_length=265)),
                ('small_description', models.CharField(max_length=265)),
                ('read_more_url', models.CharField(default='', max_length=265)),
                ('get_started_url', models.CharField(default='', max_length=265)),
                ('status', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('content', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='contents.BlocksOrContent')),
            ],
        ),
    ]
