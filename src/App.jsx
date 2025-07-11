import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "sonner";
import { useState } from "react";
import LandingPage from "./LandingPage";

// Student Components
import StudentLoginPage from "./Pages/StudentLoginPage";
import HomepageStudent from "./Pages/HomepageStudent";
import TimetablePage from "./Pages/TimetablePage";
import SubjectsPage from "./Pages/SubjectsPage";
import CurrentGPAPage from "./Pages/CurrentGPAPage";
import CustomGPAcalc from "./Pages/CustomGPAcalc";
import Navbar from "./projectComponents/Navbar";

// Teacher Components
import TeacherLogin from "./Pages/FacultyPages/TeacherLogin";
import FacultyHomepage from "./Pages/FacultyPages/FacultyHomepage";
import SubjectsHandledPage from "./Pages/FacultyPages/SubjectsHandledPage";
import FacultyTimetablePage from "./Pages/FacultyPages/FacultyTimetablePage";
import FacultyCreateClassPage from "./Pages/FacultyPages/FacultyCreateClassPage";
import MentorListPage from "./Pages/FacultyPages/MentorListPage";
import ClassAdvisorPage from "./Pages/FacultyPages/ClassAdvisorPage";
import FacultyNavbar_j from "./projectComponents/facultyComponents/FacultyNavbar_j";

// Super Admin Components
import SuperAdminLoginPage from "./Pages/SuperAdminPages/SuperAdminLoginPage";
import AddTeacherPage from "./Pages/SuperAdminPages/AddTeacherPage";
import CreateDeleteStudentPage from "./Pages/SuperAdminPages/CreateDeleteStudentPage";
import CreateLogicalGroupingPage from "./Pages/SuperAdminPages/CreateLogicalGroupingPage";
import NavBarSuperAdmin from "./pages/SuperAdminPages/NavBarSuperAdmin";
const cId = import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID;

function AppRoutes({
  studentLoggedIn,
  teacherLoggedIn,
  superAdminLoggedIn,
  setStudentLoggedIn,
  setTeacherLoggedIn,
  setSuperAdminLoggedIn,
}) {
  const location = useLocation();
  const path = location.pathname;

  return (
    <>
      {/* Conditional Navbars */}
      {path.startsWith("/student") && studentLoggedIn && (
        <Navbar setIsLoggedIn={setStudentLoggedIn} />
      )}
      {path.startsWith("/faculty") && teacherLoggedIn && (
        <FacultyNavbar_j setIsLoggedIn={setTeacherLoggedIn} />
      )}
      {path.startsWith("/superadmin") && superAdminLoggedIn && (
        <NavBarSuperAdmin setIsLoggedIn={setSuperAdminLoggedIn} />
      )}

      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Student Routes */}
        <Route
          path="/student"
          element={<StudentLoginPage setIsLoggedIn={setStudentLoggedIn} />}
        />
        {studentLoggedIn ? (
          <>
            <Route path="/student/home" element={<HomepageStudent />} />
            <Route path="/student/timetable" element={<TimetablePage />} />
            <Route path="/student/subjects" element={<SubjectsPage />} />
            <Route path="/student/gpa" element={<CurrentGPAPage />} />
            <Route path="/student/custom-gpa" element={<CustomGPAcalc />} />
          </>
        ) : (
          <Route path="/student/*" element={<Navigate to="/student" />} />
        )}

        {/* Teacher Routes */}
        <Route
          path="/faculty"
          element={<TeacherLogin setIsLoggedIn={setTeacherLoggedIn} />}
        />
        {teacherLoggedIn ? (
          <>
            <Route path="/faculty/home" element={<FacultyHomepage />} />
            <Route
              path="/faculty/timetable"
              element={<FacultyTimetablePage />}
            />
            <Route path="/faculty/subjects" element={<SubjectsHandledPage />} />
            <Route
              path="/faculty/create-class"
              element={<FacultyCreateClassPage />}
            />
            <Route path="/faculty/mentor-list" element={<MentorListPage />} />
            <Route
              path="/faculty/class-advisor"
              element={<ClassAdvisorPage />}
            />
          </>
        ) : (
          <Route path="/faculty/*" element={<Navigate to="/faculty" />} />
        )}

        {/* Super Admin Routes */}
        <Route
          path="/superadmin"
          element={
            <SuperAdminLoginPage setIsLoggedIn={setSuperAdminLoggedIn} />
          }
        />
        {superAdminLoggedIn ? (
          <>
            <Route
              path="/superadmin/manage-teacher"
              element={<AddTeacherPage />}
            />
            <Route
              path="/superadmin/students"
              element={<CreateDeleteStudentPage />}
            />
            <Route
              path="/superadmin/logical-grouping"
              element={<CreateLogicalGroupingPage />}
            />
          </>
        ) : (
          <Route path="/superadmin/*" element={<Navigate to="/superadmin" />} />
        )}

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

function App() {
  const [studentLoggedIn, setStudentLoggedIn] = useState(false);
  const [teacherLoggedIn, setTeacherLoggedIn] = useState(false);
  const [superAdminLoggedIn, setSuperAdminLoggedIn] = useState(false);

  return (
    <Router>
      <ConditionalWrappers>
        <AppRoutes
          studentLoggedIn={studentLoggedIn}
          teacherLoggedIn={teacherLoggedIn}
          superAdminLoggedIn={superAdminLoggedIn}
          setStudentLoggedIn={setStudentLoggedIn}
          setTeacherLoggedIn={setTeacherLoggedIn}
          setSuperAdminLoggedIn={setSuperAdminLoggedIn}
        />
      </ConditionalWrappers>
    </Router>
  );
}

// ✅ Wrapper component to conditionally wrap children
function ConditionalWrappers({ children }) {
  const location = useLocation();
  const path = location.pathname;

  const isStudent = path.startsWith("/student");
  const isSuperAdmin = path.startsWith("/superadmin");

  let content = children;

  if (isStudent) {
    content = (
      <GoogleOAuthProvider clientId={cId}>{content}</GoogleOAuthProvider>
    );
  }

  if (isSuperAdmin) {
    content = (
      <>
        <Toaster position="top-center" richColors closeButton />
        {content}
      </>
    );
  }

  return content;
}

export default App;
