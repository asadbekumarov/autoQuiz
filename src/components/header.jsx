import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Book, Menu, X, User, ChevronRight } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [userInfo, setUserInfo] = useState({
    name: "Asadbek",
    phone: "+998 90 123 45 67",
  });

  const [lang, setLang] = useState("uz");

  useEffect(() => {
    const checkUser = () => {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        setIsLoggedIn(true);
        const u = JSON.parse(userStr);
        setUserInfo((prev) => ({
          ...prev,
          name: u.name || u.email?.split("@")[0] || "Asadbek",
        }));
      } else {
        setIsLoggedIn(false);
      }

      const settings = JSON.parse(localStorage.getItem("settings") || "{}");
      if (settings.language) setLang(settings.language);
    };

    checkUser();
    window.addEventListener("storage", checkUser);
    window.addEventListener("settingsChanged", checkUser);
    return () => {
      window.removeEventListener("storage", checkUser);
      window.removeEventListener("settingsChanged", checkUser);
    };
  }, []);

  const t = (key) => {
    const dict = {
      uz: {
        home: "Bosh sahifa",
        create: "Test Yaratish",
        templates: "Shablonlar",
        mytests: "Mening testlarim",
        about: "Ilova haqida",
      },
      en: {
        home: "Home",
        create: "Create Test",
        templates: "Templates",
        mytests: "My Tests",
        about: "About",
      },
      ru: {
        home: "Главная",
        create: "Создать тест",
        templates: "Шаблоны",
        mytests: "Мои тесты",
        about: "О приложении",
      },
    };
    return (dict[lang] || dict.uz)[key] || key;
  };

  const navItems = [
    { name: t("home"), path: "/" },
    { name: t("create"), path: "/create" },
    { name: t("templates"), path: "/templates" },
    { name: t("mytests"), path: "/my-tests" },
    { name: t("about"), path: "/about" },
  ];

  return (
    <>
      <header className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <NavLink to="/" className="flex items-center space-x-2">
              <div className="bg-green-600 p-1.5 rounded-lg text-white">
                <Book className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                AutoQuiz
              </span>
            </NavLink>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-6">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors ${
                      isActive
                        ? "text-green-600"
                        : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                {menuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 absolute w-full left-0 shadow-lg h-screen z-40 overflow-y-auto">
            {isLoggedIn && (
              <div className="p-6 flex flex-col items-center border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                <div className="w-20 h-20 bg-white border-2 border-white shadow-sm rounded-full flex items-center justify-center mb-3">
                  <User className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                  {userInfo.name}
                </h3>
                <p className="text-gray-500 text-sm mb-3">{userInfo.phone}</p>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    navigate("/profile");
                  }}
                  className="mt-4 text-green-600 text-sm font-medium hover:underline"
                >
                  Profilga o'tish
                </button>
              </div>
            )}

            <nav className="p-4 space-y-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-4 py-3 rounded-xl transition-colors ${
                      isActive
                        ? "bg-green-50 text-green-700 font-semibold"
                        : "text-gray-600 hover:bg-gray-50"
                    }`
                  }
                >
                  {item.name}
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </NavLink>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
