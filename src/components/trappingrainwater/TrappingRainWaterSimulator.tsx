import { useEffect, useState, useMemo } from 'react';
import { Play, Square, SkipForward, RotateCcw, Clock3, ChevronLeft, ChevronRight } from 'lucide-react';

interface SimulatorStep {
    left: number;
    right: number;
    leftMax: number;
    rightMax: number;
    totalWater: number;
    currentWaterIndex: number | null;
    currentWaterAmount: number;
    message: string;
}

interface Props {
    heights: number[];
}

export default function TrappingRainWaterSimulator({ heights }: Props) {
    const [idx, setIdx] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [speed, setSpeed] = useState(700);

    // Compute simulation steps using Two Pointer approach
    const steps = useMemo(() => {
        const s: SimulatorStep[] = [];
        let left = 0;
        let right = heights.length - 1;
        let leftMax = 0;
        let rightMax = 0;
        let totalWater = 0;

        // Initial state
        s.push({
            left, right, leftMax, rightMax, totalWater,
            currentWaterIndex: null, currentWaterAmount: 0,
            message: "Mulai Two Pointer. Siapin Left (kiri mentok) & Right (kanan mentok)."
        });

        while (left <= right) {
            if (heights[left] <= heights[right]) {
                if (heights[left] >= leftMax) {
                    leftMax = heights[left];
                    s.push({
                        left, right, leftMax, rightMax, totalWater,
                        currentWaterIndex: left, currentWaterAmount: 0,
                        message: `Update MaxLeft jadi ${leftMax}. Gak bisa nampung air disini (tembok baru).`
                    });
                } else {
                    const water = leftMax - heights[left];
                    totalWater += water;
                    s.push({
                        left, right, leftMax, rightMax, totalWater,
                        currentWaterIndex: left, currentWaterAmount: water,
                        message: `Left (${heights[left]}) < MaxLeft (${leftMax}). Air masuk: ${water} unit.`
                    });
                }
                left++;
            } else {
                if (heights[right] >= rightMax) {
                    rightMax = heights[right];
                    s.push({
                        left, right, leftMax, rightMax, totalWater,
                        currentWaterIndex: right, currentWaterAmount: 0,
                        message: `Update MaxRight jadi ${rightMax}. Gak bisa nampung air disini.`
                    });
                } else {
                    const water = rightMax - heights[right];
                    totalWater += water;
                    s.push({
                        left, right, leftMax, rightMax, totalWater,
                        currentWaterIndex: right, currentWaterAmount: water,
                        message: `Right (${heights[right]}) < MaxRight (${rightMax}). Air masuk: ${water} unit.`
                    });
                }
                right--;
            }
        }

        s.push({
            left: left - 1, right: right + 1, leftMax, rightMax, totalWater,
            currentWaterIndex: null, currentWaterAmount: 0,
            message: `Selesai! Total air yang kejebak: ${totalWater} unit.`
        });

        return s;
    }, [heights]);

    // Effect to reset when input changes
    useEffect(() => {
        setIdx(0);
        setPlaying(false);
    }, [heights]);

    // Playback
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (playing && idx < steps.length - 1) {
            timer = setTimeout(() => setIdx(i => i + 1), speed);
        } else if (idx >= steps.length - 1) {
            setPlaying(false);
        }
        return () => clearTimeout(timer);
    }, [playing, idx, steps.length, speed]);

    const currentStep = steps[idx];

    // Calculate final water layout for visualizer background
    const finalWater = useMemo(() => {
        const res = new Array(heights.length).fill(0);
        let l = 0, r = heights.length - 1;
        let lMax = 0, rMax = 0;
        while (l < r) {
            if (heights[l] < heights[r]) {
                heights[l] >= lMax ? (lMax = heights[l]) : (res[l] = lMax - heights[l]);
                l++;
            } else {
                heights[r] >= rMax ? (rMax = heights[r]) : (res[r] = rMax - heights[r]);
                r--;
            }
        }
        return res;
    }, [heights]);

    return (
        <div className="space-y-6">
            {/* Controls */}
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
                <div className="flex flex-wrap items-center gap-3">
                    <button onClick={() => setPlaying(true)} disabled={idx >= steps.length - 1} className="bg-indigo-600 disabled:opacity-50 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 shadow transition-all hover:scale-105 active:scale-95">
                        <Play size={18} /> Play
                    </button>
                    <button onClick={() => setPlaying(false)} className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 shadow transition-all hover:scale-105 active:scale-95">
                        <Square size={18} /> Stop
                    </button>
                    <button onClick={() => setIdx(p => Math.min(p + 1, steps.length - 1))} disabled={idx >= steps.length - 1} className="bg-slate-700 disabled:opacity-50 hover:bg-slate-800 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 shadow transition-all hover:scale-105 active:scale-95">
                        <SkipForward size={18} /> Next
                    </button>
                    <button onClick={() => setIdx(0)} className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 shadow transition-all hover:scale-105 active:scale-95">
                        <RotateCcw size={18} /> Reset
                    </button>
                    <div className="ml-auto flex items-center gap-2 text-sm text-slate-700">
                        <Clock3 size={16} />
                        <select value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="border-2 border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500">
                            <option value={1000}>Slow</option>
                            <option value={700}>1x</option>
                            <option value={300}>Fast</option>
                        </select>
                    </div>
                </div>

                <div className="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                    <div className="font-mono text-sm text-slate-500">
                        Step {idx + 1} / {steps.length}
                    </div>
                    <div className="font-medium text-slate-800">
                        {currentStep?.message}
                    </div>
                    <div className="font-bold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                        Total: {currentStep?.totalWater} 💧
                    </div>
                </div>
            </div>

            {/* Visualizer Area */}
            <div className="bg-gradient-to-b from-sky-900 to-slate-900 p-8 rounded-xl shadow-2xl overflow-hidden relative min-h-[400px] flex items-end justify-center gap-1">

                {/* Render Bars */}
                {heights.map((h, i) => {
                    const isLeft = i === currentStep.left && currentStep.left <= currentStep.right;
                    const isRight = i === currentStep.right && currentStep.left <= currentStep.right;

                    // Determine current water shown (progressive vs final)
                    // In simulation mode, we only show water up to current step
                    // Or we can show potential water vs actual.
                    // Let's show "processed" water.
                    // We can check if index `i` has been filled in `steps` up to `idx`.
                    // Simple hack: check finalWater array, but only render if that index has been visited? 
                    // Actually better: The step logic tells us when water is added. We can accumulate it externally or just recalculate.
                    // For simplicity, let's just show water if index < left or index > right (processed areas).

                    // ACTUALLY: Let's use `finalWater` but mask it?
                    // Or re-calculate display water based on currentStep pointers.

                    let displayWater = 0;
                    // Check if this index has water confirmed in current step
                    // Actually, TwoPointer fills from ends inward. 
                    // Indices < Left and Indices > Right are "done".
                    if (i < currentStep.left || i > currentStep.right) {
                        displayWater = finalWater[i];
                    }

                    // Highlight active pointers
                    const isActive = isLeft || isRight;

                    return (
                        <div key={i} className="flex flex-col justify-end items-center w-full max-w-[40px] relative group">
                            {/* Pointers Indicators */}
                            {isLeft && <div className="absolute -top-10 text-emerald-400 font-bold flex flex-col items-center animate-bounce"><span className="text-xs">L</span><ChevronRight className="rotate-90" /></div>}
                            {isRight && <div className="absolute -top-10 text-rose-400 font-bold flex flex-col items-center animate-bounce"><span className="text-xs">R</span><ChevronRight className="rotate-90" /></div>}

                            <div className="relative w-full flex flex-col justify-end" style={{ height: '300px' }}>
                                {/* Water Layer */}
                                {displayWater > 0 && (
                                    <div
                                        style={{ height: `${displayWater * 30}px`, bottom: `${h * 30}px` }}
                                        className="absolute w-full bg-blue-500/80 border-t border-blue-400 transition-all duration-300 pointer-events-none"
                                    >
                                        <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-30"></div>
                                    </div>
                                )}

                                {/* Building Block */}
                                <div
                                    style={{ height: `${h * 30}px` }}
                                    className={`w-full rounded-t-sm border-x border-t transition-all duration-300 ${isActive ? 'bg-slate-200 border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'bg-slate-700 border-slate-600'}`}
                                >
                                    <span className="text-[10px] text-slate-400 w-full text-center absolute bottom-1 left-0">{h}</span>
                                </div>
                            </div>
                        </div>
                    )
                })}

                {/* Max Height Indicators Line (Optional, maybe too complex for now, keep it simple) */}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-center">
                    <div className="text-sm text-emerald-800 font-bold uppercase mb-1">Max Left</div>
                    <div className="text-3xl font-bold text-emerald-600">{currentStep.leftMax}</div>
                </div>
                <div className="bg-rose-50 border border-rose-200 p-4 rounded-xl text-center">
                    <div className="text-sm text-rose-800 font-bold uppercase mb-1">Max Right</div>
                    <div className="text-3xl font-bold text-rose-600">{currentStep.rightMax}</div>
                </div>
            </div>

        </div>
    );
}
