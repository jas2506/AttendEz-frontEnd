import { User } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import FacultyDetailedProfile from "./FacultyDetailedProfile";

function FacultyProfile({ det, setIsLoggedIn }) {
  return (
    <>
      <Popover>
        <PopoverTrigger>
          <button
            className="m-2 sm:ml-auto sm:mr-4 cursor-pointer rounded-2xl px-3 py-1.5 flex items-center gap-2 
             bg-gradient-to-r from-blue-600 to-indigo-600 
             hover:from-blue-700 hover:to-indigo-700 
             transition-colors duration-300 hover:shadow-xl"
          >
            <User className="w-4 h-4 text-white" />
            <div className="text-white font-mono text-left leading-tight">
              <p className="font-semibold text-xs">{det.name}</p>
              <p className="text-[10px]">{det.position}</p>
            </div>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-[400px] p-0 bg-white shadow-xl rounded-md">
          <FacultyDetailedProfile details={det} setIsLoggedIn={setIsLoggedIn} />
        </PopoverContent>
      </Popover>
    </>
  );
}

export default FacultyProfile;
