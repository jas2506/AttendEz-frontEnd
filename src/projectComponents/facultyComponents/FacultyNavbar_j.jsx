import { useLocation, Link } from "react-router-dom";
import FacultyProfile from "./FacultyProfile";
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

const navLinks = [
  {
    label: "Home",
    icon: <Home className="w-4 h-4" />,
    path: "/FacultyHomepage",
  },
  {
    label: "Subjects Handled",
    icon: <Notebook className="w-4 h-4" />,
    path: "/SubjectsHandled",
  },
  {
    label: "Faculty Timetable",
    icon: <CalendarSearch className="w-4 h-4" />,
    path: "/FacultyTimetable",
  },
  { label: "Approve OD", icon: <Pencil className="w-4 h-4" />, path: "#" }, // This doesn't exist yet
  {
    label: "Mentor View",
    icon: <Presentation className="w-4 h-4" />,
    path: "/MentorView",
  },
  {
    label: "Class Advisor View",
    icon: <User className="w-4 h-4" />,
    path: "#",
  }, // Not in routes yet
  { label: "Devs", icon: <Code className="w-4 h-4" />, path: "/Devs" },
  {
    label: "Create Class",
    icon: <GraduationCap className="w-4 h-4" />,
    path: "/CreateClass",
  },
];

function FacultyNavbar_j({ setIsLoggedIn }) {
  const location = useLocation();

  const details = {
    _id: {
      $oid: "68579753a03a9f34b7ab7691",
    },
    department: "EEE",
    faculty_email: "sripranv@gmail.com",
    position: "Assistant Professor",
    name: "Dr.Sripranav",
    mentor: "True",
    class_advisor: "True",
  };

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
              {navLinks.map((link) => (
                <NavItem
                  key={link.label}
                  icon={link.icon}
                  label={link.label}
                  path={link.path}
                  isActive={location.pathname === link.path}
                />
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop View */}
      <div className="hidden lg:flex gap-4 text-white items-center">
        {navLinks.map((link) => (
          <NavItem
            key={link.label}
            icon={link.icon}
            label={link.label}
            path={link.path}
            isActive={location.pathname === link.path}
          />
        ))}
      </div>

      {/* Profile */}
      <FacultyProfile det={details} setIsLoggedIn={setIsLoggedIn} />
    </div>
  );
}

function NavItem({ icon, label, path, isActive }) {
  return (
    <Link
      to={path}
      className={`flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-md transition-all duration-200
        ${
          isActive
            ? "bg-white/20 shadow-md scale-[1.05]"
            : "hover:bg-white/10 hover:shadow hover:scale-[1.02]"
        }
        `}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}

export default FacultyNavbar_j;
