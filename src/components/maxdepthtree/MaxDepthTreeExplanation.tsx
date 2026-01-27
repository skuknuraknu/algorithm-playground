import { useState } from 'react';
import { TreeDeciduous, Lightbulb, Code2, CheckCircle2, Sparkles, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function MaxDepthTreeExplanation() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: "Apa itu Maximum Depth?",
      answer: "Maximum depth (atau height) dari binary tree adalah jumlah nodes di sepanjang path terpanjang dari root node ke leaf node terjauh. Depth dimulai dari 1 untuk root node."
    },
    {
      question: "Mengapa perlu mencari Maximum Depth?",
      answer: "Maximum depth penting untuk: 1) Mengetahui kompleksitas operasi tree (search, insert, delete), 2) Memeriksa balance tree, 3) Memory allocation untuk tree operations, 4) Optimasi algoritma yang bergantung pada tree height."
    },
    {
      question: "Bagaimana cara menghitung depth?",
      answer: "Ada dua pendekatan: 1) Recursive DFS - depth(node) = 1 + max(depth(left), depth(right)), 2) Iterative BFS - menggunakan queue untuk level-order traversal dan menghitung jumlah level."
    },
    {
      question: "Apa perbedaan Depth dan Height?",
      answer: "Depth: jarak dari root ke node tertentu (root depth = 0). Height: jarak dari node tertentu ke leaf terjauh (leaf height = 0). Maximum depth tree = height root node."
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <div className="bg-gradient-to-br from-cyan-50 via-white to-blue-50 rounded-2xl p-8 shadow-xl border-2 border-cyan-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-100 rounded-full blur-3xl opacity-20 -translate-y-32 translate-x-32"></div>
        <div className="relative">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl shadow-lg">
              <TreeDeciduous className="text-white" size={28} />
            </div>
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                Maximum Depth of Binary Tree
              </h2>
              <p className="text-sm text-slate-500 mt-1">Binary Tree • Recursion • DFS • BFS</p>
            </div>
          </div>
          
          <div className="space-y-4 text-slate-700">
            <div className="flex gap-3">
              <Lightbulb className="text-amber-500 flex-shrink-0 mt-1" size={20} />
              <p className="leading-relaxed text-lg">
                Diberikan root dari binary tree, kembalikan <span className="font-semibold px-2 py-0.5 bg-cyan-100 text-cyan-700 rounded">maximum depth</span>-nya.
              </p>
            </div>
            <div className="flex gap-3">
              <CheckCircle2 className="text-green-500 flex-shrink-0 mt-1" size={20} />
              <p className="leading-relaxed text-lg">
                Maximum depth adalah jumlah nodes di sepanjang path terpanjang dari root node ke leaf node terjauh.
              </p>
            </div>
          </div>

          {/* Visual Example */}
          <div className="mt-6 bg-white p-6 rounded-xl border-2 border-cyan-200 shadow-inner">
            <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Sparkles className="text-cyan-600" size={20} />
              Contoh Visual
            </h4>
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="text-center font-mono">
                  <div className="mb-2 text-xs text-cyan-600 font-semibold">Level 1 (Root)</div>
                  <div className="mb-4">
                    <div className="inline-block w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                      3
                    </div>
                  </div>
                  <div className="mb-2 text-xs text-cyan-600 font-semibold">Level 2</div>
                  <div className="flex justify-center gap-16 mb-4">
                    <div className="inline-block w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                      9
                    </div>
                    <div className="inline-block w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                      20
                    </div>
                  </div>
                  <div className="mb-2 text-xs text-cyan-600 font-semibold">Level 3 (Leaves)</div>
                  <div className="flex justify-center gap-8">
                    <div className="w-10 opacity-0">-</div>
                    <div className="inline-block w-10 h-10 bg-gradient-to-br from-cyan-300 to-blue-400 rounded-full flex items-center justify-center text-white font-semibold shadow">
                      15
                    </div>
                    <div className="inline-block w-10 h-10 bg-gradient-to-br from-cyan-300 to-blue-400 rounded-full flex items-center justify-center text-white font-semibold shadow">
                      7
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-cyan-700 font-semibold">
                    Maximum Depth = 3
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
          <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg">
            <HelpCircle className="text-white" size={20} />
          </div>
          <h3 className="text-2xl font-bold text-slate-800">Pertanyaan yang Sering Muncul</h3>
        </div>
        
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border-2 border-slate-200 rounded-xl overflow-hidden transition-all duration-300 hover:border-cyan-300">
              <button
                onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
                className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-slate-50 to-cyan-50 hover:from-cyan-50 hover:to-blue-50 transition-all duration-300"
              >
                <span className="font-semibold text-slate-800 text-left">{faq.question}</span>
                {openFAQ === idx ? (
                  <ChevronUp className="text-cyan-600 flex-shrink-0" size={20} />
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
          <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg">
            <Code2 className="text-white" size={20} />
          </div>
          <h3 className="text-2xl font-bold text-slate-800">Contoh</h3>
        </div>
        
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-xl border-2 border-slate-200 font-mono text-sm shadow-inner">
            <div className="flex items-start gap-3 mb-2">
              <span className="px-2 py-0.5 bg-blue-500 text-white rounded text-xs font-bold">INPUT</span>
              <p className="text-slate-800">root = [3,9,20,null,null,15,7]</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="px-2 py-0.5 bg-green-500 text-white rounded text-xs font-bold">OUTPUT</span>
              <p className="text-slate-800">3</p>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-300">
              <p className="text-slate-600 text-xs">
                Path terpanjang: 3 → 20 → 15 (atau 3 → 20 → 7) dengan 3 nodes
              </p>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-xl border-2 border-slate-200 font-mono text-sm shadow-inner">
            <div className="flex items-start gap-3 mb-2">
              <span className="px-2 py-0.5 bg-blue-500 text-white rounded text-xs font-bold">INPUT</span>
              <p className="text-slate-800">root = [1,null,2]</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="px-2 py-0.5 bg-green-500 text-white rounded text-xs font-bold">OUTPUT</span>
              <p className="text-slate-800">2</p>
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
            <span className="font-mono text-base">Jumlah nodes di tree: [0, 10⁴]</span>
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
            <span><strong>Recursive DFS:</strong> Depth = 1 + max(left depth, right depth)</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-violet-600 font-bold">2.</span>
            <span><strong>Iterative BFS:</strong> Gunakan queue untuk level-order traversal</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-violet-600 font-bold">3.</span>
            <span>Base case: jika node null, return 0</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-violet-600 font-bold">4.</span>
            <span>Kompleksitas: O(n) waktu, O(h) ruang untuk rekursi (h = height)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
