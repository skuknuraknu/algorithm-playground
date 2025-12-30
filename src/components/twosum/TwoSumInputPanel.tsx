interface TwoSumInputPanelProps {
  nums: number[];
  target: number;
  setNums: (nums: number[]) => void;
  setTarget: (target: number) => void;
}

export default function TwoSumInputPanel({ nums, target, setNums, setTarget }: TwoSumInputPanelProps) {
  const handleNumsChange = (value: string) => {
    const parsed = value
      .split(',')
      .map((v) => v.trim())
      .filter((v) => v !== '')
      .map(Number)
      .filter((n) => !Number.isNaN(n));
    setNums(parsed);
  };

  const handleRandom = () => {
    const length = Math.floor(Math.random() * 4) + 4; // 4-7 numbers
    const arr: number[] = Array.from({ length }, () => Math.floor(Math.random() * 20) + 1);
    const i = Math.floor(Math.random() * length);
    let j = Math.floor(Math.random() * length);
    if (i === j) j = (j + 1) % length;
    const newTarget = arr[i] + arr[j];
    setNums(arr);
    setTarget(newTarget);
  };

  const presets = [
    { label: 'Classic', nums: [2, 7, 11, 15], target: 9 },
    { label: 'Negatives', nums: [-3, 4, 3, 90], target: 0 },
    { label: 'Duplicates', nums: [3, 3], target: 6 },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200 space-y-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-bold text-slate-800">Array & Target</h3>
          <p className="text-sm text-slate-600 mt-1">Masukkan daftar angka dan target yang ingin dicapai.</p>
        </div>
        <button
          onClick={handleRandom}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold shadow-md"
        >
          🎲 Random
        </button>
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Numbers (pisahkan dengan koma)</label>
          <input
            type="text"
            value={nums.join(', ')}
            onChange={(e) => handleNumsChange(e.target.value)}
            placeholder="contoh: 2, 7, 11, 15"
            className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 font-mono text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Target</label>
          <input
            type="number"
            value={target}
            onChange={(e) => setTarget(Number(e.target.value))}
            className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 font-mono text-sm"
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
                setNums(preset.nums);
                setTarget(preset.target);
              }}
              className="px-3 py-2 bg-blue-50 text-blue-800 rounded-lg hover:bg-blue-100 transition-colors text-sm border-2 border-blue-200 font-medium"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-slate-50 border-2 border-slate-200 rounded-lg p-4 text-sm text-slate-600 space-y-1">
        <div>Count: <span className="font-semibold text-blue-700">{nums.length}</span> numbers</div>
        <div>Target: <span className="font-semibold text-blue-700">{target}</span></div>
        <div className="font-mono text-xs">[{nums.join(', ')}]</div>
      </div>
    </div>
  );
}
