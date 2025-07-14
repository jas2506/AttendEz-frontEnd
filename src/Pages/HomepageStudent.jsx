import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Keyboard, X, CheckCircle, AlertCircle } from "lucide-react";
import StudentHomepageSubject from "../projectComponents/StudentHomepageSubject";
import {
  fetchDetails,
  sendPasscode,
  fetchAttendance,
  fetchTimetable,
} from "../Api";

//set day properly for testing
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

  // const todayName = "Monday"; // for testing
  const todayName = weekdays[new Date().getDay()];

  const todayClasses = timetable.timetable[todayName] || [];

  const stats = todayClasses.map((cls) => {
    const code = cls.classCode;
    const [startHourStr, startMinStr] = cls.startTime.split(":");
    const startHour = parseInt(startHourStr, 10);
    const startMinute = parseInt(startMinStr, 10);
    const duration = cls.durationMinutes;

    const startDate = new Date(0, 0, 0, startHour, startMinute);
    const endDate = new Date(startDate.getTime() + duration * 60000);
    const endTime = {
      hour: endDate.getHours(),
      minute: endDate.getMinutes(),
    };

    let total = 0,
      attended = 0;
    const attendanceRecords = attendance[code];
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
      startTime: { hour: startHour, minute: startMinute },
      endTime,
      totalLectures: total,
      attendedLectures: attended,
    };
  });

  // 🔧 Sort by start time (hour + minute)
  return stats.sort((a, b) => {
    if (a.startTime.hour !== b.startTime.hour) {
      return a.startTime.hour - b.startTime.hour;
    }
    return a.startTime.minute - b.startTime.minute;
  });
}

function HomepageStudent() {
  const [currentDateStr, setCurrentDateStr] = useState("");
  const [details, setDetails] = useState(null);
  const [attendance, setAttendance] = useState(null);
  const [timetable, setTimetable] = useState(null);
  const [loading, setLoading] = useState(true);

  const [attendanceError, setAttendanceError] = useState(false);

  const [classCode, setClassCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [popup, setPopup] = useState(null);

  useEffect(() => {
    if (popup) {
      const timer = setTimeout(() => {
        setPopup(null);
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [popup]);

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
        const [detailsData, attendanceData, timetableData] = await Promise.all([
          fetchDetails(),
          fetchAttendance(),
          fetchTimetable(),
        ]);

        setDetails(detailsData);
        setTimetable(timetableData);

        setAttendance(attendanceData);
        setAttendanceError(false);
      } catch (error) {
        console.error("Error fetching data:", error);

        if (
          error.response?.data?.status === "E" &&
          error.response?.data?.attendance === null
        ) {
          setAttendanceError(true);
          setAttendance(null);
        } else {
          // fallback for other errors
          setAttendanceError(true);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  const stats =
    attendance?.attendance && timetable?.timetable
      ? getTodayAttendanceStats(attendance.attendance, timetable.timetable)
      : null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!classCode.trim()) {
      setPopup({
        message: "Please enter a class code",
        type: "error",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await sendPasscode(classCode);

      setPopup({
        message: response.message,
        type: response.status === "S" ? "success" : "error",
      });

      if (response.status === "S") {
        setClassCode("");
      }
    } catch (error) {
      let message = "An error occurred. Please try again.";

      if (error.response) {
        if (error.response.status === 404) {
          message = "Invalid passcode. Please check and try again.";
        } else if (error.response.status === 500) {
          message = "Please try again.";
        }
      }

      setPopup({
        message,
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const closePopup = () => {
    setPopup(null);
  };

  return (
    <>
      <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        {/* Header Section */}
        <div className="bg-white border-b border-gray-100 shadow-sm p-6 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <p className="text-2xl font-bold text-blue-700">
              Hello, {details.details.name} 👋
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Here are your classes for today
            </p>
          </div>
          <div className="text-sm text-gray-500 mt-4 md:mt-0">
            {currentDateStr}
          </div>
        </div>

        {/* Input Section */}
        <div className="max-w-7xl mx-auto p-6">
          <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col md:flex-row items-center gap-4">
            <div className="relative w-full">
              <Keyboard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Enter Class Code (e.g., nzlah0~CSE2701B)"
                value={classCode}
                onChange={(e) => {
                  let value = e.target.value.replace(/[^a-zA-Z0-9]/g, ""); // Remove non-alphanumerics

                  if (value.length > 6) {
                    value = value.slice(0, 6) + "~" + value.slice(6, 26); // 6 before, 20 after
                  }

                  setClassCode(value);
                }}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isSubmitting}
                maxLength={27}
              />
            </div>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium px-4 py-2 rounded-lg transition duration-200 w-full md:w-auto min-w-[100px]"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                </div>
              ) : (
                "Submit"
              )}
            </button>
          </div>

          {/* Popup */}
          {popup && (
            <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 toast-slide-in">
              <div
                className={`border-l-4 p-4 rounded-md shadow-md bg-white w-80 transition-opacity duration-500 ${
                  popup.type === "success"
                    ? "border-green-500"
                    : "border-red-500"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex gap-3">
                    {popup.type === "success" ? (
                      <CheckCircle className="text-green-600 w-5 h-5 mt-0.5" />
                    ) : (
                      <AlertCircle className="text-red-600 w-5 h-5 mt-0.5" />
                    )}
                    <div>
                      <h3
                        className={`font-semibold ${
                          popup.type === "success"
                            ? "text-green-700"
                            : "text-red-700"
                        }`}
                      >
                        {popup.type === "success" ? "Success" : "Error"}
                      </h3>
                      <p className="text-sm text-gray-700">{popup.message}</p>
                    </div>
                  </div>
                  <button
                    onClick={closePopup}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Attendance Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          {attendanceError ? (
            <p className="text-center text-red-500 text-sm py-6">
              Attendance Records not found
            </p>
          ) : stats === null ? (
            <p className="text-center text-gray-500 text-sm">
              Attendance record not updated
            </p>
          ) : stats.length === 0 ? (
            <p className="text-center text-gray-500 text-sm">
              No classes for today
            </p>
          ) : (
            <div className="space-y-4">
              {stats.map((course) => (
                <StudentHomepageSubject
                  key={course.classCode}
                  classname={course.className}
                  start={course.startTime}
                  end={course.endTime}
                  n={course.attendedLectures}
                  t={course.totalLectures}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default HomepageStudent;
