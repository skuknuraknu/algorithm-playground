export default function MissingNumberExplanation() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800 mb-3">📊 Missing Number</h2>
        <p className="text-slate-700 leading-relaxed">
          Diberikan array berisi <code className="bg-purple-50 px-2 py-1 rounded border border-purple-200">n</code> angka unik
          dalam rentang <code className="bg-purple-50 px-2 py-1 rounded border border-purple-200">[0, n]</code>. Temukan satu angka yang
          hilang dari rentang tersebut.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 shadow-lg border-2 border-purple-200 md:col-span-2">
          <h3 className="text-xl font-bold text-slate-800 mb-3">💡 Pendekatan Solusi</h3>
          <div className="space-y-3 text-slate-700 text-sm">
            <div className="bg-white border-2 border-purple-100 rounded-lg p-4">
              <h4 className="font-semibold text-purple-700 mb-1">1. Math (Gauss)</h4>
              <div className="font-mono text-xs bg-slate-50 border border-slate-200 rounded p-2 mb-2">
                expected = n × (n + 1) / 2<br />missing = expected - actualSum
              </div>
              <div className="text-xs text-slate-500">O(n) time | O(1) space</div>
            </div>

            <div className="bg-white border-2 border-green-100 rounded-lg p-4">
              <h4 className="font-semibold text-green-700 mb-1">2. XOR Bit Manipulation</h4>
              <p className="text-sm">XOR semua indeks 0..n dengan semua elemen array; pasangan akan saling hapus.</p>
              <div className="text-xs text-slate-500 mt-1">O(n) time | O(1) space</div>
            </div>

            <div className="bg-white border-2 border-amber-100 rounded-lg p-4">
              <h4 className="font-semibold text-amber-700 mb-1">3. Hash Set</h4>
              <p className="text-sm">Simpan semua elemen ke Set, lalu cek 0 sampai n.</p>
              <div className="text-xs text-slate-500 mt-1">O(n) time | O(n) space</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200 space-y-3">
          <h3 className="text-xl font-bold text-slate-800">⏱️ Kompleksitas</h3>
          <div className="bg-indigo-50 border-2 border-indigo-200 rounded-lg p-4">
            <div className="text-sm text-slate-600">Time Complexity</div>
            <div className="text-2xl font-bold text-indigo-700">O(n)</div>
            <div className="text-xs text-slate-500">Linear scan semua elemen</div>
          </div>
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
            <div className="text-sm text-slate-600">Space Complexity</div>
            <div className="text-2xl font-bold text-green-700">O(1)</div>
            <div className="text-xs text-slate-500">Untuk pendekatan Math/XOR</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200 space-y-3">
        <h3 className="text-xl font-bold text-slate-800 mb-1">🎯 Contoh</h3>
        <div className="bg-slate-50 border-2 border-slate-200 rounded-lg p-4 space-y-2 text-slate-700 text-sm">
          <div><strong>Input:</strong> nums = [3, 0, 1]</div>
          <div><strong>Expected Range:</strong> [0, 1, 2, 3]</div>
          <div><strong className="text-green-700">Output:</strong> 2</div>
          <div className="text-xs text-slate-500 pt-2 border-t border-slate-200">
            Penjelasan: n = 3 → angka 2 hilang dari array.
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
        <h3 className="text-xl font-bold text-slate-800 mb-3">🔑 Key Points</h3>
        <ul className="space-y-2 text-slate-700">
          <li className="flex items-start gap-2">
            <span className="text-green-600 font-bold">✓</span>
            <span>Array berisi n angka unik dalam range [0, n]</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 font-bold">✓</span>
            <span>Selalu ada tepat satu angka yang hilang</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 font-bold">✓</span>
            <span>Gauss formula: sum = n × (n + 1) / 2</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 font-bold">✓</span>
            <span>XOR menghindari overflow dan tetap O(1) space</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
