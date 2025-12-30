import { useEffect, useRef, useState } from 'react';
import { Play, CheckCircle, Code2 } from 'lucide-react';
import gsap from 'gsap';

export default function RemoveNthCodeEditor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });
    }
  }, []);

  useEffect(() => {
    if (resultsRef.current) {
      gsap.fromTo(resultsRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' });
    }
  }, [resultsRef.current]);

  const [code, setCode] = useState(`// Remove Nth Node From End of List
// Satu-pass dengan dummy + dua pointer
// type ListNode struct {
//     Val  int
//     Next *ListNode
// }

func removeNthFromEnd(head *ListNode, n int) *ListNode {
    dummy := &ListNode{Next: head}
    fast, slow := dummy, dummy

    // fast maju n+1 langkah
    for i := 0; i <= n; i++ {
        if fast == nil { return head }
        fast = fast.Next
    }

    // gerak bareng
    for fast != nil {
        fast = fast.Next
        slow = slow.Next
    }

    // hapus node setelah slow
    slow.Next = slow.Next.Next
    return dummy.Next
}`);

  const testCases = [
    { list: [1,2,3,4,5], n: 2, expected: [1,2,3,5], note: 'hapus 2nd from end (4)' },
    { list: [1], n: 1, expected: [], note: 'hapus head tunggal' },
    { list: [1,2], n: 2, expected: [2], note: 'hapus head dari 2 node' },
  ];

  const [showResults, setShowResults] = useState(false);

  return (
    <div className="space-y-6">
      <div ref={containerRef} className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
        <div className="flex items-center gap-2 mb-3 text-slate-700">
          <Code2 size={18} />
          <h3 className="text-lg font-bold">Practice Koding (Go referensi)</h3>
        </div>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-80 p-4 font-mono text-sm bg-slate-900 text-emerald-200 rounded-lg border-2 border-slate-300 focus:outline-none focus:border-emerald-500"
          spellCheck={false}
        />
        <button
          onClick={() => setShowResults(true)}
          className="mt-4 bg-emerald-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition-colors flex items-center gap-2"
        >
          <Play size={18} />
          Lihat Test Cases Referensi
        </button>
      </div>

      {showResults && (
        <div ref={resultsRef} className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200 space-y-4">
          <div className="flex items-center gap-2 text-slate-700 font-semibold">
            <CheckCircle className="text-emerald-600" size={22} />
            Test cases ini tidak dieksekusi di browser; gunakan sebagai ide uji.
          </div>
          <div className="space-y-3">
            {testCases.map((tc, idx) => (
              <div key={idx} className="rounded-lg border-2 border-emerald-100 bg-emerald-50 p-4">
                <div className="font-semibold text-slate-800 mb-1">Kasus {idx + 1}</div>
                <div className="text-sm text-slate-600 space-y-1">
                  <div>List: [{tc.list.join(', ')}]</div>
                  <div>n: {tc.n}</div>
                  <div>Expected: [{tc.expected.join(', ')}]</div>
                  <div className="text-emerald-700 font-semibold italic">{tc.note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
