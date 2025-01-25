from .models import Game
from .constants import DEFAULT_SETTINGS, GameDifficulty, DIFFIFULTY_SETTINGS


class MinesweeperBoard:

    @staticmethod
    def from_game(game: Game):
        return MinesweeperBoard(
            num_of_rows=game.num_of_rows,
            num_of_cols=game.num_of_cols,
            num_of_mines=game.num_of_mines,
            state=game.board,
        )

    def __init__(
        self,
        num_of_rows=DEFAULT_SETTINGS["rows"],
        num_of_cols=DEFAULT_SETTINGS["cols"],
        num_of_mines=DEFAULT_SETTINGS["mines"],
        state=[],
    ):
        self.num_of_rows = num_of_rows
        self.num_of_cols = num_of_cols
        self.num_of_mines = num_of_mines
        self.num_of_rows = num_of_rows
        self.board = state

    def get_board_state(self):
        return self.board

    def generate_board(self, difficulty=GameDifficulty.BEGINNER):
        settings = DIFFIFULTY_SETTINGS.get(difficulty)
        return self.generate_custom_board(
            rows=settings["rows"], cols=settings["cols"], mines=settings["mines"]
        )

    def generate_custom_board(self, rows, cols, mines):
        pass

    def reveal_title(self, row, col):
        pass

    def sanitize_board(self):
        pass
