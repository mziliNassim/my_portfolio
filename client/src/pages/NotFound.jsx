import React, { useState, useEffect } from "react";
import { Home, Download, Link, Rocket, Code, ArrowLeft } from "lucide-react";
import { AlertTriangle, Star, Sparkles } from "lucide-react";

const NotFound = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [glitchText, setGlitchText] = useState("404");

  useEffect(() => {
    setIsVisible(true);

    // Glitch effect for 404 text
    const glitchChars = ["4", "0", "4", "Ⴀ", "𝟜", "𝟎", "𝟜", "４", "０", "４"];
    let glitchInterval;

    const startGlitch = () => {
      glitchInterval = setInterval(() => {
        const randomText = Array(3)
          .fill()
          .map(
            () => glitchChars[Math.floor(Math.random() * glitchChars.length)]
          )
          .join("");
        setGlitchText(randomText);

        setTimeout(() => setGlitchText("404"), 150);
      }, 2000);
    };

    const timeout = setTimeout(startGlitch, 1000);

    return () => {
      clearTimeout(timeout);
      clearInterval(glitchInterval);
    };
  }, []);

  const navigationLinks = [
    {
      title: "Portfolio",
      description: "View my work & projects",
      href: "/",
      icon: Home,
      gradient: "from-pink-500 to-violet-600",
      glowColor: "pink-500/30",
    },
    {
      title: "Download CV",
      description: "Get my resume & credentials",
      href: "/cv",
      icon: Download,
      gradient: "from-[#16f2b3] to-cyan-400",
      glowColor: "[#16f2b3]/30",
    },
    {
      title: "All Links",
      description: "Connect with me everywhere",
      href: "/links",
      icon: Link,
      gradient: "from-violet-500 to-purple-600",
      glowColor: "violet-500/30",
    },
  ];

  return (
    <section className="min-h-screen relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0d1224] via-[#1a1a2e] to-[#271c54]">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div
          className="absolute top-1/3 left-1/3 w-96 h-96 bg-gradient-to-r from-violet-500/5 to-cyan-500/5 rounded-full blur-3xl animate-spin"
          style={{ animationDuration: "30s" }}
        />
      </div>

      {/* Floating Particles */}
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
              <Sparkles className="w-2 h-2 text-pink-400/40" />
            ) : i % 4 === 1 ? (
              <Star className="w-1 h-1 text-violet-400/40" />
            ) : (
              <div className="w-1 h-1 bg-cyan-400/30 rounded-full" />
            )}
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center space-y-12">
          {/* 404 Header with Glitch Effect */}
          <div
            className={`space-y-8 transform transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            {/* Warning Icon */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-full blur-xl opacity-30 animate-pulse" />
                <div className="relative p-6 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full border border-orange-500/30">
                  <AlertTriangle className="w-12 h-12 text-orange-400" />
                </div>
              </div>
            </div>

            {/* Glitch 404 Text */}
            <div className="relative">
              <h1 className="text-8xl sm:text-9xl lg:text-[12rem] font-black leading-none">
                <span className="relative inline-block">
                  <span className="absolute inset-0 bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent blur-sm animate-pulse">
                    {glitchText}
                  </span>
                  <span
                    className="relative bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent"
                    style={{
                      textShadow: "0 0 30px rgba(236, 72, 153, 0.5)",
                      filter: glitchText !== "404" ? "blur(1px)" : "none",
                    }}
                  >
                    {glitchText}
                  </span>
                </span>
              </h1>

              {/* Glitch Lines */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-60 animate-pulse" />
                <div className="absolute bottom-1/3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-40 animate-pulse delay-500" />
              </div>
            </div>

            {/* Error Message */}
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                Page Not{" "}
                <span className="bg-gradient-to-r from-[#16f2b3] to-cyan-400 bg-clip-text text-transparent">
                  Found
                </span>
              </h2>

              {/* Name */}
              <div className="flex items-center justify-center space-x-3">
                <div className="w-8 h-[2px] bg-gradient-to-r from-transparent to-pink-500 rounded-full" />
                <span className="text-gray-300 text-lg font-medium">
                  Hi, I'm{" "}
                  <span className="bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent font-bold">
                    Nassim MZILI
                  </span>
                </span>
                <div className="w-8 h-[2px] bg-gradient-to-l from-transparent to-violet-500 rounded-full" />
              </div>

              <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
                Oops! The page you're looking for seems to have vanished into
                the digital void. But don't worry, I've got you covered with
                these quick navigation options.
              </p>
            </div>
          </div>

          {/* Navigation Cards */}
          <div
            className={`grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 transform transition-all duration-1000 delay-300 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            {navigationLinks.map((link, index) => (
              <a
                key={link.title}
                href={link.href}
                className="group relative block transform transition-all duration-500 hover:scale-105 hover:-translate-y-2"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Glow Effect */}
                <div
                  className={`absolute -inset-1 bg-gradient-to-r ${link.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
                />

                {/* Card */}
                <div className="relative bg-gradient-to-br from-[#0d1224]/90 to-[#1a1a2e]/90 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8 group-hover:border-pink-500/50 transition-all duration-300 h-full">
                  {/* Icon */}
                  <div className="flex justify-center mb-6">
                    <div
                      className={`p-4 bg-gradient-to-r ${link.gradient}/20 rounded-xl border border-gray-600/30 group-hover:border-pink-500/50 transition-all duration-300`}
                    >
                      <link.icon
                        className={`w-8 h-8 text-gray-400 group-hover:text-white transition-colors duration-300`}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center space-y-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-pink-300 transition-colors duration-300">
                      {link.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {link.description}
                    </p>
                  </div>

                  {/* Arrow Icon */}
                  <div className="flex justify-center mt-6">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-700/50 to-gray-600/50 flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-pink-500/20 group-hover:to-violet-600/20 transition-all duration-300">
                      <ArrowLeft className="w-3 h-3 text-gray-400 group-hover:text-pink-400 transform rotate-180 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </div>

                  {/* Bottom Accent Line */}
                  <div
                    className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r ${link.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full`}
                  />
                </div>
              </a>
            ))}
          </div>

          {/* Fun Message */}
          <div
            className={`mt-16 transform transition-all duration-1000 delay-500 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="inline-flex items-center space-x-4 px-8 py-4 bg-gradient-to-r from-pink-500/10 to-violet-600/10 rounded-full border border-pink-500/20 backdrop-blur-sm">
              <Rocket className="w-5 h-5 text-pink-400 animate-bounce" />
              <span className="text-gray-300 font-medium">
                Let's get you back on track to explore amazing things!
              </span>
              <Code className="w-5 h-5 text-violet-400 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Additional Styling */}
      <style jsx>{`
        @keyframes glitch {
          0%,
          100% {
            transform: translate(0);
          }
          20% {
            transform: translate(-2px, 2px);
          }
          40% {
            transform: translate(-2px, -2px);
          }
          60% {
            transform: translate(2px, 2px);
          }
          80% {
            transform: translate(2px, -2px);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-glitch {
          animation: glitch 0.3s ease-in-out;
        }
      `}</style>
    </section>
  );
};

export default NotFound;
