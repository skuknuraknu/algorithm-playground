import { Binary, Lightbulb, Code2, CheckCircle2, Sparkles } from 'lucide-react';

export default function SymmetricTreeExplanation() {
  return (
    <div className="space-y-6">
      {/* Header Card */}
      <div className="bg-gradient-to-br from-emerald-50 via-white to-teal-50 rounded-2xl p-8 shadow-xl border-2 border-emerald-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-100 rounded-full blur-3xl opacity-20 -translate-y-32 translate-x-32"></div>
        <div className="relative">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg">
              <Binary className="text-white" size={28} />
            </div>
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Symmetric Tree
              </h2>
              <p className="text-sm text-slate-500 mt-1">Binary Tree • Recursion • Tree Traversal</p>
            </div>
          </div>
          
          <div className="space-y-4 text-slate-700">
            <div className="flex gap-3">
              <Lightbulb className="text-amber-500 flex-shrink-0 mt-1" size={20} />
              <p className="leading-relaxed text-lg">
                Diberikan root dari binary tree, cek apakah tree tersebut <span className="font-semibold px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded">mirror terhadap dirinya sendiri</span> (yaitu, symmetric di sekitar pusatnya).
              </p>
            </div>
            <div className="flex gap-3">
              <CheckCircle2 className="text-green-500 flex-shrink-0 mt-1" size={20} />
              <p className="leading-relaxed text-lg">
                Tree symmetric jika subtree kiri adalah mirror dari subtree kanan.
              </p>
            </div>
          </div>

          {/* Visual Example */}
          <div className="mt-6 bg-white p-6 rounded-xl border-2 border-emerald-200 shadow-inner">
            <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Sparkles className="text-emerald-600" size={20} />
              Contoh Tree Symmetric
            </h4>
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="text-center font-mono">
                  <div className="mb-4">
                    <div className="inline-block w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                      1
                    </div>
                  </div>
                  <div className="flex justify-center gap-20 mb-4">
                    <div className="inline-block w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                      2
                    </div>
                    <div className="inline-block w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                      2
                    </div>
                  </div>
                  <div className="flex justify-center gap-8">
                    <div className="inline-block w-10 h-10 bg-gradient-to-br from-emerald-300 to-teal-400 rounded-full flex items-center justify-center text-white font-semibold shadow">
                      3
                    </div>
                    <div className="inline-block w-10 h-10 bg-gradient-to-br from-emerald-300 to-teal-400 rounded-full flex items-center justify-center text-white font-semibold shadow">
                      4
                    </div>
                    <div className="inline-block w-10 h-10 bg-gradient-to-br from-emerald-300 to-teal-400 rounded-full flex items-center justify-center text-white font-semibold shadow">
                      4
                    </div>
                    <div className="inline-block w-10 h-10 bg-gradient-to-br from-emerald-300 to-teal-400 rounded-full flex items-center justify-center text-white font-semibold shadow">
                      3
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-emerald-700 font-semibold">
                    ✓ Tree ini SYMMETRIC
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Examples Card */}
      <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-slate-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg">
            <Code2 className="text-white" size={20} />
          </div>
          <h3 className="text-2xl font-bold text-slate-800">Contoh</h3>
        </div>
        
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-xl border-2 border-slate-200 font-mono text-sm shadow-inner">
            <div className="flex items-start gap-3 mb-2">
              <span className="px-2 py-0.5 bg-blue-500 text-white rounded text-xs font-bold">INPUT</span>
              <p className="text-slate-800">root = [1,2,2,3,4,4,3]</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="px-2 py-0.5 bg-green-500 text-white rounded text-xs font-bold">OUTPUT</span>
              <p className="text-slate-800">true</p>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-300">
              <p className="text-slate-600 text-xs">
                Tree symmetric karena subtree kiri mirror dengan subtree kanan
              </p>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-xl border-2 border-slate-200 font-mono text-sm shadow-inner">
            <div className="flex items-start gap-3 mb-2">
              <span className="px-2 py-0.5 bg-blue-500 text-white rounded text-xs font-bold">INPUT</span>
              <p className="text-slate-800">root = [1,2,2,null,3,null,3]</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="px-2 py-0.5 bg-red-500 text-white rounded text-xs font-bold">OUTPUT</span>
              <p className="text-slate-800">false</p>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-300">
              <p className="text-slate-600 text-xs">
                Tree tidak symmetric karena posisi child nodes tidak mirror
              </p>
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
            <span className="font-mono text-base">Jumlah nodes di tree: [1, 1000]</span>
          </li>
          <li className="flex items-start gap-3 p-3 bg-white rounded-lg border border-amber-200 shadow-sm">
            <span className="text-amber-600 font-bold text-lg">•</span>
            <span className="font-mono text-base">-100 ≤ Node.val ≤ 100</span>
          </li>
        </ul>
      </div>

      {/* Approach Card */}
      <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl p-6 border-2 border-violet-200 shadow-lg">
        <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
          💡 Pendekatan Solusi
        </h4>
        <div className="space-y-3 text-slate-700">
          <div className="flex items-start gap-3">
            <span className="text-violet-600 font-bold">1.</span>
            <span>Bandingkan subtree kiri dan kanan secara rekursif</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-violet-600 font-bold">2.</span>
            <span>Left child dari subtree kiri harus sama dengan right child dari subtree kanan</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-violet-600 font-bold">3.</span>
            <span>Right child dari subtree kiri harus sama dengan left child dari subtree kanan</span>
          </div>
        </div>
      </div>
    </div>
  );
}
