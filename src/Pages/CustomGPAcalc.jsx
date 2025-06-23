import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function CustomGPAcalc() {
  const [subject, setSubject] = useState("");
  const [credits, setCredits] = useState("");
  const [grade, setGrade] = useState("");
  const [entries, setEntries] = useState([]);
  const [gpa, setGpa] = useState(null);

  const gradePoints = {
    O: 10,
    "A+": 9,
    A: 8,
    "B+": 7,
    B: 6,
  };

  const handleAdd = () => {
    if (!subject || !credits || !grade) {
      alert("Please fill all fields");
      return;
    }

    if (!gradePoints.hasOwnProperty(grade.toUpperCase())) {
      alert("Invalid grade. Use one of: O, A+, A, B+, B");
      return;
    }

    const newEntry = {
      subject,
      credits: parseFloat(credits),
      grade: grade.toUpperCase(),
    };

    setEntries((prev) => [...prev, newEntry]);
    setSubject("");
    setCredits("");
    setGrade("");
  };

  const handleDelete = (index) => {
    setEntries((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCalculateGPA = () => {
    if (entries.length === 0) {
      setGpa("No subjects added.");
      return;
    }

    let totalCredits = 0;
    let totalPoints = 0;

    entries.forEach(({ credits, grade }) => {
      const point = gradePoints[grade];
      totalCredits += credits;
      totalPoints += point * credits;
    });

    const calculatedGPA = (totalPoints / totalCredits).toFixed(2);
    setGpa(`Your GPA is ${calculatedGPA}`);
  };

  return (
    <div className="p-4 space-y-6 max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="bg-white p-6 rounded-xl flex flex-col items-center justify-center text-center">
        <div>
          <p className="text-2xl font-bold text-blue-700">GPA Calculator</p>
          <p className="text-sm text-gray-600 mt-1">
            Enter the fields to calculate your GPA
          </p>
        </div>
      </div>

      {/* Input Form */}
      <div className="flex flex-col md:flex-row items-center gap-4 bg-white border border-gray-300 rounded-xl p-4 shadow-md">
        <input
          type="text"
          placeholder="Subject Name"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="px-4 py-2 border rounded-md w-full md:w-1/3 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />

        <input
          type="number"
          placeholder="Credits"
          value={credits}
          onChange={(e) => setCredits(e.target.value)}
          className="px-4 py-2 border rounded-md w-full md:w-1/4 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />

        <input
          type="text"
          placeholder="Grade (O, A+, A, B+, B)"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          className="px-4 py-2 border rounded-md w-full md:w-1/4 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />

        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white font-bold px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Add
        </button>
      </div>

      {/* Display Entries */}
      <div className="space-y-3">
        {entries.map((entry, idx) => (
          <div
            key={idx}
            className="flex flex-col md:flex-row md:items-center justify-between border border-gray-200 rounded-lg p-4 bg-blue-50 shadow-sm"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-6 w-full">
              <p className="text-blue-600 font-semibold md:w-[250px] truncate">
                {entry.subject}
              </p>
              <div className="flex flex-row  flex-grow gap-50">
                <p className="text-gray-700">Credits: {entry.credits}</p>
                <p className="text-gray-900 font-bold">Grade: {entry.grade}</p>
              </div>
            </div>

            <div className="mt-2 md:mt-0 md:ml-4 flex justify-end">
              <button
                onClick={() => handleDelete(idx)}
                className="text-red-600 font-semibold hover:underline text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Calculate GPA Button */}
      <div className="flex justify-center">
        <Popover>
          <PopoverTrigger
            onClick={handleCalculateGPA}
            className="cursor-pointer bg-blue-50 text-blue-700 border border-transparent hover:border-blue-600 hover:bg-blue-100 font-semibold px-6 py-3 rounded-lg transition-all duration-200 shadow-sm"
          >
            Calculate GPA
          </PopoverTrigger>

          <PopoverContent className="text-sm font-medium text-gray-700">
            {gpa ? gpa : "No data yet."}
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

export default CustomGPAcalc;
