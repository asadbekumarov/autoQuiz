import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../shared/hooks/useAuth.js";
import { useI18n } from "../../shared/hooks/useI18n.js";

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [role, setRole] = useState("Teacher");
  const [avatarPreview, setAvatarPreview] = useState(null);

  const handleAvatar = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setAvatarPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirm) return;
    login({ email, role, avatar: avatarPreview });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-md p-6 w-full max-w-md space-y-4"
      >
        <h1 className="text-xl font-bold text-gray-800">{t("register")}</h1>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("email")}
          className="w-full p-3 rounded-lg border"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t("password")}
          className="w-full p-3 rounded-lg border"
          required
        />
        <input
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder={t("confirm")}
          className="w-full p-3 rounded-lg border"
          required
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-3 rounded-lg border"
        >
          <option value="Teacher">{t("roleTeacher")}</option>
          <option value="Tutor">{t("roleTutor")}</option>
          <option value="Other">{t("roleOther")}</option>
        </select>
        <div>
          <label className="block text-sm text-gray-700 mb-2">
            {t("avatar")}
          </label>
          <input type="file" accept="image/*" onChange={handleAvatar} />
          {avatarPreview && (
            <img
              src={avatarPreview}
              alt="avatar"
              className="mt-2 w-16 h-16 rounded-full object-cover"
            />
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg"
        >
          {t("register")}
        </button>
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg"
        >
          {t("goLogin")}
        </button>
      </form>
    </div>
  );
}
