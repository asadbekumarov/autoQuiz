import React, { forwardRef } from "react";

const AnswerSheetPreview = forwardRef(({ questions = [], testName = "", config = {} }, ref) => {
  const count = questions.length || 20;
  const options = ["A", "B", "C", "D"];

  // Split questions into columns of 10 or 15 for A4 layout
  const colSize = Math.max(10, Math.ceil(count / 2));
  const col1 = Array.from({ length: Math.min(count, colSize) }, (_, i) => i + 1);
  const col2 = Array.from(
    { length: Math.max(0, count - colSize) },
    (_, i) => colSize + i + 1
  );

  return (
    <div
      ref={ref}
      className="bg-white p-8 max-w-[210mm] mx-auto text-black border border-gray-200 shadow-sm print:shadow-none print:border-none font-sans"
      style={{ minHeight: "297mm", boxSizing: "border-box" }}
    >
      {/* Header */}
      <div className="border-b-2 border-black pb-4 mb-6 text-center">
        <h2 className="text-xl font-black uppercase tracking-wider">
          {config.school || "AutoQuiz Test Tizimi"}
        </h2>
        <h3 className="text-base font-bold mt-1 text-gray-800">
          JAVOBLAR VARAQASI (BUBBLE SHEET)
        </h3>
        <p className="text-xs text-gray-600 mt-0.5">
          {testName || "Fan bo'yicha nazorat testi"} {config.className ? `| ${config.className}` : ""} {config.date ? `| ${config.date}` : ""}
        </p>
      </div>

      {/* Student credentials area */}
      <div className="grid grid-cols-2 gap-4 mb-6 border border-black p-3 text-xs">
        <div className="space-y-2">
          <div className="flex items-center gap-1">
            <span className="font-bold">O'quvchi F.I.Sh:</span>
            <div className="border-b border-black flex-1 h-4"></div>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-bold">Sinf / Guruh:</span>
            <div className="border-b border-black flex-1 h-4"></div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-1">
            <span className="font-bold">Sana:</span>
            <div className="border-b border-black flex-1 h-4"></div>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-bold">Ball / Natija:</span>
            <div className="border-b border-black flex-1 h-4"></div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-gray-50 border border-gray-300 p-2.5 rounded text-[11px] text-gray-700 mb-6">
        <span className="font-bold">Eslatma:</span> Har bir savol uchun faqat bitta to'g'ri doirachani qalam bilan to'liq bo'yang: <span className="inline-block w-3.5 h-3.5 bg-black rounded-full align-middle mx-1"></span>.
      </div>

      {/* Bubble sheet grid */}
      <div className="grid grid-cols-2 gap-8 px-4">
        {/* Column 1 */}
        <div className="space-y-2">
          {col1.map((num) => (
            <div
              key={num}
              className="flex items-center justify-between border-b border-gray-200 py-1"
            >
              <span className="font-bold text-xs w-6 text-right pr-2">
                {num}.
              </span>
              <div className="flex items-center gap-3">
                {options.map((opt) => (
                  <div
                    key={opt}
                    className="w-6 h-6 rounded-full border-2 border-black flex items-center justify-center text-xs font-bold hover:bg-gray-100"
                  >
                    {opt}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Column 2 */}
        <div className="space-y-2">
          {col2.map((num) => (
            <div
              key={num}
              className="flex items-center justify-between border-b border-gray-200 py-1"
            >
              <span className="font-bold text-xs w-6 text-right pr-2">
                {num}.
              </span>
              <div className="flex items-center gap-3">
                {options.map((opt) => (
                  <div
                    key={opt}
                    className="w-6 h-6 rounded-full border-2 border-black flex items-center justify-center text-xs font-bold hover:bg-gray-100"
                  >
                    {opt}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 pt-4 border-t border-gray-300 text-center text-[10px] text-gray-500">
        AutoQuiz Test Platformasi orqali tayyorlangan • www.autoquiz.uz
      </div>
    </div>
  );
});

AnswerSheetPreview.displayName = "AnswerSheetPreview";
export default AnswerSheetPreview;
