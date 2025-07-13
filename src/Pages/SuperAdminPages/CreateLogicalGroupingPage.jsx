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
import { Loader2, Trash2, Eye, Users } from "lucide-react";
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

    setManualRegNo((group.registernumbers || []).join(", "));
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
    <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 min-h-screen">
      {loading && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex justify-center items-center">
          <div className="bg-white rounded-xl p-6 shadow-2xl flex items-center gap-4">
            <Loader2 className="animate-spin w-8 h-8 text-blue-600" />
            <span className="text-gray-700 font-medium">Loading...</span>
          </div>
        </div>
      )}
      <div className="p-6">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-6 text-center">
          Logical Grouping Management
        </h2>
        <div className="flex justify-center mb-6">
          <ToggleGroup
            type="single"
            value={mode}
            onValueChange={(val) => val && setMode(val)}
            className="bg-white/80 backdrop-blur-sm p-1 rounded-xl shadow-lg border border-white/20"
          >
            <ToggleGroupItem
              value="add"
              className="px-6 py-3 rounded-lg font-medium transition-all duration-200 data-[state=on]:bg-gradient-to-r data-[state=on]:from-blue-500 data-[state=on]:to-blue-600 data-[state=on]:text-white data-[state=on]:shadow-lg hover:bg-blue-50"
            >
              <Users className="w-4 h-4 mr-2" />
              Add Group
            </ToggleGroupItem>
            <ToggleGroupItem
              value="delete"
              className="px-6 py-3 rounded-lg font-medium transition-all duration-200 data-[state=on]:bg-gradient-to-r data-[state=on]:from-purple-500 data-[state=on]:to-purple-600 data-[state=on]:text-white data-[state=on]:shadow-lg hover:bg-purple-50"
            >
              <Eye className="w-4 h-4 mr-2" />
              View Groups
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        {mode === "add" && (
          <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0 rounded-2xl">
            <CardContent className="space-y-6 py-8 px-8">
              <div className="grid grid-cols-2 gap-6">
                <Select value={degree} onValueChange={setDegree}>
                  <SelectTrigger className="h-12 rounded-xl border-2 border-blue-100 focus:border-blue-400 transition-colors">
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
                  className="h-12 rounded-xl border-2 border-blue-100 focus:border-blue-400 transition-colors"
                />
                <Select value={passout} onValueChange={setPassout}>
                  <SelectTrigger className="h-12 rounded-xl border-2 border-blue-100 focus:border-blue-400 transition-colors">
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
                  <SelectTrigger className="h-12 rounded-xl border-2 border-blue-100 focus:border-blue-400 transition-colors">
                    <SelectValue placeholder="Group Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Normal">Normal</SelectItem>
                    <SelectItem value="Elective">Elective</SelectItem>
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
                    className="flex-1 h-12 rounded-xl border-2 border-blue-100 focus:border-blue-400 transition-colors"
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
                    className="h-12 px-6 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg"
                  >
                    Add Numbers
                  </Button>
                </div>
                {registerNumbers.length > 0 && (
                  <div className="mt-4 max-h-32 overflow-auto border-2 border-blue-100 rounded-xl p-4 text-sm bg-gradient-to-r from-blue-50 to-indigo-50">
                    <div className="font-medium text-blue-700 mb-2">
                      Added Register Numbers ({registerNumbers.length}):
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {registerNumbers.map((num, idx) => (
                        <div
                          key={idx}
                          className="bg-white/70 rounded-lg px-3 py-1 text-blue-800 font-mono text-xs"
                        >
                          {num}
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
                        className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl px-6 py-3"
                      >
                        Choose Advisor
                      </Button>
                      {advisorEmail && (
                        <p className="mt-2 text-sm text-gray-700">
                          Selected:{" "}
                          <span className="font-medium">
                            {
                              advisors.find((a) => a.email === advisorEmail)
                                ?.name
                            }{" "}
                            ({advisorEmail})
                          </span>
                        </p>
                      )}
                    </div>
                  </div>
                )}

                <p className="text-sm mt-2 text-gray-500">
                  Selected: {advisorEmail}
                </p>

                <label className="font-semibold text-blue-700 text-lg mb-3 block">
                  Timetable
                </label>
                <Button
                  onClick={() => setShowTimetablePopup(true)}
                  className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl px-6 py-3"
                >
                  Enter Timetable
                </Button>

                <EnterTimetablePopup
                  visible={showTimetablePopup}
                  onClose={() => setShowTimetablePopup(false)}
                  onSave={handleTimetableSave}
                  initialData={timetable}
                />
              </div>

              <Button
                onClick={handleSubmit}
                className="w-full h-14 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-lg shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
              >
                Submit Group
              </Button>
            </CardContent>
          </Card>
        )}

        {mode === "delete" && (
          <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0 rounded-2xl overflow-hidden">
            <CardContent className="py-8 px-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                    Manage Logical Groupings
                  </h3>
                </div>
                <Button
                  onClick={refreshGroupings}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-2 rounded-xl shadow-md transition-all duration-200"
                >
                  Refresh List
                </Button>
              </div>

              {groupings.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                    <Users className="w-12 h-12 text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-lg">
                    No logical groupings found
                  </p>
                </div>
              ) : (
                <div className="overflow-hidden border-2 border-purple-100 rounded-2xl shadow-lg">
                  <div className="overflow-auto max-h-[500px]">
                    <table className="min-w-full">
                      <thead className="bg-gradient-to-r from-purple-500 to-pink-500 text-white sticky top-0">
                        <tr>
                          <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">
                            Group Name
                          </th>
                          <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">
                            Group Code
                          </th>
                          <th className="px-6 py-4 text-center font-semibold text-sm uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-purple-100">
                        {groupings.map((group, idx) => (
                          <tr
                            key={idx}
                            className="hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-200"
                          >
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                                  <Users className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                  <div className="font-semibold text-gray-900">
                                    {group.section}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    Logical Group
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 font-mono">
                                {group.groupcode}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-center flex gap-3 justify-center">
                              <Button
                                variant="destructive"
                                onClick={() =>
                                  handleDeleteGroup(group.groupcode)
                                }
                                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </Button>
                              <Button
                                onClick={() => handleEditGroup(group)}
                                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105"
                              >
                                Edit Logical Group
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              <EditLogicalGroupingPopup
                visible={editPopupOpen}
                onClose={() => setEditPopupOpen(false)}
                groupData={editGroupData}
                onSubmit={handleEditSubmit}
              />
            </CardContent>
          </Card>
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
    </div>
  );
}
