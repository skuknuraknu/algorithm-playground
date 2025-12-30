interface MajorityElementInputPanelProps {
  nums: number[];
  setNums: (nums: number[]) => void;
}

export default function MajorityElementInputPanel({ nums, setNums }: MajorityElementInputPanelProps) {
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
    const length = Math.floor(Math.random() * 5) + 7; // 7-11
    const majority = Math.floor(Math.random() * 5) + 1;
    const arr: number[] = [];
    const majorityCount = Math.floor(length / 2) + 1;
    for (let i = 0; i < majorityCount; i++) arr.push(majority);
    while (arr.length < length) {
      const val = Math.floor(Math.random() * 9) + 1;
      if (val !== majority || arr.length < majorityCount + 2) {
        arr.push(val);
      }
    }
    // shuffle
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    setNums(arr);
  };

  const presets = [
    { label: 'Example 1', nums: [3, 2, 3] },
    { label: 'Example 2', nums: [2, 2, 1, 1, 1, 2, 2] },
    { label: 'Equal halves', nums: [1,1,1,2,2] },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200 space-y-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-bold text-slate-800">Array Input</h3>
          <p className="text-sm text-slate-600 mt-1">Masukkan array dengan elemen mayoritas (muncul &gt; n/2).</p>
        </div>
        <button
          onClick={handleRandom}
          className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg font-semibold shadow-md"
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
          placeholder="contoh: 2, 2, 1, 1, 1, 2, 2"
          className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-violet-500 font-mono text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">Preset Examples</label>
        <div className="flex flex-wrap gap-2">
          {presets.map((preset) => (
            <button
              key={preset.label}
              onClick={() => setNums(preset.nums)}
              className="px-3 py-2 bg-violet-50 text-violet-800 rounded-lg hover:bg-violet-100 transition-colors text-sm border-2 border-violet-200 font-medium"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-slate-50 border-2 border-slate-200 rounded-lg p-4 text-sm text-slate-600 space-y-1">
        <div>Count: <span className="font-semibold text-violet-700">{nums.length}</span> numbers</div>
        <div className="font-mono text-xs">[{nums.join(', ')}]</div>
      </div>
    </div>
  );
}
