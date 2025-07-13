// import React, { useState, useEffect } from "react";
// import {
//   Clock,
//   NotebookText,
//   UsersRound,
//   QrCode,
//   Keyboard,
//   BookOpen,
//   X,
//   Check,
//   UserCheck,
//   UserX,
// } from "lucide-react";
// import QRCode from "react-qr-code";
//
// const backendUrl = import.meta.env.VITE_BACKEND_URL;
//
//
// function FacultyHomepageComponent({ c }) {
//   const classdetails = c;
//
//   const endTime = new Date(`2000-01-01 ${classdetails.start}`);
//   endTime.setMinutes(endTime.getMinutes() + classdetails.duration);
//   const formattedEndTime = endTime.toTimeString().slice(0, 5);
//
//   const [showManualModal, setShowManualModal] = useState(false);
//   const [showCodePopup, setShowCodePopup] = useState(false);
//   const [generatedCode, setGeneratedCode] = useState("");
//   const [liveAttendance, setLiveAttendance] = useState([]);
//   const [liveVersion, setLiveVersion] = useState("");
//   const [pollingActive, setPollingActive] = useState(false);
//
//   const [qrCodes, setQrCodes] = useState([]);
//   const [currentQRIndex, setCurrentQRIndex] = useState(0);
//   const [showQRModal, setShowQRModal] = useState(false);
//   const [qrAttendance, setQrAttendance] = useState([]);
//   const [qrVersion, setQrVersion] = useState("");
//   const [showSaveQRButton, setShowSaveQRButton] = useState(false);
//
//   useEffect(() => {
//     if (pollingActive) {
//       pollLiveAttendance("");
//     }
//   }, [pollingActive]);
//
//   const generateQRCode = async () => {
//     try {
//       const res = await fetch(
//         `${backendUrl}/faculty/qr/generateQRCode?classCode=${classdetails.classCode}`,
//         {
//           method: "POST",
//           headers: {
//             Authorization: localStorage.getItem("facultyToken"),
//           },
//         }
//       );
//       const data = await res.json();
//       if (data.status === "S") {
//         setQrCodes(data.codes);
//         setCurrentQRIndex(0);
//         setQrVersion("");
//         setQrAttendance([]);
//         setShowQRModal(true);
//         document.documentElement.requestFullscreen(); // go fullscreen
//         startQRSequence(data.codes);
//         pollQrAttendance("");
//       }
//     } catch (err) {
//       console.error("QR Code generation error:", err);
//     }
//   };
//
//   const startQRSequence = (codes) => {
//     let index = 0;
//     const interval = setInterval(() => {
//       index += 1;
//       if (index >= codes.length) {
//         clearInterval(interval);
//       } else {
//         setCurrentQRIndex(index);
//       }
//     }, 60000); // rotate every 8 seconds
//
//     setTimeout(() => {
//       setShowSaveQRButton(true);
//     }, 15000); // show save after 30s
//   };
//
//   const pollQrAttendance = async (version) => {
//     try {
//       const res = await fetch(
//         `${backendUrl}/faculty/liveAttendanceViewWithVersion?classCode=${classdetails.classCode}&lastVersion=${version}`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: localStorage.getItem("facultyToken"),
//           },
//         }
//       );
//       const data = await res.json();
//       if (data.status === "S" && data.attendanceRecord) {
//         const updated = Object.entries(data.attendanceRecord).map(
//           ([id, name]) => ({ id, name })
//         );
//         setQrAttendance(updated);
//         const newVersion = data.version || version;
//         setQrVersion(newVersion);
//
//         setTimeout(() => pollQrAttendance(newVersion), 3000);
//       }
//     } catch (err) {
//       console.error("QR polling error:", err);
//     }
//   };
//
//   const confirmQRAttendance = async () => {
//     try {
//       await fetch(
//         `${backendUrl}/faculty/qrpasscode/confirmAttendanceClose?classCode=${classdetails.classCode}`,
//         {
//           method: "POST",
//           headers: {
//             Authorization: localStorage.getItem("facultyToken"),
//           },
//         }
//       );
//       alert("QR Attendance saved.");
//       document.exitFullscreen();
//       setShowQRModal(false);
//       setShowSaveQRButton(false);
//     } catch (err) {
//       console.error("Error saving QR attendance:", err);
//     }
//   };
//
//   const generatePasscode = async () => {
//     try {
//       const res = await fetch(
//         `${backendUrl}/faculty/passcode/generateCode?classCode=${classdetails.classCode}`,
//         {
//           method: "POST",
//           headers: {
//             Authorization: localStorage.getItem("facultyToken"),
//           },
//         }
//       );
//       const data = await res.json();
//       setGeneratedCode(data.codes);
//       setShowCodePopup(true);
//       setLiveVersion("");
//       setPollingActive(true); // this now safely triggers useEffect
//     } catch (err) {
//       console.error("Error generating passcode:", err);
//     }
//   };
//
//   const pollLiveAttendance = async (version) => {
//     if (!pollingActive) return;
//
//     try {
//       const res = await fetch(
//         `${backendUrl}/faculty/liveAttendanceViewWithVersion?classCode=${classdetails.classCode}&lastVersion=${version}`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: localStorage.getItem("facultyToken"),
//           },
//         }
//       );
//       const data = await res.json();
//       if (data.status === "S" && data.attendanceRecord) {
//         const updated = Object.entries(data.attendanceRecord).map(
//           ([id, name]) => ({ id, name })
//         );
//         setLiveAttendance(updated);
//         setLiveVersion(data.version || version);
//       }
//
//       setTimeout(() => {
//         pollLiveAttendance(data.version || version);
//       }, 3000);
//     } catch (err) {
//       console.error("Polling error:", err);
//     }
//   };
//
//   const confirmAttendance = async () => {
//     try {
//       await fetch(
//         `${backendUrl}/faculty/qrpasscode/confirmAttendanceClose?classCode=${classdetails.classCode}`,
//         {
//           method: "POST",
//           headers: {
//             Authorization: localStorage.getItem("facultyToken"),
//           },
//         }
//       );
//       alert("Attendance confirmed and closed.");
//       setPollingActive(false);
//       setShowCodePopup(false);
//     } catch (err) {
//       console.error("Error closing attendance:", err);
//     }
//   };
//
//   return (
//     <div className="bg-white px-4 md:px-6 py-3">
//       <div className="max-w-6xl mx-auto">
//         <div className="rounded-2xl border border-gray-300 bg-white shadow-md overflow-hidden p-4 md:p-5">
//           {/* Header */}
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
//             <div className="flex flex-col gap-1">
//               <div className="flex items-center gap-2">
//                 <BookOpen className="w-5 h-5 text-blue-600" />
//                 <h2 className="text-lg font-bold text-blue-600">
//                   {classdetails.className}
//                 </h2>
//               </div>
//               <div className="flex flex-wrap gap-3 text-gray-600 text-sm">
//                 <div className="flex items-center gap-1">
//                   <Clock className="w-4 h-4" />
//                   <span>
//                     {classdetails.start} – {formattedEndTime}
//                   </span>
//                 </div>
//                 <div className="flex items-center gap-1">
//                   <span>{classdetails.classCode}</span>
//                 </div>
//                 <div className="flex items-center gap-1">
//                   <UsersRound className="w-4 h-4" />
//                   <span>{classdetails.section}</span>
//                 </div>
//                 <div className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium">
//                   {classdetails.passoutYear}
//                 </div>
//               </div>
//             </div>
//
//             <div className="text-right">
//               <p className="text-xs text-gray-600">Duration</p>
//               <p className="text-base font-semibold text-gray-800">
//                 {classdetails.duration} mins
//               </p>
//             </div>
//           </div>
//
//           {/* Actions */}
//           <div>
//             <h3 className="text-sm font-semibold text-gray-800 mb-2">
//               Quick Actions
//             </h3>
//             <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
//               <ActionButton
//                 icon={<QrCode className="w-5 h-5" />}
//                 label="Generate QR"
//                 description="QR code attendance"
//                 onClick={generateQRCode}
//               />
//
//               <ActionButton
//                 icon={<Keyboard className="w-5 h-5" />}
//                 label="Generate Code"
//                 description="Attendance code"
//                 onClick={generatePasscode}
//               />
//               <ActionButton
//                 icon={<NotebookText className="w-5 h-5" />}
//                 label="Manual Entry"
//                 description="Mark manually"
//                 onClick={() => setShowManualModal(true)}
//               />
//               <ActionButton
//                 icon={<UsersRound className="w-5 h-5" />}
//                 label="Substitution"
//                 description="Generate Sub Code"
//                 isHighlighted
//               />
//             </div>
//           </div>
//
//           <div className="pt-3 mt-3 border-t border-gray-200 text-xs text-gray-600 italic text-right">
//             Last updated: {new Date().toLocaleTimeString()}
//           </div>
//         </div>
//       </div>
//
//       {showManualModal && (
//         <ManualAttendanceModal
//           classCode={classdetails.classCode}
//           onClose={() => setShowManualModal(false)}
//         />
//       )}
//
//       {showCodePopup && (
//         <div className="fixed inset-0 z-50 flex items-start justify-center pt-10 backdrop-blur-sm bg-black/20">
//           <div className="w-[90%] md:w-[500px] bg-white border border-blue-300 rounded-2xl shadow-xl p-6">
//             <div className="text-center space-y-4">
//               <h2 className="text-lg font-bold text-blue-700">
//                 Code Generated
//               </h2>
//               <p className="text-3xl font-mono tracking-widest bg-blue-50 py-2 px-4 rounded-lg border border-blue-200 inline-block">
//                 {generatedCode}
//               </p>
//
//               <div className="text-left mt-6">
//                 <h3 className="text-md font-semibold mb-2">
//                   Students Marked Present:
//                 </h3>
//                 <ul className="max-h-[200px] overflow-y-auto space-y-2">
//                   {liveAttendance.map((s) => (
//                     <li key={s.id} className="flex items-center gap-3">
//                       <UserCheck className="w-4 h-4 text-green-600" />
//                       <span>
//                         {s.name} ({s.id})
//                       </span>
//                     </li>
//                   ))}
//                   {liveAttendance.length === 0 && (
//                     <p className="text-sm text-gray-500">No responses yet.</p>
//                   )}
//                 </ul>
//               </div>
//
//               <button
//                 onClick={confirmAttendance}
//                 className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
//               >
//                 Confirm & Save Attendance
//               </button>
//
//               <button
//                 onClick={() => {
//                   setPollingActive(false);
//                   setShowCodePopup(false);
//                 }}
//                 className="w-full mt-2 text-sm text-red-500 hover:underline"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//
//       {showQRModal && (
//         <div className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center text-white p-4">
//           <div className="w-full max-w-6xl h-[80vh] flex flex-col">
//             {/* Header */}
//             <div className="text-center mb-6">
//               <h2 className="text-2xl font-bold">Scan QR to Mark Attendance</h2>
//             </div>
//             {/* Main Content - Side by Side */}
//             <div className="flex-1 flex gap-6 min-h-0">
//               {/* Left Side - QR Code (Bigger and Centered) */}
//               <div className="flex-1 flex items-center justify-center">
//                 <div className="flex flex-col items-center justify-center bg-white px-4 rounded-xl">
//                   <QRCode
//                     value={qrCodes[currentQRIndex] || ""}
//                     size={Math.min(
//                       400, // Increased max size
//                       window.innerWidth * 0.6, // Takes up 60% of screen width
//                       window.innerHeight * 0.75 // Up to 75% of screen height
//                     )}
//                     className="mb-6 mt-6"
//                     bgColor="white"
//                     fgColor="#000000"
//                     level="H"
//                   />
//                   <p className="text-white text-2xl mb-4 font-mono font-bold break-all text-center max-w-[90%]">
//                     {qrCodes[currentQRIndex]}
//                   </p>
//                 </div>
//               </div>
//
//               {/* Right Side - Students List */}
//               <div className="w-80 bg-white rounded-xl p-6 flex flex-col">
//                 <h3 className="text-xl font-semibold mb-4 text-black">
//                   Students Marked Present:
//                 </h3>
//
//                 <div className="flex-1 overflow-y-auto">
//                   {qrAttendance.length === 0 ? (
//                     <p className="text-gray-500 text-center py-8">
//                       No responses yet.
//                     </p>
//                   ) : (
//                     <ul className="space-y-3">
//                       {qrAttendance.map((s) => (
//                         <li
//                           key={s.id}
//                           className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
//                         >
//                           <UserCheck className="w-5 h-5 text-green-600 flex-shrink-0" />
//                           <div className="flex-1 min-w-0">
//                             <span className="text-black font-medium block truncate">
//                               {s.name}
//                             </span>
//                             <span className="text-gray-600 text-sm">
//                               ({s.id})
//                             </span>
//                           </div>
//                         </li>
//                       ))}
//                     </ul>
//                   )}
//                 </div>
//               </div>
//             </div>
//             {/* Footer Button */}
//             {showSaveQRButton && (
//               <div className="mt-6 text-center">
//                 <button
//                   onClick={confirmQRAttendance}
//                   className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl text-white font-semibold text-lg transition-colors"
//                 >
//                   Save Attendance
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
//
// function ActionButton({
//   icon,
//   label,
//   description,
//   isHighlighted = false,
//   onClick,
// }) {
//   return (
//     <button
//       onClick={onClick}
//       className={`cursor-pointer flex flex-col items-center justify-center gap-2 rounded-xl border transition duration-200 ease-in-out py-3 px-3 h-auto min-h-[80px] w-full hover:scale-[1.02] hover:-translate-y-0.5 ${
//         isHighlighted
//           ? "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100"
//           : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
//       }`}
//     >
//       <div
//         className={`p-2 rounded-md ${
//           isHighlighted ? "bg-blue-200" : "bg-gray-100"
//         }`}
//       >
//         {icon}
//       </div>
//       <div className="text-center">
//         <p className="font-medium text-sm">{label}</p>
//         <p
//           className={`text-xs mt-0.5 ${
//             isHighlighted ? "text-blue-600" : "text-gray-500"
//           }`}
//         >
//           {description}
//         </p>
//       </div>
//     </button>
//   );
// }
//
// function ManualAttendanceModal({ classCode, onClose }) {
//   const [students, setStudents] = useState({});
//   const [attendance, setAttendance] = useState({});
//
//   useEffect(() => {
//     fetch(
//       `${backendUrl}/faculty/getAllStudentDetails?classCode=${classCode}`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `${localStorage.getItem("facultyToken")}`,
//         },
//       }
//     )
//       .then((res) => res.json())
//       .then((data) => {
//         setStudents(data.details);
//         const initialStatus = {};
//         for (let id in data.details) {
//           initialStatus[id] = null;
//         }
//         setAttendance(initialStatus);
//       });
//   }, [classCode]);
//
//   const markAttendance = (id, status) => {
//     setAttendance((prev) => ({ ...prev, [id]: status }));
//   };
//
//   const handleSave = () => {
//     const present = [];
//     const absent = [];
//     for (let id in attendance) {
//       if (attendance[id] === "present") present.push(id);
//       else if (attendance[id] === "absent") absent.push(id);
//     }
//
//     fetch(`${backendUrl}/faculty/saveManualAttendance`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `${localStorage.getItem("facultyToken")}`,
//       },
//       body: JSON.stringify({ classCode, present, absent }),
//     }).then(() => {
//       alert("Attendance saved and closed!");
//       onClose();
//     });
//   };
//
//   return (
//     <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center z-50">
//       <div className="bg-white rounded-2xl p-6 w-[90%] md:w-[600px] max-h-[80vh] overflow-y-auto relative shadow-2xl border border-gray-200">
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors duration-200 p-1 rounded-full hover:bg-gray-100"
//         >
//           <X className="w-5 h-5" />
//         </button>
//         <h2 className="text-xl font-bold mb-6 text-blue-700 flex items-center gap-2">
//           <NotebookText className="w-6 h-6" />
//           Manual Attendance
//         </h2>
//         <div className="space-y-4">
//           {Object.entries(students)
//             .sort(([id1], [id2]) => id1.localeCompare(id2))
//             .map(([id, name]) => (
//               <div
//                 key={id}
//                 className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors duration-200"
//               >
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
//                     <span className="text-blue-600 font-semibold text-sm">
//                       {name.charAt(0).toUpperCase()}
//                     </span>
//                   </div>
//                   <div>
//                     <p className="font-semibold text-gray-800">{name}</p>
//                     <p className="text-sm text-gray-500">{id}</p>
//                   </div>
//                 </div>
//                 <div className="flex gap-3">
//                   <button
//                     onClick={() => markAttendance(id, "present")}
//                     className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
//                       attendance[id] === "present"
//                         ? "bg-green-500 text-white shadow-md transform scale-105"
//                         : "bg-green-100 text-green-700 hover:bg-green-200 border border-green-300"
//                     }`}
//                   >
//                     <UserCheck className="w-4 h-4" />
//                     Present
//                   </button>
//                   <button
//                     onClick={() => markAttendance(id, "absent")}
//                     className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
//                       attendance[id] === "absent"
//                         ? "bg-red-500 text-white shadow-md transform scale-105"
//                         : "bg-red-100 text-red-700 hover:bg-red-200 border border-red-300"
//                     }`}
//                   >
//                     <UserX className="w-4 h-4" />
//                     Absent
//                   </button>
//                 </div>
//               </div>
//             ))}
//         </div>
//         <button
//           className="mt-6 w-full bg-blue-600 text-white hover:bg-blue-700 py-3 text-lg font-semibold rounded-xl transition-all duration-200 hover:shadow-lg flex items-center justify-center gap-2"
//           onClick={handleSave}
//         >
//           <Check className="w-5 h-5" />
//           Save Attendance
//         </button>
//       </div>
//     </div>
//   );
// }
//
// export default FacultyHomepageComponent;
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
import {
  generateQRCode,
  generatePasscode,
  pollAttendanceWithVersion,
  confirmAttendanceClose,
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

  // State for QR Code Attendance
  const [qrCodes, setQrCodes] = useState([]);
  const [currentQRIndex, setCurrentQRIndex] = useState(0);
  const [qrAttendance, setQrAttendance] = useState([]);
  const [showSaveQRButton, setShowSaveQRButton] = useState(false);
  const [qrPollingActive, setQrPollingActive] = useState(false);

  // --- REFACTORED POLLING LOGIC FOR PASSCODE ATTENDANCE ---
  useEffect(() => {
    // This effect handles the polling for live attendance via passcode.
    // It only runs when `pollingActive` changes.
    if (!pollingActive) {
      return; // Do nothing if polling is not active.
    }

    let active = true; // Flag to control the loop inside the effect.
    let currentVersion = ""; // Internal version tracking.

    const poll = async () => {
      if (!active) return; // Stop polling if the effect has been cleaned up.

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
          setTimeout(poll, 3000); // Schedule the next poll.
        }
      }
    };

    poll(); // Start the polling loop.

    // Cleanup function: This runs when `pollingActive` becomes false or the component unmounts.
    return () => {
      active = false;
    };
  }, [pollingActive, classdetails.classCode]);

  // --- REFACTORED POLLING LOGIC FOR QR ATTENDANCE ---
  useEffect(() => {
    // This effect handles polling for QR code attendance.
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

  // Effect to handle exiting fullscreen mode
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setShowQRModal(false);
        setQrPollingActive(false); // Stop polling
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
        setQrPollingActive(true); // Start polling
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
    setQrPollingActive(false); // Stop polling
    try {
      await confirmAttendanceClose(classdetails.classCode);

      alert("QR Attendance saved.");
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
      setShowQRModal(false);
      setShowSaveQRButton(false);
    } catch (err) {
      console.error("Error saving QR attendance:", err);
    }
  };

  const generatePasscodee = async () => {
    try {
      const { data } = await generatePasscode(classdetails.classCode);

      setGeneratedCode(data.codes);
      setLiveAttendance([]); // Reset list on new code generation
      setShowCodePopup(true);
      setPollingActive(true); // Start polling
    } catch (err) {
      console.error("Error generating passcode:", err);
    }
  };

  const confirmAttendance = async () => {
    setPollingActive(false); // Stop polling
    try {
      await confirmAttendanceClose(classdetails.classCode);

      alert("Attendance confirmed and closed.");
      setShowCodePopup(false);
    } catch (err) {
      console.error("Error closing attendance:", err);
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
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
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
              <ActionButton
                icon={<UsersRound className="w-5 h-5" />}
                label="Substitution"
                description="Generate Sub Code"
                isHighlighted
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
                <h3 className="text-md font-semibold mb-2">
                  Students Marked Present:
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
                  setPollingActive(false); // This will now correctly stop the polling via useEffect cleanup
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
        <div className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center text-white p-4">
          <div className="w-full max-w-6xl h-[80vh] flex flex-col">
            {/* Header */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold">Scan QR to Mark Attendance</h2>
            </div>
            {/* Main Content - Side by Side */}
            <div className="flex-1 flex gap-6 min-h-0">
              {/* Left Side - QR Code (Bigger and Centered) */}
              <div className="flex-1 flex items-center justify-center">
                <div className="flex flex-col items-center justify-center bg-white px-4 rounded-xl">
                  <QRCode
                    value={qrCodes[currentQRIndex] || ""}
                    size={Math.min(
                      400, // Increased max size
                      window.innerWidth * 0.6, // Takes up 60% of screen width
                      window.innerHeight * 0.75 // Up to 75% of screen height
                    )}
                    className="mb-6 mt-6"
                    bgColor="white"
                    fgColor="#000000"
                    level="H"
                  />
                  <p className="text-black text-2xl mb-4 font-mono font-bold break-all text-center max-w-[90%]">
                    {qrCodes[currentQRIndex]}
                  </p>
                </div>
              </div>

              {/* Right Side - Students List */}
              <div className="w-80 bg-white rounded-xl p-6 flex flex-col">
                <h3 className="text-xl font-semibold mb-4 text-black">
                  Students Marked Present:
                </h3>

                <div className="flex-1 overflow-y-auto">
                  {qrAttendance.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">
                      No responses yet.
                    </p>
                  ) : (
                    <ul className="space-y-3">
                      {qrAttendance.map((s) => (
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
            </div>
            {/* Footer Button */}
            {showSaveQRButton && (
              <div className="mt-6 text-center">
                <button
                  onClick={confirmQRAttendance}
                  className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl text-white font-semibold text-lg transition-colors"
                >
                  Save Attendance
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ActionButton and ManualAttendanceModal components remain unchanged.

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

  const handleSave = () => {
    const present = [];
    const absent = [];
    for (let id in attendance) {
      if (attendance[id] === "present") present.push(id);
      else if (attendance[id] === "absent") absent.push(id);
    }

    saveManualAttendance(classCode, present, absent)
      .then(() => {
        alert("Attendance saved and closed!");
        onClose();
      })
      .catch((err) => {
        console.error("Error saving manual attendance:", err);
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
          Manual Attendance
        </h2>
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
          Save Attendance
        </button>
      </div>
    </div>
  );
}

export default FacultyHomepageComponent;
