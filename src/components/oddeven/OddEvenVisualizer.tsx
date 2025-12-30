import { useMemo, useRef, useState } from 'react';
import { Play, Sparkles } from 'lucide-react';
import gsap from 'gsap';

interface OddEvenVisualizerProps {
  list: number[];
}

export default function OddEvenVisualizer({ list }: OddEvenVisualizerProps) {
  const oddRefs = useRef<HTMLDivElement[]>([]);
  const evenRefs = useRef<HTMLDivElement[]>([]);
  const afterRowRef = useRef<HTMLDivElement | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const odd = useMemo(() => list.filter((_, i) => i % 2 === 0), [list]);
  const even = useMemo(() => list.filter((_, i) => i % 2 === 1), [list]);
  const reordered = useMemo(() => [...odd, ...even], [odd, even]);

  const handleAnimate = () => {
    if (isAnimating || list.length === 0) return;
    setIsAnimating(true);

    const tl = gsap.timeline({ onComplete: () => setIsAnimating(false) });

    tl.fromTo(
      oddRefs.current,
      { opacity: 0.3, y: 8, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.08, ease: 'back.out(1.5)' }
    );

    tl.fromTo(
      evenRefs.current,
      { opacity: 0.3, y: 8, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.08, ease: 'back.out(1.5)' },
      '>-0.1'
    );

    if (afterRowRef.current) {
      const children = Array.from(afterRowRef.current.children);
      tl.fromTo(
        children,
        { opacity: 0, y: 18, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.08, ease: 'elastic.out(1, 0.65)' },
        '>-0.05'
      );
    }
  };

  const renderRow = (
    values: number[],
    label: string,
    accent: string,
    refArray?: React.MutableRefObject<HTMLDivElement[]>
  ) => (
    <div className="space-y-2">
      <div className="text-sm font-semibold text-slate-600 uppercase tracking-wide">{label}</div>
      <div className="flex items-center gap-3 flex-wrap">
        {values.length === 0 ? (
          <div className="text-slate-400 italic">(kosong)</div>
        ) : (
          values.map((val, idx) => (
            <div
              key={`${label}-${idx}-${val}`}
              ref={(el) => {
                if (refArray) refArray.current[idx] = el as HTMLDivElement;
              }}
              className={`min-w-[64px] px-3 py-2 rounded-xl border-2 bg-white shadow-sm flex items-center justify-center font-semibold text-slate-800 ${accent}`}
            >
              {val}
              <span className="ml-2 text-[10px] text-slate-400">{idx}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200 space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-xl font-bold text-slate-800">Visualisasi Pengelompokan</h3>
            <p className="text-slate-600 text-sm">Index ganjil dulu, lalu genap. Klik Animate untuk melihat urutan baru muncul dengan bounce.</p>
          </div>
          <button
            onClick={handleAnimate}
            disabled={isAnimating || list.length === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold shadow-md transition-colors ${
              isAnimating || list.length === 0
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            <Play size={18} />
            {isAnimating ? 'Animating...' : 'Animate'}
          </button>
        </div>

        <div className="space-y-4">
          {renderRow(list, 'Before (index)', 'border-slate-200')}
          {renderRow(odd, 'Odd chain', 'border-emerald-200 bg-emerald-50', oddRefs)}
          {renderRow(even, 'Even chain', 'border-amber-200 bg-amber-50', evenRefs)}

          <div ref={afterRowRef}>{renderRow(reordered, 'After (odd → even)', 'border-indigo-200 bg-indigo-50')}</div>
        </div>

        <div className="flex items-center gap-2 text-sm text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-lg px-3 py-2">
          <Sparkles size={16} />
          GSAP: highlight chain ganjil/genap lalu bounce untuk hasil akhir.
        </div>
      </div>
    </div>
  );
}
