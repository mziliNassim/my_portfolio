import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Eye,
  Download,
  Activity,
  MessageSquare,
  FolderOpen,
  Briefcase,
  GraduationCap,
  Target,
} from "lucide-react";

import DashboardSideBar from "./DashboardSideBar";
import DashboardHeader from "./DashboardHeader";

import FloatingParticles from "../styles/FloatingParticles";
import AnimatedBackgroundElements from "../styles/AnimatedBackgroundElements";
import Loading from "../styles/Loading";

import { scrollToTop } from "../../utils/helpers";
import StatCard from "./StatCard";

const DashboardAnalytics = () => {
  const { admin } = useSelector((state) => state.admin);

  const [LoadingStats, setLoadingStats] = useState(true);
  const [LoadingRecentActivities, setLoadingRecentActivities] = useState(true);
  const [recentActivities, setRecentActivities] = useState([
    { action: "New project added", time: "2 hours ago", type: "project" },
    { action: "Portfolio viewed 50+ times", time: "4 hours ago", type: "view" },
    { action: "Resume downloaded", time: "1 day ago", type: "download" },
    { action: "Contact form submitted", time: "2 days ago", type: "contact" },
    { action: "Profile updated", time: "3 days ago", type: "update" },
  ]);
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalExperiences: 0,
    totalEducations: 0,
    totalVisitors: 0,
    monthlyGrowth: 23.5,
    activeProjects: 5,
    viewsData: [
      { name: "Jan", views: 4000, visitors: 2400 },
      { name: "Feb", views: 3000, visitors: 1398 },
      { name: "Mar", views: 2000, visitors: 9800 },
      { name: "Apr", views: 2780, visitors: 3908 },
      { name: "May", views: 1890, visitors: 4800 },
      { name: "Jun", views: 2390, visitors: 3800 },
      { name: "Jul", views: 3490, visitors: 4300 },
      { name: "Aug", views: 4200, visitors: 3200 },
      { name: "Sep", views: 3800, visitors: 2800 },
      { name: "Oct", views: 4500, visitors: 3500 },
      { name: "Nov", views: 5200, visitors: 4100 },
      { name: "Dec", views: 6800, visitors: 5200 },
      { name: "Jan", views: 4000, visitors: 2400 },
    ],
    deviceData: [
      { name: "Desktop", value: 65, color: "#3B82F6" },
      { name: "Mobile", value: 25, color: "#10B981" },
      { name: "Tablet", value: 10, color: "#F59E0B" },
    ],
  });

  // fetch Stats data
  const fetchStats = async () => {
    setLoadingStats(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URI}/api/stats`
      );
      setStats(response.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message, {
        description: new Date().toUTCString(),
        action: { label: "✖️" },
      });
    } finally {
      setLoadingStats(false);
    }
  };

  // fetch Recent Activities
  const fetchRecentActivities = async () => {
    setLoadingRecentActivities(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URI}/api/activities`
      );
      setRecentActivities(response.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message, {
        description: new Date().toUTCString(),
        action: { label: "✖️" },
      });
    } finally {
      setLoadingRecentActivities(false);
    }
  };

  useEffect(() => {
    scrollToTop();
    if (!admin) {
      window.location.href = "/admin/auth";
      return;
    }

    fetchStats();
    fetchRecentActivities();
  }, [admin]);

  return (
    <section className="min-h-screen relative bg-gradient-to-br from-[#0d1224] via-[#1a1a2e] to-[#271c54] py-20 pt-20 pb-8 lg:py-16 lg:pt-28">
      <AnimatedBackgroundElements />
      <FloatingParticles />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DashboardHeader />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <DashboardSideBar />

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="mb-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">
                    Analytics Dashboard
                  </h1>
                  <p className="text-slate-400">
                    Portfolio performance and visitor insights
                  </p>
                </div>
              </div>

              {LoadingStats || LoadingRecentActivities ? (
                <Loading />
              ) : (
                <>
                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard
                      title="Total Projects"
                      value={stats.totalProjects}
                      icon={FolderOpen}
                      color="cyan"
                      growth={stats.monthlyGrowth}
                      delay={100}
                    />
                    <StatCard
                      title="Experiences"
                      value={stats.totalExperiences}
                      icon={Briefcase}
                      color="purple"
                      delay={200}
                    />
                    <StatCard
                      title="Education"
                      value={stats.totalEducations}
                      icon={GraduationCap}
                      color="green"
                      delay={300}
                    />
                    <StatCard
                      title="Total Visitors"
                      value={stats.totalVisitors}
                      icon={Eye}
                      color="blue"
                      growth={18.2}
                      delay={400}
                    />
                  </div>

                  {/* Charts Section */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Views Chart */}
                    <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-white mb-4">
                        Portfolio Views
                      </h3>
                      <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={stats.viewsData}>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#334155"
                          />
                          <XAxis dataKey="name" stroke="#64748b" />
                          <YAxis stroke="#64748b" />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "#1e293b",
                              border: "1px solid #334155",
                              borderRadius: "8px",
                            }}
                          />
                          <Area
                            type="monotone"
                            dataKey="views"
                            stroke="#3b82f6"
                            fill="#3b82f6"
                            fillOpacity={0.3}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Device Distribution */}
                    <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-white mb-4">
                        Device Distribution
                      </h3>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={stats.deviceData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) =>
                              `${name} ${(percent * 100).toFixed(0)}%`
                            }
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {stats.deviceData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">
                      Recent Activity
                    </h3>
                    <div className="space-y-4">
                      {recentActivities.map((activity, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-4"
                        >
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              activity.type === "project"
                                ? "bg-blue-500/20"
                                : activity.type === "view"
                                ? "bg-green-500/20"
                                : activity.type === "download"
                                ? "bg-purple-500/20"
                                : activity.type === "contact"
                                ? "bg-orange-500/20"
                                : "bg-slate-500/20"
                            }`}
                          >
                            {activity.type === "project" && (
                              <Target className="w-5 h-5 text-blue-400" />
                            )}
                            {activity.type === "view" && (
                              <Eye className="w-5 h-5 text-green-400" />
                            )}
                            {activity.type === "download" && (
                              <Download className="w-5 h-5 text-purple-400" />
                            )}
                            {activity.type === "contact" && (
                              <MessageSquare className="w-5 h-5 text-orange-400" />
                            )}
                            {activity.type === "update" && (
                              <Activity className="w-5 h-5 text-slate-400" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="text-white">{activity.action}</p>
                            <p className="text-slate-400 text-sm">
                              {activity.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardAnalytics;
