import { useEffect, useMemo, useState, useRef } from 'react';
import { Grid3x3, TrendingUp } from 'lucide-react';
import gsap from 'gsap';

interface LetterCombinationsVisualizerProps {
  digits: string;
}

const phoneMap: Record<string, string> = {
  '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
  '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
};

function getCombinations(digits: string): string[] {
  if (digits.length === 0) return [];
  
  const result: string[] = [];
  
  function backtrack(index: number, current: string) {
    if (index === digits.length) {
      result.push(current);
      return;
    }
    
    const letters = phoneMap[digits[index]];
    for (const letter of letters) {
      backtrack(index + 1, current + letter);
    }
  }
  
  backtrack(0, '');
  return result;
}

export default function LetterCombinationsVisualizer({ digits }: LetterCombinationsVisualizerProps) {
  const combinations = useMemo(() => getCombinations(digits), [digits]);
  const [mounted, setMounted] = useState(false);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    setMounted(false);
    cardsRef.current = [];
    const timer = setTimeout(() => setMounted(true), 20);
    return () => clearTimeout(timer);
  }, [digits]);

  // GSAP staggered animation
  useEffect(() => {
    if (mounted && cardsRef.current.length > 0) {
      gsap.fromTo(
        cardsRef.current.filter(el => el !== null),
        { 
          opacity: 0, 
          scale: 0.8,
          y: 20,
          rotateX: -15
        },
        { 
          opacity: 1, 
          scale: 1,
          y: 0,
          rotateX: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: 'back.out(1.7)'
        }
      );
    }
  }, [mounted, combinations.length]);

  // Group by length for better organization
  const groupedByLength: Record<number, string[]> = {};
  combinations.forEach(combo => {
    if (!groupedByLength[combo.length]) {
      groupedByLength[combo.length] = [];
    }
    groupedByLength[combo.length].push(combo);
  });

  if (digits.length === 0) {
    return (
      <div className="bg-gradient-to-br from-white via-indigo-50 to-blue-50 rounded-2xl p-8 shadow-xl border-2 border-indigo-100">
        <div className="text-center text-slate-500 py-8">
          <div className="text-6xl mb-4">📱</div>
          <p className="text-lg">Masukkan digit untuk melihat kombinasi</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-white via-indigo-50 to-blue-50 rounded-2xl p-8 shadow-xl border-2 border-indigo-100 relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-indigo-200 rounded-full blur-3xl opacity-20"></div>
      
      <div className="relative">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl shadow-lg">
              <Grid3x3 className="text-white" size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                Semua Kombinasi
              </h3>
              <p className="text-sm text-slate-500 mt-0.5">
                Letter Combinations Result
              </p>
            </div>
          </div>
          
          <div className="flex gap-2 flex-wrap">
            <div className="px-4 py-2 bg-gradient-to-r from-indigo-100 to-blue-100 border-2 border-indigo-200 rounded-xl font-semibold text-indigo-700 shadow-sm flex items-center gap-2">
              <TrendingUp size={16} />
              {combinations.length} kombinasi
            </div>
          </div>
        </div>

        {/* All combinations in a grid */}
        <div className="flex flex-wrap gap-3">
          {combinations.map((combo, idx) => (
            <div
              key={idx}
              ref={el => cardsRef.current[idx] = el}
              className="group px-6 py-4 bg-white border-2 border-indigo-200 rounded-xl font-mono text-indigo-700 hover:border-indigo-400 hover:bg-gradient-to-br hover:from-indigo-50 hover:to-blue-50 transition-all duration-300 shadow-md hover:shadow-xl cursor-pointer text-lg font-bold"
              style={{ opacity: 0 }}
            >
              "{combo}"
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
