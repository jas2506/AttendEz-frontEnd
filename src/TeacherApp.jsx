import FacultyNavbar_j from "./projectComponents/facultyComponents/FacultyNavbar_j";
import FacultyHomepageComponent from "./projectComponents/facultyComponents/FacultyHomepageComponent";
import FacultyTransfersubjectComp from "./projectComponents/facultyComponents/FacultyTransfersubjectComp";
import FacultyHomepage from "./Pages/FacultyPages/FacultyHomepage";
import SubjectsHandledPage from "./Pages/FacultyPages/SubjectsHandledPage";
import FacultyTimetablePage from "./Pages/FacultyPages/FacultyTimetablePage";
import FacultyCreateClassPage from "./Pages/FacultyPages/FacultyCreateClassPage";
import MentorListPage from "./Pages/FacultyPages/MentorListPage";
import DevsPage from "./Pages/DevsPage";
import { useState } from "react";
import TeacherLogin from "./Pages/FacultyPages/TeacherLogin";
import ClassAdvisorPage from "./Pages/FacultyPages/ClassAdvisorPage";
import DevsPage from "./Pages/DevsPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function TeacherApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <Router>
        {isLoggedIn && <FacultyNavbar_j setIsLoggedIn={setIsLoggedIn} />}
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Navigate to="/FacultyHomepage" />
              ) : (
                <TeacherLogin setIsLoggedIn={setIsLoggedIn} />
              )
            }
          />
          {isLoggedIn ? (
            <>
              <Route path="/FacultyHomepage" element={<FacultyHomepage />} />
              <Route
                path="/FacultyTimetable"
                element={<FacultyTimetablePage />}
              />
              <Route
                path="/SubjectsHandled"
                element={<SubjectsHandledPage />}
              />
              <Route path="/MentorView" element={<MentorListPage />} />
              <Route path="/CreateClass" element={<FacultyCreateClassPage />} />
              <Route path="/ClassAdvisorView" element={<ClassAdvisorPage />} />
              <Route path="/devs" element={<DevsPage />} />
              <Route path="*" element={<Navigate to="/FacultyHomepage" />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/" />} />
          )}
        </Routes>
      </Router>
    </>
  );
}

export default TeacherApp;
