import { useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import { Coins } from 'lucide-react';
import { coinChangeWithSteps } from './types';

interface Props {
  coins: number[];
  amount: number;
}

export default function CoinChangeVisualizer({ coins, amount }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { minCoins, dp } = useMemo(() => coinChangeWithSteps(coins, amount), [coins, amount]);

  useEffect(() => {
    if (!containerRef.current) return;
    const cards = containerRef.current.querySelectorAll('.dp-card');
    gsap.fromTo(cards, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, stagger: 0.05, ease: 'power2.out' });
  }, [coins, amount]);

  if (amount <= 0) {
    return (
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-10 shadow-xl border-2 border-slate-200 text-center text-slate-500">
        <Coins className="mx-auto mb-4 opacity-40" size={56} />
        Masukkan amount &gt; 0 untuk melihat DP akhir.
      </div>
    );
  }

  return (
    <div className="space-y-4" ref={containerRef}>
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl p-5 shadow-lg flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold">Hasil Minimum Koin</h3>
          <p className="text-sm text-emerald-100">DP bottom-up (unbounded knapsack).</p>
        </div>
        <div className={`px-4 py-2 rounded-lg text-sm border ${minCoins === -1 ? 'bg-white/10 border-white/30' : 'bg-white/15 border-white/30'}`}>
          {minCoins === -1 ? 'Tidak mungkin' : minCoins}
        </div>
      </div>

      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-3">
        {dp.map((v, idx) => (
          <div key={idx} className="dp-card rounded-xl border-2 border-emerald-100 bg-white shadow p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-emerald-700">Amount {idx}</span>
              <span className="text-xs px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">dp[{idx}]</span>
            </div>
            <div className="text-xl font-bold text-slate-800">{v === Infinity ? '∞' : v}</div>
            <div className="h-2 rounded bg-slate-100 mt-2">
              <div className="h-2 rounded bg-emerald-500" style={{ width: `${Math.min(100, (v === Infinity ? 0 : v) * 12)}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
