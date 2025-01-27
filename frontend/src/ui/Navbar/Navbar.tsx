import "./Navbar.css";
import { Text } from "../Text";
import { CubeIcon } from "@heroicons/react/16/solid";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/routes";
import { Button } from "../Button";
import { useAuth } from "../../hooks/useAuth";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";

export function Navbar() {
  const { isAuthenticated, signOut } = useAuth();
  const navigate = useNavigate();

  const helpButtonMarkup = (
    <Popover className="help-button-popover">
        <PopoverButton className="help-icon-button">
            <QuestionMarkCircleIcon color="var(--default-text-color)" height="1rem" width="1rem"/>
        </PopoverButton>
        <PopoverPanel anchor="bottom" className="help-button-popover-panel">
            <Text size="xl" className="help-popover-title">How to play Minesweeper!</Text>
            <ul>
                <li>Objective: Reaveal all tiles without clicking on mines</li>
                <li>Number on revealed tiles show how many mines are adjacent.</li>
                <li>Left click to reveal tiles and right click to flag mines.</li>
                <li>Clicked mine = GAME OVER!</li>
                <li>To win, successfuly reveal all non-mine-tiles!</li>
            </ul>
        </PopoverPanel>
    </Popover>
  )
  return (
    <div className="navbar">
      <div className="navbar-logo" onClick={() => navigate(ROUTES.LANDING)}>
        <CubeIcon height="1.5rem" width="1.5rem" />
        <Text size="xl">Minesweeper</Text>
      </div>
      <div className="navbar-links">
        {helpButtonMarkup}
        <Link className="text-base" to={ROUTES.HOME}>
          Home
        </Link>
        <Link
          className="text-base"
          to="https://www.instructables.com/How-to-play-minesweeper/"
          target="_blank"
        >
        More Info
        </Link>
        <Button
          variant={isAuthenticated ? "destructive" : "primary"}
          onClick={() => {
            if (isAuthenticated) {
              signOut();
            } else {
              navigate(ROUTES.LOGIN);
            }
          }}
        >
          {isAuthenticated ? "Sign Out" : "Log In"}
        </Button>
      </div>
    </div>
  );
}
