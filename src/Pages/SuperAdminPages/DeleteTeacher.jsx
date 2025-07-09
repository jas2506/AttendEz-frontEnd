function DeleteTeacher() {
  const allTeachers = {
    details: [
      {
        facultyClasses: ["CSE2702B"],
        mentor: "False",
        name: "Dr.Gautham",
        class_advisor: "True",
        class_advisor_list: {
          CSE2027B: [
            "3122235001110",
            "3122235001087",
            "3122235001052",
            "3122235001059",
          ],
        },
        position: "Asssociate Professor",
        department: "CSE",
        faculty_email: "murari2310237@ssn.edu.in",
      },
      {
        facultyClasses: ["CSE2703B"],
        mentor: "False",
        name: "Dr.Srividya",
        class_advisor: "False",
        position: "Asssociate Professor",
        department: "CSE",
        faculty_email: "srividyagsreekumar@gmail.com",
      },
      {
        facultyClasses: ["CSE2705B"],
        mentor: "False",
        name: "Dr.Sreekumar",
        class_advisor: "False",
        position: "Asssociate Professor",
        department: "CSE",
        faculty_email: "gauthamnarayan2310332@ssn.edu.in",
      },
      {
        facultyClasses: ["CSE2704B"],
        mentor: "False",
        name: "Dr.Jagan",
        class_advisor: "False",
        position: "Assistant Professor",
        department: "CSE",
        faculty_email: "mukundhsreekumar@gmail.com",
      },
      {
        facultyClasses: ["ELE2H22A"],
        mentor: "False",
        name: "Dr.Thenmozhi",
        class_advisor: "False",
        position: "Assistant Professor",
        department: "CSE",
        faculty_email: "murarisreekumar@gmail.com",
      },
      {
        name: "Dr.Saipranav",
        class_advisor: "True",
        mentor: "True",
        position: "Associate Professor",
        department: "CSE",
        faculty_email: "saipranv2310234@ssn.edu.in",
      },
    ],
    message: "Faculty details retrieved succesfully!",
    status: "S",
  };

  return (
    <>
      <div className="bg-blue-100 rounded-lg p-4 mb-6">
        <h3 className="text-blue-800 font-semibold mb-4 text-center">
          Select Students to Delete
        </h3>
        <div className="overflow-x-auto">
          <div className="max-h-[400px] overflow-y-auto rounded-lg">
            <table className="min-w-full text-sm text-left text-blue-900">
              <thead className="text-xs uppercase text-blue">
                <tr>
                  <th className="px-3 py-2">Select</th>
                  <th className="px-3 py-2">Name</th>
                  <th className="px-3 py-2">Register Number</th>
                  <th className="px-3 py-2">Passout</th>
                </tr>
              </thead>
              <tbody>
                {sortedStudents.map((student, idx) => (
                  <tr key={student.digitalid} className="">
                    <td className="px-3 py-2">
                      <Checkbox
                        checked={selectedStudents.includes(idx)}
                        onCheckedChange={() => toggleStudentSelection(idx)}
                      />
                    </td>
                    <td className="px-3 py-2">{student.name}</td>
                    <td className="px-3 py-2">{student.registerNumber}</td>
                    <td className="px-3 py-2">{student.passout}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeleteTeacher;
