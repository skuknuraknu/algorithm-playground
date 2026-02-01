import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface Props {
    m: number;
    n: number;
}

export default function UniquePathsVisualizer({ m, n }: Props) {
    // We can use the Simulator for the main interactive part. 
    // This visualizer can show the final state with a cool animation on mount.

    // Simple DP calc for final result
    const dp = Array(m).fill(0).map(() => Array(n).fill(0));
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (i === 0 || j === 0) dp[i][j] = 1;
            else dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
        }
    }

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;
        const cells = containerRef.current.querySelectorAll('.grid-cell');

        gsap.fromTo(cells,
            { scale: 0, opacity: 0, rotate: 10 },
            {
                scale: 1,
                opacity: 1,
                rotate: 0,
                stagger: {
                    amount: 1,
                    grid: [m, n],
                    from: "start"
                },
                ease: "elastic.out(1, 0.3)",
                duration: 0.8
            }
        );
    }, [m, n]);

    return (
        <div ref={containerRef} className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-xl border-2 border-indigo-100 flex justify-center overflow-auto">
            <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${n}, minmax(50px, 1fr))`,
                gap: '10px'
            }}>
                {dp.map((row, r) => (
                    row.map((val, c) => (
                        <div
                            key={`${r}-${c}`}
                            className={`
                                grid-cell h-14 w-14 rounded-xl flex flex-col items-center justify-center shadow-sm border-2
                                ${r === m - 1 && c === n - 1 ? 'bg-emerald-500 text-white border-emerald-600 shadow-emerald-200' : 'bg-white text-slate-700 border-slate-200'}
                            `}
                        >
                            <span className="text-[10px] text-slate-400 opacity-50 mb-[-2px]">{r},{c}</span>
                            <span className="font-bold text-lg">{val}</span>
                        </div>
                    ))
                ))}
            </div>
        </div>
    );
}
