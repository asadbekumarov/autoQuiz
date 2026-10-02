import React from "react";
import {
  Edit,
  Trash2,
  Copy,
  ChevronUp,
  ChevronDown,
  GripVertical,
  Compass,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import GeometryDiagram from "./GeometryDiagram";

export default function QuestionList({
  questions,
  handleEdit,
  handleDelete,
  handleDuplicate,
  handleMoveUp,
  handleMoveDown,
  handleDragStart,
  handleDragOver,
  handleDrop,
}) {
  const unselectedAnswersCount = questions.filter(
    (q) => q.correctIndex === null
  ).length;

  return (
    <div className="space-y-3">
      {/* Warning banner if any questions lack a correct answer */}
      {unselectedAnswersCount > 0 && (
        <div className="p-2.5 px-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>{unselectedAnswersCount} ta</strong> savolda to'g'ri javob belgilanmagan.
            </span>
          </div>
          <span className="text-[11px] text-amber-700 font-semibold">
            Kalit generatsiyasi uchun to'g'ri javobni tanlang
          </span>
        </div>
      )}

      <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1 scrollbar-thin">
        {questions.map((q, index) => {
          const hasNoCorrect = q.correctIndex === null;
          return (
            <div
              key={q.id || index}
              className={`bg-white border rounded-2xl p-3.5 sm:p-4 flex items-start gap-2.5 sm:gap-3 transition shadow-xs group ${
                hasNoCorrect
                  ? "border-amber-200 hover:border-amber-300"
                  : "border-gray-200 hover:border-emerald-300"
              }`}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(index)}
            >
              {/* Order and Move Buttons */}
              <div className="flex flex-col items-center gap-0.5 pt-0.5 text-gray-400">
                {handleMoveUp && (
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={() => handleMoveUp(index)}
                    className="p-1 hover:text-emerald-700 disabled:opacity-20 disabled:hover:text-gray-400 rounded transition cursor-pointer"
                    title="Yuqoriga ko'chirish"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                )}

                <div
                  className="cursor-grab active:cursor-grabbing text-gray-300 group-hover:text-gray-500 py-0.5"
                  title="Surish orqali tartibini o'zgartirish"
                >
                  <GripVertical className="w-3.5 h-3.5" />
                </div>

                {handleMoveDown && (
                  <button
                    type="button"
                    disabled={index === questions.length - 1}
                    onClick={() => handleMoveDown(index)}
                    className="p-1 hover:text-emerald-700 disabled:opacity-20 disabled:hover:text-gray-400 rounded transition cursor-pointer"
                    title="Pastga ko'chirish"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Question Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-bold text-gray-900 text-sm leading-snug">
                    <span className="text-emerald-700 font-extrabold mr-1.5">
                      {index + 1}.
                    </span>
                    <span>{q.text}</span>
                  </h4>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {hasNoCorrect && (
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded-md flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 text-amber-600" />
                        Javob tanlanmagan
                      </span>
                    )}

                    {q.diagram && (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-lg">
                        <Compass className="w-3 h-3 text-amber-600" />
                        Chizma
                      </span>
                    )}
                  </div>
                </div>

                {/* Answer Options */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2.5">
                  {q.answers.map((a, i) => {
                    const isCorrect = q.correctIndex === i;
                    return (
                      <div
                        key={i}
                        className={`text-xs px-2.5 py-1.5 rounded-xl border flex items-center gap-1.5 truncate ${
                          isCorrect
                            ? "bg-emerald-50 text-emerald-900 border-emerald-300 font-bold"
                            : "bg-gray-50/80 text-gray-700 border-gray-200"
                        }`}
                      >
                        <span className="font-bold text-gray-500 uppercase">
                          {String.fromCharCode(65 + i)})
                        </span>
                        <span className="truncate">{a}</span>
                        {isCorrect && (
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0 ml-auto" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons: Duplicate, Edit, Delete */}
              <div className="flex items-center gap-0.5 shrink-0 pt-0.5">
                {handleDuplicate && (
                  <button
                    type="button"
                    onClick={() => handleDuplicate(index)}
                    className="p-1.5 text-gray-400 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition cursor-pointer"
                    title="Savoldan nusxa olish (Duplicate)"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => handleEdit(index)}
                  className="p-1.5 text-gray-400 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition cursor-pointer"
                  title="Savolni tahrirlash"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(index)}
                  className="p-1.5 text-gray-400 hover:text-red-700 hover:bg-red-50 rounded-xl transition cursor-pointer"
                  title="Savolni o'chirish"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
