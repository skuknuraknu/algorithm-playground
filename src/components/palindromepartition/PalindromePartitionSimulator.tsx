import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Play, RotateCcw, Pause, Scissors, Sparkles, CheckCircle2, XCircle } from 'lucide-react';

interface PalindromePartitionSimulatorProps {
  inputString: string;
}

interface Step {
  description: string;
  currentPartition: string[];
  startIndex: number;
  substring: string;
  isPalindrome: boolean;
  type: 'check' | 'add' | 'backtrack' | 'complete';
}

function isPalindrome(s: string): boolean {
  let left = 0;
  let right = s.length - 1;
  while (left < right) {
    if (s[left] !== s[right]) return false;
    left++;
    right--;
  }
  return true;
}

function generateSteps(s: string): Step[] {
  const steps: Step[] = [];
  const result: string[][] = [];

  function backtrack(start: number, currentPartition: string[]) {
    if (start === s.length) {
      result.push([...currentPartition]);
      steps.push({
        description: `✓ Mencapai akhir string! Menambahkan partisi ke hasil`,
        currentPartition: [...currentPartition],
        startIndex: start,
        substring: '',
        isPalindrome: true,
        type: 'complete'
      });
      return;
    }

    for (let end = start + 1; end <= s.length; end++) {
      const substring = s.substring(start, end);
      const palindromeCheck = isPalindrome(substring);
      
      steps.push({
        description: `Memeriksa substring "${substring}" dari index ${start} ke ${end - 1}`,
        currentPartition: [...currentPartition],
        startIndex: start,
        substring: substring,
        isPalindrome: palindromeCheck,
        type: 'check'
      });

      if (palindromeCheck) {
        currentPartition.push(substring);
        steps.push({
          description: `"${substring}" adalah palindrome! Menambahkan ke partisi`,
          currentPartition: [...currentPartition],
          startIndex: start,
          substring: substring,
          isPalindrome: true,
          type: 'add'
        });
        
        backtrack(end, currentPartition);
        
        currentPartition.pop();
        steps.push({
          description: `Backtrack: menghapus "${substring}" dari partisi`,
          currentPartition: [...currentPartition],
          startIndex: start,
          substring: substring,
          isPalindrome: true,
          type: 'backtrack'
        });
      }
    }
  }

  backtrack(0, []);
  return steps;
}

export default function PalindromePartitionSimulator({ inputString }: PalindromePartitionSimulatorProps) {
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const stepRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (inputString && inputString.length > 0) {
      const newSteps = generateSteps(inputString);
      setSteps(newSteps);
      setCurrentStep(0);
      setIsPlaying(false);
    }
  }, [inputString]);

  useEffect(() => {
    if (stepRef.current && steps.length > 0) {
      const currentCard = stepRef.current.querySelector('.current-step-card');
      if (currentCard) {
        gsap.fromTo(
          currentCard,
          {
            scale: 0.95,
            opacity: 0,
            rotateY: -10
          },
          {
            scale: 1,
            opacity: 1,
            rotateY: 0,
            duration: 0.4,
            ease: 'back.out(1.7)'
          }
        );
      }
    }
  }, [currentStep, steps]);

  useEffect(() => {
    if (isPlaying && currentStep < steps.length - 1) {
      intervalRef.current = window.setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, currentStep, steps.length, speed]);

  const handlePlayPause = () => {
    if (currentStep >= steps.length - 1) {
      setCurrentStep(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  if (steps.length === 0) {
    return (
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-12 shadow-xl border-2 border-slate-200">
        <div className="text-center text-slate-400">
          <Sparkles size={64} className="mx-auto mb-4 opacity-30" />
          <p className="text-lg">Masukkan string untuk memulai simulasi...</p>
        </div>
      </div>
    );
  }

  const currentStepData = steps[currentStep];
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'check': return 'from-blue-500 to-cyan-600';
      case 'add': return 'from-green-500 to-emerald-600';
      case 'backtrack': return 'from-orange-500 to-amber-600';
      case 'complete': return 'from-purple-500 to-fuchsia-600';
      default: return 'from-slate-500 to-slate-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-gradient-to-br from-purple-50 to-fuchsia-50 rounded-2xl p-6 shadow-xl border-2 border-purple-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Scissors className="text-purple-600" size={24} />
            <div>
              <h3 className="text-xl font-bold text-slate-800">Simulasi Backtracking</h3>
              <p className="text-sm text-slate-500">
                Langkah {currentStep + 1} dari {steps.length}
              </p>
            </div>
          </div>
          <div className="px-4 py-2 bg-white rounded-lg border-2 border-purple-200 shadow-sm">
            <p className="text-xs text-slate-500">Kecepatan</p>
            <select
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="text-sm font-semibold text-purple-600 bg-transparent border-none outline-none cursor-pointer"
            >
              <option value={2000}>0.5x</option>
              <option value={1000}>1x</option>
              <option value={500}>2x</option>
              <option value={250}>4x</option>
            </select>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handlePlayPause}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-500 to-fuchsia-600 hover:from-purple-600 hover:to-fuchsia-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            {isPlaying ? 'Pause' : currentStep >= steps.length - 1 ? 'Restart' : 'Play'}
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-3 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-xl border-2 border-purple-200 transition-all duration-300 hover:scale-105 active:scale-95 shadow-md"
          >
            <RotateCcw size={18} />
          </button>
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="px-4 py-3 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-xl border-2 border-purple-200 transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            ←
          </button>
          <button
            onClick={handleNext}
            disabled={currentStep >= steps.length - 1}
            className="px-4 py-3 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-xl border-2 border-purple-200 transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            →
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 bg-white rounded-full h-2 overflow-hidden shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-fuchsia-600 transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Current Step Visualization */}
      <div ref={stepRef}>
        <div className={`current-step-card bg-gradient-to-br ${getTypeColor(currentStepData.type)} rounded-2xl p-8 shadow-2xl text-white`}>
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              {currentStepData.type === 'check' && <Scissors size={28} />}
              {currentStepData.type === 'add' && <CheckCircle2 size={28} />}
              {currentStepData.type === 'backtrack' && <RotateCcw size={28} />}
              {currentStepData.type === 'complete' && <Sparkles size={28} />}
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold mb-2 text-white/80 uppercase tracking-wide">
                {currentStepData.type === 'check' && 'Memeriksa'}
                {currentStepData.type === 'add' && 'Menambahkan'}
                {currentStepData.type === 'backtrack' && 'Backtracking'}
                {currentStepData.type === 'complete' && 'Selesai'}
              </div>
              <p className="text-xl font-bold leading-relaxed">
                {currentStepData.description}
              </p>
            </div>
          </div>

          {/* Substring Check Visualization */}
          {currentStepData.substring && currentStepData.type === 'check' && (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border-2 border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/70 mb-2">Substring yang diperiksa:</p>
                  <p className="text-3xl font-bold font-mono">{currentStepData.substring}</p>
                </div>
                <div className="flex items-center gap-2">
                  {currentStepData.isPalindrome ? (
                    <>
                      <CheckCircle2 size={32} className="text-green-300" />
                      <span className="text-lg font-semibold">Palindrome!</span>
                    </>
                  ) : (
                    <>
                      <XCircle size={32} className="text-red-300" />
                      <span className="text-lg font-semibold">Bukan Palindrome</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Current Partition */}
          {currentStepData.currentPartition.length > 0 && (
            <div className="mt-4 bg-white/10 backdrop-blur-sm rounded-xl p-6 border-2 border-white/20">
              <p className="text-sm text-white/70 mb-3">Partisi saat ini:</p>
              <div className="flex items-center gap-2 flex-wrap">
                {currentStepData.currentPartition.map((part, idx) => (
                  <div key={idx} className="flex items-center">
                    <div className="px-4 py-2 bg-white/20 border-2 border-white/40 rounded-lg font-mono text-white font-bold shadow-lg backdrop-blur-sm">
                      "{part}"
                    </div>
                    {idx < currentStepData.currentPartition.length - 1 && (
                      <Scissors className="mx-2 text-white/50" size={16} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input String Display */}
      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-purple-100">
        <p className="text-sm text-slate-500 mb-2">Input String:</p>
        <div className="flex gap-1">
          {inputString.split('').map((char, idx) => (
            <div
              key={idx}
              className={`w-12 h-12 flex items-center justify-center font-mono text-lg font-bold rounded-lg border-2 transition-all ${
                idx === currentStepData.startIndex
                  ? 'bg-purple-100 border-purple-400 text-purple-700 scale-110 shadow-lg'
                  : 'bg-slate-50 border-slate-200 text-slate-600'
              }`}
            >
              {char}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
