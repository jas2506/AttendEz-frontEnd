import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8443/student",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwtToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API Calls

export async function fetchDetails() {
  const res = await api.get("/getDetails");
  return res.data;
}

export async function fetchAttendance() {
  const res = await api.post("/getAttendance", {}); // You can add a body if needed
  return res.data;
}

export async function fetchTimetable() {
  const res = await api.get("/refreshTimetable");
  return res.data;
}
