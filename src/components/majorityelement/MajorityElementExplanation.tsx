export default function MajorityElementExplanation() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800 mb-3">👑 Majority Element</h2>
        <p className="text-slate-700 leading-relaxed">
          Temukan elemen yang muncul lebih dari <span className="font-semibold">⌊n/2⌋</span> kali pada array <span className="font-semibold">nums</span>.
          Diasumsikan selalu ada mayoritas.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-gradient-to-br from-violet-50 to-indigo-50 rounded-xl p-6 shadow-lg border-2 border-violet-200 space-y-3">
          <h3 className="text-xl font-bold text-slate-800">💡 Pendekatan</h3>
          <div className="space-y-3 text-slate-700 text-sm">
            <div className="bg-white border-2 border-violet-100 rounded-lg p-4">
              <h4 className="font-semibold text-violet-700 mb-1">1. Boyer-Moore Voting</h4>
              <p>Pertahankan kandidat dan counter. Jika counter nol, ganti kandidat. Tambah jika sama, kurangi jika beda.</p>
              <div className="text-xs text-slate-500 mt-1">O(n) time | O(1) space</div>
            </div>
            <div className="bg-white border-2 border-green-100 rounded-lg p-4">
              <h4 className="font-semibold text-green-700 mb-1">2. Hash Map</h4>
              <p>Hitung frekuensi setiap angka dan pilih yang count &gt; n/2.</p>
              <div className="text-xs text-slate-500 mt-1">O(n) time | O(n) space</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200 space-y-3">
          <h3 className="text-xl font-bold text-slate-800">⏱️ Kompleksitas</h3>
          <div className="bg-violet-50 border-2 border-violet-200 rounded-lg p-4">
            <div className="text-sm text-slate-600">Time Complexity</div>
            <div className="text-2xl font-bold text-violet-700">O(n)</div>
            <div className="text-xs text-slate-500">Satu pass Boyer-Moore</div>
          </div>
          <div className="bg-emerald-50 border-2 border-emerald-200 rounded-lg p-4">
            <div className="text-sm text-slate-600">Space Complexity</div>
            <div className="text-2xl font-bold text-emerald-700">O(1)</div>
            <div className="text-xs text-slate-500">Hanya menyimpan kandidat & counter</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200 space-y-3">
        <h3 className="text-xl font-bold text-slate-800 mb-1">🎯 Contoh</h3>
        <div className="bg-slate-50 border-2 border-slate-200 rounded-lg p-4 space-y-2 text-slate-700 text-sm">
          <div><strong>Input:</strong> nums = [2,2,1,1,1,2,2]</div>
          <div><strong className="text-indigo-700">Output:</strong> 2</div>
          <div className="text-xs text-slate-500 pt-2 border-t border-slate-200">
            Penjelasan: 2 muncul 4 kali (lebih dari n/2 = 3.5)
          </div>
        </div>
      </div>
    </div>
  );
}
