import { useEffect, useRef, useState } from 'react';
import { Play, CheckCircle, Code2 } from 'lucide-react';
import gsap from 'gsap';

export default function BinaryTreeLevelOrderCodeEditor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });
    }
  }, []);

  useEffect(() => {
    if (resultsRef.current) {
      gsap.fromTo(resultsRef.current, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' });
    }
  }, [resultsRef.current]);

  const [code, setCode] = useState(`// Definition for a binary tree node.
// class TreeNode {
//   val: number
//   left: TreeNode | null
//   right: TreeNode | null
//   constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
//     this.val = (val===undefined ? 0 : val)
//     this.left = (left===undefined ? null : left)
//     this.right = (right===undefined ? null : right)
//   }
// }

function levelOrder(root: TreeNode | null): number[][] {
    const res: number[][] = []
    if (!root) return res
    const q: TreeNode[] = [root]
    while (q.length) {
        const size = q.length
        const level: number[] = []
        for (let i = 0; i < size; i++) {
            const node = q.shift()!
            level.push(node.val)
            if (node.left) q.push(node.left)
            if (node.right) q.push(node.right)
        }
        res.push(level)
    }
    return res
}
`);

  const [showResults, setShowResults] = useState(false);

  const testCases = [
    { input: '[3,9,20,null,null,15,7]', expected: '[[3],[9,20],[15,7]]' },
    { input: '[]', expected: '[]' },
    { input: '[1]', expected: '[[1]]' },
  ];

  return (
    <div className="space-y-6">
      <div ref={containerRef} className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
        <div className="flex items-center gap-2 mb-3 text-slate-700">
          <Code2 size={18} />
          <h3 className="text-lg font-bold">Latihan Koding (TS/JS)</h3>
        </div>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-72 p-4 font-mono text-sm bg-slate-900 text-emerald-200 rounded-lg border-2 border-slate-300 focus:outline-none focus:border-emerald-500"
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
            Test cases disajikan untuk ide pengujian (tidak dieksekusi di browser).
          </div>
          <div className="space-y-3">
            {testCases.map((tc, idx) => (
              <div key={idx} className="rounded-lg border-2 border-emerald-100 bg-emerald-50 p-4">
                <div className="font-semibold text-slate-800 mb-1">Kasus {idx + 1}</div>
                <div className="text-sm text-slate-700 space-y-1 font-mono">
                  <div>Input: {tc.input}</div>
                  <div>Expected: {tc.expected}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
