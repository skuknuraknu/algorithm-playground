interface CountPrimesInputPanelProps {
  n: number;
  setN: (n: number) => void;
}

export default function CountPrimesInputPanel({ n, setN }: CountPrimesInputPanelProps) {
  const handleRandomGenerate = () => {
    const randomN = Math.floor(Math.random() * 91) + 10; // 10-100
    setN(randomN);
  };

  const presetExamples = [
    { label: 'Small (10)', value: 10 },
    { label: 'Medium (30)', value: 30 },
    { label: 'Large (50)', value: 50 },
    { label: 'Very Large (100)', value: 100 },
  ];

  const countPrimes = (limit: number): number => {
    if (limit <= 2) return 0;
    const isPrime = new Array(limit).fill(true);
    isPrime[0] = isPrime[1] = false;

    for (let i = 2; i * i < limit; i++) {
      if (isPrime[i]) {
        for (let j = i * i; j < limit; j += i) {
          isPrime[j] = false;
        }
      }
    }

    return isPrime.filter((p) => p).length;
  };

  const primeCount = n > 0 ? countPrimes(n) : 0;

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200 space-y-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-bold text-slate-800">Input Parameters</h3>
          <p className="text-sm text-slate-600 mt-1">
            Hitung jumlah bilangan prima yang lebih kecil dari <code className="bg-amber-50 px-2 py-1 rounded border border-amber-200">n</code>
          </p>
        </div>
        <button
          onClick={handleRandomGenerate}
          className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors shadow-md"
        >
          🎲 Random n
        </button>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Masukkan n (0 - 10.000)
        </label>
        <input
          type="number"
          min="0"
          max="10000"
          value={n}
          onChange={(e) => setN(Math.max(0, parseInt(e.target.value) || 0))}
          placeholder="contoh: 30"
          className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-amber-500 font-mono text-sm"
        />
        <p className="text-xs text-slate-500 mt-1">
          Nilai n mewakili batas atas eksklusif (akan menghitung prima {'<'} n)
        </p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">Preset Examples</label>
        <div className="flex flex-wrap gap-2">
          {presetExamples.map((example) => (
            <button
              key={example.label}
              onClick={() => setN(example.value)}
              className="px-3 py-2 bg-amber-50 text-amber-800 rounded-lg hover:bg-amber-100 transition-colors text-sm border-2 border-amber-200 font-medium"
            >
              {example.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-slate-50 border-2 border-slate-200 rounded-lg p-4 space-y-2">
          <div className="text-sm font-semibold text-slate-700">Preview</div>
          <div className="text-sm text-slate-600 space-y-1">
            <div>
              n = <span className="font-bold text-amber-700">{n}</span>
            </div>
            <div>
              Range: [0, {n > 0 ? n - 1 : 0}]
            </div>
            {n > 0 && (
              <>
                <div className="pt-2 border-t border-slate-200 mt-2">
                  <span className="text-green-700 font-bold">Perkiraan jumlah prima: {primeCount}</span>
                </div>
                <div className="text-xs text-slate-500">
                  {n <= 2 && 'Tidak ada prima kurang dari 2'}
                  {n > 2 && primeCount === 0 && 'Tidak ditemukan bilangan prima'}
                  {n > 2 && primeCount > 0 && `${primeCount} bilangan prima < ${n}`}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-4 text-sm text-slate-700">
          <div className="flex items-center gap-2 font-semibold text-amber-800 mb-2">
            <span>💡</span>
            <span>Tips</span>
          </div>
          <p>
            Coba beberapa nilai n untuk melihat bagaimana Sieve of Eratosthenes menandai bilangan
            komposit. Nilai lebih besar akan menunjukkan lebih banyak langkah penandaan.
          </p>
        </div>
      </div>
    </div>
  );
}
