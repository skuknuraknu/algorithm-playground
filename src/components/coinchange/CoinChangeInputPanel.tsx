import { Shuffle, Info, Sparkles } from 'lucide-react';

interface Props {
  coins: number[];
  amount: number;
  setCoins: (c: number[]) => void;
  setAmount: (a: number) => void;
}

const presets = [
  { label: 'Klasik', coins: '1,2,5', amount: 11 },
  { label: 'Buntu', coins: '2', amount: 3 },
  { label: 'Banyak Pilihan', coins: '1,3,4', amount: 6 },
  { label: 'Nilai Besar', coins: '2,5,10', amount: 27 },
];

export default function CoinChangeInputPanel({ coins, amount, setCoins, setAmount }: Props) {
  const parseCoins = (value: string) =>
    value
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0)
      .map(Number)
      .filter((n) => !Number.isNaN(n) && n > 0);

  const handleRandom = () => {
    const len = Math.floor(Math.random() * 3) + 2; // 2-4 coins
    const arr = Array.from({ length: len }, () => Math.floor(Math.random() * 9) + 1);
    setCoins(arr);
    setAmount(Math.floor(Math.random() * 20) + 5);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200 space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-bold text-slate-800">Koin & Amount</h3>
          <p className="text-sm text-slate-600">Koin bilangan bulat positif, amount ≥ 0.</p>
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
          Loop luar koin, loop dalam amount naik memastikan unbounded (boleh pakai koin berulang). Jika tidak ada kombinasi, hasil -1.
        </div>
      </div>

      <input
        type="text"
        defaultValue={coins.join(',')}
        onBlur={(e) => setCoins(parseCoins(e.target.value))}
        placeholder="1,2,5"
        className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-emerald-500 font-mono"
      />

      <div className="flex items-center gap-3">
        <span className="text-sm text-slate-700">Amount</span>
        <input
          type="number"
          value={amount}
          min={0}
          onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))}
          className="w-32 px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-emerald-500 font-semibold"
        />
      </div>

      <div className="text-sm font-semibold text-slate-700 mb-2">Preset</div>
      <div className="flex flex-wrap gap-2">
        {presets.map((p) => (
          <button
            key={p.label}
            onClick={() => { setCoins(parseCoins(p.coins)); setAmount(p.amount); }}
            className="px-3 py-2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg hover:bg-emerald-100 text-sm font-semibold"
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="bg-slate-50 border-2 border-slate-200 rounded-lg p-4 text-sm text-slate-700 font-mono flex items-center gap-2">
        <Sparkles size={16} className="text-emerald-600" />
        Current: coins=[{coins.join(', ')}], amount={amount}
      </div>
    </div>
  );
}
