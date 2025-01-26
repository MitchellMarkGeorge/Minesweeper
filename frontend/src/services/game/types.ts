export interface GameDetails {
    game_id: string;
    difficulty: GameDifficulty;
    last_played: string;
}

export interface GameDifficultySettings {
    rows: number;
    cols: number;
    mines: number;
}

export const enum GameDifficulty {
    BEGINNER = "BEGINNER",
    INTERMEDIATE = "INTERMEDIATE",
    EXPERT = "EXPERT",
}