import React from "react";
import { fetchTimetable } from "../Api";
import { useState, useEffect } from "react";

function TimetablePage() {
  const [timetableData, setTimetableData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const t = (await fetchTimetable()).timetable;
        setTimetableData(t);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="bg-white p-6 rounded-xl flex flex-col items-center justify-center text-center">
        <div>
          <p className="text-2xl font-bold text-blue-700">Timetable</p>
          <p className="text-sm text-gray-600 mt-1">Weekly Class Schedule</p>
        </div>
      </div>
      <LandscapeTimetable timetable={timetableData} />
    </div>
  );
}

function calculateEndTime(startTime, durationMinutes) {
  const [hours, minutes] = startTime.split(":").map(Number);
  const startDate = new Date(0, 0, 0, hours, minutes);
  const endDate = new Date(startDate.getTime() + durationMinutes * 60000);
  return `${String(endDate.getHours()).padStart(2, "0")}:${String(
    endDate.getMinutes()
  ).padStart(2, "0")}`;
}

function LandscapeTimetable({ timetable }) {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const allSlots = [];

  // collect all unique time slots across all days
  for (let day of days) {
    const classes = timetable.timetable[day] || [];
    for (let cls of classes) {
      const key = cls.startTime;
      if (!allSlots.includes(key)) allSlots.push(key);
    }
  }

  allSlots.sort(); // sorted start times

  return (
    <div className="overflow-x-auto">
      <table className="table-auto border-collapse border w-full text-sm">
        <thead>
          <tr className="bg-blue-50 text-blue-800">
            <th className="border px-4 py-2 text-left">Time</th>
            {days.map((day) => (
              <th key={day} className="border px-4 py-2">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {allSlots.map((slotTime, index) => (
            <tr key={slotTime} className="even:bg-gray-50">
              <td className="border px-4 py-2 font-medium text-blue-700">
                {index + 1}
              </td>
              {days.map((day) => {
                const cls =
                  timetable.timetable[day]?.find(
                    (c) => c.startTime === slotTime
                  ) || null;
                if (!cls) return <td key={day} className="border px-4 py-2" />;
                const classInfo = timetable.classDetails[cls.classCode];
                const endTime = calculateEndTime(
                  cls.startTime,
                  cls.durationMinutes
                );

                return (
                  <td key={day} className="border px-4 py-2">
                    <div className="bg-blue-50 border border-blue-200 p-2 rounded-md shadow-sm">
                      <p className="text-xs text-gray-600">
                        {cls.startTime} - {endTime}
                      </p>
                      <p className="font-semibold text-blue-800 text-sm">
                        {classInfo?.className || "Unknown"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {classInfo?.facultyName}
                      </p>
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TimetablePage;
