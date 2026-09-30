import React from "react";

export default function AnswerKeyPreview({
  debouncedQuestions = [],
  debouncedTestName = "",
  debouncedConfig = {},
  answerPreviewRef,
  t,
}) {
  return (
    <div
      ref={answerPreviewRef}
      style={{ position: "absolute", left: "-9999px", top: 0, width: "210mm" }}
      className="bg-white rounded-lg shadow-md p-6 mt-8 font-sans text-gray-900"
    >
      <div className="mb-4 pb-3 border-b">
        <h2 className="text-center text-xl font-bold text-gray-800">
          {debouncedTestName || "Test"} — {t("answerKey")}
        </h2>
        <div className="flex justify-between text-xs text-gray-600 mt-2">
          <span>{debouncedConfig.school || ""}</span>
          <span>{debouncedConfig.subject || ""}</span>
          <span>{debouncedConfig.className || ""}</span>
          <span>{debouncedConfig.date || ""}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-8 gap-y-2">
        {debouncedQuestions.map((q, i) => (
          <div key={q.id || i} className="text-sm flex items-center justify-between border-b border-gray-100 py-1">
            <span className="font-semibold text-gray-700">{i + 1}. Savol:</span>
            <span className="font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded">
              {q.correctIndex !== null
                ? String.fromCharCode(65 + q.correctIndex)
                : "Belgilanmagan"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
