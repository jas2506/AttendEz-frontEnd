import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import SuperAdminTest from "./SuperAdminTest.jsx";
import TeacherTest from "./TeacherTest.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SuperAdminTest />
  </StrictMode>
);
