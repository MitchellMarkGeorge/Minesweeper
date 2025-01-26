import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./styles/typography.css";
import "./styles/theme.css";
import "./styles/spacing.css";

import "./index.css";

import App from "./App.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { BrowserRouter } from "react-router-dom";
import { ModalProvider } from "./contexts/ModalContext.tsx";
import { NewGameModal } from "./ui/index.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ModalProvider>
      <AuthProvider>
        <BrowserRouter>
          <App />
          <NewGameModal/>
        </BrowserRouter>
      </AuthProvider>
    </ModalProvider>
  </StrictMode>
);
