import { useState } from 'react';
import { RotateCcw, Play } from 'lucide-react';

interface AddTwoNumbersInputPanelProps {
  l1: number[];
  l2: number[];
  setL1: (list: number[]) => void;
  setL2: (list: number[]) => void;
}

export default function AddTwoNumbersInputPanel({ l1, l2, setL1, setL2 }: AddTwoNumbersInputPanelProps) {
  const [input1, setInput1] = useState(l1.join(', '));
  const [input2, setInput2] = useState(l2.join(', '));
  const [error, setError] = useState('');

  const parseList = (val: string) => {
    if (!val.trim()) return [];
    const parts = val.split(',').map((s) => s.trim());
    const nums = parts.map((p) => {
      const n = Number(p);
      if (Number.isNaN(n) || n < 0 || n > 9) {
        throw new Error('Setiap digit harus 0-9');
      }
      return n;
    });
    return nums;
  };

  const handleApply = () => {
    try {
      const parsed1 = parseList(input1);
      const parsed2 = parseList(input2);
      setL1(parsed1);
      setL2(parsed2);
      setError('');
    } catch (e: any) {
      setError(e.message || 'Format salah. Contoh: 2, 4, 3');
    }
  };

  const handleReset = () => {
    const def1 = [2, 4, 3];
    const def2 = [5, 6, 4];
    setInput1(def1.join(', '));
    setInput2(def2.join(', '));
    setL1(def1);
    setL2(def2);
    setError('');
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-slate-200 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">List 1 (digit terbalik)</label>
          <input
            type="text"
            value={input1}
            onChange={(e) => setInput1(e.target.value)}
            placeholder="Contoh: 2, 4, 3"
            className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:border-emerald-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">List 2 (digit terbalik)</label>
          <input
            type="text"
            value={input2}
            onChange={(e) => setInput2(e.target.value)}
            placeholder="Contoh: 5, 6, 4"
            className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:border-teal-500 focus:outline-none"
          />
        </div>
      </div>

      {error && <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-md px-3 py-2">{error}</div>}

      <div className="flex gap-3">
        <button
          onClick={handleApply}
          className="flex-1 bg-emerald-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
        >
          <Play size={18} />
          Terapkan
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg font-semibold hover:bg-slate-200 transition-colors flex items-center gap-2"
        >
          <RotateCcw size={18} />
          Reset
        </button>
      </div>
    </div>
  );
}
