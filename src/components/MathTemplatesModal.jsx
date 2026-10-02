import React, { useState } from "react";
import {
  Compass,
  Calculator,
  Binary,
  Sigma,
  CheckCircle2,
  X,
  Sparkles,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import { mathSubjectPresets } from "../data/mathSubjectPresets";
import GeometryDiagram from "./GeometryDiagram";

export default function MathTemplatesModal({ isOpen, onClose, onApplyTemplate }) {
  const [selectedPresetId, setSelectedPresetId] = useState(mathSubjectPresets[0].id);

  if (!isOpen) return null;

  const currentPreset =
    mathSubjectPresets.find((p) => p.id === selectedPresetId) ||
    mathSubjectPresets[0];

  const getIcon = (iconName) => {
    switch (iconName) {
      case "Calculator":
        return Calculator;
      case "Binary":
        return Binary;
      case "Triangle":
        return Compass;
      case "Sigma":
        return Sigma;
      default:
        return BookOpen;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-3 animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-cyan-600 text-white flex items-center justify-center shadow-lg shadow-emerald-600/25">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
                Matematika, Algebra va Geometriya Shablonlari
                <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2.5 py-0.5 rounded-full">
                  Tayyor testlar
                </span>
              </h2>
              <p className="text-xs text-gray-500">
                1-bosish bilan standartlarga mos, formulali va chizmali testlarni yuklang
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

        {/* Modal Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-hidden">
          {/* Sidebar Preset Selector */}
          <div className="md:col-span-4 p-4 border-r border-gray-100 bg-gray-50/60 overflow-y-auto space-y-2.5">
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              Fan va Darajani tanlang:
            </div>
            {mathSubjectPresets.map((preset) => {
              const Icon = getIcon(preset.icon);
              const isSelected = preset.id === selectedPresetId;
              return (
                <button
                  key={preset.id}
                  onClick={() => setSelectedPresetId(preset.id)}
                  className={`w-full text-left p-3.5 rounded-2xl transition border flex items-start gap-3 cursor-pointer ${
                    isSelected
                      ? "bg-white border-emerald-500 shadow-md shadow-emerald-500/10 ring-2 ring-emerald-500/20"
                      : "bg-white/80 border-gray-200 hover:bg-white hover:border-gray-300"
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      isSelected
                        ? "bg-emerald-600 text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                        {preset.subject}
                      </span>
                      <span className="text-[11px] text-gray-400 font-medium">
                        {preset.grade}
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-gray-800 mt-1 line-clamp-2">
                      {preset.title}
                    </div>
                    <div className="text-[11px] text-gray-500 mt-0.5">
                      {preset.questions.length} ta savol
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Preset Questions Preview */}
          <div className="md:col-span-8 p-5 overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <h3 className="font-bold text-gray-900 text-base">
                  {currentPreset.title}
                </h3>
                <p className="text-xs text-gray-500">
                  Ushbu shablonda {currentPreset.questions.length} ta savol mavjud (formulalar va chizmalar bilan)
                </p>
              </div>
              <button
                onClick={() => {
                  onApplyTemplate(currentPreset);
                  onClose();
                }}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 transition active:scale-95 cursor-pointer"
              >
                <span>Shablonni qo'llash</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Questions List */}
            <div className="space-y-3">
              {currentPreset.questions.map((q, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-gray-50/80 border border-gray-200 hover:border-emerald-300 transition"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="font-bold text-gray-900 text-sm mb-2 flex items-start gap-2">
                        <span className="text-emerald-700 font-extrabold">
                          {idx + 1}.
                        </span>
                        <span>{q.text}</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                        {q.answers.map((ans, aIdx) => (
                          <div
                            key={aIdx}
                            className={`p-2 rounded-xl text-xs font-medium border flex items-center gap-2 ${
                              aIdx === q.correctIndex
                                ? "bg-emerald-50 text-emerald-900 border-emerald-300 font-bold"
                                : "bg-white text-gray-700 border-gray-200"
                            }`}
                          >
                            <span className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold shrink-0 text-gray-600">
                              {String.fromCharCode(65 + aIdx)}
                            </span>
                            <span>{ans}</span>
                            {aIdx === q.correctIndex && (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 ml-auto shrink-0" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Diagram Preview if any */}
                    {q.diagram && (
                      <div className="bg-white p-2 rounded-xl border border-gray-200 shrink-0">
                        <GeometryDiagram diagram={q.diagram} />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
          <div className="text-xs text-gray-500">
            Shablon qo'llanganda test mavzusi va sozlamalari mos ravishda yangilanadi.
          </div>
          <button
            onClick={() => {
              onApplyTemplate(currentPreset);
              onClose();
            }}
            className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm shadow-md shadow-emerald-600/20 transition active:scale-95 cursor-pointer"
          >
            <span>Shablonni testga yuklash</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
