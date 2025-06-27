import FacultyStudentView_g from "../../projectComponents/facultyComponents/FacultyStudentView_g";

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
};

function getStudentSummaries(apiValue) {
  const studentSummaries = [];

  const students = apiValue.details;

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
      details: regNo,
      percentage: percentage + "%",
    });
  }

  return studentSummaries;
}

const studentSummaries = getStudentSummaries(apiValue);

function ClassAdvisorPage() {
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
            onViewDetails={() => console.log("Details of:", student.details)}
          />
        ))}
      </div>
    </div>
  );
}

export default ClassAdvisorPage;
