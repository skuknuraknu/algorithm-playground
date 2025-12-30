import { BookOpen, Target, Lightbulb, Code2, CheckCircle2 } from 'lucide-react';

export default function CombinationSumExplanation() {
  return (
    <div className="space-y-6">
      {/* Header Card */}
      <div className="bg-gradient-to-br from-rose-50 via-white to-pink-50 rounded-2xl p-8 shadow-xl border-2 border-rose-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-100 rounded-full blur-3xl opacity-20 -translate-y-32 translate-x-32"></div>
        <div className="relative">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl shadow-lg">
              <Target className="text-white" size={28} />
            </div>
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                Combination Sum
              </h2>
              <p className="text-sm text-slate-500 mt-1">Backtracking • Array Combinations</p>
            </div>
          </div>
          
          <div className="space-y-4 text-slate-700">
            <div className="flex gap-3">
              <Lightbulb className="text-amber-500 flex-shrink-0 mt-1" size={20} />
              <p className="leading-relaxed text-lg">
                Diberikan array <span className="font-semibold px-2 py-0.5 bg-rose-100 text-rose-700 rounded">candidates</span> dari bilangan bulat berbeda dan angka target <span className="font-semibold px-2 py-0.5 bg-pink-100 text-pink-700 rounded">target</span>, kembalikan semua kombinasi unik dari candidates yang jumlahnya sama dengan target.
              </p>
            </div>
            <div className="flex gap-3">
              <CheckCircle2 className="text-green-500 flex-shrink-0 mt-1" size={20} />
              <p className="leading-relaxed text-lg">
                Angka yang sama dari candidates dapat dipilih berkali-kali tanpa batas. Dua kombinasi dianggap unik jika frekuensi minimal satu angka yang dipilih berbeda.
              </p>
            </div>
          </div>

          {/* Visual Example */}
          <div className="mt-6 bg-white p-6 rounded-xl border-2 border-rose-200 shadow-inner">
            <h4 className="font-bold text-slate-800 mb-4">Contoh Visual</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-600">Array:</span>
                <div className="flex gap-2">
                  {[2, 3, 6, 7].map((num, idx) => (
                    <div key={idx} className="px-3 py-2 bg-gradient-to-br from-rose-100 to-pink-100 border-2 border-rose-200 rounded-lg font-mono font-bold text-rose-700">
                      {num}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-600">Target:</span>
                <div className="px-4 py-2 bg-gradient-to-br from-pink-500 to-rose-500 text-white border-2 border-pink-600 rounded-lg font-mono font-bold text-lg shadow-md">
                  7
                </div>
              </div>
              <div className="border-t-2 border-slate-200 pt-3 mt-3">
                <span className="text-sm text-slate-600 mb-2 block">Solusi:</span>
                <div className="flex flex-wrap gap-2">
                  <div className="px-3 py-2 bg-green-100 border-2 border-green-300 rounded-lg font-mono text-green-700">
                    [2,2,3]
                  </div>
                  <div className="px-3 py-2 bg-green-100 border-2 border-green-300 rounded-lg font-mono text-green-700">
                    [7]
                  </div>
                </div>
              </div>
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
              <p className="text-slate-800">candidates = [2,3,6,7], target = 7</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="px-2 py-0.5 bg-green-500 text-white rounded text-xs font-bold">OUTPUT</span>
              <p className="text-slate-800">[[2,2,3],[7]]</p>
            </div>
            <div className="mt-3 text-xs text-slate-600 border-t border-slate-300 pt-3">
              Penjelasan: 2 dan 3 adalah kandidat yang valid dengan 2+2+3 = 7, dan 7 juga merupakan kandidat dengan 7 = 7.
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-xl border-2 border-slate-200 font-mono text-sm shadow-inner">
            <div className="flex items-start gap-3 mb-2">
              <span className="px-2 py-0.5 bg-blue-500 text-white rounded text-xs font-bold">INPUT</span>
              <p className="text-slate-800">candidates = [2,3,5], target = 8</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="px-2 py-0.5 bg-green-500 text-white rounded text-xs font-bold">OUTPUT</span>
              <p className="text-slate-800">[[2,2,2,2],[2,3,3],[3,5]]</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-xl border-2 border-slate-200 font-mono text-sm shadow-inner">
            <div className="flex items-start gap-3 mb-2">
              <span className="px-2 py-0.5 bg-blue-500 text-white rounded text-xs font-bold">INPUT</span>
              <p className="text-slate-800">candidates = [2], target = 1</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="px-2 py-0.5 bg-green-500 text-white rounded text-xs font-bold">OUTPUT</span>
              <p className="text-slate-800">[]</p>
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
            <span className="font-mono text-base">1 ≤ candidates.length ≤ 30</span>
          </li>
          <li className="flex items-start gap-3 p-3 bg-white rounded-lg border border-amber-200 shadow-sm">
            <span className="text-amber-600 font-bold text-lg">•</span>
            <span className="font-mono text-base">2 ≤ candidates[i] ≤ 40</span>
          </li>
          <li className="flex items-start gap-3 p-3 bg-white rounded-lg border border-amber-200 shadow-sm">
            <span className="text-amber-600 font-bold text-lg">•</span>
            <span className="text-base">Semua elemen di candidates berbeda (distinct)</span>
          </li>
          <li className="flex items-start gap-3 p-3 bg-white rounded-lg border border-amber-200 shadow-sm">
            <span className="text-amber-600 font-bold text-lg">•</span>
            <span className="font-mono text-base">1 ≤ target ≤ 40</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
