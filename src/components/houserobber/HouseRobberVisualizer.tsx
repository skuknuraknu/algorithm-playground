import { useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import { Home, Coins, Crown } from 'lucide-react';
import { robWithSteps } from './types';

interface Props {
  houses: number[];
}

export default function HouseRobberVisualizer({ houses }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { max, chosenHouses } = useMemo(() => robWithSteps(houses), [houses]);

  useEffect(() => {
    if (!containerRef.current) return;
    const cards = containerRef.current.querySelectorAll('.house-card');
    gsap.fromTo(cards, { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out' });
  }, [houses]);

  const chosenSet = new Set(chosenHouses);

  if (!houses.length) {
    return (
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-10 shadow-xl border-2 border-slate-200 text-center text-slate-500">
        <Home className="mx-auto mb-4 opacity-40" size={56} />
        Masukkan nilai rumah untuk melihat kombinasi terbaik.
      </div>
    );
  }

  return (
    <div className="space-y-4" ref={containerRef}>
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl p-5 shadow-lg flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold">Kombinasi Terbaik</h3>
          <p className="text-sm text-indigo-100">Tidak ada dua rumah bersebelahan yang diambil.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white/15 rounded-lg text-sm"><Crown size={16}/> Maks: {max}</div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {houses.map((v, i) => (
          <div
            key={i}
            className={`house-card rounded-xl border-2 p-4 shadow ${chosenSet.has(i) ? 'border-emerald-300 bg-emerald-50' : 'border-slate-200 bg-white'}`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-slate-800 font-semibold">
                <Home size={16} className={chosenSet.has(i) ? 'text-emerald-600' : 'text-slate-400'} />
                Rumah #{i + 1}
              </div>
              {chosenSet.has(i) && (
                <span className="text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">diambil</span>
              )}
            </div>
            <div className="flex items-center gap-2 text-lg font-bold text-slate-800">
              <Coins size={18} className="text-amber-500" /> {v}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
