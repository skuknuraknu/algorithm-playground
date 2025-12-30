interface CountPrimesVisualizerProps {
  n: number;
}

export default function CountPrimesVisualizer({ n }: CountPrimesVisualizerProps) {
  if (n <= 0) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200 text-center text-slate-500">
        Masukkan nilai n untuk melihat visualisasi
      </div>
    );
  }

  if (n > 100) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200 text-center text-slate-600 space-y-2">
        <div className="text-lg font-semibold text-amber-700">Nilai n terlalu besar untuk divisualisasikan.</div>
        <div className="text-sm">Gunakan Simulator untuk nilai besar.</div>
      </div>
    );
  }

  // Sieve of Eratosthenes
  const isPrime = new Array(n).fill(true);
  isPrime[0] = false;
  if (n > 1) isPrime[1] = false;

  const markedBy: (number | null)[] = new Array(n).fill(null);
  markedBy[0] = -1; // Not prime by definition
  if (n > 1) markedBy[1] = -1;

  for (let i = 2; i * i < n; i++) {
    if (isPrime[i]) {
      for (let j = i * i; j < n; j += i) {
        if (isPrime[j]) {
          isPrime[j] = false;
          markedBy[j] = i;
        }
      }
    }
  }

  const primes = isPrime.map((prime, idx) => prime ? idx : null).filter(p => p !== null) as number[];
  const composites = isPrime.map((prime, idx) => !prime && idx >= 2 ? idx : null).filter(c => c !== null) as number[];

  const getColorClass = (num: number) => {
    if (num === 0 || num === 1) return 'bg-gray-400 text-white';
    if (isPrime[num]) return 'bg-green-500 text-white';
    return 'bg-red-400 text-white';
  };

  const getLabel = (num: number) => {
    if (num === 0 || num === 1) return 'N/A';
    if (isPrime[num]) return 'Prime';
    return `÷${markedBy[num]}`;
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200 space-y-6">
      {/* Number Grid */}
      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-3">
          🔢 Numbers from 0 to {n - 1}
        </h3>
        <div className="grid grid-cols-10 gap-2">
          {Array.from({ length: n }, (_, i) => i).map((num) => (
            <div
              key={num}
              className={`aspect-square flex flex-col items-center justify-center rounded-lg font-bold text-sm ${getColorClass(num)}`}
              title={`${num}: ${isPrime[num] ? 'Prime' : markedBy[num] !== null ? `Marked by ${markedBy[num]}` : 'Not prime'}`}
            >
              <div className="text-lg">{num}</div>
              <div className="text-xs opacity-75">{getLabel(num)}</div>
            </div>
          ))}
        </div>
        
        <div className="flex items-center gap-4 mt-4 text-sm flex-wrap text-slate-600">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-400 rounded"></div>
            <span>0, 1 (Not prime)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span>Prime numbers</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-400 rounded"></div>
            <span>Composite (marked)</span>
          </div>
        </div>
      </div>

      {/* Primes List */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
        <h3 className="text-lg font-semibold text-green-900 mb-3">
          ✅ Prime Numbers {'<'} {n}
        </h3>
        {primes.length > 0 ? (
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              {primes.map((prime) => (
                <div
                  key={prime}
                  className="w-12 h-12 flex items-center justify-center bg-green-500 text-white rounded-lg font-bold text-lg"
                >
                  {prime}
                </div>
              ))}
            </div>
            <div className="text-2xl font-bold text-green-600">
              Total: {primes.length} primes
            </div>
          </div>
        ) : (
          <div className="text-slate-600">No prime numbers less than {n}</div>
        )}
      </div>

      {/* Composites Info */}
      {composites.length > 0 && (
        <div className="bg-gradient-to-r from-red-50 to-pink-50 p-6 rounded-lg border border-red-200">
          <h3 className="text-lg font-semibold text-red-900 mb-3">
            ❌ Composite Numbers
          </h3>
          <div className="space-y-2">
            <div className="text-slate-700">
              {composites.map((comp, idx) => (
                <span key={comp}>
                  {comp}
                  {markedBy[comp] && (
                    <span className="text-xs text-gray-500"> (÷{markedBy[comp]})</span>
                  )}
                  {idx < composites.length - 1 && ', '}
                </span>
              ))}
            </div>
            <div className="text-xl font-bold text-red-600">
              Total: {composites.length} composites
            </div>
          </div>
        </div>
      )}

      {/* Sieve Process Summary */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg border border-purple-200">
        <h3 className="text-lg font-semibold text-purple-900 mb-4">
          📊 Sieve Statistics
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600">{n}</div>
            <div className="text-sm text-slate-600">Total Numbers</div>
          </div>
          <div className="bg-white p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">{primes.length}</div>
            <div className="text-sm text-slate-600">Primes</div>
          </div>
          <div className="bg-white p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-red-600">{composites.length}</div>
            <div className="text-sm text-slate-600">Composites</div>
          </div>
          <div className="bg-white p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-purple-600">
              {Math.ceil(Math.sqrt(n))}
            </div>
            <div className="text-sm text-slate-600">Loop until √n</div>
          </div>
        </div>

        <div className="mt-4 text-sm text-slate-600 bg-white p-3 rounded">
          <strong>Algorithm:</strong> Only need to check up to √{n} ≈ {Math.ceil(Math.sqrt(n))} 
          because any composite number has at least one factor ≤ √n
        </div>
      </div>
    </div>
  );
}
