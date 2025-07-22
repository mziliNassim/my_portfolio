import { Code, Users, Image, Settings } from "lucide-react";

const DashboardFormTabs = ({ activeTab, setActiveTab, tabs }) => {
  return (
    <div className="border-b border-white/10">
      <div className="flex space-x-8 px-8 pt-6">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center cursor-pointer space-x-2 pb-4 px-1 border-b-2 font-medium text-sm transition-all duration-300 ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-400"
                  : "border-transparent text-slate-400 hover:text-slate-300"
              }`}
            >
              <IconComponent className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardFormTabs;
