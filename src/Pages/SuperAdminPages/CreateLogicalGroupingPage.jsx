import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import axios from "axios";
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
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Loader2, Trash2, Eye, Users, RefreshCcw } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import CreateTimetablePopup from "./CreateTimetablePage";
import EditLogicalGroupingPopup from "./EditLogicalGroupingPopup";
import EnterTimetablePopup from "./EnterTimetablePopup"; // New component
import SelectClassAdvisorPopup from "./SelectClassAdvisorPopup";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function CreateLogicalGroupPage() {
  // Add this inside your component (below other useStates)
  const [editPopupOpen, setEditPopupOpen] = useState(false);
  const [editGroupData, setEditGroupData] = useState(null);
  const [editJsonText, setEditJsonText] = useState("");
  const [showTimetablePopup, setShowTimetablePopup] = useState(false);
  const [showAdvisorPopup, setShowAdvisorPopup] = useState(false);

  // Helper to open the edit modal
  const handleEditGroup = (group) => {
    const editable = { ...group };
    delete editable.groupcode;
    delete editable.id;

    const sortedRegNos = (group.registernumbers || []).slice().sort();

    setManualRegNo(sortedRegNos.join(", "));
    setAdvisorEmail(group.advisorEmail || "");
    setTimetable(group.timetable || {});
    setClassCodes(group["class-code"] || []);
    setEditGroupData(group);
    setEditPopupOpen(true);
  };

  const refreshGroupings = () => {
    const token = localStorage.getItem("superadminToken");
    if (!token) return alert("No token found.");
    setLoading(true);
    axios
      .get(`${backendUrl}/SuperAdmin/viewAllGroupings`, {
        headers: { Authorization: token },
        withCredentials: true,
      })
      .then((res) => {
        setGroupings(res.data.groups || []);
      })
      .catch((err) => {
        console.error("Error refreshing groupings:", err);
        alert("Failed to refresh group list.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Submit edited JSON
  const handleEditSubmit = (data) => {
    const token = localStorage.getItem("superadminToken");
    if (!token) return alert("Token missing.");

    axios
      .post(`${backendUrl}/SuperAdmin/createOrEditLogicalGrouping`, data, {
        headers: { Authorization: token },
        withCredentials: true,
      })
      .then(() => {
        alert("Edited successfully.");
        setEditPopupOpen(false);
      })
      .catch((err) => {
        console.error("Edit failed:", err);
        alert("Edit failed.");
      });
  };

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
  const [manualRegNo, setManualRegNo] = useState("");

  const currentYear = new Date().getFullYear();
  const passoutOptions = Array.from({ length: 5 }, (_, i) =>
    (currentYear + i).toString()
  );

  useEffect(() => {
    const auth = localStorage.getItem("superadminToken");
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
      const auth = localStorage.getItem("superadminToken");
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
    const auth = localStorage.getItem("superadminToken");
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
    } else if (groupType === "Lab") {
      delete payload.advisorEmail;
      const normalizedDegree = degree.replace(/\./g, "").toUpperCase();
      //payload.section = `${classCodes[0]}-${normalizedDegree}-LAB-${section}-${passout}`;
      payload.section = `${normalizedDegree}-LAB-${section}`;
    }

    axios
      .post(`${backendUrl}/SuperAdmin/createOrEditLogicalGrouping`, payload, {
        headers: { Authorization: auth },
        withCredentials: true,
      })
      .then((res) => alert("Submitted successfully"))
      .catch((err) => {
        alert("Submission failed");
        console.log(err);
      });
  };

  const handleDeleteGroup = async (groupCode) => {
    console.log("Deleting group:", groupCode);
    const token = localStorage.getItem("superadminToken");
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
    <div className="min-h-screen bg-blue-50">
      {loading && (
        <div className="fixed inset-0 z-50 bg-black/20 flex justify-center items-center">
          <Loader2 className="animate-spin w-10 h-10 text-blue-600" />
        </div>
      )}

      <div className="max-w-4xl mx-auto p-8 mt-6 bg-white/90 rounded-2xl shadow-lg backdrop-blur-sm border border-blue-200 space-y-6">
        <h2 className="text-3xl font-bold text-blue-700 text-center">
          Logical Grouping Management
        </h2>

        <div className="flex justify-center">
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
              View Groups
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        {mode === "add" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <Select value={degree} onValueChange={setDegree}>
                <SelectTrigger className="p-3 border border-blue-300 rounded-md">
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
                className="p-3 border border-blue-300 rounded-md"
              />
              <Select value={passout} onValueChange={setPassout}>
                <SelectTrigger className="p-3 border border-blue-300 rounded-md">
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
                <SelectTrigger className="p-3 border border-blue-300 rounded-md">
                  <SelectValue placeholder="Group Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Normal">Normal</SelectItem>
                  <SelectItem value="Elective">Elective</SelectItem>
                  <SelectItem value="Lab">Lab</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="font-semibold text-blue-700 text-lg mb-3 block">
                Enter Register Numbers (comma-separated)
              </label>
              <div className="flex items-center gap-4 mt-2 flex-wrap">
                <Input
                  type="text"
                  placeholder="Enter e.g. 3122235001001,3122235001002"
                  value={manualRegNo}
                  onChange={(e) => setManualRegNo(e.target.value)}
                  className="flex-1 p-3 border border-blue-300 rounded-md"
                />
                <Button
                  onClick={() => {
                    const numbers = manualRegNo
                      .split(",")
                      .map((num) => num.trim())
                      .filter(
                        (num) => num !== "" && !registerNumbers.includes(num)
                      );
                    if (numbers.length > 0) {
                      setRegisterNumbers((prev) => [...prev, ...numbers]);
                      setManualRegNo("");
                    }
                  }}
                  className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
                >
                  Add Numbers
                </Button>
              </div>
              {registerNumbers.length > 0 && (
                <div className="mt-4 max-h-32 overflow-auto border border-blue-300 rounded-md p-4 text-sm bg-blue-50">
                  <div className="font-medium text-blue-700 mb-2">
                    Added Register Numbers ({registerNumbers.length}):
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {registerNumbers.map((num, idx) => (
                      <div
                        key={idx}
                        className="bg-white rounded-md px-3 py-1 text-blue-800 font-mono text-xs flex items-center justify-between gap-2"
                      >
                        <span>{num}</span>
                        <button
                          onClick={() =>
                            setRegisterNumbers((prev) =>
                              prev.filter((n, i) => i !== idx)
                            )
                          }
                          className="text-red-500 hover:text-red-700 text-xs"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              {groupType === "Normal" && (
                <div>
                  <label className="font-semibold text-blue-700 text-lg mb-3 block">
                    Select Class Advisor
                  </label>
                  <div>
                    <Button
                      onClick={() => setShowAdvisorPopup(true)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md"
                    >
                      Choose Advisor
                    </Button>
                    {advisorEmail && (
                      <p className="mt-2 text-sm text-blue-700">
                        Selected:{" "}
                        <span className="font-medium">
                          {advisors.find((a) => a.email === advisorEmail)?.name}{" "}
                          ({advisorEmail})
                        </span>
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div className="mt-4">
                <label className="font-semibold text-blue-700 text-lg mb-3 block">
                  Timetable
                </label>
                <Button
                  onClick={() => setShowTimetablePopup(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md"
                >
                  Enter Timetable
                </Button>
              </div>

              <EnterTimetablePopup
                visible={showTimetablePopup}
                onClose={() => setShowTimetablePopup(false)}
                onSave={handleTimetableSave}
                initialData={timetable}
              />
            </div>

            <Button
              onClick={handleSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-md text-lg font-semibold"
            >
              Submit Group
            </Button>
          </div>
        )}

        {mode === "delete" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-blue-700">
                Manage Logical Groupings
              </h3>
              <Button
                variant="ghost"
                className="text-blue-600 hover:bg-blue-100 p-2"
                onClick={refreshGroupings}
              >
                <RefreshCcw className="h-4 w-4 mr-1" />
                Refresh List
              </Button>
            </div>

            {groupings.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="w-12 h-12 text-blue-400" />
                </div>
                <p className="text-blue-600 text-lg">
                  No logical groupings found
                </p>
              </div>
            ) : (
              <div className="overflow-auto rounded-lg border border-blue-200 max-h-[400px] custom-scrollbar">
                <table className="min-w-full text-sm text-left text-blue-900">
                  <thead className="text-xs uppercase text-blue-700 bg-blue-200">
                    <tr>
                      <th className="px-4 py-2">Group Name</th>
                      <th className="px-4 py-2">Group Code</th>
                      <th className="px-4 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupings.map((group, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-blue-300 even:bg-blue-50"
                      >
                        <td className="px-4 py-2">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                              <Users className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <div className="font-semibold text-blue-900">
                                {group.section}
                              </div>
                              <div className="text-sm text-blue-600">
                                Logical Group
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-2">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 font-mono">
                            {group.groupcode}
                          </span>
                        </td>
                        <td className="px-4 py-2 flex gap-2">
                          <Button
                            variant="destructive"
                            onClick={() => handleDeleteGroup(group.groupcode)}
                            className="text-sm"
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Delete
                          </Button>
                          <Button
                            onClick={() => handleEditGroup(group)}
                            className="bg-blue-600 hover:bg-blue-700 text-white text-sm"
                          >
                            Edit Group
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <EditLogicalGroupingPopup
              visible={editPopupOpen}
              onClose={() => setEditPopupOpen(false)}
              groupData={editGroupData}
              onSubmit={handleEditSubmit}
            />
          </div>
        )}

        <SelectClassAdvisorPopup
          open={showAdvisorPopup}
          onClose={() => {
            console.log("Popup closing");
            setShowAdvisorPopup(false);
          }}
          advisors={advisors}
          onSelect={(email) => {
            console.log("Selected advisor:", email);
            setAdvisorEmail(email);
          }}
        />
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #60a5fa;
          border-radius: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #e0f2fe;
        }
      `}</style>
    </div>
  );
}
