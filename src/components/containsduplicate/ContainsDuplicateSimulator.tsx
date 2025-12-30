import { useEffect, useMemo, useState } from 'react';
import { Play, Square, SkipForward, RotateCcw } from 'lucide-react';
import { useLanguage } from '../../i18n';

interface ContainsDuplicateSimulatorProps {
  nums: number[];
}

interface Step {
  index: number;
  num: number;
  seen: number[];
  isDuplicate: boolean;
}

function buildSteps(nums: number[]): Step[] {
  const steps: Step[] = [];
  const seen = new Set<number>();

  nums.forEach((num, idx) => {
    const isDup = seen.has(num);
    steps.push({ index: idx, num, seen: Array.from(seen.values()), isDuplicate: isDup });
    seen.add(num);
  });

  return steps;
}

export default function ContainsDuplicateSimulator({ nums }: ContainsDuplicateSimulatorProps) {
  const { t } = useLanguage();
  const steps = useMemo(() => buildSteps(nums), [nums]);
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
        <h3 className="text-2xl font-bold text-slate-800 mb-2">Algorithm Simulation</h3>
        <p className="text-slate-600">Simulasi pengecekan duplikat menggunakan Hash Set.</p>

        <div className="mt-4 flex items-center gap-3 flex-wrap">
          <button onClick={handlePlay} className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 shadow-md">
            <Play size={18} /> {t.play}
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
            <select value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="border-2 border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-500">
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
            className="h-2 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {step && (
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2 bg-amber-50 border-2 border-amber-200 rounded-lg p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-slate-800">Langkah {current + 1}</div>
              <div className="text-xs px-2 py-1 rounded-full bg-white border border-amber-200 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-500 animate-ping" />
                index: {step.index}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {nums.map((num, idx) => {
                const isCurrent = idx === step.index;
                const isProcessed = idx <= step.index;
                const wasSeen = step.seen.includes(num) && idx <= step.index;
                return (
                  <div
                    key={idx}
                    className={`relative rounded-xl border-2 px-3 py-2 min-w-[60px] text-center transition-all duration-300 shadow-sm ${
                      isCurrent
                        ? 'border-amber-500 bg-white shadow-lg scale-105'
                        : wasSeen
                        ? 'border-rose-300 bg-rose-50'
                        : isProcessed
                        ? 'border-amber-200 bg-amber-50'
                        : 'border-dashed border-slate-200 bg-slate-50'
                    } ${isCurrent ? 'animate-[pulse_1.1s_ease-in-out]' : ''}`}
                  >
                    <div className="text-xs text-slate-500">{idx}</div>
                    <div className="text-lg font-bold text-slate-800">{num}</div>
                    {wasSeen && (
                      <div className="absolute -bottom-3 inset-x-2 text-[10px] font-semibold text-rose-700 bg-rose-100 rounded-full px-2 py-1 shadow">
                        duplikat
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="bg-white rounded-xl border border-amber-100 p-4 flex flex-col gap-3 shadow-inner">
              <div className="flex items-center gap-3">
                <div className={`h-12 w-12 rounded-full flex items-center justify-center text-xl font-bold shadow-lg ${step.isDuplicate ? 'bg-rose-500 text-white animate-bounce' : 'bg-amber-500 text-white animate-pulse'}`}>
                  {step.num}
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wide text-slate-500">Elemen</div>
                  <div className="text-lg font-semibold text-slate-800">{step.num}</div>
                  <div className="text-xs text-slate-500">{step.isDuplicate ? 'Sudah ada di set → duplikat!' : 'Belum ada di set, tambahkan.'}</div>
                </div>
              </div>

              <div>
                <div className="text-xs text-slate-500 mb-1">Isi Hash Set</div>
                <div className="flex flex-wrap gap-2">
                  {step.seen.length === 0 && <div className="text-xs text-slate-400">(kosong)</div>}
                  {step.seen.map((v, i) => (
                    <span key={`${v}-${i}`} className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold border border-amber-200 shadow-sm">
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border-2 border-amber-200 rounded-lg p-4 shadow-sm flex flex-col gap-3">
            <div className="text-sm font-semibold text-slate-800 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
              Narasi Langkah
            </div>
            <div className="text-sm text-slate-700 leading-relaxed space-y-2">
              <p>
                Elemen <span className="font-semibold text-amber-700">{step.num}</span>{' '}
                {step.isDuplicate ? 'sudah ada di hash set → deteksi duplikat.' : 'belum ada di hash set → tambahkan.'}
              </p>
              <p className="text-xs text-slate-500">Hash set memberi lookup O(1) sehingga cepat menemukan duplikat.</p>
            </div>

            <div>
              <div className="text-xs text-slate-500 mb-1">Jejak langkah</div>
              <div className="flex items-end gap-1 h-20">
                {steps.map((s, idx) => {
                  const height = 20 + (s.isDuplicate ? 30 : 10);
                  const isActive = idx === current;
                  return (
                    <div
                      key={idx}
                      className={`w-2 rounded-full transition-all duration-300 ${
                        s.isDuplicate ? 'bg-rose-400' : 'bg-amber-400'
                      } ${isActive ? 'shadow-[0_0_0_3px_rgba(251,191,36,0.3)] scale-110' : ''}`}
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
