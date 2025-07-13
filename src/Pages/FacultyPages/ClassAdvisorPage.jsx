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

      let totalLectures = 0;
      let totalPresent = 0;

      if (attendance && typeof attendance === "object") {
        for (const subject of Object.values(attendance)) {
          for (const lecture of Object.values(subject)) {
            totalLectures++;
            if (lecture.present === 1) {
              totalPresent++;
            }
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
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Header */}
          <div className="bg-white border border-gray-200 shadow-lg rounded-2xl overflow-hidden mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-white/10 p-3 rounded-xl">
                    <GraduationCap className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">
                      Class Advisor View
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Student Cards - inside same container */}
          <div className="space-y-6">
            {studentSummaries.map((student, index) => (
              <FacultyStudentView_g
                key={index}
                name={student.name}
                details={student.details}
                percentage={student.percentage}
                apiValue={advisorData}
                onViewDetails={() =>
                  console.log("Details of:", student.details)
                }
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ClassAdvisorPage;
