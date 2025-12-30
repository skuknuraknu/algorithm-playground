import { useMemo, useRef, useState } from 'react';
import { Play, Scissors, AlertTriangle } from 'lucide-react';
import gsap from 'gsap';

interface RemoveNthVisualizerProps {
  list: number[];
  n: number;
}

export default function RemoveNthVisualizer({ list, n }: RemoveNthVisualizerProps) {
  const nodeRefs = useRef<HTMLDivElement[]>([]);
  const afterRowRef = useRef<HTMLDivElement | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const targetIndex = useMemo(() => (n > 0 && n <= list.length ? list.length - n : -1), [list.length, n]);
  const afterList = useMemo(() => {
    if (targetIndex < 0) return [...list];
    return list.filter((_, idx) => idx !== targetIndex);
  }, [list, targetIndex]);

  const handleAnimate = () => {
    if (isAnimating || list.length === 0 || targetIndex === -1) return;
    setIsAnimating(true);

    const tl = gsap.timeline({ onComplete: () => setIsAnimating(false) });

    // Pulse traversal to reach target
    tl.fromTo(
      nodeRefs.current,
      { opacity: 0.3, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.4, stagger: 0.08, ease: 'power2.out' }
    );

    // Highlight target node
    tl.to(nodeRefs.current[targetIndex], {
      backgroundColor: '#fee2e2',
      borderColor: '#ef4444',
      color: '#b91c1c',
      scale: 1.08,
      y: -6,
      duration: 0.5,
      ease: 'elastic.out(1, 0.7)',
    });

    // Fade out removed node
    tl.to(nodeRefs.current[targetIndex], {
      opacity: 0,
      scale: 0.3,
      y: -12,
      duration: 0.35,
      ease: 'power2.in',
    });

    // Reveal after-row with bounce
    if (afterRowRef.current) {
      const children = Array.from(afterRowRef.current.children);
      tl.fromTo(
        children,
        { opacity: 0, y: 18, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.08, ease: 'elastic.out(1, 0.65)' },
        '>-0.1'
      );
    }
  };

  const renderRow = (values: number[], label: string, accent: string) => (
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
                if (label === 'Before') nodeRefs.current[idx] = el as HTMLDivElement;
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

  const invalidN = n <= 0 || n > list.length;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200 space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-xl font-bold text-slate-800">Visualisasi Penghapusan</h3>
            <p className="text-slate-600 text-sm">Head di kiri. Node yang dihapus adalah posisi ke-n dari belakang.</p>
          </div>
          <button
            onClick={handleAnimate}
            disabled={isAnimating || invalidN || list.length === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold shadow-md transition-colors ${
              isAnimating || invalidN || list.length === 0
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-rose-600 text-white hover:bg-rose-700'
            }`}
          >
            <Play size={18} />
            {isAnimating ? 'Animating...' : 'Animate'}
          </button>
        </div>

        {invalidN && (
          <div className="bg-amber-50 border-2 border-amber-200 text-amber-800 rounded-lg p-3 flex items-center gap-2 text-sm">
            <AlertTriangle size={16} />
            Pastikan 1 ≤ n ≤ panjang list. Saat ini n = {n || 'null'}, panjang = {list.length}.
          </div>
        )}

        {renderRow(list, 'Before', 'border-slate-200')}

        <div className="flex items-center gap-2 text-sm text-rose-700 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2">
          <Scissors size={16} />
          Target index (dari 0) = {targetIndex >= 0 ? targetIndex : 'invalid'} {targetIndex >= 0 && `(node ke-${n} dari belakang)`}
        </div>

        <div ref={afterRowRef}>
          {renderRow(afterList, 'After', 'border-emerald-200 bg-emerald-50')}
        </div>
      </div>
    </div>
  );
}
