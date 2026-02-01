import { useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import { TreeDeciduous, Zap } from 'lucide-react';
import { buildTree, zigzagLevelOrderWithSteps } from './types';

interface Props {
    nodes: (number | null)[];
}

export default function BinaryTreeZigzagVisualizer({ nodes }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const tree = useMemo(() => buildTree(nodes), [nodes]);
    const { levels } = useMemo(() => zigzagLevelOrderWithSteps(tree), [tree]);

    useEffect(() => {
        if (!containerRef.current) return;

        const ctx = gsap.context(() => {
            // Animate level rows
            const rows = gsap.utils.toArray<HTMLElement>('.zigzag-row');
            rows.forEach((row, i) => {
                // Even index (0, 2...) -> from Left
                // Odd index (1, 3...) -> from Right
                const fromX = i % 2 === 0 ? -100 : 100;

                gsap.fromTo(row,
                    { x: fromX, opacity: 0 },
                    {
                        x: 0,
                        opacity: 1,
                        duration: 0.8,
                        delay: i * 0.2, // Stagger rows
                        ease: "back.out(1.2)"
                    }
                );
            });

            // Animate items inside rows (staggered)
            const items = gsap.utils.toArray<HTMLElement>('.zigzag-item');
            gsap.fromTo(items,
                { scale: 0, rotate: -45 },
                {
                    scale: 1,
                    rotate: 0,
                    duration: 0.5,
                    delay: 0.5,
                    stagger: 0.05,
                    ease: "elastic.out(1, 0.5)"
                }
            );

        }, containerRef);

        return () => ctx.revert();
    }, [levels]);

    if (!tree) {
        return (
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-10 shadow-xl border-2 border-pink-200 text-center text-slate-500">
                <TreeDeciduous className="mx-auto mb-4 opacity-40 text-pink-300" size={64} />
                <p className="text-xl font-medium text-pink-800">Tree Kosong Melompong!</p>
                <p className="text-sm mt-2 text-pink-600">Masukin angka dulu biar bisa zigzag 🐍</p>
            </div>
        );
    }

    return (
        <div ref={containerRef} className="space-y-6">
            <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl p-6 shadow-lg flex items-center justify-between relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="text-2xl font-bold flex items-center gap-2">
                        <Zap className="w-6 h-6 text-yellow-300" />
                        Zigzag Output
                    </h3>
                    <p className="text-pink-100 mt-1">Kiri-Kanan, Kanan-Kiri, Kiri-Kanan...</p>
                </div>
                <div className="px-5 py-3 bg-white/20 backdrop-blur-sm rounded-xl text-lg font-bold border border-white/30 shadow-sm relative z-10">
                    depth: {levels.length}
                </div>
            </div>

            <div className="space-y-4">
                {levels.map((level, rowIdx) => {
                    const isLeftToRight = rowIdx % 2 === 0;
                    return (
                        <div key={rowIdx} className="zigzag-row flex items-center gap-4">
                            {/* Level Indicator */}
                            <div className={`w-24 text-right pr-4 font-bold text-sm ${isLeftToRight ? 'text-blue-500' : 'text-orange-500'}`}>
                                {isLeftToRight ? 'L → R' : 'R ← L'} (L{rowIdx + 1})
                            </div>

                            {/* Nodes Container */}
                            <div className={`flex-1 p-4 rounded-xl border-2 shadow-sm flex gap-3 flex-wrap ${isLeftToRight
                                    ? 'bg-blue-50 border-blue-100 justify-start'
                                    : 'bg-orange-50 border-orange-100 justify-end'
                                }`}>
                                {level.map((val, colIdx) => (
                                    <div key={`${rowIdx}-${colIdx}`} className="zigzag-item w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-sm border border-slate-200 font-bold text-slate-700">
                                        {val}
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
