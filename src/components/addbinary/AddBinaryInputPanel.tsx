interface AddBinaryInputPanelProps {
  a: string;
  b: string;
  setA: (value: string) => void;
  setB: (value: string) => void;
}

export default function AddBinaryInputPanel({ a, b, setA, setB }: AddBinaryInputPanelProps) {
  const sanitize = (value: string) => value.replace(/[^01]/g, '');

  const presets = [
    { label: 'Example 1', a: '11', b: '1' },
    { label: 'Example 2', a: '1010', b: '1011' },
    { label: 'Large', a: '11110000', b: '11001100' },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200 space-y-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-bold text-slate-800">Binary Strings</h3>
          <p className="text-sm text-slate-600 mt-1">Masukkan string biner (hanya 0 dan 1).</p>
        </div>
        <button
          onClick={() => {
            setA('1010');
            setB('1011');
          }}
          className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors shadow-md"
        >
          Reset
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Binary A</label>
          <input
            type="text"
            value={a}
            onChange={(e) => setA(sanitize(e.target.value))}
            placeholder="contoh: 1010"
            className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-orange-500 font-mono text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Binary B</label>
          <input
            type="text"
            value={b}
            onChange={(e) => setB(sanitize(e.target.value))}
            placeholder="contoh: 1011"
            className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-orange-500 font-mono text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">Preset Examples</label>
        <div className="flex flex-wrap gap-2">
          {presets.map((preset) => (
            <button
              key={preset.label}
              onClick={() => {
                setA(preset.a);
                setB(preset.b);
              }}
              className="px-3 py-2 bg-orange-50 text-orange-800 rounded-lg hover:bg-orange-100 transition-colors text-sm border-2 border-orange-200 font-medium"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-slate-50 border-2 border-slate-200 rounded-lg p-4 space-y-2">
        <div className="text-sm font-semibold text-slate-700">Ringkasan</div>
        <div className="text-sm text-slate-600 space-y-1">
          <div>Length A: <span className="font-semibold text-orange-700">{a.length}</span></div>
          <div>Length B: <span className="font-semibold text-orange-700">{b.length}</span></div>
          <div className="font-mono text-xs">a: {a || '-'} | b: {b || '-'}</div>
        </div>
      </div>
    </div>
  );
}
