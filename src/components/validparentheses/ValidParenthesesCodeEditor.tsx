import { useEffect, useRef, useState } from 'react';
import { Play, CheckCircle, Code2 } from 'lucide-react';
import gsap from 'gsap';

export default function ValidParenthesesCodeEditor() {
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

  const [code, setCode] = useState(`function isValid(s: string): boolean {
    const stack: string[] = []
    const pairs: Record<string, string> = { ')': '(', ']': '[', '}': '{' }
    for (const ch of s) {
        if (ch === '(' || ch === '[' || ch === '{') {
            stack.push(ch)
        } else {
            const top = stack.pop()
            if (!top || top !== pairs[ch]) return false
        }
    }
    return stack.length === 0
}

console.log(isValid('()[]{}')) // true
console.log(isValid('([)]')) // false
`);

  const [showResults, setShowResults] = useState(false);

  const testCases = [
    { input: '()[]{}', expected: true, note: 'Semua pasangan cocok' },
    { input: '([)]', expected: false, note: 'Urutan salah' },
    { input: '((({[]})))', expected: true, note: 'Nested dalam-dalam' },
    { input: ']', expected: false, note: 'Mulai dari tutup langsung invalid' },
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
                  <div>Input: "{tc.input}"</div>
                  <div>Expected: {String(tc.expected)}</div>
                </div>
                <div className="text-emerald-700 font-semibold italic text-sm mt-2">{tc.note}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
