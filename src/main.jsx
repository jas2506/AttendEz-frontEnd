import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";


import { GoogleOAuthProvider } from "@react-oauth/google";
import LandingPage from "./LandingPage.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App></App>
  </StrictMode>
);

// const cId = import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID;

// <GoogleOAuthProvider clientId={cId}>
// <App></App>
// </GoogleOAuthProvider>
