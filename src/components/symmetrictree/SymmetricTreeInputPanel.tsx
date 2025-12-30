import { useState } from 'react';
import { Binary, Sparkles, Info } from 'lucide-react';

interface SymmetricTreeInputPanelProps {
  onNodesChange: (nodes: (number | null)[]) => void;
}

export default function SymmetricTreeInputPanel({ onNodesChange }: SymmetricTreeInputPanelProps) {
  const [inputValue, setInputValue] = useState('1,2,2,3,4,4,3');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    
    // Parse input string menjadi array
    const parsed = value
      .split(',')
      .map(item => {
        const trimmed = item.trim();
        if (trimmed === '' || trimmed.toLowerCase() === 'null') return null;
        const num = parseInt(trimmed);
        return isNaN(num) ? null : num;
      });
    
    onNodesChange(parsed);
  };

  const exampleTrees = [
    { value: '1,2,2,3,4,4,3', label: 'Symmetric', isSymmetric: true },
    { value: '1,2,2,null,3,null,3', label: 'Not Symmetric', isSymmetric: false },
    { value: '1', label: 'Single Node', isSymmetric: true },
    { value: '1,2,2', label: 'Simple Symmetric', isSymmetric: true },
    { value: '1,2,3', label: 'Not Symmetric', isSymmetric: false }
  ];

  return (
    <div className="bg-gradient-to-br from-emerald-50 via-white to-teal-50 rounded-2xl p-8 shadow-xl border-2 border-emerald-100">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg shadow-lg">
            <Binary className="text-white" size={20} />
          </div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Input Tree
          </h3>
        </div>

        {/* Info Alert */}
        <div className="flex items-start gap-3 bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
          <Info className="text-blue-600 flex-shrink-0 mt-0.5" size={18} />
          <p className="text-sm text-blue-800">
            Masukkan nodes dalam format level-order (BFS). Gunakan <span className="font-mono bg-blue-100 px-1 rounded">null</span> untuk node kosong. Contoh: <span className="font-mono bg-blue-100 px-1 rounded">1,2,2,3,4,4,3</span>
          </p>
        </div>

        {/* Input Field */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-3">
            Tree Nodes (level-order):
          </label>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Contoh: 1,2,2,3,4,4,3"
            className="w-full px-4 py-3 bg-white border-2 border-emerald-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-emerald-100 focus:border-emerald-400 transition-all duration-300 font-mono text-lg text-slate-800 shadow-inner"
          />
          <p className="mt-2 text-sm text-slate-500">
            Gunakan koma untuk memisahkan nodes
          </p>
        </div>

        {/* Example Buttons */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
            <Sparkles className="text-emerald-500" size={16} />
            Contoh Tree:
          </label>
          <div className="grid grid-cols-2 gap-2">
            {exampleTrees.map((example, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setInputValue(example.value);
                  const parsed = example.value
                    .split(',')
                    .map(item => {
                      const trimmed = item.trim();
                      if (trimmed === '' || trimmed.toLowerCase() === 'null') return null;
                      const num = parseInt(trimmed);
                      return isNaN(num) ? null : num;
                    });
                  onNodesChange(parsed);
                }}
                className={`px-4 py-3 rounded-lg border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 ${
                  example.isSymmetric
                    ? 'bg-gradient-to-br from-emerald-100 to-teal-100 hover:from-emerald-200 hover:to-teal-200 text-emerald-700 border-emerald-200'
                    : 'bg-gradient-to-br from-red-100 to-rose-100 hover:from-red-200 hover:to-rose-200 text-red-700 border-red-200'
                }`}
              >
                <div className="font-semibold text-sm mb-1">{example.label}</div>
                <div className="font-mono text-xs opacity-70">{example.value}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Statistics */}
        {inputValue && (
          <div className="grid grid-cols-2 gap-4 pt-4 border-t-2 border-emerald-100">
            <div className="bg-white p-4 rounded-xl border-2 border-emerald-200 shadow-inner">
              <p className="text-xs text-slate-500 mb-1">Total Nodes</p>
              <p className="text-2xl font-bold text-emerald-600">
                {inputValue.split(',').filter(item => {
                  const trimmed = item.trim();
                  return trimmed !== '' && trimmed.toLowerCase() !== 'null';
                }).length}
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl border-2 border-teal-200 shadow-inner">
              <p className="text-xs text-slate-500 mb-1">Total Input</p>
              <p className="text-2xl font-bold text-teal-600">
                {inputValue.split(',').length}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
