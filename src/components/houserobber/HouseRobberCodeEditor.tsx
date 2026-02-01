import { useEffect, useRef, useState } from 'react';
import { Play, CheckCircle, Code2 } from 'lucide-react';
import gsap from 'gsap';

export default function HouseRobberCodeEditor() {
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

  const [code, setCode] = useState(`function rob(nums: number[]): number {
  let prev1 = 0 // dp[i-1]
  let prev2 = 0 // dp[i-2]
  for (const n of nums) {
    const pick = n + prev2
    const skip = prev1
    const best = Math.max(pick, skip)
    prev2 = prev1
    prev1 = best
  }
  return prev1
}

console.log(rob([1,2,3,1])) // 4
console.log(rob([2,7,9,3,1])) // 12
`);

  const [showResults, setShowResults] = useState(false);

  const testCases = [
    { input: '[1,2,3,1]', expected: 4, note: 'Pilih rumah 1 dan 3' },
    { input: '[2,7,9,3,1]', expected: 12, note: 'Pilih 2,9,1' },
    { input: '[2,1,1,2]', expected: 4, note: 'Pilih dua yang bernilai 2' },
    { input: '[]', expected: 0, note: 'Kosong' },
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
          className="w-full h-72 p-4 font-mono text-sm bg-slate-900 text-emerald-200 rounded-lg border-2 border-slate-300 focus:outline-none focus:border-indigo-500"
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
                <div className="text-emerald-700 font-semibold italic text-sm mt-2">{tc.note}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
