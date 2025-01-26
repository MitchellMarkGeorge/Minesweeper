import "./Landing.css";
import { Button, Text } from "../../ui";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/routes";

export function Landing() {
  const navigate = useNavigate();
  return (
    <div className="landing-page-container">
      <Text as="h1" size="5xl" className="landing-page-title">Minesweeper</Text>
      <Text className="landing-page-secondary-title">
        Same classic game, new modern experience.
      </Text>
      <Button
        fullWidth
        onClick={() => {
          navigate(ROUTES.LOGIN);
        }}
      >
        Log In
      </Button>
    </div>
  );
}
