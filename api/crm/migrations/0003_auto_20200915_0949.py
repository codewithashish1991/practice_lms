# Generated by Django 3.0.8 on 2020-09-15 09:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('crm', '0002_auto_20200915_0512'),
    ]

    operations = [
        migrations.AddField(
            model_name='career',
            name='designation',
            field=models.CharField(default='Teacher', max_length=120),
        ),
        migrations.AddField(
            model_name='career',
            name='gender',
            field=models.CharField(default='Male', max_length=20),
        ),
    ]
