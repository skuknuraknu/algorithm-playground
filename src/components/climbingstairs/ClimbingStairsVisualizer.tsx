import { useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import { ChevronsUp } from 'lucide-react';
import { climbWithSteps } from './types';

interface Props {
  n: number;
}

export default function ClimbingStairsVisualizer({ n }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { total, steps } = useMemo(() => climbWithSteps(n), [n]);

  useEffect(() => {
    if (!containerRef.current) return;
    const cards = containerRef.current.querySelectorAll('.stair-card');
    gsap.fromTo(cards, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, stagger: 0.05, ease: 'power2.out' });
  }, [n]);

  if (n <= 0) {
    return (
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-10 shadow-xl border-2 border-slate-200 text-center text-slate-500">
        <ChevronsUp className="mx-auto mb-4 opacity-40" size={56} />
        Masukkan n &gt; 0 untuk melihat banyak cara naik tangga.
      </div>
    );
  }

  return (
    <div className="space-y-4" ref={containerRef}>
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl p-5 shadow-lg flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold">Total Cara</h3>
          <p className="text-sm text-indigo-100">Setiap langkah 1 atau 2.</p>
        </div>
        <div className="px-4 py-2 bg-white/15 rounded-lg text-sm">{total}</div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {steps.map((s) => (
          <div key={s.step} className="stair-card rounded-xl border-2 border-indigo-100 bg-white shadow p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-indigo-700">Langkah {s.step}</span>
              <span className="text-xs px-2 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">dp[{s.step}]</span>
            </div>
            <div className="text-2xl font-bold text-slate-800">{s.ways}</div>
            <div className="text-xs text-slate-600 mt-2">dp[i-1]={s.prev1} · dp[i-2]={s.prev2}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
