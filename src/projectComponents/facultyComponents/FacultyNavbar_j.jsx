import FacultyProfile from "./FacultyProfile";
import { useLocation, Link } from "react-router-dom";
import {
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
import { useState, useEffect } from "react";

function FacultyNavbar_j({ setIsLoggedIn }) {
  const location = useLocation();
  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const detailsRes = await getFacultyDetails();
        setDetails(detailsRes.data.details);
        localStorage.setItem("facDept", detailsRes.data.details.department);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching faculty data:", error);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="h-14 flex items-center justify-between px-3 w-full bg-gradient-to-r from-blue-600 to-indigo-600 shadow-xl">
      {/* Mobile View */}
      <div className="block lg:hidden">
        <Sheet>
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
            <div className="flex flex-col gap-4 items-start mt-4">
              <NavItem
                icon={<Home className="w-4 h-4" />}
                label="Home"
                path="/faculty/home"
                isActive={location.pathname === "/faculty/home"}
              />
              <NavItem
                icon={<Notebook className="w-4 h-4" />}
                label="Subjects Handled"
                path="/faculty/subjects"
                isActive={location.pathname === "/faculty/subjects"}
              />
              <NavItem
                icon={<CalendarSearch className="w-4 h-4" />}
                label="Faculty Timetable"
                path="/faculty/timetable"
                isActive={location.pathname === "/faculty/timetable"}
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
                path="/faculty/mentor-list"
                isActive={location.pathname === "/faculty/mentor-list"}
              />
              <NavItem
                icon={<User className="w-4 h-4" />}
                label="Class Advisor View"
                path="/faculty/class-advisor"
                isActive={location.pathname === "/faculty/class-advisor"}
              />
              <NavItem
                icon={<GraduationCap className="w-4 h-4" />}
                label="Create Class"
                path="/faculty/create-class"
                isActive={location.pathname === "/faculty/create-class"}
              />
              <NavItem
                icon={<Code className="w-4 h-4" />}
                label="Devs"
                path="#"
                isActive={false}
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
          path="/faculty/home"
          isActive={location.pathname === "/faculty/home"}
        />
        <NavItem
          icon={<Notebook className="w-4 h-4" />}
          label="Subjects Handled"
          path="/faculty/subjects"
          isActive={location.pathname === "/faculty/subjects"}
        />
        <NavItem
          icon={<CalendarSearch className="w-4 h-4" />}
          label="Faculty Timetable"
          path="/faculty/timetable"
          isActive={location.pathname === "/faculty/timetable"}
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
          path="/faculty/mentor-list"
          isActive={location.pathname === "/faculty/mentor-list"}
        />
        <NavItem
          icon={<User className="w-4 h-4" />}
          label="Class Advisor View"
          path="/faculty/class-advisor"
          isActive={location.pathname === "/faculty/class-advisor"}
        />
        <NavItem
          icon={<GraduationCap className="w-4 h-4" />}
          label="Create Class"
          path="/faculty/create-class"
          isActive={location.pathname === "/faculty/create-class"}
        />
        <NavItem
          icon={<Code className="w-4 h-4" />}
          label="Devs"
          path="#"
          isActive={false}
        />
      </div>

      {/* Profile */}
      <FacultyProfile det={details} setIsLoggedIn={setIsLoggedIn} />
    </div>
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
      <div className={`${isActive ? activeIconColor : inactiveIconColor}`}>
        {icon}
      </div>
      <span className={`${isActive ? activeTextColor : inactiveTextColor}`}>
        {label}
      </span>
    </Link>
  );
}

export default FacultyNavbar_j;
