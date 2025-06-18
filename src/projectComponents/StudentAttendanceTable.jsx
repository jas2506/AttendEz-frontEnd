


export default function StudentAttendanceTable({ data }) {
    const getPercentage = (attended, total) => {
      if (total === 0) return 0;
      return ((attended / total) * 100).toFixed(1);
    };
  
    return (
      <div className="overflow-x-auto p-4">
        <table className="min-w-full border border-gray-300 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-blue-100 text-blue-900">
            <tr>
              <th className="text-left px-4 py-2 border-b">Subject</th>
              <th className="text-center px-4 py-2 border-b">Attended</th>
              <th className="text-center px-4 py-2 border-b">Total</th>
              <th className="text-center px-4 py-2 border-b">Percentage</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry, idx) => {
              const percentage = getPercentage(entry.attended, entry.total);
              const percentageColor =
                percentage >= 75
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700";
  
              return (
                <tr key={idx} className="border-b">
                  <td className="px-4 py-2">{entry.subject}</td>
                  <td className="px-4 py-2 text-center">{entry.attended}</td>
                  <td className="px-4 py-2 text-center">{entry.total}</td>
                  <td className={`px-4 py-2 text-center font-semibold ${percentageColor}`}>
                    {percentage}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
  


//   pass as prop 

//   const attendanceData = [
//     { subject: "Operating Systems", attended: 38, total: 45 },
//     { subject: "DBMS", attended: 28, total: 40 },
//     { subject: "COA", attended: 33, total: 44 },
//   ];