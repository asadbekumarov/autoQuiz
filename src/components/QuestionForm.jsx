import React, { useState, useEffect } from 'react';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const QuestionForm = ({ onAdd, editingQuestion, onUpdate, onCancelEdit }) => {
    const [questionText, setQuestionText] = useState('');
    const [options, setOptions] = useState({ A: '', B: '' });
    const [dynamicOptions, setDynamicOptions] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        if (editingQuestion) {
            setQuestionText(editingQuestion.question);
            const fixedOptions = { A: editingQuestion.options.A || '', B: editingQuestion.options.B || '' };
            const other = Object.keys(editingQuestion.options)
                .filter(k => k !== 'A' && k !== 'B')
                .map(k => [k, editingQuestion.options[k]]);
            setOptions(fixedOptions);
            setDynamicOptions(other);
        } else {
            setQuestionText('');
            setOptions({ A: '', B: '' });
            setDynamicOptions([]);
        }
    }, [editingQuestion]);

    const handleSubmit = () => {
        setError('');
        if (!questionText.trim()) {
            setError('Savol matni kiritilmagan');
            return;
        }

        if (!options.A.trim() || !options.B.trim()) {
            setError('A va B variantlari majburiy');
            return;
        }

        const allOptions = { ...options };
        dynamicOptions.forEach(([k, v]) => {
            allOptions[k] = v.trim();
        });

        const questionData = {
            question: questionText.trim(),
            options: allOptions,
        };

        editingQuestion ? onUpdate(editingQuestion.id, questionData) : onAdd(questionData);

        setQuestionText('');
        setOptions({ A: '', B: '' });
        setDynamicOptions([]);
    };

    const handleAddOption = () => {
        const used = ['A', 'B', ...dynamicOptions.map(([k]) => k)];
        const next = alphabet.find(l => !used.includes(l));
        if (next) {
            setDynamicOptions([...dynamicOptions, [next, '']]);
        }
    };

    const handleCancel = () => {
        setQuestionText('');
        setOptions({ A: '', B: '' });
        setDynamicOptions([]);
        setError('');
        onCancelEdit && onCancelEdit();
    };

    return (
        <div className=" bg-white">
            <h2 className="text-2xl font-bold text-center text-blue-900 drop-shadow">{editingQuestion ? '✏️ Savolni tahrirlash' : '➕ Yangi savol'}</h2>

            {error && <div className="text-red-700 bg-red-100 px-4 py-3 rounded text-base font-semibold text-center">{error}</div>}

            <div>
                <label className="block font-bold text-lg mb-2 text-gray-800">Savol matni <span className="text-red-500">*</span></label>
                <textarea
                    value={questionText}
                    onChange={e => setQuestionText(e.target.value)}
                    placeholder="Savolni yozing..."
                    rows="3"
                    className="w-full border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-600 text-lg bg-gray-50"
                />
            </div>

            <div className="space-y-3">
                <label className="block font-bold text-lg text-gray-800">Variantlar:</label>

                {['A', 'B'].map((key) => (
                    <div key={key} className="flex items-center gap-3">
                        <span className="w-8 font-bold text-lg text-gray-700">{key})</span>
                        <input
                            value={options[key]}
                            onChange={e => setOptions({ ...options, [key]: e.target.value })}
                            placeholder={`${key} variant (majburiy)`}
                            className="flex-1 border-2 border-gray-300 rounded-lg p-3 text-lg focus:ring-2 focus:ring-blue-600 bg-gray-50"
                        />
                        <span className="text-red-500 text-lg font-bold">*</span>
                    </div>
                ))}

                {dynamicOptions.map(([key, value], index) => (
                    <div key={key} className="flex items-center gap-3">
                        <span className="w-8 font-bold text-lg text-gray-700">{key})</span>
                        <input
                            value={value}
                            onChange={e => {
                                const newOptions = [...dynamicOptions];
                                newOptions[index] = [key, e.target.value];
                                setDynamicOptions(newOptions);
                            }}
                            placeholder={`${key} variant (ixtiyoriy)`}
                            className="flex-1 border-2 border-gray-300 rounded-lg p-3 text-lg focus:ring-2 focus:ring-blue-600 bg-gray-50"
                        />
                    </div>
                ))}
            </div>

            <button
                onClick={handleAddOption}
                className="text-lg bg-green-600 hover:bg-green-700 text-white py-2 px-5 rounded-lg font-semibold shadow"
            >
                ➕ Variant qo‘shish
            </button>

            <div className="flex flex-col sm:flex-row gap-3">
                <button
                    onClick={handleSubmit}
                    className="flex-1 bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-lg text-lg font-bold shadow"
                >
                    {editingQuestion ? '✏️ Saqlash' : '➕ Qo‘shish'}
                </button>
                {editingQuestion && (
                    <button
                        onClick={handleCancel}
                        className="bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-lg text-lg font-bold shadow"
                    >
                        ❌ Bekor
                    </button>
                )}
            </div>
        </div>
    );
};

export default QuestionForm;
