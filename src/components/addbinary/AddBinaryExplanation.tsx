export default function AddBinaryExplanation() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800 mb-3">➕ Add Binary</h2>
        <p className="text-slate-700 leading-relaxed">
          Diberikan dua string biner <code className="bg-slate-100 px-2 py-1 rounded border">a</code> dan <code className="bg-slate-100 px-2 py-1 rounded border">b</code>,
          kembalikan hasil penjumlahan keduanya sebagai string biner tanpa mengubah ke bilangan desimal besar.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 shadow-lg border-2 border-orange-200">
          <h3 className="text-xl font-bold text-slate-800 mb-3">💡 Pendekatan Solusi</h3>
          <div className="space-y-3 text-slate-700 text-sm">
            <div className="bg-white border-2 border-orange-100 rounded-lg p-4">
              <h4 className="font-semibold text-orange-700 mb-1">1. Simulasi Penjumlahan Digit</h4>
              <p>Iterasi dari belakang (LSB) dengan carry. Tambahkan digit a, digit b, dan carry untuk menentukan digit hasil.</p>
              <div className="text-xs text-slate-500 mt-1">O(n) time | O(n) space</div>
            </div>
            <div className="bg-white border-2 border-green-100 rounded-lg p-4">
              <h4 className="font-semibold text-green-700 mb-1">2. Gunakan Array Hasil</h4>
              <p>Push digit hasil ke array lalu balikkan di akhir. Hindari konversi ke integer untuk input panjang.</p>
              <div className="text-xs text-slate-500 mt-1">Aman untuk string panjang</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200 space-y-3">
          <h3 className="text-xl font-bold text-slate-800">⏱️ Kompleksitas</h3>
          <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-4">
            <div className="text-sm text-slate-600">Time Complexity</div>
            <div className="text-2xl font-bold text-orange-700">O(max(n, m))</div>
            <div className="text-xs text-slate-500">Linear terhadap panjang string terpanjang</div>
          </div>
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
            <div className="text-sm text-slate-600">Space Complexity</div>
            <div className="text-2xl font-bold text-green-700">O(max(n, m))</div>
            <div className="text-xs text-slate-500">Menyimpan hasil biner</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200 space-y-3">
        <h3 className="text-xl font-bold text-slate-800 mb-1">🎯 Contoh</h3>
        <div className="bg-slate-50 border-2 border-slate-200 rounded-lg p-4 space-y-2 text-slate-700 text-sm">
          <div><strong>Input:</strong> a = "1010", b = "1011"</div>
          <div><strong className="text-green-700">Output:</strong> "10101"</div>
          <div className="text-xs text-slate-500 pt-2 border-t border-slate-200">
            Penjelasan: 10 (2) + 11 (3) = 10101 (5) dalam biner, perhatikan carry di setiap digit.
          </div>
        </div>
      </div>
    </div>
  );
}
