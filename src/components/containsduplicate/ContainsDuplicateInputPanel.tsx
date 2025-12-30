interface ContainsDuplicateInputPanelProps {
  nums: number[];
  setNums: (nums: number[]) => void;
}

export default function ContainsDuplicateInputPanel({ nums, setNums }: ContainsDuplicateInputPanelProps) {
  const handleChange = (value: string) => {
    const parsed = value
      .split(',')
      .map((v) => v.trim())
      .filter((v) => v !== '')
      .map(Number)
      .filter((n) => !Number.isNaN(n));
    setNums(parsed);
  };

  const handleRandom = () => {
    const length = Math.floor(Math.random() * 5) + 5; // 5-9
    const arr: number[] = [];
    for (let i = 0; i < length; i++) {
      arr.push(Math.floor(Math.random() * 8));
    }
    if (new Set(arr).size === arr.length) {
      // force a duplicate
      arr[length - 1] = arr[0];
    }
    setNums(arr);
  };

  const presets = [
    { label: 'Has Duplicate', nums: [1, 2, 3, 1] },
    { label: 'All Unique', nums: [1, 2, 3, 4] },
    { label: 'Large', nums: [5, 1, 5, 2, 3, 4, 2] },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200 space-y-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-bold text-slate-800">Array Input</h3>
          <p className="text-sm text-slate-600 mt-1">Masukkan angka lalu cek apakah ada yang duplikat.</p>
        </div>
        <button
          onClick={handleRandom}
          className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-semibold shadow-md"
        >
          🎲 Random
        </button>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">Numbers (koma)</label>
        <input
          type="text"
          value={nums.join(', ')}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="contoh: 1, 2, 3, 1"
          className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-amber-500 font-mono text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">Preset Examples</label>
        <div className="flex flex-wrap gap-2">
          {presets.map((preset) => (
            <button
              key={preset.label}
              onClick={() => setNums(preset.nums)}
              className="px-3 py-2 bg-amber-50 text-amber-800 rounded-lg hover:bg-amber-100 transition-colors text-sm border-2 border-amber-200 font-medium"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-slate-50 border-2 border-slate-200 rounded-lg p-4 text-sm text-slate-600 space-y-1">
        <div>Count: <span className="font-semibold text-amber-700">{nums.length}</span> numbers</div>
        <div className="font-mono text-xs">[{nums.join(', ')}]</div>
      </div>
    </div>
  );
}
