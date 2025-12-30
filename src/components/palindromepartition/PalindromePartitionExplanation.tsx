import { Scissors, Lightbulb, Code2, CheckCircle2, Sparkles } from 'lucide-react';

export default function PalindromePartitionExplanation() {
  return (
    <div className="space-y-6">
      {/* Header Card */}
      <div className="bg-gradient-to-br from-purple-50 via-white to-fuchsia-50 rounded-2xl p-8 shadow-xl border-2 border-purple-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-100 rounded-full blur-3xl opacity-20 -translate-y-32 translate-x-32"></div>
        <div className="relative">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-fuchsia-600 rounded-xl shadow-lg">
              <Scissors className="text-white" size={28} />
            </div>
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
                Palindrome Partitioning
              </h2>
              <p className="text-sm text-slate-500 mt-1">Backtracking • String • Dynamic Programming</p>
            </div>
          </div>
          
          <div className="space-y-4 text-slate-700">
            <div className="flex gap-3">
              <Lightbulb className="text-amber-500 flex-shrink-0 mt-1" size={20} />
              <p className="leading-relaxed text-lg">
                Diberikan string <span className="font-semibold px-2 py-0.5 bg-purple-100 text-purple-700 rounded">s</span>, partisi s sedemikian rupa sehingga setiap substring dari partisi adalah <span className="font-semibold px-2 py-0.5 bg-fuchsia-100 text-fuchsia-700 rounded">palindrome</span>. Kembalikan semua kemungkinan partisi palindrome dari s.
              </p>
            </div>
            <div className="flex gap-3">
              <CheckCircle2 className="text-green-500 flex-shrink-0 mt-1" size={20} />
              <p className="leading-relaxed text-lg">
                Palindrome adalah string yang sama ketika dibaca dari depan atau belakang.
              </p>
            </div>
          </div>

          {/* Visual Example */}
          <div className="mt-6 bg-white p-6 rounded-xl border-2 border-purple-200 shadow-inner">
            <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Sparkles className="text-purple-600" size={20} />
              Contoh Partisi
            </h4>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-slate-600 mb-2">String: "aab"</div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-purple-600 font-bold">→</span>
                    <div className="flex gap-1">
                      <div className="px-3 py-1 bg-purple-100 border-2 border-purple-300 rounded font-mono text-purple-700">
                        "aa"
                      </div>
                      <span className="text-slate-400">|</span>
                      <div className="px-3 py-1 bg-purple-100 border-2 border-purple-300 rounded font-mono text-purple-700">
                        "b"
                      </div>
                    </div>
                    <CheckCircle2 className="text-green-600" size={18} />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-purple-600 font-bold">→</span>
                    <div className="flex gap-1">
                      <div className="px-3 py-1 bg-purple-100 border-2 border-purple-300 rounded font-mono text-purple-700">
                        "a"
                      </div>
                      <span className="text-slate-400">|</span>
                      <div className="px-3 py-1 bg-purple-100 border-2 border-purple-300 rounded font-mono text-purple-700">
                        "a"
                      </div>
                      <span className="text-slate-400">|</span>
                      <div className="px-3 py-1 bg-purple-100 border-2 border-purple-300 rounded font-mono text-purple-700">
                        "b"
                      </div>
                    </div>
                    <CheckCircle2 className="text-green-600" size={18} />
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
              <p className="text-slate-800">s = "aab"</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="px-2 py-0.5 bg-green-500 text-white rounded text-xs font-bold">OUTPUT</span>
              <p className="text-slate-800">[["a","a","b"],["aa","b"]]</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-xl border-2 border-slate-200 font-mono text-sm shadow-inner">
            <div className="flex items-start gap-3 mb-2">
              <span className="px-2 py-0.5 bg-blue-500 text-white rounded text-xs font-bold">INPUT</span>
              <p className="text-slate-800">s = "a"</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="px-2 py-0.5 bg-green-500 text-white rounded text-xs font-bold">OUTPUT</span>
              <p className="text-slate-800">[["a"]]</p>
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
            <span className="font-mono text-base">1 ≤ s.length ≤ 16</span>
          </li>
          <li className="flex items-start gap-3 p-3 bg-white rounded-lg border border-amber-200 shadow-sm">
            <span className="text-amber-600 font-bold text-lg">•</span>
            <span className="font-mono text-base">s hanya berisi huruf kecil English letters</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
