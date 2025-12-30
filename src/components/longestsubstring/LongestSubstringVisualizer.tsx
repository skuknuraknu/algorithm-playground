import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface LongestSubstringVisualizerProps {
  str: string;
}

export default function LongestSubstringVisualizer({ str }: LongestSubstringVisualizerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRefs.current, {
        y: 24,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out'
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const addCardRef = (el: HTMLDivElement | null) => {
    if (el && !cardRefs.current.includes(el)) cardRefs.current.push(el);
  };
  const findLongestSubstring = () => {
    if (!str) return { length: 0, substring: '', start: 0, end: 0 };
    
    const seen = new Map<string, number>();
    let maxLen = 0;
    let maxStart = 0;
    let left = 0;

    for (let right = 0; right < str.length; right++) {
      const char = str[right];
      
      if (seen.has(char) && seen.get(char)! >= left) {
        left = seen.get(char)! + 1;
      }
      
      seen.set(char, right);
      
      if (right - left + 1 > maxLen) {
        maxLen = right - left + 1;
        maxStart = left;
      }
    }

    return {
      length: maxLen,
      substring: str.slice(maxStart, maxStart + maxLen),
      start: maxStart,
      end: maxStart + maxLen - 1,
    };
  };

  const result = findLongestSubstring();

  return (
    <div ref={containerRef} className="space-y-8">
      {/* String Visualization */}
      <div ref={addCardRef} className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
        <h4 className="text-lg font-bold text-slate-800 mb-3">Visualisasi String</h4>
        <p className="text-sm text-slate-600 mb-4">Blok berwarna menandai substring unik terpanjang yang ditemukan.</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {str.split('').map((char, index) => {
            const isInLongest = index >= result.start && index <= result.end;
            
            return (
              <div key={index} className="flex flex-col items-center gap-2">
                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-lg font-mono text-xl font-bold shadow-lg transition-all ${
                    isInLongest
                      ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white border-4 border-purple-600 scale-110'
                      : 'bg-slate-200 text-slate-600 border-2 border-slate-300'
                  }`}
                >
                  {char}
                </div>
                <div className="text-xs font-mono text-slate-500">
                  [{index}]
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Result Display */}
      <div ref={addCardRef} className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border-2 border-purple-200">
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-sm text-slate-600 mb-1">Substring Terpanjang</div>
            <div className="text-3xl font-bold text-purple-600 font-mono">
              "{result.substring || 'N/A'}"
            </div>
          </div>
          <div>
            <div className="text-sm text-slate-600 mb-1">Panjang</div>
            <div className="text-3xl font-bold text-pink-600">
              {result.length}
            </div>
          </div>
          <div>
            <div className="text-sm text-slate-600 mb-1">Posisi (start - end)</div>
            <div className="text-3xl font-bold text-indigo-600">
              {result.start} - {result.end}
            </div>
          </div>
        </div>
      </div>

      {/* Character Frequency */}
      <div ref={addCardRef} className="bg-white rounded-lg p-6 border-2 border-slate-200">
        <h4 className="text-lg font-bold text-slate-800 mb-3">Analisis Frekuensi Karakter</h4>
        <p className="text-sm text-slate-600 mb-3">Karakter yang muncul di substring terpanjang diberi warna ungu.</p>
        <div className="flex flex-wrap gap-2">
          {Array.from(new Set(str.split(''))).map((char) => {
            const count = str.split('').filter(c => c === char).length;
            const isInLongest = result.substring.includes(char);
            
            return (
              <div
                key={char}
                className={`px-4 py-2 rounded-lg font-mono font-bold border-2 ${
                  isInLongest
                    ? 'bg-purple-100 text-purple-700 border-purple-300'
                    : 'bg-slate-100 text-slate-600 border-slate-300'
                }`}
              >
                '{char}': {count}
              </div>
            );
          })}
        </div>
      </div>

      {/* Statistics */}
      <div ref={addCardRef} className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-6 border-2 border-blue-200">
        <div className="grid grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-blue-600">
              {str.length}
            </div>
            <div className="text-sm text-slate-600 mt-1">Total Karakter</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-cyan-600">
              {new Set(str.split('')).size}
            </div>
            <div className="text-sm text-slate-600 mt-1">Karakter Unik</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-indigo-600">
              {result.length}
            </div>
            <div className="text-sm text-slate-600 mt-1">Panjang Maksimum Unik</div>
          </div>
        </div>
      </div>
    </div>
  );
}
