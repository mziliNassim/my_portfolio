import React from "react";

import { FaStar } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";

const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(20)].map((_, i) => (
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
          ) : i % 4 === 1 ? (
            <FaStar className="w-1 h-1 text-violet-400/40" />
          ) : (
            <div className="w-1 h-1 bg-cyan-400/30 rounded-full" />
          )}
        </div>
      ))}
    </div>
  );
};

export default FloatingParticles;
