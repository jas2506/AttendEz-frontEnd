// import React, { useState, useEffect } from "react";
// import Papa from "papaparse";
// import axios from "axios";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";
// import { Card, CardContent } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { Checkbox } from "@/components/ui/checkbox";
// import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
// import { toast } from "sonner";
// import { RefreshCcw } from "lucide-react";
// import { Loader2 } from "lucide-react";
//
// const backendUrl = import.meta.env.VITE_BACKEND_URL;
//
//
// export default function CreateDeleteStudentPage() {
//   const [mode, setMode] = useState("add");
//   const [uploadedData, setUploadedData] = useState([]);
//   const [selectedStudents, setSelectedStudents] = useState([]);
//   const [studentData, setStudentData] = useState([]);
//   const [loading, setLoading] = useState(false);
//
//   const fetchStudents = async () => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem("jwtToken");
//       const response = await axios.post(
//         `${backendUrl}/SuperAdmin/viewAllStudents`,
//         { depts: ["CSE"] },
//         {
//           headers: {
//             Authorization: token,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       if (response.data.status === "S") {
//         setStudentData(response.data.details);
//       } else {
//         toast.error("Failed to fetch students.");
//       }
//     } catch (err) {
//       console.error("Error fetching students:", err);
//       toast.error("Error fetching students.");
//     } finally {
//       setLoading(false);
//     }
//   };
//
//   useEffect(() => {
//     fetchStudents();
//   }, []);
//
//   const handleCSVUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     Papa.parse(file, {
//       header: true,
//       skipEmptyLines: true,
//       complete: function (results) {
//         // const normalized = results.data.map((row) => ({
//         //   email: row.Email?.trim() || row.email?.trim() || "",
//         //   name: row.name?.trim() || "",
//         //   registerNumber: row.registerNumber?.trim() || "",
//         //   passout: row.passout?.trim() || "",
//         //   degree: row.degree?.trim() || "",
//         //   digitalid: row.digitalid?.trim() || row.digitalID?.trim() || "",
//         //   course: row.course?.trim() || "",
//         // }));
//         // const normalized = results.data.map((row) => {
//         //   const reg = (row.registerNumber ?? "").toString().trim();
//         //   const registerNumber = /^\d+(\.\d+)?e\+\d+$/i.test(reg)
//         //       ? Number(reg).toFixed(0)
//         //       : reg.replace(/[^0-9]/g, "");
//         //
//         //   return {
//         //     email: row.Email?.trim() || row.email?.trim() || "",
//         //     name: row.name?.trim() || "",
//         //     registerNumber,
//         //     passout: row.passout?.trim() || "",
//         //     degree: row.degree?.trim() || "",
//         //     digitalid: row.digitalid?.trim() || row.digitalID?.trim() || "",
//         //     course: row.course?.trim() || "",
//         //   };
//         // });
//         const normalized = results.data.map((row) => ({
//           email: row.Email?.trim() || row.email?.trim() || "",
//           name: row.name?.trim() || "",
//           registerNumber: row.registerNumber?.trim() || "",
//           digitalid: row.digitalid?.trim() || row.digitalID?.trim() || "",
//           passout: selectedPassoutYear,     // from website dropdown
//           degree: selectedDegree,           // from website dropdown
//           course: selectedCourse,           // optional: from dropdown
//         }));
//
//
//
//         setUploadedData(normalized);
//         setSelectedStudents(normalized.map((_, i) => i));
//       },
//     });
//   };
//
//   const clearCSVUpload = () => {
//     setUploadedData([]);
//     setSelectedStudents([]);
//   };
//
//   const downloadSampleCSV = () => {
//     const sample = `Email,name,registerNumber,digitalID\njohn@ssn.edu.in,John,3122235001001,2310333`;
//     const blob = new Blob([sample], { type: "text/csv;charset=utf-8;" });
//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(blob);
//     link.download = "AddStudentFormat.csv";
//     link.click();
//   };
//
//
//
//   const toggleStudentSelection = (index) => {
//     setSelectedStudents((prev) =>
//       prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
//     );
//   };
//
//   const handleDeleteConfirmed = async () => {
//     const selectedRegisterNumbers = selectedStudents.map(
//       (i) => sortedStudents[i].registerNumber
//     );
//
//     const token = localStorage.getItem("jwtToken");
//     if (!token) {
//       toast.error("No auth token found. Please log in again.");
//       return;
//     }
//
//     try {
//       setLoading(true);
//       const response = await axios.delete(
//         `${backendUrl}/SuperAdmin/deleteStudents`,
//         {
//           headers: {
//             Authorization: token,
//             "Content-Type": "application/json",
//           },
//           data: { registernumbers: selectedRegisterNumbers },
//         }
//       );
//
//       if (response.data.status === "S") {
//         toast.success("Students deleted successfully.");
//         setSelectedStudents([]);
//         fetchStudents();
//       } else {
//         toast.error("Delete failed: " + response.data.message);
//       }
//     } catch (error) {
//       toast.error("Error deleting students.");
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };
//
//   const handleDelete = () => {
//     if (selectedStudents.length === 0) {
//       toast.error("Please select at least one student.");
//       return;
//     }
//
//     toast.custom((t) => (
//       <div className="bg-white border border-red-300 p-4 rounded shadow-md max-w-md">
//         <p className="text-red-700 font-semibold mb-2">
//           Are you sure you want to delete the selected students?
//         </p>
//         <div className="flex justify-end gap-4">
//           <Button onClick={() => toast.dismiss(t)} variant="outline">
//             Cancel
//           </Button>
//           <Button
//             variant="destructive"
//             onClick={() => {
//               handleDeleteConfirmed();
//               toast.dismiss(t);
//             }}
//           >
//             Yes, Delete
//           </Button>
//         </div>
//       </div>
//     ));
//   };
//
//   const handleSaveStudents = async () => {
//     const selected = uploadedData.filter((_, idx) =>
//       selectedStudents.includes(idx)
//     );
//     if (selected.length === 0) return;
//
//     const token = localStorage.getItem("jwtToken");
//     if (!token) {
//       toast.error("No auth token found. Please log in again.");
//       return;
//     }
//
//     try {
//       setLoading(true);
//       const response = await axios.post(
//         `${backendUrl}/SuperAdmin/addStudents`,
//         selected,
//         {
//           headers: {
//             Authorization: token,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//
//       if (response.data.status === "S") {
//         toast.success("Students added successfully.");
//         setUploadedData([]);
//         setSelectedStudents([]);
//       } else {
//         toast.error("Add failed: " + response.data.message);
//       }
//     } catch (error) {
//       toast.error("Error adding students.");
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };
//
//   const sortedStudents = [...studentData].sort((a, b) =>
//     a.registerNumber.localeCompare(b.registerNumber)
//   );
//
//   return (
//     <div className="min-h-screen bg-blue-50">
//       {loading && (
//         <div className="fixed inset-0 z-50 bg-black/20 flex justify-center items-center">
//           <Loader2 className="animate-spin w-10 h-10 text-blue-600" />
//         </div>
//       )}
//
//       <div className="p-6 flex justify-center items-start">
//         <Card className="w-full max-w-5xl shadow-xl bg-white">
//           <CardContent className="p-6">
//             <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
//               Add or Delete Students
//             </h2>
//
//             <div className="flex justify-center mb-6">
//               <ToggleGroup
//                 type="single"
//                 value={mode}
//                 onValueChange={(val) => val && setMode(val)}
//                 className="bg-blue-100 rounded-lg"
//               >
//                 <ToggleGroupItem
//                   value="add"
//                   className="data-[state=on]:bg-blue-600 data-[state=on]:text-white px-4 py-2"
//                 >
//                   Add Students
//                 </ToggleGroupItem>
//                 <ToggleGroupItem
//                   value="delete"
//                   className="data-[state=on]:bg-blue-600 data-[state=on]:text-white px-4 py-2"
//                 >
//                   View Students
//                 </ToggleGroupItem>
//               </ToggleGroup>
//             </div>
//
//             {mode === "add" && (
//               <>
//                 <div className="grid md:grid-cols-2 gap-6 mb-6">
//                   <div>
//                     <Label>Department</Label>
//                     <Input value="CSE" disabled className="bg-gray-100" />
//                   </div>
//                   <div>
//                     <Label>Degree</Label>
//                     <Select>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select degree" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="btech">B.Tech</SelectItem>
//                         <SelectItem value="mtech">M.Tech</SelectItem>
//                         <SelectItem value="be">B.E.</SelectItem>
//                         <SelectItem value="me">M.E.</SelectItem>
//
//                       </SelectContent>
//                     </Select>
//                   </div>
//                   <div>
//                     <Label>Year of Passout</Label>
//                     <Select>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select year" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="2025">2025</SelectItem>
//                         <SelectItem value="2026">2026</SelectItem>
//                         <SelectItem value="2027">2027</SelectItem>
//                         <SelectItem value="2028">2028</SelectItem>
//                         <SelectItem value="2029">2029</SelectItem>
//                         <SelectItem value="2030">2030</SelectItem>
//                         <SelectItem value="2031">2031</SelectItem>
//                         <SelectItem value="2032">2032</SelectItem>
//                         <SelectItem value="2033">2033</SelectItem>
//                         <SelectItem value="2034">2034</SelectItem>
//                         <SelectItem value="2035">2035</SelectItem>
//
//
//
//                       </SelectContent>
//                     </Select>
//                   </div>
//
//                 </div>
//                 <div className="mb-6">
//                   <Label>Upload CSV File</Label>
//                   <div className="flex flex-col sm:flex-row gap-2 mt-1">
//                     <Input
//                       type="file"
//                       accept=".csv"
//                       onChange={handleCSVUpload}
//                     />
//                     <Button
//                       variant="outline"
//                       className="text-blue-700 border-blue-700"
//                       onClick={downloadSampleCSV}
//                     >
//                       Download Sample CSV
//                     </Button>
//                     {uploadedData.length > 0 && (
//                       <Button
//                         variant="ghost"
//                         className="text-red-600"
//                         onClick={clearCSVUpload}
//                       >
//                         Clear Upload
//                       </Button>
//                     )}
//                   </div>
//                 </div>
//                 {uploadedData.length > 0 && (
//                   <div className="bg-blue-100 rounded-lg p-4 mb-6">
//                     <h3 className="text-blue-800 font-semibold mb-2">
//                       Uploaded Students
//                     </h3>
//                     <ul className="text-sm text-blue-900 space-y-1">
//                       {uploadedData.map((entry, idx) => (
//                         <li key={idx} className="flex items-center space-x-2">
//                           <Checkbox
//                             id={`student-${idx}`}
//                             checked={selectedStudents.includes(idx)}
//                             onCheckedChange={() => toggleStudentSelection(idx)}
//                           />
//                           <label htmlFor={`student-${idx}`}>
//                             {entry.name}, {entry.registerNumber}
//                           </label>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//               </>
//             )}
//
//             {mode === "delete" && (
//               <div className="bg-white border border-blue-300 rounded-lg p-4 mb-6">
//                 <div className="flex items-center justify-between mb-4">
//                   <h3 className="text-blue-800 font-semibold text-lg">
//                     Select Students to Delete
//                   </h3>
//                   <Button
//                     variant="ghost"
//                     className="text-blue-600 hover:bg-blue-100 p-2"
//                     onClick={fetchStudents}
//                   >
//                     <RefreshCcw className="h-4 w-4 mr-1" />
//                     Refresh List
//                   </Button>
//                 </div>
//                 <div className="overflow-x-auto custom-scrollbar">
//                   <div className="max-h-[400px] overflow-y-auto rounded-lg custom-scrollbar">
//                     <table className="min-w-full text-sm text-left text-blue-900">
//                       <thead className="bg-blue-200 text-blue-900 font-bold">
//                         <tr>
//                           <th className="px-3 py-2 text-center">Select</th>
//                           <th className="px-3 py-2 text-center">Name</th>
//                           <th className="px-3 py-2 text-center">
//                             Register Number
//                           </th>
//                           <th className="px-3 py-2 text-center">Passout</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {sortedStudents.map((student, idx) => (
//                           <tr
//                             key={student.digitalid}
//                             className={
//                               idx % 2 === 0 ? "bg-white" : "bg-slate-50"
//                             }
//                           >
//                             <td className="px-3 py-2 text-center">
//                               <Checkbox
//                                 checked={selectedStudents.includes(idx)}
//                                 onCheckedChange={() =>
//                                   toggleStudentSelection(idx)
//                                 }
//                                 className="border-blue-700"
//                               />
//                             </td>
//                             <td className="px-3 py-2 text-center">
//                               {student.name}
//                             </td>
//                             <td className="px-3 py-2 text-center">
//                               {student.registerNumber}
//                             </td>
//                             <td className="px-3 py-2 text-center">
//                               {student.passout}
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               </div>
//             )}
//
//             <div className="flex flex-wrap justify-center gap-4 mt-6">
//               {mode === "delete" ? (
//                 <Button
//                   className="bg-blue-600 text-white px-6"
//                   onClick={handleDelete}
//                 >
//                   Delete Selected
//                 </Button>
//               ) : (
//                 <Button
//                   className="bg-blue-600 text-white px-6"
//                   onClick={handleSaveStudents}
//                 >
//                   Save Students
//                 </Button>
//               )}
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//
//       <style>{`
//         .custom-scrollbar::-webkit-scrollbar {
//           width: 10px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background-color: #60a5fa;
//           border-radius: 6px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: #e0f2fe;
//         }
//       `}</style>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import axios from "axios";
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
import { RefreshCcw, Plus, Trash2 } from "lucide-react";
import { Loader2 } from "lucide-react";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function CreateDeleteStudentPage() {
  const [mode, setMode] = useState("add");
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Form states
  const [selectedDegree, setSelectedDegree] = useState("");
  const [selectedPassoutYear, setSelectedPassoutYear] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");

  // Students to be added
  const [studentsToAdd, setStudentsToAdd] = useState([]);

  // Current form data
  const [currentStudent, setCurrentStudent] = useState({
    email: "",
    name: "",
    registerNumber: "",
    digitalid: "",
  });

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("superadminToken");
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

  const handleInputChange = (field, value) => {
    setCurrentStudent((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateCurrentStudent = () => {
    if (!currentStudent.email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!currentStudent.name.trim()) {
      toast.error("Name is required");
      return false;
    }
    if (!currentStudent.registerNumber.trim()) {
      toast.error("Register Number is required");
      return false;
    }
    if (!currentStudent.digitalid.trim()) {
      toast.error("Digital ID is required");
      return false;
    }
    if (!selectedDegree) {
      toast.error("Please select a degree");
      return false;
    }
    if (!selectedPassoutYear) {
      toast.error("Please select passout year");
      return false;
    }

    // Check for duplicate register numbers in current batch
    const isDuplicate = studentsToAdd.some(
      (student) =>
        student.registerNumber === currentStudent.registerNumber.trim()
    );
    if (isDuplicate) {
      toast.error("Register number already exists in current batch");
      return false;
    }

    return true;
  };

  const addStudentToBatch = () => {
    if (!validateCurrentStudent()) return;

    const newStudent = {
      email: currentStudent.email.trim(),
      name: currentStudent.name.trim(),
      registerNumber: currentStudent.registerNumber.trim(),
      digitalid: currentStudent.digitalid.trim(),
      passout: selectedPassoutYear,
      degree: selectedDegree,
      course: selectedCourse || "",
    };

    setStudentsToAdd((prev) => [...prev, newStudent]);

    // Clear current form
    setCurrentStudent({
      email: "",
      name: "",
      registerNumber: "",
      digitalid: "",
    });

    toast.success("Student added to batch");
  };

  const removeStudentFromBatch = (index) => {
    setStudentsToAdd((prev) => prev.filter((_, i) => i !== index));
    toast.success("Student removed from batch");
  };

  const clearBatch = () => {
    setStudentsToAdd([]);
    toast.success("Batch cleared");
  };

  const handleDeleteConfirmed = async () => {
    const selectedRegisterNumbers = selectedStudents.map(
      (i) => sortedStudents[i].registerNumber
    );
    const token = localStorage.getItem("superadminToken");
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
    if (studentsToAdd.length === 0) {
      toast.error(
        "No students to save. Please add students to the batch first."
      );
      return;
    }

    const token = localStorage.getItem("superadminToken");
    if (!token) {
      toast.error("No auth token found. Please log in again.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${backendUrl}/SuperAdmin/addStudents`,
        studentsToAdd,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.status === "S") {
        toast.success(`${studentsToAdd.length} students added successfully.`);
        setStudentsToAdd([]);
        setCurrentStudent({
          email: "",
          name: "",
          registerNumber: "",
          digitalid: "",
        });
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

  const toggleStudentSelection = (index) => {
    setSelectedStudents((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
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
                {/* Global Settings */}
                <div className="grid md:grid-cols-3 gap-6 mb-6 p-4 bg-blue-50 rounded-lg">
                  <div>
                    <Label className="text-blue-800 font-semibold">
                      Department
                    </Label>
                    <Input value="CSE" disabled className="bg-gray-100" />
                  </div>
                  <div>
                    <Label className="text-blue-800 font-semibold">
                      Degree *
                    </Label>
                    <Select
                      value={selectedDegree}
                      onValueChange={setSelectedDegree}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select degree" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="btech">B.Tech</SelectItem>
                        <SelectItem value="mtech">M.Tech</SelectItem>
                        <SelectItem value="be">B.E.</SelectItem>
                        <SelectItem value="me">M.E.</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-blue-800 font-semibold">
                      Year of Passout *
                    </Label>
                    <Select
                      value={selectedPassoutYear}
                      onValueChange={setSelectedPassoutYear}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2025">2025</SelectItem>
                        <SelectItem value="2026">2026</SelectItem>
                        <SelectItem value="2027">2027</SelectItem>
                        <SelectItem value="2028">2028</SelectItem>
                        <SelectItem value="2029">2029</SelectItem>
                        <SelectItem value="2030">2030</SelectItem>
                        <SelectItem value="2031">2031</SelectItem>
                        <SelectItem value="2032">2032</SelectItem>
                        <SelectItem value="2033">2033</SelectItem>
                        <SelectItem value="2034">2034</SelectItem>
                        <SelectItem value="2035">2035</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Student Entry Form */}
                <div className="border-2 border-blue-200 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold text-blue-800 mb-4">
                    Add Student Details
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label className="text-blue-700">Email *</Label>
                      <Input
                        type="email"
                        placeholder="student@ssn.edu.in"
                        value={currentStudent.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className="border-blue-300 focus:border-blue-500"
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            document
                              .querySelector(
                                'input[placeholder="Enter student name"]'
                              )
                              .focus();
                          }
                        }}
                      />
                    </div>
                    <div>
                      <Label className="text-blue-700">Full Name *</Label>
                      <Input
                        placeholder="Enter student name"
                        value={currentStudent.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        className="border-blue-300 focus:border-blue-500"
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            document
                              .querySelector(
                                'input[placeholder="3122235001001"]'
                              )
                              .focus();
                          }
                        }}
                      />
                    </div>
                    <div>
                      <Label className="text-blue-700">Register Number *</Label>
                      <Input
                        placeholder="3122235001001"
                        value={currentStudent.registerNumber}
                        onChange={(e) =>
                          handleInputChange("registerNumber", e.target.value)
                        }
                        className="border-blue-300 focus:border-blue-500"
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            document
                              .querySelector('input[placeholder="2310333"]')
                              .focus();
                          }
                        }}
                      />
                    </div>
                    <div>
                      <Label className="text-blue-700">Digital ID *</Label>
                      <Input
                        placeholder="2310333"
                        value={currentStudent.digitalid}
                        onChange={(e) =>
                          handleInputChange("digitalid", e.target.value)
                        }
                        className="border-blue-300 focus:border-blue-500"
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addStudentToBatch();
                          }
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button
                      onClick={addStudentToBatch}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add to Batch
                    </Button>
                  </div>
                </div>

                {/* Students Batch Preview */}
                {studentsToAdd.length > 0 && (
                  <div className="bg-blue-100 rounded-lg p-4 mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-blue-800 font-semibold">
                        Students to be Added ({studentsToAdd.length})
                      </h3>
                      <Button
                        variant="ghost"
                        onClick={clearBatch}
                        className="text-red-600 hover:bg-red-100"
                      >
                        Clear All
                      </Button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="min-w-full text-sm">
                        <thead className="bg-blue-200">
                          <tr>
                            <th className="px-3 py-2 text-left text-blue-900">
                              Name
                            </th>
                            <th className="px-3 py-2 text-left text-blue-900">
                              Register No.
                            </th>
                            <th className="px-3 py-2 text-left text-blue-900">
                              Email
                            </th>
                            <th className="px-3 py-2 text-left text-blue-900">
                              Digital ID
                            </th>
                            <th className="px-3 py-2 text-center text-blue-900">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {studentsToAdd.map((student, idx) => (
                            <tr
                              key={idx}
                              className={
                                idx % 2 === 0 ? "bg-white" : "bg-blue-50"
                              }
                            >
                              <td className="px-3 py-2 text-blue-900">
                                {student.name}
                              </td>
                              <td className="px-3 py-2 text-blue-900">
                                {student.registerNumber}
                              </td>
                              <td className="px-3 py-2 text-blue-900">
                                {student.email}
                              </td>
                              <td className="px-3 py-2 text-blue-900">
                                {student.digitalid}
                              </td>
                              <td className="px-3 py-2 text-center">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeStudentFromBatch(idx)}
                                  className="text-red-600 hover:bg-red-100"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
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
                  disabled={studentsToAdd.length === 0}
                >
                  Save All Students ({studentsToAdd.length})
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
