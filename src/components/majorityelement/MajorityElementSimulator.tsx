import { useEffect, useMemo, useState, useRef } from 'react';
import { Play, Square, SkipForward, RotateCcw } from 'lucide-react';
import { useLanguage } from '../../i18n';
import gsap from 'gsap';

interface MajorityElementSimulatorProps {
  nums: number[];
}

interface Step {
  index: number;
  num: number;
  candidate: number | null;
  count: number;
  action: 'init' | 'increment' | 'decrement' | 'switch';
}

function buildSteps(nums: number[]): Step[] {
  const steps: Step[] = [];
  let candidate: number | null = null;
  let count = 0;

  nums.forEach((num, idx) => {
    let action: Step['action'] = 'increment';

    if (count === 0) {
      candidate = num;
      action = idx === 0 ? 'init' : 'switch';
      count = 1;
    } else if (candidate === num) {
      count += 1;
      action = 'increment';
    } else {
      count -= 1;
      action = 'decrement';
    }

    steps.push({ index: idx, num, candidate, count, action });
  });

  return steps;
}

export default function MajorityElementSimulator({ nums }: MajorityElementSimulatorProps) {
  const { t } = useLanguage();
  const steps = useMemo(() => buildSteps(nums), [nums]);
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(800);

  const candidateRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLDivElement>(null);
  const currentElementRef = useRef<HTMLDivElement>(null);
  const gaugeRef = useRef<HTMLDivElement>(null);

  const maxAbsCount = useMemo(
    () => Math.max(1, ...steps.map((s) => Math.abs(s.count))),
    [steps]
  );

  useEffect(() => {
    setCurrent(0);
    setIsPlaying(false);
  }, [steps]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && current < steps.length - 1) {
      timer = setTimeout(() => setCurrent((c) => c + 1), speed);
    }
    if (current >= steps.length - 1) setIsPlaying(false);
    return () => clearTimeout(timer);
  }, [current, isPlaying, speed, steps.length]);

  // GSAP animations on step change
  useEffect(() => {
    if (!steps[current]) return;

    const step = steps[current];
    const tl = gsap.timeline();

    // Animate current element
    if (currentElementRef.current) {
      tl.from(currentElementRef.current, {
        scale: 0.5,
        rotation: -180,
        opacity: 0,
        duration: 0.4,
        ease: 'back.out(1.7)',
      });
    }

    // Animate candidate change
    if (candidateRef.current && (step.action === 'init' || step.action === 'switch')) {
      tl.from(
        candidateRef.current,
        {
          scale: 0,
          rotation: 360,
          duration: 0.6,
          ease: 'elastic.out(1, 0.5)',
        },
        '-=0.2'
      );
    }

    // Animate count change
    if (countRef.current) {
      if (step.action === 'increment') {
        tl.to(countRef.current, {
          scale: 1.3,
          color: '#10b981',
          duration: 0.2,
          yoyo: true,
          repeat: 1,
        });
      } else if (step.action === 'decrement') {
        tl.to(countRef.current, {
          scale: 1.3,
          color: '#ef4444',
          duration: 0.2,
          yoyo: true,
          repeat: 1,
        });
      }
    }

    // Animate gauge
    if (gaugeRef.current) {
      tl.to(gaugeRef.current, {
        scaleX: 1.05,
        duration: 0.3,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut',
      }, '-=0.4');
    }

    // Final celebration if last step
    if (current === steps.length - 1 && candidateRef.current) {
      tl.to(candidateRef.current, {
        scale: 1.5,
        rotation: '+=720',
        duration: 1,
        ease: 'elastic.out(1, 0.3)',
      }).to(candidateRef.current, {
        scale: 1,
        duration: 0.3,
      });
    }

    return () => {
      tl.kill();
    };
  }, [current, steps]);

  const handlePlay = () => {
    if (!steps.length) return;
    if (current >= steps.length - 1) setCurrent(0);
    setIsPlaying(true);
  };

  const handleStop = () => {
    setIsPlaying(false);
    setCurrent(0);
  };

  const handleNext = () => {
    setIsPlaying(false);
    setCurrent((c) => Math.min(c + 1, steps.length - 1));
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrent(0);
  };

  const step = steps[current];
  const gaugeWidth = step ? ((step.count + maxAbsCount) / (2 * maxAbsCount)) * 100 : 50;
  const progress = steps.length ? ((current + 1) / steps.length) * 100 : 0;

  const actionMessages = {
    init: 'Inisialisasi kandidat pertama',
    increment: 'Elemen sama dengan kandidat → count++',
    decrement: 'Elemen berbeda dengan kandidat → count--',
    switch: 'Count = 0 → Ganti kandidat',
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border-2 border-slate-200 dark:border-slate-700">
        <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">⚡ Boyer-Moore Simulation</h3>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          Simulasi step-by-step algoritma Boyer-Moore Voting dengan animasi GSAP
        </p>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={handlePlay}
            disabled={isPlaying}
            className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 disabled:from-slate-400 disabled:to-slate-500 text-white px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 shadow-md transition-all"
          >
            <Play size={18} /> {t.play}
          </button>
          <button
            onClick={handleStop}
            className="bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 shadow-md transition-all"
          >
            <Square size={18} /> {t.stop}
          </button>
          <button
            onClick={handleNext}
            disabled={current >= steps.length - 1}
            className="bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 disabled:from-slate-300 disabled:to-slate-400 disabled:cursor-not-allowed text-white px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 shadow-md transition-all"
          >
            <SkipForward size={18} /> {t.next}
          </button>
          <button
            onClick={handleReset}
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 shadow-md transition-all"
          >
            <RotateCcw size={18} /> {t.reset}
          </button>

          <div className="flex items-center gap-2 ml-auto">
            <span className="text-sm text-slate-700 dark:text-slate-300 font-semibold">{t.speed}</span>
            <select
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="border-2 border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-500"
            >
              <option value={1600}>0.5x</option>
              <option value={800}>1x</option>
              <option value={400}>2x</option>
              <option value={200}>4x</option>
            </select>
          </div>
        </div>

        <div className="mt-4 text-sm text-slate-600 dark:text-slate-400">
          {t.step} {steps.length ? current + 1 : 0} / {steps.length}
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 mt-2 overflow-hidden">
          <div
            className="h-3 bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 rounded-full transition-all duration-500 relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-[shimmer_2s_infinite]" />
          </div>
        </div>
      </div>

      {step && (
        <div className="grid gap-4 lg:grid-cols-3">
          {/* Main Visualization */}
          <div className="lg:col-span-2 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 border-2 border-violet-200 dark:border-violet-700 rounded-xl p-6 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-slate-800 dark:text-white">Step {current + 1}</div>
              <div className="text-xs px-3 py-1.5 rounded-full bg-white dark:bg-slate-800 border-2 border-violet-200 dark:border-violet-600 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-violet-500 animate-ping" />
                Index: {step.index}
              </div>
            </div>

            {/* Array Elements */}
            <div className="flex flex-wrap gap-2">
              {nums.map((num, idx) => {
                const isCurrent = idx === step.index;
                const isProcessed = idx <= step.index;
                const isCandidate = step.candidate === num && isProcessed;

                return (
                  <div
                    key={idx}
                    className={`relative rounded-xl border-2 px-4 py-3 min-w-[70px] text-center transition-all duration-300 shadow-md ${isCurrent
                        ? 'border-violet-500 bg-white dark:bg-slate-800 shadow-xl scale-110 z-10'
                        : isCandidate
                          ? 'border-pink-300 dark:border-pink-600 bg-pink-50 dark:bg-pink-900/30'
                          : isProcessed
                            ? 'border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700'
                            : 'border-dashed border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50 opacity-50'
                      }`}
                  >
                    <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">{idx}</div>
                    <div className={`text-xl font-bold ${isCurrent ? 'text-violet-600 dark:text-violet-400' : 'text-slate-800 dark:text-white'}`}>
                      {num}
                    </div>
                    {isCandidate && !isCurrent && (
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-semibold text-pink-700 dark:text-pink-400 bg-pink-100 dark:bg-pink-900 rounded-full px-2 py-0.5 shadow whitespace-nowrap">
                        kandidat
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Current State */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border-2 border-violet-200 dark:border-violet-600 p-5 shadow-inner space-y-4">
              {/* Current Element */}
              <div className="flex items-center gap-4">
                <div
                  ref={currentElementRef}
                  className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 text-white flex items-center justify-center text-3xl font-bold shadow-lg"
                >
                  {step.num}
                </div>
                <div className="flex-1">
                  <div className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Current Element</div>
                  <div className="text-lg font-semibold text-slate-800 dark:text-white">{step.num}</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">{actionMessages[step.action]}</div>
                </div>
              </div>

              {/* Candidate */}
              <div className="flex items-center gap-4">
                <div
                  ref={candidateRef}
                  className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 text-white flex items-center justify-center text-3xl font-bold shadow-lg"
                >
                  {step.candidate ?? '?'}
                </div>
                <div className="flex-1">
                  <div className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Candidate</div>
                  <div className="text-lg font-semibold text-slate-800 dark:text-white">{step.candidate ?? 'None'}</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">Potential majority element</div>
                </div>
              </div>

              {/* Count Gauge */}
              <div>
                <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 mb-2">
                  <span>Vote Balance (Count)</span>
                  <span ref={countRef} className="font-bold text-lg text-violet-700 dark:text-violet-400">
                    {step.count}
                  </span>
                </div>
                <div className="relative h-4 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <div
                    ref={gaugeRef}
                    className="absolute left-0 top-0 h-full bg-gradient-to-r from-rose-400 via-violet-500 to-emerald-400 transition-all duration-500"
                    style={{ width: `${gaugeWidth}%` }}
                  />
                  <div className="absolute left-1/2 top-0 h-full w-1 bg-white/70" />
                </div>
                <div className="mt-1 text-[10px] text-slate-500 dark:text-slate-400">
                  Left = opponent votes | Right = candidate votes
                </div>
              </div>
            </div>
          </div>

          {/* Side Panel */}
          <div className="bg-white dark:bg-slate-800 border-2 border-violet-200 dark:border-violet-700 rounded-xl p-5 shadow-lg space-y-4">
            <div className="text-sm font-semibold text-slate-800 dark:text-white flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-violet-500 animate-pulse" />
              Step Narrative
            </div>

            <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-3">
              <div className="p-3 bg-violet-50 dark:bg-violet-900/30 rounded-lg border border-violet-200 dark:border-violet-700">
                <div className="font-semibold text-violet-700 dark:text-violet-400 mb-1">Action:</div>
                <div>{actionMessages[step.action]}</div>
              </div>

              <p>
                Element <span className="font-bold text-violet-600 dark:text-violet-400">{step.num}</span>{' '}
                {step.candidate === null
                  ? 'becomes the first candidate.'
                  : step.candidate === step.num
                    ? 'matches candidate → count increases.'
                    : 'differs from candidate → count decreases.'}
              </p>

              {step.count === 0 && step.index < nums.length - 1 && (
                <div className="p-2 bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700 rounded text-amber-700 dark:text-amber-400 text-xs">
                  ⚠️ Count reached 0! Next element will become new candidate.
                </div>
              )}
            </div>

            {/* Progress Chart */}
            <div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mb-2">Count History</div>
              <div className="flex items-end gap-1 h-24 bg-slate-50 dark:bg-slate-900/50 rounded-lg p-2">
                {steps.slice(0, current + 1).map((s, idx) => {
                  const height = Math.max(8, (Math.abs(s.count) / maxAbsCount) * 70);
                  const isActive = idx === current;

                  return (
                    <div
                      key={idx}
                      className={`flex-1 rounded-t transition-all duration-300 ${s.count >= 0 ? 'bg-violet-400 dark:bg-violet-500' : 'bg-rose-400 dark:bg-rose-500'
                        } ${isActive ? 'shadow-[0_0_0_2px_rgba(124,58,237,0.5)] scale-110' : ''}`}
                      style={{ height: `${height}px` }}
                    />
                  );
                })}
              </div>
            </div>

            {/* Final Result */}
            {current === steps.length - 1 && (
              <div className="p-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg text-white shadow-lg">
                <div className="text-sm opacity-90 mb-1">✅ Final Candidate</div>
                <div className="text-3xl font-bold">{step.candidate}</div>
                <div className="text-xs opacity-90 mt-1">This is the majority element!</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
