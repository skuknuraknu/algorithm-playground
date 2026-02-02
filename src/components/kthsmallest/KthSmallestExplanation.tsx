import { useEffect, useRef } from 'react';
import { Trophy, TreeDeciduous, ListOrdered, Code, Sparkles, Zap, Target } from 'lucide-react';
import gsap from 'gsap';

export default function KthSmallestExplanation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.7)"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <div ref={containerRef} className="space-y-6">
      {/* Problem Introduction with Fun Header */}
      <div ref={addToRefs} className="bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-600 rounded-2xl p-8 shadow-2xl text-white">
        <div className="flex items-start gap-4">
          <div className="text-6xl animate-bounce">🏆</div>
          <div className="flex-1">
            <h2 className="text-4xl font-bold mb-4 flex items-center gap-3">
              <Trophy className="text-yellow-300" size={40} />
              Kth Smallest Element in BST
            </h2>
            <p className="text-lg leading-relaxed text-purple-100 mb-4">
              Bayangin kamu lagi <strong className="text-yellow-300">ngantri di konser</strong> 🎸,
              dan kamu pengen tau siapa yang paling depan ke-K. Tapi antriannya nggak lurus,
              melainkan <strong className="text-cyan-300">berbentuk pohon biner terurut</strong> (BST)!
              Gimana cara-nya cari orang ke-K dengan cepat tanpa harus ngitung semua orang? 🤔
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="text-sm font-semibold text-purple-200 mb-2">🎯 Mission:</div>
              <p className="text-white leading-relaxed">
                Cari elemen terkecil <strong className="text-yellow-300">ke-K</strong> dalam Binary Search Tree
                menggunakan <strong className="text-cyan-300">inorder traversal</strong> yang menghasilkan urutan terurut!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Fun Analogy */}
      <div ref={addToRefs} className="bg-white rounded-2xl p-8 shadow-xl border-2 border-purple-200">
        <h3 className="text-3xl font-bold text-slate-800 mb-6 flex items-center gap-3">
          <Sparkles className="text-purple-600" size={32} />
          🎭 Analogi: Konser dengan Antrian Pohon
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-6 rounded-xl border-2 border-purple-200">
              <h4 className="font-bold text-purple-800 mb-3 flex items-center gap-2">
                <TreeDeciduous className="text-purple-600" size={24} />
                BST Property
              </h4>
              <p className="text-slate-700 leading-relaxed mb-3">
                Dalam BST, setiap node punya aturan:
              </p>
              <div className="bg-white p-4 rounded-lg border border-purple-200 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">⬅️</span>
                  <span className="text-sm"><strong>Kiri:</strong> Semua nilai lebih kecil</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">📍</span>
                  <span className="text-sm"><strong>Root:</strong> Nilai tengah</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">➡️</span>
                  <span className="text-sm"><strong>Kanan:</strong> Semua nilai lebih besar</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-6 rounded-xl border-2 border-cyan-200">
              <h4 className="font-bold text-cyan-800 mb-3">🎵 Inorder = Sorted!</h4>
              <p className="text-sm text-slate-700 leading-relaxed">
                Jika kita jalan dari <strong>kiri → tengah → kanan</strong> (inorder traversal),
                kita akan dapet urutan <strong className="text-cyan-600">kecil ke besar</strong>!
                Jadi tinggal ambil elemen ke-K dari urutan ini.
              </p>
            </div>
          </div>

          <div className="bg-slate-900 p-6 rounded-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 text-white/5 text-9xl">🌳</div>
            <div className="text-white text-sm mb-4 font-semibold relative z-10">Example BST:</div>
            <div className="relative z-10">
              {/* Simple Tree Visual */}
              <div className="flex flex-col items-center space-y-3">
                <div className="flex items-center justify-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    5
                  </div>
                </div>
                <div className="flex items-center justify-center gap-16">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                      3
                    </div>
                    <div className="flex items-center gap-8 mt-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        1
                      </div>
                      <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        4
                      </div>
                    </div>
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold">
                    7
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20">
                <div className="text-xs text-cyan-300 mb-2">Inorder Traversal:</div>
                <div className="flex items-center justify-center gap-2">
                  {[1, 3, 4, 5, 7].map((num, idx) => (
                    <div key={num} className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm ${idx === 2 ? 'bg-yellow-500 ring-2 ring-yellow-300' : 'bg-white/20'
                        }`}>
                        {num}
                      </div>
                      {idx < 4 && <span className="text-white/40">→</span>}
                    </div>
                  ))}
                </div>
                <div className="text-center mt-3 text-yellow-300 text-sm font-semibold">
                  K=3 → Jawaban: 4 🎯
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Three Approaches */}
      <div ref={addToRefs} className="space-y-4">
        <h3 className="text-2xl font-bold text-slate-800">🎯 Three Solution Approaches</h3>

        <div className="grid md:grid-cols-3 gap-4">
          {/* Approach 1: Inorder to Array */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
              <h4 className="font-bold text-blue-800">Inorder → Array</h4>
            </div>
            <div className="space-y-3 text-sm">
              <div className="bg-white p-3 rounded-lg border border-blue-200">
                <div className="font-semibold text-blue-700 mb-1">Idea:</div>
                <p className="text-slate-600">
                  Traverse inorder, simpan semua ke array, lalu return array[k-1]
                </p>
              </div>
              <div className="bg-blue-600 text-white p-3 rounded-lg">
                <div className="text-xs opacity-90">Complexity:</div>
                <div className="font-mono text-sm">Time: O(n)<br />Space: O(n)</div>
              </div>
              <div className="text-xs text-blue-700">
                ✅ Simple, tapi butuh extra space
              </div>
            </div>
          </div>

          {/* Approach 2: Inorder with Counter (Recursive) */}
          <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-6 border-2 border-purple-200">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
              <h4 className="font-bold text-purple-800">Recursive Counter</h4>
            </div>
            <div className="space-y-3 text-sm">
              <div className="bg-white p-3 rounded-lg border border-purple-200">
                <div className="font-semibold text-purple-700 mb-1">Idea:</div>
                <p className="text-slate-600">
                  Inorder rekursif dengan counter. Stop saat counter === k
                </p>
              </div>
              <div className="bg-purple-600 text-white p-3 rounded-lg">
                <div className="text-xs opacity-90">Complexity:</div>
                <div className="font-mono text-sm">Time: O(k)<br />Space: O(h) call stack</div>
              </div>
              <div className="text-xs text-purple-700">
                ✅ Lebih efisien, early termination
              </div>
            </div>
          </div>

          {/* Approach 3: Iterative with Stack */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border-2 border-emerald-200 ring-4 ring-emerald-300/50">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold">3</div>
              <h4 className="font-bold text-emerald-800">Iterative Stack ⭐</h4>
            </div>
            <div className="space-y-3 text-sm">
              <div className="bg-white p-3 rounded-lg border border-emerald-200">
                <div className="font-semibold text-emerald-700 mb-1">Idea:</div>
                <p className="text-slate-600">
                  Gunakan stack untuk inorder iteratif. Count visits, stop saat count === k
                </p>
              </div>
              <div className="bg-emerald-600 text-white p-3 rounded-lg">
                <div className="text-xs opacity-90">Complexity:</div>
                <div className="font-mono text-sm">Time: O(k)<br />Space: O(h)</div>
              </div>
              <div className="text-xs text-emerald-700 font-semibold">
                ⭐ OPTIMAL! No recursion overhead
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Code Implementation */}
      <div ref={addToRefs} className="grid md:grid-cols-2 gap-6">
        <div className="bg-slate-900 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Code className="text-purple-400" size={24} />
            <h4 className="text-lg font-bold text-white">Recursive Solution</h4>
          </div>
          <pre className="text-xs text-purple-300 overflow-x-auto">
            {`function kthSmallest(root, k) {
  let count = 0;
  let result = null;
  
  function inorder(node) {
    if (!node || result !== null) return;
    
    // Left
    inorder(node.left);
    
    // Visit
    count++;
    if (count === k) {
      result = node.val;
      return;
    }
    
    // Right
    inorder(node.right);
  }
  
  inorder(root);
  return result;
}`}
          </pre>
        </div>

        <div className="bg-slate-900 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Code className="text-emerald-400" size={24} />
            <h4 className="text-lg font-bold text-white">Iterative Solution ⭐</h4>
          </div>
          <pre className="text-xs text-emerald-300 overflow-x-auto">
            {`function kthSmallest(root, k) {
  const stack = [];
  let curr = root;
  let count = 0;
  
  while (curr || stack.length) {
    // Go left
    while (curr) {
      stack.push(curr);
      curr = curr.left;
    }
    
    // Visit
    curr = stack.pop();
    count++;
    if (count === k) return curr.val;
    
    // Go right
    curr = curr.right;
  }
  
  return null;
}`}
          </pre>
        </div>
      </div>

      {/* Key Insights */}
      <div ref={addToRefs} className="bg-white rounded-xl p-8 shadow-lg border-2 border-slate-200">
        <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <Zap className="text-yellow-500" size={28} />
          💡 Key Insights
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-5 rounded-xl border-2 border-yellow-200">
            <h4 className="font-bold text-yellow-800 mb-2">1. Inorder = Sorted</h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              Properti paling penting dari BST: <strong>inorder traversal menghasilkan urutan sorted</strong>.
              Ini karena kita selalu visit kiri dulu (nilai kecil), baru root, baru kanan (nilai besar).
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-5 rounded-xl border-2 border-blue-200">
            <h4 className="font-bold text-blue-800 mb-2">2. Early Termination</h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              Kita <strong>tidak perlu traverse seluruh tree</strong>! Begitu counter mencapai K,
              langsung return. Ini membuat time complexity hanya <strong>O(K)</strong> instead of O(n).
            </p>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-5 rounded-xl border-2 border-purple-200">
            <h4 className="font-bold text-purple-800 mb-2">3. Stack vs Recursion</h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              Iterative dengan stack lebih <strong>memory-efficient</strong> karena tidak ada overhead
              dari call stack. Plus, lebih mudah dikontrol (bisa stop kapan saja).
            </p>
          </div>

          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-5 rounded-xl border-2 border-emerald-200">
            <h4 className="font-bold text-emerald-800 mb-2">4. Space: O(h) bukan O(n)</h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              Stack maksimal berisi <strong>tinggi tree (h)</strong>, bukan jumlah node (n).
              Untuk balanced BST, h = log(n), jadi space complexity sangat efficient!
            </p>
          </div>
        </div>
      </div>

      {/* Follow-up Questions */}
      <div ref={addToRefs} className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 shadow-lg border-2 border-orange-200">
        <h3 className="text-xl font-bold text-orange-800 mb-4 flex items-center gap-2">
          <Target className="text-orange-600" size={24} />
          🎤 Interview Follow-ups
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="bg-white p-4 rounded-lg border border-orange-200">
            <strong className="text-orange-700">Q: Bagaimana jika ada banyak query K berbeda?</strong>
            <p className="text-slate-600 mt-2">
              A: Augment BST dengan menyimpan <strong>subtree size</strong> di setiap node.
              Ini membuat lookup O(log n) untuk balanced tree!
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-orange-200">
            <strong className="text-orange-700">Q: Bagaimana cari Kth Largest?</strong>
            <p className="text-slate-600 mt-2">
              A: Reverse inorder! Kanan → Root → Kiri. Atau convert to sorted array
              lalu ambil indeks <code className="bg-orange-100 px-1 rounded">n-k</code>.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-orange-200">
            <strong className="text-orange-700">Q: Validasi K?</strong>
            <p className="text-slate-600 mt-2">
              A: Pastikan <code className="bg-orange-100 px-1 rounded">1 ≤ K ≤ n</code>.
              Bisa hitung size dulu atau handle null return.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-orange-200">
            <strong className="text-orange-700">Q: Time complexity worst case?</strong>
            <p className="text-slate-600 mt-2">
              A: Untuk skewed tree (seperti linked list), bisa O(n).
              Tapi untuk balanced BST, hanya O(K + log n).
            </p>
          </div>
        </div>
      </div>

      {/* Pro Tips */}
      <div ref={addToRefs} className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Sparkles className="text-yellow-300" size={24} />
          ✨ Pro Tips
        </h3>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-yellow-300">⚡</span>
            <span>Iterative approach lebih interview-friendly karena menunjukkan deep understanding</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-300">⚡</span>
            <span>Selalu validate input: cek K dalam range, tree not null, dll</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-300">⚡</span>
            <span>Untuk follow-up optimization, mention augmented BST dengan subtree sizes</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-300">⚡</span>
            <span>Practice reverse inorder untuk Kth Largest variant!</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
