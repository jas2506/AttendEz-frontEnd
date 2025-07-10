import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

function SuperAdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    try {
      const res = await axios.post("${backendUrl}/SuperAdmin/login", {
        email,
        password,
      });

      const token = res.data.token;
      console.log(token);
      if (token && token.trim() !== "") {
        localStorage.setItem("jwtToken", token);
        console.log("jwt stored");
        console.log(token);
      } else {
        setError("Token missing from server response");
        return;
      }
      navigate("/superadmin/manageteacher");
    } catch (err) {
      console.error("Login failed:", err);
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
      <Card className="w-full max-w-md p-8 rounded-2xl shadow-xl bg-white/90 backdrop-blur-sm border border-blue-300">
        <CardHeader className="text-center mb-2">
          <CardTitle className="text-4xl font-extrabold text-blue-700">
            Super Admin Login
          </CardTitle>
          <CardDescription className="text-base mt-1 text-blue-500">
            Please enter your credentials to continue
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5 mt-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="focus-visible:ring-2 focus-visible:ring-blue-500"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="focus-visible:ring-2 focus-visible:ring-blue-500"
          />
          <div className="text-right">
            <span className="text-sm text-blue-600 cursor-pointer hover:underline transition-all duration-150">
              Forgot password? Contact developers
            </span>
          </div>
          {error && <p className="text-red-600 text-sm text-center">{error}</p>}
        </CardContent>

        <CardFooter className="flex flex-col gap-4 mt-4">
          <Button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-200"
          >
            Log In
          </Button>
          <div className="text-center text-sm">
            <p>
              Not the Super Admin?{" "}
              <span className="text-blue-600 cursor-pointer hover:underline">
                Login as Faculty
              </span>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default SuperAdminLoginPage;
