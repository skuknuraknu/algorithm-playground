import { ShieldCheck, Sparkles, Lightbulb, Timer, BarChart3 } from 'lucide-react';

export default function HouseRobberExplanation() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-2xl shadow-xl flex items-start gap-3">
        <ShieldCheck size={32} className="shrink-0" />
        <div>
          <h2 className="text-2xl font-bold mb-1">House Robber</h2>
          <p className="text-indigo-100">Cari uang maksimum dari deret rumah tanpa merampok dua rumah yang bersebelahan.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white border-2 border-indigo-100 rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 text-indigo-700 font-semibold mb-2">
            <Lightbulb size={18} /> Intuisi
          </div>
          <p className="text-slate-700 leading-relaxed">
            Setiap rumah i punya dua opsi: <strong>ambil</strong> (nilai rumah + best sampai i-2) atau <strong>lewati</strong> (best sampai i-1).
            Pilih yang lebih besar. Ini membentuk transisi DP klasik: <code>dp[i] = max(dp[i-1], nums[i] + dp[i-2])</code>.
          </p>
        </div>
        <div className="bg-white border-2 border-indigo-100 rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 text-indigo-700 font-semibold mb-2">
            <BarChart3 size={18} /> State & Transisi
          </div>
          <ul className="list-disc list-inside text-slate-700 space-y-1">
            <li><code>dp[i]</code> = uang maksimum hingga rumah ke-i.</li>
            <li>Pilih <em>skip</em>: gunakan <code>dp[i-1]</code>.</li>
            <li>Pilih <em>pick</em>: ambil <code>nums[i] + dp[i-2]</code>.</li>
            <li>Ambil maksimum keduanya.</li>
          </ul>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white border-2 border-emerald-100 rounded-xl p-4">
          <div className="text-emerald-700 font-semibold mb-1 flex items-center gap-2"><Sparkles size={16}/>Mengapa O(n)</div>
          <p className="text-sm text-slate-700">Hanya satu pass, tiap langkah konstanta.</p>
        </div>
        <div className="bg-white border-2 border-amber-100 rounded-xl p-4">
          <div className="text-amber-700 font-semibold mb-1 flex items-center gap-2"><Timer size={16}/>Space O(1)</div>
          <p className="text-sm text-slate-700">Kita cukup menyimpan dua state: <code>dp[i-1]</code> dan <code>dp[i-2]</code>.</p>
        </div>
        <div className="bg-white border-2 border-rose-100 rounded-xl p-4">
          <div className="text-rose-700 font-semibold mb-1">Edge Cases</div>
          <ul className="text-sm text-slate-700 list-disc list-inside space-y-1">
            <li>Array kosong ⇒ hasil 0.</li>
            <li>Satu rumah ⇒ ambil nilainya.</li>
            <li>Nilai besar/negatif? Umumnya non-negatif; jika negatif, algoritma tetap bekerja.</li>
          </ul>
        </div>
      </div>

      <div className="bg-white border-2 border-slate-200 rounded-xl p-5 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 mb-2">Contoh cepat</h3>
        <div className="text-sm text-slate-700 space-y-1 font-mono">
          <div>nums = [2, 7, 9, 3, 1]</div>
          <div>i=0 → pick=2, skip=0 ⇒ best=2</div>
          <div>i=1 → pick=7, skip=2 ⇒ best=7</div>
          <div>i=2 → pick=9+2=11, skip=7 ⇒ best=11</div>
          <div>i=3 → pick=3+7=10, skip=11 ⇒ best=11</div>
          <div>i=4 → pick=1+11=12, skip=11 ⇒ best=12</div>
        </div>
        <p className="text-sm text-emerald-700 font-semibold mt-2">Hasil: 12 (ambil rumah #0, #2, #4)</p>
      </div>
    </div>
  );
}
