import React from 'react';

const SettingsPanel = ({ value, onChange }) => (
    <div>
        <label className="block font-bold mb-3 text-blue-900 text-lg sm:text-xl">
            Har A4 sahifada nechta savol chiqsin?
        </label>
        <select
            value={value}
            onChange={e => onChange(parseInt(e.target.value))}
            className="w-full p-4 sm:p-5 border-2 border-blue-400 rounded-xl focus:ring-2 focus:ring-blue-700 focus:border-blue-700 bg-white text-lg sm:text-xl font-semibold text-blue-900"
        >
            {[3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                <option key={num} value={num}>{num} ta</option>
            ))}
        </select>
        <p className="text-base sm:text-lg text-blue-700 mt-3 font-medium">
            Ko'proq savol = kamroq sahifa, lekin matn kichikroq bo'ladi
        </p>
    </div>
);

export default SettingsPanel;
