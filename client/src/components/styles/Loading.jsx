import React from "react";
import { HiSparkles } from "react-icons/hi";

const Loading = ({ size = "md" }) => {
  // Size configurations
  const sizeConfig = {
    sm: {
      container: "w-8 h-8",
      spinner: "w-6 h-6",
      dots: "w-1 h-1",
      sparkles: "w-1 h-1",
      particles: 6,
      text: "text-xs",
      spacing: "space-x-1",
    },
    md: {
      container: "w-12 h-12",
      spinner: "w-8 h-8",
      dots: "w-1.5 h-1.5",
      sparkles: "w-2 h-2",
      particles: 8,
      text: "text-sm",
      spacing: "space-x-1.5",
    },
    lg: {
      container: "w-16 h-16",
      spinner: "w-12 h-12",
      dots: "w-2 h-2",
      sparkles: "w-3 h-3",
      particles: 12,
      text: "text-base",
      spacing: "space-x-2",
    },
    xl: {
      container: "w-24 h-24",
      spinner: "w-18 h-18",
      dots: "w-3 h-3",
      sparkles: "w-4 h-4",
      particles: 16,
      text: "text-lg",
      spacing: "space-x-3",
    },
  };

  const config = sizeConfig[size] || sizeConfig.md;

  return (
    <div className="flex flex-col items-center justify-center space-y-4 overflow-hidden">
      {/* Main Spinner Container */}
      <div className="relative flex items-center justify-center">
        {/* Outer Ring */}
        <div
          className={`${config.container} relative flex items-center justify-center`}
        >
          {/* Spinning Gradient Ring */}
          <div
            className={`absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 animate-spin`}
            style={{
              background: `conic-gradient(from 0deg, #ec4899, #8b5cf6, #06b6d4, #10b981, #ec4899)`,
              mask: `radial-gradient(circle, transparent 60%, black 61%, black 100%)`,
              WebkitMask: `radial-gradient(circle, transparent 60%, black 61%, black 100%)`,
            }}
          />

          {/* Inner Glow */}
          <div
            className={`absolute inset-2 rounded-full bg-gradient-to-r from-pink-500/20 to-violet-600/20 animate-pulse`}
          />

          {/* Center Dot */}
          <div
            className={`${config.dots} bg-gradient-to-r from-pink-500 to-violet-600 rounded-full animate-pulse`}
          />
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(config.particles)].map((_, i) => {
            const angle = (360 / config.particles) * i;
            const radius =
              size === "sm" ? 20 : size === "md" ? 30 : size === "lg" ? 40 : 50;

            return (
              <div
                key={i}
                className="absolute animate-ping"
                style={{
                  left: "50%",
                  top: "50%",
                  transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${radius}px)`,
                  animationDelay: `${i * 0.15}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              >
                {i % 3 === 0 ? (
                  <HiSparkles
                    className={`${config.sparkles} text-pink-400/60`}
                  />
                ) : (
                  <div
                    className={`${config.dots} bg-cyan-400/40 rounded-full`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Pulsing Dots */}
      <div className={`flex items-center ${config.spacing}`}>
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className={`${config.dots} bg-gradient-to-r from-pink-500 to-violet-600 rounded-full animate-bounce`}
            style={{
              animationDelay: `${i * 0.2}s`,
              animationDuration: "1s",
            }}
          />
        ))}
      </div>

      {/* Additional Styles */}
      <style>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
            opacity: 0.4;
          }
          50% {
            transform: translateY(-4px);
            opacity: 1;
          }
        }

        @keyframes ping {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          75%,
          100% {
            transform: scale(1);
            opacity: 0;
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
};

export default Loading;
