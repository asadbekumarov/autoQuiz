import { useEffect, useState } from "react";
import uz from "../../i18n/uz.json";
import en from "../../i18n/en.json";

export function useI18n() {
  const [lang, setLang] = useState(() => {
    const raw = localStorage.getItem("settings");
    const s = raw ? JSON.parse(raw) : {};
    return s.language || "uz";
  });

  useEffect(() => {
    const raw = localStorage.getItem("settings");
    const s = raw ? JSON.parse(raw) : {};
    s.language = lang;
    localStorage.setItem("settings", JSON.stringify(s));
  }, [lang]);

  const dict = { uz, en };
  const t = (key) => dict[lang]?.[key] ?? key;

  return { lang, setLang, t };
}
