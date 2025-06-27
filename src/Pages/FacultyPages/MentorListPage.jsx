import { useState } from "react";
import {
  User,
  Contact,
  Presentation,
  Calendar,
  Clock,
  ArrowLeft,
  GraduationCap,
} from "lucide-react";

// Sample API data
const apiValue = {
  details: {
    3122235001110: {
      name: "Saipranav M",
      attendance: {
        ELE2H22A: {
          "lecture.1": { date: 20250616, time: 222843, present: 1 },
          "lecture.2": { date: 20250616, time: 224223, present: 0 },
          "lecture.3": { date: 20250616, time: 224313, present: 1 },
          "lecture.4": { date: 20250616, time: 234617, present: 1 },
          "lecture.5": { date: 20250616, time: 234729, present: 1 },
          "lecture.6": { date: 20250617, time: 151, present: 1 },
          "lecture.7": { date: 20250617, time: 646, present: 0 },
          "lecture.8": { date: 20250617, time: 1212, present: 1 },
          "lecture.9": { date: 20250617, time: 1415, present: 1 },
          "lecture.10": { date: 20250617, time: 2318, present: 1 },
          "lecture.11": { date: 20250617, time: 1401, present: 0 },
          "lecture.12": { date: 20250617, time: 1402, present: 1 },
          "lecture.13": { date: 20250617, time: 1409, present: 0 },
          "lecture.14": { date: 20250617, time: 1410, present: 0 },
          "lecture.15": { date: 20250617, time: 1410, present: 0 },
          "lecture.16": { date: 20250617, time: 1416, present: 0 },
          "lecture.17": { date: 20250617, time: 1417, present: 1 },
          "lecture.18": { date: 20250618, time: 1839, present: 1 },
        },
        CSE2701B: {
          "lecture.1": { date: 20250617, time: 34, present: 1 },
          "lecture.2": { date: 20250617, time: 36, present: 1 },
          "lecture.3": { date: 20250617, time: 1110, present: 1 },
          "lecture.4": { date: 20250617, time: 1111, present: 1 },
          "lecture.5": { date: 20250617, time: 1112, present: 1 },
          "lecture.6": { date: 20250617, time: 1256, present: 1 },
          "lecture.7": { date: 20250617, time: 1300, present: 1 },
          "lecture.8": { date: 20250617, time: 1304, present: 1 },
          "lecture.9": { date: 20250618, time: 1904, present: 1 },
        },
      },
    },
    3122235001087: {
      name: "Murari Sreekumar",
      attendance: {
        ELE2H22A: {
          "lecture.1": { date: 20250616, time: 222843, present: 0 },
          "lecture.2": { date: 20250616, time: 224223, present: 0 },
          "lecture.3": { date: 20250616, time: 224313, present: 0 },
          "lecture.4": { date: 20250616, time: 234617, present: 1 },
          "lecture.5": { date: 20250616, time: 234729, present: 0 },
          "lecture.6": { date: 20250617, time: 151, present: 0 },
          "lecture.7": { date: 20250617, time: 646, present: 0 },
          "lecture.8": { date: 20250617, time: 1212, present: 0 },
          "lecture.9": { date: 20250617, time: 1415, present: 0 },
          "lecture.10": { date: 20250617, time: 2318, present: 0 },
          "lecture.11": { date: 20250617, time: 1401, present: 0 },
          "lecture.12": { date: 20250617, time: 1402, present: 0 },
          "lecture.13": { date: 20250617, time: 1409, present: 0 },
          "lecture.14": { date: 20250617, time: 1410, present: 0 },
          "lecture.15": { date: 20250617, time: 1410, present: 1 },
          "lecture.16": { date: 20250617, time: 1416, present: 1 },
          "lecture.17": { date: 20250617, time: 1417, present: 0 },
          "lecture.18": { date: 20250618, time: 1839, present: 1 },
        },
        CSE2701B: {
          "lecture.1": { date: 20250617, time: 34, present: 0 },
          "lecture.2": { date: 20250617, time: 36, present: 0 },
          "lecture.3": { date: 20250617, time: 1110, present: 0 },
          "lecture.4": { date: 20250617, time: 1111, present: 0 },
          "lecture.5": { date: 20250617, time: 1112, present: 0 },
          "lecture.6": { date: 20250617, time: 1256, present: 1 },
          "lecture.7": { date: 20250617, time: 1300, present: 1 },
          "lecture.8": { date: 20250617, time: 1304, present: 0 },
          "lecture.9": { date: 20250618, time: 1904, present: 1 },
        },
      },
    },
  },
  message: "Mentees attendance retrieved successfully",
  status: "S",
};

const facultyDetails = {
  _id: "68579753a03a9f34b7ab7691",
  department: "EEE",
  faculty_email: "sripranv@gmail.com",
  position: "Assistant Professor",
  name: "Dr. Sripranav",
  mentor: true,
  class_advisor: true,
};

// Utility function to calculate student summaries
function getStudentSummaries(apiData) {
  const studentSummaries = [];
  const students = apiData.details;

  for (const [regNo, studentData] of Object.entries(students)) {
    const { name, attendance } = studentData;
    let totalLectures = 0;
    let totalPresent = 0;

    for (const subject of Object.values(attendance)) {
      for (const lecture of Object.values(subject)) {
        totalLectures++;
        if (lecture.present === 1) {
          totalPresent++;
        }
      }
    }

    const percentage =
      totalLectures > 0
        ? ((totalPresent / totalLectures) * 100).toFixed(1)
        : "0.0";

    studentSummaries.push({
      name,
      regNo,
      percentage: parseFloat(percentage),
    });
  }

  return studentSummaries;
}

// Student Card Component
function StudentCard({ student, apiValue, onViewDetails }) {
  const [showDetails, setShowDetails] = useState(false);

  // Get detailed attendance data for a specific student
  function getStudentDetailedData(regNumber, apiData) {
    const studentData = apiData.details[regNumber];
    if (!studentData) return null;

    const courses = [];
    let totalAttended = 0;
    let totalClasses = 0;

    for (const subject in studentData.attendance) {
      const lectures = studentData.attendance[subject];
      const subjectTotal = Object.keys(lectures).length;
      const subjectAttended = Object.values(lectures).filter(
        (lec) => lec.present === 1
      ).length;

      totalAttended += subjectAttended;
      totalClasses += subjectTotal;

      courses.push({
        name: subject,
        attended: subjectAttended,
        total: subjectTotal,
        percentage: ((subjectAttended / subjectTotal) * 100).toFixed(1),
      });
    }

    return {
      ...studentData,
      regNumber,
      courses,
      totalAttended,
      totalClasses,
      overallPercentage: ((totalAttended / totalClasses) * 100).toFixed(1),
    };
  }

  const getBadgeColor = (percentage) => {
    if (percentage >= 75) return "bg-green-500";
    if (percentage >= 70) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getTextColor = (percentage) => {
    if (percentage >= 75) return "text-green-700";
    if (percentage >= 70) return "text-yellow-700";
    return "text-red-700";
  };

  const studentDetailedData = showDetails
    ? getStudentDetailedData(student.regNo, apiValue)
    : null;

  if (showDetails && studentDetailedData) {
    return (
      <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 transition-all duration-300">
        <div className="space-y-6">
          {/* Header with student info */}
          <div className="flex items-start gap-4 pb-4 border-b">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
              {studentDetailedData.name.charAt(0)}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {studentDetailedData.name}
              </h2>
              <div className="grid grid-cols-1 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-600" />
                  <span className="text-gray-600">Register No:</span>
                  <span className="font-semibold">
                    {studentDetailedData.regNumber}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">Digital ID:</span>
                  <span className="font-semibold">
                    {studentDetailedData.regNumber}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Course-wise attendance table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                  <th className="p-3 text-left border border-gray-300">
                    Course
                  </th>
                  <th className="p-3 text-center border border-gray-300">
                    Attended
                  </th>
                  <th className="p-3 text-center border border-gray-300">
                    Total
                  </th>
                  <th className="p-3 text-center border border-gray-300">
                    Percentage
                  </th>
                </tr>
              </thead>
              <tbody>
                {studentDetailedData.courses.map((course, idx) => (
                  <tr
                    key={idx}
                    className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="p-3 border border-gray-300 font-medium">
                      {course.name}
                    </td>
                    <td className="p-3 text-center border border-gray-300 font-semibold text-blue-600">
                      {course.attended}
                    </td>
                    <td className="p-3 text-center border border-gray-300">
                      {course.total}
                    </td>
                    <td className="p-3 text-center border border-gray-300">
                      <span
                        className={`font-bold ${getTextColor(
                          parseFloat(course.percentage)
                        )}`}
                      >
                        {course.percentage}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Overall attendance */}
          <div className="flex justify-between items-center pt-4 border-t">
            <div className="flex items-center gap-3">
              <span className="text-lg font-semibold text-gray-700">
                Overall Attendance:
              </span>
              <div
                className={`${getBadgeColor(
                  student.percentage
                )} text-white font-bold px-4 py-2 rounded-full shadow-md`}
              >
                {student.percentage}%
              </div>
            </div>
            <button
              onClick={() => setShowDetails(false)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 text-gray-700 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to List
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
            {student.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg text-gray-800 truncate">
              {student.name}
            </h3>
            <p className="text-sm text-gray-600">Reg No: {student.regNo}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div
            className={`${getBadgeColor(
              student.percentage
            )} text-white font-bold px-4 py-2 rounded-full shadow-md min-w-[80px] text-center`}
          >
            {student.percentage}%
          </div>
          <button
            onClick={() => {
              setShowDetails(true);
              if (onViewDetails) onViewDetails();
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors duration-200 text-blue-700 font-medium"
          >
            <Contact className="w-4 h-4" />
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

// Main Component
function MentorListPage() {
  const studentSummaries = getStudentSummaries(apiValue);

  // Calculate overall statistics
  const totalStudents = studentSummaries.length;
  const averageAttendance =
    totalStudents > 0
      ? (
          studentSummaries.reduce(
            (sum, student) => sum + student.percentage,
            0
          ) / totalStudents
        ).toFixed(1)
      : 0;
  const studentsAbove75 = studentSummaries.filter(
    (student) => student.percentage >= 75
  ).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
          <div className="bg-white border border-gray-200 shadow-lg rounded-2xl overflow-hidden mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
              <div className="flex items-center gap-4">
                <div className="bg-white/10 p-3 rounded-xl">
                  <span className="text-2xl text-white">
                    <Presentation></Presentation>
                  </span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">Mentor View</p>
                  <p className="text-blue-100 text-sm mt-1">List of Mentees</p>
                </div>
              </div>
            </div>
          </div>

          

        {/* Student Cards */}
        <div className="space-y-4">
          {studentSummaries.length > 0 ? (
            studentSummaries.map((student, index) => (
              <StudentCard
                key={student.regNo}
                student={student}
                apiValue={apiValue}
                onViewDetails={() =>
                  console.log("Viewing details for:", student.regNo)
                }
              />
            ))
          ) : (
            <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center">
              <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No Students Found
              </h3>
              <p className="text-gray-500">
                No mentees are currently assigned to you.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MentorListPage;
