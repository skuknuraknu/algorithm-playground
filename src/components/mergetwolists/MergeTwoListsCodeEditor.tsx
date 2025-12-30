import { useState, useEffect, useRef } from 'react';
import { Play, CheckCircle, XCircle } from 'lucide-react';
import gsap from 'gsap';

export default function MergeTwoListsCodeEditor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [code, setCode] = useState(`/**
 * Definisi untuk singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function(list1, list2) {
    // Tulis solusi Anda di sini
    
};`);

  const [testResults, setTestResults] = useState<{
    passed: boolean;
    input: { l1: number[], l2: number[] };
    expected: number[];
    actual: number[] | null;
    error?: string;
  }[]>([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      const ctx = gsap.context(() => {
        gsap.from('.editor-section', {
          opacity: 0,
          y: 20,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out'
        });
      }, containerRef);
      return () => ctx.revert();
    }
  }, []);

  // Helper to create linked list from array
  const createList = (arr: number[]) => {
    if (!arr.length) return null;
    const head = { val: arr[0], next: null };
    let current: any = head;
    for (let i = 1; i < arr.length; i++) {
      current.next = { val: arr[i], next: null };
      current = current.next;
    }
    return head;
  };

  // Helper to convert linked list to array
  const listToArray = (head: any) => {
    const result = [];
    let current = head;
    while (current) {
      result.push(current.val);
      current = current.next;
      if (result.length > 100) break; // Prevent infinite loop
    }
    return result;
  };

  const runTests = () => {
    const testCases = [
      { l1: [1, 2, 4], l2: [1, 3, 4], expected: [1, 1, 2, 3, 4, 4] },
      { l1: [], l2: [], expected: [] },
      { l1: [], l2: [0], expected: [0] },
    ];

    const results = testCases.map(test => {
      try {
        // Mock ListNode
        const ListNode = function(this: any, val: any, next: any) {
          this.val = (val === undefined ? 0 : val);
          this.next = (next === undefined ? null : next);
        };

        // Create function from code
        const userFn = new Function('list1', 'list2', 'ListNode', code + '\nreturn mergeTwoLists(list1, list2);');
        
        const l1Node = createList(test.l1);
        const l2Node = createList(test.l2);
        
        const resultNode = userFn(l1Node, l2Node, ListNode);
        const actual = listToArray(resultNode);
        
        const passed = JSON.stringify(actual) === JSON.stringify(test.expected);

        return {
          passed,
          input: { l1: test.l1, l2: test.l2 },
          expected: test.expected,
          actual,
        };
      } catch (err: any) {
        return {
          passed: false,
          input: { l1: test.l1, l2: test.l2 },
          expected: test.expected,
          actual: null,
          error: err.message
        };
      }
    });

    setTestResults(results);
    setShowResults(true);
  };

  return (
    <div ref={containerRef} className="space-y-6">
      <div className="editor-section bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 shadow-lg border-2 border-purple-200">
        <h3 className="text-xl font-bold text-slate-800 mb-3">💻 Editor Kode</h3>
        <p className="text-slate-700">
          Implementasikan fungsi untuk menggabungkan dua linked list terurut menjadi satu list terurut baru.
        </p>
      </div>

      <div className="editor-section bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-96 p-4 font-mono text-sm bg-slate-900 text-green-400 rounded-lg border-2 border-slate-300 focus:outline-none focus:border-purple-500"
          spellCheck={false}
        />
        <button
          onClick={runTests}
          className="mt-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all flex items-center gap-2 shadow-md"
        >
          <Play size={20} />
          Jalankan Test
        </button>
      </div>

      {showResults && (
        <div className="editor-section space-y-4">
          {testResults.map((result, idx) => (
            <div key={idx} className={`p-4 rounded-lg border-2 ${result.passed ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
              <div className="flex items-center gap-2 mb-2">
                {result.passed ? <CheckCircle className="text-green-600" /> : <XCircle className="text-red-600" />}
                <span className="font-bold text-slate-700">Test Case {idx + 1}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-slate-500">Input:</div>
                  <div className="font-mono">l1 = {JSON.stringify(result.input.l1)}, l2 = {JSON.stringify(result.input.l2)}</div>
                </div>
                <div>
                  <div className="text-slate-500">Hasil:</div>
                  <div className="font-mono">{result.error ? result.error : JSON.stringify(result.actual)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
