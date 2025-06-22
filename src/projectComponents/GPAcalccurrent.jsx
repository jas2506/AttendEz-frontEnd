import { use, useState } from "react";

function GPAcalccurrent({ subject, credits, passingfunc }) {
  const [grade, setGrade] = useState("");

  const handleInputChange = (e,subjectt) => {
    const value = e.target.value;
    setGrade(value);
    passingfunc(value,subjectt);
  };

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 rounded-2xl border border-gray-300 bg-white shadow-md px-6 py-4 max-w-4xl mx-auto transition-shadow hover:shadow-lg">

        {/* Subject Name */}
        <p className="font-bold w-1/3 text-xl text-blue-600">{subject}</p>

        {/* Credits Display */}
        <div className="px-4 py-2  rounded-lg border border-blue-500 bg-blue-50 text-blue-700 font-medium text-sm">
          Credits: {credits}
        </div>

        {/* Grade Input */}
        <input
          type="text"
          value={grade}
          onChange={(e)=>{handleInputChange(e,subject)}}
          placeholder="Enter grade  (e.g. O, A+, etc.)"
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full md:w-1/3"
        />
      </div>
    </div>
  );
}

export default GPAcalccurrent;

// example use

// <GPAcalccurrent
//   subject="Operating Systems"
//   credits={3}
//   onGradeChange={(grade) => console.log("Grade changed to:", grade)}
// />

