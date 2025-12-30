import { useState } from 'react';
import { RotateCcw, Play } from 'lucide-react';

interface ReverseLinkedListInputPanelProps {
  list: number[];
  setList: (list: number[]) => void;
}

export default function ReverseLinkedListInputPanel({ list, setList }: ReverseLinkedListInputPanelProps) {
  const [input, setInput] = useState(list.join(', '));
  const [error, setError] = useState('');

  const parseInput = (value: string) => {
    if (!value.trim()) return [];
    const parts = value.split(',').map((s) => s.trim());
    const nums = parts.map((p) => {
      const n = Number(p);
      if (Number.isNaN(n)) {
        throw new Error('Input harus berupa angka yang dipisahkan koma');
      }
      return n;
    });
    return nums;
  };

  const handleApply = () => {
    try {
      const parsed = parseInput(input);
      setList(parsed);
      setError('');
    } catch (e) {
      setError('Format input salah. Contoh: 1, 2, 3, 4, 5');
    }
  };

  const handleReset = () => {
    const defaultList = [1, 2, 3, 4, 5];
    setInput(defaultList.join(', '));
    setList(defaultList);
    setError('');
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-slate-200 space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Linked List (urutan node)</label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Contoh: 1, 2, 3, 4, 5"
          className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:border-indigo-500 focus:outline-none"
        />
      </div>

      {error && <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-md px-3 py-2">{error}</div>}

      <div className="flex gap-3">
        <button
          onClick={handleApply}
          className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
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
