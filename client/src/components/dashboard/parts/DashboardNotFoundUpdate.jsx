import React from "react";
import { Link } from "react-router-dom";
import { AlertCircle, ArrowLeft } from "lucide-react";

import DashboardFormHeader from "./DashboardFormHeader";

const DashboardNotFoundUpdate = ({ type, id }) => {
  return (
    <div className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
      <DashboardFormHeader
        title={`${type} Not Found`}
        description={`The ${type} you're looking for doesn't exist or may have been removed"`}
      />
      <div className="p-8 text-center">
        <div className="max-w-md mx-auto">
          <div className="flex justify-center mb-4">
            <AlertCircle
              className="h-16 w-16 text-rose-500"
              strokeWidth={1.5}
            />
          </div>
          <h3 className="text-xl font-bold text-white mb-2 capitalize">
            {type} Not Found
          </h3>
          <p className="text-slate-300 mb-6">
            The {type} with ID #{id} could not be found. It may have been
            deleted or you might not have permission to access it.
          </p>
          <Link
            to={`/admin/dashboard/${type}s`}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to {type}s
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardNotFoundUpdate;
