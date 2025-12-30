interface MissingNumberInputPanelProps {
  nums: number[];
  setNums: (nums: number[]) => void;
}

export default function MissingNumberInputPanel({ nums, setNums }: MissingNumberInputPanelProps) {
  const handleRandomGenerate = () => {
    const n = Math.floor(Math.random() * 7) + 4; // Generate 4-10 numbers
    const allNumbers = Array.from({ length: n + 1 }, (_, i) => i);
    const missingIndex = Math.floor(Math.random() * (n + 1));
    const result = allNumbers.filter((_, i) => i !== missingIndex);

    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }

    setNums(result);
  };

  const handleInputChange = (value: string) => {
    const numbers = value
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s !== '')
      .map(Number)
      .filter((n) => !isNaN(n) && n >= 0);
    setNums(numbers);
  };

  const presetExamples = [
    { label: 'Example 1', nums: [3, 0, 1] },
    { label: 'Example 2', nums: [0, 1] },
    { label: 'Example 3', nums: [9, 6, 4, 2, 3, 5, 7, 0, 1] },
    { label: 'Large', nums: [0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14] },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200 space-y-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-bold text-slate-800">Array Input</h3>
          <p className="text-sm text-slate-600 mt-1">
            Masukkan array angka unik dalam rentang <code className="bg-purple-50 px-2 py-1 rounded border border-purple-200">[0, n]</code>
          </p>
        </div>
        <button
          onClick={handleRandomGenerate}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors shadow-md"
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
          placeholder="contoh: 3, 0, 1"
          className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-purple-500 font-mono text-sm"
        />
        <p className="text-xs text-slate-500 mt-1">
          Pastikan angka merupakan subset dari rentang [0, n] dan tidak duplikat.
        </p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">Preset Examples</label>
        <div className="flex flex-wrap gap-2">
          {presetExamples.map((example) => (
            <button
              key={example.label}
              onClick={() => setNums(example.nums)}
              className="px-3 py-2 bg-purple-50 text-purple-800 rounded-lg hover:bg-purple-100 transition-colors text-sm border-2 border-purple-200 font-medium"
            >
              {example.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-slate-50 border-2 border-slate-200 rounded-lg p-4 space-y-2">
        <div className="text-sm font-semibold text-slate-700">Ringkasan</div>
        <div className="text-sm text-slate-600 space-y-1">
          <div>Length: <span className="font-semibold text-purple-700">{nums.length}</span> numbers</div>
          <div>Expected Range: [0, {nums.length}]</div>
          <div className="font-mono text-xs">Current Array: [{nums.join(', ')}]</div>
        </div>
      </div>
    </div>
  );
}
