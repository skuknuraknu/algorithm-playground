import { useState } from 'react';
import { GitBranch, Lightbulb, Code2, CheckCircle2, Sparkles, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function PathSumExplanation() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: "Apa itu Path Sum?",
      answer: "Path sum adalah jumlah semua node values di sepanjang path dari root ke leaf. Path harus dimulai dari root dan berakhir di leaf node (node tanpa child). Kita mencari apakah ada path yang jumlahnya sama dengan target sum."
    },
    {
      question: "Mengapa harus path root-to-leaf?",
      answer: "Constraint root-to-leaf memastikan path complete dan well-defined. Partial path (tidak sampai leaf) bisa menghasilkan ambiguitas. Ini adalah standar problem untuk mengecek tree traversal dan backtracking understanding."
    },
    {
      question: "Bagaimana cara mencari path?",
      answer: "Gunakan DFS (Depth-First Search): 1) Mulai dari root dengan remaining sum = targetSum, 2) Di setiap node, kurangi node.val dari remaining sum, 3) Jika sampai leaf dan remaining sum = 0, path ditemukan, 4) Backtrack jika tidak ada path valid."
    },
    {
      question: "Apa perbedaan dengan Maximum Depth?",
      answer: "Maximum Depth hanya menghitung panjang path terpanjang tanpa peduli nilai nodes. Path Sum memeriksa jumlah nilai sepanjang path dan mencocokan dengan target. Path Sum lebih complex karena melibatkan perhitungan dan kondisi."
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <div className="bg-gradient-to-br from-orange-50 via-white to-amber-50 rounded-2xl p-8 shadow-xl border-2 border-orange-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-100 rounded-full blur-3xl opacity-20 -translate-y-32 translate-x-32"></div>
        <div className="relative">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl shadow-lg">
              <GitBranch className="text-white" size={28} />
            </div>
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                Path Sum
              </h2>
              <p className="text-sm text-slate-500 mt-1">Binary Tree • DFS • Backtracking • Recursion</p>
            </div>
          </div>
          
          <div className="space-y-4 text-slate-700">
            <div className="flex gap-3">
              <Lightbulb className="text-amber-500 flex-shrink-0 mt-1" size={20} />
              <p className="leading-relaxed text-lg">
                Diberikan root dari binary tree dan integer <span className="font-semibold px-2 py-0.5 bg-orange-100 text-orange-700 rounded">targetSum</span>, return true jika tree memiliki path <span className="font-semibold px-2 py-0.5 bg-amber-100 text-amber-700 rounded">root-to-leaf</span> sedemikian rupa sehingga jumlah semua node values sepanjang path sama dengan targetSum.
              </p>
            </div>
            <div className="flex gap-3">
              <CheckCircle2 className="text-green-500 flex-shrink-0 mt-1" size={20} />
              <p className="leading-relaxed text-lg">
                Leaf adalah node yang tidak memiliki children. Path harus dimulai dari root dan berakhir di leaf.
              </p>
            </div>
          </div>

          {/* Visual Example */}
          <div className="mt-6 bg-white p-6 rounded-xl border-2 border-orange-200 shadow-inner">
            <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Sparkles className="text-orange-600" size={20} />
              Contoh Visual (Target Sum = 22)
            </h4>
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="text-center font-mono">
                  <div className="mb-4">
                    <div className="inline-block relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                        5
                      </div>
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-orange-600 font-bold whitespace-nowrap">
                        sum: 5
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center gap-16 mb-4">
                    <div className="inline-block relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                        4
                      </div>
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-orange-600 font-bold whitespace-nowrap">
                        sum: 9
                      </div>
                    </div>
                    <div className="inline-block w-12 h-12 opacity-20 bg-slate-300 rounded-full flex items-center justify-center text-slate-500 font-bold">
                      8
                    </div>
                  </div>
                  <div className="flex justify-center gap-8">
                    <div className="inline-block relative">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-300 to-amber-400 rounded-full flex items-center justify-center text-white font-semibold shadow">
                        11
                      </div>
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-orange-600 font-bold whitespace-nowrap">
                        sum: 20
                      </div>
                    </div>
                    <div className="w-10 opacity-0">-</div>
                    <div className="w-10 opacity-0">-</div>
                  </div>
                  <div className="flex justify-center gap-4 mt-4">
                    <div className="w-8 opacity-0">-</div>
                    <div className="inline-block relative">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center text-white font-semibold shadow ring-4 ring-emerald-200">
                        2
                      </div>
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-emerald-600 font-bold whitespace-nowrap">
                        sum: 22 ✓
                      </div>
                    </div>
                    <div className="w-8 opacity-0">-</div>
                  </div>
                  <p className="mt-6 text-sm text-emerald-700 font-semibold bg-emerald-50 px-4 py-2 rounded-lg inline-block">
                    Path ditemukan: 5 → 4 → 11 → 2 = 22
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-slate-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg">
            <HelpCircle className="text-white" size={20} />
          </div>
          <h3 className="text-2xl font-bold text-slate-800">Pertanyaan yang Sering Muncul</h3>
        </div>
        
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border-2 border-slate-200 rounded-xl overflow-hidden transition-all duration-300 hover:border-orange-300">
              <button
                onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
                className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-slate-50 to-orange-50 hover:from-orange-50 hover:to-amber-50 transition-all duration-300"
              >
                <span className="font-semibold text-slate-800 text-left">{faq.question}</span>
                {openFAQ === idx ? (
                  <ChevronUp className="text-orange-600 flex-shrink-0" size={20} />
                ) : (
                  <ChevronDown className="text-slate-400 flex-shrink-0" size={20} />
                )}
              </button>
              {openFAQ === idx && (
                <div className="px-6 py-4 bg-white border-t-2 border-slate-100">
                  <p className="text-slate-700 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Examples Card */}
      <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-slate-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg">
            <Code2 className="text-white" size={20} />
          </div>
          <h3 className="text-2xl font-bold text-slate-800">Contoh</h3>
        </div>
        
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-xl border-2 border-slate-200 font-mono text-sm shadow-inner">
            <div className="flex items-start gap-3 mb-2">
              <span className="px-2 py-0.5 bg-blue-500 text-white rounded text-xs font-bold">INPUT</span>
              <div>
                <p className="text-slate-800">root = [5,4,8,11,null,13,4,7,2,null,null,null,1]</p>
                <p className="text-slate-800 mt-1">targetSum = 22</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="px-2 py-0.5 bg-green-500 text-white rounded text-xs font-bold">OUTPUT</span>
              <p className="text-slate-800">true</p>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-300">
              <p className="text-slate-600 text-xs">
                Path: 5 → 4 → 11 → 2 (5 + 4 + 11 + 2 = 22)
              </p>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-xl border-2 border-slate-200 font-mono text-sm shadow-inner">
            <div className="flex items-start gap-3 mb-2">
              <span className="px-2 py-0.5 bg-blue-500 text-white rounded text-xs font-bold">INPUT</span>
              <div>
                <p className="text-slate-800">root = [1,2,3]</p>
                <p className="text-slate-800 mt-1">targetSum = 5</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="px-2 py-0.5 bg-red-500 text-white rounded text-xs font-bold">OUTPUT</span>
              <p className="text-slate-800">false</p>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-300">
              <p className="text-slate-600 text-xs">
                Path 1→2 = 3, Path 1→3 = 4 (tidak ada yang = 5)
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
            <span className="font-mono text-base">Jumlah nodes di tree: [0, 5000]</span>
          </li>
          <li className="flex items-start gap-3 p-3 bg-white rounded-lg border border-amber-200 shadow-sm">
            <span className="text-amber-600 font-bold text-lg">•</span>
            <span className="font-mono text-base">-1000 ≤ Node.val ≤ 1000</span>
          </li>
          <li className="flex items-start gap-3 p-3 bg-white rounded-lg border border-amber-200 shadow-sm">
            <span className="text-amber-600 font-bold text-lg">•</span>
            <span className="font-mono text-base">-1000 ≤ targetSum ≤ 1000</span>
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
            <span><strong>DFS Recursive:</strong> Traverse tree, track remaining sum di setiap node</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-violet-600 font-bold">2.</span>
            <span>Di setiap node, kurangi node.val dari targetSum</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-violet-600 font-bold">3.</span>
            <span>Jika sampai leaf dan remaining sum = 0, return true</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-violet-600 font-bold">4.</span>
            <span>Cek left dan right subtree, return true jika salah satu ada path</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-violet-600 font-bold">5.</span>
            <span>Kompleksitas: O(n) waktu, O(h) ruang untuk rekursi</span>
          </div>
        </div>
      </div>
    </div>
  );
}
