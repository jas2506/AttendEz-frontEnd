import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AddTeacherPage from "./Pages/SuperAdminPages/AddTeacherPage";
import CreateDeleteStudentPage from "./Pages/SuperAdminPages/CreateDeleteStudentPage";
import CreateLogicalGroupingPage from "./Pages/SuperAdminPages/CreateLogicalGroupingPage";
import SuperAdminLoginPage from "./Pages/SuperAdminPages/SuperAdminLoginPage";
import NavbarSuperAdmin from "./Pages/SuperAdminPages/NavBarSuperAdmin";

function SuperAdminTest() {
  return (
    <Router>
      <Routes>
        <Route path="/superadmin/login" element={<SuperAdminLoginPage />} />
        <Route path="/superadmin/manageteacher" element={<AddTeacherPage />} />
        <Route
          path="/superadmin/students"
          element={<CreateDeleteStudentPage />}
        />
        <Route
          path="/superadmin/logical-grouping"
          element={<CreateLogicalGroupingPage />}
        />
      </Routes>
    </Router>
  );
}

export default SuperAdminTest;
