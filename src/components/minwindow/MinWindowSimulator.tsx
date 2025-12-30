import { gsap } from 'gsap';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useLanguage } from '../../i18n';

interface Step {
  right: number;
  left: number;
  missing: number;
  window: string;
  action: 'expand' | 'contract' | 'update';
  char?: string;
  needMap: Map<string, number>;
  windowMap: Map<string, number>;
  isValid: boolean;
  isBest: boolean;
}

interface Props {
  s: string;
  t: string;
}

function buildSteps(s: string, t: string): Step[] {
  if (!s || !t || t.length > s.length) return [];
  const need = new Map<string, number>();
  for (const ch of t) need.set(ch, (need.get(ch) ?? 0) + 1);
  
  let missing = t.length;
  let left = 0;
  let best: [number, number] | null = null;
  const steps: Step[] = [];

  const getWindowMap = (start: number, end: number) => {
    const map = new Map<string, number>();
    for (let i = start; i <= end; i++) {
      const ch = s[i];
      map.set(ch, (map.get(ch) ?? 0) + 1);
    }
    return map;
  };

  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    
    need.set(ch, (need.get(ch) ?? 0) - 1);
    if ((need.get(ch) ?? 0) >= 0) missing--;

    const windowMap = getWindowMap(left, right);
    const isValid = missing === 0;
    
    steps.push({
      right,
      left,
      missing,
      window: s.slice(left, right + 1),
      action: 'expand',
      char: ch,
      needMap: new Map(need),
      windowMap,
      isValid,
      isBest: false
    });

    while (missing === 0) {
      const isBest = !best || right - left < best[1] - best[0];
      if (isBest) {
        best = [left, right];
        // Mark the previous step as best
        if (steps.length > 0) steps[steps.length - 1].isBest = true;
      }

      const leftCh = s[left];
      need.set(leftCh, (need.get(leftCh) ?? 0) + 1);
      if ((need.get(leftCh) ?? 0) > 0) missing++;
      left++;

      const contractWindowMap = left <= right ? getWindowMap(left, right) : new Map();
      const contractIsValid = missing === 0;

      steps.push({
        right,
        left,
        missing,
        window: left <= right ? s.slice(left, right + 1) : '',
        action: contractIsValid ? 'contract' : 'contract',
        char: leftCh,
        needMap: new Map(need),
        windowMap: contractWindowMap,
        isValid: contractIsValid,
        isBest: false
      });
    }
  }

  return steps;
}

export default function MinWindowSimulator({ s, t }: Props) {
  const { t: trans } = useLanguage();
  const steps = useMemo(() => buildSteps(s, t), [s, t]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);
  const playIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!listRef.current) return;
    gsap.fromTo(
      listRef.current.querySelectorAll('.step'),
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: 'power2.out' }
    );
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
    }, 1200);
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

  const currentStepData = steps[currentStep];
  const bestStep = steps.find(step => step.isBest);

  return (
    <div className="bg-white border-2 border-emerald-200 rounded-xl p-5 shadow-lg space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-lg font-bold text-emerald-800">{trans.stepByStepSimulation}</div>
        <div className="flex items-center gap-3">
          <div className="text-sm text-slate-600">
            {trans.step}: <span className="font-bold text-emerald-600">{currentStep + 1}</span> / {steps.length}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={isPlaying ? handlePause : handlePlay}
          disabled={steps.length === 0}
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors shadow-sm"
        >
          {isPlaying ? `⏸ ${trans.pause}` : `▶ ${trans.play}`}
        </button>
        <button
          onClick={handleReset}
          disabled={steps.length === 0}
          className="px-4 py-2 bg-slate-600 text-white rounded-lg font-semibold hover:bg-slate-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors shadow-sm"
        >
          ⏮ {trans.reset}
        </button>
        <button
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0 || isPlaying}
          className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg font-semibold hover:bg-slate-300 disabled:bg-slate-100 disabled:cursor-not-allowed transition-colors"
        >
          ← {trans.prev}
        </button>
        <button
          onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
          disabled={currentStep >= steps.length - 1 || isPlaying}
          className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg font-semibold hover:bg-slate-300 disabled:bg-slate-100 disabled:cursor-not-allowed transition-colors"
        >
          {trans.next} →
        </button>
      </div>

      {/* Current step details */}
      {currentStepData && (
        <div className={`rounded-xl p-4 border-2 space-y-3 ${
          currentStepData.isBest
            ? 'bg-gradient-to-r from-yellow-50 to-amber-50 border-amber-400'
            : currentStepData.isValid
            ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-300'
            : 'bg-gradient-to-r from-slate-50 to-gray-50 border-slate-300'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                currentStepData.action === 'expand'
                  ? 'bg-blue-500 text-white'
                  : 'bg-purple-500 text-white'
              }`}>
                {currentStepData.action === 'expand' ? '→ EXPAND' : '← CONTRACT'}
              </span>
              <span className="text-sm text-slate-700">
                {currentStepData.action === 'expand' 
                  ? `Tambah '${currentStepData.char}' ke window`
                  : `Lepas '${currentStepData.char}' dari window`
                }
              </span>
            </div>
            {currentStepData.isBest && (
              <span className="px-3 py-1 bg-yellow-400 text-yellow-900 rounded-lg text-xs font-bold">
                ⭐ BEST
              </span>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-3">
            <div className="bg-white/80 rounded-lg p-3 border border-slate-200">
              <div className="text-xs text-slate-600 mb-1">Window</div>
              <div className="font-mono font-bold text-emerald-700">
                [{currentStepData.left}, {currentStepData.right}]
              </div>
              <div className="font-mono text-sm mt-1 text-slate-700">
                "{currentStepData.window}"
              </div>
            </div>

            <div className="bg-white/80 rounded-lg p-3 border border-slate-200">
              <div className="text-xs text-slate-600 mb-1">Status</div>
              <div className={`font-semibold ${currentStepData.isValid ? 'text-emerald-600' : 'text-orange-600'}`}>
                {currentStepData.isValid ? '✓ Valid' : '✗ Invalid'}
              </div>
              <div className="text-xs text-slate-600 mt-1">
                Missing: {currentStepData.missing}
              </div>
            </div>

            <div className="bg-white/80 rounded-lg p-3 border border-slate-200">
              <div className="text-xs text-slate-600 mb-1">Panjang</div>
              <div className="text-2xl font-bold text-slate-700">
                {currentStepData.window.length}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            <div className="bg-white/60 rounded-lg p-3 border border-teal-200">
              <div className="text-xs font-semibold text-teal-800 mb-2">Kebutuhan (T):</div>
              <div className="flex flex-wrap gap-1">
                {Array.from(new Map(t.split('').map(ch => [ch, t.split('').filter(c => c === ch).length]))).map(([ch, count]) => (
                  <div key={ch} className="px-2 py-1 bg-teal-100 border border-teal-300 rounded text-xs">
                    <span className="font-mono font-bold">{ch}</span>
                    <span className="text-teal-600 ml-1">×{count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/60 rounded-lg p-3 border border-emerald-200">
              <div className="text-xs font-semibold text-emerald-800 mb-2">Di Window:</div>
              <div className="flex flex-wrap gap-1">
                {Array.from(currentStepData.windowMap.entries()).map(([ch, count]) => {
                  const needed = t.split('').filter(c => c === ch).length;
                  const isSufficient = count >= needed;
                  return (
                    <div key={ch} className={`px-2 py-1 rounded text-xs border ${
                      isSufficient ? 'bg-emerald-100 border-emerald-300' : 'bg-orange-100 border-orange-300'
                    }`}>
                      <span className="font-mono font-bold">{ch}</span>
                      <span className="ml-1">×{count}</span>
                    </div>
                  );
                })}
                {currentStepData.windowMap.size === 0 && (
                  <span className="text-slate-400 text-xs">(kosong)</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Steps list */}
      <div ref={listRef} className="space-y-2 max-h-64 overflow-auto pr-2">
        {steps.length === 0 && (
          <div className="text-sm text-slate-500 text-center py-8">
            Tidak ada data untuk disimulasikan.
          </div>
        )}
        
        {steps.map((step, idx) => {
          const isActive = idx === currentStep;
          const isPast = idx < currentStep;

          return (
            <div
              key={idx}
              onClick={() => !isPlaying && setCurrentStep(idx)}
              className={`step cursor-pointer transition-all duration-300 rounded-lg px-3 py-2 border ${
                isActive
                  ? step.isBest
                    ? 'bg-gradient-to-r from-yellow-100 to-amber-100 border-amber-400 scale-105 shadow-lg'
                    : 'bg-gradient-to-r from-emerald-100 to-teal-100 border-emerald-400 scale-105 shadow-lg'
                  : isPast
                  ? 'bg-slate-50 border-slate-200 opacity-50 hover:opacity-70'
                  : 'bg-white border-slate-200 opacity-40 hover:opacity-60'
              }`}
            >
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    step.action === 'expand' ? 'bg-blue-400 text-white' : 'bg-purple-400 text-white'
                  }`}>
                    {step.action === 'expand' ? '→' : '←'}
                  </span>
                  <span className="font-mono text-slate-700">[{step.left}, {step.right}]</span>
                  <span className="font-mono text-emerald-700">"{step.window}"</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs ${step.isValid ? 'text-emerald-600' : 'text-slate-400'}`}>
                    {step.isValid ? '✓' : '✗'}
                  </span>
                  {step.isBest && (
                    <span className="text-yellow-600 font-bold">⭐</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Best result summary */}
      {bestStep && (
        <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-amber-400 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-amber-900">🏆 Window Terpendek:</div>
              <div className="font-mono text-lg font-bold text-amber-800 mt-1">"{bestStep.window}"</div>
              <div className="text-xs text-slate-600 mt-1">
                Posisi: [{bestStep.left}, {bestStep.right}] • Panjang: {bestStep.window.length}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="text-xs text-slate-600 bg-blue-50 rounded-lg p-3 border border-blue-200">
        💡 <strong>Tips:</strong> Perhatikan bagaimana window diperluas (expand) untuk mencakup semua karakter T,
        kemudian diperkecil (contract) untuk mendapat window minimum yang valid.
      </div>
    </div>
  );
}
