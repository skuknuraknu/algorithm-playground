export default function RobotReturnExplanation() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800 mb-3">🤖 Robot Return to Origin</h2>
        <p className="text-slate-700 leading-relaxed">
          Diberikan string <code className="bg-slate-100 px-2 py-1 rounded border">moves</code> berisi langkah robot di grid 2D
          (U, D, L, R). Tentukan apakah robot berakhir di titik asal (0, 0) setelah menjalankan semua langkah.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-6 shadow-lg border-2 border-cyan-200">
          <h3 className="text-xl font-bold text-slate-800 mb-3">💡 Pendekatan Solusi</h3>
          <div className="space-y-3 text-slate-700 text-sm">
            <div className="bg-white border-2 border-cyan-100 rounded-lg p-4">
              <h4 className="font-semibold text-cyan-700 mb-1">1. Hitung Net Displacement</h4>
              <p>Gerakan U menambah y, D mengurangi y, R menambah x, L mengurangi x. Robot kembali ke origin jika total x = 0 dan y = 0.</p>
              <div className="text-xs text-slate-500 mt-1">O(n) time | O(1) space</div>
            </div>

            <div className="bg-white border-2 border-indigo-100 rounded-lg p-4">
              <h4 className="font-semibold text-indigo-700 mb-1">2. Frequency Counter</h4>
              <p>Hitung frekuensi U vs D dan L vs R. Origin tercapai jika U == D dan L == R.</p>
              <div className="text-xs text-slate-500 mt-1">O(n) time | O(1) space</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200 space-y-3">
          <h3 className="text-xl font-bold text-slate-800">⏱️ Kompleksitas</h3>
          <div className="bg-cyan-50 border-2 border-cyan-200 rounded-lg p-4">
            <div className="text-sm text-slate-600">Time Complexity</div>
            <div className="text-2xl font-bold text-cyan-700">O(n)</div>
            <div className="text-xs text-slate-500">Traverse moves sekali</div>
          </div>
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
            <div className="text-sm text-slate-600">Space Complexity</div>
            <div className="text-2xl font-bold text-green-700">O(1)</div>
            <div className="text-xs text-slate-500">Hanya variabel posisi</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200 space-y-3">
        <h3 className="text-xl font-bold text-slate-800 mb-1">🎯 Contoh</h3>
        <div className="bg-slate-50 border-2 border-slate-200 rounded-lg p-4 space-y-2 text-slate-700 text-sm">
          <div><strong>Input:</strong> moves = "UDLR"</div>
          <div><strong className="text-green-700">Output:</strong> true</div>
          <div className="text-xs text-slate-500 pt-2 border-t border-slate-200">
            Penjelasan: U (+y), D (-y), L (-x), R (+x) → posisi akhir kembali ke (0,0).
          </div>
        </div>
      </div>
    </div>
  );
}
