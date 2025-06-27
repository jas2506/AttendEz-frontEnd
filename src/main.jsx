import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import TeacherTest from "./TeacherTest.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TeacherTest />
  </StrictMode>
);
