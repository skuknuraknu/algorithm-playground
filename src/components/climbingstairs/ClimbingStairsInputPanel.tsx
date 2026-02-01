import { Plus, Minus, Shuffle, Info } from 'lucide-react';
import { useState } from 'react';

interface Props {
  n: number;
  setN: (v: number) => void;
}

export default function ClimbingStairsInputPanel({ n, setN }: Props) {
  const [value, setValue] = useState(n);

  const clamp = (x: number) => Math.min(45, Math.max(0, x)); // avoid huge fibonacci overflow

  const handleChange = (next: number) => {
    const v = clamp(next);
    setValue(v);
    setN(v);
  };

  const handleRandom = () => {
    handleChange(Math.floor(Math.random() * 15) + 2); // 2-16
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200 space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-bold text-slate-800">Jumlah Anak Tangga (n)</h3>
          <p className="text-sm text-slate-600">Setiap langkah boleh 1 atau 2.</p>
        </div>
        <button
          onClick={handleRandom}
          className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-slate-800"
        >
          <Shuffle size={18} /> Random
        </button>
      </div>

      <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-3 text-sm text-blue-800 flex gap-2">
        <Info size={16} className="mt-0.5" />
        <div>
          Disarankan 0 - 45 agar hasil tidak overflow ke luar batas aman number.
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => handleChange(value - 1)}
          className="p-3 rounded-lg border-2 border-slate-200 bg-slate-50 hover:bg-slate-100"
        >
          <Minus size={18} />
        </button>
        <input
          type="number"
          value={value}
          onChange={(e) => handleChange(Number(e.target.value))}
          className="w-32 px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-indigo-500 font-semibold text-center"
          min={0}
          max={45}
        />
        <button
          onClick={() => handleChange(value + 1)}
          className="p-3 rounded-lg border-2 border-slate-200 bg-slate-50 hover:bg-slate-100"
        >
          <Plus size={18} />
        </button>
      </div>
    </div>
  );
}
