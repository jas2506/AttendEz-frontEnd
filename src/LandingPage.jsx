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
  // "loading" | "online" | "offline"

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await fetch("/api/ping");
        const text = await res.text();
        if (text === "pong") {
          setStatus("online");
        } else {
          setStatus("offline");
        }
      } catch (err) {
        setStatus("offline");
      }
    };

    checkStatus();
  }, []);

  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    localStorage.clear();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }));
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll("[id]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 text-slate-800 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating orbs with parallax */}
        <div
          className="absolute top-1/4 -right-32 w-64 h-64 bg-gradient-to-br from-blue-100/40 to-indigo-100/40 rounded-full blur-3xl animate-pulse"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        ></div>
        <div
          className="absolute bottom-1/4 -left-32 w-64 h-64 bg-gradient-to-br from-slate-100/40 to-blue-100/40 rounded-full blur-3xl animate-pulse"
          style={{ transform: `translateY(${scrollY * -0.2}px)` }}
        ></div>

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-200/60 rounded-full animate-bounce"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i * 0.5}s`,
              transform: `translateY(${scrollY * (0.1 + i * 0.05)}px)`,
            }}
          ></div>
        ))}

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(51 65 85) 1px, transparent 0)`,
            backgroundSize: "50px 50px",
            transform: `translateY(${scrollY * 0.1}px)`,
          }}
        ></div>
      </div>

      {/* Header */}
      <header
        id="header"
        className={`relative z-10 px-8 py-8 flex justify-between items-center transition-all duration-1000 ${
          isVisible.header
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-10"
        }`}
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
      >
        <div className="group">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight group-hover:scale-105 transition-transform duration-300">
            AttendEz
            <Sparkles className="inline-block ml-2 w-6 h-6 text-blue-500 animate-pulse" />
          </h1>
          <p className="text-sm mt-1 text-slate-600 font-medium">
            Fast, Transparent and Secure.
          </p>
        </div>
        <div className="hidden md:flex items-center gap-2 text-slate-500 text-sm relative">
          {status === "loading" && (
            <>
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              <span className="ml-2">Checking...</span>
            </>
          )}
          {status === "online" && (
            <>
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-ping"></div>
              <div className="w-2 h-2 bg-emerald-400 rounded-full absolute animate-pulse"></div>
              <span className="ml-2">System Online</span>
            </>
          )}
          {status === "offline" && (
            <>
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
              <span className="ml-2">System Offline</span>
            </>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col lg:flex-row items-center justify-between px-8 py-16 gap-16 max-w-7xl mx-auto w-full">
        {/* Left Section */}
        <div
          id="hero-content"
          className={`flex-1 max-w-2xl space-y-10 transition-all duration-1000 delay-300 ${
            isVisible["hero-content"]
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-20"
          }`}
        >
          <div className="space-y-6">
            <h2 className="text-4xl lg:text-6xl font-bold leading-tight text-slate-900 tracking-tight">
              <span className="inline-block hover:scale-105 transition-transform duration-300">
                Welcome
              </span>{" "}
              <span className="inline-block hover:scale-105 transition-transform duration-300 delay-100">
                to
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 animate-gradient-x hover:scale-105 transition-transform duration-300 delay-200">
                AttendEz
              </span>
            </h2>
            <p
              className="text-xl text-slate-600 leading-relaxed max-w-lg opacity-0 animate-fade-in-up"
              style={{ animationDelay: "0.8s", animationFillMode: "forwards" }}
            >
              An attendance management system designed by students, for
              students. Streamline your educational workflows with our intuitive
              platform.
            </p>
          </div>

          {/* Features */}
          <div
            id="features"
            className={`space-y-4 transition-all duration-1000 delay-500 ${
              isVisible.features
                ? "opacity-100 translate-y-0"
                : "opacity-30 translate-y-10"
            }`}
          >
            {[
              "Real-time attendance tracking",
              "On duty approval system",
              "Collaborative platform for all users",
              "Faster attendance using time-synced QR codes or one-time passcodes",
            ].map((feature, index) => (
              <div
                key={index}
                className={`flex items-center gap-4 text-slate-700 opacity-0 animate-fade-in-up hover:translate-x-2 transition-all duration-300`}
                style={{
                  animationDelay: `${1.2 + index * 0.2}s`,
                  animationFillMode: "forwards",
                }}
              >
                <div className="flex-shrink-0 w-5 h-5 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-full flex items-center justify-center shadow-lg hover:shadow-emerald-200/50 hover:scale-110 transition-all duration-300">
                  <CheckCircle size={14} className="text-emerald-600" />
                </div>
                <span className="text-lg">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div
          id="role-selector"
          className={`flex-shrink-0 transition-all duration-1000 delay-700 ${
            isVisible["role-selector"]
              ? "opacity-100 translate-x-0 scale-100"
              : "opacity-0 translate-x-20 scale-95"
          }`}
        >
          <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl shadow-slate-200/50 hover:shadow-3xl hover:shadow-slate-200/60 transition-all duration-500 hover:scale-[1.02]">
            <h3 className="text-2xl font-semibold mb-8 text-center text-slate-900 relative">
              Choose Your Role
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
            </h3>

            <div className="space-y-4 w-80">
              {[
                {
                  role: "Super Admin",
                  icon: ShieldCheck,
                  href: "/superadmin",
                  gradient: "from-red-100 to-red-200",
                  iconColor: "text-red-600",
                  delay: "0.2s",
                },
                {
                  role: "Faculty",
                  icon: Users,
                  href: "/faculty",
                  gradient: "from-blue-100 to-blue-200",
                  iconColor: "text-blue-600",
                  delay: "0.4s",
                },
                {
                  role: "Student",
                  icon: GraduationCap,
                  href: "/student",
                  gradient: "from-emerald-100 to-emerald-200",
                  iconColor: "text-emerald-600",
                  delay: "0.6s",
                },
              ].map((item, index) => (
                <Button
                  key={index}
                  className={`w-full text-lg flex gap-4 items-center justify-between bg-white/80 hover:bg-white text-slate-800 border-0 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-200/60 rounded-2xl py-7 transition-all duration-500 hover:scale-[1.03] backdrop-blur-sm group opacity-0 animate-fade-in-up hover:-translate-y-1`}
                  style={{
                    animationDelay: item.delay,
                    animationFillMode: "forwards",
                  }}
                  onClick={() => (window.location.href = item.href)}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300`}
                    >
                      <item.icon size={20} className={item.iconColor} />
                    </div>
                    {item.role}
                  </div>
                  <ArrowRight
                    size={18}
                    className="text-slate-400 group-hover:text-slate-600 group-hover:translate-x-2 transition-all duration-300"
                  />
                </Button>
              ))}
            </div>
          </div>
        </div>
      </main>
      <footer
        id="footer"
        className={`relative z-10 bg-white/40 backdrop-blur-sm border-t border-white/20 text-slate-600 px-8 py-6 flex flex-col md:flex-row justify-between items-center transition-all duration-1000 delay-1000 ${
          isVisible.footer
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <p className="text-sm">
          ©️ {new Date().getFullYear()} AttendEz. All rights reserved.
        </p>
        <a
          href="/contact"
          className="hover:text-slate-800 mt-3 md:mt-0 transition-all duration-300 flex items-center gap-2 hover:underline text-sm group hover:scale-105"
        >
          Contact Us
          <Mail
            size={14}
            className="group-hover:translate-x-1 group-hover:scale-110 transition-all duration-300"
          />
        </a>
      </footer>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradient-x {
          0%,
          100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }

        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </div>
  );
}
