import { useEffect, useState, useCallback } from "react";
import uz from "../../i18n/uz.json";
import ru from "../../i18n/ru.json";
import en from "../../i18n/en.json";

const dictionaries = { uz, ru, en };

export function useI18n() {
  const [lang, setLangState] = useState(() => {
    try {
      const raw = localStorage.getItem("settings");
      const s = raw ? JSON.parse(raw) : {};
      return s.language || "uz";
    } catch {
      return "uz";
    }
  });

  useEffect(() => {
    const handleSettingsChanged = () => {
      try {
        const raw = localStorage.getItem("settings");
        const s = raw ? JSON.parse(raw) : {};
        if (s.language && s.language !== lang) {
          setLangState(s.language);
        }
      } catch {
        // fallback
      }
    };

    window.addEventListener("settingsChanged", handleSettingsChanged);
    window.addEventListener("storage", handleSettingsChanged);
    return () => {
      window.removeEventListener("settingsChanged", handleSettingsChanged);
      window.removeEventListener("storage", handleSettingsChanged);
    };
  }, [lang]);

  const setLang = useCallback((newLang) => {
    try {
      const raw = localStorage.getItem("settings");
      const s = raw ? JSON.parse(raw) : {};
      s.language = newLang;
      localStorage.setItem("settings", JSON.stringify(s));
      setLangState(newLang);
      window.dispatchEvent(new Event("settingsChanged"));
      window.dispatchEvent(new Event("storage"));
    } catch (err) {
      console.warn("Language update failed", err);
    }
  }, []);

  const t = useCallback(
    (key) => {
      const dict = dictionaries[lang] || dictionaries.uz;
      return dict[key] ?? dictionaries.uz[key] ?? key;
    },
    [lang]
  );

  return { lang, setLang, t };
}
