import { Shuffle, Info, Sparkles } from 'lucide-react';

interface Props {
  houses: number[];
  setHouses: (nums: number[]) => void;
}

const presets = [
  { label: 'Klasik', value: '2,7,9,3,1' },
  { label: 'Naik Turun', value: '1,2,3,1,5,1' },
  { label: 'Spike', value: '2,1,1,10,2' },
  { label: 'Pendek', value: '4,1,2' },
];

export default function HouseRobberInputPanel({ houses, setHouses }: Props) {
  const parse = (value: string) =>
    value
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0)
      .map(Number)
      .filter((n) => !Number.isNaN(n));

  const handleRandom = () => {
    const len = Math.floor(Math.random() * 6) + 3; // 3-8 houses
    const arr = Array.from({ length: len }, () => Math.floor(Math.random() * 20) + 1);
    setHouses(arr);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200 space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-bold text-slate-800">Nilai Uang per Rumah</h3>
          <p className="text-sm text-slate-600">Pisahkan dengan koma. Nilai non-negatif.</p>
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
          Format: contoh <span className="font-mono">2,7,9,3,1</span>. Algoritma akan memilih kombinasi rumah tanpa yang bersebelahan.
        </div>
      </div>

      <input
        type="text"
        defaultValue={houses.join(',')}
        onBlur={(e) => setHouses(parse(e.target.value))}
        placeholder="2,7,9,3,1"
        className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-indigo-500 font-mono"
      />

      <div>
        <div className="text-sm font-semibold text-slate-700 mb-2">Preset</div>
        <div className="flex flex-wrap gap-2">
          {presets.map((p) => (
            <button
              key={p.label}
              onClick={() => setHouses(parse(p.value))}
              className="px-3 py-2 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-lg hover:bg-indigo-100 text-sm font-semibold"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-slate-50 border-2 border-slate-200 rounded-lg p-4 text-sm text-slate-700 font-mono flex items-center gap-2">
        <Sparkles size={16} className="text-emerald-600" />
        Current: [{houses.join(', ')}]
      </div>
    </div>
  );
}
