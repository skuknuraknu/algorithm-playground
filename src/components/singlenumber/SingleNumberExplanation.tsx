export default function SingleNumberExplanation() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800 mb-3">🔢 Single Number</h2>
        <p className="text-slate-700 leading-relaxed">
          Diberikan array <span className="font-semibold">nums</span> berisi bilangan bulat dimana setiap elemen muncul
          <span className="font-semibold"> dua kali</span> kecuali satu elemen yang muncul sekali. Temukan elemen unik
          tersebut tanpa menggunakan memori ekstra yang besar.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-6 shadow-lg border-2 border-indigo-200">
          <h3 className="text-xl font-bold text-slate-800 mb-3">💡 Pendekatan Solusi</h3>
          <div className="space-y-3 text-slate-700 text-sm">
            <div className="bg-white border-2 border-indigo-100 rounded-lg p-4">
              <h4 className="font-semibold text-indigo-700 mb-1">1. XOR Bit Manipulation</h4>
              <p>XOR memiliki sifat a ^ a = 0 dan a ^ 0 = a. XOR semua elemen akan meng-cancel pasangan dan menyisakan elemen tunggal.</p>
              <div className="text-xs text-slate-500 mt-1">O(n) time | O(1) space</div>
            </div>

            <div className="bg-white border-2 border-green-100 rounded-lg p-4">
              <h4 className="font-semibold text-green-700 mb-1">2. Hash Map / Set</h4>
              <p>Simpan frekuensi setiap angka lalu ambil yang count = 1.</p>
              <div className="text-xs text-slate-500 mt-1">O(n) time | O(n) space</div>
            </div>

            <div className="bg-white border-2 border-amber-100 rounded-lg p-4">
              <h4 className="font-semibold text-amber-700 mb-1">3. Sorting</h4>
              <p>Sort array lalu cek pasangan berurutan untuk menemukan elemen yang tidak berpasangan.</p>
              <div className="text-xs text-slate-500 mt-1">O(n log n) time | O(1) extra space (jika in-place)</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200 space-y-3">
          <h3 className="text-xl font-bold text-slate-800">⏱️ Kompleksitas</h3>
          <div className="bg-indigo-50 border-2 border-indigo-200 rounded-lg p-4">
            <div className="text-sm text-slate-600">Time Complexity</div>
            <div className="text-2xl font-bold text-indigo-700">O(n)</div>
            <div className="text-xs text-slate-500">Linear scan dengan XOR</div>
          </div>
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
            <div className="text-sm text-slate-600">Space Complexity</div>
            <div className="text-2xl font-bold text-green-700">O(1)</div>
            <div className="text-xs text-slate-500">Tidak butuh struktur tambahan</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200 space-y-3">
        <h3 className="text-xl font-bold text-slate-800 mb-1">🎯 Contoh</h3>
        <div className="bg-slate-50 border-2 border-slate-200 rounded-lg p-4 space-y-2 text-slate-700 text-sm">
          <div><strong>Input:</strong> nums = [4, 1, 2, 1, 2]</div>
          <div><strong className="text-green-700">Output:</strong> 4</div>
          <div className="text-xs text-slate-500 pt-2 border-t border-slate-200">
            Penjelasan: 1 dan 2 muncul dua kali, hanya 4 yang tersisa setelah operasi XOR.
          </div>
        </div>
      </div>
    </div>
  );
}
