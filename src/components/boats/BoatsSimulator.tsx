import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, SkipForward, ChevronRight } from 'lucide-react';
import BoatsVisualizer from './BoatsVisualizer';
import { useLanguage } from '../../i18n';

interface Boat {
  people: number[];
  totalWeight: number;
}

interface Step {
  left: number;
  right: number;
  boats: Boat[];
  description: string;
  decision: string;
  sortedPeople: number[];
}

interface BoatsSimulatorProps {
  people: number[];
  limit: number;
}

export default function BoatsSimulator({ people, limit }: BoatsSimulatorProps) {
  const { t } = useLanguage();
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000);

  useEffect(() => {
    generateSteps();
  }, [people, limit]);

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
    const sortedPeople = [...people].sort((a, b) => a - b);
    const boats: Boat[] = [];

    let left = 0;
    let right = sortedPeople.length - 1;

    newSteps.push({
      left: 0,
      right: sortedPeople.length - 1,
      boats: [],
      description: `Sorted people array: [${sortedPeople.join(', ')}]`,
      decision: 'Starting with lightest (left) and heaviest (right)',
      sortedPeople: [...sortedPeople],
    });

    while (left <= right) {
      const lightWeight = sortedPeople[left];
      const heavyWeight = sortedPeople[right];
      const totalWeight = lightWeight + heavyWeight;

      if (left === right) {
        boats.push({
          people: [sortedPeople[left]],
          totalWeight: sortedPeople[left],
        });
        newSteps.push({
          left,
          right,
          boats: [...boats],
          description: `Last person (${sortedPeople[left]} kg) takes a boat alone`,
          decision: 'Only one person left, assign to boat',
          sortedPeople: [...sortedPeople],
        });
        left++;
      } else if (totalWeight <= limit) {
        boats.push({
          people: [lightWeight, heavyWeight],
          totalWeight,
        });
        newSteps.push({
          left,
          right,
          boats: [...boats],
          description: `Pair people: ${lightWeight} kg + ${heavyWeight} kg = ${totalWeight} kg ≤ ${limit} kg`,
          decision: 'Both can fit together, move both pointers',
          sortedPeople: [...sortedPeople],
        });
        left++;
        right--;
      } else {
        boats.push({
          people: [heavyWeight],
          totalWeight: heavyWeight,
        });
        newSteps.push({
          left,
          right,
          boats: [...boats],
          description: `Cannot pair: ${lightWeight} kg + ${heavyWeight} kg = ${totalWeight} kg > ${limit} kg`,
          decision: `Heaviest person (${heavyWeight} kg) takes boat alone, move right pointer`,
          sortedPeople: [...sortedPeople],
        });
        right--;
      }
    }

    newSteps.push({
      left,
      right,
      boats: [...boats],
      description: `Complete! Total boats needed: ${boats.length}`,
      decision: 'All people have been assigned to boats',
      sortedPeople: [...sortedPeople],
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
        <BoatsVisualizer
          people={people}
          limit={limit}
          boats={currentStepData.boats}
          currentLeft={currentStepData.left}
          currentRight={currentStepData.right}
          sortedPeople={currentStepData.sortedPeople}
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
              <div>
                <div className="font-medium text-slate-800">
                  {currentStepData.description}
                </div>
                <div className="text-sm text-slate-600 mt-1">
                  {currentStepData.decision}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-4 rounded-lg border border-cyan-200">
              <div className="text-sm text-slate-700">
                <strong>Current State:</strong> Boats deployed: {currentStepData.boats.length}
                {currentStepData.left <= currentStepData.right && (
                  <span>
                    {' '}
                    | People remaining: {currentStepData.right - currentStepData.left + 1}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
