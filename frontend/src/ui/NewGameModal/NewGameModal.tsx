import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useModal } from "../../hooks/useModal";
import "./NewGameModal.css";
import { Select } from "../Select/Select";
import { GameDifficulty } from "../../services/game/types";
import { useMemo, useState } from "react";
import {
  getDifficultySetting,
  normalizeDifficultyString,
} from "../../services/game";
import { Input } from "../Input";
import { Button } from "../Button";

export function NewGameModal() {
  const { isOpen, closeModal } = useModal();
  const [gameDifficulty, setGameDifficulty] = useState(GameDifficulty.BEGINNER);
  const [isLoading, setIsLoading] = useState(false);

  const { cols, mines, rows } = useMemo(
    () => getDifficultySetting(gameDifficulty),
    [gameDifficulty]
  );

  const options = useMemo(() => {
    return [
      {
        value: GameDifficulty.BEGINNER,
        text: normalizeDifficultyString(GameDifficulty.BEGINNER),
      },
      {
        value: GameDifficulty.INTERMEDIATE,
        text: normalizeDifficultyString(GameDifficulty.INTERMEDIATE),
      },
      {
        value: GameDifficulty.EXPERT,
        text: normalizeDifficultyString(GameDifficulty.EXPERT),
      },
    ];
  }, []);

  return (
    <Dialog open={isOpen} onClose={closeModal} className="modal">
      <DialogBackdrop className="modal-backdrop" />
      <div className="modal-container">
        <DialogPanel className="modal-body">
          <DialogTitle as="h1" className="modal-title">
            New Game
          </DialogTitle>
          <form className="new-game-form" onSubmit={(e) => {
            e.preventDefault();
          }}>
            <Select
              defaultValue={gameDifficulty}
              options={options}
              label="Difficulty"
              onChange={(e) => {
                console.log(e.target.value);
                setGameDifficulty(e.target.value as GameDifficulty);
              }}
            />
            <Input disabled value={cols} label="Colunms" />
            <Input disabled value={rows} label="Rows" />
            <Input disabled value={mines} label="Mines" />
            <div className="new-game-form-buttons">
              <Button variant="secondary" onClick={closeModal}>Close</Button>
              <Button variant="primary" type="submit" loading={isLoading}>Create</Button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
