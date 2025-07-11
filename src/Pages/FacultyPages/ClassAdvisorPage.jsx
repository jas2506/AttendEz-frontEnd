import { useState, useEffect } from "react";
import FacultyStudentView_g from "../../projectComponents/facultyComponents/FacultyStudentView_g";
import { getAdvisorListAttendance } from "../../TeacherApi";
import { GraduationCap } from "lucide-react";

function getStudentSummaries(apiValue) {
  const studentSummaries = [];

  const classKeys = Object.keys(apiValue.details);
  for (const classKey of classKeys) {
    const studentsArray = apiValue.details[classKey];

    for (const studentData of studentsArray) {
      const { name, registernumber, attendance } = studentData;

      if (!attendance || typeof attendance !== "object") continue;

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
        details: registernumber,
        percentage: percentage + "%",
      });
    }
  }

  return studentSummaries;
}

function ClassAdvisorPage() {
  const [advisorData, setAdvisorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAdvisorData = async () => {
      try {
        const res = await getAdvisorListAttendance();

        if (res.data.status === "E") {
          setError(
            res.data.message || "You are not assigned as a class advisor."
          );
          return;
        }

        setAdvisorData(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch advisor data.");
      } finally {
        setLoading(false);
      }
    };

    fetchAdvisorData();
  }, []);

  if (loading) return <p className="p-6 text-gray-500">Loading...</p>;

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white border border-red-200 rounded-2xl shadow-xl p-8 max-w-md w-full text-center space-y-4">
          <div className="bg-red-100 text-red-600 w-20 h-20 flex items-center justify-center rounded-full mx-auto shadow-inner">
            <GraduationCap className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            Not a Class Advisor
          </h2>
          <p className="text-gray-600">
            You are currently not assigned as a class advisor or no data was
            found.
          </p>
          <p className="text-sm text-gray-400 italic">(Message: {error})</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!advisorData || !advisorData.details) {
    return (
      <div className="p-6 text-center text-gray-500">
        No student data available.
      </div>
    );
  }

  const studentSummaries = getStudentSummaries(advisorData);
  const classCode = Object.keys(advisorData.details)[0] || "Your Class";

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pb-6 max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-blue-700">Class Advisor View</h1>
        <h2 className="text-xl font-semibold text-gray-700">
          Class: {classCode}
        </h2>
      </div>

      {/* Student Cards */}
      <div className="space-y-6 w-full max-w-5xl px-4 mx-auto">
        {studentSummaries.map((student, index) => (
          <FacultyStudentView_g
            key={index}
            name={student.name}
            details={student.details}
            percentage={student.percentage}
            apiValue={advisorData}
            onViewDetails={() => console.log("Details of:", student.details)}
          />
        ))}
      </div>
    </div>
  );
}

export default ClassAdvisorPage;
