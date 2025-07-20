import React, { useState, useEffect } from "react";
import { FaCode, FaServer, FaTools } from "react-icons/fa";
import FloatingParticles from "../components/styles/FloatingParticles";
import AnimatedBackgroundElements from "../components/styles/AnimatedBackgroundElements";

const ServerError = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [glitchText, setGlitchText] = useState("500");
  const [errorMessage, setErrorMessage] = useState("Internal Server Error");

  useEffect(() => {
    setIsVisible(true);

    // Glitch effect for 500 text
    const glitchChars = ["5", "0", "0", "Ƽ", "𝟝", "𝟎", "𝟎", "５", "０", "０"];
    const errorMessages = [
      "Internal Server Error",
      "Something went wrong...",
      "Server malfunction detected",
      "System overload...",
      "Connection interrupted",
    ];

    let glitchInterval;
    let messageInterval;

    const startGlitch = () => {
      glitchInterval = setInterval(() => {
        const randomText = Array(3)
          .fill()
          .map(
            () => glitchChars[Math.floor(Math.random() * glitchChars.length)]
          )
          .join("");
        setGlitchText(randomText);

        setTimeout(() => setGlitchText("500"), 150);
      }, 2000);

      messageInterval = setInterval(() => {
        const randomMessage =
          errorMessages[Math.floor(Math.random() * errorMessages.length)];
        setErrorMessage(randomMessage);

        setTimeout(() => setErrorMessage("Internal Server Error"), 2000);
      }, 4000);
    };

    const timeout = setTimeout(startGlitch, 1000);

    return () => {
      clearTimeout(timeout);
      clearInterval(glitchInterval);
      clearInterval(messageInterval);
    };
  }, []);

  return (
    <section className="h-screen relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0d1224] via-[#1a1a2e] to-[#271c54]">
      <AnimatedBackgroundElements />
      <FloatingParticles />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center space-y-12">
          {/* 500 Header with Glitch Effect */}
          <div
            className={`space-y-8 transform transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            {/* Server Icon */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-full blur-xl opacity-30 animate-pulse" />
                <div className="relative p-6 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-full border border-red-500/30">
                  <FaServer className="w-12 h-12 text-red-400" />
                </div>
              </div>
            </div>

            {/* Glitch 500 Text */}
            <div className="relative">
              <h1 className="text-8xl sm:text-9xl lg:text-[12rem] font-black leading-none">
                <span className="relative inline-block">
                  <span className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-600 bg-clip-text text-transparent blur-sm animate-pulse">
                    {glitchText}
                  </span>
                  <span
                    className="relative bg-gradient-to-r from-red-500 to-orange-600 bg-clip-text text-transparent"
                    style={{
                      textShadow: "0 0 30px rgba(239, 68, 68, 0.5)",
                      filter: glitchText !== "500" ? "blur(1px)" : "none",
                    }}
                  >
                    {glitchText}
                  </span>
                </span>
              </h1>

              {/* Glitch Lines */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-60 animate-pulse" />
                <div className="absolute bottom-1/3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-orange-400 to-transparent opacity-40 animate-pulse delay-500" />
              </div>
            </div>

            {/* Error Message */}
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white transition-all duration-500">
                <span className="bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">
                  {errorMessage}
                </span>
              </h2>

              {/* Name */}
              <div className="flex items-center justify-center space-x-3">
                <div className="w-8 h-[2px] bg-gradient-to-r from-transparent to-red-500 rounded-full" />
                <span className="text-gray-300 text-lg font-medium">
                  Hi, I'm{" "}
                  <span className="bg-gradient-to-r from-red-500 to-orange-600 bg-clip-text text-transparent font-bold">
                    Nassim MZILI
                  </span>
                </span>
                <div className="w-8 h-[2px] bg-gradient-to-l from-transparent to-orange-500 rounded-full" />
              </div>

              <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
                Whoops! Something went wrong on our end. Our servers are having
                a moment, but don't worry - I'm on it! While I fix things up,
                here are some places you can explore.
              </p>
            </div>
          </div>

          {/* Fun Message */}
          <div
            className={`mt-16 transform transition-all duration-1000 delay-500 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="inline-flex items-center space-x-4 px-8 py-4 bg-gradient-to-r from-red-500/10 to-orange-600/10 rounded-full border border-red-500/20 backdrop-blur-sm">
              <FaTools className="w-5 h-5 text-red-400 animate-bounce" />
              <span className="text-gray-300 font-medium">
                I'm fixing this right now - thanks for your patience!
              </span>
              <FaCode className="w-5 h-5 text-orange-400 animate-pulse" />
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

export default ServerError;
