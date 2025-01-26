import "./Home.css";
import { Text, Button, Difficulty } from "../../ui";
import { useAuth } from "../../hooks/useAuth";
import { useMemo } from "react";
import { LAST_GAME_DETAILS_KEY } from "../../utils/constants";
import { GameDetails, GameDifficulty } from "../../services/game/types";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/routes";

export function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const userName = user ? user.username : "Player";

  const getLastGameDetails = (): GameDetails => {
    const gameDetails = localStorage.getItem(LAST_GAME_DETAILS_KEY);
    if (gameDetails) return JSON.parse(gameDetails) as GameDetails;
    return {
      difficulty: GameDifficulty.BEGINNER,
      game_id: "jfalkdsjfdls",
      last_played: new Date().toString(),
    };
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const lastPlayedGame = useMemo(getLastGameDetails, []);
  return (
    <div className="home-container">
      <Text as="h1" size="5xl" className="home-page-title">
        {`Hello, ${userName}!`}
      </Text>
      {lastPlayedGame ? (
        <>
          <Text className="game-detail-info-text">
            Here are the details of your last game:
          </Text>
          <div className="game-detail-item">
            <Text className="game-detail-title" size="2xl">
              Last Played
            </Text>
            <Text>{formatDate(lastPlayedGame.last_played)}</Text>
          </div>
          <div className="game-detail-item">
            <Text className="game-detail-title" size="2xl">
              Difficulty
            </Text>
            <Difficulty difficulty={lastPlayedGame.difficulty} />
          </div>
          <Button
            onClick={() => {
              navigate(`${ROUTES.GAME}/${lastPlayedGame.game_id}`);
            }}
          >
            Resume Game
          </Button>
        </>
      ) : (
        <>
          <Text className="no-game-text">
            You haven't played a game recently. Start one now!
          </Text>
          <Button>New Game</Button>
        </>
      )}
    </div>
  );
}
