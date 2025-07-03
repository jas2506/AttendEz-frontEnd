import React, { useState } from "react";
import Papa from "papaparse";
import NavbarSuperAdmin from "./NavBarSuperAdmin";
import ClassAdvisorPopup from "./ClassAdvisorPopup";

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../components/ui/select";
import { Card, CardContent } from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "../../components/ui/toggle-group";
import CreateTimetablePopup from "./CreateTimetablePage";

export default function ElectiveSectionPage() {
  const [uploadedData, setUploadedData] = useState([]);
  const [electiveOrSection, setElectiveOrSection] = useState("");
  const [advisorName, setAdvisorName] = useState("");
  const [advisorEmail, setAdvisorEmail] = useState("");
  const [classType, setClassType] = useState("normal");
  const [popupOpen, setPopupOpen] = useState(false);
  const [advisorPopupOpen, setAdvisorPopupOpen] = useState(false);

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

  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        setUploadedData(results.data);
      },
    });
  };

  const clearCSVUpload = () => {
    setUploadedData([]);
  };

  const downloadSampleCSV = () => {
    const sample = `Name,Register Number\nJohn Doe,12345\nJane Smith,67890`;
    const blob = new Blob([sample], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "sample.csv";
    link.click();
  };

  return (
    <div className="min-h-screen bg-blue-50">
      <NavbarSuperAdmin setIsLoggedIn={() => {}} />

      <div className="p-6 flex justify-center items-start">
        <Card className="w-full max-w-4xl shadow-xl bg-white">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
              Add or Remove
            </h2>

            {/* 🔘 Toggle Group: Normal or Elective */}
            <div className="flex justify-center mb-6">
              <ToggleGroup
                type="single"
                value={classType}
                onValueChange={(val) => {
                  if (val) setClassType(val);
                }}
                className="bg-blue-100 rounded-lg"
              >
                <ToggleGroupItem
                  value="normal"
                  className="data-[state=on]:bg-blue-600 data-[state=on]:text-white px-4 py-2"
                >
                  Normal Class
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="elective"
                  className="data-[state=on]:bg-blue-600 data-[state=on]:text-white px-4 py-2"
                >
                  Elective
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <Label>Department</Label>
                <Input value="CSE" disabled className="bg-gray-100" />
              </div>
              <div>
                <Label>Degree</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select degree" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="btech">B.Tech</SelectItem>
                    <SelectItem value="mtech">M.Tech</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Year of Passout</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2025">2025</SelectItem>
                    <SelectItem value="2026">2026</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Section</Label>
                <Input
                  placeholder="Enter section"
                  value={electiveOrSection}
                  onChange={(e) => setElectiveOrSection(e.target.value)}
                />
              </div>

              <div>
                <Label>Upload CSV File</Label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Input type="file" accept=".csv" onChange={handleCSVUpload} />
                  <Button
                    variant="outline"
                    className="text-blue-700 border-blue-700"
                    onClick={downloadSampleCSV}
                  >
                    Download Sample CSV
                  </Button>
                  {uploadedData.length > 0 && (
                    <Button
                      variant="ghost"
                      className="text-red-600"
                      onClick={clearCSVUpload}
                    >
                      Clear Upload
                    </Button>
                  )}
                </div>
              </div>

              {classType === "normal" && (
                <>
                  <div className="md:col-span-2">
                    <Label>Class Advisor</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        placeholder="Advisor email"
                        value={advisorEmail}
                        disabled
                        className="bg-gray-100"
                      />
                      <Button
                        variant="outline"
                        className="text-blue-700 border-blue-700 whitespace-nowrap"
                        onClick={() => setAdvisorPopupOpen(true)}
                      >
                        Select
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {uploadedData.length > 0 && (
              <div className="bg-blue-100 rounded-lg p-4 mb-6">
                <h3 className="text-blue-800 font-semibold mb-2">
                  Student List
                </h3>
                <ul className="list-disc list-inside text-sm text-blue-900">
                  {uploadedData.map((entry, idx) => (
                    <li key={"csv-" + idx}>
                      {entry.Name} - {entry["Register Number"]}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <Button
                className="bg-blue-600 text-white px-6"
                onClick={() => setPopupOpen(true)}
              >
                Create Timetable
              </Button>

              <Button className="bg-blue-600 text-white px-6">Delete</Button>
              <Button className="bg-blue-600 text-white px-6">Edit</Button>
              <Button className="bg-blue-600 text-white px-6">Save</Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <CreateTimetablePopup open={popupOpen} setOpen={setPopupOpen} />
      <ClassAdvisorPopup
        open={advisorPopupOpen}
        setOpen={setAdvisorPopupOpen}
        teachers={allTeachers.details.filter((t) => t.department === "CSE")}
        onSelect={(teacher) => {
          setAdvisorName(teacher.name);
          setAdvisorEmail(teacher.faculty_email);
        }}
      />
    </div>
  );
}
