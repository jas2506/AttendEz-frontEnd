import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Contact, User } from "lucide-react";

function FacultyStudentView_g({
  name,
  details,
  percentage,
  onViewDetails,
  apiValue,
}) {
  const [showDetails, setShowDetails] = useState(false);

  function getStudentDetailedData(regNumber, apiData) {
    let student = null;

    for (const students of Object.values(apiData.details)) {
      student = students.find((s) => s.registernumber === regNumber);
      if (student) break;
    }

    if (!student) return null;

    if (!student.attendance || typeof student.attendance !== "object") {
      return {
        name: student.name,
        registerNumber: regNumber,
        digitalId: regNumber,
        department: "CSE",
        year: "III",
        courses: null,
        totalAttended: 0,
        totalClasses: 0,
      };
    }

    const courses = [];
    let totalAttended = 0;
    let totalClasses = 0;

    for (const subject in student.attendance) {
      const lectures = student.attendance[subject];
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
      });
    }

    return {
      name: student.name,
      registerNumber: regNumber,
      digitalId: regNumber,
      department: "CSE",
      year: "III",
      courses,
      totalAttended,
      totalClasses,
    };
  }

  const numericPercentage = parseFloat(percentage.replace("%", ""));
  let badgeColor = "bg-green-500";
  if (numericPercentage < 70) badgeColor = "bg-red-500";
  else if (numericPercentage < 75) badgeColor = "bg-yellow-400";

  const studentDetailedData = showDetails
    ? getStudentDetailedData(details, apiValue)
    : null;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 transition-all">
      {!showDetails ? (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-1/2">
            <User className="text-blue-600" />
            <span className="font-semibold text-lg text-blue-700 truncate">
              {name}
            </span>
          </div>

          <div className="flex gap-4 items-center w-full sm:w-1/2 justify-end">
            <div
              className={`${badgeColor} text-white font-semibold px-4 py-1 rounded-full text-sm shadow-md w-[100px] text-center`}
            >
              {percentage}
            </div>
            <Button
              variant="outline"
              className="rounded-full px-4 py-1 text-sm flex items-center gap-2 border-blue-600 text-blue-600 hover:bg-blue-50"
              onClick={() => {
                setShowDetails(true);
                if (onViewDetails) onViewDetails();
              }}
            >
              <Contact className="w-4 h-4" />
              <span>Details</span>
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Header Section */}
          <div className="flex items-center gap-4">
            <img
              src="https://www.w3schools.com/howto/img_avatar.png"
              alt="Profile"
              className="w-16 h-16 rounded-full border border-gray-300"
            />
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                {studentDetailedData?.name}
              </h2>
              <p className="text-sm text-gray-500">
                Register No:{" "}
                <span className="text-gray-700 font-medium">
                  {studentDetailedData?.registerNumber}
                </span>
              </p>
            </div>
          </div>

          {/* Attendance Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-center border border-gray-200 rounded-md overflow-hidden">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="p-2">Course</th>
                  <th className="p-2">Attended</th>
                  <th className="p-2">Total</th>
                  <th className="p-2">%</th>
                </tr>
              </thead>
              <tbody>
                {studentDetailedData?.courses === null ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="p-4 text-gray-500 italic text-center"
                    >
                      Attendance record not found.
                    </td>
                  </tr>
                ) : (
                  studentDetailedData?.courses.map((course, idx) => {
                    const percent =
                      course.total > 0
                        ? ((course.attended / course.total) * 100).toFixed(1)
                        : "0.0";
                    return (
                      <tr
                        key={idx}
                        className="border-t hover:bg-gray-50 transition"
                      >
                        <td className="p-2">{course.name}</td>
                        <td className="p-2 font-semibold">{course.attended}</td>
                        <td className="p-2">{course.total}</td>
                        <td className="p-2 font-semibold">{percent}%</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Summary & Actions */}
          <div className="flex justify-between items-center pt-2">
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-600">Overall</span>
              <div
                className={`${badgeColor} text-white font-bold px-4 py-1 rounded-full text-sm`}
              >
                {percentage}
              </div>
            </div>
            <Button
              onClick={() => setShowDetails(false)}
              variant="outline"
              className="rounded-full px-4 py-1 text-sm text-gray-700 hover:bg-gray-100"
            >
              Back
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FacultyStudentView_g;
