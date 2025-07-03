import React, { useState } from "react";
import Papa from "papaparse";
import NavbarSuperAdmin from "./NavBarSuperAdmin";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";

function AddTeacherForm() {
  const [csvError, setCsvError] = useState("");
  const [uploadedTeachers, setUploadedTeachers] = useState([]);
  const [added, setAdded] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [mode, setMode] = useState("add");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    isMentor: "",
    position: "",
  });

  const [teachers, setTeachers] = useState([
    {
      name: "Dr. Gautham",
      email: "gautham@ssn.edu.in",
      position: "Associate Professor",
    },
    {
      name: "Dr. Srividya",
      email: "srividya@ssn.edu.in",
      position: "Assistant Professor",
    },
    {
      name: "Dr. Jagan",
      email: "jagan@ssn.edu.in",
      position: "Professor",
    },
  ]);

  const expectedHeaders = ["name", "email", "isMentor", "position"];

  const downloadSampleCSV = () => {
    const sample = [
      expectedHeaders,
      ["John Doe", "john@abc.com", "true", "Assistant Professor"],
    ];
    const csv = sample.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "sample_faculty.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleUploadCSV = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const fileHeaders = results.meta.fields;
        const headersMatch =
          fileHeaders.length === expectedHeaders.length &&
          fileHeaders.every((h, i) => h.trim() === expectedHeaders[i]);

        if (!headersMatch) {
          setCsvError(
            "❌ CSV format is incorrect. Please use the sample format."
          );
          setUploadedTeachers([]);
          setUploadSuccess(false);
        } else {
          setCsvError("");
          setUploadedTeachers(results.data);
          setUploadSuccess(true);
          setAdded(false);
        }
      },
      error: function () {
        setCsvError("❌ Failed to parse CSV.");
        setUploadSuccess(false);
        setUploadedTeachers([]);
      },
    });
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAdd = () => {
    const filled = Object.values(formData).every((val) => val.trim() !== "");
    const newList = [...uploadedTeachers];
    if (filled) {
      newList.push({ ...formData });
      setFormData({ name: "", email: "", isMentor: "", position: "" });
    }

    if (newList.length > 0) {
      setUploadedTeachers(newList);
      setAdded(true);
    }
  };

  const handleDelete = (emailToRemove) => {
    const updated = teachers.filter((t) => t.email !== emailToRemove);
    setTeachers(updated);
  };

  return (
    <div className="min-h-screen bg-blue-50">
      <NavbarSuperAdmin setIsLoggedIn={() => {}} />

      <div className="max-w-4xl mx-auto p-8 mt-6 bg-white/90 rounded-2xl shadow-lg backdrop-blur-sm border border-blue-200 space-y-6">
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
              Delete Teacher
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
                className="p-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Faculty Email"
                className="p-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                name="isMentor"
                value={formData.isMentor}
                onChange={handleChange}
                placeholder="Is Mentor (true/false)"
                className="p-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                name="position"
                value={formData.position}
                onChange={handleChange}
                placeholder="Faculty Position"
                className="p-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-between flex-wrap gap-4 mt-4">
              <Button onClick={handleAdd} className="bg-blue-600 text-white">
                Add
              </Button>

              <div className="space-x-3">
                <Button variant="secondary" onClick={downloadSampleCSV}>
                  Sample CSV
                </Button>

                <label className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer transition-all">
                  Upload CSV
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleUploadCSV}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {uploadSuccess && (
              <p className="text-green-600 font-semibold">
                ✅ CSV uploaded and parsed successfully!
              </p>
            )}
            {csvError && (
              <p className="text-red-600 font-semibold">{csvError}</p>
            )}

            {uploadedTeachers.length > 0 && (
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-3 text-blue-700">
                  📋 Teachers Preview
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
                          className="even:bg-white odd:bg-blue-50 hover:bg-blue-100 transition-colors"
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
                🎉 Teachers successfully added!
              </p>
            )}
          </>
        )}

        {mode === "delete" && (
          <>
            <div className="overflow-auto rounded-lg border border-blue-200 max-h-[400px]">
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
                  {teachers.map((teacher, index) => (
                    <tr key={index} className="border-b border-blue-300">
                      <td className="px-4 py-2">{teacher.name}</td>
                      <td className="px-4 py-2">{teacher.email}</td>
                      <td className="px-4 py-2">{teacher.position}</td>
                      <td className="px-4 py-2">
                        <Button
                          variant="destructive"
                          onClick={() => handleDelete(teacher.email)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AddTeacherForm;
