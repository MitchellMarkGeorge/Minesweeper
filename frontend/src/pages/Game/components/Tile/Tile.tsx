import classNames from "classnames";
import { Tile as TileData } from "../../../../services/game/types";
import { FireIcon, FlagIcon } from "@heroicons/react/24/solid";
import { Text } from "../../../../ui";
import "./Tile.css";

interface Props {
  data: TileData;
  onLeftClick: () => void;
  onRightClick: () => void;
}

export function Tile({ data, onLeftClick, onRightClick }: Props) {
  const tileClassNames = classNames("tile", {
    hidden: data.hidden,
  });
  const getTileValue = () => {
    if (data.flagged)
      return (
        <FlagIcon height="1.25rem" width="1.25rem" color="var(--green-600)" />
      );
    if (data.value) {
      if (typeof data.value === "string" && data.value === "MINE") {
        return (
          <FireIcon height="1.25rem" width="1.25rem" color="var(--red-800)" />
        );
      }
      return (
        <Text className="tile-number" size="xl">
          {data.value}
        </Text>
      ); // is a revealed number
    }
    return null;
  };
  return (
    <button
      className={tileClassNames}
      onClick={() => {
        onLeftClick();
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        onRightClick();
      }}
    >
      {getTileValue()}
    </button>
  );
}
