import { useState } from 'react';
import { Sparkles, RefreshCw } from 'lucide-react';

interface SubsetsInputPanelProps {
  nums: number[];
  setNums: (nums: number[]) => void;
}

export default function SubsetsInputPanel({ nums, setNums }: SubsetsInputPanelProps) {
  const [inputValue, setInputValue] = useState(nums.join(', '));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    const parsed = e.target.value
      .split(',')
      .map(s => s.trim())
      .filter(s => s !== '')
      .map(Number)
      .filter(n => !isNaN(n));
    
    // Limit to unique numbers for this specific problem variation usually
    const unique = Array.from(new Set(parsed));
    setNums(unique);
  };

  const handleRandom = () => {
    const length = Math.floor(Math.random() * 3) + 1; // 1-3 numbers for simplicity in visualization
    const newNums = Array.from({ length }, () => Math.floor(Math.random() * 10));
    const unique = Array.from(new Set(newNums));
    setNums(unique);
    setInputValue(unique.join(', '));
  };

  return (
    <div className="bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-2xl p-8 shadow-xl border-2 border-blue-100 relative overflow-hidden">
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-200 rounded-full blur-3xl opacity-30"></div>
      
      <div className="relative">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg">
              <Sparkles className="text-white" size={20} />
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Array Masukan
            </h3>
          </div>
          <button
            onClick={handleRandom}
            className="group px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 font-semibold flex items-center gap-2"
          >
            <RefreshCw size={18} className="group-hover:rotate-180 transition-transform duration-500" />
            Acak
          </button>
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
            <div className="w-1 h-4 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
            Angka (pisahkan dengan koma)
          </label>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            className="w-full px-5 py-4 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all duration-300 text-lg font-mono bg-white shadow-inner"
            placeholder="misal: 1, 2, 3"
          />
          <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
            <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
              {nums.length} elemen
            </div>
            <div className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full font-medium">
              2^{nums.length} = {Math.pow(2, nums.length)} subset
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
