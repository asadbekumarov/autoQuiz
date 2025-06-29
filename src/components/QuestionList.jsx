import React from 'react';

const QuestionList = ({ questions = [], onDelete, onEdit }) => (
    <div className="mt-6 sm:mt-8 w-full">
        <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">📝 Kiritilgan savollar:</h2>
        {questions.length === 0 ? (
            <p className="text-gray-500 text-center py-6 sm:py-8 text-sm sm:text-base">Savollar yo'q. Birinchi savolni qo'shing!</p>
        ) : (
            <ul className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                {questions.map((q, i) => (
                    <li key={q.id} className="p-3 sm:p-4 border rounded-lg shadow-sm bg-white">
                        <div className="flex justify-between items-start mb-2">
                            <b className="text-base sm:text-lg leading-tight">{i + 1}. {q.question}</b>
                            <div className="flex gap-1 ml-2">
                                {onEdit && (
                                    <button
                                        onClick={() => onEdit(q)}
                                        className="text-blue-500 hover:text-blue-700 text-sm px-2 py-1 rounded transition-colors"
                                        title="Tahrirlash"
                                    >
                                        ✏️
                                    </button>
                                )}
                                {onDelete && (
                                    <button
                                        onClick={() => onDelete(q.id)}
                                        className="text-red-500 hover:text-red-700 text-sm px-2 py-1 rounded transition-colors"
                                        title="O'chirish"
                                    >
                                        ❌
                                    </button>
                                )}
                            </div>
                        </div>
                        <ul className="ml-2 sm:ml-4 space-y-1">
                            <li className="flex items-start">
                                <span className="font-medium mr-2 text-sm sm:text-base">A)</span>
                                <span className="text-sm sm:text-base">{q.options.A}</span>
                            </li>
                            <li className="flex items-start">
                                <span className="font-medium mr-2 text-sm sm:text-base">B)</span>
                                <span className="text-sm sm:text-base">{q.options.B}</span>
                            </li>
                            {q.options.C && (
                                <li className="flex items-start">
                                    <span className="font-medium mr-2 text-sm sm:text-base">C)</span>
                                    <span className="text-sm sm:text-base">{q.options.C}</span>
                                </li>
                            )}
                            {q.options.D && (
                                <li className="flex items-start">
                                    <span className="font-medium mr-2 text-sm sm:text-base">D)</span>
                                    <span className="text-sm sm:text-base">{q.options.D}</span>
                                </li>
                            )}
                        </ul>
                    </li>
                ))}
            </ul>
        )}
    </div>
);

export default QuestionList;
