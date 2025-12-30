import { BookOpen, Lightbulb, Code2, CheckCircle2 } from 'lucide-react';

export default function SubsetsExplanation() {
  return (
    <div className="space-y-6">
      {/* Header Card */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-2xl p-8 shadow-xl border-2 border-blue-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-20 -translate-y-32 translate-x-32"></div>
        <div className="relative">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
              <BookOpen className="text-white" size={28} />
            </div>
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Subsets
              </h2>
              <p className="text-sm text-slate-500 mt-1">Power Set Generation</p>
            </div>
          </div>
          
          <div className="space-y-4 text-slate-700">
            <div className="flex gap-3">
              <Lightbulb className="text-amber-500 flex-shrink-0 mt-1" size={20} />
              <p className="leading-relaxed text-lg">
                Diberikan array bilangan bulat <span className="font-semibold px-2 py-0.5 bg-blue-100 text-blue-700 rounded">nums</span> yang berisi elemen unik, kembalikan semua subset yang mungkin (power set) dari array tersebut.
              </p>
            </div>
            <div className="flex gap-3">
              <CheckCircle2 className="text-green-500 flex-shrink-0 mt-1" size={20} />
              <p className="leading-relaxed text-lg">
                Himpunan jawaban tidak boleh memiliki subset duplikat. Urutan pengembalian boleh apa saja.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Examples Card */}
      <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-slate-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg">
            <Code2 className="text-white" size={20} />
          </div>
          <h3 className="text-2xl font-bold text-slate-800">Contoh</h3>
        </div>
        
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-xl border-2 border-slate-200 font-mono text-sm shadow-inner">
            <div className="flex items-start gap-3 mb-2">
              <span className="px-2 py-0.5 bg-blue-500 text-white rounded text-xs font-bold">INPUT</span>
              <p className="text-slate-800">nums = [1,2,3]</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="px-2 py-0.5 bg-green-500 text-white rounded text-xs font-bold">OUTPUT</span>
              <p className="text-slate-800 break-all">[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-xl border-2 border-slate-200 font-mono text-sm shadow-inner">
            <div className="flex items-start gap-3 mb-2">
              <span className="px-2 py-0.5 bg-blue-500 text-white rounded text-xs font-bold">INPUT</span>
              <p className="text-slate-800">nums = [0]</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="px-2 py-0.5 bg-green-500 text-white rounded text-xs font-bold">OUTPUT</span>
              <p className="text-slate-800">[[],[0]]</p>
            </div>
          </div>
        </div>
      </div>

      {/* Constraints Card */}
      <div className="bg-gradient-to-br from-amber-50 via-white to-orange-50 rounded-2xl p-8 shadow-xl border-2 border-amber-100">
        <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
          <div className="w-2 h-8 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full"></div>
          Batasan
        </h3>
        <ul className="space-y-3 text-slate-700">
          <li className="flex items-start gap-3 p-3 bg-white rounded-lg border border-amber-200 shadow-sm">
            <span className="text-amber-600 font-bold text-lg">•</span>
            <span className="font-mono text-base">1 ≤ nums.length ≤ 10</span>
          </li>
          <li className="flex items-start gap-3 p-3 bg-white rounded-lg border border-amber-200 shadow-sm">
            <span className="text-amber-600 font-bold text-lg">•</span>
            <span className="font-mono text-base">-10 ≤ nums[i] ≤ 10</span>
          </li>
          <li className="flex items-start gap-3 p-3 bg-white rounded-lg border border-amber-200 shadow-sm">
            <span className="text-amber-600 font-bold text-lg">•</span>
            <span className="text-base">Semua elemen di dalam nums unik (tidak ada duplikat).</span>
          </li>
        </ul>
      </div>
    </div>
  );
}