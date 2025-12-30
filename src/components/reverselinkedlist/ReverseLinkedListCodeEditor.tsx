import { useEffect, useRef, useState } from 'react';
import { Play, CheckCircle, XCircle, Code2 } from 'lucide-react';
import gsap from 'gsap';

export default function ReverseLinkedListCodeEditor() {
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

  const [code, setCode] = useState(`// Reverse a singly linked list
// Node definition for reference
// type ListNode struct {
//     Val  int
//     Next *ListNode
// }

func reverseList(head *ListNode) *ListNode {
    var prev *ListNode = nil
    curr := head
    for curr != nil {
        next := curr.Next
        curr.Next = prev
        prev = curr
        curr = next
    }
    return prev
}`);

  const testCases = [
    { input: [1,2,3,4,5], expected: [5,4,3,2,1] },
    { input: [1], expected: [1] },
    { input: [], expected: [] },
  ];

  const runTests = () => {
    // We only show reference Go solution; actual execution not run here.
    setShowResults(true);
    setTestResults(testCases.map((t) => ({ ...t, passed: true })));
  };

  const [showResults, setShowResults] = useState(false);
  const [testResults, setTestResults] = useState<{ input: number[]; expected: number[]; passed: boolean }[]>([]);

  return (
    <div className="space-y-6">
      <div ref={containerRef} className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
        <div className="flex items-center gap-2 mb-3 text-slate-700">
          <Code2 size={18} />
          <h3 className="text-lg font-bold">Contoh Penyelesaian (Go)</h3>
        </div>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-64 p-4 font-mono text-sm bg-slate-900 text-emerald-200 rounded-lg border-2 border-slate-300 focus:outline-none focus:border-emerald-500"
          spellCheck={false}
        />
        <button
          onClick={runTests}
          className="mt-4 bg-emerald-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition-colors flex items-center gap-2"
        >
          <Play size={18} />
          Tandai Selesai
        </button>
      </div>

      {showResults && (
        <div ref={resultsRef} className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200 space-y-3">
          <div className="flex items-center gap-2 text-slate-700 font-semibold">
            {testResults.every((t) => t.passed) ? (
              <CheckCircle className="text-emerald-600" size={22} />
            ) : (
              <XCircle className="text-red-600" size={22} />
            )}
            Semua testcase disajikan untuk referensi (tidak dieksekusi di browser).
          </div>
          <div className="grid md:grid-cols-3 gap-3 text-sm text-slate-600">
            {testResults.map((t, idx) => (
              <div key={idx} className="rounded-lg border-2 border-emerald-100 bg-emerald-50 p-3">
                <div className="font-semibold text-slate-800">Kasus {idx + 1}</div>
                <div>Input: [{t.input.join(', ')}]</div>
                <div>Expected: [{t.expected.join(', ')}]</div>
                <div className="text-emerald-700 font-semibold mt-1">Status: Lulus</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
