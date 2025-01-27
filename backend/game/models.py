from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from uuid import uuid4
from . import constants
from authentication.models import User


class Game(models.Model):

    class Difficulty(models.TextChoices):
        BEGINNER = constants.GameDifficulty.BEGINNER
        INTERMEDIATE = constants.GameDifficulty.INTERMEDIATE
        EXPERT = constants.GameDifficulty.EXPERT

    class GameStatus(models.TextChoices):
        RUNNING = "RUNNING"
        WON = "WON"
        LOST = "LOST"

    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)

    difficulty = models.CharField(
        max_length=15,
        choices=Difficulty,
        default=Difficulty.BEGINNER,
    )

    num_of_rows = models.SmallIntegerField(
        default=constants.DEFAULT_SETTINGS["rows"],
        validators=[
            MinValueValidator(constants.MIN_ROWS),
            MaxValueValidator(constants.MAX_ROWS),
        ],
    )

    num_of_cols = models.SmallIntegerField(
        default=constants.DEFAULT_SETTINGS["cols"],
        validators=[
            MinValueValidator(constants.MIN_COLS),
            MaxValueValidator(constants.MAX_COLS),
        ],
    )

    num_of_mines = models.SmallIntegerField(
        default=constants.DEFAULT_SETTINGS["mines"],
        validators=[
            MinValueValidator(constants.MIN_MINES),
            MaxValueValidator(constants.MAX_COLS),
        ],
    )

    status = models.CharField(
        max_length=12,
        choices=GameStatus,
        default=GameStatus.RUNNING,
    )

    board = models.JSONField(default=list)

    created_at = models.DateTimeField(auto_now_add=True)

    last_saved = models.DateTimeField(auto_now=True)

    user = models.ForeignKey(User, on_delete=models.CASCADE)
