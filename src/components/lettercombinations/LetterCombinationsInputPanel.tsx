import { useState } from 'react';
import { Sparkles, RefreshCw, Phone } from 'lucide-react';

interface LetterCombinationsInputPanelProps {
  digits: string;
  setDigits: (digits: string) => void;
}

export default function LetterCombinationsInputPanel({ digits, setDigits }: LetterCombinationsInputPanelProps) {
  const [inputValue, setInputValue] = useState(digits);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^2-9]/g, ''); // Only allow 2-9
    setInputValue(value);
    setDigits(value);
  };

  const handleRandom = () => {
    const length = Math.floor(Math.random() * 3) + 1; // 1-3 digits
    const randomDigits = Array.from({ length }, () => 
      String(Math.floor(Math.random() * 8) + 2) // 2-9
    ).join('');
    setInputValue(randomDigits);
    setDigits(randomDigits);
  };

  const phoneMap: Record<string, string> = {
    '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
    '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
  };

  const totalCombinations = digits.split('').reduce((acc, digit) => 
    acc * (phoneMap[digit]?.length || 1), 1
  );

  return (
    <div className="bg-gradient-to-br from-white via-indigo-50 to-blue-50 rounded-2xl p-8 shadow-xl border-2 border-indigo-100 relative overflow-hidden">
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-200 rounded-full blur-3xl opacity-30"></div>
      
      <div className="relative">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-lg shadow-lg">
              <Phone className="text-white" size={20} />
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
              Input Digit
            </h3>
          </div>
          <button
            onClick={handleRandom}
            className="group px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 font-semibold flex items-center gap-2"
          >
            <RefreshCw size={18} className="group-hover:rotate-180 transition-transform duration-500" />
            Acak
          </button>
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
            <div className="w-1 h-4 bg-gradient-to-b from-indigo-500 to-blue-500 rounded-full"></div>
            Digit Telepon (2-9)
          </label>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            maxLength={4}
            className="w-full px-5 py-4 border-2 border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 focus:outline-none transition-all duration-300 text-lg font-mono bg-white shadow-inner"
            placeholder="misal: 23"
          />
          
          <div className="mt-4 space-y-2">
            {digits && (
              <div className="flex gap-2 flex-wrap">
                {digits.split('').map((digit, idx) => (
                  <div
                    key={idx}
                    className="px-4 py-2 bg-gradient-to-br from-indigo-100 to-blue-100 border-2 border-indigo-200 rounded-xl font-mono shadow-sm"
                  >
                    <div className="text-sm font-bold text-indigo-700">{digit}</div>
                    <div className="text-xs text-slate-600 mt-1">{phoneMap[digit]}</div>
                  </div>
                ))}
              </div>
            )}
            
            <div className="flex items-center gap-2 text-sm">
              <div className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full font-medium flex items-center gap-1">
                <Sparkles size={14} />
                {digits.length} digit
              </div>
              <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                {totalCombinations} kombinasi
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
