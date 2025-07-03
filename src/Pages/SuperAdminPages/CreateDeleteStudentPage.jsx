import React, { useState } from "react";
import Papa from "papaparse";
import NavbarSuperAdmin from "./NavBarSuperAdmin";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function CreateDeleteStudentPage() {
  const [mode, setMode] = useState("add");
  const [uploadedData, setUploadedData] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [studentData, setStudentData] = useState(allStudents.details); // For deletion view

  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        setUploadedData(results.data);
        setSelectedStudents(results.data.map((_, i) => i));
      },
    });
  };

  const clearCSVUpload = () => {
    setUploadedData([]);
    setSelectedStudents([]);
  };

  const downloadSampleCSV = () => {
    const sample = `Email,name,registerNumber,passout,degree,digitalID,course\njohn@ssn.edu.in,John,3122235001001,2027,B.E,2310333,Computer Science And Engineering`;
    const blob = new Blob([sample], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "AddStudentFormat.csv";
    link.click();
  };

  const toggleStudentSelection = (index) => {
    setSelectedStudents((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleDelete = () => {
    const selectedRegisterNumbers = selectedStudents.map(
      (i) => sortedStudents[i].registerNumber
    );
    console.log("Deleted Register Numbers:", selectedRegisterNumbers);

    const remaining = sortedStudents.filter(
      (_, i) => !selectedStudents.includes(i)
    );
    setStudentData(remaining);
    setSelectedStudents([]);

    // Optional: Refresh page
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const sortedStudents = [...studentData].sort((a, b) =>
    a.registerNumber.localeCompare(b.registerNumber)
  );

  return (
    <div className="min-h-screen bg-blue-50">
      <NavbarSuperAdmin setIsLoggedIn={() => {}} />

      <div className="p-6 flex justify-center items-start">
        <Card className="w-full max-w-5xl shadow-xl bg-white">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
              Add or Delete Students
            </h2>

            {/* Toggle Group */}
            <div className="flex justify-center mb-6">
              <ToggleGroup
                type="single"
                value={mode}
                onValueChange={(val) => val && setMode(val)}
                className="bg-blue-100 rounded-lg"
              >
                <ToggleGroupItem
                  value="add"
                  className="data-[state=on]:bg-blue-600 data-[state=on]:text-white px-4 py-2"
                >
                  Add Students
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="delete"
                  className="data-[state=on]:bg-blue-600 data-[state=on]:text-white px-4 py-2"
                >
                  Delete Students
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            {/* Common Inputs */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <Label>Department</Label>
                <Input value="CSE" disabled className="bg-gray-100" />
              </div>
              <div>
                <Label>Degree</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select degree" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="btech">B.Tech</SelectItem>
                    <SelectItem value="mtech">M.Tech</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Year of Passout</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2025">2025</SelectItem>
                    <SelectItem value="2026">2026</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Section / Elective</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select section" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="section-a">Section A</SelectItem>
                    <SelectItem value="section-b">Section B</SelectItem>
                    <SelectItem value="ai-ml">AI & ML Elective</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Add Mode CSV Upload */}
            {mode === "add" && (
              <div className="mb-6">
                <Label>Upload CSV File</Label>
                <div className="flex flex-col sm:flex-row gap-2 mt-1">
                  <Input type="file" accept=".csv" onChange={handleCSVUpload} />
                  <Button
                    variant="outline"
                    className="text-blue-700 border-blue-700"
                    onClick={downloadSampleCSV}
                  >
                    Download Sample CSV
                  </Button>
                  {uploadedData.length > 0 && (
                    <Button
                      variant="ghost"
                      className="text-red-600"
                      onClick={clearCSVUpload}
                    >
                      Clear Upload
                    </Button>
                  )}
                </div>
              </div>
            )}

            {/* Add Mode Preview */}
            {mode === "add" && uploadedData.length > 0 && (
              <div className="bg-blue-100 rounded-lg p-4 mb-6">
                <h3 className="text-blue-800 font-semibold mb-2">
                  Uploaded Students
                </h3>
                <ul className="text-sm text-blue-900 space-y-1">
                  {uploadedData.map((entry, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                      <Checkbox
                        id={`student-${idx}`}
                        checked={selectedStudents.includes(idx)}
                        onCheckedChange={() => toggleStudentSelection(idx)}
                      />
                      <label htmlFor={`student-${idx}`}>
                        {entry.name}, {entry.registerNumber}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Delete Mode Table */}
            {mode === "delete" && (
              <div className="bg-blue-100 rounded-lg p-4 mb-6">
                <h3 className="text-blue-800 font-semibold mb-4 text-center">
                  Select Students to Delete
                </h3>
                <div className="overflow-x-auto">
                  <div className="max-h-[400px] overflow-y-auto rounded-lg">
                    <table className="min-w-full text-sm text-left text-blue-900">
                      <thead className="text-xs uppercase text-blue">
                        <tr>
                          <th className="px-3 py-2">Select</th>
                          <th className="px-3 py-2">Name</th>
                          <th className="px-3 py-2">Register Number</th>
                          <th className="px-3 py-2">Passout</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sortedStudents.map((student, idx) => (
                          <tr key={student.digitalid} className="">
                            <td className="px-3 py-2">
                              <Checkbox
                                checked={selectedStudents.includes(idx)}
                                onCheckedChange={() =>
                                  toggleStudentSelection(idx)
                                }
                              />
                            </td>
                            <td className="px-3 py-2">{student.name}</td>
                            <td className="px-3 py-2">
                              {student.registerNumber}
                            </td>
                            <td className="px-3 py-2">{student.passout}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              {mode === "delete" ? (
                <Button
                  className="bg-blue-600 text-white px-6"
                  onClick={handleDelete}
                >
                  Delete Selected
                </Button>
              ) : (
                <Button className="bg-blue-600 text-white px-6">
                  Save Students
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Paste your existing `allStudents` object here
const allStudents = {
  details: [
    {
      digitalid: "2310327",
      passout: "2027",
      registeredGroupings: ["CSE2027B", "CSEELE2H22A2027"],
      name: "Murari Sreekumar",
      degree: "B.E",
      course: "Computer Science and Engineering",
      registerNumber: "3122235001087",
      department: "CSE",
      registeredClasses: [
        "CSE2701B",
        "ELE2H22A",
        "CSE2702B",
        "CSE2703B",
        "CSE2704B",
        "CSE2705B",
      ],
      email: "murari2310237@ssn.edu.in",
    },
    {
      digitalid: "2310325",
      passout: "2027",
      registeredGroupings: ["CSE2027B"],
      name: "Jaswanth Sridharan",
      degree: "B.E",
      course: "Computer Science and Engineering",
      registerNumber: "3122235001059",
      department: "CSE",
      registeredClasses: [
        "CSE2701B",
        "CSE2702B",
        "CSE2703B",
        "CSE2704B",
        "CSE2705B",
      ],
      email: "jaswanth2310325@ssn.edu.in",
    },
    {
      digitalid: "2310324",
      passout: "2027",
      registeredGroupings: ["CSE2027B"],
      name: "Saipranav",
      degree: "B.E",
      course: "Computer Science and Engineering",
      registerNumber: "3122235001110",
      department: "CSE",
      registeredClasses: [
        "CSE2701B",
        "CSE2702B",
        "CSE2703B",
        "CSE2704B",
        "CSE2705B",
      ],
      email: "saipranav2310324@ssn.edu.in",
    },
    {
      digitalid: "2310332",
      passout: "2027",
      registeredGroupings: ["CSE2027B", "CSEELE2H22A2027"],
      name: "Gautham Narayanan G",
      degree: "B.E",
      course: "Computer Science and Engineering",
      registerNumber: "3122235001052",
      department: "CSE",
      registeredClasses: [
        "CSE2701B",
        "ELE2H22A",
        "CSE2702B",
        "CSE2703B",
        "CSE2704B",
        "CSE2705B",
      ],
      email: "gauthamnarayan2310332@ssn.edu.in",
    },
    {
      digitalid: "2310483",
      passout: "2027",
      name: "Rohit Kumar",
      degree: "B.E",
      course: "Computer Science Engineering",
      registerNumber: "3122235001103",
      department: "CSE",
      email: "rohit2310483@ssn.edu.in",
    },
    {
      digitalid: "2310485",
      passout: "2027",
      name: "Sanjay R",
      degree: "B.E",
      course: "Computer Science Engineering",
      registerNumber: "3122235001105",
      department: "CSE",
      email: "sanjay2310485@ssn.edu.in",
    },
    {
      digitalid: "2310486",
      passout: "2027",
      name: "Divya S",
      degree: "B.E",
      course: "Computer Science Engineering",
      registerNumber: "3122235001106",
      department: "CSE",
      email: "divya2310486@ssn.edu.in",
    },
    {
      digitalid: "2310487",
      passout: "2027",
      name: "Arjun K",
      degree: "B.E",
      course: "Computer Science Engineering",
      registerNumber: "3122235001107",
      department: "CSE",
      email: "arjun2310487@ssn.edu.in",
    },
    {
      digitalid: "2310482",
      passout: "2027",
      name: "Meghana R",
      degree: "B.E",
      course: "Computer Science Engineering",
      registerNumber: "3122235001102",
      department: "CSE",
      email: "meghana2310482@ssn.edu.in",
    },
    {
      digitalid: "2310488",
      passout: "2027",
      name: "Shruti R",
      degree: "B.E",
      course: "Computer Science Engineering",
      registerNumber: "3122235001108",
      department: "CSE",
      email: "shruti2310488@ssn.edu.in",
    },
    {
      digitalid: "2310480",
      passout: "2027",
      name: "Pranav S",
      degree: "B.E",
      course: "Computer Science Engineering",
      registerNumber: "3122235001100",
      department: "CSE",
      email: "pranav2310480@ssn.edu.in",
    },
    {
      digitalid: "2310489",
      passout: "2027",
      name: "Vignesh S",
      degree: "B.E",
      course: "Computer Science Engineering",
      registerNumber: "3122235001109",
      department: "CSE",
      email: "vignesh2310489@ssn.edu.in",
    },
    {
      digitalid: "2310481",
      passout: "2027",
      name: "Karthik V",
      degree: "B.E",
      course: "Computer Science Engineering",
      registerNumber: "3122235001101",
      department: "CSE",
      email: "karthik2310481@ssn.edu.in",
    },
    {
      digitalid: "2310484",
      passout: "2027",
      name: "Ananya M",
      degree: "B.E",
      course: "Computer Science Engineering",
      registerNumber: "3122235001104",
      department: "CSE",
      email: "ananya2310484@ssn.edu.in",
    },
    {
      digitalid: "2310479",
      passout: "2027",
      name: "Sranav S",
      degree: "B.E",
      course: "Computer Science Engineering",
      registerNumber: "3122235001900",
      department: "CSE",
      email: "pranav2310480@ssn.edu.in",
    },
  ],
  message: "student details retrieved sucessfuly",
  status: "S",
};
