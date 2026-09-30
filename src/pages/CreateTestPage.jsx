import { useState, useEffect, useRef } from "react";
import { Settings, Sparkles, Plus, CheckCircle, FileText, ChevronDown, ChevronUp } from "lucide-react";
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
  });
  const [editIndex, setEditIndex] = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState("");

  const [config, setConfig] = useState({
    school: "",
    subject: "",
    className: "",
    date: new Date().toISOString().slice(0, 10),
    twoColumns: true,
    latexEnabled: false,
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
    if (!currentQuestion.text.trim()) return alert(t("enterQuestionText"));
    const pairs = currentQuestion.answers
      .map((a, idx) => ({ a, idx }))
      .filter((p) => p.a.trim());
    const validAnswers = pairs.map((p) => p.a);
    if (validAnswers.length < 2) return alert(t("atLeastTwoAnswers"));

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
      id: Date.now(),
    };

    if (editIndex !== null) {
      const updated = [...questions];
      updated[editIndex] = { ...formatted, id: questions[editIndex].id };
      setQuestions(updated);
      setEditIndex(null);
    } else {
      setQuestions([...questions, formatted]);
    }

    setCurrentQuestion({
      text: "",
      answers: ["", "", "", ""],
      correctIndex: null,
    });
    setQuestionTouched(false);
    setAnswersTouched(false);
  };

  const handleDelete = (index) =>
    setQuestions(questions.filter((_, i) => i !== index));

  const handleEdit = (index) => {
    setCurrentQuestion(questions[index]);
    setEditIndex(index);
    window.scrollTo({ top: 300, behavior: "smooth" });
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
    if (questions.length === 0) return alert(t("atLeastOneQuestion"));

    const finalName = testName.trim() || `${config.subject || "Nazorat"} testi - ${new Date().toLocaleDateString()}`;

    testStorage.save({
      name: finalName,
      questions,
      settings: config,
    });

    testStorage.clearDraft();
    setSaveSuccessMsg(t("testSaved"));
    setTimeout(() => setSaveSuccessMsg(""), 3500);
  };

  const typesetIfEnabled = async (el) => {
    if (config.latexEnabled && el) {
      try {
        await window.MathJax?.typesetPromise?.([el]);
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
    if (questions.length === 0) return alert(t("noQuestions"));
    try {
      const element = previewRef.current;
      await typesetIfEnabled(element);
      const canvas = await html2canvas(element, { scale: 2 });
      exportPDFfromCanvas(canvas, `${testName || "test"}.pdf`);
    } catch (err) {
      alert(t("pdfError"));
      console.error(err);
    }
  };

  const handleDownloadAnswerSheet = async () => {
    if (questions.length === 0) return alert(t("noQuestions"));
    try {
      const el = answerSheetRef.current;
      const canvas = await html2canvas(el, { scale: 2 });
      exportPDFfromCanvas(canvas, `${testName || "test"}_javoblar_varaqasi.pdf`);
    } catch (err) {
      alert(t("pdfError"));
      console.error(err);
    }
  };

  const handleDownloadKeyPNG = async () => {
    if (questions.length === 0) return alert(t("noQuestions"));
    try {
      const el = answerPreviewRef.current;
      await typesetIfEnabled(el);
      const canvas = await html2canvas(el, { scale: 2 });
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/jpeg", 0.8);
      link.download = `${testName || "test"}_kalit.jpg`;
      link.click();
    } catch (err) {
      alert(t("pngError"));
      console.error(err);
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
  };

  const focusNextField = (i) => {
    const nextRef = answerRefs.current[i + 1];
    if (nextRef && nextRef.focus) nextRef.focus();
  };

  const debouncedQuestions = useDebounce(questions, 300);
  const debouncedTestName = useDebounce(testName, 300);
  const debouncedConfig = useDebounce(config, 300);

  return (
    <section className="bg-gradient-to-br from-green-50/50 via-gray-50 to-blue-50/30 min-h-screen py-8 px-4">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Main Editor Card */}
        <div className="bg-white shadow-xl shadow-green-900/5 rounded-3xl p-6 sm:p-8 border border-gray-100">
          {/* Header row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                {t("createTitle")}
              </h1>
              <p className="text-xs text-gray-500 mt-1">
                A4 formatiga mos savollarni kiriting yoki matndan nusxa ko'chirib joylashtiring
              </p>
            </div>

            {/* Action Buttons: AI Generate & Smart Import */}
            <div className="flex flex-wrap items-center gap-2.5 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setIsAIModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-green-600 hover:from-purple-700 hover:to-green-700 text-white rounded-2xl font-bold text-xs sm:text-sm shadow-md shadow-purple-600/20 transition active:scale-95 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 animate-pulse" />
                <span>AI bilan yaratish</span>
              </button>

              <button
                type="button"
                onClick={() => setIsImportModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white rounded-2xl font-bold text-xs sm:text-sm shadow-md shadow-green-600/20 transition active:scale-95 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>{t("smartImport")}</span>
              </button>
            </div>
          </div>

          {/* Toast Notification */}
          {saveSuccessMsg && (
            <div className="mb-6 p-4 rounded-2xl bg-green-50 border border-green-200 text-green-800 text-sm flex items-center gap-2 animate-in fade-in">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              <span className="font-semibold">{saveSuccessMsg}</span>
            </div>
          )}

          {/* Test Title Input */}
          <div className="mb-5">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
              {t("testName")}
            </label>
            <input
              type="text"
              placeholder={t("enterTestName")}
              value={testName}
              onChange={(e) => setTestName(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500 text-base font-semibold text-gray-800 transition"
            />
          </div>

          {/* Test Settings Accordion */}
          <div className="mb-6">
            <button
              type="button"
              onClick={() => setSettingsOpen(!settingsOpen)}
              className="flex items-center gap-2 text-xs font-bold text-gray-600 px-3.5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition cursor-pointer"
            >
              <Settings className="w-3.5 h-3.5 text-gray-500" />
              <span>{t("testSettings")}</span>
              {settingsOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {settingsOpen && (
              <div className="mt-3 p-4 bg-gray-50 rounded-2xl border border-gray-200 animate-in fade-in">
                <TestSettings config={config} setConfig={setConfig} t={t} />
              </div>
            )}
          </div>

          {/* Question List (Existing questions) */}
          {questions.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">
                  Kiritilgan savollar ({questions.length})
                </h3>
              </div>
              <QuestionList
                questions={questions}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                handleDragStart={handleDragStart}
                handleDragOver={handleDragOver}
                handleDrop={handleDrop}
              />
            </div>
          )}

          {/* Question Editor */}
          <div className="p-4 sm:p-6 bg-gray-50/70 rounded-3xl border border-gray-200 mb-6">
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Plus className="w-4 h-4 text-green-600" />
              {editIndex !== null ? t("updateQuestion") : t("addQuestion")}
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

          {/* Action Buttons */}
          <ActionButtons
            handleSaveTest={handleSaveTest}
            handleRandomize={handleRandomize}
            handleDownloadPDF={handleDownloadPDF}
            handleDownloadAnswerSheet={handleDownloadAnswerSheet}
            handleDownloadKeyPNG={handleDownloadKeyPNG}
            t={t}
          />
        </div>

        {/* Live A4 Test Preview */}
        {debouncedQuestions.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-base font-bold text-gray-800 flex items-center gap-2">
                <FileText className="w-5 h-5 text-green-600" />
                {t("testPreview")}
              </h2>
            </div>
            <TestPreview
              debouncedQuestions={debouncedQuestions}
              debouncedTestName={debouncedTestName}
              debouncedConfig={debouncedConfig}
              previewRef={previewRef}
              t={t}
            />
          </div>
        )}

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
    </section>
  );
}
