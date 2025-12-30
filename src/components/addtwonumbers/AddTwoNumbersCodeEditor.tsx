import { useEffect, useRef, useState } from 'react';
import { Play, CheckCircle, Code2 } from 'lucide-react';
import gsap from 'gsap';

export default function AddTwoNumbersCodeEditor() {
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

  const [code, setCode] = useState(`// Add two numbers represented as linked lists (digits in reverse order)
// ListNode definition (for reference)
// type ListNode struct {
//     Val  int
//     Next *ListNode
// }

func addTwoNumbers(l1 *ListNode, l2 *ListNode) *ListNode {
    dummy := &ListNode{}
    current := dummy
    carry := 0

    for l1 != nil || l2 != nil || carry > 0 {
        val1, val2 := 0, 0
        if l1 != nil {
            val1 = l1.Val
            l1 = l1.Next
        }
        if l2 != nil {
            val2 = l2.Val
            l2 = l2.Next
        }

        sum := val1 + val2 + carry
        carry = sum / 10
        current.Next = &ListNode{Val: sum % 10}
        current = current.Next
    }

    return dummy.Next
}`);

  const testCases = [
    { l1: [2,4,3], l2: [5,6,4], expected: [7,0,8], note: '342 + 465 = 807' },
    { l1: [0], l2: [0], expected: [0], note: '0 + 0 = 0' },
    { l1: [9,9,9], l2: [1], expected: [0,0,0,1], note: '999 + 1 = 1000' },
  ];

  const [showResults, setShowResults] = useState(false);

  const handleShowResults = () => {
    setShowResults(true);
  };

  return (
    <div className="space-y-6">
      <div ref={containerRef} className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
        <div className="flex items-center gap-2 mb-3 text-slate-700">
          <Code2 size={18} />
          <h3 className="text-lg font-bold">Latihan Koding (Go sebagai referensi)</h3>
        </div>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-80 p-4 font-mono text-sm bg-slate-900 text-emerald-200 rounded-lg border-2 border-slate-300 focus:outline-none focus:border-emerald-500"
          spellCheck={false}
        />
        <button
          onClick={handleShowResults}
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
            Test cases disajikan untuk ide pengujian (tidak dieksekusi di browser).
          </div>
          <div className="space-y-3">
            {testCases.map((tc, idx) => (
              <div key={idx} className="rounded-lg border-2 border-emerald-100 bg-emerald-50 p-4">
                <div className="font-semibold text-slate-800 mb-1">Kasus {idx + 1}</div>
                <div className="text-sm text-slate-600 space-y-1">
                  <div>L1: [{tc.l1.join(', ')}]</div>
                  <div>L2: [{tc.l2.join(', ')}]</div>
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
