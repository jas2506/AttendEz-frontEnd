import { User, GraduationCap, ChevronDown, Users, Clock } from "lucide-react";
import { useState } from "react";

function FacultyCreateClassPage() {
  const [selectedGroupCode, setSelectedGroupCode] = useState("");
  const [selectedClassCode, setSelectedClassCode] = useState("");
  const [className, setClassName] = useState("");
  const [credits, setCredits] = useState("");
  const [isGroupDropdownOpen, setIsGroupDropdownOpen] = useState(false);
  const [isClassDropdownOpen, setIsClassDropdownOpen] = useState(false);
  const [createdClass, setCreatedClass] = useState(null);

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

  const formatGroupCodeLabel = (groupcode) => {
    if (groupcode.includes("ELE")) {
      const match = groupcode.match(/CSE(.+?)(\d{4})$/);
      if (match) {
        return `CSE-ELECTIVE UG-${match[2]}`;
      }
    } else {
      const match = groupcode.match(/(\w+)(\d{4})([A-Z])$/);
      if (match) {
        return `${match[1]}-${match[3]} UG${match[2]}`;
      }
    }
    return groupcode;
  };

  const getSelectedGrouping = () => {
    return logicalGroupings.logical_groupings.find(
      (grouping) => grouping.groupcode === selectedGroupCode
    );
  };

  const getAvailableClassCodes = () => {
    const grouping = getSelectedGrouping();
    return grouping ? grouping["class-code"] : [];
  };

  const handleGroupCodeSelect = (groupcode) => {
    setSelectedGroupCode(groupcode);
    setSelectedClassCode("");
    setIsGroupDropdownOpen(false);
  };

  const handleClassCodeSelect = (classcode) => {
    setSelectedClassCode(classcode);
    setIsClassDropdownOpen(false);
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const getEndTime = (startTime, durationMinutes) => {
    const [hours, minutes] = startTime.split(":").map(Number);
    const startMinutes = hours * 60 + minutes;
    const endMinutes = startMinutes + durationMinutes;
    const endHours = Math.floor(endMinutes / 60);
    const endMins = endMinutes % 60;
    return `${endHours.toString().padStart(2, "0")}:${endMins
      .toString()
      .padStart(2, "0")}`;
  };

  const getTimetableForClass = () => {
    const grouping = getSelectedGrouping();
    if (!grouping || !selectedClassCode) return null;

    const schedule = {};
    Object.entries(grouping.timetable).forEach(([day, classes]) => {
      const classSession = classes.find(
        (cls) => cls.classCode === selectedClassCode
      );
      if (classSession) {
        schedule[day] = classSession;
      }
    });
    return schedule;
  };

  const handleSubmit = () => {
    if (!selectedGroupCode || !selectedClassCode || !className || !credits) {
      alert(
        "Please fill in all fields and select both group code and class code."
      );
      return;
    }

    const classData = {
      groupCode: selectedGroupCode,
      classCode: selectedClassCode,
      name: className.toUpperCase(),
      credits: credits,
    };

    console.log("Creating class:", JSON.stringify(classData, null, 2));
    setCreatedClass(classData);
    alert("Class created successfully!");
  };

  const resetForm = () => {
    setSelectedGroupCode("");
    setSelectedClassCode("");
    setClassName("");
    setCredits("");
    setCreatedClass(null);
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
              {/* Group Code Dropdown */}
              <div className="relative z-20">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Group Code
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsGroupDropdownOpen(!isGroupDropdownOpen)}
                    className="w-full px-4 py-3 text-left border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white flex items-center justify-between"
                  >
                    <span
                      className={
                        selectedGroupCode ? "text-gray-900" : "text-gray-500"
                      }
                    >
                      {selectedGroupCode
                        ? formatGroupCodeLabel(selectedGroupCode)
                        : "Select a group code"}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform ${
                        isGroupDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isGroupDropdownOpen && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-xl max-h-60 overflow-y-auto">
                      {logicalGroupings.logical_groupings.map(
                        (grouping, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() =>
                              handleGroupCodeSelect(grouping.groupcode)
                            }
                            className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                          >
                            <div className="font-medium text-gray-900">
                              {formatGroupCodeLabel(grouping.groupcode)}
                            </div>
                            <div className="text-sm text-gray-500 mt-1">
                              Group Code: {grouping.groupcode} •{" "}
                              {grouping.registernumbers.length} students
                            </div>
                          </button>
                        )
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Class Code Dropdown */}
              {selectedGroupCode && (
                <div className="relative z-10">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Class Code
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() =>
                        setIsClassDropdownOpen(!isClassDropdownOpen)
                      }
                      className="w-full px-4 py-3 text-left border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white flex items-center justify-between"
                    >
                      <span
                        className={
                          selectedClassCode ? "text-gray-900" : "text-gray-500"
                        }
                      >
                        {selectedClassCode || "Select a class code"}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 transition-transform ${
                          isClassDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isClassDropdownOpen && (
                      <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-xl max-h-60 overflow-y-auto">
                        {getAvailableClassCodes().map((classcode, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => handleClassCodeSelect(classcode)}
                            className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                          >
                            <div className="font-medium text-gray-900">
                              {classcode}
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

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
                  step="0.5"
                  value={credits}
                  onChange={(e) => setCredits(e.target.value)}
                  placeholder="Enter Number of Credits"
                  min="0.5"
                  max="10"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end gap-4">
                {createdClass && (
                  <button
                    onClick={resetForm}
                    className="bg-gray-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-all"
                  >
                    Reset Form
                  </button>
                )}
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

        {/* Timetable Display */}
        {createdClass && selectedClassCode && (
          <div className="bg-white border border-gray-200 shadow-lg rounded-2xl">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4 rounded-tl-2xl rounded-tr-2xl">
              <div className="flex items-center gap-4">
                <div className="bg-white/10 p-3 rounded-xl">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xl font-bold text-white">
                    Class Timetable
                  </p>
                  <p className="text-purple-100 text-sm mt-1">
                    Schedule for {selectedClassCode}
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                        Day
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                        Start Time
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                        End Time
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                        Duration
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(getTimetableForClass() || {}).map(
                      ([day, session]) => (
                        <tr key={day} className="hover:bg-gray-50">
                          <td className="border border-gray-300 px-4 py-2 font-medium">
                            {day}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {formatTime(session.startTime)}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {formatTime(
                              getEndTime(
                                session.startTime,
                                session.durationMinutes
                              )
                            )}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {session.durationMinutes} minutes
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
                {Object.keys(getTimetableForClass() || {}).length === 0 && (
                  <div className="text-center py-4 text-gray-500">
                    No schedule found for this class code.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FacultyCreateClassPage;
