import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Play, RotateCcw, Pause, Binary, Sparkles, CheckCircle2, XCircle } from 'lucide-react';

interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

interface SymmetricTreeSimulatorProps {
  nodes: (number | null)[];
}

interface Step {
  description: string;
  leftNode: number | null;
  rightNode: number | null;
  isMatch: boolean;
  type: 'compare' | 'result' | 'null-check';
  depth: number;
}

function buildTree(nodes: (number | null)[]): TreeNode | null {
  if (nodes.length === 0 || nodes[0] === null) return null;
  
  const root: TreeNode = { val: nodes[0], left: null, right: null };
  const queue: TreeNode[] = [root];
  let i = 1;
  
  while (queue.length > 0 && i < nodes.length) {
    const node = queue.shift()!;
    
    if (i < nodes.length && nodes[i] !== null) {
      node.left = { val: nodes[i]!, left: null, right: null };
      queue.push(node.left);
    }
    i++;
    
    if (i < nodes.length && nodes[i] !== null) {
      node.right = { val: nodes[i]!, left: null, right: null };
      queue.push(node.right);
    }
    i++;
  }
  
  return root;
}

function generateSteps(root: TreeNode | null): Step[] {
  const steps: Step[] = [];
  
  if (!root) {
    steps.push({
      description: 'Tree kosong, dianggap symmetric',
      leftNode: null,
      rightNode: null,
      isMatch: true,
      type: 'result',
      depth: 0
    });
    return steps;
  }
  
  function isMirror(left: TreeNode | null, right: TreeNode | null, depth: number): boolean {
    // Both null
    if (!left && !right) {
      steps.push({
        description: 'Kedua node null - cocok!',
        leftNode: null,
        rightNode: null,
        isMatch: true,
        type: 'null-check',
        depth
      });
      return true;
    }
    
    // One is null
    if (!left || !right) {
      steps.push({
        description: 'Salah satu node null - tidak cocok!',
        leftNode: left?.val ?? null,
        rightNode: right?.val ?? null,
        isMatch: false,
        type: 'null-check',
        depth
      });
      return false;
    }
    
    // Compare values
    const valuesMatch = left.val === right.val;
    steps.push({
      description: valuesMatch 
        ? `Membandingkan ${left.val} dengan ${right.val} - cocok!`
        : `Membandingkan ${left.val} dengan ${right.val} - tidak cocok!`,
      leftNode: left.val,
      rightNode: right.val,
      isMatch: valuesMatch,
      type: 'compare',
      depth
    });
    
    if (!valuesMatch) return false;
    
    // Recursive checks
    const leftMatch = isMirror(left.left, right.right, depth + 1);
    const rightMatch = isMirror(left.right, right.left, depth + 1);
    
    return leftMatch && rightMatch;
  }
  
  const result = isMirror(root.left, root.right, 1);
  
  steps.push({
    description: result 
      ? '✓ Tree adalah SYMMETRIC!'
      : '✗ Tree TIDAK symmetric',
    leftNode: null,
    rightNode: null,
    isMatch: result,
    type: 'result',
    depth: 0
  });
  
  return steps;
}

export default function SymmetricTreeSimulator({ nodes }: SymmetricTreeSimulatorProps) {
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const stepRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (nodes && nodes.length > 0 && nodes[0] !== null) {
      const tree = buildTree(nodes);
      const newSteps = generateSteps(tree);
      setSteps(newSteps);
      setCurrentStep(0);
      setIsPlaying(false);
    }
  }, [nodes]);

  useEffect(() => {
    if (stepRef.current && steps.length > 0) {
      const currentCard = stepRef.current.querySelector('.current-step-card');
      if (currentCard) {
        gsap.fromTo(
          currentCard,
          {
            scale: 0.9,
            opacity: 0,
            rotateX: -15
          },
          {
            scale: 1,
            opacity: 1,
            rotateX: 0,
            duration: 0.5,
            ease: 'back.out(1.4)'
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
          <p className="text-lg">Masukkan nodes untuk memulai simulasi...</p>
        </div>
      </div>
    );
  }

  const currentStepData = steps[currentStep];
  const getTypeColor = (type: string, isMatch: boolean) => {
    if (type === 'result') {
      return isMatch ? 'from-emerald-500 to-teal-600' : 'from-red-500 to-rose-600';
    }
    if (type === 'null-check') {
      return isMatch ? 'from-blue-500 to-cyan-600' : 'from-orange-500 to-amber-600';
    }
    return isMatch ? 'from-emerald-500 to-teal-600' : 'from-red-500 to-rose-600';
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 shadow-xl border-2 border-emerald-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Binary className="text-emerald-600" size={24} />
            <div>
              <h3 className="text-xl font-bold text-slate-800">Simulasi Mirror Check</h3>
              <p className="text-sm text-slate-500">
                Langkah {currentStep + 1} dari {steps.length}
              </p>
            </div>
          </div>
          <div className="px-4 py-2 bg-white rounded-lg border-2 border-emerald-200 shadow-sm">
            <p className="text-xs text-slate-500">Kecepatan</p>
            <select
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="text-sm font-semibold text-emerald-600 bg-transparent border-none outline-none cursor-pointer"
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
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            {isPlaying ? 'Pause' : currentStep >= steps.length - 1 ? 'Restart' : 'Play'}
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-3 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-xl border-2 border-emerald-200 transition-all duration-300 hover:scale-105 active:scale-95 shadow-md"
          >
            <RotateCcw size={18} />
          </button>
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="px-4 py-3 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-xl border-2 border-emerald-200 transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            ←
          </button>
          <button
            onClick={handleNext}
            disabled={currentStep >= steps.length - 1}
            className="px-4 py-3 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-xl border-2 border-emerald-200 transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            →
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 bg-white rounded-full h-2 overflow-hidden shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Current Step Visualization */}
      <div ref={stepRef}>
        <div className={`current-step-card bg-gradient-to-br ${getTypeColor(currentStepData.type, currentStepData.isMatch)} rounded-2xl p-8 shadow-2xl text-white`}>
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              {currentStepData.type === 'result' && currentStepData.isMatch && <CheckCircle2 size={28} />}
              {currentStepData.type === 'result' && !currentStepData.isMatch && <XCircle size={28} />}
              {currentStepData.type === 'compare' && <Binary size={28} />}
              {currentStepData.type === 'null-check' && <Sparkles size={28} />}
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold mb-2 text-white/80 uppercase tracking-wide">
                {currentStepData.type === 'compare' && 'Membandingkan Nilai'}
                {currentStepData.type === 'null-check' && 'Cek Node Null'}
                {currentStepData.type === 'result' && 'Hasil Akhir'}
              </div>
              <p className="text-xl font-bold leading-relaxed">
                {currentStepData.description}
              </p>
            </div>
          </div>

          {/* Node Comparison Visualization */}
          {(currentStepData.type === 'compare' || currentStepData.type === 'null-check') && (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border-2 border-white/20">
              <div className="flex items-center justify-center gap-8">
                <div className="text-center">
                  <p className="text-sm text-white/70 mb-3">Left Node</p>
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg border-4 ${
                    currentStepData.leftNode === null
                      ? 'bg-slate-400 border-slate-300'
                      : 'bg-white/30 border-white/50'
                  }`}>
                    {currentStepData.leftNode ?? 'null'}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {currentStepData.isMatch ? (
                    <CheckCircle2 size={32} className="text-white" />
                  ) : (
                    <XCircle size={32} className="text-white" />
                  )}
                </div>
                
                <div className="text-center">
                  <p className="text-sm text-white/70 mb-3">Right Node</p>
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg border-4 ${
                    currentStepData.rightNode === null
                      ? 'bg-slate-400 border-slate-300'
                      : 'bg-white/30 border-white/50'
                  }`}>
                    {currentStepData.rightNode ?? 'null'}
                  </div>
                </div>
              </div>
              
              <div className="mt-4 text-center">
                <div className="inline-block px-4 py-2 bg-white/20 rounded-lg">
                  <span className="text-sm text-white/80">Depth: </span>
                  <span className="text-lg font-bold">{currentStepData.depth}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
