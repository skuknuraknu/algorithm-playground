import { Plus, Calculator, TrendingUp } from 'lucide-react';

export default function AddTwoNumbersExplanation() {
  return (
    <div className="space-y-6 bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200">
          <Plus className="text-emerald-600" size={28} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Add Two Numbers (Linked List)</h2>
          <p className="text-slate-600 mt-1">
            Setiap angka disimpan <span className="font-semibold text-emerald-600">terbalik</span>: digit satuan ada di head.
            Kita akan menjumlahkan kedua list dari kiri ke kanan sambil membawa <code>carry</code> ke langkah berikutnya.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg border-2 border-slate-200 bg-slate-50">
          <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
            <Calculator size={18} className="text-blue-600" />
            Urutan Terbalik
          </h4>
          <p className="text-slate-600 text-sm">
            342 disimpan sebagai <code>2 → 4 → 3</code>. Jadi kita bisa langsung mulai dari digit satuan tanpa membalik list.
          </p>
        </div>

        <div className="p-4 rounded-lg border-2 border-slate-200 bg-slate-50">
          <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
            <TrendingUp size={18} className="text-orange-600" />
            Carry Sederhana
          </h4>
          <p className="text-slate-600 text-sm">
            Hitung <code>sum = d1 + d2 + carry</code>, simpan <code>sum % 10</code> sebagai digit baru, bawa <code>sum / 10</code> (dibulatkan ke bawah) sebagai carry selanjutnya.
          </p>
        </div>

        <div className="p-4 rounded-lg border-2 border-slate-200 bg-slate-50">
          <h4 className="font-semibold text-slate-800 mb-2">Kompleksitas</h4>
          <p className="text-slate-600 text-sm">
            Waktu <span className="font-semibold">O(max(m, n))</span>, ruang <span className="font-semibold">O(max(m, n))</span> untuk list hasil.
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-lg p-4 space-y-2">
        <h4 className="font-semibold text-slate-800">Ayo Coba Cepat</h4>
        <div className="text-slate-700 text-sm space-y-1">
          <div>Contoh: <code>l1 = [2,4,3]</code> (342), <code>l2 = [5,6,4]</code> (465)</div>
          <div>Hasil: <code>[7,0,8]</code> → 807 (karena 342 + 465 = 807)</div>
        </div>
      </div>

      <div className="p-4 rounded-lg bg-emerald-50 border-2 border-emerald-200 text-slate-800">
        Lanjutkan ke <span className="font-semibold">Visualize</span> untuk melihat hasil jadi, lalu <span className="font-semibold">Simulate</span> untuk menonton carry bergerak.
      </div>
    </div>
  );
}
