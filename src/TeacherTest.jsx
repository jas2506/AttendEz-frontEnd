import FacultyNavbar_j from "./projectComponents/facultyComponents/facultyNavbar_j";
import FacultyHomepageComponent from "./projectComponents/facultyComponents/FacultyHomepageComponent";
import FacultyTransfersubjectComp from "./projectComponents/facultyComponents/FacultyTransfersubjectComp";
import FacultyHomepage from "./Pages/FacultyPages/FacultyHomepage";
import SubjectsHandledPage from "./Pages/FacultyPages/SubjectsHandledPage";
import FacultyTimetablePage from "./Pages/FacultyPages/FacultyTimetablePage";
import FacultyCreateClassPage from "./Pages/FacultyPages/FacultyCreateClassPage";

function TeacherTest() {
  
  

  return (
    <>
      <FacultyNavbar_j />
      <FacultyCreateClassPage></FacultyCreateClassPage>
    </>
  );
}

export default TeacherTest;
