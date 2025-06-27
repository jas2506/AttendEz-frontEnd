import { User, GraduationCap, ChevronDown, Users } from "lucide-react";
import { useState } from "react";

function FacultyCreateClassPage() {
  const [selectedGrouping, setSelectedGrouping] = useState(null);
  const [className, setClassName] = useState("");
  const [credits, setCredits] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const logicalGroupings = {
    message: "Logical groupings retrieved successfully!",
    logical_groupings: [
      {
        registernumbers: [
          "3122235001110",
          "3122235001087",
          "3122225001002",
          "3122225001003",
          "3122235001004",
          "3122215001006",
          "3122215001007",
          "3122235001008",
        ],
        passout: "2029",
        degree: "B.E.",
        "class-code": [
          "CSE2901B",
          "CSE2902B",
          "CSE2903B",
          "CSE2904B",
          "CSE2905B",
        ],
        section: "B",
        _id: {
          timestamp: 1750000592,
          date: "2025-06-15T15:16:32.000+00:00",
        },
        department: "CSE",
        groupcode: "CSE2029B",
        timetable: {
          Monday: [
            {
              classCode: "CSE2901B",
              startTime: "09:00",
              durationMinutes: 50,
            },
            {
              classCode: "CSE2902B",
              startTime: "10:00",
              durationMinutes: 50,
            },
          ],
          Tuesday: [
            {
              classCode: "CSE2903B",
              startTime: "09:00",
              durationMinutes: 50,
            },
            {
              classCode: "CSE2904B",
              startTime: "10:00",
              durationMinutes: 50,
            },
          ],
          Wednesday: [
            {
              classCode: "CSE2905B",
              startTime: "09:00",
              durationMinutes: 50,
            },
            {
              classCode: "CSE2901B",
              startTime: "10:00",
              durationMinutes: 50,
            },
          ],
          Thursday: [
            {
              classCode: "CSE2902B",
              startTime: "09:00",
              durationMinutes: 50,
            },
            {
              classCode: "CSE2903B",
              startTime: "10:00",
              durationMinutes: 50,
            },
          ],
          Friday: [
            {
              classCode: "CSE2904B",
              startTime: "09:00",
              durationMinutes: 50,
            },
            {
              classCode: "CSE2905B",
              startTime: "10:00",
              durationMinutes: 50,
            },
          ],
        },
        advisorEmail: "murari2310237@ssn.edu.in",
      },
      {
        registernumbers: ["3122235001008"],
        passout: "2029",
        degree: "B.E.",
        "class-code": ["ELE2H11A"],
        section: "A",
        _id: {
          timestamp: 1750000608,
          date: "2025-06-15T15:16:48.000+00:00",
        },
        department: "CSE",
        groupcode: "CSEELE2H11A2029",
        timetable: {
          Monday: [
            {
              classCode: "ELE2H11A",
              startTime: "11:00",
              durationMinutes: 50,
            },
          ],
          Tuesday: [
            {
              classCode: "ELE2H11A",
              startTime: "11:00",
              durationMinutes: 100,
            },
          ],
          Wednesday: [
            {
              classCode: "ELE2H11A",
              startTime: "11:00",
              durationMinutes: 50,
            },
          ],
          Thursday: [
            {
              classCode: "ELE2H11A",
              startTime: "11:00",
              durationMinutes: 100,
            },
          ],
          Friday: [
            {
              classCode: "ELE2H11A",
              startTime: "11:00",
              durationMinutes: 50,
            },
          ],
        },
      },
      {
        registernumbers: ["3122235001110", "3122235001087", "3122235001008"],
        passout: "2027",
        degree: "B.E.",
        "class-code": ["ELE2H22A"],
        section: "A",
        _id: {
          timestamp: 1750000569,
          date: "2025-06-15T15:16:09.000+00:00",
        },
        department: "CSE",
        groupcode: "CSEELE2H22A2027",
        timetable: {
          Monday: [
            {
              classCode: "ELE2H22A",
              startTime: "14:00",
              durationMinutes: 100,
            },
          ],
          Tuesday: [
            {
              classCode: "ELE2H22A",
              startTime: "14:00",
              durationMinutes: 50,
            },
          ],
          Wednesday: [
            {
              classCode: "ELE2H22A",
              startTime: "14:00",
              durationMinutes: 100,
            },
          ],
          Thursday: [
            {
              classCode: "ELE2H22A",
              startTime: "14:00",
              durationMinutes: 50,
            },
          ],
          Friday: [
            {
              classCode: "ELE2H22A",
              startTime: "14:00",
              durationMinutes: 100,
            },
          ],
        },
      },
      {
        registernumbers: [
          "3122235001110",
          "3122235001087",
          "3122225001002",
          "3122225001003",
          "3122235001004",
          "3122215001006",
          "3122215001007",
        ],
        passout: "2027",
        degree: "B.E.",
        "class-code": [
          "CSE2701B",
          "CSE2702B",
          "CSE2703B",
          "CSE2704B",
          "CSE2705B",
        ],
        section: "B",
        _id: {
          timestamp: 1750000484,
          date: "2025-06-15T15:14:44.000+00:00",
        },
        department: "CSE",
        groupcode: "CSE2027B",
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
          ],
          Tuesday: [
            {
              classCode: "CSE2705B",
              startTime: "09:00",
              durationMinutes: 50,
            },
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
          ],
          Wednesday: [
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
              classCode: "CSE2701B",
              startTime: "11:00",
              durationMinutes: 50,
            },
            {
              classCode: "CSE2702B",
              startTime: "12:00",
              durationMinutes: 50,
            },
          ],
          Thursday: [
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
              classCode: "CSE2701B",
              startTime: "12:00",
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
          ],
        },
        advisorEmail: "saipranav2310324@ssn.edu.in",
      },
    ],
    status: "S",
  };

  const formatGroupCode = (grouping) => {
    const { department, section, passout, degree } = grouping;
    return `${department}-${section} ${degree}-${passout}`;
  };

  const handleGroupingSelect = (grouping) => {
    setSelectedGrouping(grouping);
    setIsDropdownOpen(false);
  };

  const handleSubmit = () => {
    if (!selectedGrouping || !className || !credits) {
      alert("Please fill in all fields and select a logical grouping.");
      return;
    }

    const classData = {
      className,
      credits: parseInt(credits),
      grouping: selectedGrouping,
      students: selectedGrouping.registernumbers,
    };

    console.log("Creating class:", classData);
    alert("Class created successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white border border-gray-200 shadow-lg rounded-2xl overflow-visible mb-6">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 rounded-tl-2xl rounded-tr-2xl">
            <div className="flex items-center gap-4">
              <div className="bg-white/10 p-3 rounded-xl">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  Create a New Class
                </p>
                <p className="text-blue-100 text-sm mt-1">
                  Enter details to create new class
                </p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="space-y-6">
              {/* Class Name Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Class Name
                </label>
                <input
                  type="text"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  placeholder="Enter Class Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>

              {/* Credits Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Credits
                </label>
                <input
                  type="number"
                  value={credits}
                  onChange={(e) => setCredits(e.target.value)}
                  placeholder="Enter Number of Credits"
                  min="1"
                  max="10"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>

              {/* Logical Grouping Dropdown */}
              <div className="relative z-10">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Logical Grouping
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full px-4 py-3 text-left border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white flex items-center justify-between"
                  >
                    <span
                      className={
                        selectedGrouping ? "text-gray-900" : "text-gray-500"
                      }
                    >
                      {selectedGrouping
                        ? formatGroupCode(selectedGrouping)
                        : "Select a logical grouping"}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform ${
                        isDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-xl max-h-60 overflow-y-auto">
                      {logicalGroupings.logical_groupings.map(
                        (grouping, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => handleGroupingSelect(grouping)}
                            className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                          >
                            <div className="font-medium text-gray-900">
                              {formatGroupCode(grouping)}
                            </div>
                            <div className="text-sm text-gray-500 mt-1">
                              {grouping.registernumbers.length} students • Group
                              Code: {grouping.groupcode}
                            </div>
                          </button>
                        )
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Student List */}
              {selectedGrouping && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="w-5 h-5 text-gray-600" />
                    <h3 className="font-semibold text-gray-900">
                      Students in {formatGroupCode(selectedGrouping)}
                    </h3>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {selectedGrouping.registernumbers.length} students
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {selectedGrouping.registernumbers.map(
                      (regNumber, index) => (
                        <div
                          key={index}
                          className="bg-white px-3 py-2 rounded-md border border-gray-200 text-sm font-mono"
                        >
                          {regNumber}
                        </div>
                      )
                    )}
                  </div>

                  {selectedGrouping.advisorEmail && (
                    <div className="mt-3 text-sm text-gray-600">
                      <strong>Advisor:</strong> {selectedGrouping.advisorEmail}
                    </div>
                  )}
                </div>
              )}

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg"
                >
                  Create Class
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FacultyCreateClassPage;
