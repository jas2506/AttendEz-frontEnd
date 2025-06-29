import FacultyTransfersubjectComp from "../../projectComponents/facultyComponents/FacultyTransfersubjectComp";
import {User} from "lucide-react";

function SubjectsHandledPage() {
  const tt = {
    message: "Timetable refreshed successfully",
    timetable: {
      classDetails: {
        ELE2H22A: {
          facultyEmail: "saipranav2310324@ssn.edu.in",
          classCode: "ELE2H22A",
          passoutYear: "2027",
          credits: "4",
          className: "IMAGE ANALYSIS",
          facultyName: "Dr. Saipranav",
          department: "CSE",
          regNumbers: ["3122235001110", "3122235001087", "3122235001008"],
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
          regNumbers: [
            "3122235001110",
            "3122235001087",
            "3122225001002",
            "3122225001003",
            "3122235001004",
            "3122215001006",
            "3122215001007",
          ],
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
          regNumbers: [
            "3122235001110",
            "3122235001087",
            "3122225001002",
            "3122225001003",
            "3122235001004",
            "3122215001006",
            "3122215001007",
          ],
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
          regNumbers: [
            "3122235001110",
            "3122235001087",
            "3122225001002",
            "3122225001003",
            "3122235001004",
            "3122215001006",
            "3122215001007",
          ],
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
          regNumbers: [
            "3122235001110",
            "3122235001087",
            "3122225001002",
            "3122225001003",
            "3122235001004",
            "3122215001006",
            "3122215001007",
          ],
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
          regNumbers: [
            "3122235001110",
            "3122235001087",
            "3122225001002",
            "3122225001003",
            "3122235001004",
            "3122215001006",
            "3122215001007",
          ],
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
    },
    status: "S",
  };

  function getFacultySubjects(tt) {
    const result = [];
    const seen = new Set();
    const classDetails = tt?.timetable?.classDetails || {};
  
    for (const classCode in classDetails) {
      const { className, passoutYear, groupCode } = classDetails[classCode];
  
      let section;
      if (groupCode.includes("ELE")) {
        section = "ELECTIVE";
      } else {
        const match = groupCode.match(/^([A-Z]+)\d{4}([A-Z])$/);
        section = match ? `${match[1]}-${match[2]}` : groupCode;
      }
  
      const uniqueKey = `${className}-${section}-${passoutYear}`;
      if (!seen.has(uniqueKey)) {
        seen.add(uniqueKey);
        result.push({
          classCode,
          className,
          section,
          year: `UG-${passoutYear}`,
        });
      }
    }
  
    return result;
  }
  
  




  const subs = getFacultySubjects(tt);

  return (
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="bg-white border border-gray-200 shadow-lg rounded-2xl overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
            <div className="flex items-center gap-4">
              <div className="bg-white/10 p-3 rounded-xl">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  Subjects You Handle
                </p>
                <p className="text-blue-100 text-sm mt-1">
                  List of Courses taught by You
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Subjects List */}
        <div className="grid gap-4">
          {subs.map((course, idx) => (
            <FacultyTransfersubjectComp key={idx} c={course} />
          ))}
        </div>
        {subs.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            You are not currently assigned any subjects.
          </p>
        )}
      </div>
  );
}

export default SubjectsHandledPage;
