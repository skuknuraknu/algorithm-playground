import { useState } from 'react';
import { Play, RotateCcw, SkipForward } from 'lucide-react';
import { useLanguage } from '../../i18n';

interface CountPrimesSimulatorProps {
  n: number;
}

type Step = {
  type: 'init' | 'mark' | 'check' | 'count' | 'result';
  description: string;
  currentNum?: number;
  isPrime?: boolean[];
  markedIndices?: number[];
  primeCount?: number;
  checkingMultiples?: boolean;
};

export default function CountPrimesSimulator({ n }: CountPrimesSimulatorProps) {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  if (n <= 0) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200 text-center text-slate-500">
        Masukkan nilai n untuk memulai simulasi
      </div>
    );
  }

  if (n > 50) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200 text-center text-amber-700 space-y-2">
        <div className="text-lg font-semibold">⚠️ Nilai terlalu besar untuk simulasi step-by-step</div>
        <div className="text-sm text-slate-600">Gunakan n ≤ 50 untuk melihat animasi detail</div>
        <div className="mt-2 text-slate-700">
          Untuk n = {n}, gunakan tab "Visualize" atau "Practice" sebagai gantinya.
        </div>
      </div>
    );
  }

  const generateSteps = (): Step[] => {
    const steps: Step[] = [];
    const isPrime = new Array(n).fill(true);
    isPrime[0] = false;
    if (n > 1) isPrime[1] = false;

    steps.push({
      type: 'init',
      description: 'Initialize: Create boolean array, set all to true',
      isPrime: [...isPrime],
    });

    steps.push({
      type: 'init',
      description: 'Mark 0 and 1 as not prime (by definition)',
      isPrime: [...isPrime],
    });

    const sqrtN = Math.floor(Math.sqrt(n));

    for (let i = 2; i <= sqrtN; i++) {
      steps.push({
        type: 'check',
        description: `Check if ${i} is prime`,
        currentNum: i,
        isPrime: [...isPrime],
        checkingMultiples: false,
      });

      if (isPrime[i]) {
        steps.push({
          type: 'check',
          description: `${i} is prime! Now mark its multiples as composite`,
          currentNum: i,
          isPrime: [...isPrime],
          checkingMultiples: true,
        });

        const markedNow: number[] = [];
        for (let j = i * i; j < n; j += i) {
          if (isPrime[j]) {
            isPrime[j] = false;
            markedNow.push(j);
          }
        }

        if (markedNow.length > 0) {
          steps.push({
            type: 'mark',
            description: `Mark multiples of ${i}: ${markedNow.join(', ')} as composite`,
            currentNum: i,
            isPrime: [...isPrime],
            markedIndices: markedNow,
          });
        }
      } else {
        steps.push({
          type: 'check',
          description: `${i} already marked as composite, skip`,
          currentNum: i,
          isPrime: [...isPrime],
          checkingMultiples: false,
        });
      }
    }

    steps.push({
      type: 'count',
      description: `Done checking up to √${n} ≈ ${sqrtN}. Now count remaining primes`,
      isPrime: [...isPrime],
    });

    const primeCount = isPrime.filter(p => p).length;

    steps.push({
      type: 'result',
      description: `Found ${primeCount} prime numbers less than ${n}`,
      isPrime: [...isPrime],
      primeCount,
    });

    return steps;
  };

  const steps = generateSteps();
  const step = steps[currentStep];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsPlaying(false);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const handlePlay = () => {
    if (currentStep === steps.length - 1) {
      handleReset();
    }
    setIsPlaying(true);
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length - 1) {
          setIsPlaying(false);
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 800);
  };

  const getNumberColor = (num: number): string => {
    if (!step.isPrime) return 'bg-gray-200 text-gray-700';
    
    if (num === 0 || num === 1) return 'bg-gray-400 text-white';
    
    if (step.markedIndices?.includes(num)) {
      return 'bg-red-500 text-white animate-pulse';
    }
    
    if (step.currentNum === num) {
      return 'bg-yellow-400 text-gray-900 scale-110 shadow-lg';
    }
    
    if (step.isPrime[num]) {
      return 'bg-green-500 text-white';
    }
    
    return 'bg-red-300 text-white';
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200 space-y-6">
      {/* Controls */}
      <div className="flex gap-2">
        <button
          onClick={isPlaying ? () => setIsPlaying(false) : handlePlay}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Play className="w-4 h-4" />
          {isPlaying ? t.pause : t.play}
        </button>
        <button
          onClick={handleNext}
          disabled={currentStep === steps.length - 1}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
        >
          <SkipForward className="w-4 h-4" />
          {t.next}
        </button>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          {t.reset}
        </button>
      </div>

      {/* Progress */}
      <div>
        <div className="flex justify-between text-sm text-slate-600 mb-2">
          <span>{t.step} {currentStep + 1} / {steps.length}</span>
          <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-orange-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Description */}
      <div className={`p-4 rounded-lg border-l-4 ${
        step.type === 'result' 
          ? 'bg-green-50 border-green-500'
          : step.type === 'mark'
          ? 'bg-red-50 border-red-500'
          : 'bg-blue-50 border-blue-500'
      }`}>
        <div className="font-semibold text-slate-900 mb-2">Current Step:</div>
        <div className="text-slate-700">{step.description}</div>
      </div>

      {/* Current Number Info */}
      {step.currentNum !== undefined && (
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-300">
          <div className="text-sm text-slate-600 mb-1">Currently Processing:</div>
          <div className="text-4xl font-bold text-yellow-600">
            {step.currentNum}
            {step.checkingMultiples && ' (Marking multiples...)'}
          </div>
        </div>
      )}

      {/* Number Grid */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">
          Numbers Array (0 to {n - 1}):
        </h3>
        <div className="grid grid-cols-10 gap-2">
          {Array.from({ length: n }, (_, i) => i).map((num) => (
            <div
              key={num}
              className={`aspect-square flex items-center justify-center rounded-lg font-bold text-sm transition-all ${getNumberColor(num)}`}
            >
              {num}
            </div>
          ))}
        </div>
        
        <div className="flex items-center gap-4 mt-3 text-xs flex-wrap text-slate-600">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-gray-400 rounded"></div>
            <span>0, 1</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-yellow-400 rounded"></div>
            <span>Checking</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span>Prime</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-red-400 rounded"></div>
            <span>Composite</span>
          </div>
        </div>
      </div>

      {/* Result Display */}
      {step.type === 'result' && step.primeCount !== undefined && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border-2 border-green-500">
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-800 mb-2">
              🎉 Sieve Complete!
            </div>
            <div className="text-6xl font-bold text-green-600 mb-2">
              {step.primeCount}
            </div>
            <div className="text-gray-600">
              prime number{step.primeCount !== 1 ? 's' : ''} less than {n}
            </div>
          </div>
        </div>
      )}

      {/* Algorithm Info */}
        <div className="bg-purple-50 p-4 rounded-lg text-sm text-slate-700">
        <strong>💡 Algorithm Note:</strong> We only check up to √{n} ≈ {Math.floor(Math.sqrt(n))} 
        because any composite number must have a factor ≤ √n. This optimization reduces the time complexity 
        to O(n log log n).
      </div>
    </div>
  );
}
