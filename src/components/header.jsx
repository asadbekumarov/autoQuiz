import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  BookOpen,
  Menu,
  X,
  User,
  LogOut,
  Globe,
  ChevronDown,
  PlusCircle,
  FileText,
  Check,
  Sparkles,
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
  const [scrolled, setScrolled] = useState(false);

  const userDropdownRef = useRef(null);
  const langDropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass shadow-lg shadow-gray-900/5 border-b border-white/20"
          : "bg-white/90 backdrop-blur-sm border-b border-gray-100/50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2.5 group">
            <div className="relative">
              <div className="absolute inset-0 bg-brand-400 rounded-xl blur-md opacity-40 group-hover:opacity-60 transition-opacity" />
              <div className="relative bg-gradient-to-br from-brand-500 to-emerald-600 p-2 rounded-xl text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="w-5 h-5" />
              </div>
            </div>
            <span className="text-xl font-extrabold tracking-tight">
              <span className="text-gray-900">Auto</span>
              <span className="bg-gradient-to-r from-brand-500 to-emerald-500 bg-clip-text text-transparent">Quiz</span>
            </span>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-brand-700 bg-brand-50/80 font-semibold"
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-50/80"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-brand-500 rounded-full" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right Action Area */}
          <div className="hidden md:flex items-center gap-2">
            {/* Language Switcher */}
            <div className="relative" ref={langDropdownRef}>
              <button
                onClick={() => {
                  setLangDropdown(!langDropdown);
                  setUserDropdown(false);
                }}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50/80 transition-all cursor-pointer"
              >
                <span className="text-base">{currentLangObj.flag}</span>
                <span className="hidden lg:inline text-xs">{currentLangObj.label}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${langDropdown ? 'rotate-180' : ''}`} />
              </button>

              {langDropdown && (
                <div className="absolute right-0 mt-2 w-48 glass rounded-2xl shadow-xl shadow-gray-900/10 p-1.5 animate-slide-up border border-gray-100/50">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLang(l.code);
                        setLangDropdown(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                        lang === l.code
                          ? "bg-brand-50 text-brand-700"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <span className="text-lg">{l.flag}</span>
                      <span>{l.label}</span>
                      {lang === l.code && <Check className="w-4 h-4 ml-auto text-brand-500" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Auth */}
            {isAuthenticated ? (
              <div className="relative" ref={userDropdownRef}>
                <button
                  onClick={() => {
                    setUserDropdown(!userDropdown);
                    setLangDropdown(false);
                  }}
                  className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl hover:bg-gray-50/80 transition-all cursor-pointer"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-brand-400 to-emerald-500 rounded-xl flex items-center justify-center text-white text-xs font-bold shadow-sm">
                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  <span className="text-sm font-semibold text-gray-700 hidden lg:block max-w-[100px] truncate">
                    {user?.name}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${userDropdown ? 'rotate-180' : ''}`} />
                </button>

                {userDropdown && (
                  <div className="absolute right-0 mt-2 w-56 glass rounded-2xl shadow-xl shadow-gray-900/10 p-1.5 animate-slide-up border border-gray-100/50">
                    {/* User info */}
                    <div className="px-3.5 py-3 border-b border-gray-100/50 mb-1">
                      <p className="font-semibold text-sm text-gray-900 truncate">{user?.name}</p>
                      <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                    </div>

                    <button
                      onClick={() => { navigate("/profile"); setUserDropdown(false); }}
                      className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition cursor-pointer"
                    >
                      <User className="w-4 h-4" />
                      <span>{t("profile")}</span>
                    </button>
                    <button
                      onClick={() => { navigate("/my-tests"); setUserDropdown(false); }}
                      className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition cursor-pointer"
                    >
                      <FileText className="w-4 h-4" />
                      <span>{t("mytests")}</span>
                    </button>

                    <div className="border-t border-gray-100/50 mt-1 pt-1">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm text-red-600 hover:bg-red-50/60 transition cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>{t("logout")}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate("/login")}
                  className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-gray-900 rounded-xl hover:bg-gray-50/80 transition-all cursor-pointer"
                >
                  {t("login")}
                </button>
                <button
                  onClick={() => navigate("/create")}
                  className="flex items-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-brand-500 to-emerald-500 hover:from-brand-600 hover:to-emerald-600 text-white text-sm font-semibold rounded-xl shadow-md shadow-brand-500/25 hover:shadow-lg hover:shadow-brand-500/30 transition-all active:scale-[0.97] cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{t("create")}</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-50 transition cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden glass border-t border-gray-100/50 animate-slide-up">
          <div className="px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-brand-50 text-brand-700 font-semibold"
                      : "text-gray-600 hover:bg-gray-50"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}

            {/* Mobile Language */}
            <div className="pt-3 border-t border-gray-100/50 mt-3">
              <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{t("selectLang")}</p>
              <div className="flex gap-2 px-4">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLang(l.code);
                      setMenuOpen(false);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      lang === l.code
                        ? "bg-brand-50 text-brand-700 ring-1 ring-brand-200"
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <span>{l.flag}</span>
                    <span>{l.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Auth */}
            <div className="pt-3 border-t border-gray-100/50 mt-3 space-y-2">
              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => { navigate("/profile"); setMenuOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-700 hover:bg-gray-50 transition cursor-pointer"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-brand-400 to-emerald-500 rounded-xl flex items-center justify-center text-white text-xs font-bold">
                      {user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-sm">{user?.name}</p>
                      <p className="text-xs text-gray-400">{t("profile")}</p>
                    </div>
                  </button>
                  <button
                    onClick={() => { handleLogout(); setMenuOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-600 hover:bg-red-50/60 transition cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>{t("logout")}</span>
                  </button>
                </>
              ) : (
                <div className="flex gap-2 px-4">
                  <button
                    onClick={() => { navigate("/login"); setMenuOpen(false); }}
                    className="flex-1 py-2.5 text-sm font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-xl transition cursor-pointer"
                  >
                    {t("login")}
                  </button>
                  <button
                    onClick={() => { navigate("/create"); setMenuOpen(false); }}
                    className="flex-1 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-brand-500 to-emerald-500 rounded-xl shadow-md shadow-brand-500/20 transition cursor-pointer"
                  >
                    {t("create")}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
