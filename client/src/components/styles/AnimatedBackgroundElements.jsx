import React from "react";

const AnimatedBackgroundElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute top-20 right-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      <div
        className="absolute top-1/3 left-1/3 w-96 h-96 bg-gradient-to-r from-violet-500/5 to-cyan-500/5 rounded-full blur-3xl animate-spin"
        style={{ animationDuration: "30s" }}
      />
    </div>
  );
};

export default AnimatedBackgroundElements;
