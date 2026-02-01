import { Shuffle, Info, Sparkles } from 'lucide-react';

interface Props {
  prices: number[];
  setPrices: (nums: number[]) => void;
}

const presets = [
  { label: 'Klasik', value: '7,1,5,3,6,4' },
  { label: 'Naik Pelan', value: '1,2,3,4,5,6' },
  { label: 'Turun Terus', value: '6,5,4,3,2,1' },
  { label: 'Zigzag', value: '2,4,1,7,3,9' },
];

export default function BestTimeStockInputPanel({ prices, setPrices }: Props) {
  const parse = (value: string) =>
    value
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0)
      .map(Number)
      .filter((n) => !Number.isNaN(n));

  const handleRandom = () => {
    const len = Math.floor(Math.random() * 6) + 4; // 4-9 hari
    const arr = Array.from({ length: len }, () => Math.floor(Math.random() * 10) + 1);
    setPrices(arr);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200 space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-bold text-slate-800">Harga per Hari</h3>
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
          Format: contoh <span className="font-mono">7,1,5,3,6,4</span>. Algoritma mencari beli murah lalu jual lebih tinggi sesudahnya.
        </div>
      </div>

      <input
        type="text"
        defaultValue={prices.join(',')}
        onBlur={(e) => setPrices(parse(e.target.value))}
        placeholder="7,1,5,3,6,4"
        className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-emerald-500 font-mono"
      />

      <div>
        <div className="text-sm font-semibold text-slate-700 mb-2">Preset</div>
        <div className="flex flex-wrap gap-2">
          {presets.map((p) => (
            <button
              key={p.label}
              onClick={() => setPrices(parse(p.value))}
              className="px-3 py-2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg hover:bg-emerald-100 text-sm font-semibold"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-slate-50 border-2 border-slate-200 rounded-lg p-4 text-sm text-slate-700 font-mono flex items-center gap-2">
        <Sparkles size={16} className="text-emerald-600" />
        Current: [{prices.join(', ')}]
      </div>
    </div>
  );
}
