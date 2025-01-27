import "./Landing.css";
import { Button, Text } from "../../ui";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/routes";
import { useAuth } from "../../hooks/useAuth";
import { useModal } from "../../hooks/useModal";

export function Landing() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { openModal } = useModal();
  return (
    <div className="landing-page-container">
      <Text as="h1" size="5xl" className="landing-page-title">
        Minesweeper
      </Text>
      <Text className="landing-page-secondary-title">
        Same classic game, new modern experience.
      </Text>
      <Button
        fullWidth
        onClick={() => {
          if (isAuthenticated) {
            openModal();
          } else {
            navigate(ROUTES.LOGIN);
          }
        }}
      >
        {isAuthenticated ? "Start Game" : "Log In"}
      </Button>
    </div>
  );
}
