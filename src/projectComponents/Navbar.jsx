import Profile from "./Profile";
import {Calculator, Code, User, Menu, Home, Pencil, CalendarDays, CalendarSearch, Settings, Info, LogOut, Notebook } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

function Navbar() {
  return (
    <>
      <div className="h-20 flex items-center justify-between px-4 w-full  bg-blue-500 ">
        <Sheet>
          <SheetTrigger>
            <Menu className="w-9 h-9 text-white cursor-pointer"></Menu>
          </SheetTrigger>
          <SheetContent side="top" className=" h-fit text-center">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4 items-center">
              <NavItem icon={<Home className="w-5 h-5" />} label="Home" />
              <NavItem
                icon={<Notebook className="w-5 h-5" />}
                label="Subjects"
              />
              <NavItem icon={<CalendarSearch className="w-5 h-5" />} label="Timetable" />
              <NavItem icon={<Pencil className="w-5 h-5" />} label="OD-form" />
              <NavItem icon={<CalendarDays className="w-5 h-5" />} label="Calendar View" />
              <NavItem icon={<User className="w-5 h-5" />} label="Profile" />
              <NavItem icon={<Calculator className="w-5 h-5" />} label="GPA Calculator" />
              <NavItem icon={<Code className="w-5 h-5" />} label="Devs" />
            </div>
          </SheetContent>
        </Sheet>

        <Profile></Profile>
      </div>
    </>
  );
}

function NavItem({ icon, label }) {
  return (
    <button className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-md transition">
      {icon}
      {label}
    </button>
  );
}

export default Navbar;
