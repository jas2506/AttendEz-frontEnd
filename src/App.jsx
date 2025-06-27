import Navbar from "./projectComponents/Navbar.jsx";
import HomepageStudent from "./Pages/HomepageStudent.jsx";
import CurrentGPAPage from "./Pages/CurrentGPAPage.jsx";
import CustomGPAcalc from "./Pages/CustomGPAcalc.jsx";
import TimetablePage from "./Pages/TimetablePage.jsx";
import StudentLoginPage from "./Pages/StudentLoginPage.jsx";
import SubjectsPage from "./Pages/SubjectsPage.jsx";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      <Router>
        {isLoggedIn && <Navbar setIsLoggedIn={setIsLoggedIn} />}
        <Routes>
          <Route
            path="/"
            element={<StudentLoginPage setIsLoggedIn={setIsLoggedIn} />}
          />
          {isLoggedIn ? (
            <>
              <Route path="/Home" element={<HomepageStudent />} />
              <Route path="/Timetable" element={<TimetablePage />} />
              <Route path="/Subjects" element={<SubjectsPage />} />
              <Route path="/GPAcalculator" element={<CurrentGPAPage />} />
              <Route path="/CustomGPAcalculator" element={<CustomGPAcalc />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/" />} />
          )}
        </Routes>
      </Router>
    </>
  );
}

export default App;
