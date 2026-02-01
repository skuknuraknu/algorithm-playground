import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { Play, Square, SkipForward, RotateCcw, Clock3, GitMerge } from 'lucide-react';
import { buildTree, zigzagLevelOrderWithSteps } from './types';

interface Props {
    nodes: (number | null)[];
}

export default function BinaryTreeZigzagSimulator({ nodes }: Props) {
    const tree = useMemo(() => buildTree(nodes), [nodes]);
    const { steps, levels } = useMemo(() => zigzagLevelOrderWithSteps(tree), [tree]);
    const [idx, setIdx] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [speed, setSpeed] = useState(700);
    const infoRef = useRef<HTMLDivElement>(null);
    const queueRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIdx(0);
        setPlaying(false);
    }, [nodes]);

    useEffect(() => {
        let timer: NodeJS.Timeout | undefined;
        if (playing && idx < steps.length - 1) {
            timer = setTimeout(() => setIdx((p) => p + 1), speed);
        }
        if (idx === steps.length - 1) setPlaying(false);
        return () => timer && clearTimeout(timer);
    }, [playing, idx, steps.length, speed]);

    // Animation for step updates
    useEffect(() => {
        if (queueRef.current) {
            gsap.fromTo(queueRef.current, { scale: 0.98 }, { scale: 1, duration: 0.2, ease: "power1.out" });
        }
    }, [idx]);

    const current = steps[idx];

    const handlePlay = () => {
        if (steps.length === 0) return;
        setPlaying(true);
        if (idx === steps.length - 1) setIdx(0);
    };

    const handleStop = () => {
        setPlaying(false);
    };

    const handleNext = () => {
        setPlaying(false);
        setIdx((p) => Math.min(p + 1, steps.length - 1));
    };

    return (
        <div className="space-y-4">
            {/* Controls */}
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
                <div className="flex flex-wrap items-center gap-3">
                    <button
                        onClick={handlePlay}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 shadow transition-all hover:scale-105 active:scale-95"
                    >
                        <Play size={18} /> Play
                    </button>
                    <button
                        onClick={handleStop}
                        className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 shadow transition-all hover:scale-105 active:scale-95"
                    >
                        <Square size={18} /> Stop
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={idx >= steps.length - 1}
                        className="bg-slate-700 disabled:bg-slate-300 disabled:cursor-not-allowed hover:bg-slate-800 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 shadow transition-all hover:scale-105 active:scale-95"
                    >
                        <SkipForward size={18} /> Next
                    </button>
                    <button
                        onClick={() => setIdx(0)}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 shadow transition-all hover:scale-105 active:scale-95"
                    >
                        <RotateCcw size={18} /> Reset
                    </button>

                    <div className="ml-auto flex items-center gap-2 text-sm text-slate-700">
                        <Clock3 size={16} />
                        <select
                            value={speed}
                            onChange={(e) => setSpeed(Number(e.target.value))}
                            className="border-2 border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
                        >
                            <option value={1400}>0.5x</option>
                            <option value={700}>1x</option>
                            <option value={400}>2x</option>
                            <option value={200}>4x</option>
                        </select>
                    </div>
                </div>
                <div className="mt-3 text-sm text-slate-600 font-medium">Step {steps.length ? idx + 1 : 0} / {steps.length}</div>
            </div>

            {!tree && (
                <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-6 text-amber-800 flex items-center justify-center gap-2">
                    <GitMerge className="text-amber-500" />
                    <span>Masukkan tree dulu untuk menjalankan simulasi.</span>
                </div>
            )}

            {tree && current && (
                <div className="grid lg:grid-cols-2 gap-4">
                    {/* Queue Visualization */}
                    <div className="bg-slate-900 text-white rounded-xl p-5 shadow-xl border-2 border-slate-800" ref={queueRef}>
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <div className="text-xs text-slate-400 uppercase tracking-wider font-bold">Current State</div>
                                <div className="text-xl font-bold flex items-center gap-2">
                                    {current.current !== null ? (
                                        <>Processing Node <span className="text-yellow-400">{current.current}</span></>
                                    ) : (
                                        <span className="text-slate-300">System Update...</span>
                                    )}
                                </div>
                            </div>
                            <div className="px-3 py-1 rounded-lg bg-indigo-500/20 border border-indigo-400 text-indigo-100 text-xs font-bold uppercase">
                                Queue Size: {current.queue.length}
                            </div>
                        </div>

                        <div className="text-xs text-slate-400 mb-2 uppercase font-bold tracking-wider">Queue (FIFO)</div>
                        <div className="flex flex-wrap gap-2 mb-6 min-h-[50px] p-2 bg-slate-800/50 rounded-lg border border-slate-700/50">
                            {current.queue.map((v, i) => (
                                <div key={i} className="queue-card px-3 py-2 rounded bg-slate-800 border-2 border-slate-600 font-mono text-sm font-bold shadow-sm">
                                    {v}
                                </div>
                            ))}
                            {current.queue.length === 0 && <div className="text-slate-600 italic text-sm self-center">Queue Kosong</div>}
                        </div>

                        <div className="text-xs text-slate-400 mb-2 uppercase font-bold tracking-wider">Levels Output</div>
                        <div className="font-mono text-sm bg-black/30 p-3 rounded-lg border border-white/10 text-emerald-300">
                            {current.levels.length === 0 ? "[]" :
                                `[${current.levels.map(l => `[${l.join(',')}]`).join(', ')}]`
                            }
                        </div>
                    </div>

                    {/* Explanation Panel */}
                    <div className="bg-white rounded-xl p-5 shadow-lg border-2 border-slate-200 flex flex-col" ref={infoRef}>
                        <div className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-2">Step Description</div>

                        <div className="flex-grow flex items-center justify-center p-4 bg-indigo-50/50 rounded-xl border border-indigo-100 mb-4">
                            <p className="text-lg text-slate-800 font-medium text-center leading-relaxed">
                                {current.action}
                            </p>
                        </div>

                        <div className="text-xs text-slate-400 mt-auto">
                            <span className="font-bold">Tip:</span> Perhatikan urutan masuk ke array `currentLevel` (Push vs Unshift) tergantung arah Zigzag.
                        </div>
                    </div>
                </div>
            )}

            {idx === steps.length - 1 && steps.length > 0 && (
                <div className="p-4 bg-emerald-50 border-2 border-emerald-200 rounded-xl text-center">
                    <h4 className="text-emerald-800 font-bold text-lg mb-1">🎉 Simulasi Selesai! 🎉</h4>
                    <p className="text-emerald-600 text-sm">Semua node sudah dikunjungi secara zigzag.</p>
                </div>
            )}
        </div>
    );
}
