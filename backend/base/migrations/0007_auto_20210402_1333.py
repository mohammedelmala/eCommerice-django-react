# Generated by Django 3.1.3 on 2021-04-02 09:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0006_auto_20210326_1506'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='image',
            field=models.ImageField(blank=True, default='/single.webp', null=True, upload_to=''),
        ),
    ]
