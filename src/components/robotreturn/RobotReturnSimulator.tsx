import { useEffect, useMemo, useState } from 'react';
import { Play, Square, SkipForward, RotateCcw } from 'lucide-react';
import { useLanguage } from '../../i18n';

interface RobotReturnSimulatorProps {
  moves: string;
}

interface Step {
  move: string;
  x: number;
  y: number;
}

const moveMeta: Record<string, { label: string; color: string }> = {
  U: { label: 'Up', color: 'from-cyan-500 to-blue-500' },
  D: { label: 'Down', color: 'from-amber-500 to-orange-500' },
  L: { label: 'Left', color: 'from-rose-500 to-pink-500' },
  R: { label: 'Right', color: 'from-emerald-500 to-green-500' },
};

export default function RobotReturnSimulator({ moves }: RobotReturnSimulatorProps) {
  const { t } = useLanguage();
  const steps = useMemo(() => {
    const s: Step[] = [];
    let x = 0;
    let y = 0;
    for (const move of moves) {
      if (move === 'U') y += 1;
      if (move === 'D') y -= 1;
      if (move === 'R') x += 1;
      if (move === 'L') x -= 1;
      s.push({ move, x, y });
    }
    return s;
  }, [moves]);

  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(800);
  const progress = steps.length ? ((currentStep + 1) / steps.length) * 100 : 0;

  useEffect(() => {
    setCurrentStep(0);
    setIsPlaying(false);
  }, [steps]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && currentStep < steps.length - 1) {
      timer = setTimeout(() => setCurrentStep((prev) => prev + 1), speed);
    }
    if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [currentStep, isPlaying, speed, steps.length]);

  const handlePlay = () => {
    if (!steps.length) return;
    if (currentStep >= steps.length - 1) setCurrentStep(0);
    setIsPlaying(true);
  };

  const handleStop = () => {
    setIsPlaying(false);
    setCurrentStep(0);
  };

  const handleNext = () => {
    setIsPlaying(false);
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
  };

  const current = steps[currentStep];
  const finalX = steps.length ? steps[steps.length - 1].x : 0;
  const finalY = steps.length ? steps[steps.length - 1].y : 0;
  const isOrigin = finalX === 0 && finalY === 0;

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
        <h3 className="text-2xl font-bold text-slate-800 mb-2">Algorithm Simulation</h3>
        <p className="text-slate-600">Simulasikan pergerakan robot dan pantau koordinat x, y setelah setiap langkah.</p>

        <div className="mt-4 flex items-center gap-3 flex-wrap">
          <button
            onClick={handlePlay}
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 shadow-md"
          >
            <Play size={18} /> {t.play}
          </button>
          <button
            onClick={handleStop}
            className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 shadow-md"
          >
            <Square size={18} /> {t.stop}
          </button>
          <button
            onClick={handleNext}
            disabled={currentStep >= steps.length - 1}
            className="bg-slate-600 hover:bg-slate-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 shadow-md"
          >
            <SkipForward size={18} /> {t.next}
          </button>
          <button
            onClick={handleReset}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 shadow-md"
          >
            <RotateCcw size={18} /> {t.reset}
          </button>

          <div className="flex items-center gap-2 ml-auto">
            <span className="text-sm text-slate-700 font-semibold">{t.speed}</span>
            <select
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="border-2 border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500"
            >
              <option value={1600}>0.5x</option>
              <option value={800}>1x</option>
              <option value={400}>2x</option>
              <option value={200}>4x</option>
            </select>
          </div>
        </div>

        <div className="mt-4 text-sm text-slate-600">{t.step} {steps.length ? currentStep + 1 : 0} / {steps.length}</div>
        <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
          <div
            className="h-2 bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {current && (
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2 bg-slate-50 border-2 border-slate-200 rounded-lg p-4 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-slate-800">Langkah {currentStep + 1}</div>
              <div className="text-xs px-2 py-1 rounded-full bg-white border border-slate-200 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-cyan-500 animate-ping" />
                Move: {current.move}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {moves.split('').map((mv, idx) => {
                const isCurrent = idx === currentStep;
                const isDone = idx < currentStep;
                const meta = moveMeta[mv] || moveMeta.U;
                return (
                  <span
                    key={idx}
                    className={`relative px-3 py-2 rounded-xl border-2 text-sm font-semibold transition-all duration-300 ${
                      isCurrent
                        ? 'border-cyan-500 bg-white shadow-lg scale-105'
                        : isDone
                        ? 'border-slate-200 bg-slate-50'
                        : 'border-dashed border-slate-200 bg-slate-50'
                    } ${isCurrent ? 'animate-[pulse_1.1s_ease-in-out]' : ''}`}
                  >
                    {mv}
                    <span className={`absolute inset-x-1 -bottom-2 h-1 rounded-full bg-gradient-to-r ${meta.color} opacity-70`} />
                  </span>
                );
              })}
            </div>

            <div className="bg-white rounded-xl border border-slate-100 p-4 shadow-inner grid md:grid-cols-[auto,1fr] gap-4 items-center">
              <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${moveMeta[current.move]?.color ?? 'from-cyan-500 to-blue-500'} text-white flex items-center justify-center text-xl font-bold shadow-lg animate-pulse`}>{current.move}</div>
              <div>
                <div className="text-xs uppercase tracking-wide text-slate-500">Posisi</div>
                <div className="text-lg font-semibold text-slate-800">({current.x}, {current.y})</div>
                <div className="text-xs text-slate-500">{moveMeta[current.move]?.label ?? 'Move'} mengubah koordinat.</div>
              </div>
            </div>
          </div>

          <div className="bg-white border-2 border-cyan-200 rounded-lg p-4 shadow-sm flex flex-col gap-3">
            <div className="text-sm font-semibold text-slate-800 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-cyan-500 animate-pulse" />
              Narasi Langkah
            </div>
            <div className="text-sm text-slate-700 leading-relaxed space-y-2">
              <p>
                Gerakan <span className="font-semibold text-cyan-700">{current.move}</span> memodifikasi koordinat menjadi ({current.x}, {current.y}).
              </p>
              <p className="text-xs text-slate-500">Origin tercapai jika akhirnya (0,0).</p>
            </div>

            <div>
              <div className="text-xs text-slate-500 mb-1">Jejak posisi</div>
              <div className="flex items-end gap-1 h-20">
                {steps.map((s, idx) => {
                  const dist = Math.abs(s.x) + Math.abs(s.y);
                  const height = 20 + dist * 8;
                  const isActive = idx === currentStep;
                  return (
                    <div
                      key={idx}
                      className={`w-2 rounded-full transition-all duration-300 ${
                        dist === 0 ? 'bg-emerald-400' : 'bg-cyan-400'
                      } ${isActive ? 'shadow-[0_0_0_3px_rgba(34,211,238,0.3)] scale-110' : ''}`}
                      style={{ height: `${height}px` }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={`p-4 rounded-lg border-2 ${isOrigin ? 'bg-green-50 border-green-200 text-green-700' : 'bg-amber-50 border-amber-200 text-amber-700'}`}>
        <div className="font-semibold text-lg">Final Check</div>
        <div className="text-sm">Robot {isOrigin ? 'kembali ke origin ✅' : 'belum di origin ⚠️'}</div>
        <div className="text-xs text-slate-500 mt-1">Posisi akhir: ({finalX}, {finalY})</div>
      </div>
    </div>
  );
}
