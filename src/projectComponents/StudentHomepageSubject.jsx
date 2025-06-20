import { Clock } from "lucide-react";

function formatTime(hour, minute) {
  const ampm = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  const paddedMin = minute.toString().padStart(2, "0");
  return `${hour12}:${paddedMin} ${ampm}`;
}

function StudentHomepageSubject() {
  const subject = "Operating Systems";
  const attendancePercentage = 76;
  const startTime = { hour: 9, minute: 0 };
  const endTime = { hour: 9, minute: 50 };
  const attended = false; // Change to true/false to test different cases

  const now = new Date();
  const classStart = new Date();
  classStart.setHours(startTime.hour, startTime.minute, 0, 0);

  let statusText = "";
  let statusStyle = "";

  if (now < classStart) {
    // Class hasn't started yet
    statusText = `${formatTime(startTime.hour, startTime.minute)} – ${formatTime(endTime.hour, endTime.minute)}`;
    statusStyle = "border border-blue-500 text-blue-600 bg-blue-50";
  } else if (attended) {
    statusText = "Attended";
    statusStyle = "border border-green-500 text-green-600 bg-green-50";
  } else {
    statusText = "Absent";
    statusStyle = "border border-red-500 text-red-600 bg-red-50";
  }

  return (
    <div className="p-4 md:p-6">
      <div className="rounded-2xl border border-gray-300 bg-white shadow-md p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 w-full max-w-4xl mx-auto">
        {/* Subject & Time */}
        <div className="flex flex-col gap-1">
          <p className="font-bold text-xl text-blue-600">{subject}</p>
          <div className="flex items-center text-gray-600 text-sm gap-1">
            <Clock className="w-4 h-4" />
            <span>
              {formatTime(startTime.hour, startTime.minute)} – {formatTime(endTime.hour, endTime.minute)}
            </span>
          </div>
        </div>

        {/* Attendance */}
        <div className="flex items-center gap-4">
          <div className="text-center">
            <p className="text-xl font-semibold text-gray-800">{attendancePercentage}%</p>
            <p className="text-sm text-gray-500">Attendance</p>
          </div>

          <div className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyle}`}>
            {statusText}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentHomepageSubject;
