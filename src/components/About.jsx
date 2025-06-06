import React, { useState, useEffect, useRef } from "react";

import { personalData } from "../utils/data/personal-data";

import {
  ChevronRight,
  Quote,
  Sparkles,
  User,
  Code,
  Coffee,
  Heart,
} from "lucide-react";

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    { label: "Experience", value: personalData?.experience, icon: Code },
    { label: "Projects", value: personalData?.projects, icon: Sparkles },
    { label: "Happy Clients", value: personalData?.clients, icon: Heart },
  ];

  const tabs = [
    { id: "overview", label: "Overview", icon: User },
    { id: "skills", label: "Skills", icon: Code },
    { id: "interests", label: "Interests", icon: Coffee },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-[#0d1224] via-[#1a1a2e] to-[#271c54]"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-500/3 to-purple-500/3 rounded-full blur-3xl" />
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Side Label */}
      <div className="hidden lg:flex flex-col items-center absolute top-20 -right-8 z-10">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000" />
          <div className="relative bg-[#1a1443] text-white rotate-90 p-3 px-6 text-lg font-bold rounded-lg border border-purple-500/30">
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>ABOUT ME</span>
            </div>
          </div>
        </div>
        <div className="w-[2px] h-40 bg-gradient-to-b from-[#1a1443] via-purple-500/50 to-transparent mt-4" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-[2px] bg-gradient-to-r from-transparent to-[#16f2b3] rounded-full" />
            <span className="mx-4 text-[#16f2b3] font-bold text-lg uppercase tracking-wider">
              Discover
            </span>
            <div className="w-12 h-[2px] bg-gradient-to-r from-[#16f2b3] to-transparent rounded-full" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            About{" "}
            <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Me
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div
            className={`order-2 lg:order-1 transform transition-all duration-1000 delay-300 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-10 opacity-0"
            }`}
          >
            {/* Question Header */}
            <div className="flex items-center mb-8">
              <Quote className="w-8 h-8 text-[#16f2b3] mr-3" />
              <h3 className="text-2xl font-bold text-[#16f2b3] uppercase tracking-wide">
                Who I Am?
              </h3>
            </div>

            {/* Description */}
            <div className="relative">
              <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-[#16f2b3] to-purple-500 rounded-full" />
              <p className="text-gray-300 text-base lg:text-lg leading-relaxed mb-8 pl-8">
                <span className="text-white font-semibold">
                  {personalData.name}
                </span>{" "}
                - {personalData.description}
              </p>
            </div>

            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-2 mb-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex cursor-pointer items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-[#16f2b3] to-cyan-400 text-black"
                      : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="min-h-[120px]">
              {activeTab === "overview" && (
                <div className="animate-fadeIn">
                  <div className="grid grid-cols-3 gap-4">
                    {stats.map((stat, index) => (
                      <div
                        key={stat.label}
                        className="text-center p-4 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 hover:border-[#16f2b3]/30 transition-all duration-300 group"
                      >
                        <stat.icon className="w-6 h-6 text-[#16f2b3] mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
                        <div className="text-white font-bold text-lg">
                          {stat.value}
                        </div>
                        <div className="text-gray-400 text-xs">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "skills" && (
                <div className="animate-fadeIn">
                  <div className="flex flex-wrap gap-2">
                    {personalData.skills.map((skill, index) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-full text-purple-300 text-sm hover:border-purple-400/50 transition-all duration-300 animate-fadeInUp"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "interests" && (
                <div className="animate-fadeIn">
                  <div className="space-y-2">
                    {personalData.interests.map((interest, index) => (
                      <div
                        key={interest}
                        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800/30 transition-all duration-300 animate-fadeInUp"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <ChevronRight className="w-4 h-4 text-[#16f2b3]" />
                        <span className="text-gray-300">{interest}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Content - Profile Image */}
          <div
            className={`order-1 lg:order-2 flex justify-center transform transition-all duration-1000 delay-500 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-10 opacity-0"
            }`}
          >
            <div className="relative group">
              {/* Animated Border */}
              <div className="absolute -inset-4 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-2xl blur-lg opacity-30 group-hover:opacity-60 transition-all duration-700 animate-pulse" />

              {/* Image Container */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-2xl" />
                <div className="relative overflow-hidden rounded-2xl border-2 border-gray-700/50 group-hover:border-[#16f2b3]/50 transition-all duration-500">
                  {/* Loading Skeleton */}
                  {!imageLoaded && (
                    <div className="w-80 h-80 bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse rounded-2xl flex items-center justify-center">
                      <User className="w-20 h-20 text-gray-600" />
                    </div>
                  )}

                  <img
                    src={personalData?.profile}
                    width={320}
                    height={320}
                    alt={personalData.name}
                    onLoad={() => setImageLoaded(true)}
                    className={`w-80 h-80 object-cover transition-all duration-700 cursor-pointer ${
                      imageLoaded
                        ? "opacity-100 hover:grayscale hover:scale-105"
                        : "opacity-0 grayscale hover:grayscale-0 hover:scale-105"
                    }`}
                  />

                  {/* Overlay Effects */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  <div className="absolute bottom-4 left-4 right-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <div className="bg-black/80 backdrop-blur-sm rounded-lg p-3">
                      <p className="text-white font-semibold text-sm">
                        {personalData.name}
                      </p>
                      <p className="text-[#16f2b3] text-xs">
                        Full Stack Developer
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full animate-bounce" />
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full animate-bounce delay-1000" />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

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

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
};

export default AboutSection;
