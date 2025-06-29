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

export default function CreateDeleteStudentPage() {
  const [uploadedData, setUploadedData] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [electiveOrSection, setElectiveOrSection] = useState("");

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

  return (
    <div className="min-h-screen bg-blue-50">
      {/* ✅ Navbar at the top */}
      <NavbarSuperAdmin setIsLoggedIn={() => {}} />

      {/* ✅ Page content below navbar */}
      <div className="p-6 flex justify-center items-start">
        <Card className="w-full max-w-4xl shadow-xl bg-white">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
              Add or Delete Students
            </h2>

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
              <div className="md:col-span-2">
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
            </div>

            {uploadedData.length > 0 && (
              <div className="bg-blue-100 rounded-lg p-4 mb-6">
                <h3 className="text-blue-800 font-semibold mb-2">
                  Student List
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
                        {entry.Name}, {entry["Register Number"]}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <Button className="bg-blue-600 text-white px-6">
                Delete Students
              </Button>
              <Button className="bg-blue-600 text-white px-6">
                Save Students
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
