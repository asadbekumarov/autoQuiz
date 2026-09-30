import React, { useState } from "react";
import { Sparkles, FileText, CheckCircle2, AlertCircle, X } from "lucide-react";
import { useI18n } from "../shared/hooks/useI18n.js";

export default function SmartImportModal({ isOpen, onClose, onImport }) {
  const { t } = useI18n();
  const [rawText, setRawText] = useState("");
  const [parsedQuestions, setParsedQuestions] = useState([]);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const parseText = (text) => {
    setError("");
    if (!text.trim()) {
      setParsedQuestions([]);
      return;
    }

    // Split text by lines
    const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    const questions = [];
    let currentQ = null;

    const questionStartRegex = /^(?:(\d+)[.)]\s*|\b(?:Savol|Вопрос|Question)\s*\d*[:.)]\s*)(.+)/i;
    const optionRegex = /^([A-Fa-fА-Яа-я1-6])[.)-]\s*(.+)/;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const qMatch = line.match(questionStartRegex);
      const optMatch = line.match(optionRegex);

      if (qMatch) {
        // If we already had a question, push it
        if (currentQ && currentQ.text && currentQ.answers.length >= 2) {
          questions.push(currentQ);
        }
        currentQ = {
          id: Date.now() + Math.random(),
          text: qMatch[2].endsWith("?") ? qMatch[2] : qMatch[2] + "?",
          answers: [],
          correctIndex: null,
        };
      } else if (optMatch && currentQ) {
        let answerText = optMatch[2];
        let isCorrect = false;

        // Check if answer contains marker like * or + or (to'g'ri)
        if (answerText.includes("*") || line.startsWith("+") || answerText.toLowerCase().includes("(to'g'ri)") || answerText.toLowerCase().includes("(правильно)")) {
          isCorrect = true;
          answerText = answerText
            .replace(/\*/g, "")
            .replace(/\(to'g'ri\)/gi, "")
            .replace(/\(правильно\)/gi, "")
            .replace(/\(correct\)/gi, "")
            .trim();
        }

        currentQ.answers.push(answerText);
        if (isCorrect && currentQ.correctIndex === null) {
          currentQ.correctIndex = currentQ.answers.length - 1;
        }
      } else if (currentQ && currentQ.answers.length === 0) {
        // Multi-line question continuation
        currentQ.text += " " + line;
      }
    }

    // Push the last question
    if (currentQ && currentQ.text && currentQ.answers.length >= 2) {
      questions.push(currentQ);
    }

    if (questions.length === 0) {
      setError("Savollar formatini aniqlab bo'lmadi. Iltimos, namunadagidek kiriting.");
    }

    setParsedQuestions(questions);
  };

  const handleApply = () => {
    if (parsedQuestions.length === 0) return;
    onImport(parsedQuestions);
    onClose();
    setRawText("");
    setParsedQuestions([]);
  };

  const sampleTemplate = `1. O'zbekiston Respublikasining poytaxti qaysi shahar?
A) Toshkent*
B) Samarqand
C) Buxoro
D) Xiva

2. Quyosh sistemasidagi eng katta sayyora qaysi?
A) Mars
B) Yupiter*
C) Saturn
D) Yer`;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-gray-100 animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-green-50/60 to-emerald-50/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-green-600 text-white flex items-center justify-center shadow-md shadow-green-600/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900">{t("smartImport")}</h3>
              <p className="text-xs text-gray-500">{t("smartImportDesc")}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-sm font-semibold text-gray-700">
              Savollar matnini shu yerga qo'ying:
            </label>
            <button
              type="button"
              onClick={() => {
                setRawText(sampleTemplate);
                parseText(sampleTemplate);
              }}
              className="text-xs text-green-600 font-semibold hover:underline"
            >
              Namunani ko'rish
            </button>
          </div>

          <textarea
            rows={7}
            value={rawText}
            onChange={(e) => {
              setRawText(e.target.value);
              parseText(e.target.value);
            }}
            placeholder={`1. Savol matni?\nA) 1-javob*\nB) 2-javob\nC) 3-javob\nD) 4-javob\n\n* Belgisi to'g'ri javobni ifodalaydi.`}
            className="w-full p-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 font-mono text-xs leading-relaxed bg-gray-50"
          />

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Parsed Preview */}
          {parsedQuestions.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  Muvaffaqiyatli aniqlandi ({parsedQuestions.length} ta savol):
                </span>
              </div>

              <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
                {parsedQuestions.map((q, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl border border-gray-100 bg-gray-50/70 text-xs space-y-1.5"
                  >
                    <p className="font-semibold text-gray-800">
                      {idx + 1}. {q.text}
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-gray-600 pl-2">
                      {q.answers.map((ans, aIdx) => (
                        <span
                          key={aIdx}
                          className={`${
                            q.correctIndex === aIdx
                              ? "text-green-700 font-bold bg-green-100/60 px-1.5 py-0.5 rounded"
                              : ""
                          }`}
                        >
                          {String.fromCharCode(65 + aIdx)}) {ans}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-200 rounded-xl transition"
          >
            {t("close")}
          </button>
          <button
            onClick={handleApply}
            disabled={parsedQuestions.length === 0}
            className="px-5 py-2 text-sm font-semibold text-white bg-green-600 hover:bg-green-700 rounded-xl transition shadow-md shadow-green-600/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            Qo'shish ({parsedQuestions.length})
          </button>
        </div>
      </div>
    </div>
  );
}
