import { RocketLaunchIcon } from "@heroicons/react/24/outline";
import { getDifficultySetting, normalizeDifficultyString } from "../../services/game";
import { GameDifficulty } from "../../services/game/types";
import { useMemo } from "react";
import { Text } from "../Text";
import "./Difficulty.css";

interface Props {
  difficulty: GameDifficulty;
}
export function Difficulty({ difficulty }: Props) {
  const { cols, mines, rows} = getDifficultySetting(difficulty);
  const difficultyTitle = useMemo(() => normalizeDifficultyString(difficulty), [difficulty]);

  return (
    <div className="difficulty-container">
      <div className="difficulty-icon">
        <RocketLaunchIcon height="1.5rem" width="1.5rem"/ >
      </div>
      <div className="difficulty-details">
        <Text className="difficulty-title">{`${difficultyTitle} (${cols} x ${rows})`}</Text>
        <Text className="mines">
            {`${mines} mines`}
        </Text>
      </div>
    </div>
  );
}
