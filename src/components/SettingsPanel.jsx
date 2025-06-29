import React from 'react';

const SettingsPanel = ({ value, onChange }) => (
    <div className="w-full max-w-md mx-auto p-3 sm:p-4 bg-blue-50 rounded-lg">
        <label className="block font-medium mb-2 text-blue-800 text-sm sm:text-base">
            Har A4 sahifada nechta savol chiqsin?
        </label>
        <select
            value={value}
            onChange={e => onChange(parseInt(e.target.value))}
            className="w-full p-2 sm:p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm sm:text-base"
        >
            {[3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                <option key={num} value={num}>{num} ta</option>
            ))}
        </select>
        <p className="text-xs sm:text-sm text-gray-600 mt-2">
            Ko'proq savol = kamroq sahifa, lekin matn kichikroq bo'ladi
        </p>
    </div>
);

export default SettingsPanel;
