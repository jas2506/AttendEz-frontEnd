import { useEffect, useState } from "react";
import { fetchDetails, fetchAttendance, fetchTimetable } from "../Api";

function getTodayAttendanceStats(attendance, timetable) {
  const today = new Date();
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const todayName = "Monday";
  //    todayName = "Monday";

  //   weekdays[today.getDay()]

  const todayClasses = timetable.timetable[todayName] || [];

  const stats = todayClasses.map((cls) => {
    const code = cls.classCode;

    // Parse start time
    const [startHourStr, startMinStr] = cls.startTime.split(":");
    const startHour = parseInt(startHourStr, 10);
    const startMinute = parseInt(startMinStr, 10);
    const duration = cls.durationMinutes;

    const startTime = { hour: startHour, minute: startMinute };

    // Compute end time
    const startDate = new Date(0, 0, 0, startHour, startMinute);
    const endDate = new Date(startDate.getTime() + duration * 60000);
    const endTime = {
      hour: endDate.getHours(),
      minute: endDate.getMinutes(),
    };

    // Attendance calculation
    const attendanceRecords = attendance[code];
    let total = 0;
    let attended = 0;

    if (attendanceRecords) {
      for (const lecture in attendanceRecords) {
        total += 1;
        if (attendanceRecords[lecture].present === 1) {
          attended += 1;
        }
      }
    }

    return {
      classCode: code,
      className: timetable.classDetails[code]?.className || code,
      startTime,
      endTime,
      totalLectures: total,
      attendedLectures: attended,
    };
  });

  return stats;
}

function SubjectsPage() {
  const [currentDateStr, setCurrentDateStr] = useState("");
  const [attendance, setAttendance] = useState(null);
  const [timetable, setTimetable] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const today = new Date();
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    const formatted = today.toLocaleDateString("en-US", options);
    setCurrentDateStr(formatted);

    async function fetchData() {
      try {
        const [attendanceData, timetableData] = await Promise.all([
          
          fetchAttendance(),
          fetchTimetable(),
        ]);

        setAttendance(attendanceData);
        setTimetable(timetableData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  const stats = getTodayAttendanceStats(
    attendance.attendance,
    timetable.timetable
  );

  const calculatePercentage = (attended, total) => {
    return total > 0 ? ((attended / total) * 100).toFixed(1) : 0;
  };

  // Calculate average attendance percentage
  const calculateAveragePercentage = () => {
    const totalAttended = stats.reduce(
      (sum, subject) => sum + subject.attendedLectures,
      0
    );
    const totalLectures = stats.reduce(
      (sum, subject) => sum + subject.totalLectures,
      0
    );
    return totalLectures > 0
      ? ((totalAttended / totalLectures) * 100).toFixed(1)
      : 0;
  };

  const averagePercentage = calculateAveragePercentage();

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-blue-50 px-6 py-4 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800">Attendance</h2>
          <p className="text-gray-600 text-sm mt-1">Course Wise Attendance</p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-blue-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Subject Name
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Lectures Attended
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Total Lectures
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Attendance %
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {stats.map((subject, index) => {
                const percentage = calculatePercentage(
                  subject.attendedLectures,
                  subject.totalLectures
                );
                const isLowAttendance = parseFloat(percentage) < 75;

                return (
                  <tr
                    key={index}
                    className="hover:bg-blue-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {subject.className}
                        </div>
                        <div className="text-sm text-gray-500">
                          {subject.classCode}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-sm font-medium text-gray-900">
                        {subject.attendedLectures}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-sm font-medium text-gray-900">
                        {subject.totalLectures}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                          isLowAttendance
                            ? "bg-red-100 text-red-800 border border-red-200"
                            : "bg-green-100 text-green-800 border border-green-200"
                        }`}
                      >
                        {percentage}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Average Attendance */}
        <div className="bg-blue-50 px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Overall Average Attendance
              </h3>
              <p className="text-sm text-gray-600">
                Based on all subjects combined
              </p>
            </div>
            <div className="text-right">
              <span
                className={`inline-flex items-center px-4 py-2 rounded-full text-lg font-bold ${
                  parseFloat(averagePercentage) < 75
                    ? "bg-red-100 text-red-800 border-2 border-red-300"
                    : "bg-green-100 text-green-800 border-2 border-green-300"
                }`}
              >
                {averagePercentage}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubjectsPage;
