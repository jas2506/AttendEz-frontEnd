import { BookOpen, Users, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

function FacultyTransfersubjectComp({c}) {
  const classdetails = c

  return (
    <div className="rounded-2xl border border-gray-300 bg-white shadow-md overflow-hidden p-4 md:p-5 w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-3">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-bold text-blue-600">
              {classdetails.className}
            </h2>
          </div>
          <div className="flex flex-wrap gap-3 text-gray-600 text-sm">
            <div className="flex items-center gap-1">
              <span className="font-medium">Class:</span>
              <span>{classdetails.section}</span>
            </div>
            <div className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium">
              {classdetails.year}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-10 mt-2 md:mt-0">
          <Button className="cursor-pointer flex items-center gap-2 text-sm text-blue-700 border-blue-200 bg-blue-50 hover:bg-blue-100">
            <Users className="w-4 h-4" />
            Transfer to another Faculty
          </Button>

          <Button className="cursor-pointer flex items-center gap-2 text-sm text-red-600 border-red-200 bg-red-50 hover:bg-red-100">
            <Trash2 className="w-4 h-4" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FacultyTransfersubjectComp;
