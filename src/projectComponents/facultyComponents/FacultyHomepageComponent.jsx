import {
  Clock,
  NotebookText,
  UsersRound,
  QrCode,
  Keyboard,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";

function FacultyHomepageComponent({ c }) {
  const classdetails = c;

  const endTime = new Date(`2000-01-01 ${classdetails.start}`);
  endTime.setMinutes(endTime.getMinutes() + classdetails.duration);
  const formattedEndTime = endTime.toTimeString().slice(0, 5);

  return (
    <div className="bg-white px-4 md:px-6 py-3">
      <div className="max-w-6xl mx-auto">
        <div className="rounded-2xl border border-gray-300 bg-white shadow-md overflow-hidden p-4 md:p-5">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold text-blue-600">
                  {classdetails.className}
                </h2>
              </div>
              <div className="flex flex-wrap gap-3 text-gray-600 text-sm">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>
                    {classdetails.start} – {formattedEndTime}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span>{classdetails.classCode}</span>
                </div>
                <div className="flex items-center gap-1">
                  <UsersRound className="w-4 h-4" />

                  <span>{classdetails.section}</span>
                </div>
                <div className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium">
                  {classdetails.passoutYear}
                </div>
              </div>
            </div>

            <div className="text-right">
              <p className="text-xs text-gray-600">Duration</p>
              <p className="text-base font-semibold text-gray-800">
                {classdetails.duration} mins
              </p>
            </div>
          </div>

          {/* Actions */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-2">
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <ActionButton
                icon={<QrCode className="w-5 h-5" />}
                label="Generate QR"
                description="QR code attendance"
              />
              <ActionButton
                icon={<Keyboard className="w-5 h-5" />}
                label="Generate Code"
                description="Attendance code"
              />
              <ActionButton
                icon={<NotebookText className="w-5 h-5" />}
                label="Manual Entry"
                description="Mark manually"
              />
              <ActionButton
                icon={<UsersRound className="w-5 h-5" />}
                label="Substitution"
                description="Generate Sub Code"
                isHighlighted
              />
            </div>
          </div>

          {/* Status Bar */}
          <div className="pt-3 mt-3 border-t border-gray-200 text-xs text-gray-600 italic text-right">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
}

function ActionButton({ icon, label, description, isHighlighted = false }) {
  return (
    <Button
      className={`
          cursor-pointer 
          flex flex-col items-center justify-center gap-2
          rounded-xl border transition duration-200 ease-in-out
          py-3 px-3 h-auto min-h-[80px] w-full
          hover:scale-[1.02] hover:-translate-y-0.5
          ${
            isHighlighted
              ? "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100"
              : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
          }
        `}
    >
      <div
        className={`p-2 rounded-md ${
          isHighlighted ? "bg-blue-200" : "bg-gray-100"
        }`}
      >
        {icon}
      </div>
      <div className="text-center">
        <p className="font-medium text-sm">{label}</p>
        <p
          className={`text-xs mt-0.5 ${
            isHighlighted ? "text-blue-600" : "text-gray-500"
          }`}
        >
          {description}
        </p>
      </div>
    </Button>
  );
}

export default FacultyHomepageComponent;
