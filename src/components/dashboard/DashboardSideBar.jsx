import React from "react";
import { Link, useLocation } from "react-router-dom";

import { managementLinks } from "../../utils/management-links";

const DashboardSideBar = () => {
  const location = useLocation();

  return (
    <>
      <div className="lg:col-span-1">
        <div
          className={`space-y-6 transform transition-all duration-1000 delay-500 translate-y-0 opacity-100`}
        >
          {/* Profile Card */}
          <div className="relative bg-gradient-to-br from-[#0d1224]/90 to-[#1a1a2e]/90 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
            <div className="text-center space-y-4">
              {/* Profile Picture */}
              <div className="relative mx-auto w-24 h-24">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-violet-600 rounded-full blur-lg opacity-30 animate-pulse" />
                <div className="relative w-full h-full bg-gradient-to-r from-pink-500/20 to-violet-600/20 rounded-full border-2 border-pink-500/30 flex items-center justify-center">
                  {/* <FaUser className="w-10 h-10 text-pink-400" /> */}
                  <img src="/profile.png" />
                </div>
              </div>

              {/* Name & Role */}
              <div>
                <h3 className="text-xl font-bold text-white">Nassim MZILI</h3>
                <p className="text-gray-400 text-sm">Full Stack Developer</p>
              </div>
            </div>
          </div>

          {/* Nav Links */}
          <div className="relative bg-gradient-to-br from-[#0d1224]/90 to-[#1a1a2e]/90 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
            <h3 className="text-lg font-bold text-white mb-4">Management</h3>
            <div className="space-y-3">
              {managementLinks?.map((link) => (
                <Link
                  key={link.id}
                  to={link.href}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-800/50 transition-colors duration-200"
                  style={{
                    backgroundColor:
                      location.pathname == link.href && "#192031",
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-2 bg-gradient-to-r ${link.gradient}/20 rounded-lg`}
                    >
                      <link.icon className="w-4 h-4 text-gray-400" />
                    </div>
                    <span className="text-gray-300 text-sm font-medium">
                      {link.title}
                    </span>
                  </div>
                  {link.count && (
                    <span className="text-xs text-gray-500 bg-gray-800/50 px-2 py-1 rounded-full">
                      {link.count}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardSideBar;
