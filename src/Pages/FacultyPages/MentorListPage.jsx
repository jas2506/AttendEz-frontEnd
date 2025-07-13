import { useState, useEffect } from "react";
import {
  User,
  Contact,
  Presentation,
  Calendar,
  Clock,
  ArrowLeft,
  GraduationCap,
  Plus,
  Save,
  X,
} from "lucide-react";
import {
  getFacultyDetails,
  getMentorListAttendance,
  updateMenteeListAndReturnDetails,
} from "../../TeacherApi";
import { toast } from "sonner";

// Utility function to calculate student summaries
function getStudentSummaries(apiData) {
  const studentSummaries = [];
  const students = apiData.details;

  for (const [regNo, studentData] of Object.entries(students)) {
    const { name, attendance } = studentData;
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
        ? parseFloat(((totalPresent / totalLectures) * 100).toFixed(1))
        : 0.0;

    studentSummaries.push({
      name,
      regNo,
      percentage: parseFloat(percentage),
      attendanceAvailable: !!attendance,
    });
  }

  return studentSummaries;
}

// Student Card Component
function StudentCard({ student, apiValue, onViewDetails }) {
  const [showDetails, setShowDetails] = useState(false);

  // Get detailed attendance data for a specific student
  function getStudentDetailedData(regNumber, apiData) {
    const studentData = apiData.details[regNumber];
    if (!studentData) return null;

    const courses = [];
    let totalAttended = 0;
    let totalClasses = 0;

    for (const subject in studentData.attendance) {
      const lectures = studentData.attendance[subject];
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
        percentage:
          subjectTotal > 0
            ? ((subjectAttended / subjectTotal) * 100).toFixed(1)
            : "0.0",
      });
    }

    return {
      ...studentData,
      regNumber,
      courses,
      totalAttended,
      totalClasses,
      overallPercentage:
        totalClasses > 0
          ? ((totalAttended / totalClasses) * 100).toFixed(1)
          : "0.0",
    };
  }

  const getBadgeColor = (percentage) => {
    if (percentage >= 75) return "bg-green-500";
    if (percentage >= 70) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getTextColor = (percentage) => {
    if (percentage >= 75) return "text-green-700";
    if (percentage >= 70) return "text-yellow-700";
    return "text-red-700";
  };

  const studentDetailedData = showDetails
    ? getStudentDetailedData(student.regNo, apiValue)
    : null;

  if (showDetails && studentDetailedData) {
    return (
      <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 transition-all duration-300">
        <div className="space-y-6">
          {/* Header with student info */}
          <div className="flex items-start gap-4 pb-4 border-b">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
              {studentDetailedData.name.charAt(0)}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {studentDetailedData.name}
              </h2>
              <div className="grid grid-cols-1 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-600" />
                  <span className="text-gray-600">Register No:</span>
                  <span className="font-semibold">
                    {studentDetailedData.regNumber}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Course-wise attendance table */}
          <div className="overflow-x-auto">
            {!studentDetailedData.attendance ? (
              <div className="text-center text-gray-500 italic py-8">
                No attendance records found for this mentee.
              </div>
            ) : (
              <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                    <th className="p-3 text-left border border-gray-300">
                      Course
                    </th>
                    <th className="p-3 text-center border border-gray-300">
                      Attended
                    </th>
                    <th className="p-3 text-center border border-gray-300">
                      Total
                    </th>
                    <th className="p-3 text-center border border-gray-300">
                      Percentage
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {studentDetailedData.courses.map((course, idx) => (
                    <tr
                      key={idx}
                      className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    >
                      <td className="p-3 border border-gray-300 font-medium">
                        {course.name}
                      </td>
                      <td className="p-3 text-center border border-gray-300 font-semibold text-blue-600">
                        {course.attended}
                      </td>
                      <td className="p-3 text-center border border-gray-300">
                        {course.total}
                      </td>
                      <td className="p-3 text-center border border-gray-300">
                        <span
                          className={`font-bold ${getTextColor(
                            parseFloat(course.percentage)
                          )}`}
                        >
                          {course.percentage}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Overall attendance */}
          <div className="flex justify-between items-center pt-4 border-t">
            <div className="flex items-center gap-3">
              <span className="text-lg font-semibold text-gray-700">
                Overall Attendance:
              </span>
              <div
                className={`${getBadgeColor(
                  student.percentage
                )} text-white font-bold px-4 py-2 rounded-full shadow-md`}
              >
                {student.percentage}%
              </div>
            </div>
            <button
              onClick={() => setShowDetails(false)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 text-gray-700 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to List
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
            {student.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg text-gray-800 truncate">
              {student.name}
            </h3>
            <p className="text-sm text-gray-600">Reg No: {student.regNo}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div
            className={`${getBadgeColor(
              student.percentage
            )} text-white font-bold px-4 py-2 rounded-full shadow-md min-w-[80px] text-center`}
          >
            {student.percentage}%
          </div>
          <button
            onClick={() => {
              setShowDetails(true);
              if (onViewDetails) onViewDetails();
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors duration-200 text-blue-700 font-medium"
          >
            <Contact className="w-4 h-4" />
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

// Add Mentee Form Component
function AddMenteeForm({ onSubmit, onCancel, isLoading }) {
  const [menteeList, setMenteeList] = useState("");
  const [resetList, setResetList] = useState(false);

  const handleSubmit = () => {
    if (!menteeList.trim()) {
      alert("Please enter at least one register number");
      return;
    }

    const menteeArray = menteeList
      .split(",")
      .map((reg) => reg.trim())
      .filter((reg) => reg.length > 0);

    if (menteeArray.length === 0) {
      alert("Please enter valid register numbers");
      return;
    }

    onSubmit({
      mentee_list: menteeArray,
      reset: resetList ? "True" : "False",
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Add Mentees</h2>
        <button
          onClick={onCancel}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Register Numbers (comma separated)
          </label>
          <textarea
            value={menteeList}
            onChange={(e) => setMenteeList(e.target.value)}
            placeholder="e.g., 3122235001001, 3122235001002, 3122235001003"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows="3"
            disabled={isLoading}
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="resetList"
            checked={resetList}
            onChange={(e) => setResetList(e.target.checked)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            disabled={isLoading}
          />
          <label htmlFor="resetList" className="text-sm text-gray-700">
            Reset existing list (if unchecked, will append to existing list)
          </label>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4" />
            {isLoading ? "Updating..." : "Update Mentee List"}
          </button>
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// Main Component
function MentorListPage() {
  const [facultyDetails, setFacultyDetails] = useState(null);
  const [mentorList, setMentorList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");
      setStatus("");

      const [facultyRes, mentorRes] = await Promise.all([
        getFacultyDetails(),
        getMentorListAttendance(),
      ]);

      setFacultyDetails(facultyRes.data);
      setMentorList(mentorRes.data); // only reached if no error
    } catch (err) {
      if (err.response && err.response.status === 400) {
        const apiStatus = err.response.data.status;
        const message = err.response.data.message;

        if (apiStatus === "NM") {
          setStatus("NM");
          setError(message);
        } else if (apiStatus === "MLNT") {
          setStatus("MLNT");
          setError(message);
        } else {
          setStatus("E");
          setError(message || "Unexpected error occurred.");
        }
      } else {
        // Non-400 or unknown error
        setError("Failed to fetch data");
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateMenteeList = async (data) => {
    try {
      setIsUpdating(true);
      const response = await updateMenteeListAndReturnDetails(data);

      const { mentee_list_details, status, message } = response.data;

      // ✅ Only check the entries you just submitted
      const requestedRegs = data.mentee_list;
      const invalidEntries = requestedRegs.filter(
        (regNo) => mentee_list_details[regNo] === "Mentee details not found"
      );

      const totalEntries = requestedRegs.length;
      const validEntries = totalEntries - invalidEntries.length;

      if (status === "S") {
        if (invalidEntries.length === 0) {
          toast.success("✅ Mentee list updated successfully!");
        } else if (validEntries === 0) {
          toast.error(
            `❌ Update failed. None of the register numbers were found:\n${invalidEntries.join(
              ", "
            )}`,
            { duration: 7000 }
          );
        } else {
          toast.warning(
            `⚠️ Partial update: Some register numbers not found:\n${invalidEntries.join(
              ", "
            )}`,
            { duration: 7000 }
          );
        }

        setShowAddForm(false);
        await fetchData();
      } else {
        toast.error(`Update failed: ${message || "Unknown error"}`);
      }
    } catch (err) {
      console.error(err);
      toast.error(
        "Error updating mentee list: " +
          (err.response?.data?.message || err.message)
      );
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-lg mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Handle "Not a Mentor" case
  if (status === "NM") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-8 max-w-md w-full text-center space-y-4">
          <div className="bg-red-100 text-red-600 w-20 h-20 flex items-center justify-center rounded-full mx-auto shadow-inner">
            <GraduationCap className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Not a Mentor</h2>
          <p className="text-gray-600">You are not a Mentor. Contact Admin.</p>
        </div>
      </div>
    );
  }

  // Handle "No Mentees Added" case
  if (status === "MLNT") {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white border border-gray-200 shadow-lg rounded-2xl overflow-hidden mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
              <div className="flex items-center gap-4">
                <div className="bg-white/10 p-3 rounded-xl">
                  <Presentation className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">Mentor View</p>
                  <p className="text-blue-100 text-sm mt-1">
                    Manage Your Mentees
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* No mentees message with add form */}
          {!showAddForm ? (
            <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-8 text-center space-y-4">
              <div className="bg-yellow-100 text-yellow-600 w-20 h-20 flex items-center justify-center rounded-full mx-auto shadow-inner">
                <User className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                No Mentees Added
              </h2>
              <p className="text-gray-600">
                You haven't added any mentees yet. Click the button below to add
                your first mentees.
              </p>
              <button
                onClick={() => setShowAddForm(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Add Mentees
              </button>
            </div>
          ) : (
            <AddMenteeForm
              onSubmit={handleUpdateMenteeList}
              onCancel={() => setShowAddForm(false)}
              isLoading={isUpdating}
            />
          )}
        </div>
      </div>
    );
  }

  // Safe to call after null check
  const studentSummaries = getStudentSummaries(mentorList);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="bg-white border border-gray-200 shadow-lg rounded-2xl overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-white/10 p-3 rounded-xl">
                  <Presentation className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">Mentor View</p>
                  <p className="text-blue-100 text-sm mt-1">
                    {studentSummaries.length} Mentee
                    {studentSummaries.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add More Mentees
              </button>
            </div>
          </div>
        </div>

        {/* Add Mentee Form */}
        {showAddForm && (
          <div className="mb-6">
            <AddMenteeForm
              onSubmit={handleUpdateMenteeList}
              onCancel={() => setShowAddForm(false)}
              isLoading={isUpdating}
            />
          </div>
        )}

        {/* Student Cards */}
        <div className="space-y-4">
          {studentSummaries.length > 0 ? (
            studentSummaries.map((student, index) => (
              <StudentCard
                key={student.regNo}
                student={student}
                apiValue={mentorList}
                onViewDetails={() =>
                  console.log("Viewing details for:", student.regNo)
                }
              />
            ))
          ) : (
            <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center">
              <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No Students Found
              </h3>
              <p className="text-gray-500">
                No mentees are currently assigned to you.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MentorListPage;
