import { useState, useEffect, useRef } from "react";
import { Settings } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import TestSettings from "../components/TestSettings";
import QuestionList from "../components/QuestionList";
import QuestionEditor from "../components/QuestionEditor";
import ActionButtons from "../components/ActionButtons";
import TestPreview from "../components/TestPreview";
import AnswerKeyPreview from "../components/AnswerKeyPreview";

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
  const [testName, setTestName] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({
    text: "",
    answers: ["", "", "", ""],
    correctIndex: null,
  });
  const [editIndex, setEditIndex] = useState(null);
  const [localSavedTests, setLocalSavedTests] = useState([]);
  const [settingsOpen, setSettingsOpen] = useState(true);
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
  const [questionTouched, setQuestionTouched] = useState(false);
  const [answersTouched, setAnswersTouched] = useState(false);
  const getLang = () => {
    try {
      const s = JSON.parse(localStorage.getItem("settings") || "{}");
      return s.language || "uz";
    } catch {
      return "uz";
    }
  };
  const [lang, setLang] = useState(getLang());
  const t = (key) => {
    const dict = {
      uz: {
        createTitle: "Test yaratish",
        testSettings: "Test Sozlamalari",
        school: "Maktab/Tashkilot",
        subject: "Fan",
        class: "Sinf",
        date: "Sana",
        twoColumns: "2 ustunli ko'rinish",
        latex: "LaTeX/MathJax formatlash",
        questionText: "Savol matni",
        answer: "Javob",
        correct: "To'g'ri",
        addQuestion: "Savol qo'shish",
        updateQuestion: "Savolni yangilash",
        save: "Saqlash",
        shuffle: "Aralashtirish",
        pdf: "PDF",
        png: "PNG",

        student: "O'quvchi:",
        testPreview: "Test Preview",
        answerKey: "Javoblar kaliti",
        enterTestName: "Test nomini kiriting",
        enterQuestionText: "Savol matnini kiriting",
        atLeastOneQuestion: "Kamida 1 ta savol qo'shing!",
        atLeastTwoAnswers: "Kamida 2 ta javob variantini kiriting!",
        noQuestions: "Savollar mavjud emas",
        pdfError:
          "PDF eksport xatosi: brauzer cheklovi yoki rasm yaratish muammosi.",
        pngError:
          "PNG eksport xatosi: brauzer cheklovi yoki rasm yaratish muammosi.",
      },
      en: {
        createTitle: "Create Test",
        testSettings: "Test Settings",
        school: "School/Organization",
        subject: "Subject",
        class: "Class",
        date: "Date",
        twoColumns: "Two-column layout",
        latex: "LaTeX/MathJax formatting",
        questionText: "Question text",
        answer: "Answer",
        correct: "Correct",
        addQuestion: "Add question",
        updateQuestion: "Update question",
        save: "Save",
        shuffle: "Shuffle",
        pdf: "PDF",
        png: "PNG",
        student: "Student:",
        testPreview: "Test Preview",
        answerKey: "Answer Key",
        enterTestName: "Enter test name",
        enterQuestionText: "Enter question text",
        atLeastOneQuestion: "Add at least 1 question!",
        atLeastTwoAnswers: "Enter at least 2 answer options!",
        noQuestions: "No questions",
        pdfError: "PDF export error: browser restriction or image issue.",
        pngError: "PNG export error: browser restriction or image issue.",
      },
      ru: {
        createTitle: "Создать тест",
        testSettings: "Настройки теста",
        school: "Школа/Организация",
        subject: "Предмет",
        class: "Класс",
        date: "Дата",
        twoColumns: "Двухколоночный режим",
        latex: "LaTeX/MathJax форматирование",
        questionText: "Текст вопроса",
        answer: "Ответ",
        correct: "Верный",
        addQuestion: "Добавить вопрос",
        updateQuestion: "Обновить вопрос",
        save: "Сохранить",
        shuffle: "Перемешать",
        pdf: "PDF",
        png: "PNG",
        student: "Ученик:",
        testPreview: "Предпросмотр теста",
        answerKey: "Ключ ответов",
        enterTestName: "Введите название теста",
        enterQuestionText: "Введите текст вопроса",
        atLeastOneQuestion: "Добавьте хотя бы 1 вопрос!",
        atLeastTwoAnswers: "Введите минимум 2 варианта ответа!",
        noQuestions: "Нет вопросов",
        pdfError:
          "Ошибка экспорта PDF: ограничение браузера или проблема изображения.",
        pngError:
          "Ошибка экспорта PNG: ограничение браузера или проблема изображения.",
      },
    };
    return (dict[lang] || dict.uz)[key] || key;
  };

  useEffect(() => {
    const onSettingsChanged = () => setLang(getLang());
    window.addEventListener("settingsChanged", onSettingsChanged);
    return () =>
      window.removeEventListener("settingsChanged", onSettingsChanged);
  }, []);

  useEffect(() => {
    try {
      const d = JSON.parse(localStorage.getItem("draftTest") || "null");
      if (d) {
        setTestName(d.testName || "");
        setQuestions(Array.isArray(d.questions) ? d.questions : []);
        setConfig((c) => (d.config ? { ...c, ...d.config } : c));
      }
    } catch {
      console.warn("draft restore failed");
    }
  }, []);

  useEffect(() => {
    let saved = [];
    try {
      saved = JSON.parse(localStorage.getItem("savedTests") || "[]");
    } catch {
      saved = [];
    }
    setLocalSavedTests(saved);
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
            answers: (opts && opts.length ? opts : ["A", "B", "C", "D"]).slice(
              0,
              4,
            ),
            correctIndex: null,
          }));

        let qs = makeMCQs(tpl.options || []);
        qs = qs.map((q, i) => ({ ...q, id: Date.now() + i }));
        setQuestions(qs);
      }
      localStorage.removeItem("templateToUse");
    }
  }, []);

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
      const found = pairs.findIndex(
        (p) => p.idx === currentQuestion.correctIndex,
      );
      newCorrectIndex = found !== -1 ? found : null;
    }

    const formatted = {
      text: sanitize(
        currentQuestion.text.trim().endsWith("?")
          ? currentQuestion.text.trim()
          : currentQuestion.text.trim() + "?",
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
  };

  const handleSaveTest = () => {
    if (!testName.trim()) return alert(t("enterTestName"));
    if (questions.length === 0) return alert(t("atLeastOneQuestion"));

    const newTest = {
      id: Date.now(),
      name: testName,
      questions,
      createdAt: new Date().toISOString(),
      settings: config,
    };

    const updated = [...localSavedTests, newTest];
    try {
      localStorage.setItem("savedTests", JSON.stringify(updated));
    } catch {
      console.warn("localStorage set failed");
    }
    setLocalSavedTests(updated);

    alert("Test saqlandi!");
    setTestName("");
    setQuestions([]);
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

  useEffect(() => {
    const id = setTimeout(() => {
      try {
        const payload = { testName, questions, config };
        localStorage.setItem("draftTest", JSON.stringify(payload));
      } catch {
        console.warn("autosave failed");
      }
    }, 300);
    return () => clearTimeout(id);
  }, [testName, questions, config]);

  useEffect(() => {
    const onKey = (e) => {
      const k = String(e.key || "").toLowerCase();
      if (e.ctrlKey && !e.shiftKey && k === "s") {
        e.preventDefault();
        handleSaveTest();
      }
      if (e.ctrlKey && e.shiftKey && k === "q") {
        e.preventDefault();
        const q = {
          id: Date.now(),
          text: sanitize(t("questionText")) + "?",
          answers: ["", "", "", ""],
          correctIndex: null,
        };
        setQuestions((prev) => [...prev, q]);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [testName, questions, config, lang]);

  const debouncedQuestions = useDebounce(questions, 300);
  const debouncedTestName = useDebounce(testName, 300);
  const debouncedConfig = useDebounce(config, 300);

  const exportPDFfromCanvas = (canvas, filename) => {
    const doc = new jsPDF({ unit: "mm", format: "a4" });
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
        sliceHeight,
      );
      const imgData = temp.toDataURL("image/png");
      const drawH = sliceHeight * scale;
      if (!first) doc.addPage();
      doc.addImage(imgData, "PNG", 0, 0, pdfW, drawH);
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

  const handleDownloadKeyPNG = async () => {
    if (questions.length === 0) return alert(t("noQuestions"));
    try {
      const el = answerPreviewRef.current;
      await typesetIfEnabled(el);
      const canvas = await html2canvas(el, { scale: 2 });
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
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

  useEffect(() => {
    if (config.latexEnabled && previewRef.current) {
      window.MathJax?.typesetPromise?.([previewRef.current]).catch(() => {});
    }
  }, [questions, testName, config]);

  return (
    <section className="bg-green-50 min-h-screen py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            {t("createTitle")}
          </h1>

          <input
            type="text"
            placeholder="Test nomini kiriting..."
            value={testName}
            onChange={(e) => setTestName(e.target.value)}
            className="w-full p-3 rounded-lg border-2 focus:ring-2 focus:ring-green-400 focus:outline-none text-lg font-semibold mb-6"
          />

          <div className="mb-4">
            <button
              onClick={() => setSettingsOpen(!settingsOpen)}
              className="flex items-center gap-2 text-sm px-3 py-2 rounded bg-gray-100 hover:bg-gray-200"
            >
              <Settings className="w-4 h-4" /> {t("testSettings")}
            </button>
            {settingsOpen && (
              <TestSettings config={config} setConfig={setConfig} t={t} />
            )}
          </div>

          {/* Savollar ro'yxati */}
          {questions.length > 0 && (
            <QuestionList
              questions={questions}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              handleDragStart={handleDragStart}
              handleDragOver={handleDragOver}
              handleDrop={handleDrop}
            />
          )}

          {/* Savol qo'shish */}
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

          {/* Tugmalar */}
          <ActionButtons
            handleSaveTest={handleSaveTest}
            handleRandomize={handleRandomize}
            handleDownloadPDF={handleDownloadPDF}
            handleDownloadPNG={handleDownloadKeyPNG}
            t={t}
          />
        </div>

        {/* Preview */}
        {debouncedQuestions.length > 0 && (
          <TestPreview
            debouncedQuestions={debouncedQuestions}
            debouncedTestName={debouncedTestName}
            debouncedConfig={debouncedConfig}
            previewRef={previewRef}
            t={t}
          />
        )}
        {/* Javoblar kaliti (eksport uchun off-screen) */}
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
    </section>
  );
}
