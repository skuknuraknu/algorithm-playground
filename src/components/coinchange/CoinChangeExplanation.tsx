import { Coins, Lightbulb, ShieldCheck } from 'lucide-react';

export default function CoinChangeExplanation() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-6 rounded-2xl shadow-xl flex items-start gap-3">
        <Coins size={32} className="shrink-0" />
        <div>
          <h2 className="text-2xl font-bold mb-1">Coin Change</h2>
          <p className="text-emerald-100">Cari jumlah koin minimum untuk membentuk nilai target.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white border-2 border-emerald-100 rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 text-emerald-700 font-semibold mb-2"><Lightbulb size={18}/> Intuisi</div>
          <p className="text-slate-700 leading-relaxed">
            Gunakan DP bottom-up: <code>dp[x]</code> = minimum koin untuk membentuk jumlah x. Untuk tiap koin c, update <code>dp[x]</code> = min(dp[x], dp[x-c] + 1).
            Ini mirip unbounded knapsack (koin bisa dipakai berulang).
          </p>
        </div>
        <div className="bg-white border-2 border-emerald-100 rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 text-emerald-700 font-semibold mb-2"><ShieldCheck size={18}/> Aturan & Edge</div>
          <ul className="list-disc list-inside text-slate-700 space-y-1">
            <li>Jika amount = 0 ⇒ hasil 0.</li>
            <li>Jika tidak ada kombinasi ⇒ kembalikan -1.</li>
            <li>Urutan loop: koin luar, amount naik (unbounded).</li>
          </ul>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white border-2 border-amber-100 rounded-xl p-4">
          <div className="text-amber-700 font-semibold mb-1">Waktu O(n·amount)</div>
          <p className="text-sm text-slate-700">n = jumlah koin.</p>
        </div>
        <div className="bg-white border-2 border-rose-100 rounded-xl p-4">
          <div className="text-rose-700 font-semibold mb-1">Space O(amount)</div>
          <p className="text-sm text-slate-700">Satu array dp linear.</p>
        </div>
        <div className="bg-white border-2 border-indigo-100 rounded-xl p-4">
          <div className="text-indigo-700 font-semibold mb-1">Output</div>
          <p className="text-sm text-slate-700">Minimal koin atau -1 bila tidak mungkin.</p>
        </div>
      </div>
    </div>
  );
}
