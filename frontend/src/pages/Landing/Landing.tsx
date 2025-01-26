import "./Landing.css";
import { Button, Text } from "../../ui";

export function Landing() {
  return (
    <div className="landing-page-container">
      <Text size="5xl">Minesweeper</Text>
      <Text className="landing-page-secondary-text">Same classic game, new modern experience.</Text>
      <Button fullWidth>Log In</Button>
    </div>
  );
}
