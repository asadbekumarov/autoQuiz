import React from "react";
import {
  Save,
  Shuffle,
  Download,
  FileText,
  CheckCircle2,
  Loader2,
} from "lucide-react";

export default function ActionButtons({
  handleSaveTest,
  handleRandomize,
  handleDownloadPDF,
  handleDownloadAnswerSheet,
  handleDownloadKeyPNG,
  isExporting = false,
  t,
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-gray-100">
      {/* Primary Actions: Save & Shuffle */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={handleSaveTest}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 transition active:scale-95 cursor-pointer"
          title="Testni brauzer xotirasiga saqlash"
        >
          <Save className="w-4 h-4" />
          <span>{t("save") || "Saqlash"}</span>
        </button>

        <button
          type="button"
          onClick={handleRandomize}
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md shadow-amber-500/20 transition active:scale-95 cursor-pointer"
          title="Savollar va variantlar tartibini tasodifiy aralashtirish"
        >
          <Shuffle className="w-4 h-4" />
          <span>{t("shuffle") || "Aralashtirish"}</span>
        </button>
      </div>

      {/* Export Actions: PDF, Answer Sheet, Answer Key */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          disabled={isExporting}
          onClick={handleDownloadPDF}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md shadow-blue-600/20 transition active:scale-95 cursor-pointer"
          title="Testni A4 PDF formatida yuklab olish"
        >
          {isExporting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Download className="w-4 h-4" />
          )}
          <span>{isExporting ? "Yuklanmoqda..." : t("pdf") || "PDF yuklab olish"}</span>
        </button>

        {handleDownloadAnswerSheet && (
          <button
            type="button"
            disabled={isExporting}
            onClick={handleDownloadAnswerSheet}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md shadow-indigo-600/20 transition active:scale-95 cursor-pointer"
            title="O'quvchilar uchun javoblar varaqasini (Bubble sheet) yuklab olish"
          >
            <FileText className="w-4 h-4" />
            <span>{t("answerSheet") || "Javoblar varaqasi"}</span>
          </button>
        )}

        {handleDownloadKeyPNG && (
          <button
            type="button"
            disabled={isExporting}
            onClick={handleDownloadKeyPNG}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-60 text-white px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md shadow-purple-600/20 transition active:scale-95 cursor-pointer"
            title="O'qituvchi uchun to'g'ri javoblar kalitini rasm sifatida yuklash"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{t("answerKey") || "Javoblar kaliti"}</span>
          </button>
        )}
      </div>
    </div>
  );
}
