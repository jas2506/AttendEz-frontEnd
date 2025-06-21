import Profile from "./Profile";
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

function Navbar() {
  //get details from api
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
              <NavItem icon={<Home className="w-4 h-4" />} label="Home" />
              <NavItem
                icon={<Notebook className="w-4 h-4" />}
                label="Subjects"
              />
              <NavItem
                icon={<CalendarSearch className="w-4 h-4" />}
                label="Timetable"
              />
              <NavItem icon={<Pencil className="w-4 h-4" />} label="OD-form" />
              <NavItem
                icon={<Calculator className="w-4 h-4" />}
                label="GPA Calculator"
              />
              <NavItem icon={<Code className="w-4 h-4" />} label="Devs" />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop View: Horizontal Nav */}
      <div className="hidden md:flex gap-4 text-white items-center">
        <NavItem icon={<Home className="w-4 h-4" />} label="Home" />
        <NavItem icon={<Notebook className="w-4 h-4" />} label="Subjects" />
        <NavItem
          icon={<CalendarSearch className="w-4 h-4" />}
          label="Timetable"
        />
        <NavItem icon={<Pencil className="w-4 h-4" />} label="OD-form" />
        <NavItem
          icon={<Calculator className="w-4 h-4" />}
          label="GPA Calculator"
        />
        <NavItem icon={<Code className="w-4 h-4" />} label="Devs" />
      </div>

      {/* Profile */}
      <Profile det={details} />
    </div>
  );
}

function NavItem({ icon, label }) {
  return (
    <button className="flex items-center gap-1 text-xs hover:bg-gray-200 px-2 py-1 rounded-md transition md:hover:bg-blue-600">
      {icon}
      <span className="inline">{label}</span>
    </button>
  );
}

export default Navbar;
