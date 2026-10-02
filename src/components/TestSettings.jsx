import React from "react";
import { Check, Sparkles, Columns, Code2, BookOpen } from "lucide-react";

export default function TestSettings({ config, setConfig, t }) {
  const quickSubjects = [
    "Matematika",
    "Algebra",
    "Geometriya",
    "Fizika",
    "Kimyo",
    "Informatika",
  ];

  return (
    <div className="space-y-4">
      {/* Quick Subject Selectors */}
      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
          Fanni tezkor tanlash:
        </label>
        <div className="flex flex-wrap gap-2">
          {quickSubjects.map((sub) => {
            const isSelected = config.subject === sub;
            return (
              <button
                key={sub}
                type="button"
                onClick={() => setConfig({ ...config, subject: sub })}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition active:scale-95 cursor-pointer border ${
                  isSelected
                    ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                    : "bg-white text-gray-700 border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50"
                }`}
              >
                {sub === "Matematika" && "🔢 "}
                {sub === "Algebra" && "📈 "}
                {sub === "Geometriya" && "📐 "}
                {sub}
              </button>
            );
          })}
        </div>
      </div>

      {/* Basic Inputs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            {t("school") || "Maktab / Muassasa"}
          </label>
          <input
            type="text"
            placeholder={t("school") || "№1 umumta'lim maktabi"}
            value={config.school || ""}
            onChange={(e) => setConfig({ ...config, school: e.target.value })}
            className="w-full p-2.5 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none text-xs sm:text-sm font-medium"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            {t("subject") || "Fan nomi"}
          </label>
          <input
            type="text"
            placeholder={t("subject") || "Matematika / Geometriya"}
            value={config.subject || ""}
            onChange={(e) => setConfig({ ...config, subject: e.target.value })}
            className="w-full p-2.5 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none text-xs sm:text-sm font-medium"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            {t("class") || "Sinf"}
          </label>
          <input
            type="text"
            placeholder={t("class") || "8-A sinf"}
            value={config.className || ""}
            onChange={(e) => setConfig({ ...config, className: e.target.value })}
            className="w-full p-2.5 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none text-xs sm:text-sm font-medium"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            {t("date") || "Sana"}
          </label>
          <input
            type="date"
            value={config.date || ""}
            onChange={(e) => setConfig({ ...config, date: e.target.value })}
            className="w-full p-2.5 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none text-xs sm:text-sm font-medium"
          />
        </div>
      </div>

      {/* Toggles (LaTeX & 2-column layout) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        <label className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-gray-200 hover:border-emerald-300 transition cursor-pointer">
          <input
            type="checkbox"
            checked={Boolean(config.latexEnabled)}
            onChange={(e) =>
              setConfig({ ...config, latexEnabled: e.target.checked })
            }
            className="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500 cursor-pointer"
          />
          <div>
            <div className="text-xs sm:text-sm font-bold text-gray-900 flex items-center gap-1.5">
              <Code2 className="w-4 h-4 text-emerald-600" />
              LaTeX & MathJax formulalari
            </div>
            <div className="text-[11px] text-gray-500">
              Formulalarni ($...$ yoki \[...\]) professional matematik shriftda render qilish
            </div>
          </div>
        </label>

        <label className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-gray-200 hover:border-emerald-300 transition cursor-pointer">
          <input
            type="checkbox"
            checked={Boolean(config.twoColumns)}
            onChange={(e) =>
              setConfig({ ...config, twoColumns: e.target.checked })
            }
            className="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500 cursor-pointer"
          />
          <div>
            <div className="text-xs sm:text-sm font-bold text-gray-900 flex items-center gap-1.5">
              <Columns className="w-4 h-4 text-emerald-600" />
              Ikki ustunli (A4 format) ko'rinish
            </div>
            <div className="text-[11px] text-gray-500">
              A4 varag'ida savollarni ixcham joylashtirish (qog'ozni tejaydi)
            </div>
          </div>
        </label>
      </div>
    </div>
  );
}
