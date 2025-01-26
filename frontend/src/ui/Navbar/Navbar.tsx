import "./Navbar.css";
import { Text } from "../Text";
import { CubeIcon } from "@heroicons/react/16/solid";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/routes";
import { Button } from "../Button";
import { useAuth } from "../../hooks/useAuth";
import { useModal } from "../../hooks/useModal";

export function Navbar() {
  const { isAuthenticated } = useAuth();
  const { openModal } = useModal();
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <div className="navbar-logo" onClick={() => navigate(ROUTES.LANDING)}>
        <CubeIcon height="1.5rem" width="1.5rem" />
        <Text size="xl">Minesweeper</Text>
      </div>
      <div className="navbar-links">
        <Link className="text-base" to={ROUTES.HOME}>
          Home
        </Link>
        <Link
          className="text-base"
          to="https://www.instructables.com/How-to-play-minesweeper/"
          target="_blank"
        >
          Help
        </Link>
        <Button variant="primary" onClick={openModal}>Sign Up</Button>
      </div>
    </div>
  );
}
