import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8443/faculty",
});

// Add Authorization header to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("facultyToken");
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
});

// POST /setDetails
export const setFacultyDetails = (data) => api.post("/setDetails", data);

// GET /getDetails
export const getFacultyDetails = () => api.get("/getDetails");

// GET /getAllLogicalGroupings?department=CSE
export const getAllLogicalGroupings = (department) =>
  api.get(`/getAllLogicalGroupings`, { params: { department } });

// POST /createOrUpdateClass
export const createOrUpdateClass = (data) =>
  api.post("/createOrUpdateClass", data);

// DELETE /dropClass
export const dropClass = (data) => api.delete("/dropClass", { data });

// POST /transferClass
export const transferClass = (data) => api.post("/transferClass", data);

// GET /getClassDetails?classCode=...
export const getClassDetails = (classCode) =>
  api.get("/getClassDetails", { params: { classCode } });

// GET /refreshTimetable
export const refreshTimetable = () => api.get("/refreshTimetable");

// POST /updateMenteeListAndReturnDetails
export const updateMenteeListAndReturnDetails = (data) =>
  api.post("/updateMenteeListAndReturnDetails", data);

// GET /getMentorListAttendance
export const getMentorListAttendance = () =>
  api.get("/getMentorListAttendance");

// GET /getAdvisorListAttendance
export const getAdvisorListAttendance = () =>
  api.get("/getAdvisorListAttendance");

// POST /getStudentAttendanceByClassCode
export const getStudentAttendanceByClassCode = (data) =>
  api.post("/getStudentAttendanceByClassCode", data);

// POST /getLectureAttendanceByClassCode
export const getLectureAttendanceByClassCode = (data) =>
  api.post("/getLectureAttendanceByClassCode", data);

// POST /flipAttendance
export const flipAttendance = (data) => api.post("/flipAttendance", data);

// POST /deleteLecture
export const deleteLecture = (data) => api.post("/deleteLecture", data);
