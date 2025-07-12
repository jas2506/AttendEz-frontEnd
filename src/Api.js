import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

// Create a reusable axios instance
const api = axios.create({
  baseURL: `${backendUrl}/student`,
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
  const keyString = localStorage.getItem("hmacpasscode");
  if (!keyString) throw new Error("Missing HMAC key");

  const encoder = new TextEncoder();
  const keyBytes = encoder.encode(keyString);     // Same as .getBytes(StandardCharsets.UTF_8)
  const messageBytes = encoder.encode(passcode);  // Same

  // Import key
  const cryptoKey = await crypto.subtle.importKey(
      "raw",
      keyBytes,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
  );

  // Generate signature
  const signature = await crypto.subtle.sign("HMAC", cryptoKey, messageBytes);

  // Convert to Base64 URL-safe without padding
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
      .replace(/=+$/, ""); // Remove padding
}
