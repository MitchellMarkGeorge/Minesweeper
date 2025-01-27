import api from "../api";
import { Game, GameDifficulty, GameDifficultySettings } from "./types";

const getGame = (gameId: string) => {
  return api.get<Game>(`game/${gameId}/`);
};

const newGame = (difficulty: GameDifficulty) => {
  return api.post<{game_id: string}>("game/new_game/", {
    difficulty,
  });
};

const revealTile = (gameId: string, row: number, col: number) => {
    console.log(row, col)
  return api.post<Game>(`game/${gameId}/reveal`, {
    row,
    col,
  });
};

const flagTile = (gameId: string, row: number, col: number) => {
  return api.post<Game>(`game/${gameId}/flag`, {
    row,
    col,
  });
};

const DIFFICULTY_SETTINGS: Record<GameDifficulty, GameDifficultySettings> = {
  [GameDifficulty.BEGINNER]: { rows: 9, cols: 9, mines: 10 },
  [GameDifficulty.INTERMEDIATE]: { rows: 16, cols: 16, mines: 40 },
  [GameDifficulty.EXPERT]: { rows: 16, cols: 30, mines: 99 },
};

const getDifficultySetting = (difficulty: GameDifficulty) =>
  DIFFICULTY_SETTINGS[difficulty];

const normalizeDifficultyString = (difficulty: GameDifficulty) =>
  difficulty.charAt(0) + difficulty.slice(1).toLowerCase();

export {
  DIFFICULTY_SETTINGS,
  getDifficultySetting,
  normalizeDifficultyString,
};

export default {
  getGame,
  newGame,
  revealTile,
  flagTile,
}
