export interface Game {
  id: string;
  num_of_rows: number;
  num_of_cols: number;
  num_of_mines: number;
  difficulty: GameDifficulty;
  status: GameStatus;
  board: GameBoard;
}

export type GameBoard = Tile[][];

export interface Tile {
  hidden: boolean;
  value?: string | number;
  flagged?: boolean;
}

export const enum GameStatus {
  RUNNING = "RUNNING",
  WON = "WON",
  LOST = "LOST",
}
export interface LastGameDetails {
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
