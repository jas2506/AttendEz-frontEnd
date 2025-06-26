import FacultyProfile from "./FacultyProfile";
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
  User
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

function FacultyNavbar_j() {
  // const location=useLocation();

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
    <>
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
                <NavItem icon={<Home className="w-4 h-4" />} label="Home" />
                <NavItem icon={<Notebook className="w-4 h-4" />} label="Subjects Handled" />
                <NavItem icon={<CalendarSearch className="w-4 h-4" />} label="Faculty Timetable" />
                <NavItem icon={<Pencil className="w-4 h-4" />} label="Approve OD" />
                <NavItem icon={<Presentation className="w-4 h-4" />} label="Mentor View" />
                <NavItem icon={<Users className="w-4 h-4" />} label="Class Advisor View" />
                <NavItem icon={<Code className="w-4 h-4" />} label="Devs" />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop View */}
        <div className="hidden md:flex gap-4 text-white items-center">
          <NavItem icon={<Home className="w-4 h-4" />} label="Home" />
          <NavItem icon={<Notebook className="w-4 h-4" />} label="Subjects Handled" />
          <NavItem icon={<CalendarSearch className="w-4 h-4" />} label="Faculty Timetable" />
          <NavItem icon={<Pencil className="w-4 h-4" />} label="Approve OD" />
          <NavItem icon={<Presentation className="w-4 h-4" />} label="Mentor View" />
          <NavItem icon={<User className="w-4 h-4" />} label="Class Advisor View" />
          <NavItem icon={<Code className="w-4 h-4" />} label="Devs" />
        </div>

        {/* Profile */}
        <FacultyProfile det={details} />
      </div>
    </>
  );
}

function NavItem({ icon, label }) {
  return (
    <button className="cursor-pointer hover:bg-blue-600 flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-md transition text-white">
      {icon}
      <span>{label}</span>
    </button>
  );
}


export default FacultyNavbar_j;
