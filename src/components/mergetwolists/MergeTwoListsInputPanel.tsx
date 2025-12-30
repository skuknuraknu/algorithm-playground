import React, { useState } from 'react';
import { RotateCcw, Play } from 'lucide-react';

interface MergeTwoListsInputPanelProps {
  setList1: (list: number[]) => void;
  setList2: (list: number[]) => void;
}

export default function MergeTwoListsInputPanel({ setList1, setList2 }: MergeTwoListsInputPanelProps) {
  const [input1, setInput1] = useState('1, 2, 4');
  const [input2, setInput2] = useState('1, 3, 4');
  const [error, setError] = useState('');

  const handleUpdate = () => {
    try {
      const parseList = (str: string) => {
        if (!str.trim()) return [];
        const arr = str.split(',').map(s => {
          const num = parseInt(s.trim());
          if (isNaN(num)) throw new Error('Input harus berupa angka');
          return num;
        });
        // Ensure sorted
        const sorted = [...arr].sort((a, b) => a - b);
        return sorted;
      };

      const l1 = parseList(input1);
      const l2 = parseList(input2);

      setList1(l1);
      setList2(l2);
      setError('');
    } catch (err) {
      setError('Format input salah. Gunakan angka dipisahkan koma.');
    }
  };

  const handleReset = () => {
    setInput1('1, 2, 4');
    setInput2('1, 3, 4');
    setList1([1, 2, 4]);
    setList2([1, 3, 4]);
    setError('');
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-slate-200 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            List 1 (Terurut)
          </label>
          <input
            type="text"
            value={input1}
            onChange={(e) => setInput1(e.target.value)}
            className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none"
            placeholder="Contoh: 1, 2, 4"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            List 2 (Terurut)
          </label>
          <input
            type="text"
            value={input2}
            onChange={(e) => setInput2(e.target.value)}
            className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:border-purple-500 focus:outline-none"
            placeholder="Contoh: 1, 3, 4"
          />
        </div>
      </div>

      {error && (
        <div className="text-red-500 text-sm font-medium bg-red-50 p-2 rounded">
          {error}
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={handleUpdate}
          className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          <Play size={18} />
          Update Visualisasi
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
