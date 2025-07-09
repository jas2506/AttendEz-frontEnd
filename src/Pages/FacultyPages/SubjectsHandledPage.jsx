import FacultyTransfersubjectComp from "../../projectComponents/facultyComponents/FacultyTransfersubjectComp";
import {User} from "lucide-react";
import { useState,useEffect } from "react";
import { refreshTimetable } from "../../TeacherApi";

function SubjectsHandledPage() {

  const [timetable, setTimetable] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Extract the fetch logic into a separate function
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const timetableRes = await refreshTimetable()
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
  
  const subs = getFacultySubjects(timetable);

  if(isLoading)return <p>Loading...</p>

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
      </div>
  );
}

export default SubjectsHandledPage;