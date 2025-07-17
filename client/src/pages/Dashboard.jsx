import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { ArrowRight, Loader2, Zap } from "lucide-react";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import FloatingParticles from "../components/styles/FloatingParticles";

import AnimatedBackgroundElements from "../components/styles/AnimatedBackgroundElements.jsx";

import { scrollToTop } from "../utils/helpers.js";
import { managementLinks } from "../utils/management-links.js";

import { clearAdmin } from "../features/adminSlice.js";

const Dashboard = () => {
  const { admin } = useSelector((state) => state.admin);

  const [loadingLogout, setLoadingLogout] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!admin) {
      window.location.href = "/";
      return;
    }
    scrollToTop();
  }, [admin]);

  const handleLogout = () => {
    setLoadingLogout(true);
    try {
      setTimeout(() => {
        toast.success("Logout successfully!", {
          description: new Date().toUTCString(),
          action: { label: "✖️" },
        });
        dispatch(clearAdmin());
        window.location.href = "/";
      }, 2000);
    } catch (error) {
      toast.error(error.message, {
        description: new Date().toUTCString(),
        action: { label: "✖️" },
      });
    } finally {
      setTimeout(() => {
        setLoadingLogout(false);
      }, 2000);
    }
  };

  return (
    <section className="min-h-screen relative bg-gradient-to-br from-[#0d1224] via-[#1a1a2e] to-[#271c54] py-20 pt-20 pb-8 lg:py-16 lg:pt-28 overflow-hidden">
      <AnimatedBackgroundElements />
      <FloatingParticles />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <DashboardHeader />

        <div
          className={`flex flex-wrap items-center justify-center sm:gap-3 md:gap-5 transform transition-all duration-1000 delay-600 mb-5`}
        >
          {managementLinks.map((link, index) => (
            <Link
              to={link.href}
              key={link.id}
              className="group w-[100%] sm:w-[45%] md:w-[30%] relative block transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Enhanced Glow Effect */}
              <div
                className={`absolute -inset-1 bg-gradient-to-r ${link.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500`}
              />

              {/* Main Card */}
              <div className="relative bg-gradient-to-br from-[#0d1224]/95 to-[#1a1a2e]/95 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6 group-hover:border-pink-500/50 transition-all duration-300 h-full overflow-hidden">
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </div>

                {/* Header */}
                <div className="relative z-10 flex items-center justify-between mb-4">
                  <div
                    className={`p-3 bg-gradient-to-r ${link.gradient}/20 rounded-xl border border-gray-600/30 group-hover:border-pink-500/50 transition-all duration-300 group-hover:scale-110`}
                  >
                    <link.icon className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors duration-300" />
                  </div>
                  {link.count !== null && (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500 bg-gray-800/50 px-3 py-1 rounded-full border border-gray-600/30 group-hover:border-pink-500/30 transition-all duration-300">
                        {link.count}
                      </span>
                      <Zap className="w-4 h-4 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="relative z-10 space-y-3">
                  <h3 className="text-lg font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-pink-400 group-hover:to-violet-400 transition-all duration-300">
                    {link.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {link.description}
                  </p>
                </div>

                {/* Enhanced Arrow */}
                <div className="relative z-10 flex justify-end mt-6">
                  <div className="flex items-center space-x-2 group-hover:space-x-3 transition-all duration-300">
                    <span className="text-sm text-gray-500 group-hover:text-pink-400 transition-colors duration-300 opacity-0 group-hover:opacity-100">
                      Manage
                    </span>
                    <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-pink-400 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </div>

                {/* Enhanced Bottom Accent */}
                <div
                  className={`absolute bottom-0 left-0 h-[3px] bg-gradient-to-r ${link.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full`}
                />

                {/* Side Accent */}
                <div
                  className={`absolute left-0 top-0 w-[3px] h-full bg-gradient-to-b ${link.gradient} transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top rounded-full`}
                />
              </div>
            </Link>
          ))}
        </div>

        <div className="flex items-center justify-center my-5">
          <button
            className="cursor-pointer my-5 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            onClick={handleLogout}
            disabled={loadingLogout}
          >
            {loadingLogout ? (
              <Loader2 className="animate-spin h-5 w-5" />
            ) : (
              "Logout"
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
