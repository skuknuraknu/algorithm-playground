import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, SkipForward, ChevronRight } from 'lucide-react';
import MountainVisualizer from './MountainVisualizer';
import { useLanguage } from '../../i18n';

interface Step {
  index: number;
  phase: 'check-length' | 'ascending' | 'check-peak' | 'descending' | 'check-end';
  description: string;
  isValid?: boolean;
  peakIndex?: number;
}

interface MountainSimulatorProps {
  arr: number[];
}

export default function MountainSimulator({ arr }: MountainSimulatorProps) {
  const { t } = useLanguage();
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000);

  useEffect(() => {
    generateSteps();
  }, [arr]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && currentStep < steps.length - 1) {
      interval = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, speed);
    } else if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
    }
    return () => clearTimeout(interval);
  }, [isPlaying, currentStep, steps.length, speed]);

  const generateSteps = () => {
    const newSteps: Step[] = [];

    newSteps.push({
      index: -1,
      phase: 'check-length',
      description: `Checking array length: ${arr.length}`,
      isValid: arr.length >= 3,
    });

    if (arr.length < 3) {
      newSteps.push({
        index: -1,
        phase: 'check-end',
        description: 'Array too short. Minimum 3 elements required for a mountain.',
        isValid: false,
      });
      setSteps(newSteps);
      setCurrentStep(0);
      return;
    }

    let i = 0;
    while (i + 1 < arr.length && arr[i] < arr[i + 1]) {
      newSteps.push({
        index: i,
        phase: 'ascending',
        description: `Ascending: arr[${i}]=${arr[i]} < arr[${i + 1}]=${arr[i + 1]}`,
      });
      i++;
    }

    const peakIndex = i;
    const hasAscent = i > 0;
    const peakAtEnd = i === arr.length - 1;

    newSteps.push({
      index: i,
      phase: 'check-peak',
      description: `Peak check: i=${i}, moved=${hasAscent}, at end=${peakAtEnd}`,
      peakIndex: hasAscent && !peakAtEnd ? peakIndex : undefined,
      isValid: hasAscent && !peakAtEnd,
    });

    if (!hasAscent || peakAtEnd) {
      newSteps.push({
        index: i,
        phase: 'check-end',
        description: !hasAscent
          ? 'No ascending phase found'
          : 'Peak cannot be at the end',
        isValid: false,
      });
      setSteps(newSteps);
      setCurrentStep(0);
      return;
    }

    while (i + 1 < arr.length && arr[i] > arr[i + 1]) {
      newSteps.push({
        index: i,
        phase: 'descending',
        description: `Descending: arr[${i}]=${arr[i]} > arr[${i + 1}]=${arr[i + 1]}`,
        peakIndex,
      });
      i++;
    }

    const reachedEnd = i === arr.length - 1;
    newSteps.push({
      index: i,
      phase: 'check-end',
      description: reachedEnd
        ? 'Reached the end. Valid mountain!'
        : `Stopped at index ${i}. Not a valid mountain.`,
      isValid: reachedEnd,
      peakIndex,
    });

    setSteps(newSteps);
    setCurrentStep(0);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="space-y-6">
      {currentStepData && (
        <MountainVisualizer
          arr={arr}
          currentIndex={currentStepData.index >= 0 ? currentStepData.index : undefined}
          peakIndex={currentStepData.peakIndex}
          isValid={
            currentStepData.phase === 'check-end' ? currentStepData.isValid : undefined
          }
          phase={
            currentStepData.phase === 'ascending' ||
            currentStepData.phase === 'descending'
              ? currentStepData.phase
              : undefined
          }
        />
      )}

      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={handlePlayPause}
              className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-colors shadow-md"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button
              onClick={handleNext}
              disabled={currentStep >= steps.length - 1}
              className="bg-slate-600 hover:bg-slate-700 disabled:bg-slate-300 text-white p-3 rounded-lg transition-colors shadow-md"
            >
              <SkipForward size={20} />
            </button>
            <button
              onClick={handleReset}
              className="bg-orange-600 hover:bg-orange-700 text-white p-3 rounded-lg transition-colors shadow-md"
            >
              <RotateCcw size={20} />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-slate-700">{t.speed}:</label>
            <select
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="border-2 border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
            >
              <option value={2000}>0.5x</option>
              <option value={1000}>1x</option>
              <option value={500}>2x</option>
              <option value={250}>4x</option>
            </select>
          </div>

          <div className="text-sm font-medium text-slate-700">
            {t.step} {currentStep + 1} / {steps.length}
          </div>
        </div>

        <div className="w-full bg-slate-200 rounded-full h-2 mb-4">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>

        {currentStepData && (
          <div className="space-y-3">
            <div className="flex items-start gap-2 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
              <ChevronRight className="text-blue-600 mt-0.5 flex-shrink-0" size={20} />
              <div className="flex-1">
                <div className="font-semibold text-slate-800 mb-1">
                  Phase: {currentStepData.phase.toUpperCase().replace('-', ' ')}
                </div>
                <div className="text-sm text-slate-700">
                  {currentStepData.description}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
