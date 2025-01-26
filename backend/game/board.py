import random
from .models import Game
from . import constants


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
        num_of_rows=constants.DEFAULT_SETTINGS["rows"],
        num_of_cols=constants.DEFAULT_SETTINGS["cols"],
        num_of_mines=constants.DEFAULT_SETTINGS["mines"],
        state=[],
    ):
        self.num_of_rows = num_of_rows
        self.num_of_cols = num_of_cols
        self.num_of_mines = num_of_mines
        self.num_of_rows = num_of_rows
        self.board = state

    def get_board_state(self):
        return self.board

    def generate_board(self, difficulty=constants.GameDifficulty.BEGINNER):
        settings = constants.DIFFIFULTY_SETTINGS.get(difficulty)
        return self.generate_custom_board(
            rows=settings["rows"], cols=settings["cols"], mines=settings["mines"]
        )

    def generate_custom_board(self, rows, cols, mines):
        is_rows_valid = constants.MIN_ROWS <= rows <= constants.MAX_ROWS
        is_cols_valid = constants.MIN_COLS <= cols <= constants.MAX_COLS
        is_mines_valid = constants.MIN_MINES <= mines <= constants.MAX_MINES

        if not is_rows_valid:
            raise ValueError("provided value for rows is invalid")

        if not is_cols_valid:
            raise ValueError("provided value for cols is invalid")

        if not is_mines_valid:
            raise ValueError("provided value for rows is invalid")

        if len(self.board) > 0:
            raise ValueError("a board already exists")

        # initalize the board
        self.board = []
        for _ in range(rows):
            board_row = []
            for _ in range(cols):
                tile = {
                    "is_flagged": False,
                    "is_hidden": True,
                    # would have used None,
                    # but this has to be 0 in the case of adjacent tiles
                    "value": 0,
                }

                board_row.append(tile)
            self.board.append(board_row)

        # place all mines on the board randomly
        # (making sure that are all successfuly placed with no conflicts)
        mines_placed = 0
        while mines_placed < mines:
            mine_row = random.randint(0, rows - 1)
            mine_col = random.randint(0, cols - 1)

            has_no_mine_placed = self.board[mine_row][mine_col]["value"] != "MINE"
            if has_no_mine_placed:
                self.board[mine_row][mine_col]["value"] = "MINE"
                mines_placed += 1

                # update values of adjacent tiles

                # top_left (-1, -1)     |   top (-1, 0) | top_right (-1, 1)
                # _________________________________________________________
                # left (0, -1)         |    m  (0, 0)  | right (0, 1)
                # _________________________________________________________
                # bottom_left (1, -1) | bottom (1, 0) | bottom_right (1, 1)

                for row_offset in (-1, 0, 1):
                    for col_offset in (-1, 0, 1):
                        adj_row = mine_row + row_offset
                        adj_col = mine_col + col_offset

                        if self.is_adjacent_valid(adj_row, adj_col):
                            self.board[adj_row][adj_col]["value"] += 1

        return self.board

    def in_bounds(self, row, col):
        return 0 <= row < self.num_of_rows and 0 <= col < self.num_of_cols

    def is_adjacent_valid(self, adj_row, adj_col):
        return self.in_bounds(adj_row, adj_col) and not self.is_mine_tile(
            adj_row, adj_col
        )

    def is_mine_tile(self, row, col):
        if self.in_bounds(row, col):
            return self.board[row][col]["value"] == "MINE"
        return False

    def reveal_title(self, row, col):
        # TODO: come back to this
        if self.in_bounds(row, col):
            tile = self.board[row][col]

            if not tile["is_hidden"] or tile["is_flagged"]:
                return True

            tile["is_hidden"] = False

            if tile["value"] == "MINE":
                return False

            # in case of empty tile, reveal adjacent tiles recusively
            if tile["value"] == 0:
                # top_left (-1, -1)     |   top (-1, 0) | top_right (-1, 1)
                # _________________________________________________________
                # left (0, -1)         |    m  (0, 0)  | right (0, 1)
                # _________________________________________________________
                # bottom_left (1, -1) | bottom (1, 0) | bottom_right (1, 1)
                for row_offset in (-1, 0, 1):
                    for col_offset in (-1, 0, 1):
                        adj_row = row + row_offset
                        adj_col = col + col_offset
                        self.reveal_title(adj_row, adj_col)

            return True
        else:
            raise ValueError("provided row and col are not in bounds")

    def reveal_all_mines(self):
        for board_row in self.board:
            for tile in board_row:
                if tile["value"] == "MINE":
                    tile["is_hidden"] = False

    def flag_tile(self, row, col):
        if self.in_bounds(row, col):
            # toggle the flag on the tile (has to be hidden)
            tile = self.board[row][col]
            if tile["is_hidden"]:
                is_flagged = tile["is_flagged"]
            self.board[row][col]["is_flagged"] = not is_flagged
        else:
            raise ValueError("provided row and col are not in bounds")

    def get_sanitized_board(self):
        # TODO: look back at this
        sanitized_board = []
        for row in self.board:
            sanitized_row = []
            for tile in row:
                if not tile["is_hidden"]:
                    sanitized_row.append({"hidden": False, "value": tile["value"]})
                else:
                    sanitized_row.append(
                        {"hidden": True, "flagged": tile["is_flagged"]}
                    )

        sanitized_board.append(sanitized_row)

        return sanitized_board
