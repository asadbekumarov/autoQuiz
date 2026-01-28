import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

export default function QuestionList({ questions, handleEdit, handleDelete, handleDragStart, handleDragOver, handleDrop }) {
    return (
        <div className="max-h-64 overflow-y-auto pr-2 mb-6">
            {questions.map((q, index) => (
                <div
                    key={q.id || index}
                    className="bg-white border rounded-lg p-4 mb-4 flex justify-between items-start"
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={handleDragOver}
                    onDrop={() => handleDrop(index)}
                >
                    <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">
                            {index + 1}. {q.text}
                        </h3>
                        <ul className="pl-6 text-gray-600 mt-1 list-disc">
                            {q.answers.map((a, i) => (
                                <li key={i} className="flex items-center gap-2">
                                    {String.fromCharCode(97 + i)}) {a}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => handleEdit(index)}
                            className="text-blue-600 hover:text-blue-800 p-2"
                        >
                            <Edit className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => handleDelete(index)}
                            className="text-red-600 hover:text-red-800 p-2"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
