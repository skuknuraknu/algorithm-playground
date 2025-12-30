import { useState, useEffect, useRef } from 'react';
import { Play, CheckCircle, XCircle } from 'lucide-react';
import gsap from 'gsap';

export default function LinkedListCycleCodeEditor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [code, setCode] = useState(`/**
 * Definisi untuk singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
    // Tulis solusi Anda di sini
    
};`);

  const [testResults, setTestResults] = useState<{
    passed: boolean;
    input: { list: number[], pos: number };
    expected: boolean;
    actual: boolean | null;
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

  // Helper to create linked list with cycle
  const createListWithCycle = (arr: number[], pos: number) => {
    if (!arr.length) return null;
    
    const nodes = arr.map(val => ({ val, next: null }));
    
    for (let i = 0; i < nodes.length - 1; i++) {
      (nodes[i] as any).next = nodes[i + 1];
    }
    
    if (pos !== -1 && pos < nodes.length) {
      (nodes[nodes.length - 1] as any).next = nodes[pos];
    }
    
    return nodes[0];
  };

  const runTests = () => {
    const testCases = [
      { list: [3, 2, 0, -4], pos: 1, expected: true },
      { list: [1, 2], pos: 0, expected: true },
      { list: [1], pos: -1, expected: false },
    ];

    const results = testCases.map(test => {
      try {
        // Mock ListNode
        const ListNode = function(this: any, val: any) {
          this.val = val;
          this.next = null;
        };

        // Create function from code
        const userFn = new Function('head', 'ListNode', code + '\nreturn hasCycle(head);');
        
        const head = createListWithCycle(test.list, test.pos);
        
        // Run with timeout protection (simple counter)
        // We can't easily inject timeout into user code without parsing
        // So we rely on the fact that O(N) solution shouldn't hang unless infinite loop logic is wrong
        // But for cycle detection, infinite loop IS the problem if not handled
        // The user function should return boolean quickly
        
        const actual = userFn(head, ListNode);
        
        const passed = actual === test.expected;

        return {
          passed,
          input: { list: test.list, pos: test.pos },
          expected: test.expected,
          actual,
        };
      } catch (err: any) {
        return {
          passed: false,
          input: { list: test.list, pos: test.pos },
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
      <div className="editor-section bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 shadow-lg border-2 border-orange-200">
        <h3 className="text-xl font-bold text-slate-800 mb-3">💻 Editor Kode</h3>
        <p className="text-slate-700">
          Implementasikan fungsi untuk mendeteksi apakah linked list memiliki cycle. Kembalikan <code>true</code> jika ada cycle, <code>false</code> jika tidak.
        </p>
      </div>

      <div className="editor-section bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-96 p-4 font-mono text-sm bg-slate-900 text-orange-400 rounded-lg border-2 border-slate-300 focus:outline-none focus:border-orange-500"
          spellCheck={false}
        />
        <button
          onClick={runTests}
          className="mt-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-orange-700 hover:to-amber-700 transition-all flex items-center gap-2 shadow-md"
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
                  <div className="font-mono">list = {JSON.stringify(result.input.list)}, pos = {result.input.pos}</div>
                </div>
                <div>
                  <div className="text-slate-500">Hasil:</div>
                  <div className="font-mono">
                    Expected: <span className="text-blue-600 font-bold">{String(result.expected)}</span>, 
                    Actual: <span className={result.passed ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                      {result.error ? result.error : String(result.actual)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
