import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

// Create a reusable axios instance
const api = axios.create({
  baseURL: `${backendUrl}/student`,
});

// Add JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("studentToken");
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
});

// 🧠 Global Response Interceptor to auto-logout on "TO" status
api.interceptors.response.use(
  (response) => response, // if success, pass through
  (error) => {
    const status = error?.response?.data?.status;

    if (status === "TO") {
      console.warn("Session expired (TO). Logging out student...");
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("hmacpasscode");
      localStorage.removeItem("studentLoggedIn");

      // Redirect to login (optional)
      window.location.href = "/"; // or "/student" or any login page

      // Reject the error to continue error handling if needed
    }

    return Promise.reject(error);
  }
);

// API Calls
export async function fetchDetails() {
  const res = await api.get("/getDetails");
  return res.data;
}

export async function fetchAttendance() {
  const res = await api.post("/getAttendance", {});
  return res.data;
}

export async function fetchTimetable() {
  const res = await api.get("/refreshTimetable");
  return res.data;
}

export async function sendPasscode(passcode) {
  const keyString = localStorage.getItem("hmacpasscode");
  if (!keyString) throw new Error("Missing HMAC key");

  const encoder = new TextEncoder();
  const keyBytes = encoder.encode(keyString);
  const messageBytes = encoder.encode(passcode);

  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyBytes,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign("HMAC", cryptoKey, messageBytes);
  const digest = base64UrlEncode(new Uint8Array(signature));

  const res = await api.post(
    "/passcode/sendCode",
    {},
    {
      params: {
        digest,
        passcode,
      },
    }
  );

  return res.data;
}

function base64UrlEncode(bytes) {
  return btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}
