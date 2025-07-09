// Add at the top of your component (below useState imports)
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import DetailedCalendar from "../projectComponents/DetailedCalendar";

function SubjectsPage() {
  const [currentDateStr, setCurrentDateStr] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarData, setCalendarData] = useState({
    present: [],
    absent: [],
    partial: [],
  });
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
  }, []);

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

  const attendance = {
    ELE2H22A: {
      "lecture.1": {
        date: 20250616,
        time: 222843,
        present: 0,
      },
      "lecture.2": {
        date: 20250616,
        time: 224223,
        present: 0,
      },
      "lecture.3": {
        date: 20250616,
        time: 224313,
        present: 0,
      },
      "lecture.4": {
        date: 20250616,
        time: 234617,
        present: 1,
      },
      "lecture.5": {
        date: 20250616,
        time: 234729,
        present: 0,
      },
      "lecture.6": {
        date: 20250617,
        time: 151,
        present: 0,
      },
      "lecture.7": {
        date: 20250617,
        time: 646,
        present: 0,
      },
      "lecture.8": {
        date: 20250617,
        time: 1212,
        present: 0,
      },
      "lecture.9": {
        date: 20250617,
        time: 1415,
        present: 0,
      },
      "lecture.10": {
        date: 20250617,
        time: 2318,
        present: 0,
      },
      "lecture.11": {
        date: 20250617,
        time: 1401,
        present: 0,
      },
      "lecture.12": {
        date: 20250617,
        time: 1402,
        present: 0,
      },
      "lecture.13": {
        date: 20250617,
        time: 1409,
        present: 0,
      },
      "lecture.14": {
        date: 20250617,
        time: 1410,
        present: 0,
      },
      "lecture.15": {
        date: 20250617,
        time: 1410,
        present: 1,
      },
      "lecture.16": {
        date: 20250617,
        time: 1416,
        present: 1,
      },
      "lecture.17": {
        date: 20250617,
        time: 1417,
        present: 0,
      },
      "lecture.18": {
        date: 20250618,
        time: 1839,
        present: 1,
      },
      "lecture.19": {
        date: 20250619,
        time: 854,
        present: 0,
      },
      "lecture.20": {
        date: 20250619,
        time: 857,
        present: 0,
      },
      "lecture.21": {
        date: 20250619,
        time: 902,
        present: 0,
      },
      "lecture.22": {
        date: 20250619,
        time: 902,
        present: 0,
      },
      "lecture.23": {
        date: 20250619,
        time: 1009,
        present: 1,
      },
    },
    CSE2701B: {
      "lecture.1": {
        date: 20250617,
        time: 34,
        present: 0,
      },
      "lecture.2": {
        date: 20250617,
        time: 36,
        present: 0,
      },
      "lecture.3": {
        date: 20250617,
        time: 1110,
        present: 0,
      },
      "lecture.4": {
        date: 20250617,
        time: 1111,
        present: 0,
      },
      "lecture.5": {
        date: 20250617,
        time: 1112,
        present: 0,
      },
      "lecture.6": {
        date: 20250617,
        time: 1256,
        present: 1,
      },
      "lecture.7": {
        date: 20250617,
        time: 1300,
        present: 1,
      },
      "lecture.8": {
        date: 20250617,
        time: 1304,
        present: 0,
      },
      "lecture.9": {
        date: 20250618,
        time: 1904,
        present: 1,
      },
      "lecture.10": {
        date: 20250619,
        time: 903,
        present: 0,
      },
      "lecture.11": {
        date: 20250619,
        time: 1003,
        present: 1,
      },
    },
  };

  const timetable = {
    classDetails: {
      ELE2H22A: {
        facultyEmail: "saipranav2310324@ssn.edu.in",
        classCode: "ELE2H22A",
        passoutYear: "2027",
        credits: "4",
        className: "IMAGE ANALYSIS",
        facultyName: "Dr. Saipranav",
        department: "CSE",
        groupCode: "CSEELE2H22A2027",
      },
      CSE2704B: {
        facultyEmail: "saipranav2310324@ssn.edu.in",
        classCode: "CSE2704B",
        passoutYear: "2027",
        credits: "4",
        className: "COA",
        facultyName: "Dr. Saipranav",
        department: "CSE",
        groupCode: "CSE2027B",
      },
      CSE2703B: {
        facultyEmail: "saipranav2310324@ssn.edu.in",
        classCode: "CSE2703B",
        passoutYear: "2027",
        credits: "4",
        className: "COA",
        facultyName: "Dr. Saipranav",
        department: "CSE",
        groupCode: "CSE2027B",
      },
      CSE2702B: {
        facultyEmail: "saipranav2310324@ssn.edu.in",
        classCode: "CSE2702B",
        passoutYear: "2027",
        credits: "4",
        className: "COA",
        facultyName: "Dr. Saipranav",
        department: "CSE",
        groupCode: "CSE2027B",
      },
      CSE2701B: {
        facultyEmail: "saipranav2310324@ssn.edu.in",
        classCode: "CSE2701B",
        passoutYear: "2027",
        credits: "4",
        className: "COA",
        facultyName: "Dr. Saipranav",
        department: "CSE",
        groupCode: "CSE2027B",
      },
      CSE2705B: {
        facultyEmail: "saipranav2310324@ssn.edu.in",
        classCode: "CSE2705B",
        passoutYear: "2027",
        credits: "4",
        className: "COA",
        facultyName: "Dr. Saipranav",
        department: "CSE",
        groupCode: "CSE2027B",
      },
    },
    timetable: {
      Monday: [
        {
          classCode: "CSE2701B",
          startTime: "09:00",
          durationMinutes: 50,
        },
        {
          classCode: "CSE2702B",
          startTime: "10:00",
          durationMinutes: 50,
        },
        {
          classCode: "CSE2703B",
          startTime: "11:00",
          durationMinutes: 50,
        },
        {
          classCode: "CSE2704B",
          startTime: "12:00",
          durationMinutes: 50,
        },
        {
          classCode: "ELE2H22A",
          startTime: "14:00",
          durationMinutes: 100,
        },
      ],
      Thursday: [
        {
          classCode: "CSE2701B",
          startTime: "12:00",
          durationMinutes: 50,
        },
        {
          classCode: "CSE2703B",
          startTime: "09:00",
          durationMinutes: 50,
        },
        {
          classCode: "CSE2704B",
          startTime: "10:00",
          durationMinutes: 50,
        },
        {
          classCode: "CSE2705B",
          startTime: "11:00",
          durationMinutes: 50,
        },
        {
          classCode: "ELE2H22A",
          startTime: "14:00",
          durationMinutes: 50,
        },
      ],
      Friday: [
        {
          classCode: "CSE2702B",
          startTime: "09:00",
          durationMinutes: 50,
        },
        {
          classCode: "CSE2703B",
          startTime: "10:00",
          durationMinutes: 50,
        },
        {
          classCode: "CSE2704B",
          startTime: "11:00",
          durationMinutes: 50,
        },
        {
          classCode: "CSE2705B",
          startTime: "12:00",
          durationMinutes: 50,
        },
        {
          classCode: "ELE2H22A",
          startTime: "14:00",
          durationMinutes: 100,
        },
      ],
      Wednesday: [
        {
          classCode: "CSE2701B",
          startTime: "11:00",
          durationMinutes: 50,
        },
        {
          classCode: "CSE2702B",
          startTime: "12:00",
          durationMinutes: 50,
        },
        {
          classCode: "CSE2704B",
          startTime: "09:00",
          durationMinutes: 50,
        },
        {
          classCode: "CSE2705B",
          startTime: "10:00",
          durationMinutes: 50,
        },
        {
          classCode: "ELE2H22A",
          startTime: "14:00",
          durationMinutes: 100,
        },
      ],
      Tuesday: [
        {
          classCode: "CSE2701B",
          startTime: "10:00",
          durationMinutes: 50,
        },
        {
          classCode: "CSE2702B",
          startTime: "11:00",
          durationMinutes: 50,
        },
        {
          classCode: "CSE2703B",
          startTime: "12:00",
          durationMinutes: 50,
        },
        {
          classCode: "CSE2705B",
          startTime: "09:00",
          durationMinutes: 50,
        },
        {
          classCode: "ELE2H22A",
          startTime: "14:00",
          durationMinutes: 50,
        },
      ],
    },
  };

  const stats = getTodayAttendanceStats(attendance, timetable);

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
  const handleViewCalendar = (subjectCode) => {
    const records = attendance[subjectCode]; // using your provided data
    const dayMap = {};

    if (records) {
      Object.values(records).forEach(({ date, present }) => {
        const key = `${date}`;
        if (!dayMap[key]) dayMap[key] = new Set();
        dayMap[key].add(present);
      });
    }

    const present = [];
    const absent = [];
    const partial = [];

    for (const [dateStr, statuses] of Object.entries(dayMap)) {
      const date = new Date(
        parseInt(dateStr.slice(0, 4)),
        parseInt(dateStr.slice(4, 6)) - 1,
        parseInt(dateStr.slice(6, 8))
      );

      if (statuses.has(1) && statuses.has(0)) partial.push(date);
      else if (statuses.has(1)) present.push(date);
      else absent.push(date);
    }

    setCalendarData({ present, absent, partial });
    setShowCalendar(true);
  };

  const averagePercentage = calculateAveragePercentage();

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
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
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Calendar
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
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleViewCalendar(subject.classCode)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full text-xs"
                      >
                        View Calendar
                      </button>
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

      {/* Calendar Dialog */}
      <Dialog open={showCalendar} onOpenChange={setShowCalendar}>
        <DialogContent className="w-fit max-w-[90vw]">
          <DialogHeader>
            <DialogTitle>Attendance Calendar</DialogTitle>
            <DialogDescription>
              Shows days attended, absent, and partially attended.
            </DialogDescription>
          </DialogHeader>

          <DetailedCalendar
            present={calendarData.present}
            absent={calendarData.absent}
            multiple={calendarData.partial}
          />

          <DialogClose asChild>
            <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
              Close
            </button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default SubjectsPage;
