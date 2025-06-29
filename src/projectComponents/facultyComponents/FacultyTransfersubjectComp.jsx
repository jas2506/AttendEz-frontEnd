import {
  BookOpen,
  Users,
  Trash2,
  Calendar,
  UserCheck,
  Eye,
  BarChart3,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

function viewStudents(classcode) {
  const sample = {
    details: {
      3122235001110: {
        name: "SaipranavM",
        attendance: {
          ELE2H22A: {
            "lecture.1": {
              date: 20250616,
              time: 222843,
              present: 0,
            },
            "lecture.2": {
              date: 20250616,
              time: 224223,
              present: 1,
            },
            "lecture.3": {
              date: 20250616,
              time: 224313,
              present: 1,
            },
            "lecture.4": {
              date: 20250616,
              time: 234617,
              present: 1,
            },
            "lecture.5": {
              date: 20250616,
              time: 234729,
              present: 1,
            },
            "lecture.6": {
              date: 20250617,
              time: 151,
              present: 1,
            },
            "lecture.7": {
              date: 20250617,
              time: 646,
              present: 0,
            },
            "lecture.8": {
              date: 20250617,
              time: 1212,
              present: 1,
            },
            "lecture.9": {
              date: 20250617,
              time: 1415,
              present: 1,
            },
            "lecture.10": {
              date: 20250617,
              time: 2318,
              present: 1,
            },
            "lecture.11": {
              date: 20250617,
              time: 1401,
              present: 0,
            },
            "lecture.12": {
              date: 20250617,
              time: 1402,
              present: 1,
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
              present: 0,
            },
            "lecture.16": {
              date: 20250617,
              time: 1416,
              present: 0,
            },
            "lecture.17": {
              date: 20250617,
              time: 1417,
              present: 1,
            },
          },
        },
      },
      3122235001087: {
        name: "Murari Sreekumar",
        attendance: {
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
          },
        },
      },
      3122235001008: {
        name: "Student Five",
        attendance: {
          ELE2H22A: {
            "lecture.1": {
              date: 20250616,
              time: 222843,
              present: null,
            },
            "lecture.2": {
              date: 20250616,
              time: 224223,
              present: null,
            },
            "lecture.3": {
              date: 20250616,
              time: 224313,
              present: null,
            },
            "lecture.4": {
              date: 20250616,
              time: 234617,
              present: null,
            },
            "lecture.5": {
              date: 20250616,
              time: 234729,
              present: null,
            },
            "lecture.6": {
              date: 20250617,
              time: 151,
              present: null,
            },
            "lecture.7": {
              date: 20250617,
              time: 646,
              present: null,
            },
            "lecture.8": {
              date: 20250617,
              time: 1212,
              present: null,
            },
            "lecture.9": {
              date: 20250617,
              time: 1415,
              present: null,
            },
            "lecture.10": {
              date: 20250617,
              time: 2318,
              present: null,
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
              present: 0,
            },
            "lecture.16": {
              date: 20250617,
              time: 1416,
              present: 0,
            },
            "lecture.17": {
              date: 20250617,
              time: 1417,
              present: 0,
            },
          },
        },
      },
      3122235001004: {
        name: "Student Four",
        attendance: {
          ELE2H22A: {
            "lecture.1": {
              date: 20250616,
              time: 222843,
              present: null,
            },
            "lecture.2": {
              date: 20250616,
              time: 224223,
              present: null,
            },
            "lecture.3": {
              date: 20250616,
              time: 224313,
              present: null,
            },
            "lecture.4": {
              date: 20250616,
              time: 234617,
              present: null,
            },
            "lecture.5": {
              date: 20250616,
              time: 234729,
              present: null,
            },
            "lecture.6": {
              date: 20250617,
              time: 151,
              present: null,
            },
            "lecture.7": {
              date: 20250617,
              time: 646,
              present: null,
            },
            "lecture.8": {
              date: 20250617,
              time: 1212,
              present: null,
            },
            "lecture.9": {
              date: 20250617,
              time: 1415,
              present: null,
            },
            "lecture.10": {
              date: 20250617,
              time: 2318,
              present: null,
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
              present: 0,
            },
            "lecture.16": {
              date: 20250617,
              time: 1416,
              present: 0,
            },
            "lecture.17": {
              date: 20250617,
              time: 1417,
              present: 0,
            },
          },
        },
      },
    },
    message: "successfully retrieved student attendance by class code",
    status: "S",
  };

  // Process student data
  const students = [];
  for (const [studentId, studentData] of Object.entries(sample.details)) {
    const attendanceData =
      studentData.attendance[classcode] || studentData.attendance["ELE2H22A"];
    if (!attendanceData) continue;

    const lecturesAttended = [];
    let totalLectures = 0;
    let attendedCount = 0;

    for (const [lectureKey, lectureData] of Object.entries(attendanceData)) {
      if (!lectureKey.startsWith("lecture.")) continue;

      totalLectures++;
      if (lectureData.present === 1) {
        attendedCount++;
        lecturesAttended.push(lectureKey);
      }
    }

    const attendancePercentage =
      totalLectures > 0
        ? ((attendedCount / totalLectures) * 100).toFixed(1)
        : 0;

    students.push({
      id: studentId,
      name: studentData.name,
      lecturesAttended,
      attendancePercentage,
      totalLectures,
      attendedCount,
    });
  }

  return students;
}

function calculateStatsForLecture(classCode) {
  const sampleapidata = {
    details: {
      "lecture.17": {
        date: 20250617,
        time: 1417,
        attendance: {
          3122235001110: 1,
          3122235001087: 0,
          3122235001008: 0,
          3122235001004: 0,
        },
      },
      "lecture.15": {
        date: 20250617,
        time: 1410,
        attendance: {
          3122235001110: 0,
          3122235001087: 1,
          3122235001008: 0,
          3122235001004: 0,
        },
      },
      "lecture.16": {
        date: 20250617,
        time: 1416,
        attendance: {
          3122235001110: 0,
          3122235001087: 1,
          3122235001008: 0,
          3122235001004: 0,
        },
      },
      "lecture.13": {
        date: 20250617,
        time: 1409,
        attendance: {
          3122235001110: 0,
          3122235001087: 0,
          3122235001008: 0,
          3122235001004: 0,
        },
      },
      "lecture.14": {
        date: 20250617,
        time: 1410,
        attendance: {
          3122235001110: 0,
          3122235001087: 0,
          3122235001008: 0,
          3122235001004: 0,
        },
      },
      "lecture.11": {
        date: 20250617,
        time: 1401,
        attendance: {
          3122235001110: 0,
          3122235001087: 0,
          3122235001008: 0,
          3122235001004: 0,
        },
      },
      "lecture.12": {
        date: 20250617,
        time: 1402,
        attendance: {
          3122235001110: 1,
          3122235001087: 0,
          3122235001008: 0,
          3122235001004: 0,
        },
      },
      "lecture.6": {
        date: 20250617,
        time: 151,
        attendance: {
          3122235001110: 1,
          3122235001087: 0,
          3122235001008: 0,
        },
      },
      "lecture.7": {
        date: 20250617,
        time: 646,
        attendance: {
          3122235001110: 0,
          3122235001087: 0,
          3122235001008: 0,
        },
      },
      "lecture.10": {
        date: 20250617,
        time: 2318,
        attendance: {
          3122235001110: 1,
          3122235001087: 0,
          3122235001008: 0,
        },
      },
      "lecture.4": {
        date: 20250616,
        time: 234617,
        attendance: {
          3122235001110: 1,
          3122235001087: 1,
          3122235001008: 0,
        },
      },
      "lecture.5": {
        date: 20250616,
        time: 234729,
        attendance: {
          3122235001110: 1,
          3122235001087: 0,
          3122235001008: 0,
        },
      },
      "lecture.2": {
        date: 20250616,
        time: 224223,
        attendance: {
          3122235001110: 1,
          3122235001087: 0,
          3122235001008: 0,
        },
      },
      "lecture.3": {
        date: 20250616,
        time: 224313,
        attendance: {
          3122235001110: 1,
          3122235001087: 0,
          3122235001008: 0,
        },
      },
      "lecture.1": {
        date: 20250616,
        time: 222843,
        attendance: {
          3122235001110: 0,
          3122235001087: 0,
          3122235001008: 0,
        },
      },
      "lecture.8": {
        date: 20250617,
        time: 1212,
        attendance: {
          3122235001110: 1,
          3122235001087: 0,
          3122235001008: 0,
        },
      },
      "student-details": {
        map: {
          3122235001110: "SaipranavM",
          3122235001087: "Murari Sreekumar",
          3122235001008: "Student Five",
          3122235001004: "Student Five",
        },
      },
      "lecture.9": {
        date: 20250617,
        time: 1415,
        attendance: {
          3122235001110: 1,
          3122235001087: 0,
          3122235001008: 0,
        },
      },
    },
    message: "attendance details retrieved successfully",
    status: "S",
  };

  const lectures = [];
  const totalStudents = Object.keys(
    Object.values(sampleapidata.details)[0]?.attendance || {}
  ).length;

  for (const [key, lecture] of Object.entries(sampleapidata.details)) {
    if (!key.startsWith("lecture.")) continue;
    const attended = Object.values(lecture.attendance).filter(
      (v) => v === 1
    ).length;
    const percent = ((attended / totalStudents) * 100).toFixed(1);

    // Format date nicely
    const dateStr = lecture.date.toString();
    const formattedDate = `${dateStr.slice(6, 8)}/${dateStr.slice(
      4,
      6
    )}/${dateStr.slice(0, 4)}`;

    // Format time nicely
    const timeStr = lecture.time.toString().padStart(6, "0");
    const formattedTime = `${timeStr.slice(0, 2)}:${timeStr.slice(
      2,
      4
    )}:${timeStr.slice(4, 6)}`;

    lectures.push({
      name: key,
      date: formattedDate,
      time: formattedTime,
      attended,
      total: totalStudents,
      percent,
    });
  }

  return lectures;
}

// Custom Modal Component
function FullScreenModal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with blur */}
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Modal Content */}
      <div className="relative w-full h-full max-w-7xl max-h-[95vh] mx-4 my-4 bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>
        {/* Scrollable content with custom scrollbar */}
        <div
          className="h-full overflow-y-auto"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#d1d5db #f3f4f6",
          }}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              width: 8px;
            }
            div::-webkit-scrollbar-track {
              background: #f3f4f6;
            }
            div::-webkit-scrollbar-thumb {
              background: #d1d5db;
              border-radius: 4px;
            }
            div::-webkit-scrollbar-thumb:hover {
              background: #9ca3af;
            }
          `}</style>
          {children}
        </div>
      </div>
    </div>
  );
}

function FacultyTransfersubjectComp({ c }) {
  const classdetails = c || {
    className: "Advanced Mathematics",
    classCode: "ELE2H22A",
    section: "A",
    year: "2024-25",
  };

  const [lectureStatsOpen, setLectureStatsOpen] = useState(false);
  const [studentsOpen, setStudentsOpen] = useState(false);

  const stats = calculateStatsForLecture(classdetails.classCode);
  const students = viewStudents(classdetails.classCode);

  const totalLectures = stats.length;
  const avgAttendance = totalLectures
    ? (
        stats.reduce((acc, s) => acc + parseFloat(s.percent), 0) / totalLectures
      ).toFixed(1)
    : 0;

  return (
    <>
      <div className="rounded-2xl border border-gray-300 bg-white shadow-md overflow-hidden p-4 md:p-5 w-full max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-3">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-bold text-blue-600">
                {classdetails.className}
              </h2>
            </div>
            <div className="flex flex-wrap gap-3 text-gray-600 text-sm">
              <div className="flex items-center gap-1">
                <span>{classdetails.classCode}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-medium">Section:</span>
                <span>{classdetails.section}</span>
              </div>
              <div className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium">
                {classdetails.year}
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-2 md:mt-0">
            {/* View Lecture Wise Attendance Button */}
            <Button
              onClick={() => setLectureStatsOpen(true)}
              className="cursor-pointer flex items-center gap-2 text-sm text-green-700 border-green-200 bg-green-50 hover:bg-green-100"
            >
              <BarChart3 className="w-4 h-4" />
              View Lecture Wise Attendance
            </Button>

            {/* View Students Button */}
            <Button
              onClick={() => setStudentsOpen(true)}
              className="cursor-pointer flex items-center gap-2 text-sm text-purple-700 border-purple-200 bg-purple-50 hover:bg-purple-100"
            >
              <Eye className="w-4 h-4" />
              View Students
            </Button>

            <Button className="cursor-pointer flex items-center gap-2 text-sm text-blue-700 border-blue-200 bg-blue-50 hover:bg-blue-100">
              <Users className="w-4 h-4" />
              Transfer to another Faculty
            </Button>

            <Button className="cursor-pointer flex items-center gap-2 text-sm text-red-600 border-red-200 bg-red-50 hover:bg-red-100">
              <Trash2 className="w-4 h-4" />
              Delete
            </Button>
          </div>
        </div>
      </div>

      {/* Lecture Stats Modal */}
      <FullScreenModal
        isOpen={lectureStatsOpen}
        onClose={() => setLectureStatsOpen(false)}
      >
        <div className="p-8 space-y-6">
          {/* Header */}
          <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
            <BarChart3 className="w-8 h-8 text-green-600" />
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Lecture Wise Attendance Summary
              </h2>
              <p className="text-gray-600">
                {classdetails.className} - {classdetails.classCode}
              </p>
            </div>
          </div>

          {/* Overall Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-green-50 rounded-xl p-6 text-center border border-green-200">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {totalLectures}
              </div>
              <div className="text-sm text-gray-600 font-medium">
                Total Lectures
              </div>
            </div>
            <div className="bg-blue-50 rounded-xl p-6 text-center border border-blue-200">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {avgAttendance}%
              </div>
              <div className="text-sm text-gray-600 font-medium">
                Average Attendance
              </div>
            </div>
            <div className="bg-purple-50 rounded-xl p-6 text-center border border-purple-200">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {students.length}
              </div>
              <div className="text-sm text-gray-600 font-medium">
                Total Students
              </div>
            </div>
          </div>

          {/* Attendance Table */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">
                      Lecture
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Date
                      </div>
                    </th>
                    <th className="px-6 py-4 text-center font-semibold text-gray-700">
                      Attended
                    </th>
                    <th className="px-6 py-4 text-center font-semibold text-gray-700">
                      Total
                    </th>
                    <th className="px-6 py-4 text-center font-semibold text-gray-700">
                      Attendance Rate
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {stats.map((s, index) => (
                    <tr
                      key={s.name}
                      className={`border-b border-gray-100 ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-gray-100 transition-colors`}
                    >
                      <td className="px-6 py-4 font-medium text-green-700">
                        {s.name}
                      </td>
                      <td className="px-6 py-4 text-gray-600">{s.date}</td>
                      <td className="px-6 py-4 text-center font-medium text-lg">
                        {s.attended}
                      </td>
                      <td className="px-6 py-4 text-center text-lg">
                        {s.total}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`inline-flex px-4 py-2 rounded-full text-sm font-semibold ${
                            parseFloat(s.percent) >= 75
                              ? "bg-green-100 text-green-800"
                              : parseFloat(s.percent) >= 50
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {s.percent}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </FullScreenModal>

      {/* Students Modal */}
      <FullScreenModal
        isOpen={studentsOpen}
        onClose={() => setStudentsOpen(false)}
      >
        <div className="p-8 space-y-6">
          {/* Header */}
          <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
            <Users className="w-8 h-8 text-purple-600" />
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Student Attendance Records
              </h2>
              <p className="text-gray-600">
                {classdetails.className} - {classdetails.classCode}
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-purple-50 rounded-xl p-6 text-center border border-purple-200">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {students.length}
              </div>
              <div className="text-sm text-gray-600 font-medium">
                Total Students
              </div>
            </div>
            <div className="bg-green-50 rounded-xl p-6 text-center border border-green-200">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {
                  students.filter(
                    (s) => parseFloat(s.attendancePercentage) >= 75
                  ).length
                }
              </div>
              <div className="text-sm text-gray-600 font-medium">
                Students with ≥75% Attendance
              </div>
            </div>
            <div className="bg-red-50 rounded-xl p-6 text-center border border-red-200">
              <div className="text-3xl font-bold text-red-600 mb-2">
                {
                  students.filter(
                    (s) => parseFloat(s.attendancePercentage) < 50
                  ).length
                }
              </div>
              <div className="text-sm text-gray-600 font-medium">
                Students with &lt;50% Attendance
              </div>
            </div>
          </div>

          {/* Student Table */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">
                      Student ID
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">
                      Name
                    </th>
                    <th className="px-6 py-4 text-center font-semibold text-gray-700">
                      Total Lectures
                    </th>
                    <th className="px-6 py-4 text-center font-semibold text-gray-700">
                      Attended
                    </th>
                    <th className="px-6 py-4 text-center font-semibold text-gray-700">
                      Attendance %
                    </th>
                    <th className="px-6 py-4 text-center font-semibold text-gray-700">
                      Lectures Attended
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((s, index) => (
                    <tr
                      key={s.id}
                      className={`border-b border-gray-100 ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-gray-100 transition-colors`}
                    >
                      <td className="px-6 py-4 font-medium text-purple-700">
                        {s.id}
                      </td>
                      <td className="px-6 py-4 text-gray-800">{s.name}</td>
                      <td className="px-6 py-4 text-center">
                        {s.totalLectures}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {s.attendedCount}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`inline-flex px-4 py-2 rounded-full text-sm font-semibold ${
                            parseFloat(s.attendancePercentage) >= 75
                              ? "bg-green-100 text-green-800"
                              : parseFloat(s.attendancePercentage) >= 50
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {s.attendancePercentage}%
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex flex-wrap justify-center gap-2">
                          {s.lecturesAttended.map((l) => {
                            const lecNum = l.replace("lecture.", "L");
                            return (
                              <span
                                key={l}
                                className="bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm"
                              >
                                {lecNum}
                              </span>
                            );
                          })}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </FullScreenModal>
    </>
  );
}

export default FacultyTransfersubjectComp;
