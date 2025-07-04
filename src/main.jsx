import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import TeacherApp from "./TeacherApp.jsx";
import SuperAdminTest from "./SuperAdminTest.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SuperAdminTest></SuperAdminTest>
  </StrictMode>
);
