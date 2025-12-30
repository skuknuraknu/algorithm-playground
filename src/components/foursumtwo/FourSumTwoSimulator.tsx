import { gsap } from 'gsap';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useLanguage } from '../../i18n';

interface Props {
  a: number[];
  b: number[];
  c: number[];
  d: number[];
}

type Step = {
  phase: 'building' | 'searching';
  abSum?: number;
  abFreq?: number;
  cdSum?: number;
  cdFreq?: number;
  complement?: number;
  matches: number;
  runningTotal: number;
  examples?: string[];
  idxA?: number;
  idxB?: number;
  idxC?: number;
  idxD?: number;
};

export default function FourSumTwoSimulator({ a, b, c, d }: Props) {
  const { t } = useLanguage();
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [total, setTotal] = useState(0);
  const [speed, setSpeed] = useState(1000);
  const timelineRef = useRef<GSAPTimeline | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const playIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  const abSums = useMemo(() => {
    const map = new Map<number, number>();
    a.forEach((x) => b.forEach((y) => map.set(x + y, (map.get(x + y) ?? 0) + 1)));
    return map;
  }, [a, b]);

  const cdSums = useMemo(() => {
    const map = new Map<number, number>();
    c.forEach((x) => d.forEach((y) => map.set(x + y, (map.get(x + y) ?? 0) + 1)));
    return map;
  }, [c, d]);

  useEffect(() => {
    const newSteps: Step[] = [];
    let runningTotal = 0;

    // Building phase - show each pair being added
    let buildCount = 0;
    for (let i = 0; i < a.length && buildCount < 6; i++) {
      for (let j = 0; j < b.length && buildCount < 6; j++) {
        const sum = a[i] + b[j];
        newSteps.push({
          phase: 'building',
          abSum: sum,
          abFreq: (abSums.get(sum) ?? 0),
          matches: 0,
          runningTotal,
          examples: [`${a[i]} + ${b[j]} = ${sum}`],
          idxA: i,
          idxB: j
        });
        buildCount++;
      }
    }

    if (a.length * b.length > 6) {
      newSteps.push({
        phase: 'building',
        matches: 0,
        runningTotal,
        examples: [`... dan ${a.length * b.length - 6} pasangan lainnya`]
      });
    }

    // Searching phase - more detailed
    cdSums.forEach((cdFreq, cdSum) => {
      const complement = -cdSum;
      const abFreq = abSums.get(complement) ?? 0;
      const matches = abFreq * cdFreq;
      
      // Find example indices
      let exampleC = -1, exampleD = -1;
      outer: for (let k = 0; k < c.length; k++) {
        for (let l = 0; l < d.length; l++) {
          if (c[k] + d[l] === cdSum) {
            exampleC = k;
            exampleD = l;
            break outer;
          }
        }
      }

      const examples: string[] = [`${c[exampleC]} + ${d[exampleD]} = ${cdSum}`];
      
      if (matches > 0) {
        runningTotal += matches;
      }
      
      newSteps.push({
        phase: 'searching',
        cdSum,
        cdFreq,
        complement,
        abSum: complement,
        abFreq,
        matches,
        runningTotal,
        examples,
        idxC: exampleC,
        idxD: exampleD
      });
    });

    setSteps(newSteps);
    setTotal(runningTotal);
    setCurrentStep(0);
    setIsPlaying(false);
  }, [abSums, cdSums, a, b, c, d]);

  // Auto-scroll to current step
  useEffect(() => {
    if (stepRefs.current[currentStep] && listRef.current) {
      const stepEl = stepRefs.current[currentStep];
      if (stepEl) {
        stepEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Pulse animation on current step
        gsap.fromTo(stepEl,
          { boxShadow: '0 0 0 0 rgba(99, 102, 241, 0.7)' },
          { boxShadow: '0 0 0 8px rgba(99, 102, 241, 0)', duration: 0.6, ease: 'power2.out' }
        );
      }
    }
  }, [currentStep]);

  useEffect(() => {
    if (!listRef.current) return;
    timelineRef.current?.kill();
    const tl = gsap.timeline();
    tl.fromTo(
      listRef.current.querySelectorAll('.step'),
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: 'power2.out' }
    );
    timelineRef.current = tl;
    return () => {
      tl.kill();
    };
  }, [steps]);

  const handlePlay = () => {
    setIsPlaying(true);
    if (currentStep >= steps.length - 1) {
      setCurrentStep(0);
    }
    
    playIntervalRef.current = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= steps.length - 1) {
          setIsPlaying(false);
          if (playIntervalRef.current) clearInterval(playIntervalRef.current);
          return prev;
        }
        return prev + 1;
      });
    }, speed);
  };

  const handlePause = () => {
    setIsPlaying(false);
    if (playIntervalRef.current) {
      clearInterval(playIntervalRef.current);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    if (playIntervalRef.current) {
      clearInterval(playIntervalRef.current);
    }
  };

  useEffect(() => {
    return () => {
      if (playIntervalRef.current) {
        clearInterval(playIntervalRef.current);
      }
    };
  }, []);

  // Update interval when speed changes
  useEffect(() => {
    if (isPlaying) {
      if (playIntervalRef.current) clearInterval(playIntervalRef.current);
      playIntervalRef.current = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            if (playIntervalRef.current) clearInterval(playIntervalRef.current);
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    }
  }, [speed, isPlaying, steps.length]);

  const currentTotal = steps[currentStep]?.runningTotal ?? 0;
  const currentStepData = steps[currentStep];

  return (
    <div className="bg-white border-2 border-slate-200 rounded-xl p-5 shadow-lg space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
            <span className="text-white text-lg">🎬</span>
          </div>
          <div>
            <div className="text-lg font-bold text-slate-800">Simulasi Step-by-Step</div>
            <div className="text-xs text-slate-500">Ikuti alur algoritma secara visual</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-sm text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg">
            Step: <span className="font-bold text-indigo-600">{currentStep + 1}</span> / {steps.length}
          </div>
          <div className="px-4 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg shadow-md text-sm font-bold">
            Count: {currentTotal}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex gap-2">
          <button
            onClick={isPlaying ? handlePause : handlePlay}
            disabled={steps.length === 0}
            className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 disabled:from-slate-300 disabled:to-slate-400 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg active:scale-95"
          >
            {isPlaying ? `⏸ ${t.pause}` : `▶ ${t.play}`}
          </button>
          <button
            onClick={handleReset}
            disabled={steps.length === 0}
            className="px-4 py-2.5 bg-slate-600 text-white rounded-lg font-semibold hover:bg-slate-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all shadow-md active:scale-95"
          >
            ⏮ {t.reset}
          </button>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0 || isPlaying}
            className="px-4 py-2.5 bg-slate-200 text-slate-700 rounded-lg font-semibold hover:bg-slate-300 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed transition-all active:scale-95"
          >
            ← {t.prev}
          </button>
          <button
            onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
            disabled={currentStep >= steps.length - 1 || isPlaying}
            className="px-4 py-2.5 bg-slate-200 text-slate-700 rounded-lg font-semibold hover:bg-slate-300 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed transition-all active:scale-95"
          >
            {t.next} →
          </button>
        </div>

        {/* Speed control */}
        <div className="flex items-center gap-2 ml-auto bg-slate-100 px-3 py-2 rounded-lg">
          <span className="text-xs text-slate-600">⚡ {t.speed}:</span>
          <select
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="bg-white px-2 py-1 rounded border border-slate-300 text-sm font-semibold text-indigo-600 cursor-pointer outline-none focus:border-indigo-500"
          >
            <option value={2000}>0.5x</option>
            <option value={1000}>1x</option>
            <option value={500}>2x</option>
            <option value={250}>4x</option>
          </select>
        </div>
      </div>

      {/* Current operation highlight */}
      {currentStepData && (
        <div className={`p-4 rounded-xl border-2 ${
          currentStepData.phase === 'building'
            ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-300'
            : 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-300'
        }`}>
          <div className="flex items-center gap-3 mb-3">
            <span className={`px-3 py-1 text-xs font-bold rounded-full ${
              currentStepData.phase === 'building'
                ? 'bg-blue-600 text-white'
                : 'bg-amber-600 text-white'
            }`}>
              {currentStepData.phase === 'building' ? '📦 BUILD' : '🔍 SEARCH'}
            </span>
            <span className="text-sm font-medium text-slate-700">
              {currentStepData.phase === 'building'
                ? 'Menambahkan ke HashMap A+B'
                : 'Mencari komplemen di HashMap'
              }
            </span>
          </div>
          
          {currentStepData.phase === 'building' && currentStepData.abSum !== undefined && (
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded font-mono text-sm">
                  A[{currentStepData.idxA}] = {a[currentStepData.idxA!]}
                </span>
                <span className="text-slate-400">+</span>
                <span className="px-2 py-1 bg-cyan-100 text-cyan-700 rounded font-mono text-sm">
                  B[{currentStepData.idxB}] = {b[currentStepData.idxB!]}
                </span>
                <span className="text-slate-400">=</span>
                <span className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg font-bold">
                  {currentStepData.abSum}
                </span>
              </div>
              <span className="text-slate-500 text-sm">→ simpan di map</span>
            </div>
          )}
          
          {currentStepData.phase === 'searching' && (
            <div className="space-y-3">
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded font-mono text-sm">
                    C[{currentStepData.idxC}] = {c[currentStepData.idxC!]}
                  </span>
                  <span className="text-slate-400">+</span>
                  <span className="px-2 py-1 bg-rose-100 text-rose-700 rounded font-mono text-sm">
                    D[{currentStepData.idxD}] = {d[currentStepData.idxD!]}
                  </span>
                  <span className="text-slate-400">=</span>
                  <span className="px-3 py-1.5 bg-amber-500 text-white rounded-lg font-bold">
                    {currentStepData.cdSum}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-wrap text-sm">
                <span className="text-slate-600">Butuh komplemen:</span>
                <span className="px-2 py-1 bg-red-100 text-red-700 rounded font-mono font-bold">
                  {currentStepData.complement}
                </span>
                <span className="text-slate-400">→</span>
                {currentStepData.abFreq! > 0 ? (
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg font-semibold">
                    ✓ Ditemukan {currentStepData.abFreq}× → +{currentStepData.matches} tuple!
                  </span>
                ) : (
                  <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-lg">
                    ✗ Tidak ditemukan
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Progress bar */}
      <div className="relative h-2 bg-slate-200 rounded-full overflow-hidden">
        <div 
          className="absolute h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"
          style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
        />
      </div>

      {/* Steps list */}
      <div ref={listRef} className="space-y-3 max-h-80 overflow-auto pr-2 custom-scrollbar">
        {steps.length === 0 && (
          <div className="text-sm text-slate-500 text-center py-12 bg-slate-50 rounded-lg">
            <span className="text-4xl mb-3 block">📭</span>
            Tidak ada data untuk disimulasikan.
          </div>
        )}
        
        {steps.map((step, idx) => {
          const isActive = idx === currentStep;
          const isPast = idx < currentStep;

          return (
            <div
              key={idx}
              ref={el => stepRefs.current[idx] = el}
              onClick={() => !isPlaying && setCurrentStep(idx)}
              className={`step transition-all duration-300 rounded-xl p-4 border-2 cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-400 shadow-lg scale-[1.02]'
                  : isPast
                  ? 'bg-emerald-50/50 border-emerald-200'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Step number */}
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  isActive
                    ? 'bg-indigo-600 text-white'
                    : isPast
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-200 text-slate-600'
                }`}>
                  {isPast ? '✓' : idx + 1}
                </div>

                <div className="flex-1 min-w-0">
                  {step.phase === 'building' ? (
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-bold rounded">BUILD</span>
                        {step.abSum !== undefined ? (
                          <span className="text-sm text-slate-700">
                            Menyimpan <span className="font-mono font-bold text-indigo-600 bg-indigo-100 px-1.5 py-0.5 rounded">{step.abSum}</span>
                          </span>
                        ) : (
                          <span className="text-sm text-slate-500 italic">{step.examples?.[0]}</span>
                        )}
                      </div>
                      {step.examples && step.abSum !== undefined && (
                        <div className="text-xs text-slate-500 ml-1">
                          {step.examples.join(' ')}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-bold rounded">SEARCH</span>
                          <span className="text-sm text-slate-700">
                            C+D = <span className="font-mono font-bold text-amber-600">{step.cdSum}</span>
                          </span>
                        </div>
                        {step.matches > 0 && (
                          <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">
                            +{step.matches} tuple{step.matches > 1 ? 's' : ''}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-600 space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-slate-400">→</span>
                          <span>Komplemen: <span className="font-mono font-semibold text-red-600">{step.complement}</span></span>
                          {step.abFreq! > 0 ? (
                            <span className="text-emerald-600">✓ di map ({step.abFreq}×)</span>
                          ) : (
                            <span className="text-slate-400">✗ tidak ada</span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Running total */}
                {step.phase === 'searching' && step.matches > 0 && (
                  <div className="text-right">
                    <div className="text-lg font-bold text-emerald-600">{step.runningTotal}</div>
                    <div className="text-xs text-slate-400">total</div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Final result */}
      <div className="flex items-center justify-between bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl p-5 text-white shadow-lg">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🎉</span>
          <div>
            <div className="text-sm opacity-90">Total Tuple yang Valid</div>
            <div className="text-xs opacity-75">A[i] + B[j] + C[k] + D[l] = 0</div>
          </div>
        </div>
        <div className="text-4xl font-bold">
          {total}
        </div>
      </div>

      {/* Tips */}
      <div className="text-xs text-slate-600 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
        <div className="flex items-start gap-2">
          <span className="text-lg">💡</span>
          <div>
            <strong className="text-blue-900">Tips:</strong>
            <span className="text-blue-800 ml-1">
              Perhatikan bagaimana setiap sum dari C+D mencari komplementnya di hash map A+B. 
              Jumlah tuple dihitung dengan <strong>mengalikan frekuensi</strong> kedua sisi karena setiap kombinasi valid!
            </span>
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
}
