import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Clock,
  CheckCircle,
  XCircle,
  Award,
  RotateCcw,
  ArrowLeft,
  ArrowRight,
  Send,
  HelpCircle,
} from "lucide-react";
import { testStorage } from "../services/testStorage.js";
import { useI18n } from "../shared/hooks/useI18n.js";

export default function QuizPlayerPage() {
  const { testId } = useParams();
  const navigate = useNavigate();
  const { t } = useI18n();

  const [test, setTest] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);

  const finishQuiz = useCallback(() => {
    if (!test) return;
    let correctCount = 0;
    test.questions.forEach((q, idx) => {
      if (q.correctIndex !== null && userAnswers[idx] === q.correctIndex) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setIsFinished(true);
  }, [test, userAnswers]);

  useEffect(() => {
    const found = testStorage.getById(testId);
    if (found) {
      setTest(found);
      // Allocate 1.5 minutes per question
      setTimeLeft((found.questions?.length || 10) * 90);
    }
  }, [testId]);

  // Timer countdown
  useEffect(() => {
    if (!test || isFinished || timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          finishQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [test, isFinished, timeLeft, finishQuiz]);

  const selectAnswer = (qIndex, aIndex) => {
    if (isFinished) return;
    setUserAnswers((prev) => ({ ...prev, [qIndex]: aIndex }));
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  if (!test) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Test topilmadi</h2>
        <p className="text-gray-500 text-sm mb-4">Ushbu test o'chirilgan yoki mavjud emas.</p>
        <button
          onClick={() => navigate("/my-tests")}
          className="px-5 py-2.5 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700"
        >
          {t("mytests")}ga qaytish
        </button>
      </div>
    );
  }

  const currentQ = test.questions[currentIdx];
  const totalQuestions = test.questions.length;
  const answeredCount = Object.keys(userAnswers).length;
  const percentage = Math.round((score / (totalQuestions || 1)) * 100);

  return (
    <div className="min-h-[85vh] bg-gradient-to-br from-green-50/40 via-gray-50 to-blue-50/30 p-4 py-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Top bar with Back, Title and Timer */}
        <div className="bg-white rounded-3xl p-5 shadow-xl shadow-green-900/5 border border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/my-tests")}
              className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="font-bold text-base sm:text-lg text-gray-900 line-clamp-1">
                {test.name || "Nomsiz test"}
              </h1>
              <p className="text-xs text-gray-500">
                {currentIdx + 1} / {totalQuestions} {t("questionText").toLowerCase()}
              </p>
            </div>
          </div>

          {!isFinished && (
            <div className="flex items-center gap-2 px-3.5 py-1.5 bg-amber-50 border border-amber-200 text-amber-700 rounded-xl text-sm font-bold">
              <Clock className="w-4 h-4" />
              <span>{formatTime(timeLeft)}</span>
            </div>
          )}
        </div>

        {/* Finished Screen */}
        {isFinished ? (
          <div className="bg-white rounded-3xl p-8 shadow-xl shadow-green-900/5 border border-gray-100 text-center space-y-6 animate-in fade-in zoom-in-95">
            <div className="inline-flex p-4 bg-gradient-to-tr from-green-600 to-emerald-500 rounded-3xl text-white shadow-lg shadow-green-500/20">
              <Award className="w-12 h-12" />
            </div>

            <div>
              <h2 className="text-2xl font-black text-gray-900">{t("score")}</h2>
              <p className="text-4xl font-extrabold text-green-600 mt-2">{percentage}%</p>
              <p className="text-gray-500 text-sm mt-1">
                {score} / {totalQuestions} {t("correctAnswers").toLowerCase()}
              </p>
            </div>

            {/* Answer breakdown review */}
            <div className="text-left space-y-4 pt-4 border-t border-gray-100">
              <h3 className="font-bold text-gray-800 text-sm">Savollar tahlili:</h3>
              <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                {test.questions.map((q, qI) => {
                  const userAns = userAnswers[qI];
                  const isCorrect = q.correctIndex !== null && userAns === q.correctIndex;
                  return (
                    <div
                      key={qI}
                      className={`p-4 rounded-2xl border text-sm space-y-2 ${
                        isCorrect
                          ? "bg-green-50/50 border-green-200"
                          : "bg-red-50/40 border-red-200"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-bold text-gray-900">
                          {qI + 1}. {q.text}
                        </p>
                        {isCorrect ? (
                          <span className="text-green-600 flex items-center gap-1 text-xs font-bold flex-shrink-0">
                            <CheckCircle className="w-4 h-4" /> To'g'ri
                          </span>
                        ) : (
                          <span className="text-red-500 flex items-center gap-1 text-xs font-bold flex-shrink-0">
                            <XCircle className="w-4 h-4" /> Noto'g'ri
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {q.answers.map((a, aI) => (
                          <div
                            key={aI}
                            className={`p-2 rounded-xl border ${
                              q.correctIndex === aI
                                ? "bg-green-100 border-green-300 font-bold text-green-900"
                                : userAns === aI
                                ? "bg-red-100 border-red-300 text-red-800 line-through"
                                : "bg-white border-gray-200 text-gray-600"
                            }`}
                          >
                            {String.fromCharCode(65 + aI)}) {a}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                onClick={() => {
                  setUserAnswers({});
                  setIsFinished(false);
                  setCurrentIdx(0);
                  setTimeLeft((test.questions?.length || 10) * 90);
                }}
                className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-2xl flex items-center justify-center gap-2 transition"
              >
                <RotateCcw className="w-4 h-4" /> Qayta yechish
              </button>
              <button
                onClick={() => navigate("/my-tests")}
                className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-green-600/20 transition"
              >
                {t("mytests")}ga qaytish
              </button>
            </div>
          </div>
        ) : (
          /* Active Question View */
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-green-900/5 border border-gray-100 space-y-6">
            {/* Progress Bar */}
            <div>
              <div className="flex justify-between text-xs text-gray-500 font-semibold mb-1.5">
                <span>Savol {currentIdx + 1} / {totalQuestions}</span>
                <span>Belgilandi: {answeredCount} ta</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-green-600 h-full transition-all duration-300 rounded-full"
                  style={{ width: `${((currentIdx + 1) / totalQuestions) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Text */}
            <div className="py-2">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug">
                {currentIdx + 1}. {currentQ.text}
              </h2>
            </div>

            {/* Options list */}
            <div className="space-y-3">
              {currentQ.answers.map((answer, ansIdx) => {
                const isSelected = userAnswers[currentIdx] === ansIdx;
                return (
                  <button
                    key={ansIdx}
                    onClick={() => selectAnswer(currentIdx, ansIdx)}
                    className={`w-full p-4 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                      isSelected
                        ? "bg-green-50 border-green-500 text-green-900 shadow-sm ring-2 ring-green-500/20 font-semibold"
                        : "bg-gray-50/60 border-gray-200 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <span
                      className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs transition ${
                        isSelected
                          ? "bg-green-600 text-white shadow-sm"
                          : "bg-white border border-gray-300 text-gray-600"
                      }`}
                    >
                      {String.fromCharCode(65 + ansIdx)}
                    </span>
                    <span className="text-sm">{answer}</span>
                  </button>
                );
              })}
            </div>

            {/* Footer Navigation Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-100">
              <button
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}
                className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" /> Oldingi
              </button>

              {currentIdx < totalQuestions - 1 ? (
                <button
                  onClick={() => setCurrentIdx((i) => Math.min(totalQuestions - 1, i + 1))}
                  className="px-5 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white text-sm font-semibold flex items-center gap-1.5 shadow-md shadow-green-600/20"
                >
                  Keyingi <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={finishQuiz}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold flex items-center gap-1.5 shadow-md shadow-emerald-600/25"
                >
                  <Send className="w-4 h-4" /> {t("submitQuiz")}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
