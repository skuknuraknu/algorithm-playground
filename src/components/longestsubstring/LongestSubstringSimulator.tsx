import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react';
import { gsap } from 'gsap';
import { useLanguage } from '../../i18n';

interface LongestSubstringSimulatorProps {
  str: string;
}

interface SimulationStep {
  left: number;
  right: number;
  currentWindow: string;
  seen: Map<string, number>;
  maxLen: number;
  maxSubstring: string;
  message: string;
  action: 'expand' | 'contract' | 'update' | 'done';
}

export default function LongestSubstringSimulator({ str }: LongestSubstringSimulatorProps) {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [steps, setSteps] = useState<SimulationStep[]>([]);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const messageRef = useRef<HTMLDivElement | null>(null);
  const currentWindowRef = useRef<HTMLDivElement | null>(null);
  const maxWindowRef = useRef<HTMLDivElement | null>(null);
  const charRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    generateSteps();
  }, [str]);

  useEffect(() => {
    charRefs.current = [];
  }, [str]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && currentStep < steps.length - 1) {
      timer = setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, 2000);
    } else if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, steps.length]);

  const generateSteps = () => {
    if (!str) {
      setSteps([]);
      return;
    }

    const newSteps: SimulationStep[] = [];
    const seen = new Map<string, number>();
    let maxLen = 0;
    let maxSubstring = '';
    let left = 0;

    // Initial state
    newSteps.push({
      left: 0,
      right: 0,
      currentWindow: '',
      seen: new Map(),
      maxLen: 0,
      maxSubstring: '',
      message: 'Mulai: left = 0, right = 0, maxLen = 0',
      action: 'expand',
    });

    for (let right = 0; right < str.length; right++) {
      const char = str[right];

      // Check if character is already in window
      if (seen.has(char) && seen.get(char)! >= left) {
        const oldLeft = left;
        left = seen.get(char)! + 1;
        
        newSteps.push({
          left: oldLeft,
          right,
          currentWindow: str.slice(oldLeft, right),
          seen: new Map(seen),
          maxLen,
          maxSubstring,
          message: `Duplikasi '${char}' di indeks ${right}. Perkecil jendela dulu.`,
          action: 'contract',
        });

        newSteps.push({
          left,
          right,
          currentWindow: str.slice(left, right),
          seen: new Map(seen),
          maxLen,
          maxSubstring,
          message: `Geser left dari ${oldLeft} ke ${left} (melewati '${char}' sebelumnya).`,
          action: 'contract',
        });
      } else {
        newSteps.push({
          left,
          right,
          currentWindow: str.slice(left, right),
          seen: new Map(seen),
          maxLen,
          maxSubstring,
          message: `Karakter '${char}' di indeks ${right} masih unik di jendela.`,
          action: 'expand',
        });
      }

      seen.set(char, right);
      const currentLen = right - left + 1;

      if (currentLen > maxLen) {
        maxLen = currentLen;
        maxSubstring = str.slice(left, right + 1);
        
        newSteps.push({
          left,
          right,
          currentWindow: str.slice(left, right + 1),
          seen: new Map(seen),
          maxLen,
          maxSubstring,
          message: `Rekor baru! Substring "${maxSubstring}" dengan panjang ${maxLen}.`,
          action: 'update',
        });
      } else {
        newSteps.push({
          left,
          right,
          currentWindow: str.slice(left, right + 1),
          seen: new Map(seen),
          maxLen,
          maxSubstring,
          message: `Jendela sekarang: "${str.slice(left, right + 1)}" (panjang: ${currentLen}).`,
          action: 'expand',
        });
      }
    }

    // Final state
    newSteps.push({
      left,
      right: str.length - 1,
      currentWindow: maxSubstring,
      seen: new Map(seen),
      maxLen,
      maxSubstring,
      message: `Selesai! Substring terpanjang: "${maxSubstring}" dengan panjang ${maxLen}.`,
      action: 'done',
    });

    setSteps(newSteps);
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const progress = steps.length ? ((currentStep + 1) / steps.length) * 100 : 0;

  useLayoutEffect(() => {
    if (progressRef.current) {
      gsap.to(progressRef.current, {
        width: `${progress}%`,
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  }, [progress]);

  useLayoutEffect(() => {
    if (messageRef.current) {
      gsap.fromTo(
        messageRef.current,
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35, ease: 'power2.out' }
      );
    }

    if (currentWindowRef.current) {
      gsap.fromTo(
        currentWindowRef.current,
        { scale: 0.98, boxShadow: '0 0 0 rgba(0,0,0,0)' },
        { scale: 1, boxShadow: '0 10px 25px rgba(124,58,237,0.15)', duration: 0.35, ease: 'power2.out' }
      );
    }

    if (maxWindowRef.current) {
      gsap.fromTo(
        maxWindowRef.current,
        { scale: 0.98, boxShadow: '0 0 0 rgba(0,0,0,0)' },
        { scale: 1, boxShadow: '0 10px 25px rgba(34,197,94,0.15)', duration: 0.35, ease: 'power2.out' }
      );
    }
  }, [currentStep, steps]);

  useLayoutEffect(() => {
    if (!steps.length) return;
    charRefs.current.forEach((el, idx) => {
      if (!el) return;
      const inWindow = idx >= steps[currentStep].left && idx <= steps[currentStep].right;
      gsap.to(el, {
        scale: inWindow ? 1.08 : 1,
        boxShadow: inWindow ? '0 12px 30px rgba(124,58,237,0.25)' : '0 0 0 rgba(0,0,0,0)',
        duration: 0.35,
        ease: 'power2.out',
      });
    });
  }, [currentStep, steps]);

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const handleStepForward = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  if (steps.length === 0 || !str) {
    return (
      <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6 text-center">
        <p className="text-yellow-800 font-semibold">Masukkan string terlebih dulu untuk memulai simulasi.</p>
      </div>
    );
  }

  const step = steps[currentStep];

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
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

        {/* Progress bar */}
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div
            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
            ref={progressRef}
          />
        </div>
      </div>

      {/* Visualization */}
      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
        <div className="mb-6">
          <div
            className={`text-lg font-bold p-4 rounded-lg ${
              step.action === 'done'
                ? 'bg-green-50 text-green-800 border-2 border-green-300'
                : step.action === 'update'
                ? 'bg-purple-50 text-purple-800 border-2 border-purple-300'
                : step.action === 'contract'
                ? 'bg-red-50 text-red-800 border-2 border-red-300'
                : 'bg-blue-50 text-blue-800 border-2 border-blue-300'
            }`}
            ref={messageRef}
          >
            {step.message}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {str.split('').map((char, index) => {
            const isLeft = index === step.left;
            const isRight = index === step.right;
            const inWindow = index >= step.left && index <= step.right;

            return (
              <div key={index} className="flex flex-col items-center gap-2">
                <div
                  ref={(el) => {
                    charRefs.current[index] = el;
                  }}
                  className={`w-12 h-12 flex items-center justify-center rounded-lg font-mono text-xl font-bold shadow-lg transition-all ${
                    inWindow
                      ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white border-4 border-purple-600'
                      : 'bg-slate-200 text-slate-600 border-2 border-slate-300'
                  } ${
                    isLeft
                      ? 'ring-4 ring-green-400 ring-offset-2 scale-110'
                      : ''
                  } ${
                    isRight
                      ? 'ring-4 ring-yellow-400 ring-offset-2 scale-110'
                      : ''
                  }`}
                >
                  {char}
                </div>
                <div className="text-xs font-mono text-slate-500">
                  [{index}]
                </div>
                {isLeft && (
                  <div className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded">
                    Left
                  </div>
                )}
                {isRight && (
                  <div className="text-xs font-bold text-yellow-600 bg-yellow-100 px-2 py-1 rounded">
                    Right
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Window Info */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-purple-50 rounded-lg p-4 border-2 border-purple-300" ref={currentWindowRef}>
            <div className="text-sm text-slate-600 mb-1">Jendela Saat Ini</div>
            <div className="text-2xl font-bold text-purple-700 font-mono">
              "{step.currentWindow}"
            </div>
            <div className="text-sm text-slate-600 mt-1">
              Panjang: {step.currentWindow.length}
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-4 border-2 border-green-300" ref={maxWindowRef}>
            <div className="text-sm text-slate-600 mb-1">Maksimum Ditemukan</div>
            <div className="text-2xl font-bold text-green-700 font-mono">
              "{step.maxSubstring}"
            </div>
            <div className="text-sm text-slate-600 mt-1">
              Panjang: {step.maxLen}
            </div>
          </div>
        </div>

        {/* Seen Characters */}
        <div className="mt-4 bg-slate-50 rounded-lg p-4 border-2 border-slate-200">
          <div className="text-sm font-semibold text-slate-600 mb-2">
            Isi Hash Map (karakter → indeks terakhir):
          </div>
          <div className="flex flex-wrap gap-2">
            {Array.from(step.seen.entries()).map(([char, index]) => (
              <div
                key={char}
                className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded font-mono text-sm border-2 border-indigo-300"
              >
                '{char}' → {index}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
