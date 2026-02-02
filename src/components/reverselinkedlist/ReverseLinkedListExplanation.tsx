import { useEffect, useRef } from 'react';
import { ArrowDownUp, Pointer, GitMerge, Repeat, Zap, Code } from 'lucide-react';
import gsap from 'gsap';

export default function ReverseLinkedListExplanation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
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
      {/* Problem Introduction */}
      <div ref={addToRefs} className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-8 shadow-lg border-2 border-indigo-200">
        <div className="flex items-start gap-4">
          <div className="text-5xl">🔄</div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-slate-800 mb-4 flex items-center gap-3">
              <ArrowDownUp className="text-indigo-600" size={36} />
              Reverse Linked List
            </h2>
            <p className="text-slate-700 text-lg leading-relaxed mb-4">
              Balikkan arah linked list sehingga <strong className="text-indigo-700">head menjadi tail</strong> dan sebaliknya.
              Misalnya: <code className="bg-indigo-100 px-2 py-1 rounded">1→2→3→4→5</code> menjadi{' '}
              <code className="bg-indigo-100 px-2 py-1 rounded">5→4→3→2→1</code>.
            </p>
            <div className="bg-white rounded-lg p-4 border-2 border-indigo-200">
              <div className="text-sm font-semibold text-indigo-700 mb-2">🎯 Challenge</div>
              <p className="text-sm text-slate-600">
                Ubah pointer <code className="bg-slate-100 px-1 rounded">next</code> setiap node <strong>in-place</strong> tanpa membuat list baru,
                dengan kompleksitas waktu <strong className="text-emerald-600">O(n)</strong> dan space <strong className="text-emerald-600">O(1)</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Example */}
      <div ref={addToRefs} className="bg-white rounded-xl p-8 shadow-lg border-2 border-slate-200">
        <h3 className="text-2xl font-bold text-slate-800 mb-6">📊 Visual Example</h3>

        <div className="space-y-6">
          {/* Before */}
          <div>
            <div className="text-sm font-semibold text-slate-600 mb-3">Before (Original):</div>
            <div className="flex items-center gap-2 flex-wrap">
              {[1, 2, 3, 4, 5].map((num, idx) => (
                <div key={num} className="flex items-center gap-2">
                  <div className="bg-blue-500 text-white w-14 h-14 rounded-lg flex items-center justify-center font-bold text-lg shadow-md">
                    {num}
                  </div>
                  {idx < 4 && (
                    <div className="text-blue-500 font-bold text-2xl">→</div>
                  )}
                </div>
              ))}
              <div className="text-slate-400 ml-2">null</div>
            </div>
          </div>

          {/* After */}
          <div>
            <div className="text-sm font-semibold text-slate-600 mb-3">After (Reversed):</div>
            <div className="flex items-center gap-2 flex-wrap">
              {[5, 4, 3, 2, 1].map((num, idx) => (
                <div key={num} className="flex items-center gap-2">
                  <div className="bg-purple-500 text-white w-14 h-14 rounded-lg flex items-center justify-center font-bold text-lg shadow-md">
                    {num}
                  </div>
                  {idx < 4 && (
                    <div className="text-purple-500 font-bold text-2xl">→</div>
                  )}
                </div>
              ))}
              <div className="text-slate-400 ml-2">null</div>
            </div>
          </div>
        </div>
      </div>

      {/* Two Approaches */}
      <div ref={addToRefs} className="grid md:grid-cols-2 gap-6">
        {/* Iterative Approach */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 shadow-lg border-2 border-emerald-200">
          <div className="flex items-center gap-3 mb-4">
            <Pointer className="text-emerald-600" size={28} />
            <h3 className="text-xl font-bold text-emerald-800">1. Iterative (3 Pointers)</h3>
          </div>

          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg border border-emerald-200">
              <div className="font-semibold text-emerald-700 mb-2">Konsep:</div>
              <p className="text-sm text-slate-600">
                Gunakan 3 pointer (<code className="bg-emerald-100 px-1 rounded">prev</code>,{' '}
                <code className="bg-emerald-100 px-1 rounded">curr</code>,{' '}
                <code className="bg-emerald-100 px-1 rounded">next</code>) untuk membalik pointer satu per satu.
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-emerald-200">
              <div className="font-semibold text-emerald-700 mb-2">Langkah:</div>
              <ol className="text-sm text-slate-600 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="bg-emerald-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0">1</span>
                  <span>Simpan <code className="bg-slate-100 px-1 rounded">next = curr.next</code></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-emerald-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0">2</span>
                  <span>Balik: <code className="bg-slate-100 px-1 rounded">curr.next = prev</code></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-emerald-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0">3</span>
                  <span>Geser: <code className="bg-slate-100 px-1 rounded">prev = curr</code></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-emerald-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0">4</span>
                  <span>Lanjut: <code className="bg-slate-100 px-1 rounded">curr = next</code></span>
                </li>
              </ol>
            </div>

            <div className="bg-emerald-600 text-white p-3 rounded-lg">
              <div className="text-xs opacity-90 mb-1">Complexity</div>
              <div className="font-mono text-sm">
                Time: <strong>O(n)</strong> | Space: <strong>O(1)</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Recursive Approach */}
        <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl p-6 shadow-lg border-2 border-violet-200">
          <div className="flex items-center gap-3 mb-4">
            <Repeat className="text-violet-600" size={28} />
            <h3 className="text-xl font-bold text-violet-800">2. Recursive</h3>
          </div>

          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg border border-violet-200">
              <div className="font-semibold text-violet-700 mb-2">Konsep:</div>
              <p className="text-sm text-slate-600">
                Rekursi sampai tail, lalu balik pointer saat "naik kembali" dari call stack.
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-violet-200">
              <div className="font-semibold text-violet-700 mb-2">Langkah:</div>
              <ol className="text-sm text-slate-600 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="bg-violet-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0">1</span>
                  <span>Base case: jika <code className="bg-slate-100 px-1 rounded">!head || !head.next</code>, return head</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-violet-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0">2</span>
                  <span>Rekursi: <code className="bg-slate-100 px-1 rounded">newHead = reverse(head.next)</code></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-violet-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0">3</span>
                  <span>Balik: <code className="bg-slate-100 px-1 rounded">head.next.next = head</code></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-violet-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0">4</span>
                  <span>Putus: <code className="bg-slate-100 px-1 rounded">head.next = null</code></span>
                </li>
              </ol>
            </div>

            <div className="bg-violet-600 text-white p-3 rounded-lg">
              <div className="text-xs opacity-90 mb-1">Complexity</div>
              <div className="font-mono text-sm">
                Time: <strong>O(n)</strong> | Space: <strong>O(n)</strong> (stack)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Step-by-Step Walkthrough */}
      <div ref={addToRefs} className="bg-white rounded-xl p-8 shadow-lg border-2 border-slate-200">
        <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <GitMerge className="text-blue-600" size={28} />
          Step-by-Step: Iterative Approach
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Step</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">prev</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">curr</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">next</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {[
                { step: '0 (Init)', prev: 'null', curr: '1', next: '-', action: 'Start at head' },
                { step: '1', prev: 'null', curr: '1', next: '2', action: 'Save next = 2' },
                { step: '2', prev: 'null', curr: '1', next: '2', action: '1.next = null' },
                { step: '3', prev: '1', curr: '2', next: '-', action: 'Move forward' },
                { step: '4', prev: '1', curr: '2', next: '3', action: 'Save next = 3' },
                { step: '5', prev: '1', curr: '2', next: '3', action: '2.next = 1' },
                { step: '6', prev: '2', curr: '3', next: '-', action: 'Move forward' },
                { step: '...', prev: '...', curr: '...', next: '...', action: 'Continue...' },
                { step: 'Final', prev: '5', curr: 'null', next: '-', action: 'Return 5 as new head' },
              ].map((row, idx) => (
                <tr key={idx} className={`hover:bg-blue-50 transition-colors ${idx === 8 ? 'bg-emerald-50 font-semibold' : ''}`}>
                  <td className="px-4 py-3">{row.step}</td>
                  <td className="px-4 py-3 font-mono text-blue-600">{row.prev}</td>
                  <td className="px-4 py-3 font-mono text-purple-600">{row.curr}</td>
                  <td className="px-4 py-3 font-mono text-amber-600">{row.next}</td>
                  <td className="px-4 py-3 text-slate-600">{row.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Code Implementation */}
      <div ref={addToRefs} className="grid md:grid-cols-2 gap-6">
        {/* Iterative Code */}
        <div className="bg-slate-900 rounded-xl p-6 shadow-lg border-2 border-slate-700">
          <div className="flex items-center gap-2 mb-4">
            <Code className="text-emerald-400" size={20} />
            <h4 className="text-lg font-bold text-white">Iterative Implementation</h4>
          </div>
          <pre className="text-sm text-emerald-400 overflow-x-auto">
            {`function reverseList(head) {
  let prev = null;
  let curr = head;
  
  while (curr !== null) {
    let next = curr.next;  // Save
    curr.next = prev;      // Reverse
    prev = curr;           // Move prev
    curr = next;           // Move curr
  }
  
  return prev; // New head
}`}
          </pre>
        </div>

        {/* Recursive Code */}
        <div className="bg-slate-900 rounded-xl p-6 shadow-lg border-2 border-slate-700">
          <div className="flex items-center gap-2 mb-4">
            <Code className="text-violet-400" size={20} />
            <h4 className="text-lg font-bold text-white">Recursive Implementation</h4>
          </div>
          <pre className="text-sm text-violet-400 overflow-x-auto">
            {`function reverseList(head) {
  // Base case
  if (!head || !head.next) {
    return head;
  }
  
  // Recurse
  let newHead = reverseList(head.next);
  
  // Reverse pointer
  head.next.next = head;
  head.next = null;
  
  return newHead;
}`}
          </pre>
        </div>
      </div>

      {/* Key Insights */}
      <div ref={addToRefs} className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 shadow-lg border-2 border-amber-200">
        <h3 className="text-xl font-bold text-amber-800 mb-4 flex items-center gap-2">
          <Zap className="text-amber-600" size={24} />
          💡 Key Insights
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg border border-amber-200">
            <div className="font-semibold text-amber-700 mb-2">Why 3 pointers?</div>
            <p className="text-sm text-slate-600">
              Kita perlu <strong>next</strong> untuk menyimpan node berikutnya sebelum kita putus koneksi{' '}
              <code className="bg-slate-100 px-1 rounded">curr.next</code>, agar tidak "hilang".
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-amber-200">
            <div className="font-semibold text-amber-700 mb-2">In-place reversal</div>
            <p className="text-sm text-slate-600">
              Tidak membuat linked list baru, hanya mengubah pointer existing nodes. Space O(1).
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-amber-200">
            <div className="font-semibold text-amber-700 mb-2">Iterative vs Recursive</div>
            <p className="text-sm text-slate-600">
              Iterative lebih efisien (O(1) space), tapi recursive lebih elegant. Untuk list sangat panjang,
              iterative lebih aman (no stack overflow).
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-amber-200">
            <div className="font-semibold text-amber-700 mb-2">Return value</div>
            <p className="text-sm text-slate-600">
              <strong>prev</strong> (iterative) atau <strong>newHead</strong> (recursive) menjadi head baru
              setelah reversal selesai.
            </p>
          </div>
        </div>
      </div>

      {/* Edge Cases */}
      <div ref={addToRefs} className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl p-6 shadow-lg border-2 border-rose-200">
        <h3 className="text-xl font-bold text-rose-800 mb-4">⚠️ Edge Cases</h3>
        <div className="space-y-3 text-sm">
          <div className="bg-white p-3 rounded-lg border border-rose-200">
            <strong className="text-rose-700">Empty list (head = null):</strong>
            <p className="text-slate-600 mt-1">Return null langsung.</p>
          </div>
          <div className="bg-white p-3 rounded-lg border border-rose-200">
            <strong className="text-rose-700">Single node:</strong>
            <p className="text-slate-600 mt-1">Return node itu sendiri (sudah "reversed").</p>
          </div>
          <div className="bg-white p-3 rounded-lg border border-rose-200">
            <strong className="text-rose-700">Two nodes (1→2):</strong>
            <p className="text-slate-600 mt-1">Reverse menjadi (2→1). Pastikan 1.next = null.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
