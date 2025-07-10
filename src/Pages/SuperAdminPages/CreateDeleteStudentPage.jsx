import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import axios from "axios";
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
import { toast } from "sonner";
import { RefreshCcw } from "lucide-react";
import { Loader2 } from "lucide-react";

const backendUrl = import.meta.env.VITE_BACKEND_URL;


export default function CreateDeleteStudentPage() {
  const [mode, setMode] = useState("add");
  const [uploadedData, setUploadedData] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("jwtToken");
      const response = await axios.post(
        `${backendUrl}/SuperAdmin/viewAllStudents`,
        { depts: ["CSE"] },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.status === "S") {
        setStudentData(response.data.details);
      } else {
        toast.error("Failed to fetch students.");
      }
    } catch (err) {
      console.error("Error fetching students:", err);
      toast.error("Error fetching students.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const normalized = results.data.map((row) => ({
          email: row.Email?.trim() || row.email?.trim() || "",
          name: row.name?.trim() || "",
          registerNumber: row.registerNumber?.trim() || "",
          passout: row.passout?.trim() || "",
          degree: row.degree?.trim() || "",
          digitalid: row.digitalid?.trim() || row.digitalID?.trim() || "",
          course: row.course?.trim() || "",
        }));
        setUploadedData(normalized);
        setSelectedStudents(normalized.map((_, i) => i));
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

  const handleDeleteConfirmed = async () => {
    const selectedRegisterNumbers = selectedStudents.map(
      (i) => sortedStudents[i].registerNumber
    );

    const token = localStorage.getItem("jwtToken");
    if (!token) {
      toast.error("No auth token found. Please log in again.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.delete(
        `${backendUrl}/SuperAdmin/deleteStudents`,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          data: { registernumbers: selectedRegisterNumbers },
        }
      );

      if (response.data.status === "S") {
        toast.success("Students deleted successfully.");
        setSelectedStudents([]);
        fetchStudents();
      } else {
        toast.error("Delete failed: " + response.data.message);
      }
    } catch (error) {
      toast.error("Error deleting students.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    if (selectedStudents.length === 0) {
      toast.error("Please select at least one student.");
      return;
    }

    toast.custom((t) => (
      <div className="bg-white border border-red-300 p-4 rounded shadow-md max-w-md">
        <p className="text-red-700 font-semibold mb-2">
          Are you sure you want to delete the selected students?
        </p>
        <div className="flex justify-end gap-4">
          <Button onClick={() => toast.dismiss(t)} variant="outline">
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              handleDeleteConfirmed();
              toast.dismiss(t);
            }}
          >
            Yes, Delete
          </Button>
        </div>
      </div>
    ));
  };

  const handleSaveStudents = async () => {
    const selected = uploadedData.filter((_, idx) =>
      selectedStudents.includes(idx)
    );
    if (selected.length === 0) return;

    const token = localStorage.getItem("jwtToken");
    if (!token) {
      toast.error("No auth token found. Please log in again.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${backendUrl}/SuperAdmin/addStudents`,
        selected,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === "S") {
        toast.success("Students added successfully.");
        setUploadedData([]);
        setSelectedStudents([]);
      } else {
        toast.error("Add failed: " + response.data.message);
      }
    } catch (error) {
      toast.error("Error adding students.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const sortedStudents = [...studentData].sort((a, b) =>
    a.registerNumber.localeCompare(b.registerNumber)
  );

  return (
    <div className="min-h-screen bg-blue-50">
      {loading && (
        <div className="fixed inset-0 z-50 bg-black/20 flex justify-center items-center">
          <Loader2 className="animate-spin w-10 h-10 text-blue-600" />
        </div>
      )}
      <NavbarSuperAdmin setIsLoggedIn={() => {}} />

      <div className="p-6 flex justify-center items-start">
        <Card className="w-full max-w-5xl shadow-xl bg-white">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
              Add or Delete Students
            </h2>

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
                  View Students
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            {mode === "add" && (
              <>
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
                <div className="mb-6">
                  <Label>Upload CSV File</Label>
                  <div className="flex flex-col sm:flex-row gap-2 mt-1">
                    <Input
                      type="file"
                      accept=".csv"
                      onChange={handleCSVUpload}
                    />
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
                {uploadedData.length > 0 && (
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
              </>
            )}

            {mode === "delete" && (
              <div className="bg-white border border-blue-300 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-blue-800 font-semibold text-lg">
                    Select Students to Delete
                  </h3>
                  <Button
                    variant="ghost"
                    className="text-blue-600 hover:bg-blue-100 p-2"
                    onClick={fetchStudents}
                  >
                    <RefreshCcw className="h-4 w-4 mr-1" />
                    Refresh List
                  </Button>
                </div>
                <div className="overflow-x-auto custom-scrollbar">
                  <div className="max-h-[400px] overflow-y-auto rounded-lg custom-scrollbar">
                    <table className="min-w-full text-sm text-left text-blue-900">
                      <thead className="bg-blue-200 text-blue-900 font-bold">
                        <tr>
                          <th className="px-3 py-2 text-center">Select</th>
                          <th className="px-3 py-2 text-center">Name</th>
                          <th className="px-3 py-2 text-center">
                            Register Number
                          </th>
                          <th className="px-3 py-2 text-center">Passout</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sortedStudents.map((student, idx) => (
                          <tr
                            key={student.digitalid}
                            className={
                              idx % 2 === 0 ? "bg-white" : "bg-slate-50"
                            }
                          >
                            <td className="px-3 py-2 text-center">
                              <Checkbox
                                checked={selectedStudents.includes(idx)}
                                onCheckedChange={() =>
                                  toggleStudentSelection(idx)
                                }
                                className="border-blue-700"
                              />
                            </td>
                            <td className="px-3 py-2 text-center">
                              {student.name}
                            </td>
                            <td className="px-3 py-2 text-center">
                              {student.registerNumber}
                            </td>
                            <td className="px-3 py-2 text-center">
                              {student.passout}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-wrap justify-center gap-4 mt-6">
              {mode === "delete" ? (
                <Button
                  className="bg-blue-600 text-white px-6"
                  onClick={handleDelete}
                >
                  Delete Selected
                </Button>
              ) : (
                <Button
                  className="bg-blue-600 text-white px-6"
                  onClick={handleSaveStudents}
                >
                  Save Students
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #60a5fa;
          border-radius: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #e0f2fe;
        }
      `}</style>
    </div>
  );
}
