import { useState } from 'react';
import { RotateCcw, Play } from 'lucide-react';

interface RemoveNthInputPanelProps {
  list: number[];
  n: number;
  setList: (list: number[]) => void;
  setN: (n: number) => void;
}

export default function RemoveNthInputPanel({ list, n, setList, setN }: RemoveNthInputPanelProps) {
  const [listInput, setListInput] = useState(list.join(', '));
  const [nInput, setNInput] = useState(n.toString());
  const [error, setError] = useState('');

  const parseList = (value: string) => {
    if (!value.trim()) return [];
    const nums = value.split(',').map((s) => s.trim()).map((p) => {
      const num = Number(p);
      if (Number.isNaN(num)) throw new Error('Input list harus berupa angka yang dipisahkan koma');
      return num;
    });
    return nums;
  };

  const handleApply = () => {
    try {
      const parsedList = parseList(listInput);
      const parsedN = Number(nInput);
      if (!Number.isInteger(parsedN) || parsedN <= 0) throw new Error('n harus bilangan bulat positif');
      if (parsedList.length > 0 && parsedN > parsedList.length) throw new Error(`n tidak boleh lebih dari panjang list (${parsedList.length})`);
      setList(parsedList);
      setN(parsedN);
      setError('');
    } catch (e: any) {
      setError(e.message || 'Format input salah.');
    }
  };

  const handleReset = () => {
    const defaultList = [1, 2, 3, 4, 5];
    const defaultN = 2;
    setListInput(defaultList.join(', '));
    setNInput(defaultN.toString());
    setList(defaultList);
    setN(defaultN);
    setError('');
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-slate-200 space-y-4">
      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-1">Linked List (head di kiri)</label>
          <input
            type="text"
            value={listInput}
            onChange={(e) => setListInput(e.target.value)}
            placeholder="Contoh: 1, 2, 3, 4, 5"
            className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:border-rose-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">n (ke-berapa dari belakang)</label>
          <input
            type="number"
            min={1}
            value={nInput}
            onChange={(e) => setNInput(e.target.value)}
            className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:border-rose-500 focus:outline-none"
          />
        </div>
      </div>

      {error && <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-md px-3 py-2">{error}</div>}

      <div className="flex gap-3">
        <button
          onClick={handleApply}
          className="flex-1 bg-rose-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-rose-700 transition-colors flex items-center justify-center gap-2"
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
