import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function FlipAttendance_g({
  name,
  rollNumber,
  isPresent: initialPresent = true,
}) {
  const [isPresent, setIsPresent] = useState(initialPresent);

  const handleFlip = () => {
    setIsPresent((prev) => !prev);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto my-4">
      <CardContent className="flex items-center justify-between gap-6 py-4">
        {/* Roll Number */}
        <div className="text-sm font-medium text-gray-800">{rollNumber}</div>

        {/* Name */}
        <div className="text-sm text-gray-600">{name}</div>

        {/* Status Indicator */}
        <div
          className={`w-4 h-4 full ${
            isPresent ? "bg-green-500" : "bg-red-500"
          }`}
        ></div>

        {/* Flip Attendance Button */}
        <Button
          className="bg-blue-500 hover:bg-blue-600 text-white"
          onClick={handleFlip}
        >
          Flip Attendance
        </Button>
      </CardContent>
    </Card>
  );
}

export default FlipAttendance_g;
