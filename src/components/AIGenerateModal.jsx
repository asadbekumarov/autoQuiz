import React, { useState } from "react";
import {
  Sparkles,
  CheckCircle,
  AlertCircle,
  X,
  Loader2,
  ArrowRight,
} from "lucide-react";
import { generateQuizWithGemini } from "../services/aiService.js";
import { useI18n } from "../shared/hooks/useI18n.js";

export default function AIGenerateModal({ isOpen, onClose, onImportQuestions }) {
  const { t, lang: appLang } = useI18n();

  const [topic, setTopic] = useState("");
  const [subject, setSubject] = useState("Fizika");
  const [grade, setGrade] = useState("9-sinf");
  const [count, setCount] = useState(5);
  const [lang, setLang] = useState(appLang || "uz");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [generatedQuestions, setGeneratedQuestions] = useState([]);

  if (!isOpen) return null;

  const handleGenerate = async (e) => {
    e.preventDefault();
    setError("");

    if (!topic.trim()) {
      setError("Iltimos, test mavzusini kiriting (masalan: Kvant fizikasi yoki Amir Temur davri).");
      return;
    }

    setLoading(true);
    setGeneratedQuestions([]);

    try {
      const results = await generateQuizWithGemini({
        topic: topic.trim(),
        subject,
        grade,
        count: Number(count),
        lang,
      });

      setGeneratedQuestions(results);
    } catch (err) {
      setError(err.message || "Test generatsiya qilishda xatolik yuz berdi.");
    } finally {
      setLoading(false);
    }
  };

  const handleApplyToTest = () => {
    if (generatedQuestions.length === 0) return;
    onImportQuestions(generatedQuestions, {
      subject,
      topic,
      testName: `${topic} (${grade})`,
    });
    onClose();
    setGeneratedQuestions([]);
    setTopic("");
  };

  const subjectsList = [
    "Matematika",
    "Fizika",
    "Kimyo",
    "Biologiya",
    "Tarix",
    "Ona tili va Adabiyot",
    "Ingliz tili",
    "Geografiya",
    "Informatika",
    "Boshqa",
  ];

  const gradesList = [
    "5-6 sinf",
    "7-8 sinf",
    "9-sinf",
    "10-11 sinf",
    "DTM / Kirish imtihonlari",
    "Olimpiada / Murakkab",
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-purple-50 via-green-50 to-emerald-50">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-green-600 text-white flex items-center justify-center shadow-lg shadow-purple-600/25">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-gray-900 flex items-center gap-2">
                <span>Gemini AI Test Generatori</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">
                  Google GenAI
                </span>
              </h3>
              <p className="text-xs text-gray-500">
                Mavzu bo'yicha professional test savollarini soniyalar ichida yarating
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          {/* Form */}
          <form onSubmit={handleGenerate} className="space-y-4">
            {/* Topic Input */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                Test Mavzusi *
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Masalan: JavaScript o'zgaruvchilar va ma'lumot turlari..."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-semibold text-gray-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                required
              />
            </div>

            {/* Subject & Grade Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Fan
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs sm:text-sm font-semibold text-gray-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {subjectsList.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Sinf / Daraja
                </label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs sm:text-sm font-semibold text-gray-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {gradesList.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Question count & Language */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Savollar soni
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[5, 10, 15, 20].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setCount(num)}
                      className={`py-2 rounded-xl text-xs font-bold border transition ${
                        count === num
                          ? "bg-purple-600 text-white border-purple-600 shadow-sm"
                          : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      {num} ta
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Test tili
                </label>
                <select
                  value={lang}
                  onChange={(e) => setLang(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs sm:text-sm font-semibold text-gray-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="uz">🇺🇿 O'zbekcha (Lotin)</option>
                  <option value="ru">🇷🇺 Русский</option>
                  <option value="en">🇬🇧 English</option>
                </select>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 animate-in fade-in">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Generate Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-green-600 hover:from-purple-700 hover:to-green-700 text-white font-bold rounded-2xl text-sm shadow-lg shadow-purple-600/25 flex items-center justify-center gap-2 transition active:scale-95 disabled:opacity-70 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Gemini AI testlarni tuzmoqda...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Testni Sun'iy Intellekt orqali yaratish ({count} ta savol)</span>
                </>
              )}
            </button>
          </form>

          {/* Generated Questions Preview */}
          {generatedQuestions.length > 0 && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  AI tayyorlagan savollar ({generatedQuestions.length} ta):
                </span>
              </div>

              <div className="max-h-60 overflow-y-auto space-y-2.5 pr-1">
                {generatedQuestions.map((q, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl border border-gray-200 bg-gray-50/70 text-xs space-y-2"
                  >
                    <p className="font-bold text-gray-900">
                      {idx + 1}. {q.text}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pl-2">
                      {q.answers.map((ans, aIdx) => (
                        <div
                          key={aIdx}
                          className={`p-1.5 rounded-lg ${
                            q.correctIndex === aIdx
                              ? "bg-green-100 text-green-900 font-bold border border-green-200"
                              : "text-gray-600"
                          }`}
                        >
                          {String.fromCharCode(65 + aIdx)}) {ans}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-gray-600 hover:bg-gray-200 rounded-xl transition"
          >
            {t("close")}
          </button>

          {generatedQuestions.length > 0 && (
            <button
              onClick={handleApplyToTest}
              className="px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-green-600 hover:bg-green-700 rounded-2xl shadow-md shadow-green-600/20 flex items-center gap-1.5 transition active:scale-95 cursor-pointer"
            >
              <span>Testga qo'shish ({generatedQuestions.length})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
