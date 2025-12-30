import { useState, useEffect, useMemo, useRef } from 'react';
import { Play, Pause, RotateCcw, ChevronRight, ChevronLeft, Layers } from 'lucide-react';
import gsap from 'gsap';

interface LetterCombinationsSimulatorProps {
  digits: string;
}

interface Step {
  current: string;
  index: number;
  action: 'start' | 'add_letter' | 'complete' | 'backtrack';
  description: string;
  depth: number;
  currentDigit?: string;
  currentLetter?: string;
}

const phoneMap: Record<string, string> = {
  '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
  '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
};

function generateSteps(digits: string): Step[] {
  const steps: Step[] = [];
  
  if (digits.length === 0) {
    steps.push({
      current: '',
      index: 0,
      action: 'complete',
      description: 'Input kosong, return array kosong',
      depth: 0
    });
    return steps;
  }

  function backtrack(index: number, current: string, depth: number) {
    if (index === digits.length) {
      steps.push({
        current,
        index,
        action: 'complete',
        description: `Kombinasi lengkap: "${current}"`,
        depth
      });
      return;
    }

    const digit = digits[index];
    const letters = phoneMap[digit];

    steps.push({
      current,
      index,
      action: 'start',
      description: `Proses digit ${digit} (${letters})`,
      depth,
      currentDigit: digit
    });

    for (const letter of letters) {
      steps.push({
        current: current + letter,
        index,
        action: 'add_letter',
        description: `Tambahkan huruf '${letter}' ke "${current}"`,
        depth,
        currentDigit: digit,
        currentLetter: letter
      });

      backtrack(index + 1, current + letter, depth + 1);

      if (index < digits.length - 1) {
        steps.push({
          current,
          index,
          action: 'backtrack',
          description: `Kembali, coba huruf lain dari ${digit}`,
          depth
        });
      }
    }
  }

  backtrack(0, '', 0);
  return steps;
}

export default function LetterCombinationsSimulator({ digits }: LetterCombinationsSimulatorProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const steps = useMemo(() => generateSteps(digits), [digits]);
  const stateRef = useRef<HTMLDivElement>(null);
  const treeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentStep(0);
    setIsPlaying(false);
  }, [digits]);

  useEffect(() => {
    let interval: any;
    if (isPlaying && currentStep < steps.length - 1) {
      interval = setInterval(() => {
        setCurrentStep(prev => prev + 1);
      }, 1200);
    } else {
      setIsPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentStep, steps.length]);

  // GSAP animations
  useEffect(() => {
    if (stateRef.current) {
      gsap.fromTo(
        stateRef.current,
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'back.out(1.7)' }
      );
    }
    if (treeRef.current) {
      gsap.fromTo(
        treeRef.current,
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [currentStep]);

  const step = steps[currentStep];

  const actionStyle =
    step?.action === 'complete'
      ? 'text-green-700 bg-green-50 border-green-200'
      : step?.action === 'backtrack'
        ? 'text-red-700 bg-red-50 border-red-200'
        : step?.action === 'add_letter'
          ? 'text-indigo-700 bg-indigo-50 border-indigo-200'
          : 'text-blue-700 bg-blue-50 border-blue-200';

  return (
    <div className="bg-gradient-to-br from-white via-indigo-50 to-blue-50 rounded-2xl p-8 shadow-xl border-2 border-indigo-100 space-y-6 relative overflow-hidden">
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-indigo-200 rounded-full blur-3xl opacity-20"></div>
      
      <div className="relative">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl shadow-lg">
              <Layers className="text-white" size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                Simulasi Backtracking
              </h3>
              <p className="text-sm text-slate-500 mt-0.5">
                Langkah {currentStep + 1} dari {steps.length}
              </p>
            </div>
          </div>
          
          <div className="flex gap-2 bg-white px-3 py-2 rounded-xl border-2 border-slate-200 shadow-md">
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className="p-2.5 rounded-lg hover:bg-indigo-50 disabled:opacity-30 disabled:hover:bg-transparent transition-all duration-200 active:scale-95 text-slate-700 hover:text-indigo-600"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2.5 rounded-lg bg-gradient-to-r from-indigo-500 to-blue-600 text-white hover:from-indigo-600 hover:to-blue-700 transition-all duration-200 active:scale-95 shadow-md"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button
              onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
              disabled={currentStep === steps.length - 1}
              className="p-2.5 rounded-lg hover:bg-indigo-50 disabled:opacity-30 disabled:hover:bg-transparent transition-all duration-200 active:scale-95 text-slate-700 hover:text-indigo-600"
            >
              <ChevronRight size={20} />
            </button>
            <div className="w-px bg-slate-200 mx-1"></div>
            <button
              onClick={() => {
                setCurrentStep(0);
                setIsPlaying(false);
              }}
              className="p-2.5 rounded-lg hover:bg-slate-100 transition-all duration-200 active:scale-95 text-slate-700 hover:text-slate-900"
            >
              <RotateCcw size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div
              ref={stateRef}
              className="bg-white p-6 rounded-xl border-2 border-indigo-200 shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-lg">
                <div className="w-1.5 h-6 bg-gradient-to-b from-indigo-500 to-blue-500 rounded-full"></div>
                Status Saat Ini
              </h4>
              <div className="space-y-3">
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Kombinasi:</span>
                  <span className="font-mono text-2xl bg-gradient-to-r from-slate-50 to-slate-100 px-4 py-3 rounded-lg border-2 border-slate-200 shadow-inner text-indigo-700 font-bold">
                    "{step?.current || ''}"
                  </span>
                </div>
                {step?.currentDigit && (
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Digit Aktif:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xl bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg border-2 border-indigo-300 font-bold">
                        {step.currentDigit}
                      </span>
                      <span className="text-slate-400">→</span>
                      <span className="font-mono text-lg text-slate-600 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200">
                        {phoneMap[step.currentDigit]}
                      </span>
                    </div>
                  </div>
                )}
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Aksi:</span>
                  <span
                    className={`font-medium px-4 py-3 rounded-lg border-2 ${actionStyle} transition-all duration-300 shadow-md text-base`}
                  >
                    {step?.description}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div
            ref={treeRef}
            className="bg-white p-6 rounded-xl border-2 border-indigo-200 h-80 overflow-y-auto shadow-lg transition-all duration-300 hover:shadow-xl custom-scrollbar"
          >
            <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-lg sticky top-0 bg-white pb-2">
              <div className="w-1.5 h-6 bg-gradient-to-b from-indigo-500 to-blue-500 rounded-full"></div>
              Pohon Rekursi
            </h4>
            <div style={{ paddingLeft: `${step?.depth * 24}px` }} className="transition-all duration-300">
              <div
                className={`p-3 rounded-lg border-2 inline-block transition-all duration-300 shadow-md font-mono text-sm ${actionStyle}`}
              >
                "{step?.current || ''}"
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #6366f1, #3b82f6);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #4f46e5, #2563eb);
        }
      `}</style>
    </div>
  );
}
