import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Play, RotateCcw, Pause, TreeDeciduous, Sparkles, TrendingUp, ArrowDown } from 'lucide-react';

interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

interface MaxDepthTreeSimulatorProps {
  nodes: (number | null)[];
}

interface Step {
  description: string;
  nodeValue: number | null;
  leftDepth: number;
  rightDepth: number;
  currentDepth: number;
  type: 'visit' | 'null-check' | 'calculate' | 'return' | 'complete';
  level: number;
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
  let level = 0;
  
  function dfs(node: TreeNode | null, currentLevel: number): number {
    level = currentLevel;
    
    if (!node) {
      steps.push({
        description: 'Node null ditemukan, return depth 0',
        nodeValue: null,
        leftDepth: 0,
        rightDepth: 0,
        currentDepth: 0,
        type: 'null-check',
        level: currentLevel
      });
      return 0;
    }
    
    steps.push({
      description: `Mengunjungi node ${node.val}`,
      nodeValue: node.val,
      leftDepth: 0,
      rightDepth: 0,
      currentDepth: 0,
      type: 'visit',
      level: currentLevel
    });
    
    const leftDepth = dfs(node.left, currentLevel + 1);
    const rightDepth = dfs(node.right, currentLevel + 1);
    
    steps.push({
      description: `Node ${node.val}: left depth = ${leftDepth}, right depth = ${rightDepth}`,
      nodeValue: node.val,
      leftDepth: leftDepth,
      rightDepth: rightDepth,
      currentDepth: 0,
      type: 'calculate',
      level: currentLevel
    });
    
    const currentDepth = 1 + Math.max(leftDepth, rightDepth);
    
    steps.push({
      description: `Node ${node.val} mengembalikan depth ${currentDepth}`,
      nodeValue: node.val,
      leftDepth: leftDepth,
      rightDepth: rightDepth,
      currentDepth: currentDepth,
      type: 'return',
      level: currentLevel
    });
    
    return currentDepth;
  }
  
  const result = dfs(root, 1);
  
  steps.push({
    description: `✓ Maximum depth tree adalah ${result}`,
    nodeValue: null,
    leftDepth: 0,
    rightDepth: 0,
    currentDepth: result,
    type: 'complete',
    level: 0
  });
  
  return steps;
}

export default function MaxDepthTreeSimulator({ nodes }: MaxDepthTreeSimulatorProps) {
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
            y: 20
          },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.5,
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
          <p className="text-lg">Masukkan nodes untuk memulai simulasi DFS...</p>
        </div>
      </div>
    );
  }

  const currentStepData = steps[currentStep];
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'visit': return 'from-cyan-500 to-blue-600';
      case 'null-check': return 'from-slate-500 to-slate-600';
      case 'calculate': return 'from-purple-500 to-violet-600';
      case 'return': return 'from-emerald-500 to-teal-600';
      case 'complete': return 'from-amber-500 to-orange-600';
      default: return 'from-slate-500 to-slate-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6 shadow-xl border-2 border-cyan-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <TreeDeciduous className="text-cyan-600" size={24} />
            <div>
              <h3 className="text-xl font-bold text-slate-800">Simulasi DFS Recursive</h3>
              <p className="text-sm text-slate-500">
                Langkah {currentStep + 1} dari {steps.length}
              </p>
            </div>
          </div>
          <div className="px-4 py-2 bg-white rounded-lg border-2 border-cyan-200 shadow-sm">
            <p className="text-xs text-slate-500">Kecepatan</p>
            <select
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="text-sm font-semibold text-cyan-600 bg-transparent border-none outline-none cursor-pointer"
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
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            {isPlaying ? 'Pause' : currentStep >= steps.length - 1 ? 'Restart' : 'Play'}
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-3 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-xl border-2 border-cyan-200 transition-all duration-300 hover:scale-105 active:scale-95 shadow-md"
          >
            <RotateCcw size={18} />
          </button>
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="px-4 py-3 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-xl border-2 border-cyan-200 transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            ←
          </button>
          <button
            onClick={handleNext}
            disabled={currentStep >= steps.length - 1}
            className="px-4 py-3 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-xl border-2 border-cyan-200 transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            →
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 bg-white rounded-full h-2 overflow-hidden shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Current Step Visualization */}
      <div ref={stepRef}>
        <div className={`current-step-card bg-gradient-to-br ${getTypeColor(currentStepData.type)} rounded-2xl p-8 shadow-2xl text-white`}>
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              {currentStepData.type === 'visit' && <ArrowDown size={28} />}
              {currentStepData.type === 'null-check' && <Sparkles size={28} />}
              {currentStepData.type === 'calculate' && <TreeDeciduous size={28} />}
              {currentStepData.type === 'return' && <TrendingUp size={28} />}
              {currentStepData.type === 'complete' && <Sparkles size={28} />}
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold mb-2 text-white/80 uppercase tracking-wide">
                {currentStepData.type === 'visit' && 'Mengunjungi Node'}
                {currentStepData.type === 'null-check' && 'Cek Node Null'}
                {currentStepData.type === 'calculate' && 'Menghitung Depth'}
                {currentStepData.type === 'return' && 'Return Depth'}
                {currentStepData.type === 'complete' && 'Selesai'}
              </div>
              <p className="text-xl font-bold leading-relaxed">
                {currentStepData.description}
              </p>
            </div>
          </div>

          {/* Node and Depth Info */}
          {currentStepData.type !== 'complete' && (
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border-2 border-white/20">
                <p className="text-sm text-white/70 mb-2">Current Node</p>
                <div className="flex items-center gap-3">
                  {currentStepData.nodeValue !== null ? (
                    <>
                      <div className="w-12 h-12 bg-white/30 border-4 border-white/50 rounded-full flex items-center justify-center font-bold text-xl">
                        {currentStepData.nodeValue}
                      </div>
                      <div>
                        <p className="text-xs text-white/60">Level</p>
                        <p className="text-lg font-bold">{currentStepData.level}</p>
                      </div>
                    </>
                  ) : (
                    <div className="px-4 py-2 bg-slate-500/50 rounded-lg font-mono text-sm">
                      null
                    </div>
                  )}
                </div>
              </div>

              {(currentStepData.type === 'calculate' || currentStepData.type === 'return') && (
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border-2 border-white/20">
                  <p className="text-sm text-white/70 mb-2">Depth Calculation</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/80">Left Depth:</span>
                      <span className="font-bold">{currentStepData.leftDepth}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/80">Right Depth:</span>
                      <span className="font-bold">{currentStepData.rightDepth}</span>
                    </div>
                    {currentStepData.type === 'return' && (
                      <div className="flex justify-between pt-2 border-t border-white/30">
                        <span className="text-white/80">Result:</span>
                        <span className="font-bold text-lg">1 + max = {currentStepData.currentDepth}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Final Result */}
          {currentStepData.type === 'complete' && (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border-2 border-white/20 text-center">
              <p className="text-sm text-white/70 mb-2">Maximum Depth</p>
              <p className="text-6xl font-bold">{currentStepData.currentDepth}</p>
            </div>
          )}
        </div>
      </div>

      {/* Formula Card */}
      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-cyan-100">
        <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
          📐 Formula Rekursi
        </h4>
        <div className="bg-slate-50 rounded-lg p-4 border-2 border-slate-200 font-mono text-center">
          <p className="text-slate-700">
            maxDepth(node) = <span className="text-cyan-600 font-bold">1</span> + 
            <span className="text-purple-600 font-bold"> max</span>(
            <span className="text-emerald-600">maxDepth(left)</span>, 
            <span className="text-blue-600"> maxDepth(right)</span>)
          </p>
        </div>
        <p className="text-sm text-slate-600 mt-3 text-center">
          Base case: jika node = null, return 0
        </p>
      </div>
    </div>
  );
}
