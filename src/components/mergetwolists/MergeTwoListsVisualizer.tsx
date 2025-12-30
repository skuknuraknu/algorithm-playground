import React, { useEffect, useRef } from 'react';
import { ArrowRight, GitMerge } from 'lucide-react';
import gsap from 'gsap';

interface MergeTwoListsVisualizerProps {
  list1: number[];
  list2: number[];
}

export default function MergeTwoListsVisualizer({ list1, list2 }: MergeTwoListsVisualizerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate merged list for visualization
  const mergedList = [...list1, ...list2].sort((a, b) => a - b);

  useEffect(() => {
    if (containerRef.current) {
      const ctx = gsap.context(() => {
        gsap.from('.viz-node', {
          scale: 0,
          opacity: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: 'back.out(1.7)'
        });
        
        gsap.from('.viz-arrow', {
          opacity: 0,
          x: -10,
          duration: 0.3,
          stagger: 0.05,
          delay: 0.3
        });
      }, containerRef);
      return () => ctx.revert();
    }
  }, [list1, list2]);

  const renderList = (list: number[], colorClass: string, label: string) => (
    <div className="flex items-center gap-4 mb-8 overflow-x-auto pb-4">
      <div className="font-bold text-slate-600 w-20 shrink-0">{label}</div>
      <div className="flex items-center gap-2">
        {list.map((val, idx) => (
          <React.Fragment key={idx}>
            <div className={`viz-node w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold text-lg shadow-md ${colorClass}`}>
              {val}
            </div>
            {idx < list.length - 1 && (
              <ArrowRight className="viz-arrow text-slate-400" size={20} />
            )}
          </React.Fragment>
        ))}
        <div className="viz-node w-12 h-12 rounded-full border-2 border-slate-300 bg-slate-100 flex items-center justify-center text-xs text-slate-500 font-mono">
          NULL
        </div>
      </div>
    </div>
  );

  return (
    <div ref={containerRef} className="space-y-8">
      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <GitMerge className="text-blue-600" />
          Visualisasi Struktur Data
        </h3>

        {renderList(list1, 'bg-blue-100 border-blue-500 text-blue-700', 'List 1')}
        {renderList(list2, 'bg-purple-100 border-purple-500 text-purple-700', 'List 2')}
        
        <div className="border-t-2 border-slate-200 my-6 pt-6">
          <h4 className="font-bold text-green-700 mb-4">Hasil Gabungan (Sorted):</h4>
          {renderList(mergedList, 'bg-green-100 border-green-500 text-green-700', 'Merged')}
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-blue-200">
        <h4 className="font-bold text-slate-800 mb-2">Statistik:</h4>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <div className="text-xs text-slate-500">Panjang List 1</div>
            <div className="text-xl font-bold text-blue-600">{list1.length}</div>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <div className="text-xs text-slate-500">Panjang List 2</div>
            <div className="text-xl font-bold text-purple-600">{list2.length}</div>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <div className="text-xs text-slate-500">Total Node</div>
            <div className="text-xl font-bold text-green-600">{list1.length + list2.length}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
