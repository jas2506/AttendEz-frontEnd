import Profile from "./Profile";
import DevsPage from "../Pages/DevsPage";
import { Link, useLocation } from "react-router-dom";
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
    <div className="h-14 flex items-center justify-between px-3 w-full bg-blue-500">
      {/* Mobile View: Hamburger Sheet */}
      <div className="block md:hidden">
        <Sheet>
          <SheetTrigger>
            <Menu className="w-6 h-6 text-white cursor-pointer" />
          </SheetTrigger>
          <SheetContent
            side="left"
            className="h-full text-center bg-blue-500 text-white"
          >
            <SheetHeader>
              <SheetTitle className="text-white">Menu</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4 items-start mt-4">
              <Link to="/student/home">
                <NavItem
                  icon={<Home className="w-4 h-4" />}
                  label="Home"
                  active={location.pathname === "/student/home"}
                />
              </Link>
              <Link to="/student/subjects">
                <NavItem
                  icon={<Notebook className="w-4 h-4" />}
                  label="Subjects"
                  active={location.pathname === "/student/subjects"}
                />
              </Link>
              <Link to="/student/timetable">
                <NavItem
                  icon={<CalendarSearch className="w-4 h-4" />}
                  label="Timetable"
                  active={location.pathname === "/student/timetable"}
                />
              </Link>
              <Link to="#">
                <NavItem
                  icon={<Pencil className="w-4 h-4" />}
                  label="OD-form"
                  active={false}
                />
              </Link>
              <Link to="/student/gpa">
                <NavItem
                  icon={<Calculator className="w-4 h-4" />}
                  label="GPA Calculator"
                  active={location.pathname === "/student/gpa"}
                />
              </Link>
              <Link to="/student/custom-gpa">
                <NavItem
                  icon={<Calculator className="w-4 h-4" />}
                  label="Custom GPA Calculator"
                  active={location.pathname === "/student/custom-gpa"}
                />
              </Link>
              <Link to="/student/devs">
                <NavItem
                  icon={<Code className="w-4 h-4" />}
                  label="Devs"
                  active={location.pathname === "/student/devs"}
                />
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop View */}
      <div className="hidden md:flex gap-4 text-white items-center">
        <Link to="/student/home">
          <NavItem
            icon={<Home className="w-4 h-4" />}
            label="Home"
            active={location.pathname === "/student/home"}
          />
        </Link>
        <Link to="/student/subjects">
          <NavItem
            icon={<Notebook className="w-4 h-4" />}
            label="Subjects"
            active={location.pathname === "/student/subjects"}
          />
        </Link>
        <Link to="/student/timetable">
          <NavItem
            icon={<CalendarSearch className="w-4 h-4" />}
            label="Timetable"
            active={location.pathname === "/student/timetable"}
          />
        </Link>
        <Link to="#">
          <NavItem
            icon={<Pencil className="w-4 h-4" />}
            label="OD-form"
            active={false}
          />
        </Link>
        <Link to="/student/gpa">
          <NavItem
            icon={<Calculator className="w-4 h-4" />}
            label="GPA Calculator"
            active={location.pathname === "/student/gpa"}
          />
        </Link>
        <Link to="/student/custom-gpa">
          <NavItem
            icon={<Calculator className="w-4 h-4" />}
            label="Custom GPA Calculator"
            active={location.pathname === "/student/custom-gpa"}
          />
        </Link>
        <Link to="/student/devs">
          <NavItem
            icon={<Code className="w-4 h-4" />}
            label="Devs"
            active={location.pathname === "student/devs"}
          />
        </Link>
      </div>

      {/* Profile */}
      <Profile det={details} setIsLoggedIn={setIsLoggedIn} />
    </div>
  );
}

function NavItem({ icon, label, active }) {
  return (
    <button
      className={`flex cursor-pointer items-center gap-1 text-xs px-2 py-1 rounded-md transition 
        ${
          active
            ? "bg-white text-blue-600 font-semibold"
            : "text-white hover:bg-blue-600"
        }`}
    >
      {icon}
      <span className="inline">{label}</span>
    </button>
  );
}

export default Navbar;
