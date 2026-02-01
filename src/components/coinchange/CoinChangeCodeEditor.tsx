import { useEffect, useRef, useState } from 'react';
import { Play, CheckCircle, Code2 } from 'lucide-react';
import gsap from 'gsap';

export default function CoinChangeCodeEditor() {
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

    const [code, setCode] = useState(`function coinChange(coins: number[], amount: number): number {
    const INF = amount + 1
    const dp = Array(amount + 1).fill(INF)
    dp[0] = 0
    for (const coin of coins) {
        for (let a = coin; a <= amount; a++) {
            dp[a] = Math.min(dp[a], dp[a - coin] + 1)
        }
    }
    return dp[amount] === INF ? -1 : dp[amount]
}

console.log(coinChange([1,2,5], 11)) // 3
console.log(coinChange([2], 3)) // -1
console.log(coinChange([1,3,4], 6)) // 2 (3+3)
`);

    const [showResults, setShowResults] = useState(false);

    const testCases = [
        { input: 'coins=[1,2,5], amount=11', expected: 3, note: 'Gunakan 5+5+1' },
        { input: 'coins=[2], amount=3', expected: -1, note: 'Tidak mungkin dengan koin genap saja' },
        { input: 'coins=[1], amount=0', expected: 0, note: 'Basis dp[0]=0' },
        { input: 'coins=[1,3,4], amount=6', expected: 2, note: '3+3 lebih baik daripada 4+1+1' },
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
