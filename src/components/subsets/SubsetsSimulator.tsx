import { useState, useEffect, useMemo } from 'react';
import { Play, Pause, RotateCcw, ChevronRight, ChevronLeft, Layers } from 'lucide-react';

interface SubsetsSimulatorProps {
  nums: number[];
}

interface Step {
  currentSubset: number[];
  index: number; // The index we are considering in nums
  action: 'push' | 'pop' | 'start' | 'add_to_result';
  description: string;
  depth: number;
}

function generateSteps(nums: number[]): Step[] {
  const steps: Step[] = [];
  const n = nums.length;
  
  function backtrack(start: number, current: number[], depth: number) {
    steps.push({
      currentSubset: [...current],
      index: start,
      action: 'add_to_result',
      description: `Tambahkan [${current.join(', ')}] ke hasil`,
      depth
    });

    for (let i = start; i < n; i++) {
      steps.push({
        currentSubset: [...current],
        index: i,
        action: 'start',
        description: `Pertimbangkan menambahkan ${nums[i]}`,
        depth
      });

      current.push(nums[i]);
      steps.push({
        currentSubset: [...current],
        index: i,
        action: 'push',
        description: `Masukkan ${nums[i]} ke subset`,
        depth: depth + 1
      });

      backtrack(i + 1, current, depth + 1);

      current.pop();
      steps.push({
        currentSubset: [...current],
        index: i,
        action: 'pop',
        description: `Kembali: keluarkan ${nums[i]}`,
        depth: depth
      });
    }
  }

  backtrack(0, [], 0);
  return steps;
}

export default function SubsetsSimulator({ nums }: SubsetsSimulatorProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const steps = useMemo(() => generateSteps(nums), [nums]);

  useEffect(() => {
    setCurrentStep(0);
    setIsPlaying(false);
  }, [nums]);

  useEffect(() => {
    let interval: any;
    if (isPlaying && currentStep < steps.length - 1) {
      interval = setInterval(() => {
        setCurrentStep(prev => prev + 1);
      }, 1000);
    } else {
      setIsPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentStep, steps.length]);

  const step = steps[currentStep];

  const actionStyle =
    step?.action === 'add_to_result'
      ? 'text-green-700 bg-green-50 border-green-200'
      : step?.action === 'pop'
        ? 'text-red-700 bg-red-50 border-red-200'
        : 'text-blue-700 bg-blue-50 border-blue-200';

  return (
    <div className="bg-gradient-to-br from-white via-emerald-50 to-teal-50 rounded-2xl p-8 shadow-xl border-2 border-emerald-100 space-y-6 relative overflow-hidden">
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-emerald-200 rounded-full blur-3xl opacity-20"></div>
      
      <div className="relative">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg">
              <Layers className="text-white" size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
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
              className="p-2.5 rounded-lg hover:bg-emerald-50 disabled:opacity-30 disabled:hover:bg-transparent transition-all duration-200 active:scale-95 text-slate-700 hover:text-emerald-600"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 active:scale-95 shadow-md"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button
              onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
              disabled={currentStep === steps.length - 1}
              className="p-2.5 rounded-lg hover:bg-emerald-50 disabled:opacity-30 disabled:hover:bg-transparent transition-all duration-200 active:scale-95 text-slate-700 hover:text-emerald-600"
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
              key={`state-${currentStep}`}
              className="bg-white p-6 rounded-xl border-2 border-emerald-200 shadow-lg transition-all duration-300 hover:shadow-xl"
              style={{ animation: 'fadeSlide 0.35s ease' }}
            >
              <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-lg">
                <div className="w-1.5 h-6 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full"></div>
                Status Saat Ini
              </h4>
              <div className="space-y-3">
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Subset:</span>
                  <span className="font-mono text-lg bg-gradient-to-r from-slate-50 to-slate-100 px-4 py-3 rounded-lg border-2 border-slate-200 shadow-inner">
                    [{step?.currentSubset.join(', ')}]
                  </span>
                </div>
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
            key={`tree-${currentStep}`}
            className="bg-white p-6 rounded-xl border-2 border-emerald-200 h-80 overflow-y-auto shadow-lg transition-all duration-300 hover:shadow-xl custom-scrollbar"
            style={{ animation: 'fadeSlide 0.4s ease' }}
          >
            <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-lg sticky top-0 bg-white pb-2">
              <div className="w-1.5 h-6 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full"></div>
              Tumpukan / Pohon Rekursi
            </h4>
            <div style={{ paddingLeft: `${step?.depth * 24}px` }} className="transition-all duration-300">
              <div
                className={`p-3 rounded-lg border-2 inline-block transition-all duration-300 shadow-md font-mono text-sm ${actionStyle}`}
                style={{ animation: 'popGlow 0.45s ease' }}
              >
                kini: [{step?.currentSubset.join(', ')}]
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes popGlow {
          0% { transform: scale(0.97); box-shadow: 0 0 0 rgba(16,185,129,0.2); }
          60% { transform: scale(1.02); box-shadow: 0 10px 30px rgba(16,185,129,0.15); }
          100% { transform: scale(1); box-shadow: 0 4px 12px rgba(15,23,42,0.08); }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #10b981, #14b8a6);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #059669, #0d9488);
        }
      `}</style>
    </div>
  );
}
