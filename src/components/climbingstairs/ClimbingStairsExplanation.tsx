import { ChevronsUp, Lightbulb, ShieldCheck } from 'lucide-react';

export default function ClimbingStairsExplanation() {
  return (
    <div className="space-y-6 font-sans">
      <div className="bg-gradient-to-br from-indigo-600 to-violet-700 text-white p-6 rounded-3xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-4 -translate-y-4">
          <ChevronsUp size={120} />
        </div>
        <div className="relative z-10 flex items-start gap-4">
          <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
            <ChevronsUp size={32} className="text-indigo-100" />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold mb-2 tracking-tight">Climbing Stairs</h2>
            <p className="text-indigo-100 text-lg leading-relaxed">
              Misi: Panjat tangga ke lantai <strong>n</strong>. Sekali langkah cuma boleh 1 atau 2 anak tangga.
              <br />
              <span className="text-sm opacity-80 italic">"Capek sih, tapi demi algoritma!" 🏃‍♂️💨</span>
            </p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white border text-slate-700 border-indigo-100 rounded-2xl p-6 shadow-lg shadow-indigo-100/50 hover:shadow-indigo-200/50 transition-all duration-300">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-lg mb-3">
            <Lightbulb size={24} className="text-yellow-500" />
            <span>Logika "Males Mikir"</span>
          </div>
          <p className="leading-relaxed mb-4">
            Bayangin kamu di anak tangga ke-<strong>i</strong>. Kamu PASTI datang dari:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-4 ml-2">
            <li>Lantai <strong>i-1</strong> (lompat 1 langkah).</li>
            <li>Lantai <strong>i-2</strong> (lompat 2 langkah).</li>
          </ul>
          <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-200 text-indigo-800 text-sm font-medium">
            🎯 Jadi: Cara(i) = Cara(i-1) + Cara(i-2)
          </div>
        </div>

        <div className="bg-white border border-indigo-100 text-slate-700 rounded-2xl p-6 shadow-lg shadow-indigo-100/50 hover:shadow-indigo-200/50 transition-all duration-300">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-lg mb-3">
            <ShieldCheck size={24} className="text-emerald-500" />
            <span>Trik Hemat Memori</span>
          </div>
          <p className="leading-relaxed mb-3">
            Buat apa inget cara naik ke lantai 1 kalo kamu udah di lantai 100? <span role="img" aria-label="laugh">🤣</span>
          </p>
          <p className="mb-3">
            Kita cuma butuh inget 2 lantai terakhir aja!
          </p>
          <div className="bg-slate-800 text-emerald-400 font-mono text-sm p-3 rounded-lg">
            curr = prev1 + prev2;<br />
            prev2 = prev1;<br />
            prev1 = curr;
          </div>
          <p className="text-xs text-slate-500 mt-2 text-right italic">Space complexity: O(1) alias irit banget.</p>
        </div>
      </div>
    </div>
  );
}
