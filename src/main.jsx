import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import TeacherApp from "./TeacherApp.jsx";
import SuperAdminTest from "./SuperAdminTest.jsx";
import VerifyOtp from "./Pages/FacultyPages/VerifyOtp.jsx";
import TeacherLogin from "./Pages/FacultyPages/TeacherLogin.jsx";

import { GoogleOAuthProvider } from "@react-oauth/google";
import LandingPage from "./LandingPage.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LandingPage></LandingPage>
  </StrictMode>
);

// const cId = import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID;

// <GoogleOAuthProvider clientId={cId}>
// <App></App>
// </GoogleOAuthProvider>
