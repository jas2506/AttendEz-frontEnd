import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Keyboard, Calendar, Clock, User } from "lucide-react";
import FacultyHomepageComponent from "../../projectComponents/facultyComponents/FacultyHomepageComponent";

function FacultyHomepage() {
  const [currentDateStr, setCurrentDateStr] = useState("");

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

  const details = {
    name: "Dr.Sripranav",
    department: "EEE",
    position: "Assistant Professor",
  };

  const tt = {
    message: "Timetable refreshed successfully",
    timetable: {
      classDetails: {
        ELE2H22A: {
          facultyEmail: "saipranav2310324@ssn.edu.in",
          classCode: "ELE2H22A",
          passoutYear: "2027",
          credits: "4",
          className: "IMAGE ANALYSIS",
          facultyName: "Dr. Saipranav",
          department: "CSE",
          regNumbers: ["3122235001110", "3122235001087", "3122235001008"],
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
          regNumbers: [
            "3122235001110",
            "3122235001087",
            "3122225001002",
            "3122225001003",
            "3122235001004",
            "3122215001006",
            "3122215001007",
          ],
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
          regNumbers: [
            "3122235001110",
            "3122235001087",
            "3122225001002",
            "3122225001003",
            "3122235001004",
            "3122215001006",
            "3122215001007",
          ],
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
          regNumbers: [
            "3122235001110",
            "3122235001087",
            "3122225001002",
            "3122225001003",
            "3122235001004",
            "3122215001006",
            "3122215001007",
          ],
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
          regNumbers: [
            "3122235001110",
            "3122235001087",
            "3122225001002",
            "3122225001003",
            "3122235001004",
            "3122215001006",
            "3122215001007",
          ],
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
          regNumbers: [
            "3122235001110",
            "3122235001087",
            "3122225001002",
            "3122225001003",
            "3122235001004",
            "3122215001006",
            "3122215001007",
          ],
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
    },
    status: "S",
  };

  function getTodaySchedule(data) {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    // const today = days[new Date().getDay()];
    const today = "Monday";
    const timetableToday = data.timetable.timetable[today];
    const classDetails = data.timetable.classDetails;

    if (!timetableToday) return [];

    const result = timetableToday.map((entry) => {
      const detail = classDetails[entry.classCode];
      const groupCode = detail.groupCode;
      const match = groupCode.match(/^([A-Z]+)\d{4}([A-Z])$/);
      const section = match ? `${match[1]}-${match[2]}` : groupCode;
      const [hourStr, minuteStr] = entry.startTime.split(":");
      const hour = parseInt(hourStr, 10);
      const minute = parseInt(minuteStr, 10);

      return {
        className: detail.className,
        start: entry.startTime,
        startNumeric: hour * 60 + minute,
        duration: entry.durationMinutes,
        passoutYear: `UG-${detail.passoutYear}`,
        section,
      };
    });

    result.sort((a, b) => a.startNumeric - b.startNumeric);
    return result.map(({ startNumeric, ...rest }) => rest);
  }

  const todaySchedule = getTodaySchedule(tt);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-4">
        {/* Header Section */}
        <div className="bg-white border border-gray-200 shadow-lg rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="bg-white/10 p-3 rounded-xl">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">
                    Hello, {details.name} 👋
                  </p>
                  <p className="text-blue-100 mt-1">
                    {details.position} • {details.department} Department
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                <Calendar className="w-4 h-4 text-white" />
                <span className="text-white font-medium">{currentDateStr}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Substitution Code Section */}
        <div className="bg-white border border-gray-200 shadow-lg rounded-2xl p-4">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Substitution Code
            </h2>
            <p className="text-gray-600 text-sm">
              Enter Code for Substitution if any
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="relative flex-1 w-full">
              <Keyboard className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Enter Substitution Code"
                className="pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
              />
            </div>
            <button className="cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg w-full md:w-auto">
              Submit Code
            </button>
          </div>
        </div>

        {/* Today's Schedule Section */}
        <div className="bg-white border border-gray-200 shadow-lg rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Today's Schedule
                </h2>
                <p className="text-gray-600 text-sm">Your classes for today</p>
              </div>
            </div>
          </div>

          <div className="p-4">
            {todaySchedule.length === 0 ? (
              <div className="text-center py-12">
                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500 text-base font-medium">
                  No classes scheduled for today
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  Enjoy your free day!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {todaySchedule.map((course, index) => (
                  <FacultyHomepageComponent key={index} c={course} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FacultyHomepage;
