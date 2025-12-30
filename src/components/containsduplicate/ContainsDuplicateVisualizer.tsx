interface ContainsDuplicateVisualizerProps {
  nums: number[];
}

export default function ContainsDuplicateVisualizer({ nums }: ContainsDuplicateVisualizerProps) {
  const freq = nums.reduce<Record<number, number>>((acc, num) => {
    acc[num] = (acc[num] || 0) + 1;
    return acc;
  }, {});

  const hasDuplicate = Object.values(freq).some((c) => c > 1);

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200 space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h3 className="text-2xl font-bold text-slate-800 mb-1">Static Visualization</h3>
          <p className="text-slate-600">Hitung frekuensi untuk mendeteksi adanya duplikasi.</p>
        </div>
        <div className={`px-4 py-2 rounded-lg font-semibold border-2 ${hasDuplicate ? 'bg-red-50 border-red-300 text-red-700' : 'bg-green-50 border-green-300 text-green-700'}`}>
          {hasDuplicate ? 'Duplikat ditemukan' : 'Semua unik'}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {nums.map((num, idx) => {
          const count = freq[num];
          const duplicated = count > 1;
          return (
            <div
              key={`${num}-${idx}`}
              className={`p-4 rounded-lg border-2 shadow-sm flex items-center justify-between ${duplicated ? 'bg-red-50 border-red-300' : 'bg-slate-50 border-slate-200'}`}
            >
              <div className="text-lg font-semibold text-slate-800">{num}</div>
              <div className={`text-sm px-3 py-1 rounded-full ${duplicated ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'}`}>
                {count}x
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-4 text-sm text-slate-700">
        <div className="font-semibold text-amber-800 mb-2">Catatan</div>
        <p>
          Menggunakan <span className="font-semibold">Set</span> kita hanya perlu satu pass: jika angka sudah pernah ada di set, berarti duplikasi dan dapat langsung berhenti.
        </p>
      </div>
    </div>
  );
}
