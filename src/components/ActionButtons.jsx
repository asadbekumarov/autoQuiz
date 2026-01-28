import React from "react";
import { Save, Shuffle, Download, Eye } from "lucide-react";

export default function ActionButtons({
  handleSaveTest,
  handleRandomize,
  handleDownloadPDF,
  handleDownloadPNG,
  t,
}) {
  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={handleSaveTest}
        className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg"
        title="Testni localStorage'ga saqlaydi"
      >
        <Save className="w-5 h-5" /> {t("save")}
      </button>
      <button
        onClick={handleRandomize}
        className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-lg"
        title="Savollar va javoblar tartibini tasodifiylashtiradi"
      >
        <Shuffle className="w-5 h-5" /> {t("shuffle")}
      </button>
      <button
        onClick={handleDownloadPDF}
        className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
        title="Hozirgi preview'dan PDF yaratadi"
      >
        <Download className="w-5 h-5" /> {t("pdf")}
      </button>
      <button
        onClick={handleDownloadPNG}
        className="flex items-center gap-2 bg-purple-500 text-white px-4 py-2 rounded-lg"
        title="Hozirgi preview'dan PNG rasm yaratadi"
      >
        <Eye className="w-5 h-5" /> {t("png")}
      </button>
    </div>
  );
}
