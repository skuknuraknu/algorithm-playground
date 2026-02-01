import { ChevronsUp, Lightbulb, ShieldCheck } from 'lucide-react';

export default function ClimbingStairsExplanation() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-2xl shadow-xl flex items-start gap-3">
        <ChevronsUp size={32} className="shrink-0" />
        <div>
          <h2 className="text-2xl font-bold mb-1">Climbing Stairs</h2>
          <p className="text-indigo-100">Hitung jumlah cara mencapai puncak dengan langkah 1 atau 2.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white border-2 border-indigo-100 rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 text-indigo-700 font-semibold mb-2"><Lightbulb size={18}/> Intuisi</div>
          <p className="text-slate-700 leading-relaxed">
            Banyak cara ke anak tangga i = cara ke i-1 (ambil 1 langkah) + cara ke i-2 (ambil 2 langkah). Ini persis deret Fibonacci yang di-offset.
          </p>
        </div>
        <div className="bg-white border-2 border-indigo-100 rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 text-indigo-700 font-semibold mb-2"><ShieldCheck size={18}/> Rumus</div>
          <ul className="list-disc list-inside text-slate-700 space-y-1">
            <li><code>dp[1] = 1</code>, <code>dp[2] = 2</code></li>
            <li><code>dp[i] = dp[i-1] + dp[i-2]</code></li>
            <li>Jawaban = <code>dp[n]</code></li>
          </ul>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white border-2 border-amber-100 rounded-xl p-4">
          <div className="text-amber-700 font-semibold mb-1">Waktu O(n)</div>
          <p className="text-sm text-slate-700">Satu pass dari 3..n.</p>
        </div>
        <div className="bg-white border-2 border-emerald-100 rounded-xl p-4">
          <div className="text-emerald-700 font-semibold mb-1">Space O(1)</div>
          <p className="text-sm text-slate-700">Simpan dua state: dp[i-1] dan dp[i-2].</p>
        </div>
        <div className="bg-white border-2 border-rose-100 rounded-xl p-4">
          <div className="text-rose-700 font-semibold mb-1">Edge</div>
          <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
            <li>n &lt;= 0 ⇒ 0 cara.</li>
            <li>n = 1 ⇒ 1 cara.</li>
            <li>n besar ⇒ hasil cepat membesar (gunakan number aman).</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
