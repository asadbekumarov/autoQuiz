import React, { useState, useEffect } from "react";
import {
  User,
  ChevronRight,
  Globe,
  Info,
  LogOut,
  FileText,
  Briefcase,
  Phone,
  Mail,
  Edit2,
  Check,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../shared/hooks/useAuth.js";
import { useI18n } from "../shared/hooks/useI18n.js";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, logout, updateProfile } = useAuth();
  const { lang, setLang, t } = useI18n();

  const [testCount, setTestCount] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [showLangModal, setShowLangModal] = useState(false);

  useEffect(() => {
    try {
      const tests = JSON.parse(localStorage.getItem("savedTests") || "[]");
      setTestCount(tests.length);
    } catch {
      setTestCount(0);
    }

    if (user) {
      setEditName(user.name || "");
      setEditPhone(user.phone || "");
    }
  }, [user]);

  const handleSaveProfile = () => {
    updateProfile({
      name: editName.trim() || user?.name,
      phone: editPhone.trim() || user?.phone,
    });
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const languages = [
    { code: "uz", label: "O'zbekcha", flag: "🇺🇿" },
    { code: "ru", label: "Русский", flag: "🇷🇺" },
    { code: "en", label: "English", flag: "🇬🇧" },
  ];

  return (
    <div className="min-h-[85vh] bg-gradient-to-br from-green-50/50 via-gray-50 to-blue-50/40 p-4 py-8">
      <div className="max-w-md mx-auto space-y-6">
        {/* Profile Card Section */}
        <div className="bg-white rounded-3xl p-6 shadow-xl shadow-green-900/5 border border-gray-100 flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-r from-green-600 to-emerald-500 opacity-90" />

          {/* Avatar */}
          <div className="relative z-10 mt-6 mb-3">
            <div className="w-24 h-24 bg-white p-1 rounded-full shadow-lg">
              <div className="w-full h-full bg-gradient-to-tr from-green-500 to-emerald-400 rounded-full flex items-center justify-center text-white text-3xl font-extrabold shadow-inner">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </div>
            </div>
          </div>

          {/* User Details / Edit Mode */}
          {isEditing ? (
            <div className="w-full space-y-3 mt-2">
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder={t("fullName")}
                className="w-full p-2.5 text-center text-base font-bold bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="text"
                value={editPhone}
                onChange={(e) => setEditPhone(e.target.value)}
                placeholder={t("phone")}
                className="w-full p-2 text-center text-sm bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <div className="flex gap-2 justify-center pt-1">
                <button
                  onClick={handleSaveProfile}
                  className="px-4 py-1.5 bg-green-600 text-white rounded-xl text-sm font-semibold flex items-center gap-1 hover:bg-green-700"
                >
                  <Check className="w-4 h-4" /> {t("save")}
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-1.5 bg-gray-200 text-gray-700 rounded-xl text-sm font-semibold flex items-center gap-1 hover:bg-gray-300"
                >
                  <X className="w-4 h-4" /> {t("close")}
                </button>
              </div>
            </div>
          ) : (
            <div className="w-full flex flex-col items-center">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-gray-900">{user?.name}</h2>
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-1 text-gray-400 hover:text-green-600 rounded-lg hover:bg-gray-100 transition"
                  title="Tahrirlash"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>

              <p className="text-gray-500 text-sm font-medium mt-0.5">{user?.email}</p>
              <p className="text-gray-400 text-xs mt-0.5">{user?.phone || "+998 90 123 45 67"}</p>

              {/* Badges */}
              <div className="flex items-center gap-2 mt-4">
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5" />
                  {user?.role === "Teacher"
                    ? t("roleTeacher")
                    : user?.role === "Tutor"
                    ? t("roleTutor")
                    : t("roleOther")}
                </span>
                <span className="bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1 rounded-full text-xs font-semibold">
                  {t("bonus")}: {(user?.bonus || 1000).toLocaleString()} {t("som")}
                </span>
              </div>
            </div>
          )}

          {/* Quick stats grid */}
          <div className="grid grid-cols-2 gap-3 w-full mt-6 pt-5 border-t border-gray-100">
            <div
              onClick={() => navigate("/my-tests")}
              className="p-3 bg-gray-50 hover:bg-green-50/60 rounded-2xl cursor-pointer transition text-center border border-gray-100"
            >
              <p className="text-2xl font-black text-green-600">{testCount}</p>
              <p className="text-xs text-gray-500 font-medium mt-0.5">{t("mytests")}</p>
            </div>
            <div
              onClick={() => navigate("/create")}
              className="p-3 bg-gray-50 hover:bg-blue-50/60 rounded-2xl cursor-pointer transition text-center border border-gray-100"
            >
              <p className="text-2xl font-black text-blue-600">+</p>
              <p className="text-xs text-gray-500 font-medium mt-0.5">{t("create")}</p>
            </div>
          </div>
        </div>

        {/* Menu Section */}
        <div className="bg-white rounded-3xl shadow-xl shadow-green-900/5 border border-gray-100 overflow-hidden">
          <div className="divide-y divide-gray-100">
            {/* My Tests Link */}
            <button
              onClick={() => navigate("/my-tests")}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-50 rounded-2xl flex items-center justify-center text-green-600">
                  <FileText className="w-5 h-5" />
                </div>
                <span className="font-semibold text-sm text-gray-700">{t("mytests")}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            {/* Language */}
            <button
              onClick={() => setShowLangModal(!showLangModal)}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                  <Globe className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="font-semibold text-sm text-gray-700 block">
                    {t("selectLang")}
                  </span>
                  <span className="text-xs text-gray-400">
                    {languages.find((l) => l.code === lang)?.label}
                  </span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            {/* About */}
            <button
              onClick={() => navigate("/about")}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600">
                  <Info className="w-5 h-5" />
                </div>
                <span className="font-semibold text-sm text-gray-700">{t("about")}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-between p-4 hover:bg-red-50/50 transition-colors text-red-600"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-50 rounded-2xl flex items-center justify-center text-red-600">
                  <LogOut className="w-5 h-5" />
                </div>
                <span className="font-semibold text-sm">{t("logout")}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-red-300" />
            </button>
          </div>
        </div>

        {/* Language Modal */}
        {showLangModal && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-6 max-w-xs w-full shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-gray-900 text-center">
                {t("selectLang")}
              </h3>
              <div className="space-y-2">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLang(l.code);
                      setShowLangModal(false);
                    }}
                    className={`w-full flex items-center justify-between p-3.5 rounded-2xl border text-sm font-semibold transition ${
                      lang === l.code
                        ? "bg-green-50 border-green-500 text-green-700"
                        : "border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="text-lg">{l.flag}</span>
                      <span>{l.label}</span>
                    </span>
                    {lang === l.code && <Check className="w-4 h-4 text-green-600" />}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowLangModal(false)}
                className="w-full py-2.5 rounded-xl bg-gray-100 text-gray-700 text-sm font-semibold hover:bg-gray-200"
              >
                {t("close")}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
