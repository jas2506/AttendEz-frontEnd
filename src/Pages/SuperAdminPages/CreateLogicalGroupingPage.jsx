import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import axios from "axios";
import NavbarSuperAdmin from "./NavBarSuperAdmin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import CreateTimetablePopup from "./CreateTimetablePage";

export default function CreateLogicalGroupPage() {
  const [mode, setMode] = useState("add");
  const [registerNumbers, setRegisterNumbers] = useState([]);
  const [advisorEmail, setAdvisorEmail] = useState("");
  const [advisors, setAdvisors] = useState([]);
  const [degree, setDegree] = useState("B.E.");
  const [section, setSection] = useState("A");
  const [passout, setPassout] = useState("2027");
  const [timetable, setTimetable] = useState({});
  const [classCodes, setClassCodes] = useState([]);
  const [groupings, setGroupings] = useState([]);
  const [loggedIn, setIsLoggedIn] = useState(true);
  const [groupType, setGroupType] = useState("Normal");
  const [loading, setLoading] = useState(false);

  const currentYear = new Date().getFullYear();
  const passoutOptions = Array.from({ length: 5 }, (_, i) =>
    (currentYear + i).toString()
  );

  useEffect(() => {
    const auth = localStorage.getItem("jwtToken");
    setLoading(true);
    axios
      .get(`${backendUrl}/SuperAdmin/viewAllTeachers?department=CSE`, {
        headers: { Authorization: auth },
        withCredentials: true,
      })
      .then((res) => {
        const filtered = res.data.details.filter(
          (t) => t.class_advisor === "True"
        );
        setAdvisors(filtered);
      })
      .catch((error) => {
        console.error("Failed to fetch advisors:", error);
        setAdvisors([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (mode === "delete") {
      setLoading(true);
      const auth = localStorage.getItem("jwtToken");
      axios
        .get(`${backendUrl}/SuperAdmin/viewAllGroupings`, {
          headers: { Authorization: auth },
          withCredentials: true,
        })
        .then((res) => {
          setGroupings(res.data.groups || []);
        })
        .catch((err) => {
          console.error("Error fetching groupings:", err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [mode]);

  const downloadRegisterSample = () => {
    const sample = [
      ["name", "Register Number"],
      ["John Doe", "3122235001001"],
    ];
    const csv = sample.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "sample_register_numbers.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleRegisterCSVUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      complete: (result) => {
        const headers = result.meta.fields;
        if (
          headers.length !== 2 ||
          headers[0].trim() !== "name" ||
          headers[1].trim() !== "Register Number"
        ) {
          alert(
            "CSV format mismatch in Register Numbers CSV. Expected headers: name, Register Number."
          );
          return;
        }
        const nums = result.data
          .map((row) => row["Register Number"])
          .filter(Boolean)
          .map((num) => num.trim().replace(/^"|"$/g, ""));
        setRegisterNumbers(nums);
      },
      error: (error) => {
        console.error("Register CSV parsing error:", error);
      },
    });
  };

  const handleTimetableSave = (data) => {
    setTimetable(data);
    const codes = new Set();
    Object.values(data).forEach((periods) => {
      periods.forEach((p) => codes.add(p.classCode));
    });
    setClassCodes(Array.from(codes));
  };

  const handleSubmit = () => {
    const auth = localStorage.getItem("jwtToken");

    const normalizedDegree = degree.replace(/\./g, "").toUpperCase();

    const payload = {
      degree,
      registernumbers: registerNumbers,
      timetable,
      "class-code": classCodes,
      passout,
      section:
        groupType === "Normal" ? `${normalizedDegree}-${section}` : section,
      advisorEmail,
    };

    if (groupType === "Elective") {
      delete payload.advisorEmail;
    }

    axios
      .post(
        `${backendUrl}/SuperAdmin/createOrEditLogicalGrouping`,
        payload,
        {
          headers: { Authorization: auth },
          withCredentials: true,
        }
      )
      .then((res) => alert("Submitted successfully"))
      .catch((err) => {
        alert("Submission failed");
        console.log(err);
      });
  };

  const handleDeleteGroup = async (groupCode) => {
    console.log("Deleting group:", groupCode);
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      alert("No token found.");
      return;
    }

    try {
      const res = await axios.delete(
        `${backendUrl}/SuperAdmin/deleteGrouping`,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          data: { groupid: groupCode },
          withCredentials: true,
        }
      );

      if (res.data?.status === "S" || res.data?.status === "s") {
        alert("Group deleted successfully");
        setGroupings((prev) => prev.filter((g) => g.groupcode !== groupCode));
      } else {
        alert("Delete failed: " + (res.data?.message || "Unknown error"));
      }
    } catch (err) {
      console.error("Error deleting group:", err);
      alert("An error occurred during deletion.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-blue-50 min-h-screen">
      {loading && (
        <div className="fixed inset-0 z-50 bg-black/20 flex justify-center items-center">
          <Loader2 className="animate-spin w-10 h-10 text-blue-600" />
        </div>
      )}
      <NavbarSuperAdmin setIsLoggedIn={setIsLoggedIn} />
      <div className="p-4">
        <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">
          Logical Grouping
        </h2>

        <div className="flex justify-center mb-4">
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
              Add Group
            </ToggleGroupItem>
            <ToggleGroupItem
              value="delete"
              className="px-4 py-2 data-[state=on]:bg-blue-600 data-[state=on]:text-white"
            >
              Delete Group
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        {mode === "add" && (
          <Card className="bg-white shadow-md">
            <CardContent className="space-y-4 py-6">
              <div className="grid grid-cols-2 gap-4">
                <Select value={degree} onValueChange={setDegree}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Degree" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="B.E.">B.E.</SelectItem>
                    <SelectItem value="B.Tech">B.Tech</SelectItem>
                    <SelectItem value="M.Tech">M.Tech</SelectItem>
                  </SelectContent>
                </Select>

                <Input
                  placeholder="Section"
                  value={section}
                  onChange={(e) => setSection(e.target.value)}
                />

                <Select value={passout} onValueChange={setPassout}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Passout Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {passoutOptions.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={groupType} onValueChange={setGroupType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Group Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Normal">Normal</SelectItem>
                    <SelectItem value="Elective">Elective</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="font-medium text-blue-700">
                  Upload Register Numbers CSV
                </label>
                <div className="flex gap-4 mt-2 flex-wrap">
                  <Input
                    type="file"
                    accept=".csv"
                    onChange={handleRegisterCSVUpload}
                  />
                  <Button onClick={downloadRegisterSample} variant="secondary">
                    Sample CSV
                  </Button>
                </div>
              </div>

              <div>
                <label className="font-medium text-blue-700">Timetable</label>
                <CreateTimetablePopup
                  onSave={handleTimetableSave}
                  advisorEmail={advisorEmail}
                  setAdvisorEmail={setAdvisorEmail}
                  groupType={groupType}
                />
              </div>

              <Button
                onClick={handleSubmit}
                className="bg-blue-700 hover:bg-blue-800 text-white"
              >
                Submit Group
              </Button>
            </CardContent>
          </Card>
        )}

        {mode === "delete" && (
          <Card className="bg-white shadow-md">
            <CardContent className="py-6">
              <h3 className="text-xl font-semibold text-blue-800 mb-4">
                Delete Logical Groupings
              </h3>
              <div className="overflow-auto border rounded-lg max-h-[500px]">
                <table className="min-w-full text-sm text-left text-blue-900">
                  <thead className="bg-blue-200 text-blue-700">
                    <tr>
                      <th className="px-4 py-2">Group Name</th>
                      <th className="px-4 py-2">Group Code</th>
                      <th className="px-4 py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupings.map((group, idx) => (
                      <tr key={idx} className="border-t border-blue-300">
                        <td className="px-4 py-2">{group.section}</td>
                        <td className="px-4 py-2">{group.groupcode}</td>
                        <td className="px-4 py-2">
                          <Button
                            variant="destructive"
                            onClick={() => handleDeleteGroup(group.groupcode)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
