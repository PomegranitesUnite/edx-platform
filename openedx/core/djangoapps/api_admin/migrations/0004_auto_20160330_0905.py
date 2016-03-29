# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('api_admin', '0003_auto_20160329_1504'),
    ]

    operations = [
        migrations.AlterField(
            model_name='apiaccessrequest',
            name='user',
            field=models.OneToOneField(to=settings.AUTH_USER_MODEL),
        ),
    ]
