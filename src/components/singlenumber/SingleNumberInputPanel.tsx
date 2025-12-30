interface SingleNumberInputPanelProps {
  nums: number[];
  setNums: (nums: number[]) => void;
}

export default function SingleNumberInputPanel({ nums, setNums }: SingleNumberInputPanelProps) {
  const handleRandomGenerate = () => {
    const pairCount = Math.floor(Math.random() * 3) + 2; // 2-4 pairs
    const unique = Math.floor(Math.random() * 15) + 1;
    const arr: number[] = [];

    for (let i = 0; i < pairCount; i++) {
      const value = Math.floor(Math.random() * 15) + 1;
      arr.push(value, value);
    }
    if (!arr.includes(unique)) {
      arr.push(unique);
    } else {
      arr.push(unique + 20);
    }

    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    setNums(arr);
  };

  const handleInputChange = (value: string) => {
    const numbers = value
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s !== '')
      .map(Number)
      .filter((n) => !Number.isNaN(n));
    setNums(numbers);
  };

  const presetExamples = [
    { label: 'Example 1', nums: [2, 2, 1] },
    { label: 'Example 2', nums: [4, 1, 2, 1, 2] },
    { label: 'Example 3', nums: [7, 3, 5, 3, 5, 7, 9] },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200 space-y-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-bold text-slate-800">Array Input</h3>
          <p className="text-sm text-slate-600 mt-1">
            Masukkan array di mana hanya ada satu angka yang tidak memiliki pasangan.
          </p>
        </div>
        <button
          onClick={handleRandomGenerate}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors shadow-md"
        >
          🎲 Generate
        </button>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Array Numbers (pisahkan dengan koma)
        </label>
        <input
          type="text"
          value={nums.join(', ')}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="contoh: 4, 1, 2, 1, 2"
          className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-indigo-500 font-mono text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">Preset Examples</label>
        <div className="flex flex-wrap gap-2">
          {presetExamples.map((example) => (
            <button
              key={example.label}
              onClick={() => setNums(example.nums)}
              className="px-3 py-2 bg-indigo-50 text-indigo-800 rounded-lg hover:bg-indigo-100 transition-colors text-sm border-2 border-indigo-200 font-medium"
            >
              {example.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-slate-50 border-2 border-slate-200 rounded-lg p-4 space-y-2">
        <div className="text-sm font-semibold text-slate-700">Ringkasan</div>
        <div className="text-sm text-slate-600 space-y-1">
          <div>Count: <span className="font-semibold text-indigo-700">{nums.length}</span> numbers</div>
          <div className="font-mono text-xs">Current Array: [{nums.join(', ')}]</div>
        </div>
      </div>
    </div>
  );
}
