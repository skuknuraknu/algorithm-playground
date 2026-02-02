import { useEffect, useMemo, useRef, useState } from 'react';
import { Play, Sparkles, RotateCcw } from 'lucide-react';
import gsap from 'gsap';

interface ReverseLinkedListVisualizerProps {
  list: number[];
}

export default function ReverseLinkedListVisualizer({ list }: ReverseLinkedListVisualizerProps) {
  const nodeRefs = useRef<HTMLDivElement[]>([]);
  const reversedRefs = useRef<HTMLDivElement[]>([]);
  const arrowRefs = useRef<HTMLDivElement[]>([]);
  const reversedArrowRefs = useRef<HTMLDivElement[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Reset refs on each render to prevent stale references
  nodeRefs.current = [];
  reversedRefs.current = [];
  arrowRefs.current = [];
  reversedArrowRefs.current = [];

  const reversed = useMemo(() => [...list].reverse(), [list]);

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
    if (isAnimating || list.length === 0) return;
    setIsAnimating(true);

    const tl = gsap.timeline({ onComplete: () => setIsAnimating(false) });

    // Step 1: Fade in original nodes
    tl.fromTo(
      nodeRefs.current.filter(Boolean),
      { opacity: 0, y: 20, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.7)' }
    );

    // Step 2: Highlight arrows
    tl.to(
      arrowRefs.current.filter(Boolean),
      {
        scale: 1.2,
        color: '#3b82f6',
        duration: 0.3,
        stagger: 0.1,
        yoyo: true,
        repeat: 1
      }
    );

    // Step 3: Shake nodes (indicating reversal process)
    tl.to(
      nodeRefs.current.filter(Boolean),
      {
        rotation: 5,
        yoyo: true,
        repeat: 3,
        duration: 0.1,
        stagger: 0.05
      }
    );

    // Step 4: Reveal reversed nodes with bounce
    tl.fromTo(
      reversedRefs.current.filter(Boolean),
      { opacity: 0, y: -30, scale: 0.5, rotation: -180 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotation: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'elastic.out(1, 0.6)'
      },
      '-=0.3'
    );

    // Step 5: Pulse reversed arrows
    tl.fromTo(
      reversedArrowRefs.current.filter(Boolean),
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        stagger: 0.08,
        ease: 'back.out(1.7)'
      }
    );

    // Step 6: Final celebration
    tl.to(reversedRefs.current.filter(Boolean), {
      y: -5,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      stagger: 0.05
    });
  };

  const handleReset = () => {
    gsap.to([...nodeRefs.current, ...reversedRefs.current, ...arrowRefs.current, ...reversedArrowRefs.current], {
      opacity: 0,
      scale: 0.8,
      duration: 0.3,
      onComplete: () => {
        gsap.set([...nodeRefs.current, ...reversedRefs.current, ...arrowRefs.current, ...reversedArrowRefs.current], {
          clearProps: 'all'
        });
      }
    });
  };

  const renderRow = (
    values: number[],
    label: string,
    accent: string,
    isReversed: boolean = false
  ) => (
    <div className="space-y-3">
      <div className={`text-sm font-bold uppercase tracking-wide flex items-center gap-2 ${isReversed ? 'text-purple-700' : 'text-blue-700'}`}>
        {isReversed && '🔄'} {label}
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        {values.length === 0 ? (
          <div className="text-slate-400 italic py-8 text-center w-full">No nodes</div>
        ) : (
          values.map((val, idx) => (
            <div key={`${label}-${idx}-${val}`} className="flex items-center gap-2">
              <div
                ref={(el) => {
                  if (isReversed) {
                    reversedRefs.current[idx] = el as HTMLDivElement;
                  } else {
                    nodeRefs.current[idx] = el as HTMLDivElement;
                  }
                }}
                className={`relative w-16 h-16 rounded-xl border-3 shadow-lg flex items-center justify-center font-bold text-xl transition-all duration-300 ${accent}`}
              >
                {val}
                <div className="absolute -bottom-6 text-xs text-slate-400">
                  [{idx}]
                </div>
              </div>
              {idx < values.length - 1 && (
                <div
                  ref={(el) => {
                    if (isReversed) {
                      reversedArrowRefs.current[idx] = el as HTMLDivElement;
                    } else {
                      arrowRefs.current[idx] = el as HTMLDivElement;
                    }
                  }}
                  className={`text-3xl font-bold ${isReversed ? 'text-purple-500' : 'text-blue-500'}`}
                >
                  →
                </div>
              )}
            </div>
          ))
        )}
        {values.length > 0 && (
          <div className="text-slate-400 font-mono text-sm ml-2">null</div>
        )}
      </div>
    </div>
  );

  return (
    <div ref={containerRef} className="space-y-6">
      <div className="bg-white rounded-xl p-8 shadow-xl border-2 border-slate-200 space-y-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              <Sparkles className="text-indigo-600" size={28} />
              Interactive Reversal Visualization
            </h3>
            <p className="text-slate-600 text-sm mt-1">
              Watch the linked list transform from original to reversed with smooth GSAP animations
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleAnimate}
              disabled={isAnimating || list.length === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold shadow-md transition-all ${isAnimating || list.length === 0
                ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 hover:shadow-lg active:scale-95'
                }`}
            >
              <Play size={20} />
              {isAnimating ? 'Animating...' : 'Play Animation'}
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

        {/* Original List */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200">
          {renderRow(list, 'Original List', 'bg-blue-500 text-white border-blue-600')}
        </div>

        {/* Divider with icon */}
        <div className="flex items-center justify-center">
          <div className="bg-slate-200 h-px flex-1" />
          <div className="mx-4 text-3xl">🔄</div>
          <div className="bg-slate-200 h-px flex-1" />
        </div>

        {/* Reversed List */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
          {renderRow(reversed, 'Reversed List', 'bg-purple-500 text-white border-purple-600', true)}
        </div>

        {/* Info Card */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-5 border-2 border-emerald-200">
          <div className="flex items-start gap-3">
            <Sparkles className="text-emerald-600 flex-shrink-0" size={24} />
            <div className="text-sm text-emerald-800">
              <strong>Animation Features:</strong>
              <ul className="mt-2 space-y-1 list-disc list-inside">
                <li>Nodes fade in with stagger effect</li>
                <li>Arrows pulse to show connections</li>
                <li>Shake animation indicates reversal process</li>
                <li>Reversed nodes appear with elastic bounce</li>
                <li>Final celebration pulse</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
