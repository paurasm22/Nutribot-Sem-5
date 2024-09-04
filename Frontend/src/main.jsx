import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AppState from "./Context/AppState.jsx";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="779517253986-97ucgaiinua1ha39ctrcheis310hj774.apps.googleusercontent.com">
      <AppState>
        <App />
      </AppState>
    </GoogleOAuthProvider>
  </StrictMode>
);
