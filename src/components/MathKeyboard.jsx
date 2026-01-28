import React from 'react';

const MathKeyboard = ({ onInsert, visible, onClose }) => {
  const mathSymbols = [
    // Basic symbols
    ['π', '√', '²', '³', '∞'],
    ['α', 'β', 'γ', 'δ', 'θ'],
    ['∑', '∫', '∂', '∇', '±'],
    ['÷', '×', '≠', '≈', '≡'],
    ['≤', '≥', '∈', '∉', '∀'],
    // Operators
    ['+', '-', '*', '/', '='],
    ['(', ')', '[', ']', '{'],
    ['}', '^', '_', '\\', '|'],
    // Greek letters
    ['λ', 'μ', 'σ', 'τ', 'ω'],
    ['Δ', 'Ω', 'Φ', 'Ψ', 'Γ']
  ];

  const handleSymbolClick = (symbol) => {
    onInsert(symbol);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50 md:items-center md:justify-end">
      <div className="bg-white rounded-t-2xl md:rounded-2xl w-full max-w-md max-h-80 overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-3 flex justify-between items-center">
          <h3 className="font-semibold text-gray-800">Matematika Simvollari</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-lg"
          >
            ✕
          </button>
        </div>
        
        <div className="p-3 grid grid-cols-5 gap-2">
          {mathSymbols.flat().map((symbol, index) => (
            <button
              key={index}
              onClick={() => handleSymbolClick(symbol)}
              className="p-2 bg-gray-100 hover:bg-blue-100 border border-gray-200 rounded-lg text-lg font-medium transition-colors"
            >
              {symbol}
            </button>
          ))}
        </div>

        <div className="p-3 border-t">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onInsert('$')}
              className="p-2 bg-blue-100 text-blue-800 border border-blue-200 rounded-lg font-medium"
            >
              $...$ (Inline)
            </button>
            <button
              onClick={() => onInsert('\\[')}
              className="p-2 bg-green-100 text-green-800 border border-green-200 rounded-lg font-medium"
            >
              \\[...\\] (Display)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MathKeyboard;
