import { useState, useEffect, useMemo, useRef } from 'react';
import { Play, Pause, RotateCcw, ChevronRight, ChevronLeft, Layers } from 'lucide-react';
import gsap from 'gsap';

interface CombinationSumSimulatorProps {
  candidates: number[];
  target: number;
}

interface Step {
  current: number[];
  currentSum: number;
  index: number;
  action: 'start' | 'add' | 'found' | 'skip' | 'backtrack' | 'prune';
  description: string;
  depth: number;
  candidate?: number;
}

function generateSteps(candidates: number[], target: number): Step[] {
  const steps: Step[] = [];
  
  function backtrack(start: number, current: number[], currentSum: number, depth: number) {
    if (currentSum === target) {
      steps.push({
        current: [...current],
        currentSum,
        index: start,
        action: 'found',
        description: `✓ Solusi ditemukan: [${current.join(',')}] = ${target}`,
        depth
      });
      return;
    }
    
    if (currentSum > target) {
      steps.push({
        current: [...current],
        currentSum,
        index: start,
        action: 'prune',
        description: `✗ Sum ${currentSum} > ${target}, prune branch`,
        depth
      });
      return;
    }

    for (let i = start; i < candidates.length; i++) {
      const candidate = candidates[i];
      
      steps.push({
        current: [...current],
        currentSum,
        index: i,
        action: 'start',
        description: `Pertimbangkan kandidat ${candidate}`,
        depth,
        candidate
      });

      current.push(candidate);
      steps.push({
        current: [...current],
        currentSum: currentSum + candidate,
        index: i,
        action: 'add',
        description: `Tambahkan ${candidate}, sum = ${currentSum + candidate}`,
        depth: depth + 1,
        candidate
      });

      backtrack(i, current, currentSum + candidate, depth + 1);

      current.pop();
      steps.push({
        current: [...current],
        currentSum,
        index: i,
        action: 'backtrack',
        description: `Backtrack, remove ${candidate}`,
        depth
      });
    }
  }

  if (candidates.length > 0 && target > 0) {
    backtrack(0, [], 0, 0);
  }
  
  return steps;
}

export default function CombinationSumSimulator({ candidates, target }: CombinationSumSimulatorProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const steps = useMemo(() => generateSteps(candidates, target), [candidates, target]);
  const stateRef = useRef<HTMLDivElement>(null);
  const numbersRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    setCurrentStep(0);
    setIsPlaying(false);
  }, [candidates, target]);

  useEffect(() => {
    let interval: any;
    if (isPlaying && currentStep < steps.length - 1) {
      interval = setInterval(() => {
        setCurrentStep(prev => prev + 1);
      }, 1400);
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
        { opacity: 0, scale: 0.9, rotateY: -15 },
        { opacity: 1, scale: 1, rotateY: 0, duration: 0.5, ease: 'back.out(1.5)' }
      );
    }

    // Animate numbers in current array
    numbersRef.current.forEach((el, idx) => {
      if (el) {
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.5, y: -20 },
          { 
            opacity: 1, 
            scale: 1, 
            y: 0, 
            duration: 0.4, 
            delay: idx * 0.1,
            ease: 'elastic.out(1, 0.6)' 
          }
        );
      }
    });
  }, [currentStep]);

  const step = steps[currentStep];

  const actionStyle =
    step?.action === 'found'
      ? 'text-green-700 bg-green-50 border-green-300'
      : step?.action === 'prune'
        ? 'text-red-700 bg-red-50 border-red-300'
        : step?.action === 'backtrack'
          ? 'text-orange-700 bg-orange-50 border-orange-300'
          : step?.action === 'add'
            ? 'text-rose-700 bg-rose-50 border-rose-300'
            : 'text-blue-700 bg-blue-50 border-blue-300';

  if (steps.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-slate-200">
        <div className="text-center text-slate-500 py-8">
          <p className="text-lg">Masukkan candidates dan target untuk simulasi</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-white via-rose-50 to-pink-50 rounded-2xl p-8 shadow-xl border-2 border-rose-100 space-y-6 relative overflow-hidden">
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-rose-200 rounded-full blur-3xl opacity-20"></div>
      
      <div className="relative">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl shadow-lg">
              <Layers className="text-white" size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
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
              className="p-2.5 rounded-lg hover:bg-rose-50 disabled:opacity-30 disabled:hover:bg-transparent transition-all duration-200 active:scale-95 text-slate-700 hover:text-rose-600"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2.5 rounded-lg bg-gradient-to-r from-rose-500 to-pink-600 text-white hover:from-rose-600 hover:to-pink-700 transition-all duration-200 active:scale-95 shadow-md"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button
              onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
              disabled={currentStep === steps.length - 1}
              className="p-2.5 rounded-lg hover:bg-rose-50 disabled:opacity-30 disabled:hover:bg-transparent transition-all duration-200 active:scale-95 text-slate-700 hover:text-rose-600"
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
              className="bg-white p-6 rounded-xl border-2 border-rose-200 shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-lg">
                <div className="w-1.5 h-6 bg-gradient-to-b from-rose-500 to-pink-500 rounded-full"></div>
                Status Saat Ini
              </h4>
              <div className="space-y-3">
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Array:</span>
                  <div className="flex gap-2 flex-wrap min-h-[60px] bg-gradient-to-r from-slate-50 to-slate-100 p-3 rounded-lg border-2 border-slate-200">
                    {step?.current.length > 0 ? (
                      step.current.map((num, idx) => (
                        <div
                          key={idx}
                          ref={el => numbersRef.current[idx] = el}
                          className="px-4 py-2 bg-gradient-to-br from-rose-500 to-pink-600 text-white rounded-lg font-mono font-bold shadow-md"
                        >
                          {num}
                        </div>
                      ))
                    ) : (
                      <span className="text-slate-400 text-sm self-center">[ ]</span>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-semibold text-slate-500 uppercase">Sum:</span>
                    <div className={`px-4 py-2 rounded-lg font-mono font-bold text-lg border-2 ${
                      step?.currentSum === target 
                        ? 'bg-green-100 text-green-700 border-green-300' 
                        : step?.currentSum > target
                          ? 'bg-red-100 text-red-700 border-red-300'
                          : 'bg-blue-100 text-blue-700 border-blue-300'
                    }`}>
                      {step?.currentSum || 0}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-semibold text-slate-500 uppercase">Target:</span>
                    <div className="px-4 py-2 bg-gradient-to-br from-pink-500 to-rose-500 text-white rounded-lg font-mono font-bold text-lg border-2 border-pink-600">
                      {target}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Aksi:</span>
                  <span
                    className={`font-medium px-4 py-3 rounded-lg border-2 ${actionStyle} transition-all duration-300 shadow-md text-sm`}
                  >
                    {step?.description}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border-2 border-rose-200 h-80 overflow-y-auto shadow-lg transition-all duration-300 hover:shadow-xl custom-scrollbar-rose">
            <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-lg sticky top-0 bg-white pb-2">
              <div className="w-1.5 h-6 bg-gradient-to-b from-rose-500 to-pink-500 rounded-full"></div>
              Pohon Rekursi
            </h4>
            <div style={{ paddingLeft: `${step?.depth * 20}px` }} className="transition-all duration-300">
              <div
                className={`p-3 rounded-lg border-2 inline-block transition-all duration-300 shadow-md font-mono text-sm ${actionStyle}`}
              >
                [{step?.current.join(',') || ''}] = {step?.currentSum || 0}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        .custom-scrollbar-rose::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar-rose::-webkit-scrollbar-track {
          background: #fff1f2;
          border-radius: 10px;
        }
        .custom-scrollbar-rose::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #f43f5e, #ec4899);
          border-radius: 10px;
        }
        .custom-scrollbar-rose::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #e11d48, #db2777);
        }
      `}</style>
    </div>
  );
}
