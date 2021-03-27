# Generated by Django 3.1.3 on 2021-03-26 11:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0005_orderitem_order'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='deliveredAt',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='order',
            name='isDelivered',
            field=models.BooleanField(default=False, null=True),
        ),
    ]
