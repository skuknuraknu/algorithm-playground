export default function MinStackExplanation() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800 mb-3">🧱 Min Stack</h2>
        <p className="text-slate-700 leading-relaxed">
          Rancang struktur data <span className="font-semibold">stack</span> yang mendukung empat operasi utama dengan kompleksitas <span className="font-bold">O(1)</span>:
          <span className="font-semibold"> push(x), pop(), top(), getMin()</span>. Tantangannya adalah selalu mengetahui nilai minimum saat ini tanpa harus menelusuri seluruh stack setiap kali.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 shadow-md border-2 border-amber-200">
            <h3 className="text-xl font-bold text-amber-800 mb-2">💡 Intuisi</h3>
            <p className="text-sm text-amber-800 leading-relaxed">
              Simpan minimum sementara di setiap langkah. Begitu ada elemen lebih kecil atau sama dengan minimum sekarang, kita catat di <span className="font-semibold">minStack</span>. Saat pop, jika elemen yang keluar adalah minimum, kita keluarkan juga dari minStack.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white border-2 border-slate-200 rounded-xl p-4 shadow-sm">
              <h4 className="font-semibold text-slate-800 mb-2">Dual Stack Technique</h4>
              <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
                <li><span className="font-semibold">stack</span>: menyimpan semua elemen.</li>
                <li><span className="font-semibold">minStack</span>: menyimpan minimum berjalan.</li>
                <li>Push: jika nilai ≤ min terkini, ikut push ke minStack.</li>
                <li>Pop: jika elemen yang di-pop sama dengan top minStack, pop minStack juga.</li>
              </ul>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-xl p-4 shadow-sm">
              <h4 className="font-semibold text-slate-800 mb-2">Kompleksitas</h4>
              <div className="flex flex-col gap-2 text-sm text-slate-700">
                <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200">
                  <div className="text-xs uppercase tracking-wide text-emerald-600 font-semibold">Waktu</div>
                  <div className="text-xl font-bold text-emerald-700">O(1)</div>
                  <div className="text-xs text-emerald-700">Semua operasi konstan.</div>
                </div>
                <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <div className="text-xs uppercase tracking-wide text-blue-600 font-semibold">Ruang</div>
                  <div className="text-xl font-bold text-blue-700">O(n)</div>
                  <div className="text-xs text-blue-700">minStack dapat sebesar stack.</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border-2 border-slate-200 rounded-xl p-4 shadow-sm space-y-3">
            <h4 className="font-semibold text-slate-800">Pro Tips & Edge Cases</h4>
            <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
              <li>Gunakan kondisi <code className="px-1 py-0.5 bg-slate-100 rounded">&lt;=</code> saat push ke <em>minStack</em> untuk menangani nilai duplikat.</li>
              <li>Saat stack kosong dan dipanggil <code>pop()</code> / <code>top()</code> / <code>getMin()</code>, kembalikan <code>null</code> atau abaikan dengan aman.</li>
              <li>Visualisasikan dua stack berdampingan agar perubahan minimum terlihat jelas.</li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200 space-y-4">
          <h3 className="text-xl font-bold text-slate-800">🎯 Contoh Jalan</h3>
          <div className="space-y-3 text-sm text-slate-700">
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
              <span className="font-semibold text-slate-800">push(5)</span>
              <span className="text-indigo-700 font-mono">stack: [5] | min: [5]</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
              <span className="font-semibold text-slate-800">push(2)</span>
              <span className="text-indigo-700 font-mono">stack: [5, 2] | min: [5, 2]</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
              <span className="font-semibold text-slate-800">getMin()</span>
              <span className="text-green-700 font-mono">→ 2</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
              <span className="font-semibold text-slate-800">pop()</span>
              <span className="text-rose-700 font-mono">stack: [5] | min: [5]</span>
            </div>
          </div>
          <div className="text-xs text-slate-500 border-t border-slate-200 pt-3">
            Teknik dual-stack memastikan nilai minimum selalu tersedia tanpa scanning ulang.
          </div>
        </div>
      </div>
    </div>
  );
}
