import { User, Contact } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";

function FacultyStudentView_g({ name, details, percentage, onViewDetails }) {
  const numericPercentage = parseFloat(percentage);

  // Badge color based on percentage
  let badgeColor = "bg-green-400";
  if (numericPercentage < 70) {
    badgeColor = "bg-red-500";
  } else if (numericPercentage < 75) {
    badgeColor = "bg-orange-400";
  }

  return (
    <div className="flex items-center justify-between bg-white border rounded-full px-4 py-2 shadow-sm w-full max-w-3xl">
      {/* Left: Icon, Name, and Details */}
      <div className="flex items-center space-x-2 flex-grow min-w-0">
        <User className="w-6 h-6 text-gray-500 flex-shrink-0" />
        <div className="flex flex-col truncate">
          <span className="font-medium text-blue-600 truncate">{name}</span>
          <span className="text-sm text-gray-500 truncate">{details}</span>
        </div>
      </div>

      {/* Middle: Percentage Badge */}
      <div
        className={`${badgeColor} text-white font-semibold text-sm px-3 py-1 rounded-full text-center w-[80px] mx-4`}
      >
        {percentage}
      </div>

      {/* Right: View Details Button */}
      <Button
        variant="outline"
        className="rounded-full flex items-center space-x-2 whitespace-nowrap"
        onClick={onViewDetails}
      >
        <Contact className="w-4 h-4" />
        <span>View Details</span>
      </Button>
    </div>
  );
}

export default FacultyStudentView_g;
