import { Button } from "@/components/ui/button";
import Profile from "./projectComponents/Profile.jsx";
import Navbar from "./projectComponents/Navbar.jsx";
import StudentHomepageSubject from "./projectComponents/studentHomepageSubject.jsx";
import GPAcalccurrent from "./projectComponents/GPAcalccurrent.jsx";
import GPAForm from "./projectComponents/GPAForm.jsx";
import StudentAttendanceTable from "./projectComponents/StudentAttendanceTable.jsx";
import FacultyStudentView_g from "./projectComponents/facultyComponents/FacultyStudentView_g.jsx";
import LectureWiseAttendance_g from "./projectComponents/facultyComponents/LectureWiseAttendance_g.jsx";
import FlipAttendance_g from "./projectComponents/facultyComponents/FlipAttendance_g.jsx";
function App() {
  return (
    <>
      <FacultyStudentView_g
        name="Saipranav M"
        details="CSE, IIIrd Year Section B"
        percentage="86.3%"
        onViewDetails={() => alert("Viewing details for Saipranav M")}
      />
      <FacultyStudentView_g
        name="Jaswanth S"
        details="CSE, IIIrd Year Section B"
        percentage="60.0%"
        onViewDetails={() => alert("Viewing details for Saipranav M")}
      />
      <FacultyStudentView_g
        name="Gautham Narayan G"
        details="CSE, IIIrd Year Section B"
        percentage="72.0%"
        onViewDetails={() => alert("Viewing details for Saipranav M")}
      />
      <LectureWiseAttendance_g
        lectures={[
          { number: "Lecture 1", attended: 24, total: 30 },
          { number: "Lecture 2", attended: 20, total: 25 },
        ]}
      />
      <FlipAttendance_g rollNumber={3122235001048} name={"Saipranav M"} />
    </>
  );
}

export default App;
