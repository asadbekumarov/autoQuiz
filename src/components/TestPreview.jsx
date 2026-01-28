import React from 'react';

export default function TestPreview({ debouncedQuestions, debouncedTestName, debouncedConfig, previewRef, t }) {
    return (
        <div
            ref={previewRef}
            className="bg-white rounded-lg shadow-md p-6 mt-8 print:w-[210mm] print:h-[297mm]"
        >
            <div className="mb-4">
                <h2 className="text-center text-xl font-bold text-gray-800">
                    {debouncedTestName || t('testPreview')}
                </h2>
                <div className="flex justify-between text-xs text-gray-600 mt-2">
                    <span>{debouncedConfig.school}</span>
                    <span>{debouncedConfig.subject}</span>
                    <span>{debouncedConfig.className}</span>
                    <span>{debouncedConfig.date}</span>
                </div>
                <div className="mt-2 text-sm">{t('student')} ______________________________</div>
            </div>
            <div className={debouncedConfig.twoColumns ? "grid grid-cols-1 md:grid-cols-2 gap-4" : "grid grid-cols-1 gap-4"}>
                {debouncedQuestions.map((q, i) => (
                    <div key={q.id || i} className="border rounded-lg p-3">
                        <p className="font-medium mb-2">
                            {i + 1}. {q.text}
                        </p>
                        {q.answers.map((a, j) => (
                            <div key={j} className="text-sm ml-4">
                                {String.fromCharCode(97 + j)}) {a}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
