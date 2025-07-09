import FacultyProfile from "./FacultyProfile";
import { useLocation, Link } from "react-router-dom";
import {
  Calculator,
  Presentation,
  Users,
  Code,
  Menu,
  Home,
  Pencil,
  CalendarSearch,
  Notebook,
  User,
  GraduationCap,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getFacultyDetails } from "../../TeacherApi";
import { useState,useEffect } from "react";

function FacultyNavbar_j({ setIsLoggedIn }) {
  const location = useLocation();

  // const details = {
  //   _id: {
  //     $oid: "68579753a03a9f34b7ab7691",
  //   },
  //   department: "EEE",
  //   faculty_email: "sripranv@gmail.com",
  //   position: "Assistant Professor",
  //   name: "Dr.Sripranav",
  //   mentor: "True",
  //   class_advisor: "True",
  // };

  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const detailsRes = await getFacultyDetails();

        setDetails(detailsRes.data.details);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching faculty data:", error);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <div className="h-14 flex items-center justify-between px-3 w-full bg-gradient-to-r from-blue-600 to-indigo-600 shadow-xl">
        {/* Mobile View: Hamburger Sheet */}
        <div className="block  lg:hidden ">
          <Sheet className=" ">
            <SheetTrigger>
              <Menu className="w-6 h-6 cursor-pointer text-white" />
            </SheetTrigger>
            <SheetContent
              side="left"
              className="h-full text-white w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-center"
            >
              <SheetHeader>
                <SheetTitle className="text-white">Menu</SheetTitle>
              </SheetHeader>
              <div className="flex   flex-col gap-4 items-start mt-4">
                <NavItem
                  icon={<Home className="w-4 h-4" />}
                  label="Home"
                  path="/FacultyHomepage"
                  isActive={location.pathname === "/FacultyHomepage"}
                />
                <NavItem
                  icon={<Notebook className="w-4 h-4" />}
                  label="Subjects Handled"
                  path="/SubjectsHandled"
                  isActive={location.pathname === "/SubjectsHandled"}
                />
                <NavItem
                  icon={<CalendarSearch className="w-4 h-4" />}
                  label="Faculty Timetable"
                  path="/FacultyTimetable"
                  isActive={location.pathname === "/FacultyTimetable"}
                />
                <NavItem
                  icon={<Pencil className="w-4 h-4" />}
                  label="Approve OD"
                  path="#"
                  isActive={false}
                />
                <NavItem
                  icon={<Presentation className="w-4 h-4" />}
                  label="Mentor View"
                  path="/MentorView"
                  isActive={location.pathname === "/MentorView"}
                />
                <NavItem
                  icon={<Users className="w-4 h-4" />}
                  label="Class Advisor View"
                  path="/ClassAdvisorView"
                  isActive={false}
                />
                <NavItem
                  icon={<Code className="w-4 h-4" />}
                  label="Devs"
                  path="/Devs"
                  isActive={location.pathname === "/Devs"}
                />
                <NavItem
                  icon={<GraduationCap className="w-4 h-4" />}
                  label="Create Class"
                  path="/CreateClass"
                  isActive={location.pathname === "/CreateClass"}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop View */}
        <div className="hidden lg:flex gap-4 text-white items-center">
          <NavItem
            icon={<Home className="w-4 h-4" />}
            label="Home"
            path="/FacultyHomepage"
            isActive={location.pathname === "/FacultyHomepage"}
          />
          <NavItem
            icon={<Notebook className="w-4 h-4" />}
            label="Subjects Handled"
            path="/SubjectsHandled"
            isActive={location.pathname === "/SubjectsHandled"}
          />
          <NavItem
            icon={<CalendarSearch className="w-4 h-4" />}
            label="Faculty Timetable"
            path="/FacultyTimetable"
            isActive={location.pathname === "/FacultyTimetable"}
          />
          <NavItem
            icon={<Pencil className="w-4 h-4" />}
            label="Approve OD"
            path="#"
            isActive={false}
          />
          <NavItem
            icon={<Presentation className="w-4 h-4" />}
            label="Mentor View"
            path="/MentorView"
            isActive={location.pathname === "/MentorView"}
          />
          <NavItem
            icon={<User className="w-4 h-4" />}
            label="Class Advisor View"
            path="/ClassAdvisorView"
            isActive={false}
          />

          <NavItem
            icon={<GraduationCap className="w-4 h-4" />}
            label="Create Class"
            path="/CreateClass"
            isActive={location.pathname === "/CreateClass"}
          />
          <NavItem
            icon={<Code className="w-4 h-4" />}
            label="Devs"
            path="/Devs"
            isActive={location.pathname === "/Devs"}
          />
        </div>

        {/* Profile */}
        <FacultyProfile det={details} setIsLoggedIn={setIsLoggedIn} />
      </div>
    </>
  );
}

function NavItem({ icon, label, path, isActive }) {
  const activeTextColor = "text-blue-700";
  const inactiveTextColor = "text-white";
  const activeIconColor = "text-blue-700";
  const inactiveIconColor = "text-white";

  return (
    <Link
      to={path}
      className={`cursor-pointer flex items-center gap-2 text-sm px-3 py-2 rounded-md transition-all duration-200
        ${
          isActive
            ? "bg-white/90 shadow-md font-semibold"
            : "hover:bg-white/10 bg-transparent"
        }`}
    >
      {/* Icon with dynamic color */}
      <div className={`${isActive ? activeIconColor : inactiveIconColor}`}>
        {icon}
      </div>
      {/* Label with dynamic color */}
      <span className={`${isActive ? activeTextColor : inactiveTextColor}`}>
        {label}
      </span>
    </Link>
  );
}

export default FacultyNavbar_j;
