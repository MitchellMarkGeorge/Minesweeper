from enum import StrEnum


class GameDifficulty(StrEnum):
    BEGINNER = "beginner"
    INTERMEDIATE = "intermediate"
    EXPERT = "expert"


DIFFIFULTY_SETTINGS = {
    GameDifficulty.BEGINNER: {
        "rows": 9,
        "cols": 9,
        "mines": 10,
    },
    GameDifficulty.INTERMEDIATE: {
        "rows": 16,
        "cols": 16,
        "mines": 40,
    },
    GameDifficulty.EXPERT: {
        "rows": 30,
        "cols": 16,
        "mines": 99,
    }
}

DEFAULT_SETTINGS = DIFFIFULTY_SETTINGS.get(GameDifficulty.BEGINNER)

MAX_ROWS = 30
MAX_COLS = 24
MAX_MINES = (MAX_ROWS - 1) * (MAX_COLS - 1)

MIN_MINES = 10
MIN_ROWS = 9
MIN_COLS = 9
