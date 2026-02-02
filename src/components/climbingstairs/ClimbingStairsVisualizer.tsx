import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ChevronsUp, Footprints, RotateCcw } from 'lucide-react';
import { climbWithSteps } from './types';

interface Props {
  n: number;
}

export default function ClimbingStairsVisualizer({ n }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Memoize calculation
  const { steps } = useMemo(() => climbWithSteps(n), [n]);

  // Re-run animation when n changes
  useEffect(() => {
    if (!containerRef.current || n <= 0) return;

    // Kill existing timeline to avoid conflicts
    if (timelineRef.current) timelineRef.current.kill();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => setIsPlaying(false),
        onStart: () => setIsPlaying(true)
      });
      timelineRef.current = tl;

      // Reset visuals
      gsap.set('.stair-value', { opacity: 0, scale: 0, y: 10 });
      gsap.set('.stair-step', { opacity: 0, x: -20 });
      gsap.set('.energy-particle', { opacity: 0, scale: 0 });

      // 1. Reveal Stairs
      tl.to('.stair-step', {
        opacity: 1,
        x: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: 'back.out(1.7)'
      });

      // 2. Base Cases (Step 1 & 2)
      tl.to('#val-1', { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'elastic.out(1, 0.5)' }, "-=0.2");
      if (n >= 2) {
        tl.to('#val-2', { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'elastic.out(1, 0.5)' }, "-=0.2");
      }

      // 3. Loop for higher steps
      steps.forEach((s) => {
        if (s.step < 3) return;

        const currentId = `#step-${s.step}`;
        const prev1Id = `#step-${s.step - 1}`;
        const prev2Id = `#step-${s.step - 2}`;

        // Highlight source steps
        tl.to([prev1Id, prev2Id], {
          backgroundColor: '#e0e7ff', // indigo-100
          borderColor: '#6366f1', // indigo-500
          duration: 0.2
        });

        // Current Step "Computing" state
        tl.to(currentId, { borderColor: '#f59e0b', duration: 0.1 }, "<"); // amber border

        // Animate particles/energy (Visual representation of addition)
        // We'll simulate movement by just showing the value popping up significantly
        tl.to(`#val-${s.step}`, {
          opacity: 1,
          scale: 1.2,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.3)'
        });

        tl.to(`#val-${s.step}`, { scale: 1, duration: 0.2 });

        // Restore source steps
        tl.to([prev1Id, prev2Id], {
          backgroundColor: '#ffffff',
          borderColor: '#e2e8f0', // slate-200
          duration: 0.2
        });

        // Finalize current step style
        tl.to(currentId, { borderColor: '#e2e8f0', duration: 0.2 }, "<");
      });

    }, containerRef);

    return () => ctx.revert();
  }, [n, steps]);

  const handleReplay = () => {
    if (timelineRef.current) timelineRef.current.restart();
  };

  if (n <= 0) {
    return (
      <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl p-8 text-center text-slate-400">
        <ChevronsUp className="mx-auto mb-2 opacity-50" size={48} />
        <p>Masukkan n &gt; 0, jangan malu-malu!</p>
      </div>
    );
  }

  // Pre-calculate full map for easy rendering
  const stepMap = new Map(steps.map(s => [s.step, s]));

  // Ensure we have step 1 and 2 if not in steps array (since types.ts implementation might differ slightly or loop starts at 3)
  // Actually types.ts returns ALL steps.

  return (
    <div className="space-y-4" ref={containerRef}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${isPlaying ? 'bg-green-500 animate-pulse' : 'bg-slate-300'}`}></div>
          <span className="text-sm font-medium text-slate-600">{isPlaying ? 'Calculating...' : 'Selesai!'}</span>
        </div>
        <button
          onClick={handleReplay}
          className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500"
          title="Ulangi Animasi"
        >
          <RotateCcw size={18} />
        </button>
      </div>

      <div className="relative min-h-[300px] bg-slate-50 rounded-2xl p-6 border border-slate-200 overflow-x-auto">
        <div className="flex flex-col-reverse gap-2 items-start min-w-max">
          {/* Generate Array of length n to map */}
          {Array.from({ length: n }).map((_, idx) => {
            const stepNum = idx + 1;
            const stepData = stepMap.get(stepNum);
            // Fallback for step 1 & 2 if not in array (though types.ts fixes should have them)
            // But types.ts implementation:
            // if n=1, returns step 1.
            // if n=2, returns step 1, step 2.
            // if n>=3, returns 1, 2, ... n.
            // So we are safe.

            const ways = stepData ? stepData.ways : (stepNum === 1 ? 1 : 2);
            // Note: types.ts fix I made pushed ALL steps to array, so stepData should exist.

            return (
              <div
                key={stepNum}
                id={`step-${stepNum}`}
                className="stair-step flex items-center gap-4 p-3 rounded-xl border-2 border-slate-200 bg-white shadow-sm transition-colors"
                style={{ marginLeft: `${(stepNum - 1) * 20}px` }} // Staircase indentation
              >
                <div className="w-8 h-8 flex items-center justify-center bg-indigo-100 text-indigo-700 font-bold rounded-lg text-sm shrink-0">
                  {stepNum}
                </div>

                <div className="flex flex-col">
                  <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Ways</span>
                  <div id={`val-${stepNum}`} className="stair-value text-xl font-bold text-slate-800">
                    {ways}
                  </div>
                </div>

                {stepNum > 2 && stepData && (
                  <div className="stair-value text-xs text-indigo-400 font-mono pl-2 border-l border-slate-100">
                    {stepData.prev1} + {stepData.prev2}
                  </div>
                )}

                {stepNum === n && (
                  <div className="ml-2 absolute -right-12 text-indigo-600 animate-bounce">
                    <Footprints size={24} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Decoration Floor */}
        <div className="absolute bottom-0 left-0 w-full h-2 bg-slate-200/50 rounded-b-2xl"></div>
      </div>
    </div>
  );
}
