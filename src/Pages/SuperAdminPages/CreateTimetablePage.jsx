import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const periods = [1, 2, 3, 4, 5, 6, 7, 8];

function CreateTimetablePopup({ open, setOpen }) {
  const [timetable, setTimetable] = useState(() => {
    const table = {};
    days.forEach((day) => {
      table[day] = Array(8).fill(null);
    });
    return table;
  });

  const [selectedCell, setSelectedCell] = useState(null); // { day, idx }
  const [formData, setFormData] = useState({
    classCode: "",
    startTime: "",
    duration: "",
  });

  const handleCellClick = (day, idx) => {
    const data = timetable[day][idx];
    setSelectedCell({ day, idx });
    setFormData({
      classCode: data?.classCode || "",
      startTime: data?.startTime || "",
      duration: data?.duration || "",
    });
  };

  const handleSave = () => {
    const { day, idx } = selectedCell;
    setTimetable((prev) => {
      const updated = [...prev[day]];
      updated[idx] = { ...formData };
      return { ...prev, [day]: updated };
    });
    setSelectedCell(null);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="!w-[1500px] !h-[92vh] !max-w-none !max-h-none p-8 rounded-lg backdrop-blur-md overflow-hidden">
        <DialogHeader className="relative mb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-3xl text-blue-700 font-bold">
              Create Timetable
            </DialogTitle>

            {/* Save button aligned to the right */}
            <Button
              className="bg-blue-600 text-white text-sm px-5 py-2 hover:bg-blue-700"
              onClick={() => {
                // Call your save function here
                console.log("Saving timetable...");
              }}
            >
              Save
            </Button>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-[140px_repeat(8,1fr)] w-full h-[75vh]">
          <div className="font-bold text-blue-700 py-2 border border-gray-300 bg-blue-100 flex items-center justify-center">
            Day / Period
          </div>

          {periods.map((p) => (
            <div
              key={p}
              className="font-semibold text-blue-700 py-2 border border-gray-300 bg-blue-100 flex items-center justify-center"
            >
              Period{p}
            </div>
          ))}

          {days.map((day) => (
            <React.Fragment key={day}>
              <div className="text-center font-semibold text-blue-800 border border-gray-300 bg-blue-50 flex items-center justify-center">
                {day}
              </div>
              {timetable[day].map((cell, idx) => (
                <div
                  key={idx}
                  onClick={() => handleCellClick(day, idx)}
                  className="border border-gray-300 bg-white p-2 text-sm cursor-pointer hover:bg-blue-50 transition-all flex flex-col justify-center items-center text-center"
                >
                  {cell ? (
                    <>
                      <div className="font-medium text-blue-700">
                        {cell.classCode}
                      </div>
                      <div className="text-gray-500 text-xs">
                        {cell.startTime} | {cell.duration} min
                      </div>
                    </>
                  ) : (
                    <div className="text-gray-400 italic">Click to add</div>
                  )}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>

        <div className="flex justify-end mt-6">
          <Button
            className="bg-blue-600 text-white hover:bg-blue-700"
            onClick={() => setOpen(false)}
          >
            Done
          </Button>
        </div>
      </DialogContent>

      {/* Mini pop-up for individual cell input */}
      {selectedCell && (
        <Dialog open onOpenChange={() => setSelectedCell(null)}>
          <DialogContent className="max-w-sm rounded-lg">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-blue-600 text-center">
                Enter Period Details
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-2">
              <Input
                placeholder="Class Code"
                value={formData.classCode}
                onChange={(e) =>
                  setFormData((f) => ({ ...f, classCode: e.target.value }))
                }
              />
              <Input
                type="time"
                value={formData.startTime}
                onChange={(e) =>
                  setFormData((f) => ({ ...f, startTime: e.target.value }))
                }
              />
              <Input
                type="number"
                placeholder="Duration (in min)"
                value={formData.duration}
                onChange={(e) =>
                  setFormData((f) => ({ ...f, duration: e.target.value }))
                }
              />
            </div>
            <div className="flex justify-end mt-4 gap-2">
              <Button variant="outline" onClick={() => setSelectedCell(null)}>
                Cancel
              </Button>
              <Button onClick={handleSave} className="bg-blue-600 text-white">
                OK
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </Dialog>
  );
}

export default CreateTimetablePopup;
