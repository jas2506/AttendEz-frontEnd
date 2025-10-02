// src/Pages/StudentLoginPage.jsx
import React, { useState } from "react";
import { CheckCircle, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

function StudentLoginPage({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Prefilled student credentials
  const [email] = useState("sih@admin.com");
  const [password] = useState("SIH#25@");

  const handleSampleLogin = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        `${backendUrl}/student/sihLogin`,
        { email, password },
        { withCredentials: true }
      );

      const { token, hmacpasscode } = response.data;

      localStorage.setItem("studentToken", token);
      localStorage.setItem("hmacpasscode", hmacpasscode);
      localStorage.setItem("studentLoggedIn", "true");

      setSuccess("Login successful as sample student!");
      setIsLoggedIn(true);

      navigate("/student/home");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-white to-purple-200 flex items-center justify-center p-6">
      <div className="w-full max-w-md mx-auto bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-gray-100">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
            <span className="text-xl font-bold text-white">SIH</span>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-800">
            Student Login
          </h2>
          <p className="text-gray-500 mt-2 text-sm">
            Use the default student credentials below
          </p>
        </div>

        {/* Notifications */}
        {error && (
          <div className="bg-red-100 border border-red-200 rounded-xl p-3 flex items-center gap-2 mb-5 text-sm text-red-700 shadow-sm">
            <AlertCircle className="w-5 h-5 text-red-500" />
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-200 rounded-xl p-3 flex items-center gap-2 mb-5 text-sm text-green-700 shadow-sm">
            <CheckCircle className="w-5 h-5 text-green-500" />
            {success}
          </div>
        )}

        {/* Prefilled Inputs */}
        <div className="space-y-5 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              disabled
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-100 text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 disabled:cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              disabled
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-100 text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 disabled:cursor-not-allowed"
            />
          </div>
        </div>

        {/* Button */}
        <button
          onClick={handleSampleLogin}
          disabled={loading}
          className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-blue-300 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Logging in..." : "Login as Sample Student"}
        </button>
      </div>
    </div>
  );
}

export default StudentLoginPage;
