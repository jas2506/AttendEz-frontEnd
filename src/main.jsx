import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import TeacherApp from "./TeacherApp.jsx";
import SuperAdminTest from "./SuperAdminTest.jsx";
import VerifyOtp from "./Pages/FacultyPages/VerifyOtp.jsx";
import TeacherLogin from "./Pages/FacultyPages/TeacherLogin.jsx";

import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TeacherApp></TeacherApp>
  </StrictMode>
);


// <GoogleOAuthProvider clientId="486291190133-rfd0p9spon54i2b8ioj4hferrd2uj80l.apps.googleusercontent.com">
// <App></App>
// </GoogleOAuthProvider>