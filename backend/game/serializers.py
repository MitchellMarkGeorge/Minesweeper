from rest_framework import serializers
from .models import Game
from .constants import DIFFIFULTY_SETTINGS
from board import MinesweeperBoard


class GameSerializer(serializers.Serializer):

    difficulty = serializers.ChoiceField(choices=Game.Difficulty)

    def validate(self, data):
        if data["difficulty"] not in DIFFIFULTY_SETTINGS.keys():
            raise serializers.ValidationError("invalid difficulty provided")
        return data

    def create(self, validated_data):
        difficulty = validated_data["difficulty"]
        user = validated_data["user"]
        settings = DIFFIFULTY_SETTINGS.get(difficulty)

        minesweeper_board = MinesweeperBoard(
            num_of_rows=settings["rows"],
            num_of_cols=settings["cols"],
            num_of_mines=settings["mines"],
        )

        game = Game.objects.create(
            difficulty=difficulty,
            num_of_rows=settings["rows"],
            num_of_cols=settings["cols"],
            num_of_mines=settings["mines"],
            board=minesweeper_board.generate_board(difficulty),
            user=user,
        )

        return game
