import { GameDifficulty, GameDifficultySettings } from "./types";

const DIFFICULTY_SETTINGS: Record<GameDifficulty, GameDifficultySettings> = {
  [GameDifficulty.BEGINNER]: { rows: 9, cols: 9, mines: 10 },
  [GameDifficulty.INTERMEDIATE]: { rows: 16, cols: 16, mines: 40 },
  [GameDifficulty.EXPERT]: { rows: 16, cols: 30, mines: 99 },
};

const getDifficultySetting = (difficulty: GameDifficulty) =>
  DIFFICULTY_SETTINGS[difficulty];

export { DIFFICULTY_SETTINGS, getDifficultySetting };

export const normalizeDifficultyString = (difficulty: GameDifficulty) => difficulty.charAt(0) + difficulty.slice(1).toLowerCase();