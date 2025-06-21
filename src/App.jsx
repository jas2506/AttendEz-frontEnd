import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import Timetable from "./projectComponents/Timetable.jsx";
import DetailedProfile from "./projectComponents/DetailedProfile.jsx";
import DetailedCalendar from "./projectComponents/DetailedCalendar.jsx";
import Profile from "./projectComponents/Profile.jsx";
import Navbar from "./projectComponents/Navbar.jsx";
import StudentHomepageSubject from "./projectComponents/studentHomepageSubject.jsx";
import GPAcalccurrent from "./projectComponents/GPAcalccurrent.jsx";
import StudentAttendanceTable from "./projectComponents/StudentAttendanceTable.jsx";
import HomepageStudent from "./Pages/HomepageStudent.jsx";
import CurrentGPAPage from "./Pages/CurrentGPAPage.jsx";
import CustomGPAcalc from "./Pages/CustomGPAcalc.jsx";

function App() {
  return (
    <>
      <Navbar />
      <CurrentGPAPage></CurrentGPAPage>


    </>
  );
}

export default App;
