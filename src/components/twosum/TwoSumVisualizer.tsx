interface TwoSumVisualizerProps {
  nums: number[];
  target: number;
}

function findPair(nums: number[], target: number): { i: number; j: number } | null {
  const map = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return { i: map.get(complement)!, j: i };
    }
    map.set(nums[i], i);
  }
  return null;
}

export default function TwoSumVisualizer({ nums, target }: TwoSumVisualizerProps) {
  const pair = findPair(nums, target);

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200 space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h3 className="text-2xl font-bold text-slate-800 mb-1">Static Visualization</h3>
          <p className="text-slate-600">Cari complement untuk setiap angka menggunakan hash map.</p>
        </div>
        <div className={`px-4 py-2 rounded-lg font-semibold border-2 ${pair ? 'bg-green-50 border-green-300 text-green-700' : 'bg-amber-50 border-amber-300 text-amber-700'}`}>
          {pair ? `Pair found: [${pair.i}, ${pair.j}]` : 'Belum ditemukan' }
        </div>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {nums.map((num, idx) => {
          const complement = target - num;
          const isInPair = pair ? (idx === pair.i || idx === pair.j) : false;
          return (
            <div
              key={`${num}-${idx}`}
              className={`p-4 rounded-lg border-2 shadow-sm space-y-2 ${isInPair ? 'bg-green-50 border-green-300' : 'bg-slate-50 border-slate-200'}`}
            >
              <div className="flex items-center justify-between">
                <div className="text-lg font-semibold text-slate-800">nums[{idx}]</div>
                {isInPair && <span className="text-xs px-2 py-1 rounded-full bg-green-200 text-green-800">Pair</span>}
              </div>
              <div className="text-2xl font-bold text-slate-900">{num}</div>
              <div className="text-sm text-slate-600">Complement: <span className="font-semibold text-blue-700">{complement}</span></div>
            </div>
          );
        })}
      </div>

      <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 text-sm text-slate-700">
        <div className="font-semibold text-blue-800 mb-2">Proses</div>
        <p>
          Hash map menyimpan angka yang sudah dilihat. Untuk setiap elemen <span className="font-semibold">x</span>,
          kita cek apakah <span className="font-semibold">target - x</span> sudah ada di map. Jika ya, pasangan ditemukan.
        </p>
      </div>
    </div>
  );
}
