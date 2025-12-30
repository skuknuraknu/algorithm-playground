interface Props {
  s: string;
  t: string;
  setS: (v: string) => void;
  setT: (v: string) => void;
}

const presets = [
  { label: 'Classic', s: 'ADOBECODEBANC', t: 'ABC' },
  { label: 'Simple', s: 'a', t: 'a' },
  { label: 'No Match', s: 'a', t: 'aa' },
  { label: 'Repeated', s: 'xyyzyzyx', t: 'xyz' },
  { label: 'Long Target', s: 'AABBCCDDEE', t: 'ABCDE' },
  { label: 'All Same', s: 'aaaaaaa', t: 'aa' },
  { label: 'Complex', s: 'cabwefgewcwaefgcf', t: 'cae' },
  { label: 'Start', s: 'ABCDEFGH', t: 'ABC' },
  { label: 'End', s: 'ABCDEFGH', t: 'FGH' },
  { label: 'Mixed Case', s: 'AaBbCcDdEe', t: 'ABC' },
];

export default function MinWindowInputPanel({ s, t, setS, setT }: Props) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-emerald-200 space-y-5">
      <div>
        <h3 className="text-xl font-bold text-emerald-800">Masukan String</h3>
        <p className="text-sm text-slate-600 mt-1">Sesuaikan S (source) dan T (target) untuk dimainkan di window.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">S (source)</label>
          <input
            type="text"
            value={s}
            onChange={(e) => setS(e.target.value)}
            className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-emerald-500 font-mono"
            placeholder="contoh: ADOBECODEBANC"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">T (target)</label>
          <input
            type="text"
            value={t}
            onChange={(e) => setT(e.target.value)}
            className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-emerald-500 font-mono"
            placeholder="contoh: ABC"
          />
        </div>
      </div>

      <div>
        <div className="text-sm font-semibold text-slate-700 mb-2">Contoh Preset:</div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {presets.map((p) => (
            <button
              key={p.label}
              onClick={() => {
                setS(p.s);
                setT(p.t);
              }}
              className="px-3 py-2 bg-emerald-50 text-emerald-800 rounded-lg hover:bg-emerald-100 transition-colors text-xs border-2 border-emerald-200 font-semibold"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-emerald-50 border-2 border-emerald-100 rounded-lg p-4 text-sm text-slate-700">
        <div className="font-semibold text-emerald-800 mb-2">Status Saat Ini:</div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-xs text-slate-600 mb-1">Source (S):</div>
            <div className="font-mono text-sm bg-white px-3 py-2 rounded border border-emerald-200">
              {s || <span className="text-slate-400">(kosong)</span>}
            </div>
            <div className="text-xs text-slate-500 mt-1">Panjang: {s.length}</div>
          </div>
          <div>
            <div className="text-xs text-slate-600 mb-1">Target (T):</div>
            <div className="font-mono text-sm bg-white px-3 py-2 rounded border border-emerald-200">
              {t || <span className="text-slate-400">(kosong)</span>}
            </div>
            <div className="text-xs text-slate-500 mt-1">Panjang: {t.length}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
