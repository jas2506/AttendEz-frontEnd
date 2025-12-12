import { useEffect, useState, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { Input } from "@/components/ui/input";
import {
  Keyboard,
  X,
  CheckCircle,
  AlertCircle,
  QrCode,
  Camera,
  User,
  Calendar,
} from "lucide-react";
import StudentHomepageSubject from "../projectComponents/StudentHomepageSubject";
import {
  fetchDetails,
  sendPasscode,
  fetchAttendance,
  fetchTimetable,
  sendQR,
} from "../Api";

/**
 * BigPopup - inlined component
 *
 * Props:
 * - open: boolean
 * - message: string
 * - type: "success" | "error" | "info"
 * - duration: number (ms) optional, default 3500
 * - onClose: () => void
 *
 * Uses lucide-react CheckCircle / AlertCircle icons (already imported).
 */
function BigPopup({
  open,
  message = "",
  type = "success",
  duration = 3500,
  onClose = () => {},
}) {
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(t);
  }, [open, duration, onClose]);

  if (!open) return null;

  const Icon = type === "success" ? CheckCircle : AlertCircle;

  return (
    <>
      {/* overlay */}
      <div
        aria-hidden="true"
        className="fixed inset-0 bg-black/45 backdrop-blur-sm z-[60]"
        onClick={onClose}
      />

      {/* modal */}
      <div
        role="dialog"
        aria-modal="true"
        className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-4"
      >
        <div
          className={`relative w-full max-w-3xl mx-auto rounded-2xl shadow-2xl transform transition-all
            sm:rounded-3xl
            bg-gradient-to-b from-white to-slate-50
            ring-1 ring-black/5
            p-5 sm:p-8
            animate-popup-in
          `}
        >
          {/* top-right close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-md hover:bg-black/5"
            aria-label="Close popup"
          >
            <X className="w-5 h-5 text-slate-700" />
          </button>

          {/* content */}
          <div className="flex flex-col items-center gap-4 text-center">
            <div
              className={`p-5 rounded-full border-2 flex items-center justify-center ${
                type === "success"
                  ? "border-green-200 bg-green-50"
                  : "border-red-200 bg-red-50"
              }`}
            >
              <Icon className="w-14 h-14" />
            </div>

            <h2 className="text-lg sm:text-2xl font-semibold text-slate-800">
              {type === "success"
                ? "Attendance marked"
                : "Something went wrong"}
            </h2>

            <p className="text-sm sm:text-base text-slate-600 max-w-lg">
              {message}
            </p>

            <div className="flex gap-3 mt-2">
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-full bg-slate-800 text-white text-sm font-medium shadow-sm hover:opacity-95"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* local styles / animation */}
      <style>{`
        @keyframes popupIn {
          0% { opacity: 0; transform: translateY(18px) scale(0.98); }
          60% { opacity: 1; transform: translateY(-6px) scale(1.02); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-popup-in {
          animation: popupIn 420ms cubic-bezier(.2,.9,.3,1);
        }
      `}</style>
    </>
  );
}

//set day properly for testing
function getTodayAttendanceStats(attendance, timetable) {
  const today = new Date();
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // const todayName = "Monday"; // for testing

  const todayName = weekdays[new Date().getDay()];

  const todayClasses = timetable.timetable[todayName] || [];

  const stats = todayClasses.map((cls) => {
    const code = cls.classCode;
    const [startHourStr, startMinStr] = cls.startTime.split(":");
    const startHour = parseInt(startHourStr, 10);
    const startMinute = parseInt(startMinStr, 10);
    const duration = cls.durationMinutes;

    const startDate = new Date(0, 0, 0, startHour, startMinute);
    const endDate = new Date(startDate.getTime() + duration * 60000);
    const endTime = {
      hour: endDate.getHours(),
      minute: endDate.getMinutes(),
    };

    let total = 0,
      attended = 0;
    const attendanceRecords = attendance[code];
    if (attendanceRecords) {
      for (const lecture in attendanceRecords) {
        total += 1;
        if (attendanceRecords[lecture].present === 1) {
          attended += 1;
        }
      }
    }

    return {
      classCode: code,
      className: timetable.classDetails[code]?.className || code,
      startTime: { hour: startHour, minute: startMinute },
      endTime,
      totalLectures: total,
      attendedLectures: attended,
    };
  });

  // 🔧 Sort by start time (hour + minute)
  return stats.sort((a, b) => {
    if (a.startTime.hour !== b.startTime.hour) {
      return a.startTime.hour - b.startTime.hour;
    }
    return a.startTime.minute - b.startTime.minute;
  });
}

function HomepageStudent() {
  const [currentDateStr, setCurrentDateStr] = useState("");
  const [details, setDetails] = useState(null);
  const [attendance, setAttendance] = useState(null);
  const [timetable, setTimetable] = useState(null);
  const [loading, setLoading] = useState(true);

  const [attendanceError, setAttendanceError] = useState(false);
  const [showScanner, setShowScanner] = useState(false);

  const [classCode, setClassCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // replaced popup state with bigPopup state
  const [bigPopupOpen, setBigPopupOpen] = useState(false);
  const [bigPopupData, setBigPopupData] = useState({
    message: "",
    type: "success",
  });

  const [zoomSupported, setZoomSupported] = useState(false);
  const [zoomRange, setZoomRange] = useState({ min: 1, max: 1 });
  const [zoomValue, setZoomValue] = useState(1);

  // Add ref to track scanner instance
  const scannerRef = useRef(null);
  const scannerInitialized = useRef(false);

  const [showFooter, setShowFooter] = useState(false);
  //for the footer

  // Removed small-toast auto hide effect; BigPopup handles its own auto-close.
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

    async function fetchData() {
      try {
        const [detailsData, attendanceData, timetableData] = await Promise.all([
          fetchDetails(),
          fetchAttendance(),
          fetchTimetable(),
        ]);

        setDetails(detailsData);
        setTimetable(timetableData);

        setAttendance(attendanceData);
        setAttendanceError(false);
      } catch (error) {
        console.error("Error fetching data:", error);

        if (
          error.response?.data?.status === "E" &&
          error.response?.data?.attendance === null
        ) {
          setAttendanceError(true);
          setAttendance(null);
        } else {
          // fallback for other errors
          setAttendanceError(true);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (showScanner && !scannerInitialized.current) {
      const timer = setTimeout(() => {
        initializeScanner();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [showScanner]);

  // Cleanup scanner on component unmount or when scanner is closed
  useEffect(() => {
    return () => {
      cleanupScanner();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 10;

      setShowFooter(scrolledToBottom);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function initializeScanner() {
    const qrRegionId = "qr-reader";

    if (scannerInitialized.current || !document.getElementById(qrRegionId))
      return;

    const html5QrCode = new Html5Qrcode(qrRegionId);
    scannerRef.current = html5QrCode;
    scannerInitialized.current = true;

    const config = {
      fps: 10,
      qrbox: { width: 250, height: 250 },
    };

    html5QrCode
      .start(
        { facingMode: "environment" },
        config,
        async (decodedText, decodedResult) => {
          console.log("QR Code scanned:", decodedText);

          await html5QrCode.stop().catch((err) => {
            console.error("Error stopping scanner:", err);
          });

          scannerInitialized.current = false;
          scannerRef.current = null;

          try {
            const res = await sendQR(decodedText);

            // Open big popup instead of small toast
            setBigPopupData({
              message: res.message || "Successfully marked attendance",
              type: res.status === "S" ? "success" : "error",
            });
            setBigPopupOpen(true);
          } catch (error) {
            console.error("Error sending QR:", error);
            let message = "Failed to submit QR. Please try again.";
            if (error.response?.data?.message) {
              message = error.response.data.message;
            }

            setBigPopupData({
              message,
              type: "error",
            });
            setBigPopupOpen(true);
          } finally {
            setShowScanner(false);
          }
        },
        (errorMessage) => {
          console.warn("QR scan error:", errorMessage);
        }
      )
      .then(async () => {
        const capabilities = await html5QrCode.getRunningTrackCapabilities();
        console.log(capabilities);
        if (capabilities.zoom) {
          setZoomSupported(true);
          setZoomRange({
            min: capabilities.zoom.min,
            max: capabilities.zoom.max,
          });
          setZoomValue(capabilities.zoom.min); // default to min

          try {
            await html5QrCode.applyVideoConstraints({
              advanced: [{ zoom: capabilities.zoom.min }],
            });
          } catch (error) {
            console.warn("Failed to apply initial zoom:", error);
          }
        } else {
          setZoomSupported(false);
        }
      });
  }

  const cleanupScanner = async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
        await scannerRef.current.clear();
        setZoomSupported(false);
        setZoomRange({ min: 1, max: 1 });
        setZoomValue(1);
      } catch (error) {
        console.error("Error cleaning up scanner:", error);
      } finally {
        scannerRef.current = null;
        scannerInitialized.current = false;
      }
    }
  };

  const startScanner = async () => {
    // Check for camera permissions first
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach((track) => track.stop()); // Stop the test stream

      setShowScanner(true);
    } catch (error) {
      console.error("Camera permission error:", error);
      setBigPopupData({
        message: "Camera permission denied. Please enable camera access.",
        type: "error",
      });
      setBigPopupOpen(true);
    }
  };

  const closeScanner = async () => {
    await cleanupScanner();
    setShowScanner(false);
  };

  if (loading) return <p>Loading...</p>;

  const stats =
    attendance?.attendance && timetable?.timetable
      ? getTodayAttendanceStats(attendance.attendance, timetable.timetable)
      : null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!classCode.trim()) {
      setBigPopupData({
        message: "Please enter a class code",
        type: "error",
      });
      setBigPopupOpen(true);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await sendPasscode(classCode);

      setBigPopupData({
        message: response.message,
        type: response.status === "S" ? "success" : "error",
      });
      setBigPopupOpen(true);

      if (response.status === "S") {
        setClassCode("");
      }
    } catch (error) {
      let message = "An error occurred. Please try again.";

      if (error.response) {
        if (error.response.status === 404) {
          message = "Invalid passcode. Please check and try again.";
        } else if (error.response.status === 500) {
          message = "Please try again.";
        }
      }

      setBigPopupData({
        message,
        type: "error",
      });
      setBigPopupOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closePopup = () => {
    setBigPopupOpen(false);
  };

  return (
    <>
      <div className="min-h-screen p-6 pb-20">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Header Section */}
          <div className="bg-white border border-gray-200 shadow-lg rounded-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                {/* Left Section */}
                <div className="flex items-center gap-4">
                  <div className="bg-white/10 p-3 rounded-xl">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-white">
                      Hello, {details?.details?.name} 👋
                    </p>
                    <p className="text-blue-100 mt-1">
                      Here are your classes for today
                    </p>
                  </div>
                </div>

                {/* Right - Date Section */}
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                  <Calendar className="w-4 h-4 text-white" />
                  <span className="text-white font-medium">
                    {currentDateStr}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* QR Scanner Button Section - Improved Design */}
          <div className="flex justify-center mb-6">
            <button
              onClick={startScanner}
              disabled={showScanner}
              className={`group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-base transition-all duration-300 transform hover:scale-105 shadow-lg w-full md:w-auto max-w-sm ${
                showScanner
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed shadow-sm scale-100"
                  : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-blue-200 hover:shadow-xl"
              }`}
            >
              <div className="relative">
                {showScanner ? (
                  <Camera className="w-6 h-6 animate-pulse" />
                ) : (
                  <QrCode className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                )}
              </div>
              <span className="font-medium">
                {showScanner ? "Scanner Active..." : "Scan QR Code"}
              </span>
              {!showScanner && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              )}
            </button>
          </div>

          {/* Input + Submit Section */}
          <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col md:flex-row items-center gap-4 max-w-3xl mx-auto">
            <div className="relative w-full md:flex-1">
              <Keyboard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Enter Class Code"
                value={classCode}
                onChange={(e) => {
                  let value = e.target.value.replace(/[^a-zA-Z0-9~]/g, ""); // Allow ~ character

                  // Handle the ~ formatting
                  if (value.includes("~")) {
                    const parts = value.split("~");
                    if (parts.length === 2) {
                      value =
                        parts[0].slice(0, 6) + "~" + parts[1].slice(0, 20);
                    }
                  } else if (value.length > 6) {
                    value = value.slice(0, 6) + "~" + value.slice(6, 26);
                  }

                  setClassCode(value);
                }}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isSubmitting}
                maxLength={27}
              />
            </div>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium px-6 py-2 rounded-lg transition duration-200 w-full md:w-auto min-w-[100px]"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                </div>
              ) : (
                "Submit"
              )}
            </button>
          </div>

          {/* Big Popup */}
          <BigPopup
            open={bigPopupOpen}
            message={bigPopupData.message}
            type={bigPopupData.type}
            duration={3500}
            onClose={closePopup}
          />

          {/* QR Scanner Modal - Enhanced */}
          {showScanner && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center p-4 backdrop-blur-sm">
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden border border-gray-200">
                <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <QrCode className="w-5 h-5 text-blue-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      Scan QR Code
                    </h2>
                  </div>
                  <button
                    onClick={closeScanner}
                    className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-lg transition-colors duration-200"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-6">
                  <div
                    id="qr-reader"
                    className="w-full rounded-lg overflow-hidden"
                  />

                  {zoomSupported && (
                    <div className="mt-4">
                      <label
                        htmlFor="zoom-slider"
                        className="block text-sm font-medium text-gray-700 text-center"
                      >
                        Zoom Level
                      </label>
                      <input
                        id="zoom-slider"
                        type="range"
                        min={zoomRange.min}
                        max={zoomRange.max}
                        step="0.1"
                        value={zoomValue}
                        onChange={async (e) => {
                          const value = parseFloat(e.target.value);
                          setZoomValue(value);

                          try {
                            await scannerRef.current?.applyVideoConstraints({
                              advanced: [{ zoom: value }],
                            });
                          } catch (error) {
                            console.warn("Zoom change error:", error);
                          }
                        }}
                        className="w-full mt-2 accent-blue-600"
                      />
                      <p className="text-xs text-center text-gray-500 mt-1">
                        {zoomValue.toFixed(1)}x
                      </p>
                    </div>
                  )}

                  <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-800 text-center font-medium">
                      Position the QR code within the camera frame
                    </p>
                    <p className="text-xs text-blue-600 text-center mt-1">
                      Make sure the code is clearly visible and well-lit
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Attendance Section */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            {attendanceError ? (
              <p className="text-center text-red-500 text-sm py-6">
                Attendance Records not found
              </p>
            ) : stats === null ? (
              <p className="text-center text-gray-500 text-sm py-6">
                Attendance record not updated
              </p>
            ) : stats.length === 0 ? (
              <p className="text-center text-gray-500 text-sm py-6">
                No classes for today
              </p>
            ) : (
              <div className="space-y-4">
                {stats.map((course) => (
                  <StudentHomepageSubject
                    key={course.classCode}
                    classname={course.className}
                    start={course.startTime}
                    end={course.endTime}
                    n={course.attendedLectures}
                    t={course.totalLectures}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="h-40 flex items-center justify-center">
            <div className="text-center space-y-1">
              <p className="text-3xl md:text-4xl font-semibold bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 bg-clip-text text-transparent opacity-90">
                Made with love
              </p>
              <p className="text-2xl md:text-3xl bg-gradient-to-r from-blue-600 via-blue-400 to-indigo-600 bg-clip-text text-transparent opacity-80">
                by your friendly devs of CSE
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomepageStudent;
