import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const timeSlots = [
  "08:00 - 08:45 AM",
  "08:45 - 09:30 AM",
  "09:30 - 09:50 AM",
  "09:50 - 10:35 AM",
  "10:35 - 11:20 AM",
  "11:20 - 12:05 PM",
  "12:05 - 01:05 PM",
  "01:05 - 01:50 PM",
  "01:50 - 02:10 PM",
  "02:10 - 02:55 PM",
  "02:55 - 03:40 PM",
];

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

// Dummy subjects to display
const subjectMap = {
  "Monday-08:00 - 08:45 AM": "Math",
  "Monday-08:45 - 09:30 AM": "Indian Constitution",
  "Monday-09:30 - 09:50 AM": "Break",
  "Monday-09:50 - 10:35 AM": "Design and Analysis of Algorithm",
  "Monday-10:35 - 11:20 AM": "Database Management Systems",
  "Monday-11:20 - 12:05 PM": "Probability and Statistics",
  "Monday-12:05 - 01:05 PM": "Lunch",
  "Monday-01:05 - 01:50 PM": "History",
  "Monday-01:50 - 02:10 PM": "Break",
  "Monday-02:10 - 02:55 PM": "OS",
  "Monday-02:55 - 03:40 PM": "Computer Organization and Architecture",

  "Tuesday-08:00 - 08:45 AM": "Design and Analysis of Algorithm",
  "Tuesday-08:45 - 09:30 AM": "Math",
  "Tuesday-09:30 - 09:50 AM": "Break",
  "Tuesday-09:50 - 10:35 AM": "Indian Constitution",
  "Tuesday-10:35 - 11:20 AM": "History",
  "Tuesday-11:20 - 12:05 PM": "Database Management Systems",
  "Tuesday-12:05 - 01:05 PM": "Lunch",
  "Tuesday-01:05 - 01:50 PM": "Computer Organization and Architecture",
  "Tuesday-01:50 - 02:10 PM": "Break",
  "Tuesday-02:10 - 02:55 PM": "Probability and Statistics",
  "Tuesday-02:55 - 03:40 PM": "OS",

  "Wednesday-08:00 - 08:45 AM": "Indian Constitution",
  "Wednesday-08:45 - 09:30 AM": "Math",
  "Wednesday-09:30 - 09:50 AM": "Break",
  "Wednesday-09:50 - 10:35 AM": "Computer Organization and Architecture",
  "Wednesday-10:35 - 11:20 AM": "CS",
  "Wednesday-11:20 - 12:05 PM": "Design and Analysis of Algorithm",
  "Wednesday-12:05 - 01:05 PM": "Lunch",
  "Wednesday-01:05 - 01:50 PM": "Probability and Statistics",
  "Wednesday-01:50 - 02:10 PM": "Break",
  "Wednesday-02:10 - 02:55 PM": "Database Management Systems",
  "Wednesday-02:55 - 03:40 PM": "History",

  "Thursday-08:00 - 08:45 AM": "OS",
  "Thursday-08:45 - 09:30 AM": "Math",
  "Thursday-09:30 - 09:50 AM": "Break",
  "Thursday-09:50 - 10:35 AM": "Indian Constitution",
  "Thursday-10:35 - 11:20 AM": "Design and Analysis of Algorithm",
  "Thursday-11:20 - 12:05 PM": "Database Management Systems",
  "Thursday-12:05 - 01:05 PM": "Lunch",
  "Thursday-01:05 - 01:50 PM": "Computer Organization and Architecture",
  "Thursday-01:50 - 02:10 PM": "Break",
  "Thursday-02:10 - 02:55 PM": "Probability and Statistics",
  "Thursday-02:55 - 03:40 PM": "History",

  "Friday-08:00 - 08:45 AM": "Indian Constitution",
  "Friday-08:45 - 09:30 AM": "Math",
  "Friday-09:30 - 09:50 AM": "Break",
  "Friday-09:50 - 10:35 AM": "Computer Organization and Architecture",
  "Friday-10:35 - 11:20 AM": "Database Management Systems",
  "Friday-11:20 - 12:05 PM": "Design and Analysis of Algorithm",
  "Friday-12:05 - 01:05 PM": "Lunch",
  "Friday-01:05 - 01:50 PM": "Database Management Systems",
  "Friday-01:50 - 02:10 PM": "Break",
  "Friday-02:10 - 02:55 PM": "Probability and Statistics",
  "Friday-02:55 - 03:40 PM": "OS",
};

const Timetable = () => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-md border w-full max-w-7xl mx-auto overflow-x-auto">
      <div className="grid grid-cols-[180px_repeat(5,1fr)] gap-3 items-start">
        {/* Header */}
        <div className="font-semibold text-base text-gray-700">Time</div>
        {days.map((day) => (
          <div
            key={day}
            className="font-semibold text-base text-center text-gray-700"
          >
            {day}
          </div>
        ))}

        {/* Rows */}
        {timeSlots.map((slot) => {
          const isBreak = slot === "09:30 - 09:50 AM";
          const isLunch = slot === "12:05 - 01:05 PM";
          const isBreak2 = slot === "01:50 - 02:10 PM";

          if (isBreak || isLunch || isBreak2) {
            return (
              <React.Fragment key={slot}>
                <div className="col-span-6 bg-slate-800 text-white text-center py-2 font-bold rounded-md">
                  BREAK
                </div>
              </React.Fragment>
            );
          }

          return (
            <React.Fragment key={slot}>
              {/* Time Column */}
              <div className="text-sm text-gray-600 font-medium py-2">
                {slot}
              </div>

              {/* Subject Cells */}
              {days.map((day) => {
                const key = `${day}-${slot}`;
                const subject = subjectMap[key] || "";

                return (
                  <Card key={key} className="h-12 rounded-full border">
                    <CardContent className="flex justify-center items-center h-full text-sm text-gray-800 font-medium">
                      {subject}
                    </CardContent>
                  </Card>
                );
              })}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Timetable;
