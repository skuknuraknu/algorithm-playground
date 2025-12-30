import { useEffect, useMemo, useState } from 'react';
import { Play, Square, SkipForward, RotateCcw } from 'lucide-react';
import { useLanguage } from '../../i18n';

interface MajorityElementSimulatorProps {
  nums: number[];
}

interface Step {
  index: number;
  num: number;
  candidate: number | null;
  count: number;
}

function buildSteps(nums: number[]): Step[] {
  const steps: Step[] = [];
  let candidate: number | null = null;
  let count = 0;

  nums.forEach((num, idx) => {
    if (count === 0) {
      candidate = num;
    }
    if (candidate === num) {
      count += 1;
    } else {
      count -= 1;
    }
    steps.push({ index: idx, num, candidate, count });
  });

  return steps;
}

export default function MajorityElementSimulator({ nums }: MajorityElementSimulatorProps) {
  const { t } = useLanguage();
  const steps = useMemo(() => buildSteps(nums), [nums]);
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(800);
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

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
        <h3 className="text-2xl font-bold text-slate-800 mb-2">Boyer-Moore Simulation</h3>
        <p className="text-slate-600">Lihat bagaimana kandidat mayoritas dipilih dan dihitung.</p>

        <div className="mt-4 flex items-center gap-3 flex-wrap">
          <button onClick={handlePlay} className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 shadow-md">
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
            <select value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="border-2 border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-500">
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
            className="h-2 bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {step && (
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2 bg-violet-50 border-2 border-violet-200 rounded-lg p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-slate-800">Langkah {current + 1}</div>
              <div className="text-xs px-2 py-1 rounded-full bg-white border border-violet-200 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-violet-500 animate-ping" />
                index: {step.index}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {nums.map((num, idx) => {
                const isCurrent = idx === step.index;
                const isProcessed = idx <= step.index;
                const isCandidate = step.candidate === num && isProcessed;
                return (
                  <div
                    key={idx}
                    className={`relative rounded-xl border-2 px-3 py-2 min-w-[60px] text-center transition-all duration-300 shadow-sm ${
                      isCurrent
                        ? 'border-violet-500 bg-white shadow-lg scale-105'
                        : isCandidate
                        ? 'border-pink-300 bg-pink-50'
                        : isProcessed
                        ? 'border-slate-200 bg-white'
                        : 'border-dashed border-slate-200 bg-slate-50'
                    } ${isCurrent ? 'animate-[pulse_1.2s_ease-in-out]' : ''}`}
                  >
                    <div className="text-xs text-slate-500">{idx}</div>
                    <div className="text-lg font-bold text-slate-800">{num}</div>
                    {isCandidate && (
                      <div className="absolute -bottom-3 inset-x-2 text-[10px] font-semibold text-pink-700 bg-pink-100 rounded-full px-2 py-1 shadow">
                        kandidat
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="bg-white rounded-xl border border-violet-100 p-4 flex flex-col gap-3 shadow-inner">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 text-white flex items-center justify-center text-xl font-bold shadow-lg animate-pulse">
                  {step.candidate ?? '-'}
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wide text-slate-500">Kandidat</div>
                  <div className="text-lg font-semibold text-slate-800">{step.candidate ?? 'Belum ada'}</div>
                  <div className="text-xs text-slate-500">Dipilih ketika count turun ke 0</div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
                  <span>Saldo Suara (count)</span>
                  <span className="font-semibold text-violet-700">{step.count}</span>
                </div>
                <div className="relative h-3 rounded-full bg-slate-200 overflow-hidden">
                  <div
                    className="absolute left-0 top-0 h-full bg-gradient-to-r from-rose-400 via-violet-500 to-emerald-400 transition-all duration-500"
                    style={{ width: `${gaugeWidth}%` }}
                  />
                  <div className="absolute left-1/2 top-0 h-full w-0.5 bg-white/70" />
                </div>
                <div className="mt-1 text-[11px] text-slate-500">Kiri = banyak suara lawan, kanan = banyak suara kandidat.</div>
              </div>
            </div>
          </div>

          <div className="bg-white border-2 border-violet-200 rounded-lg p-4 shadow-sm flex flex-col gap-3">
            <div className="text-sm font-semibold text-slate-800 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-violet-500 animate-pulse" />
              Narasi Langkah
            </div>
            <div className="text-sm text-slate-700 leading-relaxed space-y-2">
              <p>
                Elemen saat ini <span className="font-semibold text-violet-700">{step.num}</span>{' '}
                {step.candidate === null
                  ? 'dipilih menjadi kandidat pertama.'
                  : step.candidate === step.num
                  ? 'mendukung kandidat, count bertambah.'
                  : 'melawan kandidat, count berkurang.'}
              </p>
              <p>
                Saat count turun ke <span className="font-semibold">0</span>, kita reset kandidat ke elemen berikutnya. Kandidat akhir
                adalah mayoritas jika ada.
              </p>
            </div>

            <div>
              <div className="text-xs text-slate-500 mb-1">Jejak langkah</div>
              <div className="flex items-end gap-1 h-20">
                {steps.map((s, idx) => {
                  const height = Math.max(6, (Math.abs(s.count) / maxAbsCount) * 60);
                  const isActive = idx === current;
                  return (
                    <div
                      key={idx}
                      className={`w-2 rounded-full transition-all duration-300 ${
                        s.count >= 0 ? 'bg-violet-400' : 'bg-rose-400'
                      } ${isActive ? 'shadow-[0_0_0_3px_rgba(124,58,237,0.2)] scale-110' : ''}`}
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
