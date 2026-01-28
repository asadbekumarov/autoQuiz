import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Book, Menu, X, User, LogOut, ChevronRight } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Auth states
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
    confirm: "",
  });

  // Mock User Data (Replace with real data from localStorage or API)
  const [userInfo, setUserInfo] = useState({
    name: "Asadbek",
    phone: "+998 90 123 45 67",
    bonus: 1000,
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
        login: "Kirish",
        logout: "Chiqish",
        register: "Roʼyxatdan oʼtish",
        cancel: "Bekor qilish",
      },
      en: {
        home: "Home",
        create: "Create Test",
        templates: "Templates",
        mytests: "My Tests",
        login: "Login",
        logout: "Logout",
        register: "Register",
        cancel: "Cancel",
      },
      ru: {
        home: "Главная",
        create: "Создать тест",
        templates: "Шаблоны",
        mytests: "Мои тесты",
        login: "Войти",
        logout: "Выйти",
        register: "Регистрация",
        cancel: "Отмена",
      },
    };
    return (dict[lang] || dict.uz)[key] || key;
  };

  const navItems = [
    { name: t("home"), path: "/" },
    { name: t("create"), path: "/create" },
    { name: t("templates"), path: "/templates" },
    { name: t("mytests"), path: "/my-tests" },
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    let users = [];
    try {
      users = JSON.parse(localStorage.getItem("users") || "[]");
    } catch {
      users = [];
    }
    if (users.includes(loginForm.email)) {
      setIsLoggedIn(true);
      setShowLoginModal(false);
      localStorage.setItem("user", JSON.stringify({ email: loginForm.email }));
      window.dispatchEvent(new Event("storage"));
    } else {
      alert("Email yoki parol notoʼgʼri");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("storage"));
    navigate("/login");
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const { email, password, confirm } = registerForm;
    if (password !== confirm) return alert("Parollar mos emas");
    let users = [];
    try {
      users = JSON.parse(localStorage.getItem("users") || "[]");
    } catch {
      users = [];
    }
    if (users.includes(email))
      return alert("Bu email allaqachon roʼyxatdan oʼtgan");

    localStorage.setItem("users", JSON.stringify([...users, email]));
    setShowRegisterModal(false);
    setShowLoginModal(true);
    alert("Muvaffaqiyatli! Endi kirishingiz mumkin.");
  };

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

            {/* Desktop Right */}
            <div className="hidden md:flex items-center space-x-4">
              {isLoggedIn ? (
                <NavLink
                  to="/profile"
                  className="flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-800 p-1 pr-3 rounded-full transition-colors border border-transparent hover:border-gray-200"
                >
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-500" />
                  </div>
                  <div className="flex flex-col items-start leading-none">
                    <span className="text-sm font-bold text-gray-700 dark:text-gray-200">
                      {userInfo.name}
                    </span>
                    {/* <span className="text-[10px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded-full mt-0.5">
                                            {userInfo.bonus.toLocaleString()} so'm
                                        </span> */}
                  </div>
                </NavLink>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition"
                >
                  {t("login")}
                </button>
              )}
            </div>

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
            {isLoggedIn ? (
              <div className="p-6 flex flex-col items-center border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                <div className="w-20 h-20 bg-white border-2 border-white shadow-sm rounded-full flex items-center justify-center mb-3">
                  <User className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                  {userInfo.name}
                </h3>
                <p className="text-gray-500 text-sm mb-3">{userInfo.phone}</p>
                <span className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-bold px-3 py-1 rounded-full">
                  Bonus: {userInfo.bonus.toLocaleString()} so'm
                </span>
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
            ) : (
              <div className="p-6 text-center border-b border-gray-100">
                <button
                  onClick={() => {
                    setShowLoginModal(true);
                    setMenuOpen(false);
                  }}
                  className="w-full bg-green-600 text-white py-3 rounded-xl font-bold"
                >
                  {t("login")}
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

              {isLoggedIn && (
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors mt-4"
                >
                  <span className="font-medium">{t("logout")}</span>
                  <LogOut className="w-5 h-5" />
                </button>
              )}
            </nav>
          </div>
        )}
      </header>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">{t("login")}</h3>
              <button
                onClick={() => setShowLoginModal(false)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                value={loginForm.email}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, email: e.target.value })
                }
                className="w-full p-3 bg-gray-50 rounded-xl border-transparent focus:bg-white focus:ring-2 focus:ring-green-500 transition-all outline-none"
                required
              />
              <input
                type="password"
                placeholder="Parol"
                value={loginForm.password}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, password: e.target.value })
                }
                className="w-full p-3 bg-gray-50 rounded-xl border-transparent focus:bg-white focus:ring-2 focus:ring-green-500 transition-all outline-none"
                required
              />
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition-colors"
              >
                {t("login")}
              </button>
            </form>
            <p className="text-center mt-4 text-sm text-gray-500">
              Akkaunt yo'qmi?{" "}
              <button
                onClick={() => {
                  setShowLoginModal(false);
                  setShowRegisterModal(true);
                }}
                className="text-green-600 font-bold hover:underline"
              >
                {t("register")}
              </button>
            </p>
          </div>
        </div>
      )}

      {/* Register Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">
                {t("register")}
              </h3>
              <button
                onClick={() => setShowRegisterModal(false)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <form onSubmit={handleRegister} className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                value={registerForm.email}
                onChange={(e) =>
                  setRegisterForm({ ...registerForm, email: e.target.value })
                }
                className="w-full p-3 bg-gray-50 rounded-xl border-transparent focus:bg-white focus:ring-2 focus:ring-green-500 transition-all outline-none"
                required
              />
              <input
                type="password"
                placeholder="Parol"
                value={registerForm.password}
                onChange={(e) =>
                  setRegisterForm({ ...registerForm, password: e.target.value })
                }
                className="w-full p-3 bg-gray-50 rounded-xl border-transparent focus:bg-white focus:ring-2 focus:ring-green-500 transition-all outline-none"
                required
              />
              <input
                type="password"
                placeholder="Parolni tasdiqlash"
                value={registerForm.confirm}
                onChange={(e) =>
                  setRegisterForm({ ...registerForm, confirm: e.target.value })
                }
                className="w-full p-3 bg-gray-50 rounded-xl border-transparent focus:bg-white focus:ring-2 focus:ring-green-500 transition-all outline-none"
                required
              />
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition-colors"
              >
                {t("register")}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
