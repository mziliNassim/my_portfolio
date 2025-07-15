import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  FaProjectDiagram,
  FaBriefcase,
  FaEye,
  FaArrowRight,
  FaGraduationCap,
} from "react-icons/fa";

import DashboardHeader from "../components/dashboard/DashboardHeader";

import FloatingParticles from "../components/styles/FloatingParticles";
import AnimatedBackgroundElements from "../components/styles/AnimatedBackgroundElements.jsx";

import { managementLinks } from "../utils/management-links.js";
import { scrollToTop } from "../utils/helpers.js";

const Dashboard = () => {
  const { admin } = useSelector((state) => state.admin);

  const [isVisible, setIsVisible] = useState(false);
  const [stats, setStats] = useState({
    totalProjects: 12,
    totalExperiences: 8,
    totalEducations: 4,
    totalVisitors: 1247,
  });

  useEffect(() => {
    scrollToTop();
    setIsVisible(true);
    if (!admin) window.location.href = "/admin/auth";
  }, []);

  return (
    <section className="min-h-screen relative bg-gradient-to-br from-[#0d1224] via-[#1a1a2e] to-[#271c54] py-20  pt-20 pb-8 lg:py-16 lg:pt-28 overflow-hidden">
      {/* Styling components */}
      <AnimatedBackgroundElements />
      <FloatingParticles />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <DashboardHeader isVisible={isVisible} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Management Cards */}
          <div className="lg:col-span-4">
            {/* Stats Cards */}
            <div
              className={`grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 transform transition-all duration-1000 delay-200 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <div className="group relative bg-gradient-to-br from-[#0d1224]/90 to-[#1a1a2e]/90 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4 sm:p-6 hover:border-pink-500/50 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-xs sm:text-sm">Projects</p>
                    <p className="text-xl sm:text-2xl font-bold text-white">
                      {stats.totalProjects}
                    </p>
                  </div>
                  <FaProjectDiagram className="w-6 h-6 sm:w-8 sm:h-8 text-[#16f2b3]" />
                </div>
              </div>

              <div className="group relative bg-gradient-to-br from-[#0d1224]/90 to-[#1a1a2e]/90 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4 sm:p-6 hover:border-violet-500/50 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-xs sm:text-sm">
                      Experiences
                    </p>
                    <p className="text-xl sm:text-2xl font-bold text-white">
                      {stats.totalExperiences}
                    </p>
                  </div>
                  <FaBriefcase className="w-6 h-6 sm:w-8 sm:h-8 text-violet-400" />
                </div>
              </div>

              <div className="group relative bg-gradient-to-br from-[#0d1224]/90 to-[#1a1a2e]/90 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4 sm:p-6 hover:border-green-500/50 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-xs sm:text-sm">
                      Education
                    </p>
                    <p className="text-xl sm:text-2xl font-bold text-white">
                      {stats.totalEducations}
                    </p>
                  </div>
                  <FaGraduationCap className="w-6 h-6 sm:w-8 sm:h-8 text-green-400" />
                </div>
              </div>

              <div className="group relative bg-gradient-to-br from-[#0d1224]/90 to-[#1a1a2e]/90 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4 sm:p-6 hover:border-blue-500/50 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-xs sm:text-sm">Visitors</p>
                    <p className="text-xl sm:text-2xl font-bold text-white">
                      {stats.totalVisitors}
                    </p>
                  </div>
                  <FaEye className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
                </div>
              </div>
            </div>

            {/* Management Links Grid */}
            <div
              className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8 transform transition-all duration-1000 delay-300 overflow-hidden ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              {managementLinks.map((link, index) => (
                <Link
                  key={link.id}
                  to={link.href}
                  className="group relative block transform transition-all duration-500 hover:scale-105 hover:-translate-y-2"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Glow Effect */}
                  <div
                    className={`absolute -inset-1 bg-gradient-to-r ${link.gradient} rounded-xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
                  />

                  {/* Card */}
                  <div className="relative bg-gradient-to-br from-[#0d1224]/90 to-[#1a1a2e]/90 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 group-hover:border-pink-500/50 transition-all duration-300 h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`p-3 bg-gradient-to-r ${link.gradient}/20 rounded-lg border border-gray-600/30 group-hover:border-pink-500/50 transition-all duration-300`}
                      >
                        <link.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
                      </div>
                      {link.count !== null && (
                        <span className="text-sm text-gray-500 bg-gray-800/50 px-2 py-1 rounded-full">
                          {link.count}
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-white group-hover:text-pink-300 transition-colors duration-300">
                        {link.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {link.description}
                      </p>
                    </div>

                    {/* Arrow */}
                    <div className="flex justify-end mt-4">
                      <FaArrowRight className="w-4 h-4 text-gray-500 group-hover:text-pink-400 group-hover:translate-x-1 transition-all duration-300" />
                    </div>

                    {/* Bottom Accent */}
                    <div
                      className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r ${link.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full`}
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
