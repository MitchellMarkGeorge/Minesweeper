import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import {
  Game as GameType,
  GameBoard,
  LastGameDetails,
} from "../../services/game/types";
import { ROUTES } from "../../routes/routes";
import game from "../../services/game";
import { Text } from "../../ui";

import "./Game.css";
import { Board } from "./components/Board";
import { LAST_GAME_DETAILS_KEY } from "../../utils/constants";

type GameInfo = Omit<GameType, "board">;

export function Game() {
  const { game_id } = useParams();
  const [gameInfo, updateGameInfo] = useState<GameInfo | null>(null);
  const [board, updateBoard] = useState<GameBoard | null>(null);

  useEffect(() => {
    getGame();
  }, [game_id]);

  const updateState = (game: GameType) => {
      const { board, ...rest } = game;
      console.log(rest.status);
      updateGameInfo(rest);
      console.log(board);
      updateBoard(board);
      const lastGameState: LastGameDetails = {
        game_id: rest.id,
        difficulty: rest.difficulty,
        status: rest.status,
        last_played: new Date().toString(),
      };
      localStorage.setItem(LAST_GAME_DETAILS_KEY, JSON.stringify(lastGameState))
  }

  const revealTile = async (row: number, col: number) => {
    if (!game_id) return;
    try {
      const response = await game.revealTile(game_id, row, col);
      updateState(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const flagTile = async (row: number, col: number) => {
    if (!game_id) return;
    try {
      const response = await game.flagTile(game_id, row, col);
      updateState(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getGame = async () => {
    try {
      if (!game_id) return;
      const response = await game.getGame(game_id);
      updateState(response.data)
    } catch (error) {
      console.log(error);
    }
  };

  if (!game_id) return <Navigate to={ROUTES.HOME} />;

  if (board === null || gameInfo === null)
    return (
      <div className="loading-container">
        <Text size="2xl">Loading...</Text>
      </div>
    );

  return (
    <div className="game-container">
      <Board
        gameStatus={gameInfo.status}
        data={board}
        mines={gameInfo.num_of_mines}
        flagTile={flagTile}
        revealTile={revealTile}
      />
    </div>
  );
}
