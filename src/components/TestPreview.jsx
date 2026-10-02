import React, { useEffect, useState } from "react";
import { ZoomIn, ZoomOut, RotateCcw, Printer, FileText, Check } from "lucide-react";
import GeometryDiagram from "./GeometryDiagram";

export default function TestPreview({
  debouncedQuestions,
  debouncedTestName,
  debouncedConfig,
  previewRef,
  t,
}) {
  const [zoom, setZoom] = useState(100);

  // Typeset math formulas whenever questions or test config change
  useEffect(() => {
    if (window.MathJax?.typesetPromise && previewRef.current) {
      window.MathJax.typesetPromise([previewRef.current]).catch((err) => {
        // Safe catch for typesetting
      });
    }
  }, [debouncedQuestions, debouncedTestName, debouncedConfig, previewRef, zoom]);

  const handleZoomIn = () => setZoom((z) => Math.min(z + 10, 140));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 10, 70));
  const handleResetZoom = () => setZoom(100);

  // Estimate page count (roughly 8-10 questions per A4 page in 2-column mode)
  const estimatedPages = Math.max(
    1,
    Math.ceil(
      debouncedQuestions.length / (debouncedConfig.twoColumns ? 10 : 6)
    )
  );

  return (
    <div className="space-y-3">
      {/* Preview Control Bar (Print-Hidden) */}
      <div className="bg-white/90 backdrop-blur-xs p-3 rounded-2xl border border-gray-200 shadow-xs flex flex-wrap items-center justify-between gap-3 print:hidden">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-emerald-600" />
          <span className="text-xs sm:text-sm font-bold text-gray-800">
            A4 formatdagi jonli ko'rinish
          </span>
          <span className="text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">
            Taxminan {estimatedPages} sahifa
          </span>
        </div>

        {/* Zoom & Print Buttons */}
        <div className="flex items-center gap-2">
          {/* Zoom controls */}
          <div className="flex items-center bg-gray-100 rounded-xl p-1 gap-1">
            <button
              type="button"
              onClick={handleZoomOut}
              className="p-1 text-gray-600 hover:text-gray-950 rounded-lg hover:bg-white transition cursor-pointer"
              title="Kichiklashtirish"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs font-bold text-gray-700 px-1 min-w-[42px] text-center select-none">
              {zoom}%
            </span>
            <button
              type="button"
              onClick={handleZoomIn}
              className="p-1 text-gray-600 hover:text-gray-950 rounded-lg hover:bg-white transition cursor-pointer"
              title="Kattalashtirish"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            {zoom !== 100 && (
              <button
                type="button"
                onClick={handleResetZoom}
                className="p-1 text-gray-400 hover:text-gray-800 rounded-lg hover:bg-white transition cursor-pointer"
                title="100% ga qaytarish"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Quick Print Button */}
          <button
            type="button"
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl text-xs transition cursor-pointer"
            title="Brauzer orqali to'g'ridan-to'g'ri chop etish"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Chop etish</span>
          </button>
        </div>
      </div>

      {/* A4 Paper Container with Zoom scale */}
      <div className="overflow-x-auto p-2 sm:p-4 bg-gray-100/70 rounded-3xl border border-gray-200/60 flex justify-center">
        <div
          ref={previewRef}
          style={{
            transform: `scale(${zoom / 100})`,
            transformOrigin: "top center",
            transition: "transform 0.15s ease-out",
            fontFamily: "Inter, system-ui, sans-serif",
          }}
          className="bg-white rounded-2xl shadow-xl shadow-gray-400/20 p-6 sm:p-8 border border-gray-200 w-full max-w-[210mm] min-h-[297mm] print:w-[210mm] print:min-h-[297mm] print:shadow-none print:border-none print:p-8 print:transform-none select-text"
        >
          {/* Test Header */}
          <div className="mb-5 pb-3 border-b-2 border-gray-800">
            <h2 className="text-center text-xl sm:text-2xl font-black text-gray-900 tracking-tight uppercase mb-2">
              {debouncedTestName || t("testPreview") || "NAZORAT ISHI"}
            </h2>
            <div className="flex flex-wrap items-center justify-between text-xs sm:text-sm font-semibold text-gray-700 gap-y-1">
              {debouncedConfig.school && (
                <span>Maktab/Muassasa: {debouncedConfig.school}</span>
              )}
              {debouncedConfig.subject && (
                <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-900 font-bold">
                  Fan: {debouncedConfig.subject}
                </span>
              )}
              {debouncedConfig.className && (
                <span>Sinf: {debouncedConfig.className}</span>
              )}
              {debouncedConfig.date && <span>Sana: {debouncedConfig.date}</span>}
            </div>
            <div className="mt-3 flex items-center justify-between text-xs sm:text-sm text-gray-800 pt-2 border-t border-gray-200">
              <span>O'quvchi: _____________________________________________</span>
              <span>Variant: _____</span>
            </div>
          </div>

          {/* Questions Grid */}
          <div
            className={
              debouncedConfig.twoColumns
                ? "grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 print:grid-cols-2"
                : "grid grid-cols-1 gap-y-5"
            }
          >
            {debouncedQuestions.map((q, i) => (
              <div
                key={q.id || i}
                className="break-inside-avoid p-2 rounded-lg transition-colors hover:bg-gray-50/50"
              >
                {/* Question Text & Optional Diagram */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="font-bold text-gray-900 text-sm sm:text-base flex-1 leading-snug">
                    <span className="font-black text-gray-950 mr-1.5">{i + 1}.</span>
                    <span>{q.text}</span>
                  </div>
                  {q.diagram && (
                    <div className="shrink-0 bg-gray-50 p-1.5 rounded-lg border border-gray-200">
                      <GeometryDiagram diagram={q.diagram} className="w-28 h-24" />
                    </div>
                  )}
                </div>

                {/* Answers */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pl-3">
                  {q.answers.map((a, j) => (
                    <div
                      key={j}
                      className="text-xs sm:text-sm text-gray-800 flex items-start gap-1.5 py-0.5"
                    >
                      <span className="font-bold text-gray-950 uppercase shrink-0">
                        {String.fromCharCode(65 + j)})
                      </span>
                      <span className="font-medium">{a}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
