import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, SkipForward, ChevronRight } from 'lucide-react';
import ContainerVisualizer from './ContainerVisualizer';
import { useLanguage } from '../i18n';

interface Step {
  left: number;
  right: number;
  currentArea: number;
  maxArea: number;
  description: string;
  decision: string;
}

interface AlgorithmSimulatorProps {
  heights: number[];
}

export default function AlgorithmSimulator({ heights }: AlgorithmSimulatorProps) {
  const { t } = useLanguage();
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000);

  useEffect(() => {
    generateSteps();
  }, [heights, t]);

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
    let left = 0;
    let right = heights.length - 1;
    let maxArea = 0;

    const format = (str: string, ...args: (string | number)[]) => {
      return str.replace(/{(\d+)}/g, (match, number) => {
        return typeof args[number] !== 'undefined' ? args[number].toString() : match;
      });
    };

    while (left < right) {
      const currentArea = Math.min(heights[left], heights[right]) * (right - left);
      maxArea = Math.max(maxArea, currentArea);

      const decision =
        heights[left] < heights[right]
          ? format(t.containerMoveLeft, left, heights[left], right, heights[right])
          : format(t.containerMoveRight, left, heights[left], right, heights[right]);

      newSteps.push({
        left,
        right,
        currentArea,
        maxArea,
        description: format(t.containerComparing, left, heights[left], right, heights[right]),
        decision,
      });

      if (heights[left] < heights[right]) {
        left++;
      } else {
        right--;
      }
    }

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
      {/* Visualizer */}
      {currentStepData && (
        <ContainerVisualizer
          heights={heights}
          leftPointer={currentStepData.left}
          rightPointer={currentStepData.right}
          maxArea={currentStepData.maxArea}
          currentArea={currentStepData.currentArea}
        />
      )}

      {/* Controls */}
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

        {/* Progress bar */}
        <div className="w-full bg-slate-200 rounded-full h-2 mb-4">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>

        {/* Step description */}
        {currentStepData && (
          <div className="space-y-3">
            <div className="flex items-start gap-2 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
              <ChevronRight className="text-blue-600 mt-0.5 flex-shrink-0" size={20} />
              <div>
                <div className="font-medium text-slate-800">
                  {currentStepData.description}
                </div>
                <div className="text-sm text-slate-600 mt-1">
                  {currentStepData.decision}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-lg border border-blue-200">
                <div className="text-xs text-slate-600">{t.currentArea}</div>
                <div className="text-xl font-bold text-blue-700">
                  {currentStepData.currentArea}
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-3 rounded-lg border border-green-200">
                <div className="text-xs text-slate-600">{t.maxAreaFound}</div>
                <div className="text-xl font-bold text-green-700">
                  {currentStepData.maxArea}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
