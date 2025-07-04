import axios from "axios";

// Create a reusable axios instance
const api = axios.create({
  baseURL: "http://localhost:8443/student",
});

// Add JWT to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwtToken");
  if (token) {
    config.headers.Authorization = `${token}`;
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

export async function sendPasscode(passcode) {
  const digest = localStorage.getItem("hmacpasscode");

  const res = await api.post(
    "/passcode/sendCode",
    {}, // No body (or you can pass body data here if required)
    {
      params: {
        digest,
        passcode,
      },
    }
  );

  return res.data;
}

