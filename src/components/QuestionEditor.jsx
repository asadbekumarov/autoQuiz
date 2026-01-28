import React, { useRef, useEffect, useState } from "react";
import { Plus, Calculator } from "lucide-react";
import MathKeyboard from "./MathKeyboard";

export default function QuestionEditor({
  currentQuestion,
  setCurrentQuestion,
  questionTouched,
  setQuestionTouched,
  answersTouched,
  setAnswersTouched,
  handleInputChange,
  handleAddQuestion,
  editIndex,
  t,
  focusNextField,
  config,
}) {
  const answerRefs = useRef([]);
  const [showMathKeyboard, setShowMathKeyboard] = useState(false);
  const [currentInput, setCurrentInput] = useState(null);

  const detectMathFormulas = (text) => {
    const mathPatterns = [
      /\$[^$]+\$/, // $...$
      /\\\(.*?\\\)/, // \(...\)
      /\\\[.*?\\\]/, // \[...\]
    ];
    return mathPatterns.some((pattern) => pattern.test(text));
  };

  const handleMathSymbolInsert = (symbol) => {
    if (currentInput === "question") {
      const newText = currentQuestion.text + symbol;
      setCurrentQuestion({ ...currentQuestion, text: newText });
      setQuestionTouched(true);
    } else if (typeof currentInput === "number") {
      const newAnswers = [...currentQuestion.answers];
      newAnswers[currentInput] += symbol;
      setCurrentQuestion({ ...currentQuestion, answers: newAnswers });
      setAnswersTouched(true);
    }
  };

  const openMathKeyboard = (inputType) => {
    setCurrentInput(inputType);
    setShowMathKeyboard(true);
  };

  useEffect(() => {
    const renderMathPreview = async () => {
      if (config.latexEnabled) {
        // Savol matnida formulalar bo'lsa
        if (detectMathFormulas(currentQuestion.text)) {
          try {
            await window.MathJax?.typesetPromise?.();
          } catch (err) {
            console.warn("MathJax typeset failed", err);
          }
        }

        // Javoblarda formulalar bo'lsa
        currentQuestion.answers.forEach((answer, index) => {
          if (detectMathFormulas(answer)) {
            try {
              window.MathJax?.typesetPromise?.();
            } catch (err) {
              console.warn("MathJax typeset failed for answer", index, err);
            }
          }
        });
      }
    };

    renderMathPreview();
  }, [currentQuestion.text, currentQuestion.answers, config.latexEnabled]);

  return (
    <div className="bg-white border-2 rounded-lg p-6 space-y-6 mb-6">
      <div className="relative">
        <input
          type="text"
          placeholder={t("questionText")}
          value={currentQuestion.text}
          onChange={(e) => {
            setCurrentQuestion({ ...currentQuestion, text: e.target.value });
            setQuestionTouched(true);
          }}
          className="w-full p-3 rounded-lg border-2 focus:ring-2 focus:ring-green-400 focus:outline-none text-base font-semibold pr-20"
        />
        <button
          type="button"
          onClick={() => openMathKeyboard("question")}
          className="absolute right-10 top-3 p-1 bg-gray-100 hover:bg-blue-100 rounded text-sm text-gray-600 hover:text-blue-700 transition-colors"
          title="Matematika simvollari"
        >
          <Calculator className="w-4 h-4" />
        </button>
        {detectMathFormulas(currentQuestion.text) && (
          <div className="absolute right-3 top-3 bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
            📐 Formula
          </div>
        )}
      </div>
      {questionTouched && !currentQuestion.text.trim() && (
        <div className="text-red-600 text-sm">{t("enterQuestionText")}</div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentQuestion.answers.map((ans, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="relative flex-1">
              <input
                ref={(el) => (answerRefs.current[i] = el)}
                type="text"
                placeholder={`${String.fromCharCode(97 + i)}) ${t("answer")}`}
                value={ans}
                onChange={(e) => handleInputChange(i, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    if (i < currentQuestion.answers.length - 1) {
                      focusNextField(i);
                    } else {
                      handleAddQuestion();
                    }
                  }
                }}
                className="w-full p-3 rounded-lg border-2 focus:ring-2 focus:ring-green-400 focus:outline-none text-base font-semibold pr-16"
              />
              {detectMathFormulas(ans) && (
                <button
                  type="button"
                  onClick={() => openMathKeyboard(i)}
                  className="absolute right-8 top-3 p-1 bg-gray-100 hover:bg-blue-100 rounded text-xs text-gray-600 hover:text-blue-700 transition-colors"
                  title="Matematika simvollari"
                >
                  <Calculator className="w-3 h-3" />
                </button>
                // <div className="absolute right-3 top-3 bg-blue-100 text-blue-800 px-1 py-0.5 rounded text-xs">
                //   📐
                // </div>
              )}
            </div>
            <label className="flex items-center gap-1 text-sm">
              <input
                type="radio"
                name="correctAnswer"
                checked={currentQuestion.correctIndex === i}
                onChange={() =>
                  setCurrentQuestion({ ...currentQuestion, correctIndex: i })
                }
              />
              {t("correct")}
            </label>
          </div>
        ))}
      </div>
      {answersTouched &&
        currentQuestion.answers.filter((a) => a.trim()).length < 2 && (
          <div className="text-red-600 text-sm">{t("atLeastTwoAnswers")}</div>
        )}
      <button
        onClick={handleAddQuestion}
        className="w-full flex justify-center items-center gap-2 py-3 rounded-lg text-green-700 bg-green-100 transition"
      >
        <Plus className="w-4 h-4" />
        {editIndex !== null ? t("updateQuestion") : t("addQuestion")}
      </button>

      <MathKeyboard
        visible={showMathKeyboard}
        onInsert={handleMathSymbolInsert}
        onClose={() => setShowMathKeyboard(false)}
      />
    </div>
  );
}
