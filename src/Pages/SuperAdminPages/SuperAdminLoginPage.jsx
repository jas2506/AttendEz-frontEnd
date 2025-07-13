import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardContent,
  CardFooter,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

function SuperAdminLoginPage({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    setIsLoading(true);
    try {
      const res = await axios.post(`${backendUrl}/SuperAdmin/login`, {
        email,
        password,
      });

      const token = res.data.token;
      if (token && token.trim() !== "") {
        localStorage.setItem("superadminToken", token);
        localStorage.setItem("superAdminLoggedIn", "true");
        localStorage.setItem("superadminDetails", JSON.stringify(res.data));
        setIsLoggedIn(true);
        navigate("/superadmin/manage-teacher");
      } else {
        setError("Token missing from server response");
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFacultyLoginRedirect = () => {
    navigate("/faculty");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && email && password) {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-grey-200 to-white p-4 relative">
      {/* Background Blur Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl" />
      </div>

      {/* Login Container */}
      <div className="w-full max-w-md relative z-10 rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-100 to-gray-50 p-6 text-center">
          <h2 className="text-3xl font-bold text-black">Super Admin</h2>
          <p className="text-black mt-1 text-sm">Admin Dashboard Access</p>
        </div>

        {/* Card Body */}
        <Card className="bg-white/95 backdrop-blur-xl border-0 rounded-t-none">
          <CardContent className="p-8 space-y-5">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Email Address</label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                className="h-12 bg-gray-50 border border-gray-300 focus:border-indigo-500 focus:ring-indigo-200 rounded-lg transition"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Password</label>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                className="h-12 bg-gray-50 border border-gray-300 focus:border-indigo-500 focus:ring-indigo-200 rounded-lg transition"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3 text-sm text-red-600">
                {error}
              </div>
            )}
          </CardContent>

          <CardFooter className="flex flex-col gap-5 p-8 pt-0">
            <Button
              onClick={handleLogin}
              disabled={isLoading || !email || !password}
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Logging in...
                </div>
              ) : (
                "Log In"
              )}
            </Button>

            <div className="text-center text-sm text-gray-500">or</div>

            <Button
              onClick={handleFacultyLoginRedirect}
              variant="outline"
              className="w-full h-12 border-gray-300 hover:border-blue-400 text-blue-700 font-medium rounded-lg"
            >
              Login as Faculty
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default SuperAdminLoginPage;
