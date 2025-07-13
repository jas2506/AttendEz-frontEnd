// import React, { useState } from "react";
// import {
//   AlertCircle,
//   Mail,
//   Lock,
//   Eye,
//   EyeOff,
//   User,
//   CheckCircle,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const backendUrl = import.meta.env.VITE_BACKEND_URL;

// const TeacherLogin = ({ setIsLoggedIn }) => {
//   const navigate = useNavigate();

//   const [currentStep, setCurrentStep] = useState("login"); // 'login', 'email', 'otp', 'password'
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     otp: "",
//     newPassword: "",
//     confirmPassword: "",
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [token, setToken] = useState("");

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//     setError("");
//   };

//   const apiCall = async (endpoint, body) => {
//     const response = await fetch(`${backendUrl}/faculty${endpoint}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         ...(token && { Authorization: `${token}` }),
//       },
//       body: JSON.stringify(body),
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       throw new Error(data.message || "An error occurred");
//     }

//     return data;
//   };

//   const handleLogin = async () => {
//     setLoading(true);
//     setError("");

//     try {
//       const response = await apiCall("/login", {
//         email: formData.email,
//         password: formData.password,
//       });

//       setSuccess("Login successful!");
//       localStorage.setItem("teacherToken", response.token);
//       setToken(response.token);

//       console.log("Login successful:", response);
//       setIsLoggedIn(true);
//       navigate("/faculty/home");
//     } catch (err) {
//       setError(err.message || "Login failed. Please check your credentials.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEmailSubmit = async () => {
//     setLoading(true);
//     setError("");

//     try {
//       const response = await apiCall("/setEmail", {
//         email: formData.email,
//       });

//       setSuccess("OTP sent to your email!");
//       setToken(response.token);
//       setCurrentStep("otp");
//     } catch (err) {
//       setError("Contact admin - your email is not a faculty email");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleOtpSubmit = async () => {
//     setLoading(true);
//     setError("");

//     try {
//       const response = await apiCall("/verifyOtp", {
//         otp: formData.otp,
//       });

//       setSuccess("OTP verified successfully!");
//       setToken(response.token);
//       setCurrentStep("password");
//     } catch (err) {
//       setError("Invalid OTP. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePasswordUpdate = async () => {
//     setLoading(true);
//     setError("");

//     if (formData.newPassword !== formData.confirmPassword) {
//       setError("Passwords do not match");
//       setLoading(false);
//       return;
//     }

//     if (formData.newPassword.length < 4) {
//       setError("Password must be at least 4 characters long");
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await apiCall("/updatePassword", {
//         password: formData.newPassword,
//       });

//       setSuccess("Password updated successfully! You can now login.");
//       setTimeout(() => {
//         setCurrentStep("login");
//         setFormData({
//           ...formData,
//           password: "",
//           newPassword: "",
//           confirmPassword: "",
//           otp: "",
//         });
//         setSuccess("");
//       }, 2000);
//     } catch (err) {
//       setError("Failed to update password. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetToLogin = () => {
//     setCurrentStep("login");
//     setFormData({
//       email: "",
//       password: "",
//       otp: "",
//       newPassword: "",
//       confirmPassword: "",
//     });
//     setError("");
//     setSuccess("");
//     setToken("");
//   };

//   const startForgotPassword = () => {
//     setCurrentStep("email");
//     setError("");
//     setSuccess("");
//   };

//   const renderLoginForm = () => (
//     <div className="w-full max-w-md mx-auto">
//       <div className="bg-white rounded-2xl shadow-xl p-8">
//         <div className="text-center mb-8">
//           <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
//             <User className="w-8 h-8 text-blue-600" />
//           </div>
//           <h2 className="text-2xl font-bold text-gray-800">Faculty Login</h2>
//           <p className="text-gray-600 mt-2">
//             Welcome back! Please sign in to your account.
//           </p>
//         </div>

//         <div className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Email Address
//             </label>
//             <div className="relative">
//               <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                 placeholder="Enter your email"
//                 required
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Password
//             </label>
//             <div className="relative">
//               <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 value={formData.password}
//                 onChange={handleInputChange}
//                 className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                 placeholder="Enter your password"
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//               >
//                 {showPassword ? (
//                   <EyeOff className="w-5 h-5" />
//                 ) : (
//                   <Eye className="w-5 h-5" />
//                 )}
//               </button>
//             </div>
//           </div>

//           {error && (
//             <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
//               <AlertCircle className="w-5 h-5 text-red-500" />
//               <span className="text-red-700 text-sm">{error}</span>
//             </div>
//           )}

//           {success && (
//             <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2">
//               <CheckCircle className="w-5 h-5 text-green-500" />
//               <span className="text-green-700 text-sm">{success}</span>
//             </div>
//           )}

//           <button
//             type="button"
//             onClick={handleLogin}
//             disabled={loading}
//             className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {loading ? "Signing in..." : "Sign In"}
//           </button>

//           <div className="text-center">
//             <button
//               type="button"
//               onClick={startForgotPassword}
//               className="text-blue-600 hover:text-blue-800 text-sm font-medium"
//             >
//               Forgot Password? / First Time Login?
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const renderEmailForm = () => (
//     <div className="w-full max-w-md mx-auto">
//       <div className="bg-white rounded-2xl shadow-xl p-8">
//         <div className="text-center mb-8">
//           <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
//             <Mail className="w-8 h-8 text-blue-600" />
//           </div>
//           <h2 className="text-2xl font-bold text-gray-800">Verify Email</h2>
//           <p className="text-gray-600 mt-2">
//             Enter your faculty email to receive OTP
//           </p>
//         </div>

//         <div className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Faculty Email
//             </label>
//             <div className="relative">
//               <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                 placeholder="Enter your faculty email"
//                 required
//               />
//             </div>
//           </div>

//           {error && (
//             <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
//               <AlertCircle className="w-5 h-5 text-red-500" />
//               <span className="text-red-700 text-sm">{error}</span>
//             </div>
//           )}

//           {success && (
//             <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2">
//               <CheckCircle className="w-5 h-5 text-green-500" />
//               <span className="text-green-700 text-sm">{success}</span>
//             </div>
//           )}

//           <button
//             type="button"
//             onClick={handleEmailSubmit}
//             disabled={loading}
//             className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {loading ? "Sending OTP..." : "Send OTP"}
//           </button>

//           <div className="text-center">
//             <button
//               type="button"
//               onClick={resetToLogin}
//               className="text-gray-600 hover:text-gray-800 text-sm font-medium"
//             >
//               Back to Login
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const renderOtpForm = () => (
//     <div className="w-full max-w-md mx-auto">
//       <div className="bg-white rounded-2xl shadow-xl p-8">
//         <div className="text-center mb-8">
//           <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
//             <CheckCircle className="w-8 h-8 text-green-600" />
//           </div>
//           <h2 className="text-2xl font-bold text-gray-800">Enter OTP</h2>
//           <p className="text-gray-600 mt-2">
//             We've sent a verification code to your email
//           </p>
//         </div>

//         <div className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               OTP Code
//             </label>
//             <input
//               type="text"
//               name="otp"
//               value={formData.otp}
//               onChange={handleInputChange}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-center text-lg tracking-widest"
//               placeholder="Enter 6-digit OTP"
//               maxLength="6"
//               required
//             />
//           </div>

//           {error && (
//             <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
//               <AlertCircle className="w-5 h-5 text-red-500" />
//               <span className="text-red-700 text-sm">{error}</span>
//             </div>
//           )}

//           {success && (
//             <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2">
//               <CheckCircle className="w-5 h-5 text-green-500" />
//               <span className="text-green-700 text-sm">{success}</span>
//             </div>
//           )}

//           <button
//             type="button"
//             onClick={handleOtpSubmit}
//             disabled={loading}
//             className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {loading ? "Verifying..." : "Verify OTP"}
//           </button>

//           <div className="text-center">
//             <button
//               type="button"
//               onClick={resetToLogin}
//               className="text-gray-600 hover:text-gray-800 text-sm font-medium"
//             >
//               Back to Login
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const renderPasswordForm = () => (
//     <div className="w-full max-w-md mx-auto">
//       <div className="bg-white rounded-2xl shadow-xl p-8">
//         <div className="text-center mb-8">
//           <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
//             <Lock className="w-8 h-8 text-purple-600" />
//           </div>
//           <h2 className="text-2xl font-bold text-gray-800">Set New Password</h2>
//           <p className="text-gray-600 mt-2">
//             Create a secure password for your account
//           </p>
//         </div>

//         <div className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               New Password
//             </label>
//             <div className="relative">
//               <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 type={showNewPassword ? "text" : "password"}
//                 name="newPassword"
//                 value={formData.newPassword}
//                 onChange={handleInputChange}
//                 className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                 placeholder="Enter new password"
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowNewPassword(!showNewPassword)}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//               >
//                 {showNewPassword ? (
//                   <EyeOff className="w-5 h-5" />
//                 ) : (
//                   <Eye className="w-5 h-5" />
//                 )}
//               </button>
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Confirm Password
//             </label>
//             <div className="relative">
//               <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 type={showNewPassword ? "text" : "password"}
//                 name="confirmPassword"
//                 value={formData.confirmPassword}
//                 onChange={handleInputChange}
//                 className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                 placeholder="Confirm new password"
//                 required
//               />
//             </div>
//           </div>

//           {error && (
//             <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
//               <AlertCircle className="w-5 h-5 text-red-500" />
//               <span className="text-red-700 text-sm">{error}</span>
//             </div>
//           )}

//           {success && (
//             <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2">
//               <CheckCircle className="w-5 h-5 text-green-500" />
//               <span className="text-green-700 text-sm">{success}</span>
//             </div>
//           )}

//           <button
//             type="button"
//             onClick={handlePasswordUpdate}
//             disabled={loading}
//             className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {loading ? "Updating Password..." : "Update Password"}
//           </button>

//           <div className="text-center">
//             <button
//               type="button"
//               onClick={resetToLogin}
//               className="text-gray-600 hover:text-gray-800 text-sm font-medium"
//             >
//               Back to Login
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         {currentStep === "login" && renderLoginForm()}
//         {currentStep === "email" && renderEmailForm()}
//         {currentStep === "otp" && renderOtpForm()}
//         {currentStep === "password" && renderPasswordForm()}
//       </div>
//     </div>
//   );
// };

// export default TeacherLogin;
import React, { useState } from "react";
import {
  AlertCircle,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  CheckCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const TeacherLogin = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState("login"); // 'login', 'email', 'otp', 'password'
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [token, setToken] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const apiCall = async (endpoint, body) => {
    const response = await fetch(`${backendUrl}/faculty${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `${token}` }),
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "An error occurred");
    }

    return data;
  };

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await apiCall("/login", {
        email: formData.email,
        password: formData.password,
      });

      setSuccess("Login successful!");
      localStorage.setItem("facultyToken", response.token);
      setToken(response.token);

      console.log("Login successful:", response);
      setIsLoggedIn(true);
      navigate("/faculty/home");
    } catch (err) {
      setError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await apiCall("/setEmail", {
        email: formData.email,
      });

      setSuccess("OTP sent to your email!");
      setToken(response.token);
      setCurrentStep("otp");
    } catch (err) {
      setError("Contact admin - your email is not a faculty email");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await apiCall("/verifyOtp", {
        otp: formData.otp,
      });

      setSuccess("OTP verified successfully!");
      setToken(response.token);
      setCurrentStep("password");
    } catch (err) {
      setError("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async () => {
    setLoading(true);
    setError("");

    if (formData.newPassword !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (formData.newPassword.length < 4) {
      setError("Password must be at least 4 characters long");
      setLoading(false);
      return;
    }

    try {
      const response = await apiCall("/updatePassword", {
        password: formData.newPassword,
      });

      setSuccess("Password updated successfully! You can now login.");
      setTimeout(() => {
        setCurrentStep("login");
        setFormData({
          ...formData,
          password: "",
          newPassword: "",
          confirmPassword: "",
          otp: "",
        });
        setSuccess("");
      }, 2000);
    } catch (err) {
      setError("Failed to update password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetToLogin = () => {
    setCurrentStep("login");
    setFormData({
      email: "",
      password: "",
      otp: "",
      newPassword: "",
      confirmPassword: "",
    });
    setError("");
    setSuccess("");
    setToken("");
  };

  const startForgotPassword = () => {
    setCurrentStep("email");
    setError("");
    setSuccess("");
  };

  const renderLoginForm = () => (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Faculty Login</h2>
          <p className="text-gray-600 mt-2">
            Welcome back! Please sign in to your account.
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
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
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={startForgotPassword}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Forgot Password? / First Time Login?
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEmailForm = () => (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Verify Email</h2>
          <p className="text-gray-600 mt-2">
            Enter your faculty email to receive OTP
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Faculty Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter your faculty email"
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

          <div className="text-center">
            <button
              type="button"
              onClick={resetToLogin}
              className="text-gray-600 hover:text-gray-800 text-sm font-medium"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderOtpForm = () => (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Enter OTP</h2>
          <p className="text-gray-600 mt-2">
            We've sent a verification code to your email
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
              onClick={resetToLogin}
              className="text-gray-600 hover:text-gray-800 text-sm font-medium"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPasswordForm = () => (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-purple-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Set New Password</h2>
          <p className="text-gray-600 mt-2">
            Create a secure password for your account
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter new password"
                required
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showNewPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showNewPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Confirm new password"
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
            onClick={handlePasswordUpdate}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Updating Password..." : "Update Password"}
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={resetToLogin}
              className="text-gray-600 hover:text-gray-800 text-sm font-medium"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {currentStep === "login" && renderLoginForm()}
        {currentStep === "email" && renderEmailForm()}
        {currentStep === "otp" && renderOtpForm()}
        {currentStep === "password" && renderPasswordForm()}
      </div>
    </div>
  );
};

export default TeacherLogin;
