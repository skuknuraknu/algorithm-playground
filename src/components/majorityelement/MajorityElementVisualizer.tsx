interface MajorityElementVisualizerProps {
  nums: number[];
}

function getMajority(nums: number[]): { value: number | null; count: number; freq: Record<number, number> } {
  const freq = nums.reduce<Record<number, number>>((acc, num) => {
    acc[num] = (acc[num] || 0) + 1;
    return acc;
  }, {});
  let maxVal: number | null = null;
  let maxCount = 0;
  Object.entries(freq).forEach(([key, value]) => {
    if (value > maxCount) {
      maxCount = value;
      maxVal = Number(key);
    }
  });
  return { value: maxVal, count: maxCount, freq };
}

export default function MajorityElementVisualizer({ nums }: MajorityElementVisualizerProps) {
  const { value, count, freq } = getMajority(nums);
  const threshold = Math.floor(nums.length / 2) + 1;

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200 space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h3 className="text-2xl font-bold text-slate-800 mb-1">Static Visualization</h3>
          <p className="text-slate-600">Hitung frekuensi dan temukan kandidat mayoritas.</p>
        </div>
        <div className={`px-4 py-2 rounded-lg font-semibold border-2 ${value !== null ? 'bg-violet-50 border-violet-300 text-violet-700' : 'bg-amber-50 border-amber-300 text-amber-700'}`}>
          {value !== null ? `Majority: ${value} (${count}x)` : 'Belum ada data'}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {nums.map((num, idx) => {
          const c = freq[num];
          const isMajor = value !== null && num === value;
          return (
            <div
              key={`${num}-${idx}`}
              className={`p-4 rounded-lg border-2 shadow-sm flex items-center justify-between ${isMajor ? 'bg-violet-50 border-violet-300' : 'bg-slate-50 border-slate-200'}`}
            >
              <div className="text-lg font-semibold text-slate-800">{num}</div>
              <div className={`text-sm px-3 py-1 rounded-full ${isMajor ? 'bg-violet-200 text-violet-800' : 'bg-slate-200 text-slate-700'}`}>
                {c}x
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-violet-50 border-2 border-violet-200 rounded-lg p-4 text-sm text-slate-700">
        <div className="font-semibold text-violet-800 mb-2">Catatan</div>
        <p>
          Elemen mayoritas harus muncul lebih dari <span className="font-semibold">n/2</span> kali. Untuk n = {nums.length}, ambang batasnya adalah <span className="font-semibold">{threshold}</span>.
        </p>
      </div>
    </div>
  );
}
