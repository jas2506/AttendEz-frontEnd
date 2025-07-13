import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

function StudentLoginPage({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const idToken = credentialResponse.credential;
      console.log(idToken);
      const res = await axios.post(`${backendUrl}/student/googleAuth`, {
        idToken,
      });

      const jwt = res.data.token;
      const hmacpasscode = res.data.hmacpasscode;
      localStorage.setItem("jwtToken", jwt);
      localStorage.setItem("hmacpasscode", hmacpasscode);
      localStorage.setItem("studentLoggedIn", "true");

      setIsLoggedIn(true);
      navigate("/student/home");
    } catch (err) {
      console.error("Login failed jas:", err);
    }
  };

  const handleFacultyLoginRedirect = () => {
    navigate("/faculty");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-white">
      <div className="bg-white rounded-3xl p-12 shadow-xl border border-gray-100 text-center space-y-8 w-full max-w-md">
        <div className="space-y-4">
          <div className="relative">
            <h1 className="text-xl font-semibold text-gray-900">Login</h1>
            <h3 className="text-gray-900 mt-2 mb-6">as Student</h3>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-gray-300 rounded-full"></div>
          </div>
          <p className="text-gray-500 text-base font-light">
            Access your student portal
          </p>
        </div>

        <div className="mt-6 flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => console.error("Login Failed jas")}
          />
        </div>

        {/* Clean footer */}
        <div className="pt-6 border-t border-gray-100">
          <p className="text-gray-400 text-sm font-light">
            Faculty member?{" "}
            <span
              onClick={handleFacultyLoginRedirect}
              className="text-gray-700 font-normal cursor-pointer hover:text-gray-900 transition-colors duration-200 underline decoration-gray-300 hover:decoration-gray-500"
            >
              Login here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default StudentLoginPage;
