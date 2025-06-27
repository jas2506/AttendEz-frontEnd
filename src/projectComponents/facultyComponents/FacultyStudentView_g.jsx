import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Contact,User } from "lucide-react";

function FacultyStudentView_g({ name, details, percentage, onViewDetails, apiValue }) {
  const [showDetails, setShowDetails] = useState(false);

  // Function to get detailed attendance data for a specific student
  function getStudentDetailedData(regNumber, apiData) {
    const student = apiData.details[regNumber];
    if (!student) return null;

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
      department: "CSE", // You can make this dynamic if needed
      year: "III", // You can make this dynamic if needed
      courses,
      totalAttended,
      totalClasses,
    };
  }

  const numericPercentage = parseFloat(percentage.replace('%', ''));
  let badgeColor = "bg-green-400";
  if (numericPercentage < 70) badgeColor = "bg-red-500";
  else if (numericPercentage < 75) badgeColor = "bg-orange-400";

  const studentDetailedData = showDetails ? getStudentDetailedData(details, apiValue) : null;

  return (
    <div className="bg-white border  rounded-2xl shadow-md p-6">
      {!showDetails ? (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 w-1/3 min-w-0">
            <User></User>
            <span className="font-semibold text-lg text-blue-700 truncate">
              {name}
            </span>
          </div>

          
          <div className="flex items-center justify-end space-x-4 w-1/3">
            <div
              className={`${badgeColor} text-white font-bold text-md px-4 py-2 rounded-full text-center w-[100px]`}
            >
              {percentage}
            </div>
            <Button
              variant="outline"
              className="rounded-full text-md px-4 py-2 flex items-center space-x-2"
              onClick={() => {
                setShowDetails(true);
                if (onViewDetails) onViewDetails();
              }}
            >
              <Contact className="w-5 h-5" />
              <span>View Details</span>
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <img
                src="https://www.w3schools.com/howto/img_avatar.png"
                alt="Profile"
                className="w-16 h-16 rounded-full border border-gray-300"
              />
              <div>
                <h2 className="text-2xl font-bold">{studentDetailedData?.name}</h2>
                <p className="text-blue-700 font-semibold">
                  Department:{" "}
                  <span className="text-black">{studentDetailedData?.department}</span>
                </p>
                <p className="text-blue-700 font-semibold">
                  Year: <span className="text-black">{studentDetailedData?.year}</span>
                </p>
                <p className="text-blue-700 font-semibold">
                  Digital ID:{" "}
                  <span className="text-black">{studentDetailedData?.digitalId}</span>
                </p>
                <p className="text-blue-700 font-semibold">
                  Register Number:{" "}
                  <span className="text-black">
                    {studentDetailedData?.registerNumber}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <table className="w-full text-center border mt-4">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-2">Course</th>
                <th className="p-2">Attended</th>
                <th className="p-2">Total</th>
                <th className="p-2">%</th>
              </tr>
            </thead>
            <tbody>
              {studentDetailedData?.courses.map((course, idx) => {
                const percent = (
                  (course.attended / course.total) * 100
                ).toFixed(1);
                return (
                  <tr key={idx} className="border-t">
                    <td className="p-2">{course.name}</td>
                    <td className="p-2 font-semibold">
                      {course.attended}
                    </td>
                    <td className="p-2">{course.total}</td>
                    <td className="p-2 font-semibold">{percent} %</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="flex justify-end mt-4 items-center">
            <span className="text-lg font-bold mr-2">Total</span>
            <div className="bg-green-500 text-white font-bold px-4 py-2 rounded-full">
              {percentage}
            </div>
          </div>

          <div className="text-right">
            <Button
              onClick={() => setShowDetails(false)}
              variant="outline"
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