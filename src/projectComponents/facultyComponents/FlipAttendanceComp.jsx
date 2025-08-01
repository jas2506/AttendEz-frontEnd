import React, { useState } from "react";
import axios from "axios";
import { X } from "lucide-react";
import { flipAttendance } from "../../TeacherApi";

const LectureDetailsModal = ({
  lectureKey,
  lectureData,
  studentMap,
  classCode,
  onClose,
}) => {
  const lectureNumber = lectureKey.split(".")[1];
  const [attendance, setAttendance] = useState({ ...lectureData.attendance });

  const handleFlip = async (regNo) => {
    const currentStatus = attendance[regNo];
    const updatedStatus = currentStatus === 1 ? 0 : 1;

    setAttendance((prev) => ({
      ...prev,
      [regNo]: updatedStatus,
    }));

    try {
      const response = await flipAttendance({
        classcode: classCode,
        registernumber: regNo,
        lecturenumber: lectureNumber,
      });
    } catch (error) {
      console.error(`Flip failed for ${regNo}:`, error);
    }
  };

  const absentees = Object.entries(attendance)
    .filter(([_, status]) => status === 0)
    .sort(([regNoA], [regNoB]) => {
      const nameA = studentMap[regNoA].toLowerCase();
      const nameB = studentMap[regNoB].toLowerCase();
      return nameA.localeCompare(nameB);
    });

  const presentees = Object.entries(attendance)
    .filter(([_, status]) => status === 1)
    .sort(([regNoA], [regNoB]) => {
      const nameA = studentMap[regNoA].toLowerCase();
      const nameB = studentMap[regNoB].toLowerCase();
      return nameA.localeCompare(nameB);
    });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-blue-50 rounded-xl shadow-xl w-full max-w-2xl p-6 relative border border-blue-200">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-blue-700 hover:text-blue-900"
        >
          <X />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-blue-800">
          Attendance for {lectureKey}
        </h2>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {absentees.map(([regNo, _]) => (
            <div
              key={regNo}
              className="flex justify-between items-center p-4 rounded-lg bg-red-100 shadow-md hover:bg-red-200 transition-all duration-300"
            >
              <span className="font-medium text-gray-800">
                {studentMap[regNo]} ({regNo})
              </span>
              <button
                onClick={() => handleFlip(regNo)}
                className="px-4 py-1.5 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-full shadow-md transition-all duration-300 transform hover:scale-105 hover:from-green-500 hover:to-green-700"
              >
                Mark Present
              </button>
            </div>
          ))}

          {presentees.map(([regNo, _]) => (
            <div
              key={regNo}
              className="flex justify-between items-center p-4 rounded-lg bg-green-100 shadow-md hover:bg-green-200 transition-all duration-300"
            >
              <span className="font-medium text-gray-800">
                {studentMap[regNo]} ({regNo})
              </span>
              <button
                onClick={() => handleFlip(regNo)}
                className="px-4 py-1.5 bg-gradient-to-r from-red-400 to-red-600 text-white rounded-full shadow-md transition-all duration-300 transform hover:scale-105 hover:from-red-500 hover:to-red-700"
              >
                Mark Absent
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LectureDetailsModal;
