import React from 'react'

const ActivitiesloadingSkeleton = () => {
  return (
    <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {[1, 2, 3].map((_, index) => (
          <div
            key={index}
            className="flex items-center space-x-4 animate-pulse"
          >
            {/* Icon skeleton */}
            <div className="w-10 h-10 rounded-full bg-slate-700/50"></div>
            {/* Content skeleton */}
            <div className="flex-1 space-y-2">
              {/* Action text skeleton */}
              <div className="h-4 bg-slate-700/50 rounded w-3/4"></div>
              {/* Time text skeleton */}
              <div className="h-3 bg-slate-700/30 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ActivitiesloadingSkeleton
