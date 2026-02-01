import { useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import { TreeDeciduous, Layers } from 'lucide-react';
import { buildTree, levelOrderWithSteps } from './types';

interface Props {
  nodes: (number | null)[];
}

export default function BinaryTreeLevelOrderVisualizer({ nodes }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const tree = useMemo(() => buildTree(nodes), [nodes]);
  const { levels } = useMemo(() => levelOrderWithSteps(tree), [tree]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous animations if needed or just let React handle DOM diffing
    // But here we want to animate specifically when levels change
    const ctx = gsap.context(() => {
      // Animate the level cards container
      gsap.from(".level-card", {
        y: 40,
        opacity: 0,
        scale: 0.9,
        duration: 0.6,
        stagger: 0.15,
        ease: "back.out(1.7)",
        clearProps: "all"
      });

      // Animate the numbers inside
      gsap.from(".node-val", {
        scale: 0,
        opacity: 0,
        delay: 0.3,
        duration: 0.4,
        stagger: 0.05,
        ease: "elastic.out(1, 0.5)"
      });
    }, containerRef);

    return () => ctx.revert();
  }, [levels]);

  if (!tree) {
    return (
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-10 shadow-xl border-2 border-slate-200 text-center text-slate-500">
        <TreeDeciduous className="mx-auto mb-4 opacity-40 text-slate-400" size={64} />
        <p className="text-xl font-medium text-slate-600">Tree-nya masih kosong nih!</p>
        <p className="text-sm mt-2">Masukin angka dulu biar pohonnya tumbuh 🌱</p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="space-y-6">
      <div className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl p-6 shadow-lg flex items-center justify-between relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <Layers className="w-6 h-6" />
            Output Level Order
          </h3>
          <p className="text-violet-200 mt-1">Hasil scan dari atas ke bawah, kiri ke kanan.</p>
        </div>
        <div className="px-5 py-3 bg-white/20 backdrop-blur-sm rounded-xl text-lg font-bold border border-white/30 shadow-sm relative z-10">
          Total Level: {levels.length}
        </div>

        {/* Decor */}
        <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute right-20 -top-10 w-24 h-24 bg-indigo-400/20 rounded-full blur-xl"></div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-4">
        {levels.map((level, idx) => (
          <div key={idx} className="level-card rounded-2xl border-2 border-indigo-100 bg-white shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-shrink-0 w-full md:w-32 flex justify-between md:block items-center border-b md:border-b-0 md:border-r border-indigo-50 pb-3 md:pb-0 md:pr-4">
              <span className="text-sm font-bold uppercase tracking-wider text-indigo-400 block mb-1">Level {idx + 1}</span>
              <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-100">
                {level.length} Node
              </span>
            </div>

            <div className="flex flex-wrap gap-3 flex-grow">
              {level.map((v, i) => (
                <div key={i} className="node-val relative group">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-white to-slate-50 border-2 border-slate-200 text-slate-700 font-bold shadow-sm group-hover:-translate-y-1 group-hover:border-indigo-300 group-hover:text-indigo-600 transition-all duration-300">
                    {v}
                  </div>
                  {/* Connector line preview (visual only) */}
                  {i < level.length - 1 && (
                    <div className="absolute top-1/2 -right-3 w-3 h-0.5 bg-slate-200 hidden"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
