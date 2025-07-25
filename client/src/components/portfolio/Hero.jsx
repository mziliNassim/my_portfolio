import React, { useState, useEffect, useRef } from "react";
import {
  Github,
  Linkedin,
  Download,
  ChevronDown,
  Contact,
  Code,
  Facebook,
  Twitter,
  Rocket,
  Star,
  Eye,
  Instagram,
  Mail,
  Sparkles,
} from "lucide-react";

import FloatingParticles from "../styles/FloatingParticles";
import { TypeAnimation } from "react-type-animation";

const HeroSection = ({ personalData }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isTyping] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);

    // Mouse movement tracking
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    const heroElement = heroRef.current;
    if (heroElement) heroElement.addEventListener("mousemove", handleMouseMove);

    return () => {
      clearInterval(interval);
      if (heroElement) {
        heroElement.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  const socialLinks = [
    {
      icon: Github,
      href: personalData?.github,
      label: "GitHub",
      color: "from-gray-700 to-gray-900",
    },
    {
      icon: Linkedin,
      href: personalData?.linkedIn,
      label: "LinkedIn",
      color: "from-blue-600 to-blue-800",
    },
    {
      icon: Mail,
      href: `mailto:${personalData?.email}`,
      label: "Email",
      color: "from-orange-500 to-orange-700",
    },
    {
      icon: Facebook,
      href: personalData?.facebook,
      label: "Facebook",
      color: "from-blue-500 to-blue-700",
    },
    {
      icon: Twitter,
      href: personalData?.twitter,
      label: "Twitter",
      color: "from-cyan-400 to-cyan-600",
    },
    {
      icon: Instagram,
      href: personalData?.instagram,
      label: "Instagram",
      color: "from-red-400 to-red-600",
    },
  ].filter((link) => link.href);

  const stats = [
    { icon: Code, value: "20+", label: "Projects", color: "text-pink-400" },
    {
      icon: Star,
      value: "40+",
      label: "GitHub Stars",
      color: "text-yellow-400",
    },
    {
      icon: Eye,
      value: "100+",
      label: "Profile Views",
      color: "text-cyan-400",
    },
  ];

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0d1224] via-[#1a1a2e] to-[#271c54] pt-20 pb-8 lg:py-16 lg:pt-28"
    >
      <FloatingParticles />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left Content  */}
          <div
            className={`space-y-10 transform transition-all duration-1000 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-10 opacity-0"
            }`}
          >
            {/* Greeting */}
            <div className="space-y-6">
              <div className="flex items-center justify-center lg:justify-start space-x-4 group">
                <div className="w-16 h-[3px] bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-400 rounded-full group-hover:w-20 transition-all duration-500" />
                <span className="text-gray-300 text-lg font-medium flex items-center space-x-2">
                  <span>Hello, I'm</span>
                  <Sparkles className="w-5 h-5 text-pink-400 animate-pulse" />
                </span>
              </div>

              {/* Name */}
              <h1 className="text-5xl sm:text-6xl font-bold leading-tight text-center lg:text-left">
                <div className="relative">
                  {personalData?.name.split(" ").map((word, index) => (
                    <span
                      key={index}
                      className="inline-block mr-6 animate-fadeInUp hover:scale-105 transition-transform duration-300 cursor-default"
                      style={{ animationDelay: `${index * 0.3}s` }}
                    >
                      {index === 0 ? (
                        <span className="relative">
                          <span className="absolute inset-0 bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent blur-sm">
                            {word}
                          </span>
                          <span className="relative bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent">
                            {word}
                          </span>
                        </span>
                      ) : (
                        <span className="text-white drop-shadow-2xl">
                          {word}
                        </span>
                      )}
                    </span>
                  ))}
                </div>
              </h1>

              {/* TypeAnimation */}
              <div className="flex items-center justify-center lg:justify-start space-x-4 text-2xl sm:text-3xl ">
                <span className="text-gray-300 font-light">I'm a</span>

                <div className="relative overflow-hidden">
                  <div className="relative bg-gradient-to-r from-[#16f2b3] via-cyan-400 to-blue-400 font-bold px-3 rounded-md">
                    <TypeAnimation
                      sequence={personalData?.designation}
                      wrapper="p"
                      cursor
                      repeat={Infinity}
                      className="type-designation"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Stats  */}
            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="group relative text-center transform transition-all duration-500 hover:scale-110"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="absolute -inset-2 bg-gradient-to-r from-pink-500/20 to-violet-600/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative bg-gradient-to-br from-[#0d1224]/80 to-[#1a1a2e]/80 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4 group-hover:border-pink-500/50 transition-all duration-300">
                    <stat.icon
                      className={`w-6 h-6 ${stat.color} mx-auto mb-2`}
                    />
                    <div className={`text-xl font-bold ${stat.color} mb-1`}>
                      {stat.value}
                    </div>
                    <div className="text-gray-400 text-xs font-medium">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center lg:justify-start space-x-4">
              <div className="flex flex-wrap gap-y-3 space-x-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-4 rounded-xl bg-gradient-to-r from-gray-800/50 to-gray-700/50 border border-gray-600/30 hover:border-pink-500/50 transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div
                      className={`absolute inset-0 rounded-xl bg-gradient-to-r ${social.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                    />
                    <social.icon className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors duration-300 relative z-10" />
                  </a>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-6 pt-4">
              <a
                href="#contact"
                className="group relative overflow-hidden bg-gradient-to-r from-pink-500 to-violet-600 p-[2px] rounded-2xl hover:shadow-2xl hover:shadow-pink-500/25 transition-all duration-500 hover:scale-105"
              >
                <div className="bg-[#0d1224] rounded-2xl px-8 py-4 group-hover:bg-transparent transition-all duration-500">
                  <div className="flex items-center justify-center space-x-3 text-white font-bold text-lg">
                    <span>Let's Connect</span>
                    <Contact className="w-6 h-6 group-hover:translate-x-1 group-hover:scale-110 transition-all duration-300" />
                  </div>
                </div>
              </a>
              <a
                href={personalData?.fullResume}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center space-x-3 bg-transparent border-2 border-gray-600/50 hover:border-[#16f2b3] rounded-2xl px-8 py-4 text-gray-300 hover:text-[#16f2b3] font-bold text-lg transition-all duration-500 hover:shadow-lg hover:shadow-[#16f2b3]/25 hover:scale-105 backdrop-blur-sm"
              >
                <span>Download CV</span>
                <Download className="w-6 h-6 group-hover:translate-y-1 group-hover:scale-110 transition-all duration-300" />
              </a>
            </div>
          </div>

          {/* Right Content - IDE */}
          <div
            className={`transform transition-all duration-1000 delay-500 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-10 opacity-0"
            }`}
          >
            <div className="relative group">
              {/* Glow Effect */}
              <div className="absolute -inset-2 bg-gradient-to-r from-pink-500 via-purple-500 to-violet-600 rounded-3xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-700 animate-pulse" />

              <div className="relative bg-gradient-to-br from-[#0d1224]/95 to-[#1a1a2e]/95 rounded-3xl border border-gray-700/50 backdrop-blur-lg overflow-hidden shadow-2xl">
                {/* IDE Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-700/50 bg-gradient-to-r from-gray-800/30 to-gray-700/30">
                  <div className="flex items-center space-x-4">
                    <div className="flex space-x-2">
                      <div className="w-4 h-4 rounded-full bg-gradient-to-r from-red-400 to-red-600 hover:scale-110 transition-transform cursor-pointer shadow-lg" />
                      <div className="w-4 h-4 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:scale-110 transition-transform cursor-pointer shadow-lg" />
                      <div className="w-4 h-4 rounded-full bg-gradient-to-r from-green-400 to-green-600 hover:scale-110 transition-transform cursor-pointer shadow-lg" />
                    </div>
                    <span className="text-gray-300 font-mono font-semibold flex items-center space-x-2">
                      <Code className="w-4 h-4 text-pink-400" />
                      <span>developer-profile.js</span>
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Rocket className="w-5 h-5 text-pink-400 animate-pulse" />
                  </div>
                </div>

                {/* Code Content */}
                <div className="p-8 font-mono text-sm overflow-hidden">
                  <div className="space-y-3">
                    <div className="flex items-center animate-fadeInUp">
                      <span className="text-pink-400 mr-3 font-bold">
                        const
                      </span>
                      <span className="text-white mr-3 font-semibold">
                        developer
                      </span>
                      <span className="text-pink-400 mr-3 font-bold">=</span>
                      <span className="text-gray-400">{"{"}</span>
                    </div>
                    <div className="ml-6 space-y-2">
                      <div
                        className="animate-fadeInUp"
                        style={{ animationDelay: "0.2s" }}
                      >
                        <span className="text-blue-400 font-semibold">
                          name:
                        </span>
                        <span className="text-amber-300 ml-3 font-medium">
                          '{personalData?.name}'
                        </span>
                        <span className="text-gray-400">,</span>
                      </div>
                      <div
                        className="animate-fadeInUp"
                        style={{ animationDelay: "0.4s" }}
                      >
                        <span className="text-blue-400 font-semibold">
                          role:
                        </span>
                        <span className="text-amber-300 ml-3 font-medium">
                          ["{personalData?.designation[0]}", "
                          {personalData?.designation[1]}"]
                        </span>
                        <span className="text-gray-400">,</span>
                      </div>
                      <div
                        className="animate-fadeInUp"
                        style={{ animationDelay: "0.6s" }}
                      >
                        <span className="text-blue-400 font-semibold">
                          skills:
                        </span>
                        <span className="text-gray-400 ml-3">[</span>
                        <div className="ml-6  gap-1 mt-2">
                          {personalData?.skills
                            .slice(0, 8)
                            .map((skill, index) => (
                              <span
                                key={skill}
                                className="animate-fadeInUp hover:text-pink-300 transition-colors duration-300 cursor-default"
                                style={{
                                  animationDelay: `${0.8 + index * 0.1}s`,
                                }}
                              >
                                <span className="text-amber-300 font-medium">
                                  '{skill}'
                                </span>
                                {index < 7 && (
                                  <span className="text-gray-400">, </span>
                                )}
                              </span>
                            ))}
                        </div>
                        <span className="text-gray-400">],</span>
                      </div>
                      {[
                        { key: "passionate", value: "true", delay: "1.8s" },
                        { key: "creative", value: "true", delay: "2.0s" },
                        { key: "teamPlayer", value: "true", delay: "2.2s" },
                      ].map((trait) => (
                        <div
                          key={trait.key}
                          className="animate-fadeInUp hover:scale-105 transition-transform duration-300 cursor-default"
                          style={{ animationDelay: trait.delay }}
                        >
                          <span className="text-blue-400 font-semibold">
                            {trait.key}:
                          </span>
                          <span className="text-orange-400 ml-3 font-bold">
                            {trait.value}
                          </span>
                          <span className="text-gray-400">,</span>
                        </div>
                      ))}
                      <div
                        className="animate-fadeInUp"
                        style={{ animationDelay: "2.4s" }}
                      >
                        <span className="text-green-400 font-semibold">
                          available:
                        </span>
                        <span className="text-orange-400 ml-3 font-bold">
                          function
                        </span>
                        <span className="text-gray-400">() {"{"}</span>
                        <div className="ml-6 mt-2 space-y-1">
                          <div>
                            <span className="text-orange-400 font-bold">
                              return
                            </span>
                            <span className="text-cyan-400 ml-3 font-semibold">
                              this
                            </span>
                            <span className="text-white">.passionate</span>
                            <span className="text-pink-400 mx-2 font-bold">
                              &&
                            </span>
                          </div>
                          <div className="ml-12">
                            <span className="text-cyan-400 font-semibold">
                              this
                            </span>
                            <span className="text-white">.skills.length</span>
                            <span className="text-pink-400 mx-2 font-bold">
                              &gt;
                            </span>
                            <span className="text-orange-400 font-bold">0</span>
                            <span className="text-gray-400">;</span>
                          </div>
                        </div>
                        <span className="text-gray-400">{"}"}</span>
                      </div>
                    </div>
                    <div
                      className="animate-fadeInUp"
                      style={{ animationDelay: "2.6s" }}
                    >
                      <span className="text-gray-400">{"};"}</span>
                      <span className="animate-blink text-pink-400 ml-2 text-lg font-bold">
                        ▋
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center space-y-2 text-gray-400 hover:text-pink-400 transition-colors duration-300 cursor-pointer">
            <span className="text-sm font-medium">Scroll Down</span>
            <ChevronDown className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Styles */}
      <style>{`
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
        @keyframes blink {
          0%,
          50% {
            opacity: 1;
          }
          51%,
          100% {
            opacity: 0;
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
        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out forwards;
          opacity: 0;
        }
        .animate-blink {
          animation: blink 1.2s infinite;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
