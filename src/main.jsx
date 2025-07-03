import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import TeacherApp from "./TeacherApp.jsx";
import SuperAdminTest from "./SuperAdminTest.jsx";

import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="29740499483-kbjsb3p79stbprf4qq1oalh5pgei75qq.apps.googleusercontent.com">
      <App></App>
    </GoogleOAuthProvider>
  </StrictMode>
);
