import React, { useState, useEffect } from "react";
import {
  Clock,
  NotebookText,
  UsersRound,
  QrCode,
  Keyboard,
  BookOpen,
  X,
  Check,
  UserCheck,
  UserX,
} from "lucide-react";
import QRCode from "react-qr-code";
import { toast } from "sonner";
import {
  generateQRCode,
  generatePasscode,
  confirmAttendanceClose,
  pollAttendanceWithVersion,
  getAllStudentDetails,
  saveManualAttendance,
} from "../../TeacherApi";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

function FacultyHomepageComponent({ c }) {
  const classdetails = c;

  const endTime = new Date(`2000-01-01 ${classdetails.start}`);
  endTime.setMinutes(endTime.getMinutes() + classdetails.duration);
  const formattedEndTime = endTime.toTimeString().slice(0, 5);

  // State for modals and popups
  const [showManualModal, setShowManualModal] = useState(false);
  const [showCodePopup, setShowCodePopup] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);

  // State for Passcode Attendance
  const [generatedCode, setGeneratedCode] = useState("");
  const [liveAttendance, setLiveAttendance] = useState([]);
  const [pollingActive, setPollingActive] = useState(false);

  const [countdown, setCountdown] = useState(36);

  useEffect(() => {
    let timer;
    if (showQRModal) {
      setCountdown(36); // reset when modal opens
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [showQRModal]);

  // State for QR Code Attendance
  const [qrCodes, setQrCodes] = useState([]);
  const [currentQRIndex, setCurrentQRIndex] = useState(0);
  const [qrAttendance, setQrAttendance] = useState([]);
  const [showSaveQRButton, setShowSaveQRButton] = useState(false);
  const [qrPollingActive, setQrPollingActive] = useState(false);

  const [showSubCodePopup, setShowSubCodePopup] = useState(false);
  const [substitutionCode, setSubstitutionCode] = useState("");
  useEffect(() => {
    if (!pollingActive) {
      return;
    }

    let active = true;
    let currentVersion = "";

    const poll = async () => {
      if (!active) return;

      try {
        const response = await pollAttendanceWithVersion(
          classdetails.classCode,
          currentVersion
        );
        const data = response.data;

        if (active && data.status === "S" && data.attendanceRecord) {
          const updated = Object.entries(data.attendanceRecord).map(
            ([id, name]) => ({ id, name })
          );
          setLiveAttendance(updated);
          currentVersion = data.version || currentVersion;
        }
      } catch (err) {
        console.error("Polling error:", err);
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
  }, [pollingActive, classdetails.classCode]);

  useEffect(() => {
    if (!qrPollingActive) {
      return;
    }

    let active = true;
    let currentVersion = "";

    const poll = async () => {
      if (!active) return;

      try {
        const response = await pollAttendanceWithVersion(
          classdetails.classCode,
          currentVersion
        );
        const data = response.data;
        if (active && data.status === "S" && data.attendanceRecord) {
          const updated = Object.entries(data.attendanceRecord).map(
            ([id, name]) => ({ id, name })
          );
          setQrAttendance(updated);
          currentVersion = data.version || currentVersion;
        }
      } catch (err) {
        console.error("QR polling error:", err);
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
  }, [qrPollingActive, classdetails.classCode]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setShowQRModal(false);
        setQrPollingActive(false);
        setShowSaveQRButton(false);
      }
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const generateQRCodee = async () => {
    try {
      const response = await generateQRCode(classdetails.classCode);
      const data = response.data;
      if (data.status === "S") {
        setQrCodes(data.codes);
        setCurrentQRIndex(0);
        setQrAttendance([]);
        setShowQRModal(true);
        document.documentElement.requestFullscreen();
        startQRSequence(data.codes);
        setQrPollingActive(true);
      }
    } catch (err) {
      console.error("QR Code generation error:", err);
    }
  };

  const startQRSequence = (codes) => {
    let index = 0;
    const interval = setInterval(() => {
      index += 1;
      if (index >= codes.length) {
        clearInterval(interval);
      } else {
        setCurrentQRIndex(index);
      }
    }, 12000);

    setTimeout(() => {
      setShowSaveQRButton(true);
    }, 15000);
  };

  const confirmQRAttendance = async () => {
    setQrPollingActive(false);
    try {
      await confirmAttendanceClose(classdetails.classCode);

      toast.success("QR Attendance saved.");

      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
      setShowQRModal(false);
      setShowSaveQRButton(false);
    } catch (err) {
      console.error("Error saving QR attendance:", err);
      toast.error("Failed to save QR Attendance.");
    }
  };

  const generatePasscodee = async () => {
    try {
      const { data } = await generatePasscode(classdetails.classCode);

      setGeneratedCode(data.codes);
      setLiveAttendance([]);
      setShowCodePopup(true);
      setPollingActive(true);
    } catch (err) {
      console.error("Error generating passcode:", err);
    }
  };

  const confirmAttendance = async () => {
    setPollingActive(false);
    try {
      await confirmAttendanceClose(classdetails.classCode);

      toast.success("Attendance confirmed and closed.");
      setShowCodePopup(false);
    } catch (err) {
      toast.error("Error closing attendance:", err);
    }
  };
  const generateSubstitutionCode = async () => {
    try {
      const today = new Date().toISOString().slice(0, 10);
      const res = await fetch(
        `${backendUrl}/faculty/createSubstitutionCode?classCode=${classdetails.classCode}&dateOfUse=${today}`,
        {
          method: "POST",
          headers: {
            Authorization: localStorage.getItem("facultyToken"),
          },
        }
      );
      const data = await res.json();
      if (data.status === "S") {
        setSubstitutionCode(data.substitutionCode);
        setShowSubCodePopup(true);
      } else {
        toast.error("Failed to generate substitution code.");
      }
    } catch (err) {
      console.error("Error generating substitution code:", err);
    }
  };
  return (
    <div className="bg-white px-4 md:px-6 py-3">
      <div className="max-w-6xl mx-auto">
        <div className="rounded-2xl border border-gray-300 bg-white shadow-md overflow-hidden p-4 md:p-5">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold text-blue-600">
                  {classdetails.className}
                </h2>
              </div>
              <div className="flex flex-wrap gap-3 text-gray-600 text-sm">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>
                    {classdetails.start} – {formattedEndTime}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span>{classdetails.classCode}</span>
                </div>
                <div className="flex items-center gap-1">
                  <UsersRound className="w-4 h-4" />
                  <span>{classdetails.section}</span>
                </div>
                <div className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium">
                  {classdetails.passoutYear}
                </div>
              </div>
            </div>

            <div className="text-right">
              <p className="text-xs text-gray-600">Duration</p>
              <p className="text-base font-semibold text-gray-800">
                {classdetails.duration} mins
              </p>
            </div>
          </div>

          {/* Actions */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-2">
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <ActionButton
                icon={<QrCode className="w-5 h-5" />}
                label="Generate QR"
                description="QR code attendance"
                onClick={generateQRCodee}
              />

              <ActionButton
                icon={<Keyboard className="w-5 h-5" />}
                label="Generate Code"
                description="Attendance code"
                onClick={generatePasscodee}
              />
              <ActionButton
                icon={<NotebookText className="w-5 h-5" />}
                label="Manual Entry"
                description="Mark manually"
                onClick={() => setShowManualModal(true)}
              />
            </div>
          </div>

          <div className="pt-3 mt-3 border-t border-gray-200 text-xs text-gray-600 italic text-right">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>

      {showManualModal && (
        <ManualAttendanceModal
          classCode={classdetails.classCode}
          onClose={() => setShowManualModal(false)}
        />
      )}

      {showCodePopup && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-10 backdrop-blur-sm bg-black/20">
          <div className="w-[90%] md:w-[500px] bg-white border border-blue-300 rounded-2xl shadow-xl p-6">
            <div className="text-center space-y-4">
              <h2 className="text-lg font-bold text-blue-700">
                Code Generated
              </h2>
              <p className="text-3xl font-mono tracking-widest bg-blue-50 py-2 px-4 rounded-lg border border-blue-200 inline-block">
                {generatedCode}
              </p>

              <div className="text-left mt-6">
                <h3 className="text-xl font-semibold mb-4 text-black">
                  Students Marked Present: {liveAttendance.length}
                </h3>

                <ul className="max-h-[200px] overflow-y-auto space-y-2">
                  {liveAttendance.map((s) => (
                    <li key={s.id} className="flex items-center gap-3">
                      <UserCheck className="w-4 h-4 text-green-600" />
                      <span>
                        {s.name} ({s.id})
                      </span>
                    </li>
                  ))}
                  {liveAttendance.length === 0 && (
                    <p className="text-sm text-gray-500">No responses yet.</p>
                  )}
                </ul>
              </div>

              <button
                onClick={confirmAttendance}
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Confirm & Save Attendance
              </button>

              <button
                onClick={() => {
                  setPollingActive(false);
                  setShowCodePopup(false);
                }}
                className="w-full mt-2 text-sm text-red-500 hover:underline"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showQRModal && (
        <div className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center text-white p-2 sm:p-4">
          <div className="w-full h-full max-w-7xl flex flex-col">
            {/* Header */}
            <div className="text-center mb-4 sm:mb-6 flex-shrink-0">
              <h2 className="text-xl sm:text-2xl font-bold">
                Scan QR to Mark Attendance
              </h2>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col lg:flex-row gap-4 lg:gap-6 min-h-0">
              {/* Left Side - QR Code */}
              <div className="flex-1 flex items-center justify-center min-h-0">
                <div className="flex flex-col items-center justify-center bg-white p-4 sm:p-6 rounded-xl max-w-full max-h-full">
                  {/* QR with blur after expiry */}
                  {/* QR with overlay when expired */}
                  {/* QR area */}
                  <div className="w-full flex justify-center mb-4">
                    {countdown > 0 ? (
                      <QRCode
                        value={qrCodes[currentQRIndex] || ""}
                        size={Math.min(
                          600,
                          window.innerWidth * 0.65,
                          window.innerHeight * 0.65
                        )}
                        className="max-w-full h-auto"
                        bgColor="white"
                        fgColor="#000000"
                        level="H"
                      />
                    ) : (
                      <div
                        className="flex items-center justify-center bg-white rounded-lg"
                        style={{
                          width: Math.min(
                            600,
                            window.innerWidth * 0.65,
                            window.innerHeight * 0.65
                          ),
                          height: Math.min(
                            600,
                            window.innerWidth * 0.65,
                            window.innerHeight * 0.65
                          ),
                        }}
                      >
                        <span className="text-red-600 text-3xl sm:text-5xl font-extrabold text-center">
                          QR EXPIRED
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Countdown */}
                  <p className="text-red-600 font-bold text-lg sm:text-xl mb-2">
                    {countdown > 0 ? `Expires in ${countdown}s` : null}
                  </p>

                  <p className="text-black text-lg sm:text-xl lg:text-2xl font-mono font-bold break-all text-center max-w-full px-2">
                    {qrCodes[currentQRIndex]}
                  </p>
                </div>
              </div>

              {/* Right Side - Students List and Controls */}
              <div className="w-full lg:w-80 xl:w-96 bg-white rounded-xl p-4 sm:p-6 flex flex-col min-h-0 max-h-full">
                {/* Student Count Header */}
                <div className="flex-shrink-0 mb-4">
                  <h3 className="text-lg sm:text-xl font-semibold text-black">
                    Students Present: {qrAttendance.length}
                  </h3>
                </div>

                {/* Scrollable Students List */}
                <div className="flex-1 overflow-y-auto min-h-0 mb-4">
                  {qrAttendance.length === 0 ? (
                    <div className="flex items-center justify-center h-32">
                      <p className="text-gray-500 text-center">
                        No responses yet.
                      </p>
                    </div>
                  ) : (
                    <ul className="space-y-2 sm:space-y-3 pr-2">
                      {qrAttendance.map((s) => (
                        <li
                          key={s.id}
                          className="flex items-center gap-3 p-2 sm:p-3 bg-gray-50 rounded-lg"
                        >
                          <UserCheck className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <span className="text-black font-medium block truncate text-sm sm:text-base">
                              {s.name}
                            </span>
                            <span className="text-gray-600 text-xs sm:text-sm">
                              ({s.id})
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Save Button - Always visible at bottom */}
                {showSaveQRButton && (
                  <div className="flex-shrink-0">
                    <button
                      onClick={confirmQRAttendance}
                      className="bg-blue-600 hover:bg-blue-700 px-6 sm:px-8 py-2 sm:py-3 rounded-xl text-white font-semibold text-base sm:text-lg transition-colors w-full"
                    >
                      Save Attendance
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {showSubCodePopup && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-10 backdrop-blur-sm bg-black/20">
          <div className="w-[90%] md:w-[500px] bg-white border border-blue-300 rounded-2xl shadow-xl p-6">
            <div className="text-center space-y-4">
              <h2 className="text-lg font-bold text-blue-700">
                Substitution Code
              </h2>
              <p className="text-3xl font-mono tracking-widest bg-blue-50 py-2 px-4 rounded-lg border border-blue-200 inline-block">
                {substitutionCode}
              </p>

              <button
                onClick={() => setShowSubCodePopup(false)}
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ActionButton({
  icon,
  label,
  description,
  isHighlighted = false,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer flex flex-col items-center justify-center gap-2 rounded-xl border transition duration-200 ease-in-out py-3 px-3 h-auto min-h-[80px] w-full hover:scale-[1.02] hover:-translate-y-0.5 ${
        isHighlighted
          ? "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100"
          : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
      }`}
    >
      <div
        className={`p-2 rounded-md ${
          isHighlighted ? "bg-blue-200" : "bg-gray-100"
        }`}
      >
        {icon}
      </div>
      <div className="text-center">
        <p className="font-medium text-sm">{label}</p>
        <p
          className={`text-xs mt-0.5 ${
            isHighlighted ? "text-blue-600" : "text-gray-500"
          }`}
        >
          {description}
        </p>
      </div>
    </button>
  );
}

function ManualAttendanceModal({ classCode, onClose }) {
  const [students, setStudents] = useState({});
  const [attendance, setAttendance] = useState({});

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await getAllStudentDetails(classCode);
        const data = res.data;

        setStudents(data.details);
        const initialStatus = {};
        for (let id in data.details) {
          initialStatus[id] = null;
        }
        setAttendance(initialStatus);
      } catch (err) {
        console.error("Error fetching student details:", err);
      }
    };

    fetchStudents();
  }, [classCode]);

  const markAttendance = (id, status) => {
    setAttendance((prev) => ({ ...prev, [id]: status }));
  };

  const markAll = (status) => {
    const updated = {};
    for (let id in students) {
      updated[id] = status;
    }
    setAttendance(updated);
  };

  const handleSave = () => {
    const present = [];
    const absent = [];
    for (let id in attendance) {
      if (attendance[id] === "present") present.push(id);
      else if (attendance[id] === "absent") absent.push(id);
    }

    saveManualAttendance(classCode, present, absent)
      .then(() => {
        toast.success("Attendance saved and closed!");
        onClose();
      })
      .catch((err) => {
        toast.error("Error saving manual attendance:", err);
      });
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center z-50 px-2">
      <div className="bg-white rounded-2xl p-4 sm:p-6 w-full max-w-sm sm:max-w-lg h-[95vh] overflow-y-auto relative shadow-2xl border border-gray-200">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors duration-200 p-1 rounded-full hover:bg-gray-100"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-blue-700 flex items-center gap-2">
          <NotebookText className="w-5 h-5 sm:w-6 sm:h-6" />
          Manual Attendance
        </h2>

        {/* Mark All Buttons moved to the top */}
        <div className="flex gap-2 mb-5">
          <button
            className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-all"
            onClick={() => markAll("present")}
          >
            Mark All Present
          </button>
          <button
            className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-all"
            onClick={() => markAll("absent")}
          >
            Mark All Absent
          </button>
        </div>

        {/* List of Students */}
        <div className="space-y-3">
          {Object.entries(students)
            .sort(([id1], [id2]) => id1.localeCompare(id2))
            .map(([id, name]) => (
              <div
                key={id}
                className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center p-3 sm:p-4 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="flex items-center gap-3 mb-2 sm:mb-0">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-sm">
                      {name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm sm:text-base">
                      {name}
                    </p>
                    <p className="text-xs text-gray-500">{id}</p>
                  </div>
                </div>
                <div className="flex gap-2 sm:gap-3 w-full sm:w-auto justify-between">
                  <button
                    onClick={() => markAttendance(id, "present")}
                    className={`flex-1 flex items-center justify-center gap-1 sm:gap-2 px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
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
                    className={`flex-1 flex items-center justify-center gap-1 sm:gap-2 px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
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

        {/* Save */}
        <button
          className="mt-3 w-full bg-blue-600 text-white hover:bg-blue-700 py-3 text-base font-semibold rounded-xl transition-all duration-200 hover:shadow-lg flex items-center justify-center gap-2"
          onClick={handleSave}
        >
          <Check className="w-5 h-5" />
          Save Attendance
        </button>
      </div>
    </div>
  );
}

export default FacultyHomepageComponent;
