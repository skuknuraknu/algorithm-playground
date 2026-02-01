import { TrendingUp, Lightbulb, Timer, Coins, ShieldCheck } from 'lucide-react';

export default function BestTimeStockExplanation() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-6 rounded-2xl shadow-xl flex items-start gap-3">
        <TrendingUp size={32} className="shrink-0" />
        <div>
          <h2 className="text-2xl font-bold mb-1">Best Time to Buy and Sell Stock</h2>
          <p className="text-emerald-100">Cari profit maksimum dengan satu kali beli dan satu kali jual.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white border-2 border-emerald-100 rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 text-emerald-700 font-semibold mb-2"><Lightbulb size={18}/> Intuisi</div>
          <p className="text-slate-700 leading-relaxed">
            Lacak harga minimum sejauh ini. Untuk setiap hari, profit jika jual = harga hari ini - minSoFar.
            Simpan profit maksimum. Jangan beli lagi jika harga lebih tinggi; cukup update minSoFar jika ketemu harga lebih murah.
          </p>
        </div>
        <div className="bg-white border-2 border-emerald-100 rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 text-emerald-700 font-semibold mb-2"><ShieldCheck size={18}/> Aturan</div>
          <ul className="list-disc list-inside text-slate-700 space-y-1">
            <li>Hanya satu transaksi: satu beli, satu jual.</li>
            <li>Beli harus sebelum jual (indeks beli &lt; indeks jual).</li>
            <li>Jika selalu turun, profit = 0 (pilih tidak transaksi).</li>
          </ul>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white border-2 border-amber-100 rounded-xl p-4">
          <div className="text-amber-700 font-semibold mb-1 flex items-center gap-2"><Timer size={16}/>O(n)</div>
          <p className="text-sm text-slate-700">Satu pass, tiap hari dihitung sekali.</p>
        </div>
        <div className="bg-white border-2 border-rose-100 rounded-xl p-4">
          <div className="text-rose-700 font-semibold mb-1">Space O(1)</div>
          <p className="text-sm text-slate-700">Hanya simpan minSoFar dan bestProfit.</p>
        </div>
        <div className="bg-white border-2 border-indigo-100 rounded-xl p-4">
          <div className="text-indigo-700 font-semibold mb-1 flex items-center gap-2"><Coins size={16}/>Output</div>
          <p className="text-sm text-slate-700">Nilai profit maksimum (bisa 0 jika tidak menguntungkan).</p>
        </div>
      </div>

      <div className="bg-white border-2 border-slate-200 rounded-xl p-5 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 mb-2">Contoh cepat</h3>
        <div className="text-sm text-slate-700 space-y-1 font-mono">
          <div>prices = [7, 1, 5, 3, 6, 4]</div>
          <div>min=7 → profit=0</div>
          <div>min=1 (update) → profit=0</div>
          <div>sell @5 → profit=4 (best)</div>
          <div>sell @3 → profit=2</div>
          <div>sell @6 → profit=5 (best)</div>
          <div>sell @4 → profit=3</div>
        </div>
        <p className="text-sm text-emerald-700 font-semibold mt-2">Hasil: 5 (beli di harga 1, jual di 6)</p>
      </div>
    </div>
  );
}
