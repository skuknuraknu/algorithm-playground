import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react';
import gsap from 'gsap';
import { useLanguage } from '../../i18n';

interface FindPositionSimulatorProps {
  nums: number[];
  target: number;
}

interface SimulationStep {
  left: number;
  right: number;
  mid: number;
  phase: 'first' | 'last' | 'done';
  message: string;
  firstPos: number;
  lastPos: number;
  comparing?: boolean;
}

export default function FindPositionSimulator({ nums, target }: FindPositionSimulatorProps) {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [steps, setSteps] = useState<SimulationStep[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const visualizationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, []);

  useEffect(() => {
    if (controlsRef.current && visualizationRef.current) {
      gsap.fromTo([controlsRef.current, visualizationRef.current],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out", delay: 0.2 }
      );
    }
  }, []);

  useEffect(() => {
    generateSteps();
  }, [nums, target]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && currentStep < steps.length - 1) {
      timer = setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, 1800);
    } else if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, steps.length]);

  const generateSteps = () => {
    if (nums.length === 0) {
      setSteps([]);
      return;
    }

    const newSteps: SimulationStep[] = [];
    let firstPos = -1;
    let lastPos = -1;

    // Phase 1: Find first position
    newSteps.push({
      left: 0,
      right: nums.length - 1,
      mid: -1,
      phase: 'first',
      message: 'Fase 1: Mencari posisi PERTAMA dari target',
      firstPos: -1,
      lastPos: -1,
    });

    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      
      newSteps.push({
        left,
        right,
        mid,
        phase: 'first',
        message: `Cek tengah: nums[${mid}] = ${nums[mid]}`,
        firstPos,
        lastPos,
        comparing: true,
      });

      if (nums[mid] === target) {
        firstPos = mid;
        newSteps.push({
          left,
          right,
          mid,
          phase: 'first',
          message: `Target ketemu! Simpan posisi ${mid} dan cari lagi ke KIRI untuk kemunculan lebih awal`,
          firstPos,
          lastPos,
        });
        right = mid - 1;
      } else if (nums[mid] < target) {
        newSteps.push({
          left,
          right,
          mid,
          phase: 'first',
          message: `nums[${mid}] < target, cari di separuh KANAN`,
          firstPos,
          lastPos,
        });
        left = mid + 1;
      } else {
        newSteps.push({
          left,
          right,
          mid,
          phase: 'first',
          message: `nums[${mid}] > target, cari di separuh KIRI`,
          firstPos,
          lastPos,
        });
        right = mid - 1;
      }
    }

    newSteps.push({
      left,
      right,
      mid: -1,
      phase: 'first',
      message: `Posisi pertama ditemukan: ${firstPos}`,
      firstPos,
      lastPos,
    });

    if (firstPos === -1) {
      newSteps.push({
        left: 0,
        right: nums.length - 1,
        mid: -1,
        phase: 'done',
        message: 'Target tidak ditemukan di array. Hasil: [-1, -1]',
        firstPos: -1,
        lastPos: -1,
      });
      setSteps(newSteps);
      setCurrentStep(0);
      return;
    }

    // Phase 2: Find last position
    newSteps.push({
      left: 0,
      right: nums.length - 1,
      mid: -1,
      phase: 'last',
      message: 'Fase 2: Mencari posisi TERAKHIR dari target',
      firstPos,
      lastPos: -1,
    });

    left = 0;
    right = nums.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      
      newSteps.push({
        left,
        right,
        mid,
        phase: 'last',
        message: `Cek tengah: nums[${mid}] = ${nums[mid]}`,
        firstPos,
        lastPos,
        comparing: true,
      });

      if (nums[mid] === target) {
        lastPos = mid;
        newSteps.push({
          left,
          right,
          mid,
          phase: 'last',
          message: `Target ketemu! Simpan posisi ${mid} dan cari lagi ke KANAN untuk kemunculan lebih akhir`,
          firstPos,
          lastPos,
        });
        left = mid + 1;
      } else if (nums[mid] < target) {
        newSteps.push({
          left,
          right,
          mid,
          phase: 'last',
          message: `nums[${mid}] < target, cari di separuh KANAN`,
          firstPos,
          lastPos,
        });
        left = mid + 1;
      } else {
        newSteps.push({
          left,
          right,
          mid,
          phase: 'last',
          message: `nums[${mid}] > target, cari di separuh KIRI`,
          firstPos,
          lastPos,
        });
        right = mid - 1;
      }
    }

    newSteps.push({
      left,
      right,
      mid: -1,
      phase: 'done',
      message: `Selesai! Posisi awal: ${firstPos}, Posisi akhir: ${lastPos}`,
      firstPos,
      lastPos,
    });

    setSteps(newSteps);
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const handleStepForward = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  if (steps.length === 0 || nums.length === 0) {
    return (
      <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6 text-center">
        <p className="text-yellow-800 font-semibold">Silakan tambahkan angka ke array untuk memulai simulasi.</p>
      </div>
    );
  }

  const step = steps[currentStep];

  return (
    <div ref={containerRef} className="space-y-6">
      {/* Controls */}
      <div ref={controlsRef} className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-semibold text-slate-600">
            {t.step} {currentStep + 1} / {steps.length}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 ${
                isPlaying
                  ? 'bg-orange-600 hover:bg-orange-700 text-white'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              {isPlaying ? t.pause : t.play}
            </button>
            <button
              onClick={handleStepForward}
              disabled={currentStep >= steps.length - 1}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
            >
              <SkipForward size={20} />
            </button>
            <button
              onClick={handleReset}
              className="bg-slate-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-slate-700 transition-colors"
            >
              <RotateCcw size={20} />
            </button>
          </div>
        </div>

        <div className="w-full bg-slate-200 rounded-full h-2">
          <div
            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Visualization */}
      <div ref={visualizationRef} className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
        <div className="mb-6">
          <div
            className={`text-lg font-bold p-4 rounded-lg transition-colors duration-300 ${
              step.phase === 'done'
                ? 'bg-green-50 text-green-800 border-2 border-green-300'
                : step.phase === 'last'
                ? 'bg-purple-50 text-purple-800 border-2 border-purple-300'
                : 'bg-blue-50 text-blue-800 border-2 border-blue-300'
            }`}
          >
            {step.message}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {nums.map((num, index) => {
            const isLeft = index === step.left && step.phase !== 'done';
            const isRight = index === step.right && step.phase !== 'done';
            const isMid = index === step.mid;
            const isTarget = num === target;
            const isFirst = index === step.firstPos;
            const isLast = index === step.lastPos;

            return (
              <div key={index} className="flex flex-col items-center gap-2">
                <div
                  className={`w-14 h-14 flex items-center justify-center rounded-lg font-mono text-xl font-bold shadow-lg transition-all ${
                    isTarget
                      ? 'bg-indigo-500 text-white border-4 border-indigo-600'
                      : 'bg-slate-200 text-slate-600 border-2 border-slate-300'
                  } ${
                    isMid
                      ? 'ring-4 ring-yellow-400 ring-offset-2 scale-125'
                      : ''
                  } ${
                    isFirst || isLast
                      ? 'ring-4 ring-green-400 ring-offset-2'
                      : ''
                  }`}
                >
                  {num}
                </div>
                <div className="text-xs font-mono text-slate-500">
                  [{index}]
                </div>
                {isLeft && (
                  <div className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded">
                    Left
                  </div>
                )}
                {isRight && (
                  <div className="text-xs font-bold text-red-600 bg-red-100 px-2 py-1 rounded">
                    Right
                  </div>
                )}
                {isMid && (
                  <div className="text-xs font-bold text-yellow-600 bg-yellow-100 px-2 py-1 rounded">
                    Mid
                  </div>
                )}
                {isFirst && step.firstPos !== -1 && (
                  <div className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded">
                    First
                  </div>
                )}
                {isLast && step.lastPos !== -1 && step.lastPos !== step.firstPos && (
                  <div className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded">
                    Last
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Search Info */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-300">
            <div className="text-sm text-slate-600 mb-1">Left Pointer</div>
            <div className="text-2xl font-bold text-blue-700">{step.left}</div>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4 border-2 border-yellow-300">
            <div className="text-sm text-slate-600 mb-1">Mid Pointer</div>
            <div className="text-2xl font-bold text-yellow-700">
              {step.mid === -1 ? 'N/A' : step.mid}
            </div>
          </div>
          <div className="bg-red-50 rounded-lg p-4 border-2 border-red-300">
            <div className="text-sm text-slate-600 mb-1">Right Pointer</div>
            <div className="text-2xl font-bold text-red-700">{step.right}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-green-50 rounded-lg p-4 border-2 border-green-300">
            <div className="text-sm text-slate-600 mb-1">First Position</div>
            <div className="text-2xl font-bold text-green-700">
              {step.firstPos === -1 ? 'Not found yet' : step.firstPos}
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-4 border-2 border-green-300">
            <div className="text-sm text-slate-600 mb-1">Last Position</div>
            <div className="text-2xl font-bold text-green-700">
              {step.lastPos === -1 ? 'Not found yet' : step.lastPos}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
