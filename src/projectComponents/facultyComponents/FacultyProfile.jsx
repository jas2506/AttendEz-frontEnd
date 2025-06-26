import { User } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import FacultyDetailedProfile from "./FacultyDetailedProfile";

function FacultyProfile({ det }) {
  return (
    <>
      <Popover>
        <PopoverTrigger>
          <button
            className="border border-white m-2 cursor-pointer rounded-2xl px-3 py-1.5 flex items-center gap-2 bg-blue-500 hover:bg-blue-600 transition-colors duration-300"
          >
            <User className="w-4 h-4 text-white" />
            <div className="text-white font-mono text-left leading-tight">
              <p className="font-semibold text-xs">{det.name}</p>
              <p className="text-[10px]">{det.position}</p>
            </div>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-[400px] p-0">
          <FacultyDetailedProfile details={det} ></FacultyDetailedProfile>
        </PopoverContent>
      </Popover>
    </>
  );
}

export default FacultyProfile;
