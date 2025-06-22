import React from "react";

function TimetablePage() {
  const timetableData = {
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
        { classCode: "CSE2701B", startTime: "09:00", durationMinutes: 50 },
        { classCode: "CSE2702B", startTime: "10:00", durationMinutes: 50 },
        { classCode: "CSE2703B", startTime: "11:00", durationMinutes: 50 },
        { classCode: "CSE2704B", startTime: "12:00", durationMinutes: 50 },
        { classCode: "ELE2H22A", startTime: "14:00", durationMinutes: 100 },
      ],
      Tuesday: [
        { classCode: "CSE2705B", startTime: "09:00", durationMinutes: 50 },
        { classCode: "CSE2701B", startTime: "10:00", durationMinutes: 50 },
        { classCode: "CSE2702B", startTime: "11:00", durationMinutes: 50 },
        { classCode: "CSE2703B", startTime: "12:00", durationMinutes: 50 },
        { classCode: "ELE2H22A", startTime: "14:00", durationMinutes: 50 },
      ],
      Wednesday: [
        { classCode: "CSE2704B", startTime: "09:00", durationMinutes: 50 },
        { classCode: "CSE2705B", startTime: "10:00", durationMinutes: 50 },
        { classCode: "CSE2701B", startTime: "11:00", durationMinutes: 50 },
        { classCode: "CSE2702B", startTime: "12:00", durationMinutes: 50 },
        { classCode: "ELE2H22A", startTime: "14:00", durationMinutes: 100 },
      ],
      Thursday: [
        { classCode: "CSE2703B", startTime: "09:00", durationMinutes: 50 },
        { classCode: "CSE2704B", startTime: "10:00", durationMinutes: 50 },
        { classCode: "CSE2705B", startTime: "11:00", durationMinutes: 50 },
        { classCode: "CSE2701B", startTime: "12:00", durationMinutes: 50 },
        { classCode: "ELE2H22A", startTime: "14:00", durationMinutes: 50 },
      ],
      Friday: [
        { classCode: "CSE2702B", startTime: "09:00", durationMinutes: 50 },
        { classCode: "CSE2703B", startTime: "10:00", durationMinutes: 50 },
        { classCode: "CSE2704B", startTime: "11:00", durationMinutes: 50 },
        { classCode: "CSE2705B", startTime: "12:00", durationMinutes: 50 },
        { classCode: "ELE2H22A", startTime: "14:00", durationMinutes: 100 },
      ],
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-3xl font-bold text-center text-blue-800 my-8">
        Class Schedule
      </h1>
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
          <tr className="bg-blue-100 text-blue-800">
            <th className="border px-4 py-2 text-left">Time</th>
            {days.map((day) => (
              <th key={day} className="border px-4 py-2">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {allSlots.map((slotTime) => (
            <tr key={slotTime} className="even:bg-gray-50">
              <td className="border px-4 py-2 font-medium text-blue-700">
                {slotTime}
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
