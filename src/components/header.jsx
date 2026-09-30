import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Book,
  Menu,
  X,
  User,
  LogOut,
  Globe,
  ChevronDown,
  ChevronRight,
  PlusCircle,
  FileText,
} from "lucide-react";
import { useAuth } from "../shared/hooks/useAuth.js";
import { useI18n } from "../shared/hooks/useI18n.js";

const Header = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { lang, setLang, t } = useI18n();

  const [menuOpen, setMenuOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const [langDropdown, setLangDropdown] = useState(false);

  const userDropdownRef = useRef(null);
  const langDropdownRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(e.target)) {
        setUserDropdown(false);
      }
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target)) {
        setLangDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    { name: t("home"), path: "/" },
    { name: t("create"), path: "/create" },
    { name: t("templates"), path: "/templates" },
    { name: t("mytests"), path: "/my-tests" },
    { name: t("about"), path: "/about" },
  ];

  const languages = [
    { code: "uz", label: "O'zbekcha", flag: "🇺🇿" },
    { code: "ru", label: "Русский", flag: "🇷🇺" },
    { code: "en", label: "English", flag: "🇬🇧" },
  ];

  const currentLangObj = languages.find((l) => l.code === lang) || languages[0];

  const handleLogout = () => {
    logout();
    setUserDropdown(false);
    navigate("/");
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-2.5 group">
            <div className="bg-gradient-to-tr from-green-600 to-emerald-500 p-2 rounded-xl text-white shadow-md shadow-green-500/20 group-hover:scale-105 transition-transform">
              <Book className="w-5 h-5" />
            </div>
            <span className="text-xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Auto<span className="text-green-600">Quiz</span>
            </span>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-green-50 text-green-700 font-semibold"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Right Action Area (Language & Auth) */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Language Selector Dropdown */}
            <div className="relative" ref={langDropdownRef}>
              <button
                type="button"
                onClick={() => setLangDropdown(!langDropdown)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 text-gray-700 text-xs font-semibold hover:bg-gray-50 transition"
              >
                <span>{currentLangObj.flag}</span>
                <span>{currentLangObj.code.toUpperCase()}</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </button>

              {langDropdown && (
                <div className="absolute right-0 mt-2 w-36 bg-white rounded-2xl shadow-xl border border-gray-100 py-1.5 z-50 animate-in fade-in slide-in-from-top-1">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLang(l.code);
                        setLangDropdown(false);
                      }}
                      className={`w-full flex items-center gap-2 px-3 py-2 text-xs text-left transition hover:bg-green-50 ${
                        lang === l.code
                          ? "text-green-600 font-bold bg-green-50/50"
                          : "text-gray-700"
                      }`}
                    >
                      <span>{l.flag}</span>
                      <span>{l.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* User Auth Section */}
            {isAuthenticated ? (
              <div className="relative" ref={userDropdownRef}>
                <button
                  type="button"
                  onClick={() => setUserDropdown(!userDropdown)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border border-gray-200 hover:border-green-300 hover:bg-green-50/30 transition"
                >
                  <div className="w-7 h-7 bg-gradient-to-tr from-green-500 to-emerald-400 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-sm">
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <span className="text-sm font-semibold text-gray-800 max-w-[120px] truncate">
                    {user?.name || "Profil"}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                </button>

                {userDropdown && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50">
                    <div className="px-4 py-2.5 border-b border-gray-100">
                      <p className="text-xs text-gray-500">{t("role")}</p>
                      <p className="text-sm font-bold text-gray-800 truncate">
                        {user?.name}
                      </p>
                      <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                    </div>

                    <button
                      onClick={() => {
                        setUserDropdown(false);
                        navigate("/profile");
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 text-left transition"
                    >
                      <User className="w-4 h-4 text-gray-400" />
                      <span>{t("profile")}</span>
                    </button>

                    <button
                      onClick={() => {
                        setUserDropdown(false);
                        navigate("/my-tests");
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 text-left transition"
                    >
                      <FileText className="w-4 h-4 text-gray-400" />
                      <span>{t("mytests")}</span>
                    </button>

                    <div className="border-t border-gray-100 my-1"></div>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 text-left transition font-medium"
                    >
                      <LogOut className="w-4 h-4 text-red-500" />
                      <span>{t("logout")}</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <NavLink
                  to="/login"
                  className="px-4 py-2 rounded-xl text-sm font-medium text-gray-700 hover:text-green-700 hover:bg-green-50 transition"
                >
                  {t("login")}
                </NavLink>
                <NavLink
                  to="/register"
                  className="px-4 py-2 rounded-xl text-sm font-semibold bg-green-600 hover:bg-green-700 text-white shadow-md shadow-green-600/20 transition active:scale-95"
                >
                  {t("register")}
                </NavLink>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-xl transition"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-xl fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto p-4 flex flex-col justify-between">
          <div className="space-y-4">
            {/* User Info (Mobile) */}
            {isAuthenticated ? (
              <div className="p-4 rounded-2xl bg-green-50/70 border border-green-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-base shadow-sm">
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{user?.name}</h3>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    navigate("/profile");
                  }}
                  className="p-2 text-green-700 bg-white rounded-xl shadow-xs"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <NavLink
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="py-2.5 text-center rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                  {t("login")}
                </NavLink>
                <NavLink
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="py-2.5 text-center rounded-xl bg-green-600 text-sm font-semibold text-white shadow-md shadow-green-600/20"
                >
                  {t("register")}
                </NavLink>
              </div>
            )}

            {/* Mobile Nav Links */}
            <nav className="space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-green-50 text-green-700 font-semibold"
                        : "text-gray-700 hover:bg-gray-50"
                    }`
                  }
                >
                  <span>{item.name}</span>
                  <ChevronRight className="w-4 h-4 opacity-40" />
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Mobile Footer: Languages & Logout */}
          <div className="pt-4 border-t border-gray-100 space-y-3">
            <div>
              <p className="text-xs text-gray-400 font-medium mb-2 px-1">
                {t("selectLang")}
              </p>
              <div className="grid grid-cols-3 gap-2">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => setLang(l.code)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border transition ${
                      lang === l.code
                        ? "bg-green-50 border-green-500 text-green-700"
                        : "border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <span>{l.flag}</span>
                    <span>{l.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {isAuthenticated && (
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-red-600 bg-red-50 text-sm font-medium hover:bg-red-100 transition"
              >
                <LogOut className="w-4 h-4" />
                <span>{t("logout")}</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
