import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import axios from "axios";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { RefreshCcw } from "lucide-react";
import DetailedCalendar from "../../projectComponents/DetailedCalendar";
import SubjectsPage from "../SubjectsPage";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

function AddTeacherForm() {
  const [csvError, setCsvError] = useState("");
  const [uploadedTeachers, setUploadedTeachers] = useState([]);
  const [added, setAdded] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [mode, setMode] = useState("add");
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    isMentor: "",
    position: "",
  });

  const expectedHeaders = ["name", "email", "isMentor", "position"];

  const fetchTeachers = async () => {
    const token = localStorage.getItem("jwtToken");
    if (!token) return toast.error("No auth token found. Please log in again.");
    try {
      setLoading(true);
      const response = await axios.get(
        `${backendUrl}/SuperAdmin/viewAllTeachers`,
        {
          params: { department: "CSE" },
          headers: { Authorization: token, "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const { status, details } = response.data;
      if (status?.toLowerCase() === "s" && Array.isArray(details)) {
        const sorted = [...details].sort((a, b) =>
          (a.name || "").localeCompare(b.name || "")
        );
        setTeachers(sorted);
      } else {
        toast.error("Failed to load teachers: unexpected data.");
      }
    } catch (error) {
      console.error("Error fetching teachers:", error);
      toast.error("Something went wrong while fetching teachers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const canDeleteTeacher = (teacher) => {
    const isTeachingClass =
      Array.isArray(teacher.facultyClasses) &&
      teacher.facultyClasses.length > 0;
    const reasons = [];
    if (isTeachingClass)
      reasons.push("Teacher is assigned to one or more classes");
    return {
      allowed: reasons.length === 0,
      message: reasons.join(" and "),
    };
  };

  const handleDelete = async (emailToRemove) => {
    const teacher = teachers.find((t) => t.faculty_email === emailToRemove);
    if (!teacher) return toast.error("Teacher not found.");

    const { allowed, message } = canDeleteTeacher(teacher);
    if (!allowed) return toast.error(`Cannot delete teacher: ${message}`);

    toast.custom((t) => (
      <div className="bg-white border border-red-300 p-4 rounded shadow-md">
        <p className="text-red-700 font-semibold mb-2">
          Are you sure you want to delete this teacher?
        </p>
        <div className="flex gap-4 justify-end">
          <Button onClick={() => toast.dismiss(t)} variant="outline">
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={async () => {
              const token = localStorage.getItem("jwtToken");
              if (!token)
                return toast.error("No auth token found. Please log in again.");
              try {
                setLoading(true);
                const response = await axios.delete(
                  `${backendUrl}/SuperAdmin/deleteTeacher`,
                  {
                    headers: { Authorization: token },
                    withCredentials: true,
                    data: { email: emailToRemove },
                  }
                );
                if (response.data.status?.toLowerCase() === "s") {
                  const updated = teachers.filter(
                    (t) => t.faculty_email !== emailToRemove
                  );
                  setTeachers(updated);
                  toast.success("Teacher deleted successfully!");
                } else {
                  toast.error(`Delete failed: ${response.data.message}`);
                }
              } catch (error) {
                toast.error("Error deleting teacher.");
                console.error(error);
              } finally {
                setLoading(false);
                toast.dismiss(t);
              }
            }}
          >
            Yes, Delete
          </Button>
        </div>
      </div>
    ));
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAdd = async () => {
    const filled = Object.values(formData).every((val) => val.trim() !== "");
    if (!filled) return;
    const success = await sendTeacherToBackend(formData);
    if (success) {
      const newList = [...uploadedTeachers, { ...formData }];
      setUploadedTeachers(newList);
      setFormData({ name: "", email: "", isMentor: "", position: "" });
      setAdded(true);
    }
  };

  const sendTeacherToBackend = async (teacher) => {
    const token = localStorage.getItem("jwtToken");
    if (!token) return toast.error("No auth token found. Please log in again.");
    try {
      setLoading(true);
      const response = await axios.post(
        `${backendUrl}/SuperAdmin/addOrUpdateTeacher`,
        {
          email: teacher.email,
          name: teacher.name,
          mentor: teacher.isMentor,
          position: teacher.position,
        },
        {
          headers: { Authorization: token },
        }
      );
      if (response.data.Status?.toLowerCase() !== "s") {
        toast.error(response.data.Message || "Unknown error");
        return false;
      }
      return true;
    } catch (error) {
      toast.error(
        error.response?.data?.Message ||
          error.response?.data?.message ||
          error.message ||
          "Unknown error"
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50">
      {loading && (
        <div className="fixed inset-0 z-50 bg-black/20 flex justify-center items-center">
          <Loader2 className="animate-spin w-10 h-10 text-blue-600" />
        </div>
      )}

      <div className="max-w-4xl mx-auto p-8 mt-6 bg-white/90 rounded-2xl shadow-lg backdrop-blur-sm border border-blue-200 space-y-6 scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-blue-100">
        <h2 className="text-3xl font-bold text-blue-700 text-center">
          Manage Teachers
        </h2>

        <div className="flex justify-center">
          <ToggleGroup
            type="single"
            value={mode}
            onValueChange={(val) => val && setMode(val)}
            className="bg-blue-100 p-1 rounded-lg"
          >
            <ToggleGroupItem
              value="add"
              className="px-4 py-2 data-[state=on]:bg-blue-600 data-[state=on]:text-white"
            >
              Add Teacher
            </ToggleGroupItem>
            <ToggleGroupItem
              value="delete"
              className="px-4 py-2 data-[state=on]:bg-blue-600 data-[state=on]:text-white"
            >
              View Teachers
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        {mode === "add" && (
          <>
            <div className="grid gap-6">
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Faculty Name"
                className="p-3 border border-blue-300 rounded-md"
              />
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Faculty Email"
                className="p-3 border border-blue-300 rounded-md"
              />
              <select
                name="isMentor"
                value={formData.isMentor}
                onChange={handleChange}
                className="p-3 border border-blue-300 rounded-md"
              >
                <option value="">Select Mentor Status</option>
                <option value="true">True</option>
                <option value="false">False</option>
              </select>

              <input
                name="position"
                value={formData.position}
                onChange={handleChange}
                placeholder="Faculty Position"
                className="p-3 border border-blue-300 rounded-md"
              />
            </div>

            <div className="flex justify-between flex-wrap gap-4 mt-4">
              <Button onClick={handleAdd} className="bg-blue-600 text-white">
                Add
              </Button>
            </div>

            {uploadSuccess && (
              <p className="text-green-600 font-semibold">
                CSV uploaded and saved successfully!
              </p>
            )}
            {csvError && (
              <p className="text-red-600 font-semibold">{csvError}</p>
            )}

            {uploadedTeachers.length > 0 && (
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-3 text-blue-700">
                  Teachers Preview
                </h3>
                <div className="overflow-auto rounded-lg border border-blue-200">
                  <table className="min-w-full text-sm text-left border-collapse">
                    <thead className="bg-blue-100 text-blue-800">
                      <tr>
                        {expectedHeaders.map((header) => (
                          <th key={header} className="px-4 py-2 border">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {uploadedTeachers.map((teacher, index) => (
                        <tr
                          key={index}
                          className="even:bg-white odd:bg-blue-50 hover:bg-blue-100"
                        >
                          {expectedHeaders.map((key) => (
                            <td key={key} className="px-4 py-2 border">
                              {teacher[key]}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {added && (
              <p className="mt-4 text-green-700 font-semibold text-center text-lg">
                Teachers successfully added!
              </p>
            )}
          </>
        )}

        {mode === "delete" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-blue-700">View Teachers</h3>
              <Button
                variant="ghost"
                className="text-blue-600 hover:bg-blue-100 p-2"
                onClick={fetchTeachers}
              >
                <RefreshCcw className="h-4 w-4 mr-1" />
                Refresh List
              </Button>
            </div>
            <div className="overflow-auto rounded-lg border border-blue-200 max-h-[400px] custom-scrollbar">
              <table className="min-w-full text-sm text-left text-blue-900">
                <thead className="text-xs uppercase text-blue-700 bg-blue-200">
                  <tr>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2">Position</th>
                    <th className="px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {teachers.map((teacher, index) => {
                    const { allowed } = canDeleteTeacher(teacher);
                    return (
                      <tr
                        key={index}
                        className="border-b border-blue-300 even:bg-blue-50"
                      >
                        <td className="px-4 py-2">{teacher.name}</td>
                        <td className="px-4 py-2">{teacher.faculty_email}</td>
                        <td className="px-4 py-2">{teacher.position}</td>
                        <td className="px-4 py-2">
                          <Button
                            variant={allowed ? "destructive" : "secondary"}
                            onClick={() => handleDelete(teacher.faculty_email)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {/*<SubjectsPage />*/}
          </div>
        )}
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

export default AddTeacherForm;
