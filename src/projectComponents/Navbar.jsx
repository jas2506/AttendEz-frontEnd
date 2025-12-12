import Profile from "./Profile";
import { useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Calculator,
  Code,
  Menu,
  Home,
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
    <>
      {/* TOP BAR (both mobile & desktop, for profile + menu icon) */}
      <div className="h-14 flex items-center justify-between px-3 sm:px-6 w-full bg-gradient-to-r from-blue-600 to-indigo-600 shadow-xl">
        {/* Mobile hamburger (drawer) */}
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

              {/* 🔹 THIS IS EXACTLY YOUR OLD MOBILE DRAWER, UNCHANGED 🔹 */}
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

        {/* Desktop links */}
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

        {/* Profile on right (both views) */}
        <Profile det={details} setIsLoggedIn={setIsLoggedIn} />
      </div>

      {/* BOTTOM NAVBAR - MOBILE ONLY */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_8px_rgba(0,0,0,0.08)] border-t z-50">
        <div className="flex justify-between px-4 py-2">
          <BottomNavItem
            icon={<Home className="w-6 h-6" />}
            label="Home"
            path="/student/home"
            isActive={location.pathname === "/student/home"}
          />
          <BottomNavItem
            icon={<Notebook className="w-6 h-6" />}
            label="Subjects"
            path="/student/subjects"
            isActive={location.pathname === "/student/subjects"}
          />
          <BottomNavItem
            icon={<CalendarSearch className="w-6 h-6" />}
            label="Timetable"
            path="/student/timetable"
            isActive={location.pathname === "/student/timetable"}
          />
          <BottomNavItem
            icon={<Calculator className="w-6 h-6" />}
            label="GPA"
            path="/student/gpa"
            isActive={location.pathname === "/student/gpa"}
          />
          <BottomNavItem
            icon={<Code className="w-6 h-6" />}
            label="Devs"
            path="/student/devs"
            isActive={location.pathname === "/student/devs"}
          />
        </div>
      </div>
    </>
  );
}

/* ORIGINAL NavItem (used  everywhere including drawer) */
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

/* Bottom nav item – separate styling so it doesn't affect drawer */
function BottomNavItem({ icon, label, path, isActive }) { 
  return (
    <Link
      to={path}
      className={`flex flex-col items-center text-xs ${
        isActive 
          ? "text-blue-600 font-semibold"
          : "bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
      }`}
    >
      {icon}
      <span className="mt-1">{label}</span>
    </Link>
  );
}


export default Navbar;
