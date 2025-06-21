import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Keyboard } from "lucide-react";
import StudentHomepageSubject from "../projectComponents/studentHomepageSubject";

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
  const todayName = "Monday" ;
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

function HomepageStudent() {
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
    email: "saipranav2310324@ssn.edu.in",
    name: "Saipranav M",
    registerNumber: "3122235001110",
    department: "CSE",
    passout: "2027",
    course: "Computer Science and Engineering",
    degree: "B.E",
    digitalid: "2310324",
    registeredClasses: ["CSE3H15C"],
  };

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

  return (
    <>
      <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-100 shadow-sm p-6 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <p className="text-2xl font-bold text-blue-700">Hello, {details.name} 👋</p>
          <p className="text-sm text-gray-600 mt-1">Here are your classes for today</p>
        </div>
        <div className="text-sm text-gray-500 mt-4 md:mt-0">{currentDateStr}</div>
      </div>

      {/* Input Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col md:flex-row items-center gap-4">
        <div className="relative w-full">
          <Keyboard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Enter Class Code"
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition duration-200 w-full md:w-auto">
          Submit
        </button>
      </div>

      {/* Attendance Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        {stats.length === 0 ? (
          <p className="text-center text-gray-500 text-sm">No classes for today</p>
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
