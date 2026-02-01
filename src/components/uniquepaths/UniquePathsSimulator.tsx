import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { Play, Square, SkipForward, RotateCcw, Clock3 } from 'lucide-react';

interface Step {
    row: number;
    col: number;
    val: number;
    fromTop: number;
    fromLeft: number;
    isBaseCase: boolean;
}

interface Props {
    m: number;
    n: number;
}

export default function UniquePathsSimulator({ m, n }: Props) {
    const [grid, setGrid] = useState<number[][]>([]);
    const [steps, setSteps] = useState<Step[]>([]);
    const [idx, setIdx] = useState(0); // Current step index
    const [playing, setPlaying] = useState(false);
    const [speed, setSpeed] = useState(700);

    // Initialize
    useEffect(() => {
        const newGrid: number[][] = Array(m).fill(0).map(() => Array(n).fill(0));
        const newSteps: Step[] = [];

        for (let r = 0; r < m; r++) {
            for (let c = 0; c < n; c++) {
                if (r === 0 || c === 0) {
                    newGrid[r][c] = 1;
                    newSteps.push({ row: r, col: c, val: 1, fromTop: 0, fromLeft: 0, isBaseCase: true });
                } else {
                    const valTop = newGrid[r - 1][c];
                    const valLeft = newGrid[r][c - 1];
                    const currentVal = valTop + valLeft;
                    newGrid[r][c] = currentVal;
                    newSteps.push({ row: r, col: c, val: currentVal, fromTop: valTop, fromLeft: valLeft, isBaseCase: false });
                }
            }
        }

        setSteps(newSteps);
        setIdx(0);
        setGrid(Array(m).fill(0).map(() => Array(n).fill(0))); // Reset grid visualization
        setPlaying(false);
    }, [m, n]);

    // Playback Logic
    useEffect(() => {
        let timer: NodeJS.Timeout | undefined;
        if (playing && idx < steps.length) {
            timer = setTimeout(() => {
                setIdx(prev => prev + 1);
            }, speed);
        }
        if (idx >= steps.length) {
            setPlaying(false);
        }
        return () => clearTimeout(timer);
    }, [playing, idx, steps.length, speed]);

    const currentStep = idx < steps.length ? steps[idx] : steps[steps.length - 1];

    // Helper to check if cell is filled based on idx
    const getCellVal = (r: number, c: number) => {
        // Find if this cell has been processed in steps 0..idx-1
        const stepIndex = steps.findIndex(s => s.row === r && s.col === c);
        if (stepIndex !== -1 && stepIndex < idx) {
            // Find the specific value
            return steps[stepIndex].val;
        }
        return null;
    };

    const isCurrent = (r: number, c: number) => {
        if (idx === 0) return false;
        const prevStep = steps[idx - 1];
        return prevStep.row === r && prevStep.col === c;
    }

    return (
        <div className="space-y-4">
            {/* Controls */}
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
                <div className="flex flex-wrap items-center gap-3">
                    <button onClick={() => setPlaying(true)} disabled={idx >= steps.length} className="bg-indigo-600 disabled:opacity-50 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 shadow">
                        <Play size={18} /> Play
                    </button>
                    <button onClick={() => setPlaying(false)} className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 shadow">
                        <Square size={18} /> Pause
                    </button>
                    <button onClick={() => setIdx(p => Math.min(p + 1, steps.length))} disabled={idx >= steps.length} className="bg-slate-700 disabled:opacity-50 hover:bg-slate-800 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 shadow">
                        <SkipForward size={18} /> Next
                    </button>
                    <button onClick={() => setIdx(0)} className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 shadow">
                        <RotateCcw size={18} /> Reset
                    </button>
                    <div className="ml-auto flex items-center gap-2 text-sm text-slate-700">
                        <Clock3 size={16} />
                        <select value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="border-2 border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500">
                            <option value={1000}>Slow</option>
                            <option value={700}>Normal</option>
                            <option value={300}>Fast</option>
                        </select>
                    </div>
                </div>
                <div className="mt-4 flex justify-between items-end">
                    <div className="text-sm text-slate-600 font-medium">Progress: {idx} / {steps.length} Cells</div>
                    {currentStep && idx > 0 && (
                        <div className="text-right">
                            <div className="text-xs text-slate-400 uppercase font-bold">Current Action</div>
                            <div className="font-mono text-indigo-600 font-bold">
                                dp[{currentStep.row}][{currentStep.col}] = {currentStep.isBaseCase ? '1 (Base Case)' : `${currentStep.fromTop} (Top) + ${currentStep.fromLeft} (Left) = ${currentStep.val}`}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Grid */}
            <div className="bg-slate-900 p-6 rounded-xl shadow-xl overflow-auto flex justify-center">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${n}, minmax(50px, 1fr))`,
                    gap: '8px'
                }}>
                    {Array(m).fill(0).map((_, r) => (
                        Array(n).fill(0).map((_, c) => {
                            const val = getCellVal(r, c);
                            const active = isCurrent(r, c);
                            const isTarget = r === m - 1 && c === n - 1;

                            return (
                                <div
                                    key={`${r}-${c}`}
                                    className={`
                                h-14 w-14 rounded-lg flex items-center justify-center font-bold text-lg border-2 transition-all duration-300
                                ${active ? 'bg-indigo-500 text-white border-indigo-300 scale-110 shadow-[0_0_15px_rgba(99,102,241,0.5)] z-10' :
                                            val !== null ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-slate-800/30 border-slate-800 text-transparent'}
                                ${isTarget && 'border-emerald-500/50'}
                            `}
                                >
                                    {isTarget && val === null && <span className="text-xs text-emerald-500">END</span>}
                                    {val}
                                </div>
                            );
                        })
                    ))}
                </div>
            </div>
        </div>
    );
}
