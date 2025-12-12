// Revamped LandingPage.jsx
// Clean, fast animations, blue-indigo gradient theme, non-distracting, professional

"use client";
import { Button } from "@/components/ui/button";
import {
  Mail,
  ShieldCheck,
  GraduationCap,
  Users,
  ArrowRight,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function LandingPage() {
  const [status, setStatus] = useState("loading");

  // keep checkStatus as is
  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await fetch("/api/ping");
        const text = await res.text();
        if (text === "pong") setStatus("online");
        else setStatus("offline");
      } catch (e) {
        setStatus("offline");
      }
    };
    checkStatus();
  }, []);

  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 via-indigo-50/40 to-white text-slate-800">
      {/* HEADER */}
      <header className="px-8 py-6 flex justify-between items-center max-w-7xl mx-auto w-full animate-[fadeIn_.4s_ease-out]">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text flex items-center gap-2">
            AttendEz <Sparkles className="w-5 h-5 text-blue-500" />
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Fast, Transparent and Secure.
          </p>
        </div>

        <div className="hidden md:flex items-center gap-2 text-sm text-slate-500">
          {status === "loading" && (
            <>
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
              <span>Checking...</span>
            </>
          )}
          {status === "online" && (
            <>
              <div className="relative w-2 h-2">
                {" "}
                <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping" />{" "}
                <div className="absolute inset-0 bg-emerald-400 rounded-full" />{" "}
              </div>
              <span>System Online</span>
            </>
          )}
          {status === "offline" && (
            <>
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
              <span>System Offline</span>
            </>
          )}
        </div>
      </header>

      {/* HERO SECTION */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-8 py-16 flex flex-col lg:flex-row items-center gap-16">
        {/* LEFT */}
        <div
          className="flex-1 space-y-8 animate-[fadeInUp_.5s_ease-out]
        "
        >
          <h2 className="text-4xl lg:text-6xl font-bold leading-tight text-slate-900">
            Built for{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text inline-block leading-[1.25]">
              Students
            </span>
            , Designed for{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text inline-block leading-[1.25]">
              Efficiency
            </span>
            .
          </h2>

          <p className="text-lg text-slate-600 max-w-lg">
            A fast and intuitive attendance platform crafted to simplify your
            academic workflow.
          </p>

          {/* Features */}
          <div className="space-y-3">
            {[
              "Real-time attendance tracking",
              "Collaborative platform for faculty & students",
              "Fast QR / passcode based attendance",
            ].map((f, i) => (
              <div
                key={i}
                className="flex items-center gap-3 text-slate-700 animate-[fadeIn_.4s_ease-out]"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                  <CheckCircle size={14} className="text-blue-600" />
                </div>
                <span>{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-full max-w-sm animate-[fadeInUp_.5s_ease-out]">
          <div className="bg-white shadow-xl rounded-3xl p-8 border border-slate-200/40">
            <h3 className="text-xl font-semibold text-center mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
              Choose Your Role
            </h3>

            <div className="space-y-4">
              {[
                { role: "Super Admin", icon: ShieldCheck, href: "/superadmin" },
                { role: "Faculty", icon: Users, href: "/faculty" },
                { role: "Student", icon: GraduationCap, href: "/student" },
              ].map((item, i) => (
                <Button
                  key={i}
                  onClick={() => (window.location.href = item.href)}
                  className="w-full flex justify-between items-center py-6 px-5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 text-white shadow-lg transition"
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={20} />
                    {item.role}
                  </div>
                  <ArrowRight size={18} className="opacity-80" />
                </Button>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="px-8 py-6 bg-white border-t border-slate-200 text-slate-600 flex flex-col md:flex-row justify-between items-center animate-[fadeIn_.4s_ease-out]">
        <p className="text-sm">
          © {new Date().getFullYear()} AttendEz. All rights reserved.
        </p>

        <a
          href="/contact"
          className="flex items-center gap-2 text-sm hover:text-slate-800 transition mt-3 md:mt-0"
        >
          Contact Us <Mail size={14} />
        </a>
      </footer>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
