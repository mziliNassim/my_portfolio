import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import {
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaShieldAlt,
} from "react-icons/fa";

import FloatingParticles from "../styles/FloatingParticles";
import AnimatedBackgroundElements from "../styles/AnimatedBackgroundElements";

import { setAdmin } from "../../features/adminSlice";

import { managementLinks } from "../../utils/management-links";

const SignIn = () => {
  const { admin } = useSelector((state) => state.admin);

  const [isVisible, setIsVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setIsVisible(true);
    if (admin) window.location.href = "/admin/dashboard";
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URI}/api/auth`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${admin?.token}`,
          },
        }
      );

      navigate("/admin/dashboard");
      dispatch(
        setAdmin({ data: response.data.data, token: response.data.token })
      );
      toast.success(
        response.data.message || `Welcom back ${response.data.data.username}`,
        {
          description: new Date().toUTCString(),
          action: { label: "✖️" },
        }
      );
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message, {
        description: new Date().toUTCString(),
        action: { label: "✖️" },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0d1224] via-[#1a1a2e] to-[#271c54] pt-20 pb-8 lg:py-16 lg:pt-28">
      <AnimatedBackgroundElements />
      <FloatingParticles />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div
          className={`transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {/* Main Container */}
          <div className="relative">
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-violet-600 rounded-3xl blur-xl opacity-20 animate-pulse" />

            {/* Card Content */}
            <div className="relative bg-gradient-to-br from-[#0d1224]/95 to-[#1a1a2e]/95 backdrop-blur-xl rounded-3xl border border-gray-700/50 shadow-2xl overflow-hidden">
              <div className="grid lg:grid-cols-2 min-h-[600px]">
                {/* Left Side - Information & Branding */}
                <div className="relative p-8 lg:p-12 flex flex-col justify-center bg-gradient-to-br from-violet-600/10 to-pink-600/10 border-r border-gray-700/50">
                  {/* Brand Section */}
                  <div className="mb-8">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-violet-600 rounded-full blur-md opacity-40 animate-pulse" />
                        <div className="relative p-3 bg-gradient-to-r from-pink-500/20 to-violet-600/20 rounded-full border border-pink-500/30">
                          <FaShieldAlt className="w-6 h-6 text-pink-400" />
                        </div>
                      </div>
                      <div>
                        <h1 className="text-2xl font-bold text-white">
                          Dashboard{" "}
                          <span className="bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent">
                            Admin
                          </span>
                        </h1>
                      </div>
                    </div>

                    <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                      Manage Portfolio
                      <br />
                      <span className="bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent">
                        Nassim MZILI
                      </span>{" "}
                    </h2>

                    <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                      Access portfolio management dashboard.
                    </p>
                  </div>

                  {/* Features Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    {managementLinks.map((feature, index) => (
                      <div
                        key={index}
                        className="group p-4 bg-gray-800/30 rounded-xl border border-gray-700/50 hover:border-pink-500/30 transition-all duration-300 hover:bg-gray-800/50"
                      >
                        <div className="flex items-start space-x-3">
                          <div className="p-2 bg-gradient-to-r from-pink-500/20 to-violet-600/20 rounded-lg border border-pink-500/20 group-hover:border-pink-500/40 transition-all duration-300">
                            <feature.icon className="w-4 h-4 text-pink-400" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-white text-sm mb-1">
                              {feature.title}
                            </h3>
                            <p className="text-gray-400 text-xs leading-relaxed">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Side - Sign In Form */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  {/* Header */}
                  <div className="text-center space-y-4 mb-8">
                    <h2 className="text-3xl font-bold text-white">
                      Welcome{" "}
                      <span className="bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent">
                        Back
                      </span>
                    </h2>
                    <p className="text-gray-400">
                      Access portfolio management dashboard
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Username Input */}
                    <div className="space-y-2">
                      <label
                        htmlFor="username"
                        className="text-sm font-medium text-gray-300"
                      >
                        Username
                      </label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                          <FaUser className="w-4 h-4 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="username"
                          name="username"
                          value={formData.username}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-500 focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/20 focus:outline-none transition-all duration-300"
                          placeholder="Enter your username"
                          required
                        />
                      </div>
                    </div>

                    {/* Password Input */}
                    <div className="space-y-2">
                      <label
                        htmlFor="password"
                        className="text-sm font-medium text-gray-300"
                      >
                        Password
                      </label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                          <FaLock className="w-4 h-4 text-gray-400" />
                        </div>
                        <input
                          type={showPassword ? "text" : "password"}
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-12 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-500 focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/20 focus:outline-none transition-all duration-300"
                          placeholder="Enter your password"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-pink-400 transition-colors duration-200"
                        >
                          {showPassword ? (
                            <FaEyeSlash className="w-4 h-4" />
                          ) : (
                            <FaEye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full group cursor-not relative overflow-hidden bg-gradient-to-r from-pink-500 to-violet-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-pink-600 hover:to-violet-700 focus:outline-none focus:ring-2 focus:ring-pink-500/50 transform transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ cursor: isLoading ? "not-allowed" : "pointer" }}
                    >
                      <div className="flex items-center justify-center space-x-2">
                        {isLoading ? (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>
                            <span>Access Dashboard</span>
                            <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                          </>
                        )}
                      </div>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
