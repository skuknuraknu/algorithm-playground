import { useState } from 'react';
import { Play, RotateCcw, SkipForward } from 'lucide-react';
import { useLanguage } from '../../i18n';

interface MissingNumberSimulatorProps {
  nums: number[];
}

type Step = {
  type: 'math' | 'xor' | 'result';
  description: string;
  currentSum?: number;
  expectedSum?: number;
  xorResult?: number;
  xorValues?: string;
  missing?: number;
  highlight?: number[];
};

export default function MissingNumberSimulator({ nums }: MissingNumberSimulatorProps) {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<'math' | 'xor'>('math');

  if (nums.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        Masukkan array untuk memulai simulasi
      </div>
    );
  }

  const n = nums.length;

  // Generate steps for Math approach
  const generateMathSteps = (): Step[] => {
    const steps: Step[] = [];
    const expectedSum = (n * (n + 1)) / 2;

    steps.push({
      type: 'math',
      description: `Calculate expected sum using Gauss formula: n × (n + 1) / 2`,
      expectedSum,
      highlight: [],
    });

    let currentSum = 0;
    nums.forEach((num, idx) => {
      currentSum += num;
      steps.push({
        type: 'math',
        description: `Add nums[${idx}] = ${num} to sum`,
        currentSum,
        expectedSum,
        highlight: [idx],
      });
    });

    steps.push({
      type: 'result',
      description: `Missing number = Expected Sum - Actual Sum`,
      expectedSum,
      currentSum,
      missing: expectedSum - currentSum,
    });

    return steps;
  };

  // Generate steps for XOR approach
  const generateXorSteps = (): Step[] => {
    const steps: Step[] = [];
    let xorResult = 0;

    steps.push({
      type: 'xor',
      description: 'Initialize XOR result = 0',
      xorResult: 0,
      xorValues: '0',
    });

    // XOR with indices
    for (let i = 0; i <= n; i++) {
      xorResult ^= i;
      steps.push({
        type: 'xor',
        description: `XOR with index ${i}`,
        xorResult,
        xorValues: `... ⊕ ${i}`,
      });
    }

    // XOR with array elements
    nums.forEach((num, idx) => {
      xorResult ^= num;
      steps.push({
        type: 'xor',
        description: `XOR with nums[${idx}] = ${num}`,
        xorResult,
        xorValues: `... ⊕ ${num}`,
        highlight: [idx],
      });
    });

    steps.push({
      type: 'result',
      description: 'Result is the missing number (all others cancelled out)',
      missing: xorResult,
      xorResult,
    });

    return steps;
  };

  const steps = selectedMethod === 'math' ? generateMathSteps() : generateXorSteps();
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
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Method Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Algorithm
        </label>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setSelectedMethod('math');
              handleReset();
            }}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedMethod === 'math'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            🧮 Math (Gauss)
          </button>
          <button
            onClick={() => {
              setSelectedMethod('xor');
              handleReset();
            }}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedMethod === 'xor'
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            ⚡ XOR (Bit Manipulation)
          </button>
        </div>
      </div>

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
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>{t.step} {currentStep + 1} / {steps.length}</span>
          <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Description */}
      <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
        <div className="font-semibold text-blue-900 mb-2">Current Step:</div>
        <div className="text-gray-700">{step.description}</div>
      </div>

      {/* Array Visualization */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Array:</h3>
        <div className="flex flex-wrap gap-2">
          {nums.map((num, idx) => (
            <div
              key={idx}
              className={`w-16 h-16 flex flex-col items-center justify-center rounded-lg font-bold transition-all ${
                step.highlight?.includes(idx)
                  ? 'bg-yellow-400 text-gray-900 scale-110 shadow-lg'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              <div className="text-xs opacity-75">i={idx}</div>
              <div className="text-xl">{num}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Math Approach Info */}
      {selectedMethod === 'math' && (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Expected Sum</div>
            <div className="text-2xl font-bold text-purple-600">
              {step.expectedSum ?? 0}
            </div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Current Sum</div>
            <div className="text-2xl font-bold text-blue-600">
              {step.currentSum ?? 0}
            </div>
          </div>
        </div>
      )}

      {/* XOR Approach Info */}
      {selectedMethod === 'xor' && (
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="text-sm text-gray-600 mb-1">XOR Result</div>
          <div className="font-mono text-xl font-bold text-green-600">
            {step.xorResult !== undefined ? step.xorResult : 0}
          </div>
          <div className="text-sm text-gray-500 mt-2">
            Binary: {(step.xorResult ?? 0).toString(2).padStart(8, '0')}
          </div>
        </div>
      )}

      {/* Result Display */}
      {step.type === 'result' && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border-2 border-green-500">
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-800 mb-2">
              🎉 Missing Number Found!
            </div>
            <div className="text-6xl font-bold text-green-600 mb-2">
              {step.missing}
            </div>
            <div className="text-sm text-gray-600">
              {selectedMethod === 'math' 
                ? `${step.expectedSum} - ${step.currentSum} = ${step.missing}`
                : `XOR result = ${step.missing}`
              }
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
