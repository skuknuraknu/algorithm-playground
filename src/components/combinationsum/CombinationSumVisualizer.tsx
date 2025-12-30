import { useEffect, useMemo, useState, useRef } from 'react';
import { Grid3x3, TrendingUp, CheckCircle } from 'lucide-react';
import gsap from 'gsap';

interface CombinationSumVisualizerProps {
  candidates: number[];
  target: number;
}

function getCombinations(candidates: number[], target: number): number[][] {
  const result: number[][] = [];
  
  function backtrack(start: number, current: number[], currentSum: number) {
    if (currentSum === target) {
      result.push([...current]);
      return;
    }
    
    if (currentSum > target) return;

    for (let i = start; i < candidates.length; i++) {
      current.push(candidates[i]);
      backtrack(i, current, currentSum + candidates[i]);
      current.pop();
    }
  }
  
  if (candidates.length > 0 && target > 0) {
    backtrack(0, [], 0);
  }
  
  return result;
}

export default function CombinationSumVisualizer({ candidates, target }: CombinationSumVisualizerProps) {
  const combinations = useMemo(() => getCombinations(candidates, target), [candidates, target]);
  const [mounted, setMounted] = useState(false);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(false);
    cardsRef.current = [];
    const timer = setTimeout(() => setMounted(true), 20);
    return () => clearTimeout(timer);
  }, [candidates, target]);

  // GSAP animations with more complex effects
  useEffect(() => {
    if (mounted) {
      // Animate stats
      if (statsRef.current) {
        gsap.fromTo(
          statsRef.current,
          { opacity: 0, y: -30, scale: 0.8 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.5)' }
        );
      }

      // Animate cards with stagger and 3D effect
      if (cardsRef.current.length > 0) {
        gsap.fromTo(
          cardsRef.current.filter(el => el !== null),
          { 
            opacity: 0, 
            scale: 0.7,
            y: 30,
            rotateX: -20,
            rotateY: 10
          },
          { 
            opacity: 1, 
            scale: 1,
            y: 0,
            rotateX: 0,
            rotateY: 0,
            duration: 0.6,
            stagger: {
              amount: 0.8,
              from: 'start',
              ease: 'power2.out'
            },
            ease: 'back.out(1.4)'
          }
        );
      }
    }
  }, [mounted, combinations.length]);

  if (candidates.length === 0 || target <= 0) {
    return (
      <div className="bg-gradient-to-br from-white via-rose-50 to-pink-50 rounded-2xl p-8 shadow-xl border-2 border-rose-100">
        <div className="text-center text-slate-500 py-8">
          <div className="text-6xl mb-4">🎯</div>
          <p className="text-lg">Masukkan candidates dan target untuk melihat kombinasi</p>
        </div>
      </div>
    );
  }

  if (combinations.length === 0) {
    return (
      <div className="bg-gradient-to-br from-white via-rose-50 to-pink-50 rounded-2xl p-8 shadow-xl border-2 border-rose-100">
        <div className="text-center text-slate-500 py-8">
          <div className="text-6xl mb-4">❌</div>
          <p className="text-lg font-semibold text-slate-700">Tidak ada kombinasi yang ditemukan</p>
          <p className="text-sm mt-2">Tidak ada kombinasi dari candidates yang dapat membentuk target {target}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-white via-rose-50 to-pink-50 rounded-2xl p-8 shadow-xl border-2 border-rose-100 relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-rose-200 rounded-full blur-3xl opacity-20"></div>
      
      <div className="relative">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl shadow-lg">
              <Grid3x3 className="text-white" size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                Semua Kombinasi
              </h3>
              <p className="text-sm text-slate-500 mt-0.5">
                Valid Combinations to Target
              </p>
            </div>
          </div>
          
          <div ref={statsRef} className="flex gap-2 flex-wrap" style={{ opacity: 0 }}>
            <div className="px-4 py-2 bg-gradient-to-r from-rose-100 to-pink-100 border-2 border-rose-200 rounded-xl font-semibold text-rose-700 shadow-sm flex items-center gap-2">
              <CheckCircle size={16} />
              {combinations.length} solusi
            </div>
            <div className="px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-bold shadow-md flex items-center gap-2">
              <TrendingUp size={16} />
              Target: {target}
            </div>
          </div>
        </div>

        {/* Display combinations */}
        <div className="space-y-3">
          {combinations.map((combo, idx) => {
            const sum = combo.reduce((a, b) => a + b, 0);
            return (
              <div
                key={idx}
                ref={el => cardsRef.current[idx] = el}
                className="group bg-white border-2 border-rose-200 rounded-xl p-5 hover:border-rose-400 hover:bg-gradient-to-br hover:from-rose-50 hover:to-pink-50 transition-all duration-300 shadow-md hover:shadow-xl cursor-pointer"
                style={{ opacity: 0 }}
              >
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex gap-2 flex-wrap items-center">
                    {combo.map((num, numIdx) => (
                      <div key={numIdx} className="flex items-center gap-2">
                        <div className="px-4 py-2 bg-gradient-to-br from-rose-500 to-pink-600 text-white rounded-lg font-mono font-bold text-lg shadow-md group-hover:scale-110 transition-transform">
                          {num}
                        </div>
                        {numIdx < combo.length - 1 && (
                          <span className="text-slate-400 font-bold text-xl">+</span>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400 font-bold text-xl">=</span>
                    <div className="px-4 py-2 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-lg font-mono font-bold text-lg shadow-md">
                      {sum}
                    </div>
                    <CheckCircle className="text-green-600" size={24} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
