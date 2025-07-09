import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import Papa from "papaparse";
import axios from "axios";

export default function CreateTimetablePopup({
  onSave,
  advisorEmail,
  setAdvisorEmail,
  groupType,
}) {
  const [fileError, setFileError] = useState("");
  const [timetableData, setTimetableData] = useState([]);
  const [advisors, setAdvisors] = useState([]);
  const expectedFields = ["Day", "Class Code", "Start Time", "Duration (min)"];

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    axios
      .get("http://localhost:8443/SuperAdmin/viewAllTeachers?department=CSE", {
        headers: { Authorization: token },
        withCredentials: true,
      })
      .then((res) => {
        console.log("API Response for advisors:", res.data);

        const validAdvisors = Array.isArray(res.data.details)
          ? res.data.details.filter(
              (teacher) =>
                teacher.class_advisor === "True" && teacher.faculty_email
            )
          : [];

        console.log("Filtered Valid Advisors:", validAdvisors);

        setAdvisors(validAdvisors);
      })
      .catch((error) => {
        console.error("Failed to fetch advisors:", error);
        setAdvisors([]);
      });
  }, []);

  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        const headers = result.meta.fields;
        const data = result.data;

        const isValid = expectedFields.every((field) =>
          headers.includes(field)
        );
        if (!isValid) {
          setFileError(
            "CSV must have headers: Day, Class Code, Start Time, Duration (min)"
          );
          setTimetableData([]);
          return;
        }

        const grouped = data.reduce((acc, row) => {
          const {
            Day,
            "Class Code": classCode,
            "Start Time": startTime,
            "Duration (min)": duration,
          } = row;
          const durationMinutes = parseInt(duration);

          if (Day && classCode && startTime && !isNaN(durationMinutes)) {
            const entry = { classCode, startTime, durationMinutes };
            acc[Day] = acc[Day] ? [...acc[Day], entry] : [entry];
          }
          return acc;
        }, {});

        setTimetableData(grouped);
        setFileError("");
        onSave(grouped);
      },
      error: (err) => {
        console.error("CSV parsing error:", err);
        setFileError("Failed to parse CSV. Make sure it's valid.");
        setTimetableData([]);
      },
    });
  };

  const handleTemplateDownload = () => {
    const csv = [
      "Day,Class Code,Start Time,Duration (min)",
      "Monday,CSE3011,09:00,50",
      "Monday,CSE3012,10:00,50",
      "Tuesday,CSE3013,09:00,50",
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "timetable_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const currentAdvisorEmail = advisorEmail || "";
  const selectedAdvisor = advisors.find(
    (a) => a.faculty_email === currentAdvisorEmail
  );

  console.log("Current advisorEmail passed to Select:", currentAdvisorEmail);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          className="bg-blue-700 text-white"
          onClick={handleTemplateDownload}
        >
          Download Timetable CSV Format
        </Button>
        <Input type="file" accept=".csv" onChange={handleCSVUpload} />
      </div>
      {groupType === "Normal" && (
        <div>
          <label className="font-medium text-blue-700 block mb-2">
            Choose Class Advisor
          </label>
          <Select value={advisorEmail} onValueChange={setAdvisorEmail}>
            <SelectTrigger>
              <SelectValue placeholder="Select Advisor" />
            </SelectTrigger>
            <SelectContent>
              {advisors.map((a) => (
                <SelectItem key={a.faculty_email} value={a.faculty_email}>
                  {a.name} ({a.faculty_email})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {fileError && <p className="text-red-600 text-sm">{fileError}</p>}
    </div>
  );
}
