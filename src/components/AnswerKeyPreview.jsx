import React from 'react';

export default function AnswerKeyPreview({ debouncedQuestions, debouncedTestName, debouncedConfig, answerPreviewRef, t }) {
    return (
        <div
            ref={answerPreviewRef}
            style={{ position: "absolute", left: "-9999px", top: 0, width: "210mm" }}
            className="bg-white rounded-lg shadow-md p-6 mt-8"
        >
            <div className="mb-4">
                <h2 className="text-center text-xl font-bold text-gray-800">
                    {debouncedTestName || t('testPreview')} — {t('answerKey')}
                </h2>
                <div className="flex justify-between text-xs text-gray-600 mt-2">
                    <span>{debouncedConfig.school}</span>
                    <span>{debouncedConfig.subject}</span>
                    <span>{debouncedConfig.className}</span>
                    <span>{debouncedConfig.date}</span>
                </div>
            </div>
            <div className="space-y-2">
                {debouncedQuestions.map((q, i) => (
                    <div key={q.id || i} className="text-sm">
                        <span className="font-medium">{i + 1}.</span> {q.text} — 
                        <span className="ml-2">
                            {q.correctIndex !== null
                                ? String.fromCharCode(97 + q.correctIndex)
                                : "Belgilanmagan"}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
