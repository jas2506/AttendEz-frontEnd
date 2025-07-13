import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const refreshJwtWithCookie = async (oldToken) => {
  try {
    const response = await axios.post(
      `${backendUrl}/faculty/refreshJWTWithCookie`,
      {},
      {
        headers: {
          Authorization: oldToken,
        },
        withCredentials: true, // Send secure cookie
      }
    );

    const data = response.data;

    if (data.status === "S" && data.token) {
      localStorage.setItem("facultyToken", data.token);
      return data.token;
    }

    return null;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    return null;
  }
};

const api = axios.create({
  baseURL: `${backendUrl}/faculty`,
});

// Add Authorization header to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("facultyToken");
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.data &&
      error.response.data.status === "TO" &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = token;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const oldToken = localStorage.getItem("facultyToken");
      const newToken = await refreshJwtWithCookie(oldToken);

      if (newToken) {
        originalRequest.headers["Authorization"] = newToken;
        processQueue(null, newToken);
        isRefreshing = false;
        return api(originalRequest);
      } else {
        processQueue(new Error("Token refresh failed"), null);
        isRefreshing = false;
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

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

// POST /qr/generateQRCode?classCode=...
export const generateQRCode = (classCode) =>
  api.post(`/qr/generateQRCode`, null, { params: { classCode } });

// POST /passcode/generateCode?classCode=...
export const generatePasscode = (classCode) =>
  api.post(`/passcode/generateCode`, null, { params: { classCode } });

// GET /liveAttendanceViewWithVersion?classCode=...&lastVersion=...
export const pollAttendanceWithVersion = (classCode, lastVersion) =>
  api.get(`/liveAttendanceViewWithVersion`, {
    params: { classCode, lastVersion },
  });

// POST /qrpasscode/confirmAttendanceClose?classCode=...
export const confirmAttendanceClose = (classCode) =>
  api.post(`/qrpasscode/confirmAttendanceClose`, null, {
    params: { classCode },
  });

// POST /getAllStudentDetails?classCode=...
export const getAllStudentDetails = (classCode) =>
  api.post(`/getAllStudentDetails`, null, {
    params: { classCode },
  });

// POST /saveManualAttendance
export const saveManualAttendance = (classCode, present, absent) =>
  api.post(`/saveManualAttendance`, {
    classCode,
    present,
    absent,
  });

// GET /fetchClassCodeFromSubstitutionCode?substitutionCode=...
export const fetchClassCodeFromSubstitutionCode = (subCode) =>
  api.get(`/fetchClassCodeFromSubstitutionCode`, {
    params: { substitutionCode: subCode },
  });
// NEW versions with subCode param
export const generateQRCodeWithSubcode = (classCode, subCode) =>
  api.post(`/qr/generateQRCode`, null, {
    params: { classCode, subCode },
  });

export const generatePasscodeWithSubcode = (classCode, subCode) =>
  api.post(`/passcode/generateCode`, null, {
    params: { classCode, subCode },
  });

export const confirmAttendanceCloseWithSubcode = (classCode, subCode) =>
  api.post(`/qrpasscode/confirmAttendanceClose`, null, {
    params: { classCode, subCode },
  });

export const pollAttendanceWithVersionWithSubcode = (
  classCode,
  lastVersion,
  subCode
) =>
  api.get(`/liveAttendanceViewWithVersion`, {
    params: { classCode, lastVersion, subCode },
  });

export { api };
