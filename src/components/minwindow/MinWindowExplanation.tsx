export default function MinWindowExplanation() {
  return (
    <div className="bg-white rounded-xl border-2 border-emerald-200 shadow-lg p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-emerald-800 mb-2">Minimum Window Substring</h2>
        <p className="text-slate-700">
          Diberikan string <code className="px-2 py-1 bg-slate-100 rounded text-sm">S</code> dan{' '}
          <code className="px-2 py-1 bg-slate-100 rounded text-sm">T</code>, temukan{' '}
          <span className="font-semibold text-emerald-700">substring terkecil</span> pada S yang
          mengandung semua karakter T (termasuk duplikasi). Jika tidak ada, kembalikan string kosong.
        </p>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
        <h3 className="font-semibold text-blue-900 mb-2">💡 Intuisi</h3>
        <p className="text-blue-800 text-sm">
          Bayangkan jendela yang bisa membesar dan mengecil. Kita perluas jendela ke kanan untuk mencakup semua karakter T,
          lalu kita perkecil dari kiri untuk mendapatkan window paling efisien. Proses ini diulang hingga akhir string.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-slate-800 mb-3">📋 Langkah-langkah Sliding Window</h3>
        <ol className="space-y-3">
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-600 text-white text-sm font-bold flex items-center justify-center">1</span>
            <div>
              <div className="font-semibold text-slate-700">Hitung Kebutuhan Karakter</div>
              <div className="text-sm text-slate-600">Buat hash map untuk menyimpan frekuensi setiap karakter di T. Ini adalah "kebutuhan" yang harus dipenuhi.</div>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-600 text-white text-sm font-bold flex items-center justify-center">2</span>
            <div>
              <div className="font-semibold text-slate-700">Perluas Window (Right Pointer)</div>
              <div className="text-sm text-slate-600">Gerakkan pointer kanan untuk menambah karakter ke window. Kurangi "missing" counter saat menemukan karakter yang dibutuhkan.</div>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-600 text-white text-sm font-bold flex items-center justify-center">3</span>
            <div>
              <div className="font-semibold text-slate-700">Perkecil Window (Left Pointer)</div>
              <div className="text-sm text-slate-600">Ketika window sudah valid (missing = 0), geser left pointer untuk mencoba mengecilkan window sambil tetap valid.</div>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-600 text-white text-sm font-bold flex items-center justify-center">4</span>
            <div>
              <div className="font-semibold text-slate-700">Simpan Window Minimum</div>
              <div className="text-sm text-slate-600">Setiap kali menemukan window yang lebih kecil, simpan posisinya sebagai kandidat jawaban terbaik.</div>
            </div>
          </li>
        </ol>
      </div>

      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg p-4">
        <h3 className="font-semibold text-emerald-900 mb-2">📊 Contoh Detail</h3>
        <div className="text-sm text-emerald-800 space-y-2">
          <div>S = <span className="font-mono font-semibold">"ADOBECODEBANC"</span>, T = <span className="font-mono font-semibold">"ABC"</span></div>
          <div className="pl-4 border-l-2 border-emerald-300 space-y-1">
            <div><strong>Kebutuhan:</strong> A=1, B=1, C=1 (total missing=3)</div>
            <div className="text-xs text-emerald-700 space-y-0.5">
              <div>• Expand ke index 5: "ADOBEC" → valid! (missing=0)</div>
              <div>• Contract dari kiri: "DOBEC" → masih valid</div>
              <div>• Contract lagi: "OBEC" → tidak valid (missing A)</div>
              <div>• Expand ke index 9: "OBECODEBA" → valid!</div>
              <div>• Contract ke "CODEBA" → valid, lebih pendek!</div>
              <div>• Expand sampai akhir dan dapat "BANC" → ini yang terpendek!</div>
            </div>
            <div><strong>Hasil:</strong> "BANC" dengan panjang 4</div>
          </div>
        </div>
      </div>

      <div className="bg-rose-50 border border-rose-200 rounded-lg p-4 space-y-2 text-sm">
        <div className="font-semibold text-rose-900">❌ Pendekatan Brute Force (Tidak Efisien)</div>
        <ul className="list-disc list-inside space-y-1 text-rose-800">
          <li>Cek semua substring S (O(n²)) lalu validasi apakah memenuhi T (O(m)).</li>
          <li>Kompleksitas <strong>O(n² × m)</strong> — terlalu lambat untuk input besar!</li>
          <li>Tidak praktis untuk string panjang (akan timeout/TLE).</li>
        </ul>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-emerald-300 rounded-lg p-4 space-y-2 text-sm">
        <div className="font-semibold text-emerald-900">✅ Pendekatan Sliding Window (Optimal)</div>
        <ul className="list-disc list-inside space-y-1 text-emerald-800">
          <li>Gunakan dua pointer (left & right) untuk membentuk window dinamis.</li>
          <li>Hitung frekuensi karakter T dan track "missing" characters.</li>
          <li>Expand window untuk memenuhi kebutuhan, contract untuk minimize.</li>
          <li>Kompleksitas <strong>O(n + m)</strong> — setiap karakter diproses maksimal 2 kali!</li>
        </ul>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <h3 className="font-semibold text-purple-900 mb-2">⏱️ Kompleksitas Waktu</h3>
          <div className="text-sm text-purple-800">
            <strong>O(n + m)</strong> dimana n = panjang S, m = panjang T.
            <div className="mt-2 text-xs">
              • Membuat frequency map T: O(m)<br/>
              • Setiap karakter S diproses max 2× (right & left): O(2n) = O(n)
            </div>
          </div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <h3 className="font-semibold text-amber-900 mb-2">💾 Kompleksitas Ruang</h3>
          <div className="text-sm text-amber-800">
            <strong>O(k)</strong> dimana k = jumlah karakter unik.
            <div className="mt-2 text-xs">
              • Hash map untuk menyimpan frekuensi karakter<br/>
              • Worst case O(128) untuk ASCII atau O(26) untuk huruf saja
            </div>
          </div>
        </div>
      </div>

      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 text-sm">
        <h3 className="font-semibold text-indigo-900 mb-2">🎯 Tips & Trik</h3>
        <div className="text-indigo-800 space-y-1">
          <div>• Gunakan <strong>missing counter</strong> untuk tracking cepat daripada cek seluruh map</div>
          <div>• <strong>Need map</strong> bisa jadi negatif (artinya surplus karakter di window)</div>
          <div>• Window valid ketika <strong>missing = 0</strong></div>
          <div>• Simpan index, bukan substring untuk efisiensi memori</div>
        </div>
      </div>
    </div>
  );
}
