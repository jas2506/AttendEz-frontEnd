import React from "react";
import { Table,User } from 'lucide-react';


function FacultyTimetablePage() {
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

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="bg-white border border-gray-200 shadow-lg rounded-2xl overflow-hidden mb-6">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/10 p-3 rounded-xl">
              <span className="text-2xl text-white"><Table></Table></span>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">Timetable</p>
              <p className="text-blue-100 text-sm mt-1">
                Weekly teaching schedule
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Faculty Info Card */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <span className="text-blue-600 font-bold text-lg">
              <User></User>
            </span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {tt.timetable.classDetails.ELE2H22A.facultyName}
            </h2>
            <p className="text-gray-600">
              {tt.timetable.classDetails.ELE2H22A.department} Department
            </p>
            <p className="text-sm text-gray-500">
              {tt.timetable.classDetails.ELE2H22A.facultyEmail}
            </p>
          </div>
        </div>
      </div>

      <LandscapeTimetable timetableData={tt.timetable} />
    </div>
  );
}

function calculateEndTime(startTime, durationMinutes) {
  const [hours, minutes] = startTime.split(":").map(Number);
  const start = new Date(0, 0, 0, hours, minutes);
  const end = new Date(start.getTime() + durationMinutes * 60000);
  return `${String(end.getHours()).padStart(2, "0")}:${String(
    end.getMinutes()
  ).padStart(2, "0")}`;
}

function LandscapeTimetable({ timetableData }) {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const timeSlots = [];

  // Collect all unique start times across all days
  days.forEach((day) => {
    const daySchedule = timetableData.timetable?.[day] || [];
    daySchedule.forEach((cls) => {
      if (!timeSlots.includes(cls.startTime)) {
        timeSlots.push(cls.startTime);
      }
    });
  });

  // Sort time slots chronologically
  timeSlots.sort((a, b) => {
    const [aHours, aMinutes] = a.split(":").map(Number);
    const [bHours, bMinutes] = b.split(":").map(Number);
    return aHours * 60 + aMinutes - (bHours * 60 + bMinutes);
  });

  if (timeSlots.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
        <p className="text-gray-600">No classes scheduled for this week.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r">
                Period
              </th>
              {days.map((day) => (
                <th
                  key={day}
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r last:border-r-0"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {timeSlots.map((timeSlot, index) => (
              <tr
                key={timeSlot}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                  <div className="text-center">
                    <span className="text-blue-600 font-semibold text-lg">
                      {index + 1}
                    </span>
                  </div>
                </td>
                {days.map((day) => {
                  const daySchedule = timetableData.timetable?.[day] || [];
                  const classAtTime = daySchedule.find(
                    (cls) => cls.startTime === timeSlot
                  );

                  if (!classAtTime) {
                    return (
                      <td
                        key={day}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-r last:border-r-0"
                      >
                        <div className="text-center text-gray-400">-</div>
                      </td>
                    );
                  }

                  const classDetails =
                    timetableData.classDetails?.[classAtTime.classCode];

                  if (!classDetails) {
                    return (
                      <td
                        key={day}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-r last:border-r-0"
                      >
                        <div className="text-center text-red-500">
                          Error: Class not found
                        </div>
                      </td>
                    );
                  }

                  const endTime = calculateEndTime(
                    classAtTime.startTime,
                    classAtTime.durationMinutes
                  );

                  // Determine section
                  const section = classDetails.groupCode.includes("ELE")
                    ? "ELECTIVE"
                    : (() => {
                        const match = classDetails.groupCode.match(
                          /^([A-Z]+)\d{4}([A-Z])$/
                        );
                        return match
                          ? `${match[1]}-${match[2]}`
                          : classDetails.groupCode;
                      })();

                  return (
                    <td
                      key={day}
                      className="px-6 py-4 whitespace-nowrap text-sm border-r last:border-r-0"
                    >
                      <div className="bg-blue-50 border border-blue-200 p-3 rounded-md shadow-sm">
                        <div className="text-xs text-gray-600 mb-1">
                          {classAtTime.startTime} - {endTime}
                        </div>
                        <div className="font-semibold text-blue-800 text-sm mb-1">
                          {classDetails.className}
                        </div>
                        <div className="text-xs text-gray-600 mb-1">
                          {section}
                        </div>
                        <div className="text-xs text-gray-500">
                          {classAtTime.durationMinutes} min •{" "}
                          {classDetails.credits} credits
                        </div>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FacultyTimetablePage;
