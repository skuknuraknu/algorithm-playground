import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface MajorityElementVisualizerProps {
  nums: number[];
}

function getMajority(nums: number[]): { value: number | null; count: number; freq: Record<number, number> } {
  const freq = nums.reduce<Record<number, number>>((acc, num) => {
    acc[num] = (acc[num] || 0) + 1;
    return acc;
  }, {});
  let maxVal: number | null = null;
  let maxCount = 0;
  Object.entries(freq).forEach(([key, value]) => {
    if (value > maxCount) {
      maxCount = value;
      maxVal = Number(key);
    }
  });
  return { value: maxVal, count: maxCount, freq };
}

export default function MajorityElementVisualizer({ nums }: MajorityElementVisualizerProps) {
  const { value, count, freq } = getMajority(nums);
  const threshold = Math.floor(nums.length / 2);
  const containerRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // GSAP entrance animation
  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline();

    // Animate header
    tl.from('.viz-header', {
      y: -30,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
    });

    // Animate frequency bars
    barsRef.current.forEach((bar, index) => {
      if (bar) {
        tl.from(
          bar,
          {
            scaleY: 0,
            opacity: 0,
            duration: 0.5,
            ease: 'back.out(1.7)',
          },
          `-=0.4`
        );
      }
    });

    // Animate cards
    cardsRef.current.forEach((card, index) => {
      if (card) {
        tl.from(
          card,
          {
            scale: 0,
            opacity: 0,
            rotation: -180,
            duration: 0.4,
            ease: 'back.out(1.7)',
          },
          `-=0.35`
        );
      }
    });

    // Pulse majority element
    if (value !== null) {
      tl.to('.majority-badge', {
        scale: 1.1,
        duration: 0.3,
        yoyo: true,
        repeat: 2,
        ease: 'power2.inOut',
      });
    }

    return () => {
      tl.kill();
    };
  }, [nums, value]);

  const uniqueNums = Array.from(new Set(nums)).sort((a, b) => a - b);
  const maxFreq = Math.max(...Object.values(freq));

  return (
    <div ref={containerRef} className="space-y-6">
      {/* Header */}
      <div className="viz-header bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border-2 border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-1">📊 Frequency Visualization</h3>
            <p className="text-slate-600 dark:text-slate-400">Hitung frekuensi dan temukan elemen mayoritas</p>
          </div>
          {value !== null && (
            <div className="majority-badge px-6 py-3 rounded-xl font-bold bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-lg border-2 border-white">
              <div className="text-sm opacity-90">Majority Element</div>
              <div className="text-3xl">{value}</div>
              <div className="text-xs opacity-90">{count}x occurrences</div>
            </div>
          )}
        </div>
      </div>

      {/* Frequency Bars */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border-2 border-slate-200 dark:border-slate-700">
        <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-4">📈 Frequency Distribution</h4>
        <div className="space-y-3">
          {uniqueNums.map((num, index) => {
            const frequency = freq[num];
            const percentage = (frequency / nums.length) * 100;
            const isMajority = num === value;
            const barWidth = (frequency / maxFreq) * 100;

            return (
              <div
                key={num}
                ref={(el) => (barsRef.current[index] = el)}
                className={`p-4 rounded-lg border-2 transition-all duration-300 ${isMajority
                  ? 'bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 border-violet-300 dark:border-violet-600'
                  : 'bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600'
                  }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl font-bold ${isMajority
                        ? 'bg-gradient-to-br from-violet-500 to-purple-500 text-white'
                        : 'bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-200'
                        }`}
                    >
                      {num}
                    </div>
                    <div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">Frequency</div>
                      <div className="text-lg font-bold text-slate-800 dark:text-white">
                        {frequency} <span className="text-sm text-slate-500">({percentage.toFixed(1)}%)</span>
                      </div>
                    </div>
                  </div>
                  {isMajority && (
                    <div className="px-3 py-1 bg-violet-500 text-white text-xs font-bold rounded-full">
                      👑 MAJORITY
                    </div>
                  )}
                </div>
                <div className="relative h-3 bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ${isMajority
                      ? 'bg-gradient-to-r from-violet-500 to-purple-500'
                      : 'bg-gradient-to-r from-slate-400 to-slate-500'
                      }`}
                    style={{ width: `${barWidth}%` }}
                  />
                  {isMajority && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-[shimmer_2s_infinite]" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Array Visualization */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border-2 border-slate-200 dark:border-slate-700">
        <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-4">🎯 Array Elements</h4>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
          {nums.map((num, idx) => {
            const isMajor = value !== null && num === value;
            return (
              <div
                key={`${num}-${idx}`}
                ref={(el) => (cardsRef.current[idx] = el)}
                className={`relative p-4 rounded-xl border-2 shadow-md flex flex-col items-center justify-center transition-all duration-300 hover:scale-110 ${isMajor
                  ? 'bg-gradient-to-br from-violet-500 to-purple-500 border-violet-600 text-white'
                  : 'bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-800 dark:text-white'
                  }`}
              >
                <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">{idx}</div>
                <div className="text-2xl font-bold">{num}</div>
                {isMajor && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-xs">
                    👑
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Info Card */}
      <div className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 border-2 border-violet-200 dark:border-violet-700 rounded-xl p-5 shadow-lg">
        <div className="flex items-start gap-3">
          <div className="text-3xl">💡</div>
          <div className="flex-1">
            <div className="font-semibold text-violet-800 dark:text-violet-300 mb-2">Majority Element Rule</div>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Elemen mayoritas harus muncul <strong>lebih dari ⌊n/2⌋ kali</strong>.
              Untuk array dengan <strong>n = {nums.length}</strong>, threshold adalah{' '}
              <strong className="text-violet-600 dark:text-violet-400">⌊{nums.length}/2⌋ = {threshold}</strong>.
            </p>
            {value !== null && (
              <div className="mt-3 p-3 bg-white dark:bg-slate-800 rounded-lg border border-violet-200 dark:border-violet-600">
                <div className="text-sm">
                  <span className="font-bold text-violet-600 dark:text-violet-400">{value}</span> muncul{' '}
                  <span className="font-bold text-violet-600 dark:text-violet-400">{count} kali</span>
                  {count > threshold ? (
                    <span className="text-green-600 dark:text-green-400 font-semibold"> ✓ ({count} {">"} {threshold})</span>
                  ) : (
                    <span className="text-amber-600 dark:text-amber-400 font-semibold"> ⚠ ({count} {"<"} {threshold})</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
