import { useEffect, useRef } from 'react';
import { Binary, Sparkles, Code, Zap, CheckCircle2, XCircle } from 'lucide-react';
import gsap from 'gsap';

export default function SymmetricTreeExplanation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  cardsRef.current = [];

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
      <div ref={addToRefs} className="bg-gradient-to-br from-teal-600 via-emerald-600 to-green-600 rounded-2xl p-8 shadow-2xl text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="relative flex items-start gap-4">
          <div className="text-6xl animate-bounce">🪞</div>
          <div className="flex-1">
            <h2 className="text-4xl font-bold mb-4 flex items-center gap-3">
              <Binary size={40} />
              Symmetric Tree
            </h2>
            <p className="text-lg leading-relaxed text-teal-100 mb-4">
              Bayangin kamu lagi berdiri di depan <strong className="text-yellow-300">cermin ajaib</strong> 🪞,
              dan kamu pengen cek apakah <strong className="text-cyan-300">reflection-nya sempurna</strong>.
              Tapi cerminnya bukan cermin biasa—ini cermin untuk <strong className="text-pink-300">Binary Tree</strong>!
              Kiri harus mirror dengan kanan, sempurna setiap detail! 🌳✨
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="text-sm font-semibold text-teal-200 mb-2">🎯 Mission:</div>
              <p className="text-white leading-relaxed">
                Cek apakah tree <strong className="text-yellow-300">symmetric</strong> (mirror reflection)
                di sekitar pusatnya. Left subtree harus <strong className="text-cyan-300">mirror image</strong> dari right subtree!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Fun Analogy: Mirror Reflection */}
      <div ref={addToRefs} className="bg-white rounded-2xl p-8 shadow-xl border-2 border-teal-200">
        <h3 className="text-3xl font-bold text-slate-800 mb-6 flex items-center gap-3">
          <Sparkles className="text-teal-600" size={32} />
          🪞 Analogi: Cermin Sempurna
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-teal-50 to-emerald-50 p-6 rounded-xl border-2 border-teal-200">
              <h4 className="font-bold text-teal-800 mb-3">🌳 Mirror Property</h4>
              <p className="text-sm text-slate-700 leading-relaxed mb-3">
                Symmetric tree = left subtree adalah <strong className="text-teal-600">mirror reflection</strong> dari right subtree.
              </p>
              <div className="bg-white p-4 rounded-lg border border-teal-200 space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">⬅️</span>
                  <span><strong>Left Child:</strong> mirror dengan Right Child</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">➡️</span>
                  <span><strong>Right Child:</strong> mirror dengan Left Child</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">✅</span>
                  <span><strong>Values:</strong> Harus sama persis!</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-6 rounded-xl border-2 border-cyan-200">
              <h4 className="font-bold text-cyan-800 mb-3">🔄 Recursive Check</h4>
              <p className="text-sm text-slate-700 leading-relaxed">
                Kita cek secara rekursif: apakah setiap node di kiri punya <strong className="text-cyan-600">pasangan mirror</strong> di kanan
                dengan nilai sama dan struktur terbalik.
              </p>
            </div>
          </div>

          <div className="bg-slate-900 p-6 rounded-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-emerald-500/20"></div>
            <div className="text-white text-sm mb-4 font-semibold relative z-10 flex items-center gap-2">
              <Sparkles size={20} className="text-cyan-400" />
              Symmetric Tree Example:
            </div>
            <div className="relative z-10">
              {/* Tree Visual with Mirror Line */}
              <div className="flex flex-col items-center space-y-4">
                {/* Root */}
                <div className="flex items-center justify-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    1
                  </div>
                </div>

                {/* Mirror line */}
                <div className="w-px h-6 bg-gradient-to-b from-cyan-400 to-transparent"></div>

                {/* Level 1 */}
                <div className="flex items-center justify-center gap-20 relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                    2
                  </div>
                  {/* Vertical mirror line */}
                  <div className="absolute left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-cyan-400 via-yellow-400 to-cyan-400 shadow-lg shadow-yellow-400/50"></div>
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                    2
                  </div>
                </div>

                {/* Level 2 */}
                <div className="flex items-center justify-center gap-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow">
                    3
                  </div>
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow">
                    4
                  </div>
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow">
                    4
                  </div>
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow">
                    3
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20">
                <div className="text-center text-green-300 text-sm font-semibold flex items-center justify-center gap-2">
                  <CheckCircle2 size={20} />
                  SYMMETRIC! Kiri = Mirror Kanan
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison: Symmetric vs Not Symmetric */}
      <div ref={addToRefs} className="grid md:grid-cols-2 gap-6">
        {/* Symmetric Example */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="text-green-600" size={24} />
            <h4 className="font-bold text-green-800">✅ Symmetric</h4>
          </div>
          <div className="bg-white p-4 rounded-lg border border-green-200 font-mono text-sm mb-3">
            <div className="text-slate-600">Input:</div>
            <div className="text-slate-800 font-semibold">[1, 2, 2, 3, 4, 4, 3]</div>
            <div className="text-green-700 mt-2">Output: <strong>true</strong></div>
          </div>
          <p className="text-sm text-slate-700">
            Left subtree (2→3,4) adalah <strong className="text-green-600">mirror</strong> dari right subtree (2→4,3)!
          </p>
        </div>

        {/* Not Symmetric Example */}
        <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-xl p-6 border-2 border-red-200">
          <div className="flex items-center gap-2 mb-4">
            <XCircle className="text-red-600" size={24} />
            <h4 className="font-bold text-red-800">❌ Not Symmetric</h4>
          </div>
          <div className="bg-white p-4 rounded-lg border border-red-200 font-mono text-sm mb-3">
            <div className="text-slate-600">Input:</div>
            <div className="text-slate-800 font-semibold">[1, 2, 2, null, 3, null, 3]</div>
            <div className="text-red-700 mt-2">Output: <strong>false</strong></div>
          </div>
          <p className="text-sm text-slate-700">
            Left child (null, 3) ≠ mirror right child (null, 3) karena <strong className="text-red-600">posisi tidak terbalik</strong>!
          </p>
        </div>
      </div>

      {/* Algorithm Approaches */}
      <div ref={addToRefs} className="space-y-4">
        <h3 className="text-2xl font-bold text-slate-800">🎯 Solution Approaches</h3>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Recursive */}
          <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-6 border-2 border-purple-200 ring-4 ring-purple-300/50">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
              <h4 className="font-bold text-purple-800">Recursive ⭐</h4>
            </div>
            <div className="space-y-3 text-sm">
              <div className="bg-white p-3 rounded-lg border border-purple-200">
                <div className="font-semibold text-purple-700 mb-1">Idea:</div>
                <p className="text-slate-600">
                  Helper function <code className="bg-purple-100 px-1 rounded">isMirror(left, right)</code> cek apakah
                  left subtree mirror dengan right subtree secara rekursif.
                </p>
              </div>
              <div className="bg-purple-600 text-white p-3 rounded-lg">
                <div className="text-xs opacity-90">Complexity:</div>
                <div className="font-mono text-sm">Time: O(n)<br />Space: O(h) recursion</div>
              </div>
              <div className="text-xs text-purple-700 font-semibold">
                ⭐ OPTIMAL & ELEGANT!
              </div>
            </div>
          </div>

          {/* Iterative */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
              <h4 className="font-bold text-blue-800">Iterative (Queue)</h4>
            </div>
            <div className="space-y-3 text-sm">
              <div className="bg-white p-3 rounded-lg border border-blue-200">
                <div className="font-semibold text-blue-700 mb-1">Idea:</div>
                <p className="text-slate-600">
                  Gunakan queue/stack untuk BFS/DFS. Push pairs (left, right) dan cek mirror property.
                </p>
              </div>
              <div className="bg-blue-600 text-white p-3 rounded-lg">
                <div className="text-xs opacity-90">Complexity:</div>
                <div className="font-mono text-sm">Time: O(n)<br />Space: O(n) queue</div>
              </div>
              <div className="text-xs text-blue-700">
                ✅ Good for avoiding deep recursion
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Code Implementation */}
      <div ref={addToRefs} className="bg-slate-900 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Code className="text-purple-400" size={24} />
          <h4 className="text-lg font-bold text-white">Recursive Solution (Optimal)</h4>
        </div>
        <pre className="text-xs text-purple-300 overflow-x-auto">
          {`function isSymmetric(root) {
  if (!root) return true;
  
  function isMirror(left, right) {
    // Both null - symmetric
    if (!left && !right) return true;
    
    // One is null - not symmetric
    if (!left || !right) return false;
    
    // Check values & recurse with mirrored children
    return left.val === right.val &&
           isMirror(left.left, right.right) &&  // Outer pair
           isMirror(left.right, right.left);     // Inner pair
  }
  
  return isMirror(root.left, root.right);
}`}
        </pre>
      </div>

      {/* Key Insights */}
      <div ref={addToRefs} className="bg-white rounded-xl p-8 shadow-lg border-2 border-slate-200">
        <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <Zap className="text-yellow-500" size={28} />
          💡 Key Insights
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-5 rounded-xl border-2 border-yellow-200">
            <h4 className="font-bold text-yellow-800 mb-2">1. Mirror = Flipped Structure</h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              Left child di kiri harus match dengan <strong>right child di kanan</strong> (outer pair),
              dan right child di kiri match dengan <strong>left child di kanan</strong> (inner pair).
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-5 rounded-xl border-2 border-blue-200">
            <h4 className="font-bold text-blue-800 mb-2">2. Three Base Cases</h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              <strong>✅ Both null:</strong> symmetric.
              <strong>❌ One null:</strong> not symmetric.
              <strong>🔍 Compare values:</strong> lalu recurse.
            </p>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-5 rounded-xl border-2 border-purple-200">
            <h4 className="font-bold text-purple-800 mb-2">3. Recursion is Natural</h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              Mirror property bersifat <strong>recursive</strong>: kalau subtree symmetric,
              maka sub-subtree juga harus symmetric dengan pasangan mirror-nya.
            </p>
          </div>

          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-5 rounded-xl border-2 border-emerald-200">
            <h4 className="font-bold text-emerald-800 mb-2">4. Linear Time is Optimal</h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              Kita harus visit setiap node minimal sekali untuk verify, jadi <strong>O(n) is optimal</strong>.
              Space O(h) untuk balanced tree sangat efficient!
            </p>
          </div>
        </div>
      </div>

      {/* Edge Cases & Pro Tips */}
      <div ref={addToRefs} className="grid md:grid-cols-2 gap-6">
        {/* Edge Cases */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 shadow-lg border-2 border-orange-200">
          <h3 className="text-xl font-bold text-orange-800 mb-4">⚠️ Edge Cases</h3>
          <div className="space-y-3 text-sm">
            <div className="bg-white p-3 rounded-lg border border-orange-200">
              <strong className="text-orange-700">Empty Tree:</strong>
              <p className="text-slate-600 mt-1">Tree kosong dianggap symmetric → return <code className="bg-orange-100 px-1 rounded">true</code></p>
            </div>
            <div className="bg-white p-3 rounded-lg border border-orange-200">
              <strong className="text-orange-700">Single Node:</strong>
              <p className="text-slate-600 mt-1">Root saja tanpa children juga symmetric</p>
            </div>
            <div className="bg-white p-3 rounded-lg border border-orange-200">
              <strong className="text-orange-700">Same Values Different Structure:</strong>
              <p className="text-slate-600 mt-1">Nilai sama tapi posisi beda = NOT symmetric</p>
            </div>
          </div>
        </div>

        {/* Pro Tips */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Sparkles className="text-yellow-300" size={24} />
            ✨ Pro Tips
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-yellow-300">⚡</span>
              <span>Recursive solution paling readable dan interview-friendly</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-300">⚡</span>
              <span>Ingat: left.left ↔ right.right (outer) dan left.right ↔ right.left (inner)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-300">⚡</span>
              <span>Early termination: return false begitu ketemu mismatch</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-300">⚡</span>
              <span>Iterative bagus untuk extremely deep trees (avoid stack overflow)</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
