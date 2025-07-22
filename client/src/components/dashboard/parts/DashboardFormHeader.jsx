import { Rocket } from "lucide-react";

const DashboardFormHeader = ({ title, description }) => (
  <div className="relative bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 p-8 border-b border-white/10">
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"></div>
    <div className="relative z-10">
      <div className="flex items-center space-x-3">
        <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
          <Rocket className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white capitalize">{title}</h2>
          <p className="text-slate-300">{description}</p>
        </div>
      </div>
    </div>
  </div>
);

export default DashboardFormHeader;
