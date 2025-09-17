import Profile from "./Profile";
import { useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Calculator,
  Code,
  Menu,
  Home,
  Pencil,
  CalendarSearch,
  Notebook,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { fetchDetails } from "../Api";

function Navbar({ setIsLoggedIn }) {
  const location = useLocation();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const d = (await fetchDetails()).details;
        setDetails(d);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="h-14 flex items-center justify-between px-3 sm:px-6 w-full bg-gradient-to-r from-blue-600 to-indigo-600 shadow-xl">
      {/* Mobile View */}
      <div className="block md:hidden">
        <Sheet>
          <SheetTrigger>
            <Menu className="w-6 h-6 cursor-pointer text-white" />
          </SheetTrigger>
          <SheetContent
            side="left"
            className="h-full w-[70%] text-white bg-gradient-to-r from-blue-600 to-indigo-600 text-center"
          >
            <SheetHeader>
              <SheetTitle className="text-white">Menu</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4 items-start mt-4 overflow-y-auto max-h-[calc(100vh-4rem)] px-4">
              <NavItem
                icon={<Home className="w-4 h-4" />}
                label="Home"
                path="/student/home"
                isActive={location.pathname === "/student/home"}
              />
              <NavItem
                icon={<Notebook className="w-4 h-4" />}
                label="Subjects"
                path="/student/subjects"
                isActive={location.pathname === "/student/subjects"}
              />
              <NavItem
                icon={<CalendarSearch className="w-4 h-4" />}
                label="Timetable"
                path="/student/timetable"
                isActive={location.pathname === "/student/timetable"}
              />
              <NavItem
                icon={<Calculator className="w-4 h-4" />}
                label="GPA Calculator"
                path="/student/gpa"
                isActive={location.pathname === "/student/gpa"}
              />
              <NavItem
                icon={<Calculator className="w-4 h-4" />}
                label="Custom GPA Calculator"
                path="/student/custom-gpa"
                isActive={location.pathname === "/student/custom-gpa"}
              />
              <NavItem
                icon={<Code className="w-4 h-4" />}
                label="Devs"
                path="/student/devs"
                isActive={location.pathname === "/student/devs"}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop View */}
      <div className="hidden md:flex flex-wrap gap-4 text-white items-center max-w-full">
        <NavItem
          icon={<Home className="w-4 h-4" />}
          label="Home"
          path="/student/home"
          isActive={location.pathname === "/student/home"}
        />
        <NavItem
          icon={<Notebook className="w-4 h-4" />}
          label="Subjects"
          path="/student/subjects"
          isActive={location.pathname === "/student/subjects"}
        />
        <NavItem
          icon={<CalendarSearch className="w-4 h-4" />}
          label="Timetable"
          path="/student/timetable"
          isActive={location.pathname === "/student/timetable"}
        />
        <NavItem
          icon={<Calculator className="w-4 h-4" />}
          label="GPA Calculator"
          path="/student/gpa"
          isActive={location.pathname === "/student/gpa"}
        />
        <NavItem
          icon={<Calculator className="w-4 h-4" />}
          label="Custom GPA Calculator"
          path="/student/custom-gpa"
          isActive={location.pathname === "/student/custom-gpa"}
        />
        <NavItem
          icon={<Code className="w-4 h-4" />}
          label="Devs"
          path="/student/devs"
          isActive={location.pathname === "/student/devs"}
        />
      </div>

      {/* Profile */}
      <Profile det={details} setIsLoggedIn={setIsLoggedIn} />
    </div>
  );
}

function NavItem({ icon, label, path, isActive }) {
  return (
    <Link
      to={path}
      className={`cursor-pointer flex items-center gap-2 text-sm px-3 py-2 rounded-md transition-all duration-200
        ${isActive ? "bg-white/90 shadow-md font-semibold text-blue-700" : "hover:bg-white/10 text-white bg-transparent"}`}
    >
      <div className={`${isActive ? "text-blue-700" : "text-white"}`}>
        {icon}
      </div>
      <span className={`${isActive ? "text-blue-700" : "text-white"}`}>
        {label}
      </span>
    </Link>
  );
}

export default Navbar;
