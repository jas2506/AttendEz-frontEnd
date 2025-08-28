import React, { useState } from "react";
import { Mail, AlertCircle, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;


function StudentLoginPage({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState("email"); // "email" → "otp"
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  // Step 1: Email submit
  const handleEmailSubmit = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await axios.post(`${backendUrl}/student/setEmail`, {
        email: formData.email,
      });

      setSuccess("OTP sent to your email!");
      setCurrentStep("otp");
    } catch (err) {
      setError("Email not registered. Please contact admin.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleOtpSubmit = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        `${backendUrl}/student/verifyOTPAndLogin`,
        {
          email: formData.email,
          otp: formData.otp,
        },
        { withCredentials: true }
      );

      const newToken = response.data.token;
      const hmacpasscode = response.data.hmacpasscode;

      // Save tokens
      localStorage.setItem("studentToken", newToken);
      localStorage.setItem("hmacpasscode", hmacpasscode);
      localStorage.setItem("studentLoggedIn", "true");

      setSuccess("Login successful!");
      setIsLoggedIn(true);

      // redirect to student home
      navigate("/student/home");
    } catch (err) {
      setError(
        err.response?.data?.message || "Invalid OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // reset
  const resetToEmail = () => {
    setCurrentStep("email");
    setFormData({ email: "", otp: "" });
    setError("");
    setSuccess("");
  };

  // Email form
  const renderEmailForm = () => (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Student Login</h2>
          <p className="text-gray-600 mt-2">Enter your email to receive OTP</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Student Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter your student email"
                required
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <span className="text-red-700 text-sm">{error}</span>
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-green-700 text-sm">{success}</span>
            </div>
          )}

          <button
            type="button"
            onClick={handleEmailSubmit}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </div>
      </div>
    </div>
  );

  // OTP form
  const renderOtpForm = () => (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Enter OTP</h2>
          <p className="text-gray-600 mt-2">
            We’ve sent a verification code to your email
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              OTP Code
            </label>
            <input
              type="text"
              name="otp"
              value={formData.otp}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-center text-lg tracking-widest"
              placeholder="Enter 6-digit OTP"
              maxLength="6"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <span className="text-red-700 text-sm">{error}</span>
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-green-700 text-sm">{success}</span>
            </div>
          )}

          <button
            type="button"
            onClick={handleOtpSubmit}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={resetToEmail}
              className="text-gray-600 hover:text-gray-800 text-sm font-medium"
            >
              Back to Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {currentStep === "email" && renderEmailForm()}
        {currentStep === "otp" && renderOtpForm()}
      </div>
    </div>
  );
}

export default StudentLoginPage;
