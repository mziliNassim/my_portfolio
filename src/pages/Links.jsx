import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import { personalData } from "../utils/data/personal-data";

import { links } from "../utils/data/links";

import {
  FaExternalLinkAlt,
  FaEnvelope,
  FaUser,
  FaStar,
  FaRocket,
  FaCode,
  FaHeart,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";

const AllLinks = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeLink, setActiveLink] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
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

    // Mouse movement tracking
    const handleMouseMove = (e) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    const sectionElement = sectionRef.current;
    if (sectionElement) {
      sectionElement.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      observer.disconnect();
      if (sectionElement) {
        sectionElement.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  return (
    <section
      id="Links"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0d1224] via-[#1a1a2e] to-[#271c54]"
    >
      {/* Enhanced Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 3}s`,
            }}
          >
            {i % 4 === 0 ? (
              <HiSparkles className="w-2 h-2 text-pink-400/40" />
            ) : (
              <div className="w-1 h-1 bg-white/20 rounded-full" />
            )}
          </div>
        ))}
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div
          className="absolute top-1/3 left-1/3 w-96 h-96 bg-gradient-to-r from-violet-500/5 to-cyan-500/5 rounded-full blur-3xl animate-spin"
          style={{ animationDuration: "25s" }}
        />
      </div>

      <div className="relative z-10 w-full min-h-screen pb-28">
        {/* Enhanced Hero Section */}
        <div className="relative w-full overflow-hidden">
          {/* Hero Background with Gradient Overlay */}
          <div className="relative h-[40vh] md:h-[50vh]">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-violet-600/20 to-cyan-500/20 backdrop-blur-sm" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d1224] via-transparent to-transparent" />

            {/* Floating Icons */}
            <div className="absolute inset-0">
              {[FaCode, FaRocket, FaStar, FaHeart].map((Icon, index) => (
                <Icon
                  key={index}
                  className="absolute text-white/10 animate-float"
                  style={{
                    left: `${20 + index * 20}%`,
                    top: `${20 + index * 15}%`,
                    fontSize: `${2 + Math.random() * 2}rem`,
                    animationDelay: `${index * 0.5}s`,
                    animationDuration: `${4 + Math.random() * 2}s`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Enhanced Profile Image */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 lg:left-32 xl:left-48 lg:translate-x-0 pt-20 pb-8 lg:py-16 lg:pt-28">
            <div className="relative group">
              {/* Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-500 rounded-full blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-700 animate-pulse" />

              {/* Profile Ring */}
              <div className="relative p-2 bg-gradient-to-r from-pink-500 via-violet-600 to-cyan-500 rounded-full">
                <div className="p-2 bg-[#0d1224] rounded-full">
                  <img
                    src={personalData.profile}
                    alt="MZILI Nassim"
                    className="w-[150px] h-[150px] sm:w-[150px] sm:h-[150px] md:w-[170px] md:h-[170px] lg:w-[220px] lg:h-[220px] xl:w-[250px] xl:h-[250px] rounded-full object-cover shadow-2xl transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Status Indicator */}
              <div className="absolute bottom-4 right-4 w-8 h-8 bg-gradient-to-r from-green-400 to-green-600 rounded-full border-4 border-[#0d1224] animate-pulse">
                <div className="w-full h-full bg-green-500 rounded-full animate-ping" />
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Content Grid */}
        <div className="grid w-full max-w-7xl grid-cols-1 mx-auto -mt-20 min-h-[70vh] gap-8 lg:grid-cols-2 px-4 sm:px-6 lg:px-8">
          {/* Left Panel - Enhanced Profile Info */}
          <div
            className={`w-full mt-7 lg:mt-20 transform transition-all duration-1000 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-10 opacity-0"
            }`}
          >
            <div className="relative group">
              {/* Card Background with Glow */}
              <div className="absolute -inset-2 bg-gradient-to-r from-pink-500/20 via-violet-500/20 to-cyan-500/20 rounded-3xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

              <div className="relative bg-gradient-to-br from-[#0d1224]/90 to-[#1a1a2e]/90 backdrop-blur-sm rounded-3xl border border-gray-700/50 p-8 lg:p-10">
                {/* Name with Enhanced Typography */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-4 group">
                    <div className="w-12 h-[3px] bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-400 rounded-full group-hover:w-16 transition-all duration-500" />
                    <FaUser className="w-6 h-6 text-pink-400 animate-pulse" />
                  </div>

                  <h2 className="text-center lg:text-left">
                    <span className="block text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                      <span className="relative">
                        <span className="absolute inset-0 bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent blur-sm">
                          MZILI
                        </span>
                        <span className="relative bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent">
                          MZILI
                        </span>
                      </span>
                      <span className="text-white drop-shadow-2xl ml-4">
                        Nassim
                      </span>
                    </span>
                  </h2>

                  {/* Enhanced Role Typography */}
                  <div className="text-center lg:text-left">
                    <div className="inline-flex items-center space-x-3 text-xl md:text-2xl lg:text-3xl">
                      <span className="text-gray-300 font-light">I'm a</span>
                      <div className="relative bg-gradient-to-r from-[#16f2b3] via-cyan-400 to-blue-400 font-bold px-4 py-2 rounded-lg">
                        {/* <HeroTypeWritter
                          words={["Full-Stack Web Developer..."]}
                          speed={100}
                        /> */}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Description */}
                <div className="mt-8 space-y-6">
                  <p className="text-gray-300 text-lg leading-relaxed">
                    Développeur Web Full-Stack en devenir et étudiant motivé,
                    passionné par la création d'applications web simples et
                    efficaces. J'apprends activement les technologies front-end
                    et back-end pour concevoir des solutions modernes et
                    innovantes.
                  </p>

                  {/* Enhanced Contact Button */}
                  {/* <Link
                    to="/#contact"
                    className="group relative overflow-hidden bg-gradient-to-r from-pink-500 to-violet-600 p-[2px] rounded-2xl hover:shadow-2xl hover:shadow-pink-500/25 transition-all duration-500 hover:scale-105 inline-flex"
                  >
                    <div className="bg-[#0d1224] rounded-2xl px-8 py-4 group-hover:bg-transparent transition-all duration-500">
                      <div className="flex items-center justify-center space-x-3 text-white font-bold text-lg">
                        <FaEnvelope className="w-5 h-5" />
                        <span>Contacter</span>
                        <FaExternalLinkAlt className="w-4 h-4 group-hover:translate-x-1 group-hover:scale-110 transition-all duration-300" />
                      </div>
                    </div>
                  </Link> */}
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Enhanced Links */}
          <div
            className={`w-full transform transition-all duration-1000 delay-300 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-10 opacity-0"
            }`}
          >
            <div className="space-y-6 p-4 lg:p-8">
              {/* Section Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  Connect With{" "}
                  <span className="bg-gradient-to-r from-[#16f2b3] to-cyan-400 bg-clip-text text-transparent">
                    Me
                  </span>
                </h3>
                <p className="text-gray-400">Find me on these platforms</p>
              </div>

              {/* Enhanced Links Grid */}
              <div className="space-y-4">
                {links?.map((link, index) => (
                  <Link
                    key={link.id}
                    to={link.url}
                    target="_blank"
                    className="group relative block transform transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onMouseEnter={() => setActiveLink(link.id)}
                    onMouseLeave={() => setActiveLink(null)}
                  >
                    {/* Glow Effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-pink-500/20 via-violet-500/20 to-cyan-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Link Card */}
                    <div className="relative bg-gradient-to-br from-[#0d1224]/80 to-[#1a1a2e]/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 group-hover:border-pink-500/50 transition-all duration-300 overflow-hidden">
                      {/* Background Pattern */}
                      <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                        <div className="w-full h-full bg-gradient-to-br from-pink-500 to-violet-600 rounded-full blur-2xl" />
                      </div>

                      <div className="relative flex items-center gap-6">
                        {/* Enhanced Icon */}
                        <div className="relative">
                          <div
                            className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg"
                            style={{ background: link.color }}
                          >
                            <link.Icon className="text-white text-2xl md:text-3xl" />
                          </div>

                          {/* Pulse Effect */}
                          <div
                            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 animate-ping"
                            style={{ background: link.color }}
                          />
                        </div>

                        {/* Enhanced Content */}
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="text-xl md:text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-pink-400 group-hover:to-violet-400 group-hover:bg-clip-text transition-all duration-300">
                              {link.title}
                            </h4>
                            <FaExternalLinkAlt className="w-5 h-5 text-gray-400 group-hover:text-pink-400 group-hover:translate-x-1 group-hover:scale-110 transition-all duration-300" />
                          </div>

                          <p className="text-blue-400 text-lg md:text-xl group-hover:text-cyan-300 transition-colors duration-300">
                            {link.desc}
                          </p>

                          {/* Interactive Indicator */}
                          <div className="w-0 h-[2px] bg-gradient-to-r from-pink-500 to-violet-600 group-hover:w-full transition-all duration-500 rounded-full" />
                        </div>
                      </div>

                      {/* Hover Animation Line */}
                      <div className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-pink-500 via-violet-600 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full" />
                    </div>
                  </Link>
                ))}
              </div>

              {/* Bottom Decoration */}
              <div className="text-center mt-12">
                <div className="inline-flex items-center space-x-4 px-6 py-3 bg-gradient-to-r from-pink-500/10 to-violet-600/10 rounded-full border border-pink-500/20">
                  <HiSparkles className="w-6 h-6 text-pink-400 animate-pulse" />
                  <span className="text-gray-300 font-medium">
                    Let's build something amazing together
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        @keyframes glow {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(236, 72, 153, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(236, 72, 153, 0.6);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out forwards;
          opacity: 0;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default AllLinks;
