import { useEffect, useRef } from 'react';
import { Target } from 'lucide-react';
import gsap from 'gsap';

interface FindPositionVisualizerProps {
  nums: number[];
  target: number;
}

export default function FindPositionVisualizer({ nums, target }: FindPositionVisualizerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, []);

  useEffect(() => {
    if (elementsRef.current.length > 0) {
      gsap.fromTo(elementsRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, stagger: 0.05, ease: "back.out(1.7)" }
      );
    }
  }, [nums]);

  const searchRange = (nums: number[], target: number): [number, number] => {
    const findFirst = (): number => {
      let left = 0;
      let right = nums.length - 1;
      let result = -1;

      while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] === target) {
          result = mid;
          right = mid - 1; // Continue searching left
        } else if (nums[mid] < target) {
          left = mid + 1;
        } else {
          right = mid - 1;
        }
      }
      return result;
    };

    const findLast = (): number => {
      let left = 0;
      let right = nums.length - 1;
      let result = -1;

      while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] === target) {
          result = mid;
          left = mid + 1; // Continue searching right
        } else if (nums[mid] < target) {
          left = mid + 1;
        } else {
          right = mid - 1;
        }
      }
      return result;
    };

    const first = findFirst();
    const last = first === -1 ? -1 : findLast();
    return [first, last];
  };

  const [first, last] = searchRange(nums, target);
  const found = first !== -1;

  return (
    <div ref={containerRef} className="space-y-8">
      {/* Array Visualization */}
      <div>
        <h4 className="text-lg font-bold text-slate-700 mb-3">Elemen Array</h4>
        <div className="flex flex-wrap gap-2 justify-center">
          {nums.map((num, index) => {
            const isTarget = num === target;
            const isFirst = index === first;
            const isLast = index === last;
            const inRange = found && index >= first && index <= last;

            return (
              <div 
                key={index} 
                ref={el => { if (el) elementsRef.current[index] = el }}
                className="flex flex-col items-center gap-2"
              >
                <div
                  className={`w-14 h-14 flex items-center justify-center rounded-lg font-mono text-xl font-bold shadow-lg transition-all duration-300 hover:scale-110 cursor-default ${
                    isTarget && inRange
                      ? 'bg-gradient-to-br from-indigo-500 to-purple-500 text-white border-4 border-indigo-600 shadow-indigo-200'
                      : 'bg-slate-200 text-slate-600 border-2 border-slate-300 hover:bg-slate-300'
                  } ${
                    isFirst || isLast
                      ? 'ring-4 ring-yellow-400 ring-offset-2 scale-110 z-10'
                      : ''
                  }`}
                >
                  {num}
                </div>
                <div className="text-xs font-mono text-slate-500">
                  [{index}]
                </div>
                {isFirst && (
                  <div className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded animate-bounce">
                    Awal
                  </div>
                )}
                {isLast && isLast !== isFirst && (
                  <div className="text-xs font-bold text-red-600 bg-red-100 px-2 py-1 rounded animate-bounce">
                    Akhir
                  </div>
                )}
                {isFirst && isLast && (
                  <div className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded animate-bounce">
                    Satu2nya
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Result Display */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6 border-2 border-indigo-200 shadow-md hover:shadow-lg transition-shadow">
        <div className="flex items-center gap-3 mb-4">
          <Target className="text-indigo-600" size={32} />
          <div>
            <div className="text-sm text-slate-600">Nilai Target</div>
            <div className="text-3xl font-bold text-indigo-600 font-mono">{target}</div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className={`rounded-lg p-6 border-2 transition-colors duration-300 ${
            found 
              ? 'bg-green-50 border-green-300'
              : 'bg-red-50 border-red-300'
          }`}>
            <div className="text-sm text-slate-600 mb-1">Posisi Awal</div>
            <div className={`text-4xl font-bold font-mono ${
              found ? 'text-green-700' : 'text-red-700'
            }`}>
              {first}
            </div>
          </div>
          <div className={`rounded-lg p-6 border-2 transition-colors duration-300 ${
            found 
              ? 'bg-green-50 border-green-300'
              : 'bg-red-50 border-red-300'
          }`}>
            <div className="text-sm text-slate-600 mb-1">Posisi Akhir</div>
            <div className={`text-4xl font-bold font-mono ${
              found ? 'text-green-700' : 'text-red-700'
            }`}>
              {last}
            </div>
          </div>
        </div>

        <div className="mt-4 text-center">
          <div className="text-sm text-slate-600 mb-1">Hasil Akhir</div>
          <div className={`text-2xl font-bold font-mono ${
            found ? 'text-green-700' : 'text-red-700'
          }`}>
            [{first}, {last}]
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-6 border-2 border-blue-200 shadow-md hover:shadow-lg transition-shadow">
        <div className="grid grid-cols-3 gap-6 text-center">
          <div className="hover:scale-105 transition-transform">
            <div className="text-3xl font-bold text-blue-600">
              {nums.length}
            </div>
            <div className="text-sm text-slate-600 mt-1">Panjang Array</div>
          </div>
          <div className="hover:scale-105 transition-transform">
            <div className="text-3xl font-bold text-indigo-600">
              {found ? last - first + 1 : 0}
            </div>
            <div className="text-sm text-slate-600 mt-1">Kemunculan</div>
          </div>
          <div className="hover:scale-105 transition-transform">
            <div className="text-3xl font-bold text-purple-600">
              {found ? 'Ketemu' : 'Tidak'}
            </div>
            <div className="text-sm text-slate-600 mt-1">Status</div>
          </div>
        </div>
      </div>
    </div>
  );
}
