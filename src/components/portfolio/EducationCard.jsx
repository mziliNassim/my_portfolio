import React, { useState } from "react";
import {
  FaGraduationCap,
  FaUniversity,
  FaCalendarAlt,
  FaMedal,
  FaBook,
  FaStar,
  FaAward,
  FaCertificate,
} from "react-icons/fa";

const EducationCard = ({ education, index, isVisible }) => {
  const [hovered, setHovered] = useState(false);

  const getIcon = (type) => {
    switch (type) {
      case "Master's Degree":
        return FaGraduationCap;
      case "Bachelor's Degree":
        return FaUniversity;
      case "Certification":
        return FaCertificate;
      case "Professional Certification":
        return FaAward;
      default:
        return FaBook;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "from-green-500 to-emerald-500";
      case "Certified":
        return "from-blue-500 to-cyan-500";
      case "Progress":
        return "from-yellow-500 to-orange-500";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const IconComponent = getIcon(education.type);
  return (
    <div
      className={`group relative transform transition-all duration-1000 h-full ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}
      style={{ transitionDelay: `${index * 0.2}s` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />

      {/* Card Content */}
      <div className="relative h-full flex flex-col bg-gradient-to-br from-[#0d1224]/90 to-[#1a1a2e]/90 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden group-hover:border-pink-500/50 transition-all duration-500">
        {/* Card Header (unchanged) */}
        <div className="p-6 border-b border-gray-700/30">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-gradient-to-r from-pink-500/20 to-violet-600/20 rounded-xl border border-pink-500/30 group-hover:scale-110 transition-transform duration-300">
                <IconComponent className="w-8 h-8 text-pink-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-pink-300 transition-colors duration-300">
                  {education.title}
                </h3>
                <p className="text-gray-400 flex items-center space-x-2">
                  <FaUniversity className="w-4 h-4" />
                  <span>{education.institution}</span>
                </p>
              </div>
            </div>

            {/* Status Badge */}
            <div className="text-right">
              <div
                className={`inline-flex items-center space-x-2 bg-gradient-to-r ${getStatusColor(
                  education.status
                )}/20 px-3 py-1 rounded-full border border-current/30`}
              >
                <FaMedal className="w-3 h-3" />
                <span className="text-sm font-medium">{education.status}</span>
              </div>
            </div>
          </div>

          {/* Duration and city */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 bg-gradient-to-r from-[#16f2b3]/20 to-cyan-400/20 px-3 py-1 rounded-full border border-[#16f2b3]/30">
              <FaCalendarAlt className="w-3 h-3 text-[#16f2b3]" />
              <span className="text-[#16f2b3] text-sm font-medium">
                {education.duration}
              </span>
            </div>
            {education.city && (
              <div className="flex items-center space-x-2 bg-gradient-to-r from-violet-500/20 to-purple-500/20 px-3 py-1 rounded-full border border-violet-500/30">
                <FaStar className="w-3 h-3 text-violet-400" />
                <span className="text-violet-400 text-sm font-medium">
                  {education.city}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col flex-grow">
          {/* Scrollable Content */}
          <div className="p-6 space-y-4 overflow-y-auto custom-scrollbar flex-grow">
            {/* Description */}
            <p className="text-gray-300 leading-relaxed">
              {education.description}
            </p>

            {/* Achievements */}
            {education.achievements && education.achievements.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-white font-semibold flex items-center space-x-2">
                  <FaAward className="w-4 h-4 text-yellow-400" />
                  <span>Key Achievements</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {education.achievements.map((achievement, achIndex) => (
                    <div
                      key={achievement}
                      className="flex items-center space-x-2 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg px-3 py-2 border border-gray-600/30 hover:border-yellow-500/50 transition-all duration-300"
                      style={{ animationDelay: `${achIndex * 0.1}s` }}
                    >
                      <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full" />
                      <span className="text-gray-300 text-sm">
                        {achievement}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Education Type - Now fixed at bottom */}
          <div className="p-6 border-t border-gray-700/30 mt-auto">
            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center space-x-2">
                <FaBook className="w-4 h-4 text-cyan-400" />
                <span className="text-cyan-400 text-sm font-medium">
                  {education.type}
                </span>
              </div>

              {/* Progress Indicator */}
              <div className="flex items-center space-x-2">
                <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-pink-500 to-violet-600 rounded-full w-[90%] transition-all duration-1000" />
                </div>
                <span className="text-xs text-gray-400">90%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hover Animation Line */}
        <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-pink-500 to-violet-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #4f46e5;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #6366f1;
        }
      `}</style>
    </div>
  );
};

export default EducationCard;
