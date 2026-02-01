export default function ValidParenthesesExplanation() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800 mb-3">🧩 Valid Parentheses</h2>
        <p className="text-slate-700 leading-relaxed">
          Diberikan string berisi karakter <code>()</code>, <code>[]</code>, dan <code>{'{}'}</code>, tentukan apakah urutan bracket valid. Bracket valid jika setiap buka punya pasangan tutup yang sesuai dan urutannya benar (LIFO).
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-6 border-2 border-indigo-100 shadow">
            <h3 className="text-xl font-bold text-indigo-800 mb-2">💡 Intuisi: Stack</h3>
            <p className="text-sm text-indigo-800 leading-relaxed">
              Saat membaca karakter:
              <br />
              • Buka → push ke stack
              <br />
              • Tutup → stack harus tidak kosong dan top harus pasangan yang cocok; jika ya, pop.
              <br />
              Di akhir, stack harus kosong dan tidak pernah terjadi mismatch.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl border-2 border-slate-200 p-4 shadow-sm">
              <h4 className="font-semibold text-slate-800 mb-2">Kompleksitas</h4>
              <div className="space-y-2 text-sm text-slate-700">
                <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200">
                  <div className="text-xs uppercase tracking-wide text-emerald-600 font-semibold">Waktu</div>
                  <div className="text-xl font-bold text-emerald-700">O(n)</div>
                  <div className="text-xs text-emerald-700">Satu pass, setiap char diproses sekali.</div>
                </div>
                <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <div className="text-xs uppercase tracking-wide text-blue-600 font-semibold">Ruang</div>
                  <div className="text-xl font-bold text-blue-700">O(n)</div>
                  <div className="text-xs text-blue-700">Stack bisa menampung sampai n (semua buka).</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border-2 border-slate-200 p-4 shadow-sm">
              <h4 className="font-semibold text-slate-800 mb-2">Edge Cases</h4>
              <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
                <li>String kosong → valid (stack kosong).</li>
                <li>Mulai dengan tutup → langsung invalid.</li>
                <li>Jumlah buka ≠ jumlah tutup → invalid.</li>
                <li>Mismatch tipe, mis. <code>(]</code> atau <code>[)</code>.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200 space-y-3">
          <h3 className="text-xl font-bold text-slate-800">🎯 Contoh</h3>
          <div className="space-y-3 text-sm text-slate-700">
            <div className="rounded-lg border-2 border-emerald-100 bg-emerald-50 p-4">
              <div><strong>Input:</strong> s = "()[]{}"</div>
              <div><strong className="text-emerald-700">Output:</strong> true</div>
              <div className="text-xs text-emerald-700 mt-1">Semua pasangan cocok dan urut.</div>
            </div>
            <div className="rounded-lg border-2 border-rose-100 bg-rose-50 p-4">
              <div><strong>Input:</strong> s = "(]"</div>
              <div><strong className="text-rose-700">Output:</strong> false</div>
              <div className="text-xs text-rose-700 mt-1">'(' tidak cocok dengan ']'.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
