import GPAcalccurrent from "../projectComponents/GPAcalccurrent";
import { useState, useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function CurrentGPAPage() {
  const [grades, setGrades] = useState({});
  const [gpa, setGpa] = useState();

  function getGrade(g, subject) {
    setGrades((prev) => ({ ...prev, [subject]: g }));
  }

  function extractUniqueClasses(timetable) {
    const seen = new Set();
    const result = [];

    const allDays = timetable.timetable;

    for (const day in allDays) {
      for (const session of allDays[day]) {
        const classCode = session.classCode;

        if (!seen.has(classCode)) {
          seen.add(classCode);

          const classDetail = timetable.classDetails[classCode];
          if (classDetail) {
            result.push({
              classCode,
              className: classDetail.className,
              credits: Number(classDetail.credits), // ensure numeric
            });
          }
        }
      }
    }

    return result;
  }

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

  const classes = extractUniqueClasses(timetable);

  function gpacalc(grades, classes) {
    const gradeToPoint = {
      O: 10,
      "A+": 9,
      A: 8,
      "B+": 7,
      B: 6,
      C: 5,
      F: 0,
    };

    let totalPoints = 0;
    let totalCredits = 0;

    for (const cls of classes) {
      const subject = cls.className;
      const grade = grades[subject];

      if (grade && gradeToPoint.hasOwnProperty(grade)) {
        const points = gradeToPoint[grade];
        const credits = cls.credits;

        totalPoints += points * credits;
        totalCredits += credits;
      }
    }

    if (totalCredits === 0) return 0;

    const p = (totalPoints / totalCredits).toFixed(2);
    setGpa(p);
  }

  return (
    <>
      {/* Header Section */}
      <div className="bg-white p-6 rounded-xl flex flex-col items-center justify-center text-center">
        <div>
          <p className="text-2xl font-bold text-blue-700">GPA Calculator</p>
          <p className="text-sm text-gray-600 mt-1">
            Enter details in fields to estimate your GPA for the current
            semester
          </p>
        </div>
      </div>

      {classes.map((perclass) => {
        return (
          <div key={perclass.classCode}>
            <GPAcalccurrent
              subject={perclass.className}
              credits={perclass.credits}
              passingfunc={getGrade}
            ></GPAcalccurrent>
          </div>
        );
      })}

<div className="flex justify-center">
        <Popover>
          <PopoverTrigger
            onClick={() => gpacalc(grades, classes)}
            className="cursor-pointer mb-20 bg-blue-50 text-blue-700 border border-transparent hover:border-blue-600 hover:bg-blue-100 font-semibold px-6 py-3 rounded-lg transition-all duration-200 shadow-sm"
          >
            Calculate GPA
          </PopoverTrigger>

          <PopoverContent className="text-sm font-medium shadow-2xl text-gray-700">
            {gpa ? <p>Your estimated Gpa is <span className="text-cyan-500">{gpa}</span></p>  : "No data yet."}
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}

export default CurrentGPAPage;
