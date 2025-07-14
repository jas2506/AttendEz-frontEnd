import FacultyTransfersubjectComp from "../../projectComponents/facultyComponents/FacultyTransfersubjectComp";
import { User, Copy, Check, X } from "lucide-react";
import { useState, useEffect } from "react";
import { refreshTimetable, createSubstitutionCode } from "../../TeacherApi";

function SubjectsHandledPage() {
  const [timetable, setTimetable] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [substitutionCode, setSubstitutionCode] = useState("");
  const [apiMessage, setApiMessage] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [subs, setSubs] = useState([]);

  // Extract the fetch logic into a separate function
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const timetableRes = await refreshTimetable();
      setTimetable(timetableRes.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching faculty data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (timetable) {
      const subsList = getFacultySubjects(timetable);
      setSubs(subsList);
    }
  }, [timetable]);

  // Function to refresh the data after transfer
  const handleRefreshAfterTransfer = async () => {
    await fetchData();
  };

  function getFacultySubjects(tt) {
    const result = [];
    const seen = new Set();
    const classDetails = tt?.timetable?.classDetails || {};

    for (const classCode in classDetails) {
      const { className, passoutYear, groupCode } = classDetails[classCode];

      let section;
      if (groupCode.includes("ELE")) {
        section = "ELECTIVE";
      } else {
        const match = groupCode.match(/^([A-Z]+)\d{4}([A-Z])$/);
        section = match ? `${match[1]}-${match[2]}` : groupCode;
      }

      const uniqueKey = `${className}-${section}-${passoutYear}`;
      if (!seen.has(uniqueKey)) {
        seen.add(uniqueKey);
        result.push({
          classCode,
          className,
          section,
          year: `UG-${passoutYear}`,
        });
      }
    }

    return result;
  }

  const handleGenerateCode = async () => {
    if (!selectedSubject || !selectedDate) {
      setError("Please select both a subject and date");
      return;
    }

    setIsLoading(true);
    setError("");
    setSubstitutionCode("");
    setApiMessage("");

    try {
      const res = await createSubstitutionCode(selectedSubject, selectedDate);

      const data = res.data;
      if (data.status === "S") {
        setSubstitutionCode(data.substitutionCode);
        setApiMessage(data.message);
      } else {
        setError(data.message || "Failed to generate substitution code");
      }
    } catch (err) {
      setError("Failed to generate substitution code. Please try again.");
      console.error("API Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyCode = async () => {
    if (substitutionCode) {
      try {
        await navigator.clipboard.writeText(substitutionCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedSubject("");
    setSelectedDate("");
    setSubstitutionCode("");
    setApiMessage("");
    setError("");
    setCopied(false);
  };

  const openModal = () => {
    setShowModal(true);
    // Set default date to today
    setSelectedDate("");
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="bg-white border border-gray-200 shadow-lg rounded-2xl overflow-hidden mb-6">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/10 p-3 rounded-xl">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                Subjects You Handle
              </p>
              <p className="text-blue-100 text-sm mt-1">
                List of Courses taught by You
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Subjects List */}
      <div className="grid gap-4">
        {subs.map((course, idx) => (
          <FacultyTransfersubjectComp
            key={idx}
            c={course}
            onTransferSuccess={handleRefreshAfterTransfer}
          />
        ))}
      </div>
      {subs.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          You are not currently assigned any subjects.
        </p>
      )}

      {/* Generate Substitution Code Button */}
      <div className="flex justify-center mt-8">
        <button
          onClick={openModal}
          className="bg-[#4642EE] cursor-pointer text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
        >
          Generate Substitution Code
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-semibold">
                Generate Substitution Code
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              {!substitutionCode ? (
                <>
                  {/* Subject Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Subject
                    </label>
                    <select
                      value={selectedSubject}
                      onChange={(e) => setSelectedSubject(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4642EE] focus:border-[#4642EE]"
                      disabled={isLoading}
                    >
                      <option value="">Choose a subject...</option>
                      {subs.map((subject, index) => (
                        <option key={index} value={subject.classCode}>
                          {subject.classCode} - {subject.className} (
                          {subject.section})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Date Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Date
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4642EE] focus:border-[#4642EE]"
                      disabled={isLoading}
                    />
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <p className="text-red-700 text-sm">{error}</p>
                    </div>
                  )}

                  {/* Generate Button */}
                  <button
                    onClick={handleGenerateCode}
                    disabled={isLoading || !selectedSubject || !selectedDate}
                    className="w-full bg-[#4642EE] text-white py-3 rounded-lg font-medium hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                  >
                    {isLoading ? "Generating..." : "Generate"}
                  </button>
                </>
              ) : (
                <>
                  {/* Success Message */}
                  {apiMessage && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <p className="text-green-700 text-sm">{apiMessage}</p>
                    </div>
                  )}

                  {/* Code Display */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Generated Substitution Code
                    </label>
                    <div className="flex items-center space-x-2">
                      <div className="bg-white border border-gray-300 rounded-lg px-4 py-3 flex-1 font-mono text-lg font-semibold text-center">
                        {substitutionCode}
                      </div>
                      <button
                        onClick={handleCopyCode}
                        className="bg-[#4642EE] text-white px-4 py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-1"
                      >
                        {copied ? (
                          <>
                            <Check size={16} />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy size={16} />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Close Button */}
                  <button
                    onClick={closeModal}
                    className="w-full bg-[#4642EE] text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                  >
                    Close
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SubjectsHandledPage;
