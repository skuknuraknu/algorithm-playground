interface SingleNumberVisualizerProps {
  nums: number[];
}

export default function SingleNumberVisualizer({ nums }: SingleNumberVisualizerProps) {
  const freq = nums.reduce<Record<number, number>>((acc, num) => {
    acc[num] = (acc[num] || 0) + 1;
    return acc;
  }, {});

  const unique = Object.keys(freq).find((key) => freq[Number(key)] === 1);

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-slate-800 mb-1">Static Visualization</h3>
          <p className="text-slate-600">Hitung frekuensi setiap angka untuk menemukan elemen tunggal.</p>
        </div>
        <div className="bg-indigo-50 border-2 border-indigo-200 text-indigo-700 px-4 py-2 rounded-lg font-semibold">
          Unique Number: {unique ?? '-'}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {nums.map((num, idx) => {
          const count = freq[num];
          const isUnique = count === 1;
          return (
            <div
              key={`${num}-${idx}`}
              className={`p-4 rounded-lg border-2 shadow-sm flex items-center justify-between ${
                isUnique
                  ? 'bg-green-50 border-green-300'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="text-lg font-semibold text-slate-800">{num}</div>
              <div className={`text-sm px-3 py-1 rounded-full ${isUnique ? 'bg-green-200 text-green-800' : 'bg-slate-200 text-slate-700'}`}>
                {count}x
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-indigo-50 border-2 border-indigo-200 rounded-lg p-4 text-sm text-slate-700">
        <div className="font-semibold text-indigo-800 mb-2">Why it works</div>
        <p>
          Elemen yang berpasangan muncul dua kali dan akan terdeteksi dengan count &gt; 1. Angka yang hanya muncul sekali
          langsung terlihat sebagai unique.
        </p>
      </div>
    </div>
  );
}
