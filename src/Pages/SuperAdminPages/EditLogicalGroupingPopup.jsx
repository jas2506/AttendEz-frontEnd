import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function EditLogicalGroupPopup({
  visible,
  onClose,
  groupData,
  onSubmit,
}) {
  if (!visible) return null;

  const [advisorEmail, setAdvisorEmail] = React.useState(
    groupData.advisorEmail || ""
  );
  const [registerNumbers, setRegisterNumbers] = React.useState(
    groupData.registernumbers || []
  );
  const classCodeOptions = groupData["class-code"] || [];

  const [timetable, setTimetable] = React.useState(() => {
    const flat = [];
    Object.entries(groupData.timetable || {}).forEach(([day, slots]) => {
      slots.forEach((slot) => {
        flat.push({ ...slot, day });
      });
    });
    return flat;
  });

  const handleTimetableChange = (index, field, value) => {
    setTimetable((prev) =>
      prev.map((slot, i) => (i === index ? { ...slot, [field]: value } : slot))
    );
  };

  const handleSubmit = () => {
    const groupedTimetable = {};
    timetable.forEach(({ day, ...slot }) => {
      if (!groupedTimetable[day]) groupedTimetable[day] = [];
      groupedTimetable[day].push(slot);
    });

    const payload = {
      advisorEmail,
      registernumbers: registerNumbers,
      timetable: groupedTimetable,
      "class-code": Array.from(new Set(timetable.map((t) => t.classCode))),
      degree: groupData.degree,
      passout: groupData.passout,
      section: groupData.section,
    };

    onSubmit(payload);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-[90vw] max-h-[90vh] rounded-2xl overflow-y-auto shadow-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Edit Logical Group
        </h2>

        {/* Advisor Email */}
        <div className="mb-6">
          <label className="text-sm font-semibold text-gray-700 mb-2 block">
            Advisor Email
          </label>
          <Input
            value={advisorEmail}
            onChange={(e) => setAdvisorEmail(e.target.value)}
          />
        </div>

        {/* Register Numbers */}
        <div className="mb-6">
          <label className="text-sm font-semibold text-gray-700 mb-2 block">
            Register Numbers
          </label>
          <div className="space-y-2">
            {registerNumbers.map((reg, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <Input
                  value={reg}
                  onChange={(e) => {
                    const updated = [...registerNumbers];
                    updated[idx] = e.target.value;
                    setRegisterNumbers(updated);
                  }}
                />
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    const updated = [...registerNumbers];
                    updated.splice(idx, 1);
                    setRegisterNumbers(updated);
                  }}
                >
                  🗑️
                </Button>
              </div>
            ))}
          </div>
          <Button
            variant="outline"
            size="sm"
            className="mt-3"
            onClick={() => setRegisterNumbers([...registerNumbers, ""])}
          >
            + Add Register Number
          </Button>
        </div>

        {/* Timetable */}
        <div className="mb-4">
          <label className="text-sm font-semibold text-gray-700 mb-2 block">
            Timetable (editable)
          </label>
          <div className="border rounded-xl overflow-hidden mt-2">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="px-4 py-2">Day</th>
                  <th className="px-4 py-2">Class Code</th>
                  <th className="px-4 py-2">Duration</th>
                  <th className="px-4 py-2">Start Time</th>
                  <th className="px-4 py-2">Change Day</th>
                  <th className="px-4 py-2">Change Class Code</th>
                  <th className="px-4 py-2">Delete</th>
                </tr>
              </thead>
              <tbody>
                {timetable.map((slot, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="px-4 py-2">{slot.day}</td>
                    <td className="px-4 py-2">{slot.classCode}</td>
                    <td className="px-4 py-2">{slot.durationMinutes} min</td>
                    <td className="px-4 py-2">
                      <Input
                        value={slot.startTime}
                        onChange={(e) =>
                          handleTimetableChange(
                            idx,
                            "startTime",
                            e.target.value
                          )
                        }
                        className="w-24"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <Select
                        value={slot.day}
                        onValueChange={(val) =>
                          handleTimetableChange(idx, "day", val)
                        }
                      >
                        <SelectTrigger className="w-32 h-9">
                          <SelectValue placeholder="Day" />
                        </SelectTrigger>
                        <SelectContent>
                          {[
                            "Monday",
                            "Tuesday",
                            "Wednesday",
                            "Thursday",
                            "Friday",
                            "Saturday",
                            "Sunday",
                          ].map((d) => (
                            <SelectItem key={d} value={d}>
                              {d}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-4 py-2">
                      <Select
                        value={slot.classCode}
                        onValueChange={(val) =>
                          handleTimetableChange(idx, "classCode", val)
                        }
                      >
                        <SelectTrigger className="w-32 h-9">
                          <SelectValue placeholder="Class Code" />
                        </SelectTrigger>
                        <SelectContent>
                          {classCodeOptions.map((code) => (
                            <SelectItem key={code} value={code}>
                              {code}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-4 py-2">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          const updated = [...timetable];
                          updated.splice(idx, 1);
                          setTimetable(updated);
                        }}
                      >
                        🗑️
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="mt-3"
            onClick={() =>
              setTimetable([
                ...timetable,
                {
                  day: "Monday",
                  classCode: classCodeOptions[0] || "",
                  startTime: "09:00",
                  durationMinutes: 50,
                },
              ])
            }
          >
            + Add Class
          </Button>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-4 mt-8">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-blue-600 text-white">
            Submit Edit
          </Button>
        </div>
      </div>
    </div>
  );
}
