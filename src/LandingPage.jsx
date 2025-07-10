import React from "react";
import { Button } from "@/components/ui/button";
import {
  Mail,
  ShieldCheck,
  GraduationCap,
  Users,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-blue-100 via-blue-200 to-purple-100 text-gray-800 font-sans relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 p-6 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-slate-800">AttendEz</h1>
          <p className="text-lg mt-1 text-slate-600 font-medium">
            Empowering Education, Effortlessly
          </p>
        </div>
        <div className="hidden md:flex items-center gap-2 text-slate-600 text-sm">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          System Online
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col md:flex-row justify-between items-center px-10 md:px-20 py-10 gap-12">
        {/* Left Section */}
        <div className="max-w-lg text-left space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold leading-tight text-slate-800">
              Welcome to AttendEz
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed">
              An attendance management system designed by CSE 3rd year
              students. Streamline your educational workflows with our intuitive
              platform.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-slate-700">
              <CheckCircle size={18} className="text-green-500" />
              <span>Real-time attendance tracking</span>
            </div>
            <div className="flex items-center gap-3 text-slate-700">
              <CheckCircle size={18} className="text-green-500" />
              <span>On duty approval system</span>
            </div>
            <div className="flex items-center gap-3 text-slate-700">
              <CheckCircle size={18} className="text-green-500" />
              <span>Collaborative platform for all users</span>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="space-y-4 w-full md:w-auto">
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-8 border border-slate-200 shadow-lg">
            <h3 className="text-xl font-semibold mb-6 text-center text-slate-800">
              Choose Your Role
            </h3>
            <div className="space-y-4">
              <Button
                className="w-full md:w-72 text-lg flex gap-3 items-center justify-between bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 hover:border-slate-400 rounded-xl py-6 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                onClick={() => (window.location.href = "/superadmin")}
              >
                <div className="flex items-center gap-3">
                  <ShieldCheck size={20} />
                  Super Admin
                </div>
                <ArrowRight size={16} />
              </Button>

              <Button
                className="w-full md:w-72 text-lg flex gap-3 items-center justify-between bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 hover:border-slate-400 rounded-xl py-6 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                onClick={() => (window.location.href = "/faculty")}
              >
                <div className="flex items-center gap-3">
                  <Users size={20} />
                  Faculty
                </div>
                <ArrowRight size={16} />
              </Button>

              <Button
                className="w-full md:w-72 text-lg flex gap-3 items-center justify-between bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 hover:border-slate-400 rounded-xl py-6 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                onClick={() => (window.location.href = "/student")}
              >
                <div className="flex items-center gap-3">
                  <GraduationCap size={20} />
                  Student
                </div>
                <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-white/80 backdrop-blur-sm border-t border-slate-200 text-slate-600 text-sm p-6 flex flex-col md:flex-row justify-between items-center">
        <p>©️ {new Date().getFullYear()} AttendEz. All rights reserved.</p>
        <a
          href="/contact"
          className="hover:text-slate-800 mt-2 md:mt-0 transition-colors duration-300 flex items-center gap-2 hover:underline"
        >
          Contact Us <Mail size={16} />
        </a>
      </footer>
    </div>
  );
}
