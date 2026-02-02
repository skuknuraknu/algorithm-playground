import { useEffect, useMemo, useRef, useState } from 'react';
import { Play, RotateCcw, Droplets, Sparkles } from 'lucide-react';
import gsap from 'gsap';

interface Props {
    heights: number[];
}

export default function TrappingRainWaterVisualizer({ heights }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const buildingRefs = useRef<HTMLDivElement[]>([]);
    const waterRefs = useRef<HTMLDivElement[]>([]);
    const [isAnimating, setIsAnimating] = useState(false);
    const [showWater, setShowWater] = useState(false);

    // Reset refs
    buildingRefs.current = [];
    waterRefs.current = [];

    // Calculate water array
    const waterLevels = useMemo(() => {
        const n = heights.length;
        if (n === 0) return [];
        const res = new Array(n).fill(0);
        const left = new Array(n).fill(0);
        const right = new Array(n).fill(0);

        left[0] = heights[0];
        for (let i = 1; i < n; i++) left[i] = Math.max(left[i - 1], heights[i]);

        right[n - 1] = heights[n - 1];
        for (let i = n - 2; i >= 0; i--) right[i] = Math.max(right[i + 1], heights[i]);

        for (let i = 0; i < n; i++) {
            res[i] = Math.max(0, Math.min(left[i], right[i]) - heights[i]);
        }
        return res;
    }, [heights]);

    const totalWater = waterLevels.reduce((a, b) => a + b, 0);
    const maxHeight = Math.max(...heights, 1);

    // Entrance animation
    useEffect(() => {
        if (!containerRef.current) return;

        const ctx = gsap.context(() => {
            gsap.from(containerRef.current, {
                opacity: 0,
                y: 20,
                duration: 0.6,
                ease: 'power2.out'
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const handleAnimate = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setShowWater(false);

        const tl = gsap.timeline({
            onComplete: () => {
                setIsAnimating(false);
                setShowWater(true);
            }
        });

        // Step 1: Buildings rise from ground
        tl.fromTo(
            buildingRefs.current.filter(Boolean),
            { scaleY: 0, transformOrigin: 'bottom' },
            { scaleY: 1, duration: 0.8, stagger: 0.05, ease: 'back.out(1.7)' }
        );

        // Step 2: Clouds appear and rain falls (symbolic)
        tl.to({}, { duration: 0.5 }); // Pause

        // Step 3: Water fills up sequentially with wave effect
        tl.fromTo(
            waterRefs.current.filter(Boolean),
            {
                scaleY: 0,
                opacity: 0,
                transformOrigin: 'bottom'
            },
            {
                scaleY: 1,
                opacity: 1,
                duration: 0.5,
                stagger: 0.08,
                ease: 'elastic.out(1, 0.6)'
            }
        );

        // Step 4: Water shimmer effect
        waterRefs.current.filter(Boolean).forEach((water) => {
            if (!water) return;
            tl.to(water, {
                opacity: 0.7,
                yoyo: true,
                repeat: 2,
                duration: 0.3,
                ease: 'sine.inOut'
            }, '-=0.3');
        });

        // Step 5: Final celebration - buildings bounce
        tl.to(buildingRefs.current.filter(Boolean), {
            y: -5,
            yoyo: true,
            repeat: 1,
            duration: 0.2,
            stagger: 0.03
        });
    };

    const handleReset = () => {
        setShowWater(false);
        gsap.to([...buildingRefs.current, ...waterRefs.current], {
            opacity: 0,
            scale: 0.8,
            duration: 0.3,
            onComplete: () => {
                gsap.set([...buildingRefs.current, ...waterRefs.current], {
                    clearProps: 'all'
                });
            }
        });
    };

    return (
        <div ref={containerRef} className="space-y-6">
            {/* Header & Controls */}
            <div className="bg-white rounded-xl p-6 shadow-xl border-2 border-slate-200">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div>
                        <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                            <Sparkles className="text-blue-600" size={28} />
                            Water Filling Animation
                        </h3>
                        <p className="text-slate-600 text-sm mt-1">
                            Watch how water fills the valleys between buildings
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={handleAnimate}
                            disabled={isAnimating || heights.length === 0}
                            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold shadow-md transition-all ${isAnimating || heights.length === 0
                                    ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700 hover:shadow-lg active:scale-95'
                                }`}
                        >
                            <Play size={20} />
                            {isAnimating ? 'Animating...' : 'Fill Water'}
                        </button>
                        <button
                            onClick={handleReset}
                            disabled={isAnimating}
                            className="flex items-center gap-2 px-4 py-3 rounded-lg font-semibold bg-slate-600 text-white hover:bg-slate-700 shadow-md transition-all active:scale-95 disabled:opacity-50"
                        >
                            <RotateCcw size={20} />
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="mt-4 grid grid-cols-3 gap-4">
                    <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 text-center">
                        <div className="text-sm text-blue-700 font-semibold mb-1">Total Water</div>
                        <div className="text-3xl font-bold text-blue-600 flex items-center justify-center gap-2">
                            {totalWater}
                            <Droplets className="text-blue-500" size={24} />
                        </div>
                    </div>
                    <div className="bg-slate-50 border-2 border-slate-200 rounded-lg p-4 text-center">
                        <div className="text-sm text-slate-700 font-semibold mb-1">Buildings</div>
                        <div className="text-3xl font-bold text-slate-600">{heights.length}</div>
                    </div>
                    <div className="bg-emerald-50 border-2 border-emerald-200 rounded-lg p-4 text-center">
                        <div className="text-sm text-emerald-700 font-semibold mb-1">Max Height</div>
                        <div className="text-3xl font-bold text-emerald-600">{maxHeight}</div>
                    </div>
                </div>
            </div>

            {/* Visualization */}
            <div className="bg-gradient-to-b from-sky-900 via-slate-800 to-slate-900 rounded-xl p-8 shadow-2xl min-h-[400px] relative overflow-hidden">
                {/* Rain clouds decoration */}
                <div className="absolute top-4 left-4 text-white/20 text-4xl">☁️ ☁️ ☁️</div>
                <div className="absolute top-4 right-4 text-white/20 text-4xl">🌧️</div>

                <div className="flex items-end justify-center gap-1 h-[350px]">
                    {heights.length === 0 ? (
                        <div className="text-center text-white/50 py-12">
                            <div className="text-4xl mb-3">🏗️</div>
                            <div>Add buildings to start</div>
                        </div>
                    ) : (
                        heights.map((h, i) => {
                            const waterHeight = waterLevels[i];
                            const heightPercent = (h / maxHeight) * 100;
                            const waterPercent = (waterHeight / maxHeight) * 100;

                            return (
                                <div
                                    key={i}
                                    className="relative flex-1 max-w-[60px] h-full flex flex-col justify-end"
                                >
                                    {/* Water layer */}
                                    {waterHeight > 0 && (
                                        <div
                                            ref={el => waterRefs.current[i] = el as HTMLDivElement}
                                            className="absolute w-full bg-gradient-to-b from-blue-400 to-blue-500 border-t-2 border-blue-300 opacity-80"
                                            style={{
                                                height: `${waterPercent}%`,
                                                bottom: `${heightPercent}%`,
                                                display: showWater || isAnimating ? 'block' : 'none'
                                            }}
                                        >
                                            {/* Water wave effect */}
                                            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent)] animate-[shimmer_2s_infinite]" />
                                            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-white text-xs font-bold">
                                                {waterHeight}
                                            </div>
                                        </div>
                                    )}

                                    {/* Building */}
                                    <div
                                        ref={el => buildingRefs.current[i] = el as HTMLDivElement}
                                        className="w-full bg-gradient-to-t from-slate-700 to-slate-600 border-x-2 border-t-2 border-slate-500 rounded-t-md relative"
                                        style={{ height: `${heightPercent}%` }}
                                    >
                                        {/* Building windows */}
                                        <div className="absolute inset-0 p-1 grid grid-cols-2 gap-1">
                                            {Array.from({ length: Math.min(h * 2, 8) }).map((_, idx) => (
                                                <div key={idx} className="bg-yellow-200/20 rounded-sm" />
                                            ))}
                                        </div>
                                        {/* Height label */}
                                        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-white text-xs font-bold">
                                            {h}
                                        </div>
                                    </div>

                                    {/* Index label */}
                                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-slate-400 text-xs font-mono">
                                        {i}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>

            {/* Legend */}
            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-5 border-2 border-cyan-200">
                <div className="flex items-start gap-3">
                    <Droplets className="text-cyan-600 flex-shrink-0" size={24} />
                    <div className="text-sm text-cyan-800">
                        <strong>Animation Features:</strong>
                        <ul className="mt-2 space-y-1 list-disc list-inside">
                            <li>Buildings rise from ground with elastic bounce</li>
                            <li>Water fills sequentially with wave effect</li>
                            <li>Shimmer animation on water surface</li>
                            <li>Final celebration bounce</li>
                        </ul>
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
        </div>
    );
}
