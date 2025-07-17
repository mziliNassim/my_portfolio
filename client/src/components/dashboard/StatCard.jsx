import React from "react";

import { TrendingUp } from "lucide-react";

const StatCard = ({ title, value, icon: Icon, color, growth, delay }) => {
  return (
    <div
      className={`group relative bg-gradient-to-br from-[#0d1224]/95 to-[#1a1a2e]/95 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6 hover:border-${color}-500/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Animated Background Glow */}
      <div
        className={`absolute -inset-1 bg-gradient-to-r from-${color}-500/20 to-${color}-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div
            className={`p-3 bg-gradient-to-r from-${color}-500/20 to-${color}-600/20 rounded-xl border border-${color}-500/30 group-hover:border-${color}-400/60 transition-all duration-300`}
          >
            <Icon
              className={`w-6 h-6 text-${color}-400 group-hover:text-${color}-300 transition-colors duration-300`}
            />
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-gray-400 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-pink-400 group-hover:to-violet-400 transition-all duration-300">
            {value.toLocaleString()}
          </p>
        </div>

        {/* Animated Border */}
        <div
          className={`absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-${color}-500 to-${color}-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full`}
        />
      </div>
    </div>
  );
};

export default StatCard;
