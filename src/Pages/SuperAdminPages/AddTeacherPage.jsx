import React, { useState } from "react";
import Papa from "papaparse";

function AddTeacherForm() {
  const [csvError, setCsvError] = useState("");
  const [uploadedTeachers, setUploadedTeachers] = useState([]);
  const [added, setAdded] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    isMentor: "",
    position: "",
  });

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
      setFormData({ name: "", email: "", isMentor: "", position: "" }); // clear form
    }

    if (newList.length > 0) {
      setUploadedTeachers(newList);
      setAdded(true);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-md space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Add Teacher</h2>

      <div className="grid grid-cols-2 gap-4">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter name of the faculty"
          className="p-2 border rounded"
        />
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter faculty email"
          className="p-2 border rounded"
        />
        <input
          name="isMentor"
          value={formData.isMentor}
          onChange={handleChange}
          placeholder="Is faculty a mentor"
          className="p-2 border rounded"
        />
        <input
          name="position"
          value={formData.position}
          onChange={handleChange}
          placeholder="Faculty position"
          className="p-2 border rounded"
        />
      </div>

      <div className="flex items-center justify-between mt-4">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow"
          onClick={handleAdd}
        >
          Add
        </button>

        <div className="space-x-3">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            onClick={downloadSampleCSV}
          >
            Download CSV
          </button>

          <label className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer">
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

      {csvError && <p className="text-red-600 font-semibold">{csvError}</p>}

      {uploadedTeachers.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">
            📋 Preview of Teachers:
          </h3>
          <table className="w-full table-auto border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                {expectedHeaders.map((header) => (
                  <th key={header} className="border px-3 py-2 text-left">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {uploadedTeachers.map((teacher, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  {expectedHeaders.map((key) => (
                    <td key={key} className="border px-3 py-1">
                      {teacher[key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {added && (
        <p className="mt-4 text-green-700 font-semibold text-center text-lg">
          🎉 Teachers successfully added!
        </p>
      )}
    </div>
  );
}

export default AddTeacherForm;
