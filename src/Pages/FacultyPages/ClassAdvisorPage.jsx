import { useState, useEffect } from "react";
import FacultyStudentView_g from "../../projectComponents/facultyComponents/FacultyStudentView_g";
import { getAdvisorListAttendance } from "../../TeacherApi";

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
        setAdvisorData(res.data); // API response format should match expected structure
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
  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!advisorData || !advisorData.details)
    return <p className="p-6 text-gray-500">No student data available.</p>;

  const studentSummaries = getStudentSummaries(advisorData);

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pb-6 max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-blue-700">
          Class Advisor: <span className="text-black">Dr. Ramya K</span>
        </h1>
        <h2 className="text-xl font-semibold text-gray-700">
          Class: III CSE-A
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
            apiValue={advisorData} // <-- FIX: Pass the full data!
            onViewDetails={() => console.log("Details of:", student.details)}
          />
        ))}
      </div>
    </div>
  );
}

export default ClassAdvisorPage;
