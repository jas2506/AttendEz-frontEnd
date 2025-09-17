"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Keyboard,
  Calendar,
  Clock,
  User,
  QrCode,
  NotebookText,
  X,
  Check,
  UserCheck,
  UserX,
} from "lucide-react";
import { toast } from "sonner";
import FacultyHomepageComponent from "../../projectComponents/facultyComponents/FacultyHomepageComponent";
import {
  getFacultyDetails,
  refreshTimetable,
  fetchClassCodeFromSubstitutionCode,
  generateQRCodeWithSubcode,
  generatePasscodeWithSubcode,
  saveManualAttendanceWithSubcode,
  confirmAttendanceCloseWithSubcode,
  getAllStudentDetails,
  getAllStudentDetailsWithSubcode,
  pollAttendanceWithVersion,
} from "../../TeacherApi";
import QRCode from "react-qr-code";

function FacultyHomepage() {
  const [currentDateStr, setCurrentDateStr] = useState("");
  const [details, setDetails] = useState(null);
  const [timetable, setTimetable] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [subCode, setSubCode] = useState("");
  const [showSubCodeResult, setShowSubCodeResult] = useState(false);
  const [fetchedClassCode, setFetchedClassCode] = useState("");

  // States for substitution code attendance modals
  const [showSubQRModal, setShowSubQRModal] = useState(false);
  const [showSubCodePopup, setShowSubCodePopup] = useState(false);
  const [showSubManualModal, setShowSubManualModal] = useState(false);

  // States for QR Code with subcode
  const [subQrCodes, setSubQrCodes] = useState([]);
  const [currentSubQRIndex, setCurrentSubQRIndex] = useState(0);
  const [subQrAttendance, setSubQrAttendance] = useState([]);
  const [showSaveSubQRButton, setShowSaveSubQRButton] = useState(false);
  const [subQrPollingActive, setSubQrPollingActive] = useState(false);

  // States for Passcode with subcode
  const [subGeneratedCode, setSubGeneratedCode] = useState("");
  const [subLiveAttendance, setSubLiveAttendance] = useState([]);
  const [subPollingActive, setSubPollingActive] = useState(false);

  const [selectedDay, setSelectedDay] = useState(() => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[new Date().getDay()]; // today
  });

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [detailsRes, timetableRes] = await Promise.all([
          getFacultyDetails(),
          refreshTimetable(),
        ]);
        setDetails(detailsRes.data.details);
        setTimetable(timetableRes.data.timetable);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching faculty data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const today = new Date();
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    const formatted = today.toLocaleDateString("en-US", options);
    setCurrentDateStr(formatted);
  }, []);

  useEffect(() => {
    if (!subPollingActive) return;

    let active = true;
    let currentVersion = "";

    const poll = async () => {
      if (!active) return;
      try {
        const response = await pollAttendanceWithVersion(
          fetchedClassCode,
          currentVersion
        );
        const data = response.data;
        if (active && data.status === "S" && data.attendanceRecord) {
          const updated = Object.entries(data.attendanceRecord).map(
            ([id, name]) => ({ id, name })
          );
          setSubLiveAttendance(updated);
          currentVersion = data.version || currentVersion;
        }
      } catch (err) {
        console.error("Sub polling error:", err);
      } finally {
        if (active) {
          setTimeout(poll, 3000);
        }
      }
    };

    poll();
    return () => {
      active = false;
    };
  }, [subPollingActive, fetchedClassCode]);

  // Polling for substitution QR attendance
  useEffect(() => {
    if (!subQrPollingActive) return;

    let active = true;
    let currentVersion = "";

    const poll = async () => {
      if (!active) return;
      try {
        const response = await pollAttendanceWithVersion(
          fetchedClassCode,
          currentVersion
        );
        const data = response.data;
        if (active && data.status === "S" && data.attendanceRecord) {
          const updated = Object.entries(data.attendanceRecord).map(
            ([id, name]) => ({ id, name })
          );
          setSubQrAttendance(updated);
          currentVersion = data.version || currentVersion;
        }
      } catch (err) {
        console.error("Sub QR polling error:", err);
      } finally {
        if (active) {
          setTimeout(poll, 3000);
        }
      }
    };

    poll();
    return () => {
      active = false;
    };
  }, [subQrPollingActive, fetchedClassCode]);

  // Handle fullscreen exit for QR modal
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setShowSubQRModal(false);
        setSubQrPollingActive(false);
        setShowSaveSubQRButton(false);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const handleSubCodeSubmit = async () => {
    try {
      const res = await fetchClassCodeFromSubstitutionCode(subCode);
      const data = res.data;
      if (data.status === "S") {
        setFetchedClassCode(data.classCode);
        setShowSubCodeResult(true);
      } else {
        toast.error("Invalid or expired substitution code.");
      }
    } catch (err) {
      toast.error("Error fetching class code:", err);
    }
  };

  const handleSubQRCode = async () => {
    try {
      const response = await generateQRCodeWithSubcode(
        fetchedClassCode,
        subCode
      );
      const data = response.data;
      if (data.status === "S") {
        setSubQrCodes(data.codes);
        setCurrentSubQRIndex(0);
        setSubQrAttendance([]);
        setShowSubCodeResult(false);
        setShowSubQRModal(true);
        document.documentElement.requestFullscreen();
        startSubQRSequence(data.codes);
        setSubQrPollingActive(true);
      }
    } catch (err) {
      console.error("Sub QR Code generation error:", err);
    }
  };

  const startSubQRSequence = (codes) => {
    let index = 0;
    const interval = setInterval(() => {
      index += 1;
      if (index >= codes.length) {
        clearInterval(interval);
      } else {
        setCurrentSubQRIndex(index);
      }
    }, 12000);

    setTimeout(() => {
      setShowSaveSubQRButton(true);
    }, 15000);
  };

  const confirmSubQRAttendance = async () => {
    setSubQrPollingActive(false);
    try {
      await confirmAttendanceCloseWithSubcode(fetchedClassCode, subCode);
      toast.success("QR Attendance saved.");
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
      setShowSubQRModal(false);
      setShowSaveSubQRButton(false);
    } catch (err) {
      toast.error("Error saving sub QR attendance:", err);
    }
  };

  const handleSubPasscode = async () => {
    try {
      const response = await generatePasscodeWithSubcode(
        fetchedClassCode,
        subCode
      );
      const data = response.data;
      if (data.status === "S") {
        setSubGeneratedCode(data.codes);
        setSubLiveAttendance([]);
        setShowSubCodeResult(false);
        setShowSubCodePopup(true);
        setSubPollingActive(true);
      }
    } catch (err) {
      console.error("Error generating sub passcode:", err);
    }
  };

  const confirmSubAttendance = async () => {
    setSubPollingActive(false);
    try {
      await confirmAttendanceCloseWithSubcode(fetchedClassCode, subCode);
      toast.success("Attendance confirmed and closed.");
      setShowSubCodePopup(false);
    } catch (err) {
      console.error("Error closing sub attendance:", err);
    }
  };

  const handleSubManualAttendance = () => {
    setShowSubCodeResult(false);
    setShowSubManualModal(true);
  };

  function getTodaySchedule(data, day) {
  const timetableToday = data.timetable[day];
  const classDetails = data.classDetails;

  if (!timetableToday) return [];

  const result = timetableToday.map((entry) => {
    const detail = classDetails[entry.classCode];
    const groupCode = detail.groupCode;
    const match = groupCode.match(/^([A-Z]+)\d{4}([A-Z])$/);
    const section = match ? `${match[1]}-${match[2]}` : groupCode;
    const [hourStr, minuteStr] = entry.startTime.split(":");
    const hour = Number.parseInt(hourStr, 10);
    const minute = Number.parseInt(minuteStr, 10);

    return {
      classCode: entry.classCode,
      className: detail.className,
      start: entry.startTime,
      startNumeric: hour * 60 + minute,
      duration: entry.durationMinutes,
      passoutYear: `UG-${detail.passoutYear}`,
      section,
    };
  });

  result.sort((a, b) => a.startNumeric - b.startNumeric);
  return result.map(({ startNumeric, ...rest }) => rest);
}


  const filteredSchedule =
  !isLoading && timetable && timetable.timetable && timetable.classDetails
    ? getTodaySchedule(timetable, selectedDay)
    : [];



  if (isLoading)
    return (
      <>
        <p>Loading...</p>
      </>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-4">
        {/* Header Section */}
        <div className="bg-white border border-gray-200 shadow-lg rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="bg-white/10 p-3 rounded-xl">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">
                    Hello, {details.name} 👋
                  </p>
                  <p className="text-blue-100 mt-1">
                    {details.position} • {details.department} Department
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                <Calendar className="w-4 h-4 text-white" />
                <span className="text-white font-medium">{currentDateStr}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Substitution Code Section */}
        <div className="bg-white border border-gray-200 shadow-lg rounded-2xl p-4">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Substitution Code
            </h2>
            <p className="text-gray-600 text-sm">
              Enter Code for Substitution if any
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="relative flex-1 w-full">
              <Keyboard className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                value={subCode}
                onChange={(e) => setSubCode(e.target.value)}
                placeholder="Enter Substitution Code"
                className="pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
              />
            </div>
            <button
              onClick={handleSubCodeSubmit}
              className="cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg w-full md:w-auto"
            >
              Submit Code
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2 mb-4">
  <span className="font-semibold">Select Day:</span>
  <Select value={selectedDay} onValueChange={setSelectedDay}>
    <SelectTrigger className="w-[150px]">
      <SelectValue placeholder="Select a day" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="Monday">Monday</SelectItem>
      <SelectItem value="Tuesday">Tuesday</SelectItem>
      <SelectItem value="Wednesday">Wednesday</SelectItem>
      <SelectItem value="Thursday">Thursday</SelectItem>
      <SelectItem value="Friday">Friday</SelectItem>
    </SelectContent>
  </Select>
</div>

        {/* Today's Schedule Section */}
        <div className="bg-white border border-gray-200 shadow-lg rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Today's Schedule
                </h2>
                <p className="text-gray-600 text-sm">Your classes for today</p>
              </div>
            </div>
          </div>
          <div className="p-4">
            {filteredSchedule.length === 0 ? (
              <div className="text-center py-12">
                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500 text-base font-medium">
                  No classes scheduled for today
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  Enjoy your free day!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredSchedule.map((course, index) => (
                  <FacultyHomepageComponent key={index} c={course} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Substitution Code Action Popup */}
      {showSubCodeResult && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-10 backdrop-blur-sm bg-black/20">
          <div className="w-[90%] md:w-[500px] bg-white border border-blue-300 rounded-2xl shadow-xl p-6">
            <div className="text-center space-y-4">
              <h2 className="text-lg font-bold text-blue-700">
                Class Code: {fetchedClassCode}
              </h2>
              <p className="text-gray-600 text-sm mb-6">
                Choose an attendance method for this substitution class
              </p>

              {/* <div className="grid gap-3">
                <button
                  onClick={handleSubQRCode}
                  className="flex items-center justify-center gap-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors"
                >
                  <QrCode className="w-5 h-5" />
                  Generate QR Code
                </button>

                <button
                  onClick={handleSubPasscode}
                  className="flex items-center justify-center gap-3 w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition-colors"
                >
                  <Keyboard className="w-5 h-5" />
                  Generate Passcode
                </button>

                <button
                  onClick={handleSubManualAttendance}
                  className="flex items-center justify-center gap-3 w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg transition-colors"
                >
                  <NotebookText className="w-5 h-5" />
                  Manual Attendance
                </button>
              </div> */}
              <div>
                <h3 className="text-sm font-semibold text-gray-800 mb-2">
                  Quick Actions
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <button
                    onClick={handleSubQRCode}
                    className="flex flex-col items-center justify-center p-3 bg-white border border-gray-300 shadow-sm hover:shadow-md text-black rounded-lg transition-all"
                  >
                    <QrCode className="w-5 h-5 mb-1" />
                    <span className="text-sm font-medium">Generate QR</span>
                    <span className="text-xs opacity-80">
                      QR code attendance
                    </span>
                  </button>

                  <button
                    onClick={handleSubPasscode}
                    className="flex flex-col items-center justify-center p-3 bg-white border border-gray-300 shadow-sm hover:shadow-md text-black rounded-lg transition-all"
                  >
                    <Keyboard className="w-5 h-5 mb-1" />
                    <span className="text-sm font-medium">Generate Code</span>
                    <span className="text-xs opacity-80">Attendance code</span>
                  </button>

                  <button
                    onClick={() => setShowSubManualModal(true)} // or handleManualEntry
                    className="flex flex-col items-center justify-center p-3 bg-white border border-gray-300 shadow-sm hover:shadow-md text-black rounded-lg transition-all"
                  >
                    <NotebookText className="w-5 h-5 mb-1" />
                    <span className="text-sm font-medium">Manual Entry</span>
                    <span className="text-xs opacity-80">Mark manually</span>
                  </button>
                </div>
              </div>

              <button
                onClick={() => setShowSubCodeResult(false)}
                className="mt-4 w-full text-gray-500 hover:text-gray-700 py-2 text-sm transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Substitution Passcode Popup */}
      {showSubCodePopup && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-10 backdrop-blur-sm bg-black/20">
          <div className="w-[90%] md:w-[500px] bg-white border border-blue-300 rounded-2xl shadow-xl p-6">
            <div className="text-center space-y-4">
              <h2 className="text-lg font-bold text-blue-700">
                Substitution Code Generated
              </h2>
              <p className="text-3xl font-mono tracking-widest bg-blue-50 py-2 px-4 rounded-lg border border-blue-200 inline-block">
                {subGeneratedCode}
              </p>
              <div className="text-left mt-6">
                <h3 className="text-md font-semibold mb-2">
                  Students Marked Present:
                </h3>
                <ul className="max-h-[200px] overflow-y-auto space-y-2">
                  {subLiveAttendance.map((s) => (
                    <li key={s.id} className="flex items-center gap-3">
                      <UserCheck className="w-4 h-4 text-green-600" />
                      <span>
                        {s.name} ({s.id})
                      </span>
                    </li>
                  ))}
                  {subLiveAttendance.length === 0 && (
                    <p className="text-sm text-gray-500">No responses yet.</p>
                  )}
                </ul>
              </div>
              <button
                onClick={confirmSubAttendance}
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Confirm & Save Attendance
              </button>
              <button
                onClick={() => {
                  setSubPollingActive(false);
                  setShowSubCodePopup(false);
                }}
                className="w-full mt-2 text-sm text-red-500 hover:underline"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Substitution QR Modal */}
      {showSubQRModal && (
        <div className="fixed inset-0 z-50 bg-black/90 flex flex-row items-center justify-center text-white p-4">
          <div className="w-full max-w-6xl h-[80vh] flex flex-row">
            {/* QR Code Section */}
            <div className="flex-3 flex items-center justify-center">
              <div className="flex flex-col items-center justify-center bg-white px-4 rounded-xl">
                <QRCode
                  value={subQrCodes[currentSubQRIndex] || ""}
                  size={Math.min(
                    800, // Increase size to make the QR code even larger
                    window.innerWidth * 0.8, // Allow up to 80% of the screen width
                    window.innerHeight * 0.75 // 75% of screen height
                  )}
                  className="mb-6 mt-6"
                  bgColor="white"
                  fgColor="#000000"
                  level="H"
                />
                <p className="text-black text-2xl mb-4 font-mono font-bold break-all text-center max-w-[90%]">
                  {subQrCodes[currentSubQRIndex]}
                </p>
              </div>
            </div>

            {/* Students List Section */}
            <div className="w-[280px] bg-white rounded-xl p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-black">
                  Students Marked Present:
                </h3>
                <div className="flex-1 overflow-y-auto">
                  {subQrAttendance.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">
                      No responses yet.
                    </p>
                  ) : (
                    <ul className="space-y-3">
                      {subQrAttendance.map((s) => (
                        <li
                          key={s.id}
                          className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                        >
                          <UserCheck className="w-5 h-5 text-green-600 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <span className="text-black font-medium block truncate">
                              {s.name}
                            </span>
                            <span className="text-gray-600 text-sm">
                              ({s.id})
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Footer Button - Positioned Below Students List */}
              {showSaveSubQRButton && (
                <div className="mt-4">
                  <button
                    onClick={confirmSubQRAttendance}
                    className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl text-white font-semibold text-lg transition-colors w-full"
                  >
                    Save Attendance
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Substitution Manual Attendance Modal */}
      {showSubManualModal && (
        <SubManualAttendanceModal
          classCode={fetchedClassCode}
          subCode={subCode}
          onClose={() => setShowSubManualModal(false)}
        />
      )}
    </div>
  );
}

// Substitution Manual Attendance Modal Component
function SubManualAttendanceModal({ classCode, subCode, onClose }) {
  const [students, setStudents] = useState({});
  const [attendance, setAttendance] = useState({});

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await getAllStudentDetailsWithSubcode(classCode, subCode);
        const data = res.data;
        setStudents(data.details);
        const initialStatus = {};
        for (const id in data.details) {
          initialStatus[id] = null;
        }
        setAttendance(initialStatus);
      } catch (err) {
        console.error("Error fetching student details:", err);
      }
    };
    fetchStudents();
  }, [classCode, subCode]);

  const markAttendance = (id, status) => {
    setAttendance((prev) => ({ ...prev, [id]: status }));
  };

  // NEW: Mark All Present
  const markAllPresent = () => {
    const updated = {};
    for (const id in students) updated[id] = "present";
    setAttendance(updated);
  };

  // NEW: Mark All Absent
  const markAllAbsent = () => {
    const updated = {};
    for (const id in students) updated[id] = "absent";
    setAttendance(updated);
  };

  const handleSave = () => {
    const present = [];
    const absent = [];
    for (const id in attendance) {
      if (attendance[id] === "present") present.push(id);
      else if (attendance[id] === "absent") absent.push(id);
    }

    saveManualAttendanceWithSubcode(classCode, present, absent, subCode)
      .then(() => {
        toast.success("Substitution attendance saved and closed!");
        onClose();
      })
      .catch((err) => {
        toast.error("Error saving substitution manual attendance:", err);
      });
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[90%] md:w-[600px] max-h-[80vh] overflow-y-auto relative shadow-2xl border border-gray-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors duration-200 p-1 rounded-full hover:bg-gray-100"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold mb-6 text-blue-700 flex items-center gap-2">
          <NotebookText className="w-6 h-6" />
          Substitution Manual Attendance
        </h2>

        {/* NEW: Mark All Buttons */}
        <div className="flex gap-3 mb-4">
          <button
            onClick={markAllPresent}
            className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
          >
            Mark All Present
          </button>
          <button
            onClick={markAllAbsent}
            className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
          >
            Mark All Absent
          </button>
        </div>

        <div className="space-y-4">
          {Object.entries(students)
            .sort(([id1], [id2]) => id1.localeCompare(id2))
            .map(([id, name]) => (
              <div
                key={id}
                className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-sm">
                      {name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{name}</p>
                    <p className="text-sm text-gray-500">{id}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => markAttendance(id, "present")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      attendance[id] === "present"
                        ? "bg-green-500 text-white shadow-md transform scale-105"
                        : "bg-green-100 text-green-700 hover:bg-green-200 border border-green-300"
                    }`}
                  >
                    <UserCheck className="w-4 h-4" />
                    Present
                  </button>
                  <button
                    onClick={() => markAttendance(id, "absent")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      attendance[id] === "absent"
                        ? "bg-red-500 text-white shadow-md transform scale-105"
                        : "bg-red-100 text-red-700 hover:bg-red-200 border border-red-300"
                    }`}
                  >
                    <UserX className="w-4 h-4" />
                    Absent
                  </button>
                </div>
              </div>
            ))}
        </div>

        <button
          className="mt-6 w-full bg-blue-600 text-white hover:bg-blue-700 py-3 text-lg font-semibold rounded-xl transition-all duration-200 hover:shadow-lg flex items-center justify-center gap-2"
          onClick={handleSave}
        >
          <Check className="w-5 h-5" />
          Save Substitution Attendance
        </button>
      </div>
    </div>
  );
}

export default FacultyHomepage;
