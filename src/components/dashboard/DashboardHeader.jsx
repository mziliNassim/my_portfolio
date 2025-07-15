import React from "react";

import { FaCog } from "react-icons/fa";

const DashboardHeader = () => {
  return (
    <div
      className={`text-center mb-12 transform transition-all duration-1000 translate-y-0 opacity-100 `}
    >
      <div className="flex justify-center mb-6">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-violet-600 rounded-full blur-xl opacity-30 animate-pulse" />
          <div className="relative p-6 bg-gradient-to-r from-pink-500/20 to-violet-600/20 rounded-full border border-pink-500/30">
            <FaCog
              className="w-8 h-8 text-pink-400 animate-spin"
              style={{ animationDuration: "3s" }}
            />
          </div>
        </div>
      </div>

      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-4">
        <span className="bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent">
          Admin
        </span>{" "}
        <span className="text-white">Dashboard</span>
      </h1>
    </div>
  );
};

export default DashboardHeader;
