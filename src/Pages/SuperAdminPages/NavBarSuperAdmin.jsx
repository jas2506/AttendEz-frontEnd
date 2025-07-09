import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, UserCircle, LogOut, Users, BookUser, Group } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

function NavbarSuperAdmin({ setIsLoggedIn }) {
  const location = useLocation();
  const navigate = useNavigate();

  const details = {
    email: "saipranav2310324@ssn.edu.in",
    name: "SuperAdmin",
    department: "CSE",
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Clear login state
    navigate("/superadmin/login"); // ✅ Redirect to login page
  };

  return (
    <div className="h-14 flex items-center justify-between px-3 w-full bg-blue-500">
      {/* Mobile View */}
      <div className="block md:hidden">
        <Sheet>
          <SheetTrigger>
            <Menu className="w-6 h-6 text-white cursor-pointer" />
          </SheetTrigger>
          <SheetContent side="left" className="h-full text-center">
            <SheetHeader>
              <SheetTitle>Super Admin</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4 items-start mt-4">
              <NavLinkItem
                to="/superadmin/manageteacher"
                icon={<Users className="w-4 h-4" />}
                label="Manage Teacher"
                current={location.pathname === "/superadmin/manageteacher"}
              />
              <NavLinkItem
                to="/superadmin/students"
                icon={<BookUser className="w-4 h-4" />}
                label="Manage Students"
                current={location.pathname === "/superadmin/students"}
              />
              <NavLinkItem
                to="/superadmin/logical-grouping"
                icon={<Group className="w-4 h-4" />}
                label="Logical Grouping"
                current={location.pathname === "/superadmin/logical-grouping"}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop View */}
      <div className="hidden md:flex gap-4 text-white items-center">
        <NavLinkItem
          to="/superadmin/manageteacher"
          icon={<Users className="w-4 h-4" />}
          label="Manage Teacher"
          current={location.pathname === "/superadmin/manageteacher"}
        />
        <NavLinkItem
          to="/superadmin/students"
          icon={<BookUser className="w-4 h-4" />}
          label="Manage Students"
          current={location.pathname === "/superadmin/students"}
        />
        <NavLinkItem
          to="/superadmin/logical-grouping"
          icon={<Group className="w-4 h-4" />}
          label="Logical Grouping"
          current={location.pathname === "/superadmin/logical-grouping"}
        />
      </div>

      {/* Profile Dropdown */}
      <div className="text-white">
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <UserCircle className="w-7 h-7 cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-60 mt-2 mr-2" align="end">
            <DropdownMenuLabel>Profile</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Name: {details.name}</DropdownMenuItem>
            <DropdownMenuItem>Email: {details.email}</DropdownMenuItem>
            <DropdownMenuItem>Dept: {details.department}</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-red-600 flex items-center gap-2 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

function NavLinkItem({ to, icon, label, current }) {
  return (
    <Link to={to}>
      <button
        className={`flex items-center gap-1 text-xs px-2 py-1 rounded-md transition ${
          current
            ? "bg-white text-blue-600 font-semibold"
            : "text-white hover:bg-blue-600"
        }`}
      >
        {icon}
        <span>{label}</span>
      </button>
    </Link>
  );
}

export default NavbarSuperAdmin;
