import React, { useEffect, useMemo, useState } from "react";
import { AuthContext } from "./authContextCore.js";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const saved = localStorage.getItem("user");
        setUser(saved ? JSON.parse(saved) : null);
      } catch {
        setUser(null);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const login = (userData) => {
    const formattedUser = {
      name: userData.name || userData.email?.split("@")[0] || "O'qituvchi",
      email: userData.email,
      role: userData.role || "Teacher",
      avatar: userData.avatar || null,
      phone: userData.phone || "+998 90 123 45 67",
      bonus: userData.bonus ?? 1000,
      id: userData.id || Date.now(),
    };
    setUser(formattedUser);
    localStorage.setItem("user", JSON.stringify(formattedUser));
    window.dispatchEvent(new Event("storage"));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("storage"));
  };

  const updateProfile = (updates) => {
    setUser((prev) => {
      const updated = { ...(prev || {}), ...updates };
      localStorage.setItem("user", JSON.stringify(updated));
      window.dispatchEvent(new Event("storage"));
      return updated;
    });
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      login,
      logout,
      updateProfile,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
