import { Button } from "@/components/ui/button";

function StudentLoginPage() {
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

        <div className="space-y-6">
          <Button className="group cursor-pointer relative flex items-center justify-center gap-4 px-8 py-4 bg-white text-gray-700 text-base font-medium rounded-full hover:bg-gray-50 transition-all duration-200 w-full border border-gray-200 hover:border-gray-300 hover:shadow-md">
            <div className="relative flex items-center gap-4">
              <div className={`transition-transform duration-200 `}>
                <div className="w-5 h-5 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-full h-full">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                </div>
              </div>
              <span className="relative">Continue with Google</span>
            </div>
          </Button>
        </div>

        {/* Clean footer */}
        <div className="pt-6 border-t border-gray-100">
          <p className="text-gray-400 text-sm font-light">
            Faculty member?{" "}
            <span className="text-gray-700 font-normal cursor-pointer hover:text-gray-900 transition-colors duration-200 underline decoration-gray-300 hover:decoration-gray-500">
              Login here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default StudentLoginPage;
