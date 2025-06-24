import React, { useState, useEffect } from "react";
import { Menu, X, ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

  const location = useLocation();

  const navItems = [
    { name: "ABOUT", href: "#about", id: "about" },
    { name: "EXPERIENCE", href: "#experience", id: "experience" },
    { name: "SKILLS", href: "#skills", id: "skills" },
    { name: "PROJECTS", href: "#projects", id: "projects" },
    { name: "EDUCATION", href: "#education", id: "education" },
    { name: "CONTACT", href: "#contact", id: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href, id) => {
    setActiveSection(id);
    setIsMobileMenuOpen(false);

    // Smooth scroll to section
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Background overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          isScrolled
            ? "bg-[#0d1224]/80 backdrop-blur-xl border-b border-[#271c54]/30 shadow-2xl"
            : "bg-gradient-to-r from-[#0d1224]/60 to-[#271c54]/40 backdrop-blur-md"
        }`}
      >
        {/* Animated gradient border */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo/Brand */}
            <div className="flex-shrink-0 group">
              <a href="/" className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
                <div className="relative bg-[#0d1224] px-4 py-2 rounded-lg border border-[#271c54]">
                  <span className="text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                    Nassim MZILI
                  </span>
                </div>
              </a>
            </div>

            {/* Desktop Navigation */}
            {location?.pathname !== "/projects" &&
              location?.pathname !== "/links" && (
                <div className="hidden lg:block">
                  <div className="flex items-center space-x-1 bg-[#0d1224]/60 backdrop-blur-sm rounded-full px-3 py-2 border border-[#271c54]/50">
                    {navItems.map((item, index) => (
                      <Link
                        to={`/${item.href}`}
                        key={item.id}
                        onClick={() => handleNavClick(item.href, item.id)}
                        className={`relative cursor-pointer group px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                          activeSection === item.id
                            ? "text-white bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg"
                            : "text-gray-300 hover:text-white hover:bg-[#271c54]/50"
                        }`}
                      >
                        {/* Hover effect background */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Text with animated underline */}
                        <span className="relative z-10">{item.name}</span>

                        {/* Animated dot indicator */}
                        {activeSection === item.id && (
                          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full animate-pulse" />
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

            {/* Mobile Menu Button */}
            {location?.pathname !== "/projects" &&
              location?.pathname !== "/links" && (
                <div className="lg:hidden">
                  <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="relative group p-2 rounded-lg bg-[#271c54]/50 border border-[#271c54] text-gray-300 hover:text-white hover:bg-[#271c54] transition-all duration-300"
                  >
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {isMobileMenuOpen ? (
                      <X className="relative z-10 h-5 w-5 transform rotate-0 transition-transform duration-300" />
                    ) : (
                      <Menu className="relative z-10 h-5 w-5 transform rotate-0 transition-transform duration-300" />
                    )}
                  </button>
                </div>
              )}
          </div>

          {/* Mobile Navigation Menu */}
          <div
            className={`lg:hidden overflow-hidden transition-all duration-500 ease-out ${
              isMobileMenuOpen
                ? "max-h-96 opacity-100 pb-6"
                : "max-h-0 opacity-0 pb-0"
            }`}
          >
            <div className="pt-4 space-y-2">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.href, item.id)}
                  className={`group w-full flex items-center justify-between px-4 py-3 rounded-xl text-left font-medium transition-all duration-300 transform ${
                    activeSection === item.id
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-[1.02]"
                      : "text-gray-300 hover:text-white hover:bg-[#271c54]/70 hover:scale-[1.01]"
                  }`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: isMobileMenuOpen
                      ? "slideInFromRight 0.5s ease-out forwards"
                      : "none",
                  }}
                >
                  <span className="text-sm">{item.name}</span>
                  <ChevronRight
                    className={`h-4 w-4 transition-transform duration-300 ${
                      activeSection === item.id
                        ? "rotate-90"
                        : "group-hover:translate-x-1"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <style jsx>{`
        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
};

export default NavBar;
