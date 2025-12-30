import { useEffect, useRef, useState } from 'react';
import { Play, CheckCircle, Code2 } from 'lucide-react';
import gsap from 'gsap';

export default function OddEvenCodeEditor() {
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

  const [code, setCode] = useState(`// Odd Even Linked List
// Pisahkan rantai ganjil & genap, lalu gabungkan
// type ListNode struct {
//     Val  int
//     Next *ListNode
// }

func oddEvenList(head *ListNode) *ListNode {
    if head == nil || head.Next == nil {
        return head
    }
    odd := head
    even := head.Next
    evenHead := even

    for even != nil && even.Next != nil {
        odd.Next = even.Next
        odd = odd.Next
        even.Next = odd.Next
        even = even.Next
    }

    odd.Next = evenHead
    return head
}`);

  const testCases = [
    { list: [1,2,3,4,5], expected: [1,3,5,2,4], note: 'ganjil lalu genap' },
    { list: [2,1,3,5,6,4,7], expected: [2,3,6,7,1,5,4], note: 'contoh LeetCode' },
    { list: [1], expected: [1], note: 'satu node, tidak berubah' },
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
