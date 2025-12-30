import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react';
import { useLanguage } from '../../i18n';

interface MoveZeroesSimulatorProps {
  nums: number[];
}

interface SimulationStep {
  array: number[];
  writePos: number;
  readPos: number;
  message: string;
  phase: 'moving' | 'filling' | 'done';
}

export default function MoveZeroesSimulator({ nums }: MoveZeroesSimulatorProps) {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [steps, setSteps] = useState<SimulationStep[]>([]);

  useEffect(() => {
    generateSteps();
  }, [nums]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && currentStep < steps.length - 1) {
      timer = setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, 1500);
    } else if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, steps.length]);

  const generateSteps = () => {
    const newSteps: SimulationStep[] = [];
    const arr = [...nums];
    let writePos = 0;

    // Initial state
    newSteps.push({
      array: [...arr],
      writePos: 0,
      readPos: 0,
      message: 'Initial state: writePos = 0, readPos = 0',
      phase: 'moving',
    });

    // Phase 1: Move non-zero elements
    for (let readPos = 0; readPos < arr.length; readPos++) {
      if (arr[readPos] !== 0) {
        newSteps.push({
          array: [...arr],
          writePos,
          readPos,
          message: `Found non-zero element ${arr[readPos]} at readPos ${readPos}`,
          phase: 'moving',
        });

        arr[writePos] = arr[readPos];
        writePos++;

        newSteps.push({
          array: [...arr],
          writePos,
          readPos,
          message: `Wrote ${arr[readPos]} to writePos ${writePos - 1}, increment writePos to ${writePos}`,
          phase: 'moving',
        });
      } else {
        newSteps.push({
          array: [...arr],
          writePos,
          readPos,
          message: `Found zero at readPos ${readPos}, skip it`,
          phase: 'moving',
        });
      }
    }

    // Phase 2: Fill remaining with zeros
    for (let i = writePos; i < arr.length; i++) {
      arr[i] = 0;
      newSteps.push({
        array: [...arr],
        writePos: i,
        readPos: arr.length - 1,
        message: `Fill position ${i} with 0`,
        phase: 'filling',
      });
    }

    // Final state
    newSteps.push({
      array: [...arr],
      writePos: arr.length,
      readPos: arr.length,
      message: 'Algorithm complete! All zeros moved to the end.',
      phase: 'done',
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

  if (steps.length === 0) return null;

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
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Visualization */}
      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
        <div className="mb-6">
          <div
            className={`text-lg font-bold p-4 rounded-lg ${
              step.phase === 'done'
                ? 'bg-green-50 text-green-800 border-2 border-green-300'
                : step.phase === 'filling'
                ? 'bg-purple-50 text-purple-800 border-2 border-purple-300'
                : 'bg-blue-50 text-blue-800 border-2 border-blue-300'
            }`}
          >
            {step.message}
          </div>
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          {step.array.map((num, index) => {
            const isWritePos = index === step.writePos;
            const isReadPos = index === step.readPos;
            const isZero = num === 0;

            return (
              <div key={index} className="flex flex-col items-center gap-2">
                <div
                  className={`w-16 h-16 flex items-center justify-center rounded-lg font-mono text-2xl font-bold shadow-lg transition-all ${
                    isZero
                      ? 'bg-red-500 text-white border-4 border-red-600'
                      : 'bg-blue-500 text-white border-4 border-blue-600'
                  } ${
                    isWritePos && step.phase !== 'done'
                      ? 'ring-4 ring-green-400 ring-offset-2 scale-110'
                      : ''
                  } ${
                    isReadPos && step.phase === 'moving'
                      ? 'ring-4 ring-yellow-400 ring-offset-2 scale-110'
                      : ''
                  }`}
                >
                  {num}
                </div>
                <div className="text-xs font-mono text-slate-500">
                  [{index}]
                </div>
                {isWritePos && step.phase !== 'done' && (
                  <div className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded">
                    Write
                  </div>
                )}
                {isReadPos && step.phase === 'moving' && (
                  <div className="text-xs font-bold text-yellow-600 bg-yellow-100 px-2 py-1 rounded">
                    Read
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Pointer Info */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-green-50 rounded-lg p-4 border-2 border-green-300">
            <div className="text-sm text-slate-600 mb-1">Write Position</div>
            <div className="text-3xl font-bold text-green-700">{step.writePos}</div>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4 border-2 border-yellow-300">
            <div className="text-sm text-slate-600 mb-1">Read Position</div>
            <div className="text-3xl font-bold text-yellow-700">{step.readPos}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
