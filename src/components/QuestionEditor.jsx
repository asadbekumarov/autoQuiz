import React, { useRef, useEffect, useState } from "react";
import {
  Plus,
  Calculator,
  Compass,
  CheckCircle2,
  X,
  Trash2,
  Sparkles,
  HelpCircle,
} from "lucide-react";
import MathKeyboard from "./MathKeyboard";
import GeometryDiagram from "./GeometryDiagram";

export default function QuestionEditor({
  currentQuestion,
  setCurrentQuestion,
  questionTouched,
  setQuestionTouched,
  answersTouched,
  setAnswersTouched,
  handleInputChange,
  handleAddQuestion,
  editIndex,
  t,
  focusNextField,
  config,
}) {
  const answerRefs = useRef([]);
  const [showMathKeyboard, setShowMathKeyboard] = useState(false);
  const [currentInput, setCurrentInput] = useState("question");
  const [showDiagramPicker, setShowDiagramPicker] = useState(false);

  // Quick symbols for instant 1-click insertion
  const quickSymbols = [
    { label: "x²", val: "²" },
    { label: "x³", val: "³" },
    { label: "√", val: "√" },
    { label: "π", val: "π" },
    { label: "°", val: "°" },
    { label: "∠", val: "∠" },
    { label: "△", val: "△" },
    { label: "±", val: "±" },
    { label: "½", val: "½" },
    { label: "⊥", val: " ⊥ " },
    { label: "∥", val: " ∥ " },
    { label: "$...$", val: "$$" },
  ];

  const detectMathFormulas = (text) => {
    if (!text) return false;
    const mathPatterns = [
      /\$[^$]+\$/, // $...$
      /\\\(.*?\\\)/, // \(...\)
      /\\\[.*?\\\]/, // \[...\]
      /[²³√π°∠△⊥∥±½⅓¼¾≈≠≤≥∞]/, // Unicode math symbols
    ];
    return mathPatterns.some((pattern) => pattern.test(text));
  };

  const handleMathSymbolInsert = (symbol) => {
    if (currentInput === "question") {
      const newText = (currentQuestion.text || "") + symbol;
      setCurrentQuestion({ ...currentQuestion, text: newText });
      setQuestionTouched(true);
    } else if (typeof currentInput === "number") {
      const newAnswers = [...currentQuestion.answers];
      newAnswers[currentInput] = (newAnswers[currentInput] || "") + symbol;
      setCurrentQuestion({ ...currentQuestion, answers: newAnswers });
      setAnswersTouched(true);
    }
  };

  const openMathKeyboard = (inputType) => {
    setCurrentInput(inputType);
    setShowMathKeyboard(true);
  };

  // Trigger MathJax render when question/answers change
  useEffect(() => {
    if (window.MathJax?.typesetPromise) {
      const timeout = setTimeout(() => {
        window.MathJax.typesetPromise().catch((err) => {
          // ignore typesetting glitches
        });
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [currentQuestion.text, currentQuestion.answers]);

  // Diagram templates
  const diagramTemplates = [
    {
      name: "To'g'ri burchakli uchburchak",
      diagram: {
        type: "right-triangle",
        labels: { a: "a", b: "b", c: "c" },
      },
    },
    {
      name: "Ixtiyoriy uchburchak",
      diagram: {
        type: "triangle",
        labels: { a: "a", b: "b", c: "c", h: true },
      },
    },
    {
      name: "Aylana / Doira",
      diagram: {
        type: "circle",
        labels: { r: "r" },
      },
    },
    {
      name: "To'g'ri to'rtburchak",
      diagram: {
        type: "rectangle",
        labels: { a: "a", b: "b" },
      },
    },
    {
      name: "Trapetsiya",
      diagram: {
        type: "trapezoid",
        labels: { a: "a", b: "b", h: true },
      },
    },
  ];

  return (
    <div className="bg-white border-2 border-emerald-100 rounded-3xl p-5 sm:p-7 space-y-6 mb-6 shadow-sm">
      {/* Quick Math Toolbar */}
      <div className="bg-gradient-to-r from-emerald-50/70 via-teal-50/50 to-blue-50/60 p-3 rounded-2xl border border-emerald-100 flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5 uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5 text-emerald-600" />
            Matematika & Geometriya:
          </span>
          <div className="flex items-center gap-1 overflow-x-auto py-0.5 scrollbar-none">
            {quickSymbols.map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleMathSymbolInsert(s.val)}
                className="px-2 py-1 bg-white hover:bg-emerald-600 hover:text-white border border-emerald-200 text-gray-800 text-xs font-bold rounded-lg shadow-xs transition active:scale-95 cursor-pointer"
                title={`${s.label} belgisini qo'shish`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Open Full Math Keyboard */}
          <button
            type="button"
            onClick={() => openMathKeyboard("question")}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-xs transition active:scale-95 cursor-pointer"
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Formula klaviaturasi</span>
          </button>

          {/* Add Geometry Diagram */}
          <button
            type="button"
            onClick={() => setShowDiagramPicker(!showDiagramPicker)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold shadow-xs transition active:scale-95 cursor-pointer border ${
              currentQuestion.diagram
                ? "bg-amber-100 text-amber-900 border-amber-300 font-bold"
                : "bg-white hover:bg-gray-100 text-gray-700 border-gray-200"
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-amber-600" />
            <span>
              {currentQuestion.diagram ? "Chizma mavjud" : "Chizma qo'shish"}
            </span>
          </button>
        </div>
      </div>

      {/* Geometry Diagram Picker Drawer */}
      {showDiagramPicker && (
        <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-200 animate-in fade-in space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-2">
              <Compass className="w-4 h-4 text-amber-600" />
              Geometrik shakl chizmasini tanlang:
            </h4>
            {currentQuestion.diagram && (
              <button
                type="button"
                onClick={() => {
                  setCurrentQuestion({ ...currentQuestion, diagram: null });
                  setShowDiagramPicker(false);
                }}
                className="text-xs font-semibold text-red-600 hover:text-red-800 flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" /> Chizmani o'chirish
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {diagramTemplates.map((tpl, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setCurrentQuestion({ ...currentQuestion, diagram: tpl.diagram });
                  setShowDiagramPicker(false);
                }}
                className="p-2.5 bg-white hover:bg-amber-100/60 border border-amber-200 rounded-xl flex flex-col items-center gap-2 text-center transition cursor-pointer shadow-xs"
              >
                <GeometryDiagram diagram={tpl.diagram} className="w-20 h-16 pointer-events-none" />
                <span className="text-[11px] font-semibold text-gray-800 line-clamp-1">
                  {tpl.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Attached Diagram Preview if exists */}
      {currentQuestion.diagram && (
        <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-2xl border border-gray-200">
          <div className="bg-white p-2 rounded-xl border border-gray-100 shadow-xs">
            <GeometryDiagram diagram={currentQuestion.diagram} />
          </div>
          <div className="flex-1">
            <div className="text-xs font-bold text-gray-800">
              Ushbu savolga geometrik chizma biriktirilgan
            </div>
            <div className="text-[11px] text-gray-500 mt-0.5">
              Chizma test varaqasida va PDF eksportida savol yonida chiroyli ko'rinishda chiqadi.
            </div>
            <button
              type="button"
              onClick={() => setCurrentQuestion({ ...currentQuestion, diagram: null })}
              className="mt-2 text-xs font-semibold text-red-600 hover:text-red-700 flex items-center gap-1"
            >
              <Trash2 className="w-3 h-3" /> Chizmani olib tashlash
            </button>
          </div>
        </div>
      )}

      {/* Question Text Input */}
      <div className="relative">
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
          Savol matni (LaTeX formulalar uchun $...$ belgisidan foydalaning):
        </label>
        <div className="relative">
          <textarea
            rows={2}
            placeholder={t("questionText") || "Savol matnini kiriting (masalan: Tenglamani yeching: $x^2 - 4 = 0$)"}
            value={currentQuestion.text}
            onChange={(e) => {
              setCurrentQuestion({ ...currentQuestion, text: e.target.value });
              setQuestionTouched(true);
            }}
            onKeyDown={(e) => {
              if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
                e.preventDefault();
                handleAddQuestion();
              }
            }}
            className="w-full p-3.5 rounded-2xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none text-base font-semibold pr-24 transition resize-none"
          />
          <div className="absolute right-3 top-3.5 flex items-center gap-1">
            <button
              type="button"
              onClick={() => openMathKeyboard("question")}
              className="p-1.5 bg-gray-100 hover:bg-emerald-100 text-gray-600 hover:text-emerald-700 rounded-xl transition cursor-pointer"
              title="Matematika va geometriya klaviaturasi"
            >
              <Calculator className="w-4 h-4" />
            </button>
            {detectMathFormulas(currentQuestion.text) && (
              <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-lg text-xs font-bold">
                Formula
              </span>
            )}
          </div>
        </div>

        {/* Live Formula Preview */}
        {detectMathFormulas(currentQuestion.text) && (
          <div className="mt-2 p-2.5 bg-emerald-50/50 rounded-xl border border-emerald-100 text-sm text-gray-800 font-medium">
            <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block mb-1">
              Ko'rinish:
            </span>
            <div className="math-preview">{currentQuestion.text}</div>
          </div>
        )}

        {questionTouched && !currentQuestion.text.trim() && (
          <div className="text-red-600 text-xs mt-1.5 font-semibold">
            {t("enterQuestionText") || "Iltimos, savol matnini kiriting"}
          </div>
        )}
      </div>

      {/* Answer Options */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
          Javob variantlari (To'g'ri javobni tanlash uchun variant harfini bosing):
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {currentQuestion.answers.map((ans, i) => {
            const isCorrect = currentQuestion.correctIndex === i;
            return (
              <div
                key={i}
                className={`p-1.5 rounded-2xl border-2 transition ${
                  isCorrect
                    ? "border-emerald-500 bg-emerald-50/40 shadow-xs"
                    : "border-gray-200 bg-white"
                }`}
              >
                <div className="flex items-center gap-2">
                  {/* Select Correct Answer Button */}
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentQuestion({ ...currentQuestion, correctIndex: i })
                    }
                    className={`w-8 h-8 rounded-xl font-bold text-xs flex items-center justify-center shrink-0 transition cursor-pointer ${
                      isCorrect
                        ? "bg-emerald-600 text-white shadow-xs"
                        : "bg-gray-100 text-gray-600 hover:bg-emerald-100 hover:text-emerald-700"
                    }`}
                    title={isCorrect ? "To'g'ri javob" : "To'g'ri javob qilib belgilash"}
                  >
                    {String.fromCharCode(65 + i)}
                  </button>

                  {/* Answer Input */}
                  <div className="relative flex-1">
                    <input
                      ref={(el) => (answerRefs.current[i] = el)}
                      type="text"
                      placeholder={`${String.fromCharCode(97 + i)}) ${t("answer") || "Javob varianti"}`}
                      value={ans}
                      onChange={(e) => handleInputChange(i, e.target.value)}
                      onKeyDown={(e) => {
                        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
                          e.preventDefault();
                          handleAddQuestion();
                        } else if (e.key === "Enter") {
                          e.preventDefault();
                          if (i < currentQuestion.answers.length - 1) {
                            focusNextField(i);
                          } else {
                            handleAddQuestion();
                          }
                        }
                      }}
                      className="w-full py-2 px-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:outline-none text-sm font-semibold pr-16"
                    />

                    {/* Math symbol button for EVERY answer */}
                    <div className="absolute right-2 top-2 flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => openMathKeyboard(i)}
                        className="p-1 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition cursor-pointer"
                        title="Formula va belgilar kiritish"
                      >
                        <Calculator className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Answer live math preview */}
                {detectMathFormulas(ans) && (
                  <div className="mt-1 px-3 py-1 text-xs text-gray-700 font-medium bg-white/70 rounded-lg">
                    {ans}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {answersTouched &&
        currentQuestion.answers.filter((a) => a.trim()).length < 2 && (
          <div className="text-red-600 text-xs font-semibold">
            {t("atLeastTwoAnswers") || "Kamida 2 ta javob variantini to'ldiring"}
          </div>
        )}

      {/* Add / Update Question & Reset Buttons */}
      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={handleAddQuestion}
          className="flex-1 flex justify-center items-center gap-2 py-3.5 rounded-2xl text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 font-bold text-sm shadow-md shadow-emerald-600/20 transition active:scale-98 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>
            {editIndex !== null
              ? t("updateQuestion") || "Savolni yangilash"
              : t("addQuestion") || "Savolni qo'shish"}
          </span>
          <kbd className="hidden sm:inline-block ml-1.5 px-2 py-0.5 text-[10px] bg-emerald-800/40 rounded-md border border-emerald-400/30 text-emerald-100 font-mono">
            Ctrl + ↵
          </kbd>
        </button>

        {(editIndex !== null || currentQuestion.text.trim()) && (
          <button
            type="button"
            onClick={() => {
              setCurrentQuestion({
                text: "",
                answers: ["", "", "", ""],
                correctIndex: null,
                diagram: null,
              });
              setQuestionTouched(false);
              setAnswersTouched(false);
            }}
            className="px-4 py-3.5 rounded-2xl border border-gray-200 hover:bg-gray-100 text-gray-600 font-semibold text-xs transition cursor-pointer"
            title="Maydonlarni tozalash"
          >
            Tozalash
          </button>
        )}
      </div>

      {/* Full Math Keyboard Modal */}
      <MathKeyboard
        visible={showMathKeyboard}
        targetField={currentInput}
        onInsert={handleMathSymbolInsert}
        onClose={() => setShowMathKeyboard(false)}
      />
    </div>
  );
}
