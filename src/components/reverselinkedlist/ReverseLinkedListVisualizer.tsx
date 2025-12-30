import { useMemo, useRef, useState } from 'react';
import { Play, Sparkles } from 'lucide-react';
import gsap from 'gsap';

interface ReverseLinkedListVisualizerProps {
  list: number[];
}

export default function ReverseLinkedListVisualizer({ list }: ReverseLinkedListVisualizerProps) {
  const nodeRefs = useRef<HTMLDivElement[]>([]);
  const reversedRowRef = useRef<HTMLDivElement | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const reversed = useMemo(() => [...list].reverse(), [list]);

  const handleAnimate = () => {
    if (isAnimating || list.length === 0) return;
    setIsAnimating(true);

    const tl = gsap.timeline({ onComplete: () => setIsAnimating(false) });

    // Highlight original nodes one by one
    tl.fromTo(
      nodeRefs.current,
      { opacity: 0, y: 12, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.7)' }
    );

    tl.to(nodeRefs.current, {
      backgroundColor: '#e0e7ff',
      borderColor: '#818cf8',
      duration: 0.4,
      stagger: 0.08,
      ease: 'power1.out',
    });

    // Reveal reversed row with a playful bounce
    if (reversedRowRef.current) {
      const children = Array.from(reversedRowRef.current.children);
      tl.fromTo(
        children,
        { opacity: 0, y: 24, scale: 0.85 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.08, ease: 'elastic.out(1, 0.65)' },
        '>-0.2'
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
                if (label === 'Original') nodeRefs.current[idx] = el as HTMLDivElement;
              }}
              className={`min-w-[56px] px-3 py-2 rounded-xl border-2 bg-white shadow-sm flex items-center justify-center font-semibold text-slate-800 ${accent}`}
            >
              {val}
              <span className="ml-2 text-xs text-slate-400">{idx}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6" >
      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200 space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-xl font-bold text-slate-800">Visualisasi Hasil Akhir</h3>
            <p className="text-slate-600 text-sm">Lihat bagaimana node berpindah dari kiri ke kanan lalu muncul kembali dalam urutan terbalik.</p>
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

        {renderRow(list, 'Original', 'border-slate-200')}

        <div ref={reversedRowRef}>
          {renderRow(reversed, 'Reversed', 'border-indigo-200 bg-indigo-50')}
        </div>

        <div className="flex items-center gap-2 text-sm text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-lg px-3 py-2">
          <Sparkles size={16} />
          Animasi memakai GSAP untuk memberi efek bounce saat hasil terbalik muncul.
        </div>
      </div>
    </div>
  );
}
