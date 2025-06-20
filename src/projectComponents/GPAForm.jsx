import { useState } from "react";

function GPAForm() {
  const [subject, setSubject] = useState("");
  const [credits, setCredits] = useState("");
  const [grade, setGrade] = useState("");
  const [entries, setEntries] = useState([]);

  const handleAdd = () => {
    if (!subject || !credits || !grade) {
      alert("Please fill all fields");
      return;
    }

    const newEntry = {
      subject,
      credits: parseFloat(credits),
      grade,
    };

    setEntries((prev) => [...prev, newEntry]);

    setSubject("");
    setCredits("");
    setGrade("");
  };

  return (
    <div className="p-4 space-y-6 max-w-4xl mx-auto">
      {/* Input Form */}
      <div className="flex flex-col md:flex-row items-center gap-4 bg-white border border-gray-300 rounded-xl p-4 shadow-md">
        <input
          type="text"
          placeholder="Subject Name"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="px-4 py-2 border rounded-md w-full md:w-1/3 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
          "
        />

        <input
          type="number"
          placeholder="Credits"
          value={credits}
          onChange={(e) => setCredits(e.target.value)}
          className="px-4 py-2 border rounded-md w-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 md:w-1/4"
        />

        <input
          type="text"
          placeholder="Grade"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          className="px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 border rounded-md w-full md:w-1/4"
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
            className="flex justify-between items-center border border-gray-200 rounded-lg p-3 bg-blue-50"
          >
            <p className="text-blue-600 font-semibold">{entry.subject}</p>
            <p className="text-gray-700">Credits: {entry.credits}</p>
            <p className="text-gray-900 font-bold">Grade: {entry.grade}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GPAForm;
