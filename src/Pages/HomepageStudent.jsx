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
} from "lucide-react";
import StudentHomepageSubject from "../projectComponents/StudentHomepageSubject";
import {
  fetchDetails,
  sendPasscode,
  fetchAttendance,
  fetchTimetable,
  sendQR,
} from "../Api";

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
  const [popup, setPopup] = useState(null);

  const [zoomSupported, setZoomSupported] = useState(false);
  const [zoomRange, setZoomRange] = useState({ min: 1, max: 1 });
  const [zoomValue, setZoomValue] = useState(1);

  // Add ref to track scanner instance
  const scannerRef = useRef(null);
  const scannerInitialized = useRef(false);

  const [showFooter, setShowFooter] = useState(false);
  //for the footer

  useEffect(() => {
    if (popup) {
      const timer = setTimeout(() => {
        setPopup(null);
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [popup]);

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
            setPopup({
              message: res.message || "Successfully marked attendance",
              type: res.status === "S" ? "success" : "error",
            });
          } catch (error) {
            console.error("Error sending QR:", error);
            let message = "Failed to submit QR. Please try again.";
            if (error.response?.data?.message) {
              message = error.response.data.message;
            }

            setPopup({
              message,
              type: "error",
            });
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
      setPopup({
        message: "Camera permission denied. Please enable camera access.",
        type: "error",
      });
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
      setPopup({
        message: "Please enter a class code",
        type: "error",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await sendPasscode(classCode);

      setPopup({
        message: response.message,
        type: response.status === "S" ? "success" : "error",
      });

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

      setPopup({
        message,
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const closePopup = () => {
    setPopup(null);
  };

  return (
    <>
      <div className="min-h-screen p-6 space-y-6 pb-20">
        {/* Header Section */}
        <div className="bg-white border-b border-gray-100 shadow-sm p-6 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <p className="text-2xl font-bold text-blue-700">
              Hello, {details?.details?.name} 👋
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Here are your classes for today
            </p>
          </div>
          <div className="text-sm text-gray-500 mt-4 md:mt-0">
            {currentDateStr}
          </div>
        </div>

        {/* QR Scanner Button Section - Improved Design */}
        <div className="flex justify-center mb-6">
          <button
            onClick={startScanner}
            disabled={showScanner}
            className={`group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-base transition-all duration-300 transform hover:scale-105 shadow-lg ${
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

        <div className="max-w-7xl mx-auto p-6">
          <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col md:flex-row items-center gap-4">
            <div className="relative w-full">
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

          {/* Popup */}
          {popup && (
            <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 toast-slide-in">
              <div
                className={`border-l-4 p-4 rounded-md shadow-lg bg-white w-80 transition-all duration-300 ${
                  popup.type === "success"
                    ? "border-green-500"
                    : "border-red-500"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex gap-3">
                    {popup.type === "success" ? (
                      <CheckCircle className="text-green-600 w-5 h-5 mt-0.5 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="text-red-600 w-5 h-5 mt-0.5 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <h3
                        className={`font-semibold ${
                          popup.type === "success"
                            ? "text-green-700"
                            : "text-red-700"
                        }`}
                      >
                        {popup.type === "success" ? "Success" : "Error"}
                      </h3>
                      <p className="text-sm text-gray-700 mt-1">
                        {popup.message}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={closePopup}
                    className="text-gray-400 hover:text-gray-600 ml-2 flex-shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

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
        <div className="h-40">
          <div className="w-full mt-16 flex flex-col items-center justify-center">
            <p className="text-[29px] font-semibold bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent opacity-90">
              Made with love
            </p>

            <p className="text-[27px] mt-1 bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 bg-clip-text text-transparent opacity-80">
              by your friendly devs of CSE
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomepageStudent;
