import { useMemo, useState, useEffect } from 'react';
import { Play, Square, SkipForward, RotateCcw } from 'lucide-react';
import { useLanguage } from '../../i18n';

interface TwoSumSimulatorProps {
  nums: number[];
  target: number;
}

interface Step {
  index: number;
  num: number;
  complement: number;
  found: boolean;
  foundAt: number | null;
  seen: number[];
}

function buildSteps(nums: number[], target: number): Step[] {
  const steps: Step[] = [];
  const seen = new Map<number, number>();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    const foundAt = seen.get(complement);
    steps.push({
      index: i,
      num: nums[i],
      complement,
      found: foundAt !== undefined,
      foundAt: foundAt ?? null,
      seen: Array.from(seen.keys()),
    });
    seen.set(nums[i], i);
  }

  return steps;
}

export default function TwoSumSimulator({ nums, target }: TwoSumSimulatorProps) {
  const { t } = useLanguage();
  const steps = useMemo(() => buildSteps(nums, target), [nums, target]);
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(800);
  const progress = steps.length ? ((current + 1) / steps.length) * 100 : 0;

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

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
        <h3 className="text-2xl font-bold text-slate-800 mb-2">{t.algorithm} {t.simulate}</h3>
        <p className="text-slate-600">Watch how complement is found using one-pass hash map.</p>

        <div className="mt-4 flex items-center gap-3 flex-wrap">
          <button onClick={handlePlay} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 shadow-md">
            <Play size={18} /> {t.start}
          </button>
          <button onClick={handleStop} className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 shadow-md">
            <Square size={18} /> {t.stop}
          </button>
          <button onClick={handleNext} disabled={current >= steps.length - 1} className="bg-slate-600 hover:bg-slate-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 shadow-md">
            <SkipForward size={18} /> {t.next}
          </button>
          <button onClick={handleReset} className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 shadow-md">
            <RotateCcw size={18} /> {t.reset}
          </button>

          <div className="flex items-center gap-2 ml-auto">
            <span className="text-sm text-slate-700 font-semibold">{t.speed}</span>
            <select value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="border-2 border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500">
              <option value={1600}>0.5x</option>
              <option value={800}>1x</option>
              <option value={400}>2x</option>
              <option value={200}>4x</option>
            </select>
          </div>
        </div>

        <div className="mt-4 text-sm text-slate-600">{t.step} {steps.length ? current + 1 : 0} / {steps.length}</div>
        <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
          <div
            className="h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {step && (
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2 bg-blue-50 border-2 border-blue-200 rounded-lg p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-slate-800">Langkah {current + 1}</div>
              <div className="text-xs px-2 py-1 rounded-full bg-white border border-blue-200 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-500 animate-ping" />
                index: {step.index}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {nums.map((num, idx) => {
                const isCurrent = idx === step.index;
                const isProcessed = idx <= step.index;
                const isFoundMate = step.found && step.foundAt === idx;
                return (
                  <div
                    key={idx}
                    className={`relative rounded-xl border-2 px-3 py-2 min-w-[60px] text-center transition-all duration-300 shadow-sm ${
                      isCurrent
                        ? 'border-blue-500 bg-white shadow-lg scale-105'
                        : isFoundMate
                        ? 'border-emerald-400 bg-emerald-50'
                        : isProcessed
                        ? 'border-blue-200 bg-blue-50'
                        : 'border-dashed border-slate-200 bg-slate-50'
                    } ${isCurrent ? 'animate-[pulse_1.1s_ease-in-out]' : ''}`}
                  >
                    <div className="text-xs text-slate-500">{idx}</div>
                    <div className="text-lg font-bold text-slate-800">{num}</div>
                    {isFoundMate && (
                      <div className="absolute -bottom-3 inset-x-2 text-[10px] font-semibold text-emerald-700 bg-emerald-100 rounded-full px-2 py-1 shadow">
                        pasangan
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="bg-white rounded-xl border border-blue-100 p-4 flex flex-col gap-3 shadow-inner">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-white flex items-center justify-center text-xl font-bold shadow-lg animate-pulse">
                  {step.num}
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wide text-slate-500">Nilai</div>
                  <div className="text-lg font-semibold text-slate-800">{step.num}</div>
                  <div className="text-xs text-slate-500">Complement dibutuhkan: {step.complement}</div>
                </div>
              </div>

              <div>
                <div className="text-xs text-slate-500 mb-1">Hash Map (nilai → index)</div>
                <div className="flex flex-wrap gap-2">
                  {step.seen.length === 0 && <div className="text-xs text-slate-400">(kosong)</div>}
                  {step.seen.map((v, i) => (
                    <span key={`${v}-${i}`} className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold border border-blue-200 shadow-sm">
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border-2 border-blue-200 rounded-lg p-4 shadow-sm flex flex-col gap-3">
            <div className="text-sm font-semibold text-slate-800 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
              Narasi Langkah
            </div>
            <div className="text-sm text-slate-700 leading-relaxed space-y-2">
              <p>
                Nilai <span className="font-semibold text-blue-700">{step.num}</span> butuh complement{' '}
                <span className="font-semibold text-blue-700">{step.complement}</span>.
                {step.found ? (
                  <span className="text-emerald-700 font-semibold"> Ditemukan pada index {step.foundAt} → pasangan siap.</span>
                ) : (
                  <span className="text-slate-700"> Belum ada, simpan nilai ini ke map.</span>
                )}
              </p>
              <p className="text-xs text-slate-500">Hash map memberi lookup complement O(1) per langkah.</p>
            </div>

            <div>
              <div className="text-xs text-slate-500 mb-1">Jejak langkah</div>
              <div className="flex items-end gap-1 h-20">
                {steps.map((s, idx) => {
                  const height = s.found ? 50 : 25;
                  const isActive = idx === current;
                  return (
                    <div
                      key={idx}
                      className={`w-2 rounded-full transition-all duration-300 ${
                        s.found ? 'bg-emerald-400' : 'bg-blue-400'
                      } ${isActive ? 'shadow-[0_0_0_3px_rgba(59,130,246,0.3)] scale-110' : ''}`}
                      style={{ height: `${height}px` }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
