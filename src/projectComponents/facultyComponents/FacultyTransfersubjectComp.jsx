import {
  BookOpen,
  Users,
  Trash2,
  Calendar,
  UserCheck,
  Eye,
  BarChart3,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import {
  getLectureAttendanceByClassCode,
  getStudentAttendanceByClassCode,
  transferClass,
  dropClass,
} from "../../TeacherApi";
import LectureDetailsModal from "./FlipAttendanceComp"; // adjust path accordingly

async function viewStudents(classcode) {
  try {
    // Step 1: Get the attendance data from API
    const response = await getStudentAttendanceByClassCode({ classcode });
    const sample = response.data;

    // Step 2: Process student data
    const students = [];
    for (const [studentId, studentData] of Object.entries(sample.details)) {
      const attendanceData = studentData.attendance[classcode];
      if (!attendanceData) continue;

      const lecturesAttended = [];
      let totalLectures = 0;
      let attendedCount = 0;

      for (const [lectureKey, lectureData] of Object.entries(attendanceData)) {
        if (!lectureKey.startsWith("lecture.")) continue;

        totalLectures++;
        if (lectureData.present === 1) {
          attendedCount++;
          lecturesAttended.push({ lectureKey, date: lectureData.date });
        }
      }

      const attendancePercentage =
        totalLectures > 0
          ? ((attendedCount / totalLectures) * 100).toFixed(1)
          : 0;

      students.push({
        id: studentId,
        name: studentData.name,
        lecturesAttended,
        attendancePercentage,
        totalLectures,
        attendedCount,
      });
    }

    return students;
  } catch (error) {
    console.error("Failed to fetch student attendance:", error);
    return [];
  }
}

async function calculateStatsForLecture(classCode) {
  try {
    // Step 1: Fetch lecture attendance data from API
    const response = await getLectureAttendanceByClassCode({
      classcode: classCode,
    });
    const sampleapidata = response.data;

    const lectures = [];

    // Step 2: Extract total student count (based on any lecture's attendance)
    const firstLecture = Object.values(sampleapidata.details)[0];
    const totalStudents = Object.keys(firstLecture?.attendance || {}).length;

    // Step 3: Collect and format each lecture entry
    for (const [key, lecture] of Object.entries(sampleapidata.details)) {
      if (!key.startsWith("lecture.")) continue;

      const attended = Object.values(lecture.attendance).filter(
        (v) => v === 1
      ).length;
      const percent = ((attended / totalStudents) * 100).toFixed(1);

      const dateStr = lecture.date.toString();
      const formattedDate = `${dateStr.slice(6, 8)}/${dateStr.slice(
        4,
        6
      )}/${dateStr.slice(0, 4)}`;

      const timeStr = lecture.time.toString().padStart(6, "0");
      const formattedTime = `${timeStr.slice(0, 2)}:${timeStr.slice(
        2,
        4
      )}:${timeStr.slice(4, 6)}`;

      lectures.push({
        name: key,
        date: formattedDate,
        time: formattedTime,
        attended,
        total: totalStudents,
        percent,
        lectureNumber: parseInt(key.split(".")[1]), // for sorting
      });
    }

    // Step 4: Sort lectures by lecture number
    lectures.sort((a, b) => a.lectureNumber - b.lectureNumber);

    // Step 5: Return final lecture stats without the internal lectureNumber
    return lectures.map(({ lectureNumber, ...rest }) => rest);
  } catch (error) {
    console.error("Failed to fetch lecture stats:", error);
    return [];
  }
}

// Custom Modal Component
function FullScreenModal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with blur */}
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Modal Content */}
      <div className="relative w-full h-full max-w-7xl max-h-[95vh] mx-4 my-4 bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>
        {/* Scrollable content with custom scrollbar */}
        <div
          className="h-full overflow-y-auto"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#d1d5db #f3f4f6",
          }}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              width: 8px;
            }
            div::-webkit-scrollbar-track {
              background: #f3f4f6;
            }
            div::-webkit-scrollbar-thumb {
              background: #d1d5db;
              border-radius: 4px;
            }
            div::-webkit-scrollbar-thumb:hover {
              background: #9ca3af;
            }
          `}</style>
          {children}
        </div>
      </div>
    </div>
  );
}

// Small Popup Modal Component
function SmallModal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with blur */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Modal Content */}
      <div className="relative w-full max-w-md mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>
        {children}
      </div>
    </div>
  );
}

function FacultyTransfersubjectComp({ c, onTransferSuccess }) {
  const classdetails = c;

  const [lectureStatsOpen, setLectureStatsOpen] = useState(false);
  const [studentsOpen, setStudentsOpen] = useState(false);
  const [transferModalOpen, setTransferModalOpen] = useState(false);
  const [responseModalOpen, setResponseModalOpen] = useState(false);

  const [stats, setStats] = useState([]);
  const [students, setStudents] = useState([]);
  const [newFacEmail, setNewFacEmail] = useState("");
  const [transferResponse, setTransferResponse] = useState(null);
  const [isTransferring, setIsTransferring] = useState(false);

  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleteResponse, setDeleteResponse] = useState(null);
  const [deleteResponseOpen, setDeleteResponseOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  //for the flip attendance part
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [rawLectureDetails, setRawLectureDetails] = useState({});

  const handleDeleteClass = async () => {
    setIsDeleting(true);
    try {
      const response = await dropClass({ classCode: classdetails.classCode });

      let result;
      if (response.status === 200 && response.data?.status === "S") {
        result = response.data;
      } else {
        result = {
          status: "E",
          message: response.data?.message || "Failed to drop class.",
        };
      }

      setDeleteResponse(result);
    } catch (error) {
      console.error("Drop class error:", error);
      setDeleteResponse({
        status: "E",
        message:
          error.response?.data?.message ||
          error.message ||
          "An error occurred.",
      });
    } finally {
      setIsDeleting(false);
      setDeleteConfirmOpen(false);
      setDeleteResponseOpen(true);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const response = await getLectureAttendanceByClassCode({
        classcode: classdetails.classCode,
      });
      const details = response.data.details;

      const statsData = await calculateStatsForLecture(classdetails.classCode);
      const studentsData = await viewStudents(classdetails.classCode);

      setRawLectureDetails(details);
      setStats(statsData);
      setStudents(studentsData);
    }

    fetchData();
  }, [classdetails.classCode]);

  const refreshLectureStats = async () => {
    const response = await getLectureAttendanceByClassCode({
      classcode: classdetails.classCode,
    });
    const details = response.data.details;

    const statsData = await calculateStatsForLecture(classdetails.classCode);
    const studentsData = await viewStudents(classdetails.classCode);

    setRawLectureDetails(details);
    setStats(statsData);
    setStudents(studentsData);
  };

  // Add this function inside your FacultyTransfersubjectComp component
  const handleCloseResponseModal = () => {
    setResponseModalOpen(false);

    // If the transfer was successful, refresh the page after closing the modal
    if (transferResponse?.status === "S" && onTransferSuccess) {
      onTransferSuccess();
    }
  };

  // Updated handleTransfer function that accepts onTransferSuccess prop
  const handleTransfer = async () => {
    if (!newFacEmail.trim()) {
      alert("Please enter a valid email address");
      return;
    }

    setIsTransferring(true);

    try {
      const response = await transferClass({
        classCode: classdetails.classCode,
        newFacEmail: newFacEmail.trim(),
      });

      // Check if the response is successful
      // Handle different response formats
      let transferResult;

      if (response.status === 200 || response.status === "200") {
        // If HTTP status is 200, consider it successful
        transferResult = {
          status: "S",
          message:
            response.data?.message ||
            response.message ||
            "The subject has been transferred successfully to the new faculty member.",
        };
      } else if (response.status === "S") {
        // If the response has status "S", it's successful
        transferResult = response;
      } else if (response.data && response.data.status === "S") {
        // If the response data has status "S", it's successful
        transferResult = response.data;
      } else {
        // Otherwise, treat as error
        transferResult = {
          status: "E",
          message:
            response.data?.message ||
            response.message ||
            "Failed to transfer class. Please try again.",
        };
      }

      setTransferResponse(transferResult);
      setTransferModalOpen(false);
      setResponseModalOpen(true);
      setNewFacEmail("");

      // Don't refresh immediately - let the user see the success modal first
    } catch (error) {
      console.error("Transfer failed:", error);

      // Check if it's actually a successful response wrapped in an error
      if (error.response && error.response.status === 200) {
        const successResult = {
          status: "S",
          message:
            error.response.data?.message ||
            "The subject has been transferred successfully to the new faculty member.",
        };
        setTransferResponse(successResult);

        // Don't refresh immediately - let the user see the success modal first
      } else {
        setTransferResponse({
          status: "E",
          message:
            error.response?.data?.message ||
            error.message ||
            "Failed to transfer class. Please try again.",
        });
      }

      setTransferModalOpen(false);
      setResponseModalOpen(true);
    } finally {
      setIsTransferring(false);
    }
  };

  const totalLectures = stats.length;
  const avgAttendance = totalLectures
    ? (
        stats.reduce((acc, s) => acc + parseFloat(s.percent), 0) / totalLectures
      ).toFixed(1)
    : 0;

  return (
    <>
      <div className="rounded-2xl border border-gray-300 bg-white shadow-md overflow-hidden p-4 md:p-5 w-full max-w-7xl mx-auto">
        <div className="flex flex-col gap-3 mb-3">
          {/* Class Info */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-bold text-blue-600">
                {classdetails.className}
              </h2>
            </div>
            <div className="flex flex-wrap gap-3 text-gray-600 text-sm">
              <div className="flex items-center gap-1">
                <span>{classdetails.classCode}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-medium">Section:</span>
                <span>{classdetails.section}</span>
              </div>
              <div className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium">
                {classdetails.year}
              </div>
            </div>
          </div>

          {/* Buttons Group */}
          <div className="flex flex-wrap gap-3 mt-2">
            <Button
              onClick={() => setLectureStatsOpen(true)}
              className="flex-grow md:flex-grow-0 min-w-[140px] flex items-center gap-2 text-sm text-green-700 border-green-200 bg-green-50 hover:bg-green-100"
            >
              <BarChart3 className="w-4 h-4" />
              View Lecture Wise Attendance
            </Button>

            <Button
              onClick={() => setStudentsOpen(true)}
              className="flex-grow md:flex-grow-0 min-w-[120px] flex items-center gap-2 text-sm text-purple-700 border-purple-200 bg-purple-50 hover:bg-purple-100"
            >
              <Eye className="w-4 h-4" />
              View Students
            </Button>

            <Button
              onClick={() => setTransferModalOpen(true)}
              className="flex-grow md:flex-grow-0 min-w-[160px] flex items-center gap-2 text-sm text-blue-700 border-blue-200 bg-blue-50 hover:bg-blue-100"
            >
              <Users className="w-4 h-4" />
              Transfer to another Faculty
            </Button>

            <Button
              onClick={() => setDeleteConfirmOpen(true)}
              className="flex-grow md:flex-grow-0 min-w-[100px] flex items-center gap-2 text-sm text-red-600 border-red-200 bg-red-50 hover:bg-red-100"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </Button>
          </div>
        </div>
      </div>

      <SmallModal
        isOpen={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
      >
        <div className="p-6 space-y-4 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trash2 className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-xl font-bold text-red-800 mb-2">
            Confirm Deletion
          </h3>
          <p className="text-gray-600 text-sm">
            Are you sure you want to delete this class? This action cannot be
            undone.
          </p>

          <div className="flex gap-3 pt-4">
            <Button
              onClick={() => setDeleteConfirmOpen(false)}
              className="flex-1 bg-gray-100 text-gray-700 hover:bg-gray-200"
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteClass}
              className="flex-1 bg-red-600 text-white hover:bg-red-700"
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
      </SmallModal>

      <SmallModal
        isOpen={deleteResponseOpen}
        onClose={() => setDeleteResponseOpen(false)}
      >
        <div className="p-6 space-y-4 text-center">
          {deleteResponse?.status === "S" ? (
            <>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserCheck className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-green-800 mb-2">
                Class Deleted!
              </h3>
              <p className="text-green-700 text-sm">{deleteResponse.message}</p>
            </>
          ) : (
            <>
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <X className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-red-800 mb-2">
                Deletion Failed
              </h3>
              <p className="text-red-700 text-sm">
                {deleteResponse?.message ||
                  "An error occurred while deleting the class."}
              </p>
            </>
          )}
          <div className="pt-4">
            <Button
              onClick={() => {
                setDeleteResponseOpen(false);
                if (deleteResponse?.status === "S" && onTransferSuccess) {
                  onTransferSuccess(); // reuse the same callback to refresh list
                }
              }}
              className="w-full bg-gray-600 text-white hover:bg-gray-700"
            >
              Close
            </Button>
          </div>
        </div>
      </SmallModal>

      {/* Transfer Modal */}
      <SmallModal
        isOpen={transferModalOpen}
        onClose={() => setTransferModalOpen(false)}
      >
        <div className="p-6 space-y-4">
          <div className="text-center">
            <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Transfer Class to Another Faculty
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Enter the email address of the faculty member you want to transfer
              this class to.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Faculty Email
              </label>
              <input
                type="email"
                value={newFacEmail}
                onChange={(e) => setNewFacEmail(e.target.value)}
                placeholder="Enter faculty email address"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isTransferring}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                onClick={() => setTransferModalOpen(false)}
                className="flex-1 bg-gray-100 text-gray-700 hover:bg-gray-200"
                disabled={isTransferring}
              >
                Cancel
              </Button>
              <Button
                onClick={handleTransfer}
                className="flex-1 bg-blue-600 text-white hover:bg-blue-700"
                disabled={isTransferring || !newFacEmail.trim()}
              >
                {isTransferring ? "Transferring..." : "Transfer"}
              </Button>
            </div>
          </div>
        </div>
      </SmallModal>

      {/* Response Modal */}
      <SmallModal isOpen={responseModalOpen} onClose={handleCloseResponseModal}>
        <div className="p-6 space-y-4">
          <div className="text-center">
            {transferResponse ? (
              transferResponse.status === "S" ? (
                <>
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <UserCheck className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-green-800 mb-2">
                    Transfer Successful!
                  </h3>
                  <p className="text-green-700 text-sm">
                    {transferResponse.message ||
                      "The subject has been transferred successfully to the new faculty member."}
                  </p>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <X className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold text-red-800 mb-2">
                    Transfer Failed
                  </h3>
                  <p className="text-red-700 text-sm">
                    {transferResponse.message ||
                      "There was an error transferring the subject. Please try again or contact support."}
                  </p>
                </>
              )
            ) : (
              <div className="text-center text-gray-600 text-sm">
                Processing response...
              </div>
            )}
          </div>

          <div className="pt-4">
            <Button
              onClick={handleCloseResponseModal}
              className="w-full bg-gray-600 text-white hover:bg-gray-700"
            >
              Close
            </Button>
          </div>
        </div>
      </SmallModal>

      {/* Lecture Stats Modal */}
      <FullScreenModal
        isOpen={lectureStatsOpen}
        onClose={() => setLectureStatsOpen(false)}
      >
        <div className="p-8 space-y-6">
          {/* Header */}
          <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
            <BarChart3 className="w-8 h-8 text-green-600" />
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Lecture Wise Attendance Summary
              </h2>
              <p className="text-gray-600">
                {classdetails.className} - {classdetails.classCode}
              </p>
            </div>
          </div>

          {/* Overall Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-green-50 rounded-xl p-6 text-center border border-green-200">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {totalLectures}
              </div>
              <div className="text-sm text-gray-600 font-medium">
                Total Lectures
              </div>
            </div>
            <div className="bg-blue-50 rounded-xl p-6 text-center border border-blue-200">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {avgAttendance}%
              </div>
              <div className="text-sm text-gray-600 font-medium">
                Average Attendance
              </div>
            </div>
            <div className="bg-purple-50 rounded-xl p-6 text-center border border-purple-200">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {students.length}
              </div>
              <div className="text-sm text-gray-600 font-medium">
                Total Students
              </div>
            </div>
          </div>

          {/* Attendance Table */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">
                      Lecture
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Date
                      </div>
                    </th>
                    <th className="px-6 py-4 text-center font-semibold text-gray-700">
                      Attended
                    </th>
                    <th className="px-6 py-4 text-center font-semibold text-gray-700">
                      Total
                    </th>
                    <th className="px-6 py-4 text-center font-semibold text-gray-700">
                      Attendance Rate
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {stats.map((s, index) => (
                    <tr
                      key={s.name}
                      className={`border-b border-gray-100 ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-gray-100 transition-colors`}
                    >
                      <td
                        className="px-6 py-4 font-medium text-green-700 cursor-pointer hover:underline"
                        onClick={() => setSelectedLecture(s.name)}
                      >
                        {s.name}
                      </td>

                      <td className="px-6 py-4 text-gray-600">{s.date}</td>
                      <td className="px-6 py-4 text-center font-medium text-lg">
                        {s.attended}
                      </td>
                      <td className="px-6 py-4 text-center text-lg">
                        {s.total}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`inline-flex px-4 py-2 rounded-full text-sm font-semibold ${
                            parseFloat(s.percent) >= 75
                              ? "bg-green-100 text-green-800"
                              : parseFloat(s.percent) >= 50
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {s.percent}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </FullScreenModal>

      {/* Students Modal */}
      <FullScreenModal
        isOpen={studentsOpen}
        onClose={() => setStudentsOpen(false)}
      >
        <div className="p-8 space-y-6">
          {/* Header */}
          <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
            <Users className="w-8 h-8 text-purple-600" />
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Student Attendance Records
              </h2>
              <p className="text-gray-600">
                {classdetails.className} - {classdetails.classCode}
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-purple-50 rounded-xl p-6 text-center border border-purple-200">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {students.length}
              </div>
              <div className="text-sm text-gray-600 font-medium">
                Total Students
              </div>
            </div>
            <div className="bg-green-50 rounded-xl p-6 text-center border border-green-200">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {
                  students.filter(
                    (s) => parseFloat(s.attendancePercentage) >= 75
                  ).length
                }
              </div>
              <div className="text-sm text-gray-600 font-medium">
                Students with ≥75% Attendance
              </div>
            </div>
            <div className="bg-red-50 rounded-xl p-6 text-center border border-red-200">
              <div className="text-3xl font-bold text-red-600 mb-2">
                {
                  students.filter(
                    (s) => parseFloat(s.attendancePercentage) < 50
                  ).length
                }
              </div>
              <div className="text-sm text-gray-600 font-medium">
                Students with &lt;50% Attendance
              </div>
            </div>
          </div>

          {/* Student Table */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">
                      Student ID
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">
                      Name
                    </th>
                    <th className="px-6 py-4 text-center font-semibold text-gray-700">
                      Total Lectures
                    </th>
                    <th className="px-6 py-4 text-center font-semibold text-gray-700">
                      Attended
                    </th>
                    <th className="px-6 py-4 text-center font-semibold text-gray-700">
                      Attendance %
                    </th>
                    <th className="px-6 py-4 text-center font-semibold text-gray-700">
                      Lectures Attended
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((s, index) => (
                    <tr
                      key={s.id}
                      className={`border-b border-gray-100 ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-gray-100 transition-colors`}
                    >
                      <td className="px-6 py-4 font-medium text-purple-700">
                        {s.id}
                      </td>
                      <td className="px-6 py-4 text-gray-800">{s.name}</td>
                      <td className="px-6 py-4 text-center">
                        {s.totalLectures}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {s.attendedCount}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`inline-flex px-4 py-2 rounded-full text-sm font-semibold ${
                            parseFloat(s.attendancePercentage) >= 75
                              ? "bg-green-100 text-green-800"
                              : parseFloat(s.attendancePercentage) >= 50
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {s.attendancePercentage}%
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex flex-wrap justify-center gap-2">
                          {s.lecturesAttended.map((l) => {
                            const lecNum = l.lectureKey.replace(
                              "lecture.",
                              "L"
                            );
                            return (
                              <span
                                key={l}
                                className="bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm"
                              >
                                {`${lecNum} - ${l.date}`}
                              </span>
                            );
                          })}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </FullScreenModal>
      {selectedLecture && rawLectureDetails && (
        <LectureDetailsModal
          lectureKey={selectedLecture}
          lectureData={rawLectureDetails[selectedLecture]}
          studentMap={rawLectureDetails["student-details"].map}
          classCode={classdetails.classCode}
          onClose={() => {
            setSelectedLecture(null);
            refreshLectureStats(); // Reflects changes immediately
          }}
        />
      )}
    </>
  );
}

export default FacultyTransfersubjectComp;
