# Generated by Django 3.0.8 on 2020-09-24 06:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('crm', '0004_auto_20200918_1252'),
    ]

    operations = [
        migrations.AlterField(
            model_name='career',
            name='dob',
            field=models.DateField(),
        ),
    ]
