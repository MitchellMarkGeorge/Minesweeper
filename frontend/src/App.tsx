import { Route, Routes } from "react-router-dom";
import "./App.css";
import Game from "./pages/Game";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { PrivateRoute } from "./routes/PrivateRoute";
import { PublicRoute } from "./routes/PublicRoute";
import { ROUTES } from "./routes/routes";
import { Navbar, Text } from "./ui";
import { useAuth } from "./hooks/useAuth";
import Home from "./pages/Home";

function App() {
  // const { isLoading } = useAuth();
  // if (isLoading) return (
  //   <div className="loading-container">
  //     <Text size="2xl">Loading...</Text>
  //   </div>
  // )
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
              // <PrivateRoute>
                <Home />
              // </PrivateRoute>
            }
          />
          <Route
            path={`${ROUTES.GAME}/:game_id`}
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
