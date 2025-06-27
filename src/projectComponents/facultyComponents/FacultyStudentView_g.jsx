import { User, Contact } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";

function FacultyStudentView_g({ name, details, percentage, onViewDetails }) {
  const numericPercentage = parseFloat(percentage);

  let badgeColor = "bg-green-400";
  if (numericPercentage < 70) {
    badgeColor = "bg-red-500";
  } else if (numericPercentage < 75) {
    badgeColor = "bg-orange-400";
  }

  return (
    <div className="flex items-center justify-between bg-white border rounded-2xl px-6 py-4 shadow-md w-full">
      <div className="flex items-center space-x-3 w-1/3 min-w-0">
        <User className="w-8 h-8 text-gray-600 flex-shrink-0" />
        <span className="font-semibold text-lg text-blue-700 truncate">
          {name}
        </span>
      </div>

      <div className="w-1/3 text-center">
        <span className="text-md text-gray-600 font-medium">{details}</span>
      </div>

      <div className="flex items-center justify-end space-x-4 w-1/3">
        <div
          className={`${badgeColor} text-white font-bold text-md px-4 py-2 rounded-full text-center w-[100px]`}
        >
          {percentage}
        </div>

        <Button
          variant="outline"
          className="rounded-full text-md px-4 py-2 flex items-center space-x-2 whitespace-nowrap"
          onClick={onViewDetails}
        >
          <Contact className="w-5 h-5" />
          <span>View Details</span>
        </Button>
      </div>
    </div>
  );
}

export default FacultyStudentView_g;
