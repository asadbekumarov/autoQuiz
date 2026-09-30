import React, { useState, useEffect } from "react";
import { Trash2, Eye, Download, PlayCircle, Plus, Search, Calendar, FileQuestion, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { testStorage } from "../services/testStorage";
import { useI18n } from "../shared/hooks/useI18n";

function MyTestsPage() {
  const navigate = useNavigate();
  const { t } = useI18n();

  const [searchTerm, setSearchTerm] = useState("");
  const [savedTests, setSavedTests] = useState([]);
  const [selectedTest, setSelectedTest] = useState(null);

  const loadTests = () => {
    setSavedTests(testStorage.getAll());
  };

  useEffect(() => {
    loadTests();
    window.addEventListener("storage", loadTests);
    return () => window.removeEventListener("storage", loadTests);
  }, []);

  const filteredTests = savedTests.filter((test) =>
    (test.name || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [page, setPage] = useState(0);
  const pageSize = 12;
  const pageCount = Math.ceil(filteredTests.length / pageSize);
  const pagedTests = filteredTests.slice(
    page * pageSize,
    page * pageSize + pageSize
  );

  const handleDeleteTest = (id) => {
    if (window.confirm("Rostdan ham ushbu testni o'chirmoqchimisiz?")) {
      testStorage.delete(id);
      loadTests();
      if (selectedTest && selectedTest.id === id) {
        setSelectedTest(null);
      }
    }
  };

  const handleDownloadTest = async (test) => {
    // Create temporary preview element
    const tempContainer = document.createElement("div");
    tempContainer.className =
      "fixed top-0 left-0 w-full h-full bg-white z-50 overflow-hidden";
    tempContainer.style.cssText =
      "width: 210mm; height: 297mm; margin: 0; padding: 0;";

    const questionsPerPage = 10;
    const totalPages = Math.ceil((test.questions?.length || 1) / questionsPerPage);

    for (let pageNum = 0; pageNum < totalPages; pageNum++) {
      const pageDiv = document.createElement("div");
      pageDiv.className = "page bg-white";
      pageDiv.style.cssText = `
        width: 210mm;
        height: 297mm;
        padding: 10mm;
        box-sizing: border-box;
        position: relative;
      `;

      // Header
      const headerDiv = document.createElement("div");
      headerDiv.className = "text-center mb-6 pb-2 border-b";
      const s = test.settings || {};
      headerDiv.innerHTML = `
        <h1 style="font-size: 14pt; font-weight: bold; margin-bottom: 2mm;">${test.name || "Test"}</h1>
        <div style="font-size: 9pt; color: #555; display: flex; justify-content: space-between;">
          <span>${s.school || ""}</span>
          <span>${s.subject || ""}</span>
          <span>${s.className || ""}</span>
          <span>${s.date || new Date().toISOString().slice(0, 10)}</span>
        </div>
      `;
      pageDiv.appendChild(headerDiv);

      // Questions grid
      const columnsContainer = document.createElement("div");
      columnsContainer.style.cssText = "display: flex; gap: 6mm;";

      const startIdx = pageNum * questionsPerPage;
      const leftColumnQuestions = (test.questions || []).slice(startIdx, startIdx + 5);
      const rightColumnQuestions = (test.questions || []).slice(startIdx + 5, startIdx + 10);

      const renderColumn = (qs, offset) => {
        const col = document.createElement("div");
        col.style.cssText = "flex: 1; display: flex; flex-direction: column; gap: 4mm;";
        qs.forEach((q, i) => {
          const qDiv = document.createElement("div");
          qDiv.style.cssText = "font-size: 10pt;";
          qDiv.innerHTML = `
            <div style="font-weight: 600; margin-bottom: 2mm;">${offset + i + 1}. ${q.text}</div>
            <div style="margin-left: 3mm; display: flex; flex-direction: column; gap: 1mm; font-size: 9pt;">
              ${(q.answers || []).filter(Boolean).map((a, j) => `<div>${String.fromCharCode(97 + j)}) ${a}</div>`).join("")}
            </div>
          `;
          col.appendChild(qDiv);
        });
        return col;
      };

      columnsContainer.appendChild(renderColumn(leftColumnQuestions, startIdx));
      if (rightColumnQuestions.length > 0) {
        columnsContainer.appendChild(renderColumn(rightColumnQuestions, startIdx + 5));
      }
      pageDiv.appendChild(columnsContainer);
      tempContainer.appendChild(pageDiv);
    }

    document.body.appendChild(tempContainer);

    try {
      const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pages = tempContainer.querySelectorAll(".page");
      for (let i = 0; i < pages.length; i++) {
        if (i > 0) doc.addPage();
        const canvas = await html2canvas(pages[i], { scale: 2, useCORS: true });
        const imgData = canvas.toDataURL("image/jpeg", 0.75);
        doc.addImage(imgData, "JPEG", 0, 0, 210, 297);
      }
      doc.save(`${test.name || "test"}.pdf`);
    } catch (e) {
      console.error(e);
      alert(t("pdfError"));
    } finally {
      document.body.removeChild(tempContainer);
    }
  };

  return (
    <section className="bg-gradient-to-br from-green-50/40 via-gray-50 to-blue-50/30 min-h-[85vh] py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header & Search */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-green-900/5 border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              {t("mytests")}
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Barcha tuzilgan testlar ro'yxati, onlayn yechish va chop etish
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Testlarni qidirish..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              />
            </div>

            <button
              onClick={() => navigate("/create")}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-2xl text-xs sm:text-sm font-semibold shadow-md shadow-green-600/20 transition active:scale-95 flex-shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">{t("createTitle")}</span>
            </button>
          </div>
        </div>

        {/* Tests Grid */}
        {pagedTests.length > 0 ? (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {pagedTests.map((test) => (
                <div
                  key={test.id}
                  className="bg-white rounded-3xl p-5 shadow-lg shadow-gray-200/50 border border-gray-100 hover:border-green-200 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="w-10 h-10 rounded-2xl bg-green-50 text-green-700 flex items-center justify-center font-bold text-sm group-hover:scale-105 transition-transform">
                        <FileQuestion className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-semibold text-gray-400 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(test.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <h3 className="font-bold text-base text-gray-900 line-clamp-2 mb-1 group-hover:text-green-700 transition-colors">
                      {test.name || "Nomsiz test"}
                    </h3>

                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                      <span className="bg-gray-100 px-2.5 py-0.5 rounded-full font-medium">
                        {(test.questions || []).length} ta savol
                      </span>
                      {test.settings?.subject && (
                        <span className="bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full font-medium truncate max-w-[120px]">
                          {test.settings.subject}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2 pt-3 border-t border-gray-100">
                    {/* Play Online Button */}
                    <button
                      onClick={() => navigate(`/quiz/${test.id}`)}
                      className="w-full py-2 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm shadow-green-600/20 transition cursor-pointer"
                    >
                      <PlayCircle className="w-4 h-4" />
                      <span>{t("startQuiz")}</span>
                    </button>

                    <div className="flex gap-1.5">
                      <button
                        onClick={() => setSelectedTest(test)}
                        className="flex-1 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition"
                      >
                        <Eye className="w-3.5 h-3.5 text-gray-500" />
                        <span>{t("view")}</span>
                      </button>
                      <button
                        onClick={() => handleDownloadTest(test)}
                        className="flex-1 py-1.5 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 text-gray-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>PDF</span>
                      </button>
                      <button
                        onClick={() => handleDeleteTest(test.id)}
                        className="p-1.5 bg-gray-50 hover:bg-red-50 text-gray-400 hover:text-red-600 rounded-xl transition"
                        title={t("delete")}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {pageCount > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button
                  disabled={page === 0}
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  className="px-3.5 py-1.5 rounded-xl border bg-white text-xs font-semibold disabled:opacity-40"
                >
                  Oldingi
                </button>
                <span className="text-xs font-semibold text-gray-600">
                  {page + 1} / {pageCount}
                </span>
                <button
                  disabled={page >= pageCount - 1}
                  onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
                  className="px-3.5 py-1.5 rounded-xl border bg-white text-xs font-semibold disabled:opacity-40"
                >
                  Keyingi
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center shadow-xl shadow-green-900/5 border border-gray-100 space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-green-50 text-green-600 flex items-center justify-center mx-auto">
              <FileQuestion className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-gray-800">
              {searchTerm ? "Mos keladigan test topilmadi" : t("noTestsFound")}
            </h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              Birinchi testingizni yarating va uni PDF formatida yuklab oling yoki o'quvchilaringizga onlayn yechishga taqdim eting.
            </p>
            <button
              onClick={() => navigate("/create")}
              className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-2xl text-xs font-semibold shadow-md shadow-green-600/20 inline-flex items-center gap-1.5 transition"
            >
              <Plus className="w-4 h-4" />
              <span>Yangi test yaratish</span>
            </button>
          </div>
        )}

        {/* View Modal */}
        {selectedTest && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95">
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-gray-100">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                    {selectedTest.name}
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Sana: {new Date(selectedTest.createdAt).toLocaleDateString()} • {(selectedTest.questions || []).length} ta savol
                  </p>
                </div>
                <button
                  onClick={() => setSelectedTest(null)}
                  className="p-1.5 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-100 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="overflow-y-auto flex-1 my-4 space-y-3 pr-1">
                {(selectedTest.questions || []).map((q, i) => (
                  <div key={i} className="p-3.5 rounded-2xl border border-gray-100 bg-gray-50/70 text-xs space-y-2">
                    <p className="font-bold text-gray-900">
                      {i + 1}. {q.text}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pl-2">
                      {(q.answers || []).filter(Boolean).map((a, j) => (
                        <div
                          key={j}
                          className={`p-1.5 rounded-lg ${
                            q.correctIndex === j
                              ? "bg-green-100 text-green-900 font-bold"
                              : "text-gray-600"
                          }`}
                        >
                          {String.fromCharCode(97 + j)}) {a}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-gray-100 flex gap-2">
                <button
                  onClick={() => {
                    const id = selectedTest.id;
                    setSelectedTest(null);
                    navigate(`/quiz/${id}`);
                  }}
                  className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-sm"
                >
                  <PlayCircle className="w-4 h-4" /> {t("startQuiz")}
                </button>
                <button
                  onClick={() => handleDownloadTest(selectedTest)}
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-sm"
                >
                  <Download className="w-4 h-4" /> PDF
                </button>
                <button
                  onClick={() => setSelectedTest(null)}
                  className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-semibold transition"
                >
                  {t("close")}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default MyTestsPage;
