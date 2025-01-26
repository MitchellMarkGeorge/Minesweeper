import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Game from "./pages/Game";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { PrivateRoute } from "./routes/PrivateRoute";
import { PublicRoute } from "./routes/PublicRoute";
import { ROUTES } from "./routes/routes";
import { Navbar, Text } from "./ui";

function App() {
  return (
    <div className="app-container">
      <Navbar />
        <Routes>
          <Route path={ROUTES.LANDING} element={<Landing />} />
          <Route
            path={ROUTES.SIGN_UP}
            element={
              <PublicRoute>
                <SignUp />
              </PublicRoute>
            }
          />
          <Route
            path={ROUTES.LOGIN}
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path={ROUTES.HOME}
            element={
              <PrivateRoute>
                <SignUp />
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.GAME}
            element={
              <PrivateRoute>
                <Game />
              </PrivateRoute>
            }
          />
        </Routes>
    </div>
  );
}

export default App;
