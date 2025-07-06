import React from 'react';

const QuestionList = ({ questions, onEdit, onDelete }) => {
    if (!questions.length) {
        return (
            <div className="text-gray-400 italic text-center py-6 text-lg">
                Hozircha savollar yo'q. Yangi savol qo'shing.
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow p-6 mb-6">
            <h3 className="text-xl font-bold mb-4 text-blue-900 drop-shadow">Kiritilgan savollar</h3>
            <ul className="space-y-4">
                {questions.map((q, idx) => (
                    <li key={q.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3 last:border-b-0 last:pb-0">
                        <div>
                            <span className="font-semibold text-lg text-gray-800 mr-2">{idx + 1}.</span>
                            <span className="text-lg text-gray-900 font-medium">{q.question}</span>
                            <div className="ml-8 mt-1 space-y-1">
                                {Object.entries(q.options).map(([key, value]) =>
                                    value ? (
                                        <div key={key} className="text-base text-gray-700">{key}) {value}</div>
                                    ) : null
                                )}
                            </div>
                        </div>
                        <div className="flex gap-2 mt-2 sm:mt-0">
                            <button
                                onClick={() => onEdit(q)}
                                className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded-lg font-bold text-lg shadow"
                                title="Tahrirlash"
                            >
                                ✏️
                            </button>
                            <button
                                onClick={() => onDelete(q.id)}
                                className="bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded-lg font-bold text-lg shadow"
                                title="O'chirish"
                            >
                                ❌
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QuestionList; 