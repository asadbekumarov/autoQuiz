import React, { useState } from "react";
import {
  Calculator,
  Compass,
  Variable,
  Code2,
  X,
  Sparkles,
  Layers,
} from "lucide-react";

export default function MathKeyboard({ onInsert, visible, onClose, targetField = "question" }) {
  const [activeTab, setActiveTab] = useState("algebra");

  if (!visible) return null;

  const categories = {
    arithmetic: {
      name: "Arifmetika & Kasr",
      icon: Calculator,
      symbols: [
        { label: "+", insert: " + " },
        { label: "-", insert: " - " },
        { label: "×", insert: " × " },
        { label: "÷", insert: " ÷ " },
        { label: "=", insert: " = " },
        { label: "≠", insert: " ≠ " },
        { label: "±", insert: " ± " },
        { label: "≈", insert: " ≈ " },
        { label: "<", insert: " < " },
        { label: ">", insert: " > " },
        { label: "≤", insert: " ≤ " },
        { label: "≥", insert: " ≥ " },
        { label: "½", insert: "½" },
        { label: "⅓", insert: "⅓" },
        { label: "¼", insert: "¼" },
        { label: "¾", insert: "¾" },
        { label: "%", insert: "%" },
        { label: "( )", insert: "()" },
        { label: "[ ]", insert: "[]" },
        { label: "{ }", insert: "{}" },
      ],
      templates: [
        { label: "Oddiy kasr (a/b)", insert: "a/b" },
        { label: "Tenglik a = b", insert: "a = b" },
        { label: "Foiz a%", insert: "20%" },
      ],
    },
    algebra: {
      name: "Algebra & Daraja",
      icon: Variable,
      symbols: [
        { label: "x²", insert: "²" },
        { label: "x³", insert: "³" },
        { label: "xⁿ", insert: "^n" },
        { label: "√", insert: "√" },
        { label: "∛", insert: "∛" },
        { label: "|x|", insert: "|x|" },
        { label: "x", insert: "x" },
        { label: "y", insert: "y" },
        { label: "z", insert: "z" },
        { label: "a", insert: "a" },
        { label: "b", insert: "b" },
        { label: "c", insert: "c" },
        { label: "n", insert: "n" },
        { label: "k", insert: "k" },
        { label: "∞", insert: "∞" },
        { label: "∈", insert: " ∈ " },
        { label: "∉", insert: " ∉ " },
        { label: "∪", insert: " ∪ " },
        { label: "∩", insert: " ∩ " },
        { label: "∅", insert: "∅" },
        { label: "f(x)", insert: "f(x)" },
        { label: "log", insert: "log" },
        { label: "ln", insert: "ln" },
        { label: "lim", insert: "lim" },
      ],
      templates: [
        { label: "Kvadrat tenglama", insert: "ax² + bx + c = 0" },
        { label: "Diskriminant (D)", insert: "D = b² - 4ac" },
        { label: "Qisqa ko'paytirish (a+b)²", insert: "(a + b)² = a² + 2ab + b²" },
        { label: "Kvadratlar ayirmasi a²-b²", insert: "a² - b² = (a - b)(a + b)" },
        { label: "Tenglamalar sistemasi", insert: "{ 2x + y = 5; x - y = 1 }" },
      ],
    },
    geometry: {
      name: "Geometriya & Burchak",
      icon: Compass,
      symbols: [
        { label: "° (gradus)", insert: "°" },
        { label: "∠ (burchak)", insert: "∠" },
        { label: "△ (uchburchak)", insert: "△" },
        { label: "□ (to'rtburchak)", insert: "□" },
        { label: "○ (aylana)", insert: "○" },
        { label: "⊥ (perpendikulyar)", insert: " ⊥ " },
        { label: "∥ (parallel)", insert: " ∥ " },
        { label: "≅ (kongruent)", insert: " ≅ " },
        { label: "~ (o'xshash)", insert: " ~ " },
        { label: "π (pi)", insert: "π" },
        { label: "S (yuza)", insert: "S" },
        { label: "P (perimetr)", insert: "P" },
        { label: "V (hajm)", insert: "V" },
        { label: "r (radius)", insert: "r" },
        { label: "R (katta radius)", insert: "R" },
        { label: "h (balandlik)", insert: "h" },
      ],
      templates: [
        { label: "Pifagor teoremasi", insert: "a² + b² = c²" },
        { label: "Uchburchak yuzi S", insert: "S = ½ · a · h" },
        { label: "Aylana yuzi S", insert: "S = πr²" },
        { label: "Aylana uzunligi C", insert: "C = 2πr" },
        { label: "To'g'ri to'rtburchak P", insert: "P = 2(a + b)" },
        { label: "Trapetsiya yuzi S", insert: "S = ((a + b) / 2) · h" },
        { label: "Ichki burchaklar yig'indisi", insert: "∠A + ∠B + ∠C = 180°" },
      ],
    },
    trigonometry: {
      name: "Trigonometriya & Yunon",
      icon: Layers,
      symbols: [
        { label: "sin", insert: "sin " },
        { label: "cos", insert: "cos " },
        { label: "tg", insert: "tg " },
        { label: "ctg", insert: "ctg " },
        { label: "arcsin", insert: "arcsin " },
        { label: "arccos", insert: "arccos " },
        { label: "α (alfa)", insert: "α" },
        { label: "β (beta)", insert: "β" },
        { label: "γ (gamma)", insert: "γ" },
        { label: "δ (delta)", insert: "δ" },
        { label: "θ (teta)", insert: "θ" },
        { label: "φ (fi)", insert: "φ" },
        { label: "λ (lambda)", insert: "λ" },
        { label: "Δ (katta delta)", insert: "Δ" },
        { label: "π (pi)", insert: "π" },
        { label: "rad", insert: " rad" },
      ],
      templates: [
        { label: "Asosiy ayniyat", insert: "sin²α + cos²α = 1" },
        { label: "Tangens", insert: "tg α = sin α / cos α" },
        { label: "Sinuslar teoremasi", insert: "a / sin α = 2R" },
        { label: "Kosinuslar teoremasi", insert: "c² = a² + b² - 2ab · cos γ" },
      ],
    },
    latex: {
      name: "LaTeX & Formulalar",
      icon: Code2,
      symbols: [
        { label: "$...$ (Inline)", insert: "$$" },
        { label: "$$...$$ (Display)", insert: "$$\n\n$$" },
        { label: "\\frac{a}{b}", insert: "$\\frac{a}{b}$" },
        { label: "\\sqrt{x}", insert: "$\\sqrt{x}$" },
        { label: "\\sqrt[n]{x}", insert: "$\\sqrt[n]{x}$" },
        { label: "x^{n}", insert: "$x^{n}$" },
        { label: "x_{n}", insert: "$x_{n}$" },
        { label: "\\sum", insert: "$\\sum_{i=1}^{n}$" },
        { label: "\\int", insert: "$\\int_{a}^{b} f(x)dx$" },
        { label: "\\alpha", insert: "$\\alpha$" },
        { label: "\\beta", insert: "$\\beta$" },
        { label: "\\theta", insert: "$\\theta$" },
        { label: "\\pi", insert: "$\\pi$" },
        { label: "\\le (≤)", insert: "$\\le$" },
        { label: "\\ge (≥)", insert: "$\\ge$" },
        { label: "\\ne (≠)", insert: "$\\ne$" },
      ],
      templates: [
        { label: "LaTeX Kvadrat tenglama", insert: "$ax^2 + bx + c = 0$" },
        { label: "LaTeX Ildiz formulasi", insert: "$x = \\frac{-b \\pm \\sqrt{D}}{2a}$" },
        { label: "LaTeX Kasrlar yig'indisi", insert: "$\\frac{a}{b} + \\frac{c}{d} = \\frac{ad + bc}{bd}$" },
        { label: "LaTeX Integral", insert: "$\\int x^n dx = \\frac{x^{n+1}}{n+1} + C$" },
      ],
    },
  };

  const currentCategory = categories[activeTab];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-3 animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-emerald-50 via-teal-50 to-blue-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-700 text-white flex items-center justify-center shadow-md shadow-emerald-600/20">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
                Matematika, Algebra va Geometriya Klaviaturasi
                <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
                  {targetField === "question" ? "Savol uchun" : `${targetField + 1}-variant`}
                </span>
              </h3>
              <p className="text-xs text-gray-500">
                Belgini bosing — u avtomatik matnga kiritiladi
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-100 bg-gray-50/70 px-3 pt-2 gap-1 overflow-x-auto scrollbar-none">
          {Object.entries(categories).map(([key, cat]) => {
            const Icon = cat.icon;
            const isActive = activeTab === key;
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-t-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition cursor-pointer ${
                  isActive
                    ? "bg-white text-emerald-700 shadow-xs border-t-2 border-emerald-600"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-emerald-600" : "text-gray-400"}`} />
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4">
          {/* Symbols Grid */}
          <div>
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2.5">
              Belgilar va Operatorlar
            </h4>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
              {currentCategory.symbols.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => onInsert(item.insert)}
                  className="h-11 flex items-center justify-center bg-gray-50 hover:bg-emerald-50 hover:border-emerald-300 border border-gray-200 rounded-xl text-base font-bold text-gray-800 hover:text-emerald-700 transition active:scale-95 shadow-xs cursor-pointer"
                  title={item.label}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Pre-made Templates / Formulas */}
          {currentCategory.templates && currentCategory.templates.length > 0 && (
            <div className="pt-2 border-t border-gray-100">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Tayyor formula va qoidalar
              </h4>
              <div className="flex flex-wrap gap-2">
                {currentCategory.templates.map((tpl, idx) => (
                  <button
                    key={idx}
                    onClick={() => onInsert(tpl.insert)}
                    className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 rounded-xl text-xs font-medium transition cursor-pointer hover:border-emerald-300"
                  >
                    <span className="font-bold mr-1.5">{tpl.label}:</span>
                    <span className="font-mono text-emerald-700">{tpl.insert}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 px-5">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            MathJax LaTeX formulalari ($...$) avtomatik chiroyli ko'rinishda render qilinadi
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl font-semibold transition"
          >
            Yopish
          </button>
        </div>
      </div>
    </div>
  );
}
