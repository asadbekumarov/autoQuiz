import { useState, useEffect, useRef } from "react";
import {
  Settings,
  Sparkles,
  Plus,
  CheckCircle,
  FileText,
  ChevronDown,
  ChevronUp,
  Compass,
  Layout,
  Columns,
  Eye,
  Clock,
  Trash2,
  Save,
  Download,
  Check,
} from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import TestSettings from "../components/TestSettings";
import QuestionList from "../components/QuestionList";
import QuestionEditor from "../components/QuestionEditor";
import ActionButtons from "../components/ActionButtons";
import TestPreview from "../components/TestPreview";
import AnswerKeyPreview from "../components/AnswerKeyPreview";
import AnswerSheetPreview from "../components/AnswerSheetPreview";
import SmartImportModal from "../components/SmartImportModal";
import AIGenerateModal from "../components/AIGenerateModal";
import MathTemplatesModal from "../components/MathTemplatesModal";
import { testStorage } from "../services/testStorage";
import { useI18n } from "../shared/hooks/useI18n";

export default function CreateTestPage() {
  const sanitize = (s) => String(s).replace(/[<>]/g, "");
  const useDebounce = (val, delay = 300) => {
    const [debounced, setDebounced] = useState(val);
    useEffect(() => {
      const id = setTimeout(() => setDebounced(val), delay);
      return () => clearTimeout(id);
    }, [val, delay]);
    return debounced;
  };

  const { t } = useI18n();

  const [testName, setTestName] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({
    text: "",
    answers: ["", "", "", ""],
    correctIndex: null,
    diagram: null,
  });
  const [editIndex, setEditIndex] = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [isMathModalOpen, setIsMathModalOpen] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState("");
  const [isExporting, setIsExporting] = useState(false);
  const [viewMode, setViewMode] = useState("split"); // 'split' | 'editor' | 'preview'

  const [config, setConfig] = useState({
    school: "",
    subject: "",
    className: "",
    date: new Date().toISOString().slice(0, 10),
    twoColumns: true,
    latexEnabled: true,
  });

  const [dragIndex, setDragIndex] = useState(null);
  const answerRefs = useRef([]);
  const previewRef = useRef(null);
  const answerPreviewRef = useRef(null);
  const answerSheetRef = useRef(null);

  const [questionTouched, setQuestionTouched] = useState(false);
  const [answersTouched, setAnswersTouched] = useState(false);

  // Restore draft on mount
  useEffect(() => {
    const draft = testStorage.getDraft();
    if (draft) {
      if (draft.testName) setTestName(draft.testName);
      if (Array.isArray(draft.questions) && draft.questions.length > 0) {
        setQuestions(draft.questions);
      }
      if (draft.config) {
        setConfig((c) => ({ ...c, ...draft.config }));
      }
    }
  }, []);

  // Restore template if navigated from templates page
  useEffect(() => {
    const tStr = localStorage.getItem("templateToUse");
    if (tStr) {
      let tpl = null;
      try {
        tpl = JSON.parse(tStr);
      } catch {
        tpl = null;
      }
      if (tpl) {
        setTestName(tpl.title || "Shablon");
        setConfig((c) => ({ ...c, subject: tpl.type || c.subject }));

        const makeMCQs = (opts, count = 5) =>
          Array.from({ length: count }, (_, i) => ({
            text: `Savol ${i + 1}?`,
            answers: (opts && opts.length ? opts : ["A", "B", "C", "D"]).slice(0, 4),
            correctIndex: 0,
            id: Date.now() + i,
          }));

        setQuestions(makeMCQs(tpl.options || []));
      }
      localStorage.removeItem("templateToUse");
    }
  }, []);

  // Autosave draft
  useEffect(() => {
    const id = setTimeout(() => {
      testStorage.saveDraft({ testName, questions, config });
    }, 400);
    return () => clearTimeout(id);
  }, [testName, questions, config]);

  const handleInputChange = (index, value) => {
    const updated = [...currentQuestion.answers];
    updated[index] = value;
    setCurrentQuestion({ ...currentQuestion, answers: updated });
    setAnswersTouched(true);
  };

  const handleAddQuestion = () => {
    if (!currentQuestion.text.trim()) return alert(t("enterQuestionText") || "Savol matnini kiriting");
    const pairs = currentQuestion.answers
      .map((a, idx) => ({ a, idx }))
      .filter((p) => p.a.trim());
    const validAnswers = pairs.map((p) => p.a);
    if (validAnswers.length < 2) return alert(t("atLeastTwoAnswers") || "Kamida 2 ta javob varianti bo'lishi shart");

    let newCorrectIndex = null;
    if (currentQuestion.correctIndex !== null) {
      const found = pairs.findIndex((p) => p.idx === currentQuestion.correctIndex);
      newCorrectIndex = found !== -1 ? found : null;
    }

    const formatted = {
      text: sanitize(
        currentQuestion.text.trim().endsWith("?")
          ? currentQuestion.text.trim()
          : currentQuestion.text.trim() + "?"
      ),
      answers: validAnswers.map((a) => sanitize(a)),
      correctIndex: newCorrectIndex,
      diagram: currentQuestion.diagram || null,
      id: Date.now(),
    };

    if (editIndex !== null) {
      const updated = [...questions];
      updated[editIndex] = { ...formatted, id: questions[editIndex].id };
      setQuestions(updated);
      setEditIndex(null);
      setSaveSuccessMsg("Savol muvaffaqiyatli yangilandi!");
    } else {
      setQuestions([...questions, formatted]);
      setSaveSuccessMsg("Yangi savol qo'shildi!");
    }

    setCurrentQuestion({
      text: "",
      answers: ["", "", "", ""],
      correctIndex: null,
      diagram: null,
    });
    setQuestionTouched(false);
    setAnswersTouched(false);
    setTimeout(() => setSaveSuccessMsg(""), 3000);
  };

  const handleDelete = (index) =>
    setQuestions(questions.filter((_, i) => i !== index));

  const handleEdit = (index) => {
    setCurrentQuestion({
      ...questions[index],
      diagram: questions[index].diagram || null,
    });
    setEditIndex(index);
    // If in preview mode, switch to split or editor
    if (viewMode === "preview") setViewMode("split");
    window.scrollTo({ top: 200, behavior: "smooth" });
  };

  const handleDuplicate = (index) => {
    const target = questions[index];
    if (!target) return;
    const duplicated = {
      ...target,
      id: Date.now(),
      text: `${target.text} (nusxa)`,
    };
    const updated = [...questions];
    updated.splice(index + 1, 0, duplicated);
    setQuestions(updated);
    setSaveSuccessMsg("Savoldan nusxa olindi!");
    setTimeout(() => setSaveSuccessMsg(""), 2500);
  };

  const handleMoveUp = (index) => {
    if (index === 0) return;
    const updated = [...questions];
    const [moved] = updated.splice(index, 1);
    updated.splice(index - 1, 0, moved);
    setQuestions(updated);
  };

  const handleMoveDown = (index) => {
    if (index >= questions.length - 1) return;
    const updated = [...questions];
    const [moved] = updated.splice(index, 1);
    updated.splice(index + 1, 0, moved);
    setQuestions(updated);
  };

  const handleClearAll = () => {
    if (questions.length === 0) return;
    if (window.confirm("Barcha savollarni o'chirmoqchimisiz?")) {
      setQuestions([]);
      setSaveSuccessMsg("Barcha savollar tozalandi.");
      setTimeout(() => setSaveSuccessMsg(""), 2500);
    }
  };

  const handleApplyMathTemplate = (preset) => {
    setQuestions(preset.questions);
    setTestName(preset.title);
    setConfig((c) => ({
      ...c,
      subject: preset.subject,
      className: preset.grade || c.className,
      latexEnabled: true,
    }));
    setSaveSuccessMsg(`"${preset.title}" shabloni muvaffaqiyatli yuklandi!`);
    setTimeout(() => setSaveSuccessMsg(""), 4000);
  };

  const handleSmartImport = (importedQuestions) => {
    setQuestions((prev) => [...prev, ...importedQuestions]);
    setSaveSuccessMsg(`${importedQuestions.length} ta savol muvaffaqiyatli import qilindi!`);
    setTimeout(() => setSaveSuccessMsg(""), 4000);
  };

  const handleAIImport = (generatedQuestions, meta) => {
    setQuestions((prev) => [...prev, ...generatedQuestions]);
    if (!testName.trim() && meta?.testName) {
      setTestName(meta.testName);
    }
    if (meta?.subject) {
      setConfig((c) => ({ ...c, subject: meta.subject }));
    }
    setSaveSuccessMsg(`${generatedQuestions.length} ta savol AI orqali muvaffaqiyatli yaratildi!`);
    setTimeout(() => setSaveSuccessMsg(""), 4000);
  };

  const handleSaveTest = () => {
    if (questions.length === 0) return alert(t("atLeastOneQuestion") || "Kamida 1 ta savol kiriting");

    const finalName =
      testName.trim() ||
      `${config.subject || "Nazorat"} testi - ${new Date().toLocaleDateString()}`;

    testStorage.save({
      name: finalName,
      questions,
      settings: config,
    });

    testStorage.clearDraft();
    setSaveSuccessMsg(t("testSaved") || "Test muvaffaqiyatli saqlandi!");
    setTimeout(() => setSaveSuccessMsg(""), 3500);
  };

  const typesetIfEnabled = async (el) => {
    if (config.latexEnabled && el && window.MathJax?.typesetPromise) {
      try {
        await window.MathJax.typesetPromise([el]);
      } catch (err) {
        console.warn("MathJax typeset failed", err);
      }
    }
  };

  const exportPDFfromCanvas = (canvas, filename) => {
    const doc = new jsPDF({ unit: "mm", format: "a4", compress: true });
    const pdfW = 210;
    const pdfH = 297;
    const scale = pdfW / canvas.width;
    const pageHeightPx = Math.floor(pdfH / scale);
    let y = 0;
    let first = true;

    while (y < canvas.height) {
      const sliceHeight = Math.min(pageHeightPx, canvas.height - y);
      const temp = document.createElement("canvas");
      temp.width = canvas.width;
      temp.height = sliceHeight;
      const ctx = temp.getContext("2d");
      ctx.drawImage(
        canvas,
        0,
        y,
        canvas.width,
        sliceHeight,
        0,
        0,
        canvas.width,
        sliceHeight
      );
      const imgData = temp.toDataURL("image/jpeg", 0.75);
      const drawH = sliceHeight * scale;
      if (!first) doc.addPage();
      doc.addImage(imgData, "JPEG", 0, 0, pdfW, drawH);
      first = false;
      y += sliceHeight;
    }
    doc.save(filename);
  };

  const handleDownloadPDF = async () => {
    if (questions.length === 0) return alert(t("noQuestions") || "Yuklab olish uchun kamida 1 ta savol bo'lishi kerak");
    try {
      setIsExporting(true);
      const element = previewRef.current;
      await typesetIfEnabled(element);
      const canvas = await html2canvas(element, { scale: 2 });
      exportPDFfromCanvas(canvas, `${testName || "test"}.pdf`);
    } catch (err) {
      alert(t("pdfError") || "PDF yaratishda xatolik yuz berdi");
      console.error(err);
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadAnswerSheet = async () => {
    if (questions.length === 0) return alert(t("noQuestions") || "Kamida 1 ta savol bo'lishi kerak");
    try {
      setIsExporting(true);
      const el = answerSheetRef.current;
      const canvas = await html2canvas(el, { scale: 2 });
      exportPDFfromCanvas(canvas, `${testName || "test"}_javoblar_varaqasi.pdf`);
    } catch (err) {
      alert(t("pdfError") || "Xatolik yuz berdi");
      console.error(err);
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadKeyPNG = async () => {
    if (questions.length === 0) return alert(t("noQuestions") || "Kamida 1 ta savol bo'lishi kerak");
    try {
      setIsExporting(true);
      const el = answerPreviewRef.current;
      await typesetIfEnabled(el);
      const canvas = await html2canvas(el, { scale: 2 });
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/jpeg", 0.8);
      link.download = `${testName || "test"}_kalit.jpg`;
      link.click();
    } catch (err) {
      alert(t("pngError") || "Rasm yaratishda xatolik yuz berdi");
      console.error(err);
    } finally {
      setIsExporting(false);
    }
  };

  const handleDragStart = (index) => setDragIndex(index);
  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (index) => {
    if (dragIndex === null || dragIndex === index) return;
    const updated = [...questions];
    const [moved] = updated.splice(dragIndex, 1);
    updated.splice(index, 0, moved);
    setQuestions(updated);
    setDragIndex(null);
  };

  const shuffleArray = (arr) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const handleRandomize = () => {
    const randomized = questions.map((q) => {
      const indices = q.answers.map((_, idx) => idx);
      const shuffledIdx = shuffleArray(indices);
      const newAnswers = shuffledIdx.map((si) => q.answers[si]);
      let newCorrect = q.correctIndex;
      if (q.correctIndex !== null) {
        newCorrect = shuffledIdx.findIndex((si) => si === q.correctIndex);
      }
      return { ...q, answers: newAnswers, correctIndex: newCorrect };
    });
    setQuestions(shuffleArray(randomized));
    setSaveSuccessMsg("Savollar va javob variantlari aralashtirildi!");
    setTimeout(() => setSaveSuccessMsg(""), 3000);
  };

  const focusNextField = (i) => {
    const nextRef = answerRefs.current[i + 1];
    if (nextRef && nextRef.focus) nextRef.focus();
  };

  const debouncedQuestions = useDebounce(questions, 300);
  const debouncedTestName = useDebounce(testName, 300);
  const debouncedConfig = useDebounce(config, 300);

  const estimatedMinutes = Math.max(5, questions.length * 2);

  return (
    <section className="bg-gradient-to-br from-emerald-50/40 via-gray-50 to-blue-50/30 min-h-screen py-6 px-3 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-5">
        {/* Sticky Control & Status Bar */}
        <div className="sticky top-2 z-40 bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:px-5 border border-gray-200/80 shadow-lg shadow-gray-200/50 flex flex-wrap items-center justify-between gap-3">
          {/* Left: Test Status info */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-600 text-white flex items-center justify-center font-black text-sm shadow-sm">
              {questions.length}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-bold text-gray-900 truncate max-w-[180px] sm:max-w-xs">
                  {testName || "Yangi Test"}
                </span>
                {config.subject && (
                  <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                    {config.subject}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-[11px] text-gray-500">
                <span>{questions.length} ta savol</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-gray-400" />
                  ~{estimatedMinutes} daqiqa
                </span>
                <span>•</span>
                <span className="text-emerald-700 font-semibold flex items-center gap-0.5">
                  <Check className="w-3 h-3" /> Qoralama saqlangan
                </span>
              </div>
            </div>
          </div>

          {/* Middle: View Mode Switcher */}
          <div className="flex items-center bg-gray-100 p-1 rounded-xl gap-1">
            <button
              type="button"
              onClick={() => setViewMode("editor")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                viewMode === "editor"
                  ? "bg-white text-emerald-700 shadow-xs"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Layout className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Tahrirlash</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode("split")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                viewMode === "split"
                  ? "bg-white text-emerald-700 shadow-xs"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Yonma-yon</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode("preview")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                viewMode === "preview"
                  ? "bg-white text-emerald-700 shadow-xs"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">A4 Varaqa</span>
            </button>
          </div>

          {/* Right: Quick Save & PDF Download */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSaveTest}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-xs transition active:scale-95 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Saqlash</span>
            </button>

            <button
              type="button"
              disabled={isExporting || questions.length === 0}
              onClick={handleDownloadPDF}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl font-bold text-xs shadow-xs transition active:scale-95 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">PDF</span>
            </button>
          </div>
        </div>

        {/* Toast Notification */}
        {saveSuccessMsg && (
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-xs animate-in fade-in">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{saveSuccessMsg}</span>
          </div>
        )}

        {/* Main Content Layout based on viewMode */}
        <div
          className={
            viewMode === "split"
              ? "grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
              : "max-w-4xl mx-auto"
          }
        >
          {/* Editor Column (shown in split & editor modes) */}
          {(viewMode === "split" || viewMode === "editor") && (
            <div
              className={`space-y-6 ${
                viewMode === "split" ? "lg:col-span-7" : "w-full"
              }`}
            >
              {/* Main Card */}
              <div className="bg-white shadow-xl shadow-gray-200/40 rounded-3xl p-5 sm:p-7 border border-gray-100 space-y-5">
                {/* Header row with Import / Template buttons */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
                  <div>
                    <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                      {t("createTitle") || "Test Yaratish"}
                    </h1>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Savollarni qo'shing yoki tayyor shablonlardan foydalaning
                    </p>
                  </div>

                  {/* Template & Generation Modals Buttons */}
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsMathModalOpen(true)}
                      className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-blue-600 via-teal-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white rounded-xl font-bold text-xs shadow-xs transition active:scale-95 cursor-pointer"
                      title="Matematika, algebra va geometriya tayyor shablonlari"
                    >
                      <Compass className="w-3.5 h-3.5" />
                      <span>Matematika & Geometriya</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsAIModalOpen(true)}
                      className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl font-bold text-xs shadow-xs transition active:scale-95 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>AI Generator</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsImportModalOpen(true)}
                      className="flex items-center gap-1.5 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold text-xs transition active:scale-95 cursor-pointer"
                    >
                      <span>{t("smartImport") || "Matndan import"}</span>
                    </button>
                  </div>
                </div>

                {/* Test Name & Subject Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
                      {t("testName") || "Test nomi"}
                    </label>
                    <input
                      type="text"
                      placeholder={t("enterTestName") || "Masalan: Matematika 8-sinf 1-chorak"}
                      value={testName}
                      onChange={(e) => setTestName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-semibold text-gray-900 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
                      {t("subject") || "Fan"}
                    </label>
                    <input
                      type="text"
                      placeholder="Algebra / Geometriya"
                      value={config.subject || ""}
                      onChange={(e) => setConfig({ ...config, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-semibold text-gray-900 transition"
                    />
                  </div>
                </div>

                {/* Test Settings Toggle Accordion */}
                <div>
                  <button
                    type="button"
                    onClick={() => setSettingsOpen(!settingsOpen)}
                    className="flex items-center gap-2 text-xs font-bold text-gray-600 px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 transition cursor-pointer"
                  >
                    <Settings className="w-3.5 h-3.5 text-gray-500" />
                    <span>Qo'shimcha sozlamalar (Maktab, sinf, sana, LaTeX)</span>
                    {settingsOpen ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>

                  {settingsOpen && (
                    <div className="mt-2.5 p-4 bg-gray-50 rounded-2xl border border-gray-200 animate-in fade-in">
                      <TestSettings config={config} setConfig={setConfig} t={t} />
                    </div>
                  )}
                </div>

                {/* Existing Questions List */}
                {questions.length > 0 && (
                  <div className="pt-2">
                    <div className="flex items-center justify-between mb-2.5">
                      <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
                        <span>Savollar ro'yxati</span>
                        <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full text-[11px]">
                          {questions.length} ta
                        </span>
                      </h3>

                      <button
                        type="button"
                        onClick={handleClearAll}
                        className="text-[11px] font-semibold text-gray-400 hover:text-red-600 transition flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" /> Hammasini o'chirish
                      </button>
                    </div>

                    <QuestionList
                      questions={questions}
                      handleEdit={handleEdit}
                      handleDelete={handleDelete}
                      handleDuplicate={handleDuplicate}
                      handleMoveUp={handleMoveUp}
                      handleMoveDown={handleMoveDown}
                      handleDragStart={handleDragStart}
                      handleDragOver={handleDragOver}
                      handleDrop={handleDrop}
                    />
                  </div>
                )}

                {/* Question Editor Input Card */}
                <div className="pt-2">
                  <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <Plus className="w-4 h-4 text-emerald-600" />
                    {editIndex !== null
                      ? "Savolni tahrirlash"
                      : `Yangi savol qo'shish (${questions.length + 1}-savol)`}
                  </h3>

                  <QuestionEditor
                    currentQuestion={currentQuestion}
                    setCurrentQuestion={setCurrentQuestion}
                    questionTouched={questionTouched}
                    setQuestionTouched={setQuestionTouched}
                    answersTouched={answersTouched}
                    setAnswersTouched={setAnswersTouched}
                    handleInputChange={handleInputChange}
                    handleAddQuestion={handleAddQuestion}
                    editIndex={editIndex}
                    t={t}
                    focusNextField={focusNextField}
                    config={config}
                  />
                </div>

                {/* Bottom Action Buttons */}
                <ActionButtons
                  handleSaveTest={handleSaveTest}
                  handleRandomize={handleRandomize}
                  handleDownloadPDF={handleDownloadPDF}
                  handleDownloadAnswerSheet={handleDownloadAnswerSheet}
                  handleDownloadKeyPNG={handleDownloadKeyPNG}
                  isExporting={isExporting}
                  t={t}
                />
              </div>
            </div>
          )}

          {/* Live Preview Column (shown in split & preview modes) */}
          {(viewMode === "split" || viewMode === "preview") && (
            <div
              className={`space-y-4 ${
                viewMode === "split"
                  ? "lg:col-span-5 lg:sticky lg:top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pr-1"
                  : "w-full"
              }`}
            >
              <TestPreview
                debouncedQuestions={debouncedQuestions}
                debouncedTestName={debouncedTestName}
                debouncedConfig={debouncedConfig}
                previewRef={previewRef}
                t={t}
              />
            </div>
          )}
        </div>

        {/* Answer Sheet Off-Screen Component for Printing/Export */}
        <div style={{ position: "absolute", left: "-9999px", top: "-9999px" }}>
          <AnswerSheetPreview
            ref={answerSheetRef}
            questions={debouncedQuestions}
            testName={debouncedTestName}
            config={debouncedConfig}
          />
        </div>

        {/* Answer Key Off-Screen Component for PNG/PDF Export */}
        {debouncedQuestions.length > 0 && (
          <AnswerKeyPreview
            debouncedQuestions={debouncedQuestions}
            debouncedTestName={debouncedTestName}
            debouncedConfig={debouncedConfig}
            answerPreviewRef={answerPreviewRef}
            t={t}
          />
        )}
      </div>

      {/* Smart Import Modal */}
      <SmartImportModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onImport={handleSmartImport}
      />

      {/* AI Generate Modal */}
      <AIGenerateModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        onImportQuestions={handleAIImport}
      />

      {/* Math, Algebra & Geometry Templates Modal */}
      <MathTemplatesModal
        isOpen={isMathModalOpen}
        onClose={() => setIsMathModalOpen(false)}
        onApplyTemplate={handleApplyMathTemplate}
      />
    </section>
  );
}
