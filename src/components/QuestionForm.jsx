import React, { useState } from 'react';

const QuestionForm = ({ onAdd, editingQuestion, onUpdate, onCancelEdit }) => {
    const [questionText, setQuestionText] = useState(editingQuestion ? editingQuestion.question : '');
    const [options, setOptions] = useState(editingQuestion ? editingQuestion.options : { A: '', B: '', C: '', D: '' });
    const [error, setError] = useState('');

    // Update form when editing question changes
    React.useEffect(() => {
        if (editingQuestion) {
            setQuestionText(editingQuestion.question);
            setOptions(editingQuestion.options);
        } else {
            setQuestionText('');
            setOptions({ A: '', B: '', C: '', D: '' });
        }
    }, [editingQuestion]);

    const handleSubmit = () => {
        setError('');

        if (!questionText.trim()) {
            setError('Savol matni kiritilmagan');
            return;
        }

        if (!options.A.trim() || !options.B.trim()) {
            setError('A va B variantlari to\'ldirilishi majburiy');
            return;
        }

        const questionData = {
            question: questionText.trim(),
            options: {
                A: options.A.trim(),
                B: options.B.trim(),
                C: options.C.trim(),
                D: options.D.trim()
            }
        };

        if (editingQuestion) {
            onUpdate(editingQuestion.id, questionData);
        } else {
            onAdd(questionData);
        }

        setQuestionText('');
        setOptions({ A: '', B: '', C: '', D: '' });
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    const handleCancel = () => {
        setQuestionText('');
        setOptions({ A: '', B: '', C: '', D: '' });
        setError('');
        onCancelEdit();
    };

    return (
        <div className="w-full max-w-md mx-auto space-y-3 sm:space-y-4 p-4 sm:p-6 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-center">
                {editingQuestion ? 'Savolni tahrirlash' : 'Yangi savol qo\'shish'}
            </h3>

            {error && (
                <div className="text-red-500 text-sm text-center bg-red-100 p-2 rounded">
                    {error}
                </div>
            )}

            <div>
                <label className="block text-sm font-medium mb-1">Savol matni: <span className="text-red-500">*</span></label>
                <textarea
                    value={questionText}
                    onChange={e => setQuestionText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Savol matnini kiriting..."
                    className="w-full p-2 sm:p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    rows="3"
                />
            </div>

            <div className="space-y-2 sm:space-y-3">
                <label className="block text-sm font-medium">Variantlar:</label>
                {['A', 'B', 'C', 'D'].map(opt => (
                    <div key={opt} className="flex items-center">
                        <span className="font-medium mr-2 w-6 text-sm sm:text-base">{opt})</span>
                        <input
                            value={options[opt]}
                            onChange={e => setOptions({ ...options, [opt]: e.target.value })}
                            onKeyPress={handleKeyPress}
                            placeholder={`${opt} variant ${opt === 'A' || opt === 'B' ? '(majburiy)' : '(ixtiyoriy)'}`}
                            className={`flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base ${(opt === 'A' || opt === 'B') && !options[opt].trim() ? 'border-red-300' : ''
                                }`}
                        />
                        {(opt === 'A' || opt === 'B') && <span className="text-red-500 ml-1 text-sm">*</span>}
                    </div>
                ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
                <button
                    onClick={handleSubmit}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-medium transition-colors text-sm sm:text-base"
                >
                    {editingQuestion ? '✏️ Tahrirlash' : '➕ Savol qo\'shish'}
                </button>
                {editingQuestion && (
                    <button
                        onClick={handleCancel}
                        className="px-3 sm:px-4 py-2 sm:py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors text-sm sm:text-base"
                    >
                        ❌ Bekor
                    </button>
                )}
            </div>
        </div>
    );
};

export default QuestionForm;
