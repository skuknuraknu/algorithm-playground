export default function ContainsDuplicateExplanation() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800 mb-3">🧭 Contains Duplicate</h2>
        <p className="text-slate-700 leading-relaxed">
          Diberikan array <span className="font-semibold">nums</span>, tentukan apakah ada nilai yang muncul lebih dari satu kali.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 shadow-lg border-2 border-amber-200 space-y-3">
          <h3 className="text-xl font-bold text-slate-800">💡 Pendekatan</h3>
          <div className="space-y-3 text-slate-700 text-sm">
            <div className="bg-white border-2 border-amber-100 rounded-lg p-4">
              <h4 className="font-semibold text-amber-700 mb-1">1. Hash Set</h4>
              <p>Iterasi array sambil menyimpan elemen yang sudah terlihat di dalam <span className="font-semibold">set</span>. Jika elemen sudah ada, berarti duplikat.</p>
              <div className="text-xs text-slate-500 mt-1">O(n) time | O(n) space</div>
            </div>
            <div className="bg-white border-2 border-blue-100 rounded-lg p-4">
              <h4 className="font-semibold text-blue-700 mb-1">2. Sorting</h4>
              <p>Sort array lalu cek apakah ada dua elemen berurutan yang sama.</p>
              <div className="text-xs text-slate-500 mt-1">O(n log n) time | O(1) extra space (jika in-place)</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200 space-y-3">
          <h3 className="text-xl font-bold text-slate-800">⏱️ Kompleksitas</h3>
          <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-4">
            <div className="text-sm text-slate-600">Time Complexity</div>
            <div className="text-2xl font-bold text-amber-700">O(n)</div>
            <div className="text-xs text-slate-500">Set lookup per elemen</div>
          </div>
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
            <div className="text-sm text-slate-600">Space Complexity</div>
            <div className="text-2xl font-bold text-green-700">O(n)</div>
            <div className="text-xs text-slate-500">Set menyimpan elemen unik</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200 space-y-3">
        <h3 className="text-xl font-bold text-slate-800 mb-1">🎯 Contoh</h3>
        <div className="bg-slate-50 border-2 border-slate-200 rounded-lg p-4 space-y-2 text-slate-700 text-sm">
          <div><strong>Input:</strong> nums = [1,2,3,1]</div>
          <div><strong className="text-red-700">Output:</strong> true</div>
          <div className="text-xs text-slate-500 pt-2 border-t border-slate-200">
            Penjelasan: angka 1 muncul dua kali.
          </div>
        </div>
      </div>
    </div>
  );
}
