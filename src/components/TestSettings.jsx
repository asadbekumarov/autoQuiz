import React from 'react';

export default function TestSettings({ config, setConfig, t }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <input
                type="text"
                placeholder={t('school')}
                value={config.school}
                onChange={(e) => setConfig({ ...config, school: e.target.value })}
                className="w-full p-3 rounded-lg border-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
            />
            <input
                type="text"
                placeholder={t('subject')}
                value={config.subject}
                onChange={(e) => setConfig({ ...config, subject: e.target.value })}
                className="w-full p-3 rounded-lg border-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
            />
            <input
                type="text"
                placeholder={t('class')}
                value={config.className}
                onChange={(e) => setConfig({ ...config, className: e.target.value })}
                className="w-full p-3 rounded-lg border-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
            />
            <input
                type="date"
                placeholder={t('date')}
                value={config.date}
                onChange={(e) => setConfig({ ...config, date: e.target.value })}
                className="w-full p-3 rounded-lg border-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
            />
            <label className="flex items-center gap-2">
                <input
                    type="checkbox"
                    checked={config.twoColumns}
                    onChange={(e) => setConfig({ ...config, twoColumns: e.target.checked })}
                />
                {t('twoColumns')}
            </label>
            <label className="flex items-center gap-2">
                <input
                    type="checkbox"
                    checked={config.latexEnabled}
                    onChange={(e) => setConfig({ ...config, latexEnabled: e.target.checked })}
                />
                {t('latex')}
            </label>
            <p className="text-xs text-gray-500 mt-1">LaTeX formulalarini render qilish uchun MathJax yoqiladi.</p>
        </div>
    );
}
