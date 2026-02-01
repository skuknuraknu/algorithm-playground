import { useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import { TrendingUp, DollarSign } from 'lucide-react';
import { bestTimeStockWithSteps } from './types';

interface Props {
  prices: number[];
}

export default function BestTimeStockVisualizer({ prices }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { profit, buyIndex, sellIndex } = useMemo(() => bestTimeStockWithSteps(prices), [prices]);

  useEffect(() => {
    if (!containerRef.current) return;
    const bars = containerRef.current.querySelectorAll('.price-bar');
    gsap.fromTo(bars, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: 'power2.out' });
  }, [prices]);

  if (!prices.length) {
    return (
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-10 shadow-xl border-2 border-slate-200 text-center text-slate-500">
        <TrendingUp className="mx-auto mb-4 opacity-40" size={56} />
        Masukkan harga untuk melihat titik beli & jual terbaik.
      </div>
    );
  }

  return (
    <div className="space-y-4" ref={containerRef}>
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl p-5 shadow-lg flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold">Profit Maksimum</h3>
          <p className="text-sm text-emerald-100">Satu kali transaksi beli → jual.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white/15 rounded-lg text-sm"><DollarSign size={16}/> Profit: {profit}</div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {prices.map((p, i) => {
          const isBuy = buyIndex === i;
          const isSell = sellIndex === i;
          return (
            <div
              key={i}
              className={`price-bar rounded-xl border-2 p-4 shadow flex flex-col gap-2 ${isBuy ? 'border-indigo-300 bg-indigo-50' : isSell ? 'border-emerald-300 bg-emerald-50' : 'border-slate-200 bg-white'}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Hari {i + 1}</span>
                {isBuy && <span className="text-xs px-2 py-1 rounded-full bg-indigo-100 text-indigo-700 border border-indigo-200">BUY</span>}
                {isSell && <span className="text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">SELL</span>}
              </div>
              <div className="text-xl font-bold text-slate-800">{p}</div>
              <div className="h-2 rounded bg-slate-100">
                <div className={`h-2 rounded ${isSell ? 'bg-emerald-500' : isBuy ? 'bg-indigo-500' : 'bg-slate-300'}`} style={{ width: `${Math.max(8, p * 6)}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
