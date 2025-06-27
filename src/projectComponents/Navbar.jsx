import Profile from "./Profile";
import { Link, useLocation } from "react-router-dom";
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

function Navbar({setIsLoggedIn}) {
  const location = useLocation(); 

  const details = {
    email: "saipranav2310324@ssn.edu.in",
    name: "Saipranav M",
    registerNumber: "3122235001110",
    department: "CSE",
    passout: "2027",
    course: "Computer Science and Engineering",
    degree: "B.E",
    digitalid: "2310324",
    registeredClasses: ["CSE3H15C"],
  };

  return (
    <div className="h-14 flex items-center justify-between px-3 w-full bg-blue-500">
      {/* Mobile View: Hamburger Sheet */}
      <div className="block md:hidden">
        <Sheet>
          <SheetTrigger>
            <Menu className="w-6 h-6 text-white cursor-pointer" />
          </SheetTrigger>
          <SheetContent side="left" className="h-full text-center">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4 items-start mt-4">
              <Link to="/Home">
                <NavItem
                  icon={<Home className="w-4 h-4" />}
                  label="Home"
                  active={location.pathname === "/Home"}
                />
              </Link>
              <Link to="/Subjects">
                <NavItem
                  icon={<Notebook className="w-4 h-4" />}
                  label="Subjects"
                  active={location.pathname === "/Subjects"}
                />
              </Link>
              <Link to="/Timetable">
                <NavItem
                  icon={<CalendarSearch className="w-4 h-4" />}
                  label="Timetable"
                  active={location.pathname === "/Timetable"}
                />
              </Link>
              <Link to="#">
                <NavItem
                  icon={<Pencil className="w-4 h-4" />}
                  label="OD-form"
                  active={false}
                />
              </Link>
              <Link to="/GPAcalculator">
                <NavItem
                  icon={<Calculator className="w-4 h-4" />}
                  label="GPA Calculator"
                  active={location.pathname === "/GPAcalculator"}
                />
              </Link>
              <Link to="/CustomGPAcalculator">
                <NavItem
                  icon={<Calculator className="w-4 h-4" />}
                  label="Custom GPA Calculator"
                  active={location.pathname === "/CustomGPAcalculator"}
                />
              </Link>
              <Link to="#">
                <NavItem
                  icon={<Code className="w-4 h-4" />}
                  label="Devs"
                  active={false}
                />
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop View */}
      <div className="hidden md:flex gap-4 text-white items-center">
        <Link to="/Home">
          <NavItem
            icon={<Home className="w-4 h-4" />}
            label="Home"
            active={location.pathname === "/Home"}
          />
        </Link>
        <Link to="/Subjects">
          <NavItem
            icon={<Notebook className="w-4 h-4" />}
            label="Subjects"
            active={location.pathname === "/Subjects"}
          />
        </Link>
        <Link to="/Timetable">
          <NavItem
            icon={<CalendarSearch className="w-4 h-4" />}
            label="Timetable"
            active={location.pathname === "/Timetable"}
          />
        </Link>
        <Link to="#">
          <NavItem
            icon={<Pencil className="w-4 h-4" />}
            label="OD-form"
            active={false}
          />
        </Link>
        <Link to="/GPAcalculator">
          <NavItem
            icon={<Calculator className="w-4 h-4" />}
            label="GPA Calculator"
            active={location.pathname === "/GPAcalculator"}
          />
        </Link>
        <Link to="/CustomGPAcalculator">
          <NavItem
            icon={<Calculator className="w-4 h-4" />}
            label="Custom GPA Calculator"
            active={location.pathname === "/CustomGPAcalculator"}
          />
        </Link>
        <Link to="#">
          <NavItem
            icon={<Code className="w-4 h-4" />}
            label="Devs"
            active={false}
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
