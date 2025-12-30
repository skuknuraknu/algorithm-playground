import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react';
import gsap from 'gsap';
import { useLanguage } from '../../i18n';

interface GroupAnagramsSimulatorProps {
  strs: string[];
}

interface SimulationStep {
  currentStr: string;
  sortedKey: string;
  groups: Record<string, string[]>;
  message: string;
  phase: 'pick' | 'sort' | 'group' | 'done';
}

export default function GroupAnagramsSimulator({ strs }: GroupAnagramsSimulatorProps) {
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
    generateSteps();
  }, [strs]);

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
    if (strs.length === 0) {
      setSteps([]);
      return;
    }

    const newSteps: SimulationStep[] = [];
    const currentGroups: Record<string, string[]> = {};

    // Initial state
    newSteps.push({
      currentStr: '',
      sortedKey: '',
      groups: { ...currentGroups },
      message: 'Start processing strings one by one...',
      phase: 'pick'
    });

    for (const str of strs) {
      // Step 1: Pick string
      newSteps.push({
        currentStr: str,
        sortedKey: '',
        groups: { ...currentGroups },
        message: `Processing string: "${str}"`,
        phase: 'pick'
      });

      // Step 2: Sort characters to get key
      const key = str.split('').sort().join('');
      newSteps.push({
        currentStr: str,
        sortedKey: key,
        groups: { ...currentGroups },
        message: `Sort characters of "${str}" → Key: "${key}"`,
        phase: 'sort'
      });

      // Step 3: Add to group
      if (!currentGroups[key]) {
        currentGroups[key] = [];
      }
      currentGroups[key].push(str);
      
      newSteps.push({
        currentStr: str,
        sortedKey: key,
        groups: JSON.parse(JSON.stringify(currentGroups)), // Deep copy
        message: `Add "${str}" to group with key "${key}"`,
        phase: 'group'
      });
    }

    // Final state
    newSteps.push({
      currentStr: '',
      sortedKey: '',
      groups: { ...currentGroups },
      message: 'All strings processed! Anagrams are grouped.',
      phase: 'done'
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

  if (steps.length === 0) {
    return (
      <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6 text-center">
        <p className="text-yellow-800 font-semibold">Add strings to start simulation.</p>
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
          <div className={`text-lg font-bold p-4 rounded-lg transition-colors duration-300 ${
            step.phase === 'done' ? 'bg-green-50 text-green-800 border-2 border-green-300' :
            step.phase === 'sort' ? 'bg-purple-50 text-purple-800 border-2 border-purple-300' :
            step.phase === 'group' ? 'bg-indigo-50 text-indigo-800 border-2 border-indigo-300' :
            'bg-blue-50 text-blue-800 border-2 border-blue-300'
          }`}>
            {step.message}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Current Processing */}
          <div className="space-y-4">
            <h4 className="font-bold text-slate-700 border-b pb-2">Current Processing</h4>
            <div className="bg-slate-50 p-6 rounded-lg border-2 border-slate-200 flex flex-col items-center justify-center min-h-[160px]">
              {step.currentStr ? (
                <>
                  <div className="text-sm text-slate-500 mb-2">String</div>
                  <div className="text-3xl font-mono font-bold text-slate-800 mb-4">{step.currentStr}</div>
                  
                  {step.sortedKey && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <div className="text-sm text-slate-500 mb-1 text-center">Sorted Key</div>
                      <div className="text-xl font-mono font-bold text-purple-600 bg-purple-100 px-3 py-1 rounded border border-purple-200">
                        {step.sortedKey}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-slate-400 italic">Waiting to start...</div>
              )}
            </div>
          </div>

          {/* Hash Map State */}
          <div className="space-y-4">
            <h4 className="font-bold text-slate-700 border-b pb-2">Hash Map State</h4>
            <div className="bg-slate-50 p-4 rounded-lg border-2 border-slate-200 min-h-[160px] max-h-[400px] overflow-y-auto">
              {Object.keys(step.groups).length === 0 ? (
                <div className="text-center text-slate-400 italic py-8">Map is empty</div>
              ) : (
                <div className="space-y-3">
                  {Object.entries(step.groups).map(([key, values]) => (
                    <div 
                      key={key}
                      className={`bg-white p-3 rounded border-2 transition-all duration-300 ${
                        key === step.sortedKey ? 'border-indigo-400 shadow-md scale-105' : 'border-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-slate-400">Key</span>
                        <code className="text-sm font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded">{key}</code>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {values.map((val, idx) => (
                          <span key={idx} className="text-xs font-mono bg-slate-100 px-2 py-1 rounded border border-slate-200">
                            {val}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
