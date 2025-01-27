import { useEffect, useRef, useState } from "react";
import { GameBoard, GameStatus } from "../../../../services/game/types";
import { Text } from "../../../../ui";
import { Tile } from "../Tile";

import "./Board.css";

interface Props {
  data: GameBoard;
  mines: number;
  gameStatus: GameStatus;
  revealTile: (row: number, col: number) => Promise<void>;
  flagTile: (row: number, col: number) => Promise<void>;
}

export function Board({
  data,
  mines,
  revealTile,
  flagTile,
  gameStatus,
}: Props) {
  const [timer, setTimer] = useState(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (
      (gameStatus === GameStatus.WON || gameStatus === GameStatus.LOST) &&
      intervalRef.current
    ) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setTimer(0);
    }
  }, [gameStatus]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const formatSeconds = (seconds: number) => {
    return new Date(seconds * 1000).toISOString().substring(14, 19);
  };

  return (
    <div className="board-container">
      <div className="board-header">
        <div className="board-header-section">
          <Text size="4xl">{formatSeconds(timer)}</Text>
        </div>
        <div className="board-header-emoji-section">
          <Text size="4xl">😁</Text>
        </div>
        <div className="board-header-section">
          <Text size="4xl">{mines}</Text>
        </div>
      </div>
      <div className="board-body">
        {data.map((row, rowIndex) => {
          return (
            <div className="board-row" key={`row-${rowIndex}`}>
              {row.map((tile, colIndex) => (
                <Tile
                  key={`col-${colIndex}`}
                  data={tile}
                  onLeftClick={() => revealTile(rowIndex, colIndex)}
                  onRightClick={() => flagTile(rowIndex, colIndex)}
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
