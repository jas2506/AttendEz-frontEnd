// import Navbar from "./projectComponents/Navbar.jsx";
// import HomepageStudent from "./Pages/HomepageStudent.jsx";
// import CurrentGPAPage from "./Pages/CurrentGPAPage.jsx";
// import CustomGPAcalc from "./Pages/CustomGPAcalc.jsx";
// import TimetablePage from "./Pages/TimetablePage.jsx";
// import StudentLoginPage from "./Pages/StudentLoginPage.jsx";
// import SubjectsPage from "./Pages/SubjectsPage.jsx";
import FacultyStudentView_g from "./projectComponents/facultyComponents/FacultyStudentView_g";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   return (
//     <>
//       <Router>
//         {isLoggedIn && <Navbar setIsLoggedIn={setIsLoggedIn} />}
//         <Routes>
//           <Route
//             path="/"
//             element={<StudentLoginPage setIsLoggedIn={setIsLoggedIn} />}
//           />
//           {isLoggedIn ? (
//             <>
//               <Route path="/Home" element={<HomepageStudent />} />
//               <Route path="/Timetable" element={<TimetablePage />} />
//               <Route path="/Subjects" element={<SubjectsPage />} />
//               <Route path="/GPAcalculator" element={<CurrentGPAPage />} />
//               <Route path="/CustomGPAcalculator" element={<CustomGPAcalc />} />
//             </>
//           ) : (
//             <Route path="*" element={<Navigate to="/" />} />
//           )}
//         </Routes>
//       </Router>
//     </>
//   );
// }

// export default App;

function App() {
  return (
    <FacultyStudentView_g
      name="Jaswanth Sridharan"
      percentage="75.98"
      details={{
        department: "CSE",
        year: "II",
        digitalId: "2310325",
        registerNumber: "3122235001059",
        courses: [
          { name: "Operating Systems", attended: 24, total: 30 },
          { name: "DAA", attended: 21, total: 30 },
          { name: "DBMS", attended: 26, total: 30 },
          { name: "Discrete Mathematics", attended: 32, total: 40 },
          { name: "COA", attended: 19, total: 30 },
        ],
      }}
    />
  );
}

export default App;
