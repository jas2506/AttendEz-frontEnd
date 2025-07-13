// import React, { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";

// const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

// export default function EnterTimetablePopup({
//   visible,
//   onClose,
//   onSave,
//   initialData = {},
// }) {
//   const [entries, setEntries] = useState([]);

//   useEffect(() => {
//     // Convert initialData (grouped by day) into flat entry array
//     const flattened = [];
//     Object.entries(initialData || {}).forEach(([day, slots]) => {
//       slots.forEach((slot) => {
//         flattened.push({
//           day,
//           classCode: slot.classCode,
//           startTime: slot.startTime,
//           durationMinutes: slot.durationMinutes.toString(),
//         });
//       });
//     });
//     setEntries(flattened);
//   }, [initialData]);

//   const addEntry = () => {
//     setEntries((prev) => [
//       ...prev,
//       {
//         day: "Monday",
//         classCode: "",
//         startTime: "09:00",
//         durationMinutes: "50",
//       },
//     ]);
//   };

//   const handleChange = (index, key, value) => {
//     const updated = [...entries];
//     updated[index][key] = value;
//     setEntries(updated);
//   };

//   const handleSubmit = () => {
//     const grouped = {};
//     entries.forEach(({ day, classCode, startTime, durationMinutes }) => {
//       if (!grouped[day]) grouped[day] = [];
//       grouped[day].push({
//         classCode,
//         startTime,
//         durationMinutes: parseInt(durationMinutes),
//       });
//     });
//     onSave(grouped);
//     onClose();
//   };

//   if (!visible) return null;

//   return (
//     <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex justify-center items-center">
//       <div className="bg-white w-[90vw] max-h-[90vh] overflow-y-auto p-6 rounded-2xl shadow-2xl">
//         <h2 className="text-2xl font-bold text-blue-700 mb-4">
//           Enter Timetable
//         </h2>
//         <div className="space-y-4">
//           {entries.map((entry, idx) => (
//             <div key={idx} className="grid grid-cols-4 gap-4 items-center">
//               <Select
//                 value={entry.day}
//                 onValueChange={(val) => handleChange(idx, "day", val)}
//               >
//                 <SelectTrigger className="h-10">
//                   <SelectValue placeholder="Select Day" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {days.map((d) => (
//                     <SelectItem key={d} value={d}>
//                       {d}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//               <Input
//                 value={entry.classCode}
//                 placeholder="Class Code"
//                 onChange={(e) => handleChange(idx, "classCode", e.target.value)}
//               />
//               <Input
//                 type="time"
//                 value={entry.startTime}
//                 onChange={(e) => handleChange(idx, "startTime", e.target.value)}
//               />
//               <Input
//                 type="number"
//                 value={entry.durationMinutes}
//                 placeholder="Duration (min)"
//                 onChange={(e) =>
//                   handleChange(idx, "durationMinutes", e.target.value)
//                 }
//               />
//             </div>
//           ))}
//         </div>
//         <div className="flex justify-between mt-6">
//           <Button
//             onClick={addEntry}
//             className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl px-4"
//           >
//             + New Class
//           </Button>
//           <div className="flex gap-4">
//             <Button onClick={onClose} variant="outline">
//               Cancel
//             </Button>
//             <Button
//               onClick={handleSubmit}
//               className="bg-green-600 text-white hover:bg-green-700 px-6 rounded-xl"
//             >
//               Submit Timetable
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export default function EnterTimetablePopup({
  visible,
  onClose,
  onSave,
  initialData = {},
}) {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const flattened = [];
    Object.entries(initialData || {}).forEach(([day, slots]) => {
      slots.forEach((slot) => {
        flattened.push({
          day,
          classCode: slot.classCode,
          startTime: slot.startTime,
          durationMinutes: slot.durationMinutes.toString(),
        });
      });
    });
    setEntries(flattened);
  }, [initialData]);

  const addEntry = () => {
    setEntries((prev) => [
      ...prev,
      {
        day: "Monday",
        classCode: "",
        startTime: "09:00",
        durationMinutes: "50",
      },
    ]);
  };

  const handleChange = (index, key, value) => {
    const updated = [...entries];
    updated[index][key] = value;
    setEntries(updated);
  };

  const handleDelete = (index) => {
    const updated = [...entries];
    updated.splice(index, 1);
    setEntries(updated);
  };

  const handleSubmit = () => {
    const grouped = {};
    entries.forEach(({ day, classCode, startTime, durationMinutes }) => {
      if (!grouped[day]) grouped[day] = [];
      grouped[day].push({
        classCode,
        startTime,
        durationMinutes: parseInt(durationMinutes),
      });
    });
    onSave(grouped);
    onClose();
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex justify-center items-center">
      <div className="bg-white w-[90vw] max-h-[90vh] overflow-y-auto p-6 rounded-2xl shadow-2xl">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">
          Enter Timetable
        </h2>
        <div className="space-y-4">
          {entries.map((entry, idx) => (
            <div key={idx} className="grid grid-cols-5 gap-4 items-center">
              <Select
                value={entry.day}
                onValueChange={(val) => handleChange(idx, "day", val)}
              >
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select Day" />
                </SelectTrigger>
                <SelectContent>
                  {days.map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                value={entry.classCode}
                placeholder="Class Code"
                onChange={(e) => handleChange(idx, "classCode", e.target.value)}
              />
              <Input
                type="time"
                value={entry.startTime}
                onChange={(e) => handleChange(idx, "startTime", e.target.value)}
              />
              <Input
                type="number"
                value={entry.durationMinutes}
                placeholder="Duration (min)"
                onChange={(e) =>
                  handleChange(idx, "durationMinutes", e.target.value)
                }
              />
              <Button
                onClick={() => handleDelete(idx)}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                🗑️
              </Button>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-6">
          <Button
            onClick={addEntry}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl px-4"
          >
            + New Class
          </Button>
          <div className="flex gap-4">
            <Button onClick={onClose} variant="outline">
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-green-600 text-white hover:bg-green-700 px-6 rounded-xl"
            >
              Submit Timetable
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
