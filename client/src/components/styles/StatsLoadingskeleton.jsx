import React from "react";

const StatsLoadingskeleton = () => {
  return (
    <>
      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[1, 2, 3, 4].map((_, index) => (
          <div
            key={index}
            className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-lg p-6 animate-pulse"
          >
            {/* Icon skeleton */}
            <div className="flex items-center justify-between mb-4">
              <div className="w-8 h-8 bg-slate-700/50 rounded"></div>
              <div className="w-6 h-6 bg-slate-700/50 rounded"></div>
            </div>
            {/* Value skeleton */}
            <div className="h-8 bg-slate-700/50 rounded w-16 mb-2"></div>
            {/* Title skeleton */}
            <div className="h-4 bg-slate-700/30 rounded w-24"></div>
          </div>
        ))}
      </div>

      {/* Charts Section Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Views Chart Skeleton */}
        <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-lg p-6 animate-pulse">
          <div className="h-6 bg-slate-700/50 rounded w-32 mb-4"></div>
          <div className="h-[300px] bg-slate-700/30 rounded flex items-end justify-between px-4 pb-4">
            {/* Chart bars skeleton */}
            {[40, 60, 30, 80, 50, 70, 45].map((height, index) => (
              <div
                key={index}
                className="bg-slate-600/50 rounded-t w-8"
                style={{ height: `${height}%` }}
              ></div>
            ))}
          </div>
        </div>

        {/* Device Distribution Skeleton */}
        <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-lg p-6 animate-pulse">
          <div className="h-6 bg-slate-700/50 rounded w-36 mb-4"></div>
          <div className="h-[300px] flex items-center justify-center">
            {/* Pie chart skeleton */}
            <div className="relative">
              <div className="w-40 h-40 rounded-full border-8 border-slate-700/30"></div>
              <div className="absolute inset-0 w-40 h-40 rounded-full border-8 border-transparent border-t-slate-600/50 border-r-slate-600/50"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StatsLoadingskeleton;
