# Generated by Django 3.0.8 on 2020-09-18 12:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('crm', '0003_auto_20200915_0949'),
    ]

    operations = [
        migrations.AlterField(
            model_name='career',
            name='dob',
            field=models.DateField(auto_now=True),
        ),
    ]