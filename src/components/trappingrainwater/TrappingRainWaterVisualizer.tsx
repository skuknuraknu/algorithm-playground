import { useMemo } from 'react';

interface Props {
    heights: number[];
}

export default function TrappingRainWaterVisualizer({ heights }: Props) {
    const finalWater = useMemo(() => {
        const n = heights.length;
        if (n === 0) return [];
        const res = new Array(n).fill(0);
        let left = new Array(n).fill(0);
        let right = new Array(n).fill(0);

        left[0] = heights[0];
        for (let i = 1; i < n; i++) left[i] = Math.max(left[i - 1], heights[i]);

        right[n - 1] = heights[n - 1];
        for (let i = n - 2; i >= 0; i--) right[i] = Math.max(right[i + 1], heights[i]);

        for (let i = 0; i < n; i++) {
            res[i] = Math.max(0, Math.min(left[i], right[i]) - heights[i]);
        }
        return res;
    }, [heights]);

    const totalWater = finalWater.reduce((a, b) => a + b, 0);

    return (
        <div className="bg-slate-900 p-8 rounded-xl shadow-xl overflow-hidden min-h-[400px] flex flex-col justify-end">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Total Water: <span className="text-blue-400">{totalWater}</span> Units</h2>
                <p className="text-slate-400 text-sm">Visualisasi hasil akhir (Static)</p>
            </div>

            <div className="flex items-end justify-center w-full gap-1 h-[300px]">
                {heights.map((h, i) => (
                    <div key={i} className="relative w-full max-w-[40px] flex flex-col justify-end h-full">
                        {/* Water */}
                        {finalWater[i] > 0 && (
                            <div
                                style={{ height: `${finalWater[i] * 10}%`, bottom: `${h * 10}%` }}
                                className="absolute w-full bg-blue-500 animate-pulse border-t border-blue-300"
                            >
                            </div>
                        )}
                        {/* Building */}
                        <div
                            style={{ height: `${h * 10}%` }}
                            className="w-full bg-slate-600 border border-slate-500 rounded-t-sm"
                        ></div>
                        <div className="absolute -bottom-6 w-full text-center text-xs text-slate-500 font-mono">{i}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
