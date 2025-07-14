"use client";

import { useEffect, useState } from "react";
import { fetchAttendance, fetchTimetable } from "../Api";
import { Calendar } from "../components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

function getTodayAttendanceStats(attendance, timetable) {
  const statsMap = {};
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  for (const day of weekdays) {
    const dayClasses = timetable.timetable[day] || [];

    for (const cls of dayClasses) {
      const code = cls.classCode;
      if (statsMap[code]) continue; // skip duplicate classCodes

      const [startHourStr, startMinStr] = cls.startTime.split(":");
      const startHour = parseInt(startHourStr, 10);
      const startMinute = parseInt(startMinStr, 10);
      const duration = cls.durationMinutes;
      const startDate = new Date(0, 0, 0, startHour, startMinute);
      const endDate = new Date(startDate.getTime() + duration * 60000);

      const startTime = { hour: startHour, minute: startMinute };
      const endTime = {
        hour: endDate.getHours(),
        minute: endDate.getMinutes(),
      };

      const attendanceRecords = attendance[code] || {};
      let total = 0;
      let attended = 0;

      for (const lectureKey in attendanceRecords) {
        total++;
        if (attendanceRecords[lectureKey].present === 1) attended++;
      }

      statsMap[code] = {
        classCode: code,
        className: timetable.classDetails?.[code]?.className || code,
        startTime,
        endTime,
        totalLectures: total,
        attendedLectures: attended,
      };
    }
  }

  return Object.values(statsMap);
}

function SubjectsPage() {
  const [currentDateStr, setCurrentDateStr] = useState("");
  const [attendance, setAttendance] = useState(null);
  const [timetable, setTimetable] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [calendarData, setCalendarData] = useState({
    present: [],
    absent: [],
    partial: [],
  });
  const [showLectureDetails, setShowLectureDetails] = useState(false);
  const [selectedDayLectures, setSelectedDayLectures] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

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

  // Helper function to parse date from YYYYMMDD format
  const parseDate = (dateNum) => {
    const dateStr = dateNum.toString();
    const year = Number.parseInt(dateStr.substring(0, 4));
    const month = Number.parseInt(dateStr.substring(4, 6)) - 1; // Month is 0-indexed
    const day = Number.parseInt(dateStr.substring(6, 8));
    return new Date(year, month, day);
  };

  // Helper function to format time from HHMM format
  const formatTime = (timeNum) => {
    const timeStr = timeNum.toString().padStart(4, "0");
    const hours = timeStr.substring(0, 2);
    const minutes = timeStr.substring(2, 4);
    return `${hours}:${minutes}`;
  };

  const processAttendanceForCalendar = (classCode) => {
    if (!attendance?.attendance?.[classCode]) {
      return { present: [], absent: [], partial: [], dateGroups: {} };
    }

    const lectureData = attendance.attendance[classCode];
    const dateGroups = {};

    // Group lectures by date
    Object.entries(lectureData).forEach(([lectureKey, lectureInfo]) => {
      if (lectureInfo.date) {
        const date = parseDate(lectureInfo.date);
        const dateStr = date.toDateString();

        if (!dateGroups[dateStr]) {
          dateGroups[dateStr] = [];
        }

        dateGroups[dateStr].push({
          lectureKey,
          ...lectureInfo,
          time: formatTime(lectureInfo.time),
          parsedDate: date,
        });
      }
    });

    const present = [];
    const absent = [];
    const partial = [];

    Object.entries(dateGroups).forEach(([dateStr, lectures]) => {
      const date = new Date(dateStr);

      if (lectures.length === 1) {
        // Single lecture on this day
        if (lectures[0].present === 1) {
          present.push(date);
        } else {
          absent.push(date);
        }
      } else {
        // Multiple lectures on this day
        const presentCount = lectures.filter((l) => l.present === 1).length;
        const totalCount = lectures.length;

        if (presentCount === totalCount) {
          present.push(date);
        } else if (presentCount === 0) {
          absent.push(date);
        } else {
          partial.push(date);
        }
      }
    });

    return { present, absent, partial, dateGroups };
  };

  const handleViewCalendar = (classCode) => {
    const subjectName =
      timetable?.timetable?.classDetails?.[classCode]?.className || classCode;
    setSelectedSubject({ code: classCode, name: subjectName });

    const calendarInfo = processAttendanceForCalendar(classCode);
    setCalendarData(calendarInfo);
    setShowCalendar(true);
  };

  const handleDayClick = (date) => {
    if (!selectedSubject || !calendarData.dateGroups) return;

    const dateStr = date.toDateString();
    const dayLectures = calendarData.dateGroups[dateStr];

    if (dayLectures && dayLectures.length > 0) {
      setSelectedDate(date);
      setSelectedDayLectures(dayLectures);
      setShowLectureDetails(true);
    }
  };

  if (loading) return <p>Loading...</p>;

  const stats =
    attendance?.attendance && timetable?.timetable
      ? getTodayAttendanceStats(attendance.attendance, timetable.timetable)
      : null;

  const calculatePercentage = (attended, total) => {
    return total > 0 ? ((attended / total) * 100).toFixed(1) : 0;
  };

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

  const averagePercentage =
    stats && stats.length > 0 ? calculateAveragePercentage() : "N/A";

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="bg-blue-50 px-6 py-4 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800">Attendance</h2>
          <p className="text-gray-600 text-sm mt-1">Course Wise Attendance</p>
        </div>

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
              {stats === null ? (
                <tr>
                  <td colSpan="5" className="text-center text-gray-500 py-6">
                    Attendance record not found
                  </td>
                </tr>
              ) : (
                stats.map((subject, index) => {
                  const percentage = calculatePercentage(
                    subject.attendedLectures,
                    subject.totalLectures
                  );
                  const isLowAttendance = Number.parseFloat(percentage) < 75;

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
                })
              )}
            </tbody>
          </table>
        </div>

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
                  averagePercentage !== "N/A" &&
                  Number.parseFloat(averagePercentage) < 75
                    ? "bg-red-100 text-red-800 border-2 border-red-300"
                    : "bg-green-100 text-green-800 border-2 border-green-300"
                }`}
              >
                {averagePercentage !== "N/A" ? `${averagePercentage}%` : "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Dialog */}
      <Dialog open={showCalendar} onOpenChange={setShowCalendar}>
        <DialogContent className="w-fit max-w-[90vw]">
          <DialogHeader>
            <DialogTitle>
              Attendance Calendar - {selectedSubject?.name}
            </DialogTitle>
            <DialogDescription>
              <div className="space-y-2">
                <p>Click on any day to see lecture details.</p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span>Present</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    <span>Absent</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                    <span>Partial Attendance</span>
                  </div>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <Calendar
            present={calendarData.present}
            absent={calendarData.absent}
            partial={calendarData.partial}
            onDayClick={handleDayClick}
          />
          <DialogClose asChild>
            <button className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">
              Close
            </button>
          </DialogClose>
        </DialogContent>
      </Dialog>

      {/* Lecture Details Dialog */}
      <Dialog open={showLectureDetails} onOpenChange={setShowLectureDetails}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              Lecture Details - {selectedDate?.toLocaleDateString()}
            </DialogTitle>
            <DialogDescription>
              Individual lecture attendance for this day
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {selectedDayLectures.map((lecture, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border ${
                  lecture.present === 1
                    ? "bg-green-50 border-green-200"
                    : "bg-red-50 border-red-200"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-sm">{lecture.time}</p>
                    <p className="text-xs text-gray-600">
                      {lecture.lectureKey}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      lecture.present === 1
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {lecture.present === 1 ? "Present" : "Absent"}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <DialogClose asChild>
            <button className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 w-full">
              Close
            </button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default SubjectsPage;
