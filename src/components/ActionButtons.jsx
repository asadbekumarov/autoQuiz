import React from "react";
import { Save, Shuffle, Download, FileText, CheckCircle2 } from "lucide-react";

export default function ActionButtons({
  handleSaveTest,
  handleRandomize,
  handleDownloadPDF,
  handleDownloadAnswerSheet,
  handleDownloadKeyPNG,
  t,
}) {
  return (
    <div className="flex flex-wrap gap-2.5 pt-4 border-t border-gray-100">
      {/* Save Button */}
      <button
        onClick={handleSaveTest}
        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-xl font-semibold text-sm shadow-md shadow-green-600/20 transition active:scale-95 cursor-pointer"
        title="Testni saqlaydi"
      >
        <Save className="w-4 h-4" /> {t("save")}
      </button>

      {/* Shuffle Button */}
      <button
        onClick={handleRandomize}
        className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2.5 rounded-xl font-semibold text-sm shadow-md shadow-amber-500/20 transition active:scale-95 cursor-pointer"
        title="Savollar va variantlarni aralashtirish"
      >
        <Shuffle className="w-4 h-4" /> {t("shuffle")}
      </button>

      {/* Download Test PDF */}
      <button
        onClick={handleDownloadPDF}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-semibold text-sm shadow-md shadow-blue-600/20 transition active:scale-95 cursor-pointer"
        title="Testni A4 PDF formatida yuklab olish"
      >
        <Download className="w-4 h-4" /> {t("pdf")}
      </button>

      {/* Download Answer Sheet PDF */}
      {handleDownloadAnswerSheet && (
        <button
          onClick={handleDownloadAnswerSheet}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl font-semibold text-sm shadow-md shadow-indigo-600/20 transition active:scale-95 cursor-pointer"
          title="O'quvchilar uchun javoblar varaqasini (Bubble Sheet) yuklab olish"
        >
          <FileText className="w-4 h-4" /> {t("answerSheet")}
        </button>
      )}

      {/* Download Answer Key */}
      {handleDownloadKeyPNG && (
        <button
          onClick={handleDownloadKeyPNG}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2.5 rounded-xl font-semibold text-sm shadow-md shadow-purple-600/20 transition active:scale-95 cursor-pointer"
          title="O'qituvchi uchun to'g'ri javoblar kalitini yuklab olish"
        >
          <CheckCircle2 className="w-4 h-4" /> {t("answerKey")}
        </button>
      )}
    </div>
  );
}
