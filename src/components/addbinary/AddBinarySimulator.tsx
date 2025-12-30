import { useEffect, useMemo, useState } from 'react';
import { Play, Square, SkipForward, RotateCcw } from 'lucide-react';
import { useLanguage } from '../../i18n';

interface AddBinarySimulatorProps {
  a: string;
  b: string;
}

interface Step {
  index: number;
  aDigit: number;
  bDigit: number;
  carryIn: number;
  sum: number;
  resultDigit: number;
  carryOut: number;
}

function buildSteps(a: string, b: string): { steps: Step[]; result: string } {
  let i = a.length - 1;
  let j = b.length - 1;
  let carry = 0;
  const steps: Step[] = [];
  const res: string[] = [];
  let idx = 0;

  while (i >= 0 || j >= 0 || carry) {
    const aDigit = i >= 0 ? Number(a[i]) : 0;
    const bDigit = j >= 0 ? Number(b[j]) : 0;
    const carryIn = carry;
    const sum = aDigit + bDigit + carry;
    const resultDigit = sum % 2;
    carry = Math.floor(sum / 2);

    steps.push({ index: idx, aDigit, bDigit, carryIn, sum, resultDigit, carryOut: carry });
    res.push(String(resultDigit));

    i -= 1;
    j -= 1;
    idx += 1;
  }

  return { steps, result: res.reverse().join('') };
}

export default function AddBinarySimulator({ a, b }: AddBinarySimulatorProps) {
  const { t } = useLanguage();
  const { steps, result } = useMemo(() => buildSteps(a || '0', b || '0'), [a, b]);

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
    if (currentStep >= steps.length - 1) setIsPlaying(false);
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

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
        <h3 className="text-2xl font-bold text-slate-800 mb-2">Algorithm Simulation</h3>
        <p className="text-slate-600">Lihat carry bergerak dari kanan ke kiri saat menambahkan dua string biner.</p>

        <div className="mt-4 flex items-center gap-3 flex-wrap">
          <button
            onClick={handlePlay}
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 shadow-md"
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
            className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 shadow-md"
          >
            <RotateCcw size={18} /> {t.reset}
          </button>

          <div className="flex items-center gap-2 ml-auto">
            <span className="text-sm text-slate-700 font-semibold">{t.speed}</span>
            <select
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="border-2 border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-500"
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
            className="h-2 bg-gradient-to-r from-orange-500 via-amber-500 to-lime-400 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {current && (
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2 bg-orange-50 border-2 border-orange-200 rounded-lg p-4 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-slate-800">Langkah {currentStep + 1}</div>
              <div className="text-xs px-2 py-1 rounded-full bg-white border border-orange-200 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-orange-500 animate-ping" />
                carry in: {current.carryIn}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[a, b].map((val, rowIdx) => {
                const label = rowIdx === 0 ? 'A' : 'B';
                return (
                  <div key={label} className="bg-white rounded-lg border border-orange-100 p-3 shadow-inner">
                    <div className="text-xs uppercase tracking-wide text-slate-500 mb-2">String {label}</div>
                    <div className="flex flex-wrap gap-2">
                      {val.split('').map((digit, idx) => {
                        const fromRight = val.length - 1 - idx;
                        const isCurrent = fromRight === current.index;
                        return (
                          <span
                            key={`${label}-${idx}`}
                            className={`px-3 py-2 rounded-lg border text-sm font-semibold transition-all duration-300 ${
                              isCurrent ? 'border-orange-500 bg-orange-50 shadow' : 'border-slate-200 bg-slate-50'
                            } ${isCurrent ? 'animate-[pulse_1.1s_ease-in-out]' : ''}`}
                          >
                            {digit}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-white rounded-xl border border-orange-100 p-4 flex flex-col gap-3 shadow-inner">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 text-white flex items-center justify-center text-xl font-bold shadow-lg animate-pulse">
                  {current.resultDigit}
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wide text-slate-500">Digit Hasil</div>
                  <div className="text-lg font-semibold text-slate-800">{current.resultDigit}</div>
                  <div className="text-xs text-slate-500">Sum {current.sum} → carry out {current.carryOut}</div>
                </div>
              </div>

              <div className="text-xs text-slate-600">Rumus: aDigit + bDigit + carryIn = sum. result = sum mod 2, carryOut = floor(sum / 2).</div>
            </div>
          </div>

          <div className="bg-white border-2 border-orange-200 rounded-lg p-4 shadow-sm flex flex-col gap-3">
            <div className="text-sm font-semibold text-slate-800 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
              Narasi Langkah
            </div>
            <div className="text-sm text-slate-700 leading-relaxed space-y-2">
              <p>
                Tambahkan digit kanan-ke-kiri. Saat sum ≥ 2, carryOut menjadi 1 dan dibawa ke langkah berikutnya.
              </p>
              <p className="text-xs text-slate-500">Simulasi berhenti ketika semua digit dan carry habis.</p>
            </div>

            <div>
              <div className="text-xs text-slate-500 mb-1">Jejak langkah</div>
              <div className="flex items-end gap-1 h-20">
                {steps.map((s, idx) => {
                  const height = 20 + s.carryOut * 20;
                  const isActive = idx === currentStep;
                  return (
                    <div
                      key={idx}
                      className={`w-2 rounded-full transition-all duration-300 ${
                        s.carryOut ? 'bg-amber-400' : 'bg-orange-400'
                      } ${isActive ? 'shadow-[0_0_0_3px_rgba(251,146,60,0.3)] scale-110' : ''}`}
                      style={{ height: `${height}px` }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 text-slate-700">
        <div className="font-semibold text-green-800 mb-1">Hasil Akhir</div>
        <div className="text-2xl font-bold text-green-700">{result}</div>
        <div className="text-xs text-slate-500 mt-1">Susun digit hasil dari kanan ke kiri lalu balikkan.</div>
      </div>
    </div>
  );
}
