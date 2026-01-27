import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Play, RotateCcw, Pause, GitBranch, Sparkles, CheckCircle2, XCircle } from 'lucide-react';

interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

interface PathSumSimulatorProps {
  nodes: (number | null)[];
  targetSum: number;
}

interface Step {
  description: string;
  nodeValue: number | null;
  remainingSum: number;
  currentPath: number[];
  isLeaf: boolean;
  foundPath: boolean;
  type: 'visit' | 'null-check' | 'leaf-check' | 'backtrack' | 'found' | 'not-found';
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

function generateSteps(root: TreeNode | null, targetSum: number): Step[] {
  const steps: Step[] = [];
  
  function dfs(node: TreeNode | null, remaining: number, currentPath: number[]): boolean {
    if (!node) {
      steps.push({
        description: 'Node null ditemukan, backtrack',
        nodeValue: null,
        remainingSum: remaining,
        currentPath: [...currentPath],
        isLeaf: false,
        foundPath: false,
        type: 'null-check'
      });
      return false;
    }
    
    currentPath.push(node.val);
    const newRemaining = remaining - node.val;
    
    steps.push({
      description: `Mengunjungi node ${node.val}, remaining sum = ${newRemaining}`,
      nodeValue: node.val,
      remainingSum: newRemaining,
      currentPath: [...currentPath],
      isLeaf: !node.left && !node.right,
      foundPath: false,
      type: 'visit'
    });
    
    // Check if leaf
    if (!node.left && !node.right) {
      if (newRemaining === 0) {
        steps.push({
          description: `✓ Leaf node ${node.val} ditemukan! Remaining sum = 0, PATH VALID!`,
          nodeValue: node.val,
          remainingSum: newRemaining,
          currentPath: [...currentPath],
          isLeaf: true,
          foundPath: true,
          type: 'found'
        });
        return true;
      } else {
        steps.push({
          description: `✗ Leaf node ${node.val}, remaining sum = ${newRemaining} ≠ 0`,
          nodeValue: node.val,
          remainingSum: newRemaining,
          currentPath: [...currentPath],
          isLeaf: true,
          foundPath: false,
          type: 'leaf-check'
        });
        currentPath.pop();
        return false;
      }
    }
    
    // Try left
    if (dfs(node.left, newRemaining, currentPath)) return true;
    
    // Try right
    if (dfs(node.right, newRemaining, currentPath)) return true;
    
    // Backtrack
    steps.push({
      description: `Backtrack dari node ${node.val}`,
      nodeValue: node.val,
      remainingSum: newRemaining,
      currentPath: [...currentPath],
      isLeaf: false,
      foundPath: false,
      type: 'backtrack'
    });
    
    currentPath.pop();
    return false;
  }
  
  const result = dfs(root, targetSum, []);
  
  if (!result) {
    steps.push({
      description: '✗ Tidak ada path yang valid ditemukan',
      nodeValue: null,
      remainingSum: targetSum,
      currentPath: [],
      isLeaf: false,
      foundPath: false,
      type: 'not-found'
    });
  }
  
  return steps;
}

export default function PathSumSimulator({ nodes, targetSum }: PathSumSimulatorProps) {
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const stepRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (nodes && nodes.length > 0 && nodes[0] !== null) {
      const tree = buildTree(nodes);
      const newSteps = generateSteps(tree, targetSum);
      setSteps(newSteps);
      setCurrentStep(0);
      setIsPlaying(false);
    }
  }, [nodes, targetSum]);

  useEffect(() => {
    if (stepRef.current && steps.length > 0) {
      const currentCard = stepRef.current.querySelector('.current-step-card');
      if (currentCard) {
        gsap.fromTo(
          currentCard,
          {
            scale: 0.95,
            opacity: 0,
            x: -20
          },
          {
            scale: 1,
            opacity: 1,
            x: 0,
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
          <p className="text-lg">Masukkan nodes dan target untuk memulai simulasi...</p>
        </div>
      </div>
    );
  }

  const currentStepData = steps[currentStep];
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'visit': return 'from-orange-500 to-amber-600';
      case 'null-check': return 'from-slate-500 to-slate-600';
      case 'leaf-check': return 'from-red-500 to-rose-600';
      case 'backtrack': return 'from-purple-500 to-violet-600';
      case 'found': return 'from-emerald-500 to-green-600';
      case 'not-found': return 'from-red-500 to-rose-600';
      default: return 'from-slate-500 to-slate-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 shadow-xl border-2 border-orange-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <GitBranch className="text-orange-600" size={24} />
            <div>
              <h3 className="text-xl font-bold text-slate-800">Simulasi DFS Path Sum</h3>
              <p className="text-sm text-slate-500">
                Langkah {currentStep + 1} dari {steps.length} | Target: {targetSum}
              </p>
            </div>
          </div>
          <div className="px-4 py-2 bg-white rounded-lg border-2 border-orange-200 shadow-sm">
            <p className="text-xs text-slate-500">Kecepatan</p>
            <select
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="text-sm font-semibold text-orange-600 bg-transparent border-none outline-none cursor-pointer"
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
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            {isPlaying ? 'Pause' : currentStep >= steps.length - 1 ? 'Restart' : 'Play'}
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-3 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-xl border-2 border-orange-200 transition-all duration-300 hover:scale-105 active:scale-95 shadow-md"
          >
            <RotateCcw size={18} />
          </button>
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="px-4 py-3 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-xl border-2 border-orange-200 transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            ←
          </button>
          <button
            onClick={handleNext}
            disabled={currentStep >= steps.length - 1}
            className="px-4 py-3 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-xl border-2 border-orange-200 transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            →
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 bg-white rounded-full h-2 overflow-hidden shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-orange-500 to-amber-600 transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Current Step Visualization */}
      <div ref={stepRef}>
        <div className={`current-step-card bg-gradient-to-br ${getTypeColor(currentStepData.type)} rounded-2xl p-8 shadow-2xl text-white`}>
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              {currentStepData.type === 'visit' && <GitBranch size={28} />}
              {currentStepData.type === 'null-check' && <Sparkles size={28} />}
              {currentStepData.type === 'leaf-check' && <XCircle size={28} />}
              {currentStepData.type === 'backtrack' && <RotateCcw size={28} />}
              {currentStepData.type === 'found' && <CheckCircle2 size={28} />}
              {currentStepData.type === 'not-found' && <XCircle size={28} />}
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold mb-2 text-white/80 uppercase tracking-wide">
                {currentStepData.type === 'visit' && 'Mengunjungi Node'}
                {currentStepData.type === 'null-check' && 'Cek Node Null'}
                {currentStepData.type === 'leaf-check' && 'Cek Leaf Node'}
                {currentStepData.type === 'backtrack' && 'Backtracking'}
                {currentStepData.type === 'found' && 'Path Ditemukan!'}
                {currentStepData.type === 'not-found' && 'Tidak Ada Path'}
              </div>
              <p className="text-xl font-bold leading-relaxed">
                {currentStepData.description}
              </p>
            </div>
          </div>

          {/* Current State */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border-2 border-white/20">
              <p className="text-sm text-white/70 mb-2">Current Node</p>
              {currentStepData.nodeValue !== null ? (
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 border-4 border-white/50 rounded-full flex items-center justify-center font-bold text-xl ${
                    currentStepData.isLeaf ? 'bg-amber-400/50' : 'bg-white/30'
                  }`}>
                    {currentStepData.nodeValue}
                  </div>
                  {currentStepData.isLeaf && (
                    <span className="text-xs bg-amber-400/30 px-2 py-1 rounded-lg border border-amber-300/50">
                      Leaf
                    </span>
                  )}
                </div>
              ) : (
                <div className="px-4 py-2 bg-slate-500/50 rounded-lg font-mono text-sm">
                  null
                </div>
              )}
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border-2 border-white/20">
              <p className="text-sm text-white/70 mb-2">Remaining Sum</p>
              <div className="text-3xl font-bold">
                {currentStepData.remainingSum}
              </div>
              {currentStepData.remainingSum === 0 && currentStepData.isLeaf && (
                <span className="text-xs text-emerald-300 font-bold">Target Reached!</span>
              )}
            </div>
          </div>

          {/* Current Path */}
          {currentStepData.currentPath.length > 0 && (
            <div className="mt-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 border-2 border-white/20">
              <p className="text-sm text-white/70 mb-3">Current Path</p>
              <div className="flex items-center gap-2 flex-wrap">
                {currentStepData.currentPath.map((val, idx) => (
                  <div key={idx} className="flex items-center">
                    <div className="px-3 py-1 bg-white/30 border-2 border-white/40 rounded-lg font-mono text-white font-semibold shadow backdrop-blur-sm">
                      {val}
                    </div>
                    {idx < currentStepData.currentPath.length - 1 && (
                      <span className="mx-1 text-white/50">→</span>
                    )}
                  </div>
                ))}
                <div className="ml-2 px-3 py-1 bg-white/20 rounded-lg border border-white/30">
                  <span className="text-xs text-white/60">Σ = </span>
                  <span className="font-bold">
                    {currentStepData.currentPath.reduce((sum, val) => sum + val, 0)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Algorithm Info */}
      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-orange-100">
        <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
          📐 Algorithm Logic
        </h4>
        <div className="space-y-2 text-sm text-slate-700">
          <div className="flex items-start gap-2">
            <span className="text-orange-600 font-bold">1.</span>
            <span>Di setiap node, kurangi node.val dari remaining sum</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-orange-600 font-bold">2.</span>
            <span>Jika node adalah leaf DAN remaining sum = 0, path valid!</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-orange-600 font-bold">3.</span>
            <span>Jika bukan leaf, coba left subtree lalu right subtree</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-orange-600 font-bold">4.</span>
            <span>Backtrack jika tidak ada path valid dari node ini</span>
          </div>
        </div>
      </div>
    </div>
  );
}
