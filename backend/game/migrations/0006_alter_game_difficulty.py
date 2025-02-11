# Generated by Django 5.1.5 on 2025-01-27 00:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("game", "0005_alter_game_status"),
    ]

    operations = [
        migrations.AlterField(
            model_name="game",
            name="difficulty",
            field=models.CharField(
                choices=[
                    ("BEGINNER", "Beginner"),
                    ("INTERMEDIATE", "Intermediate"),
                    ("EXPERT", "Expert"),
                ],
                default="BEGINNER",
                max_length=15,
            ),
        ),
    ]
