import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Play, Pause, RotateCcw, ListOrdered, StepForward, StepBack } from 'lucide-react';

interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

interface Step {
  description: string;
  node: number | null;
  kRemaining: number;
  found: boolean;
  path: number[];
  type: 'push' | 'visit' | 'found' | 'done';
}

interface Props {
  nodes: (number | null)[];
  k: number;
}

function buildTree(nodes: (number | null)[]): TreeNode | null {
  if (!nodes.length || nodes[0] === null || nodes[0] === undefined) return null;
  const root: TreeNode = { val: nodes[0] as number, left: null, right: null };
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < nodes.length) {
    const node = queue.shift()!;
    if (nodes[i] !== null && nodes[i] !== undefined) {
      node.left = { val: nodes[i] as number, left: null, right: null };
      queue.push(node.left);
    }
    i++;
    if (i < nodes.length && nodes[i] !== null && nodes[i] !== undefined) {
      node.right = { val: nodes[i] as number, left: null, right: null };
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function generateSteps(root: TreeNode | null, k: number): Step[] {
  const steps: Step[] = [];
  const stack: TreeNode[] = [];
  let current = root;
  let remaining = k;
  const path: number[] = [];

  while (stack.length > 0 || current) {
    while (current) {
      stack.push(current);
      path.push(current.val);
      steps.push({
        description: `Push node ${current.val} ke stack (ke kiri)`,
        node: current.val,
        kRemaining: remaining,
        found: false,
        path: [...path],
        type: 'push'
      });
      current = current.left;
    }
    current = stack.pop()!;
    path.pop();
    remaining--;
    steps.push({
      description: `Visit node ${current.val}, k sisa = ${remaining}`,
      node: current.val,
      kRemaining: remaining,
      found: remaining === 0,
      path: [...path, current.val],
      type: remaining === 0 ? 'found' : 'visit'
    });
    if (remaining === 0) {
      steps.push({
        description: `Elemen ke-k ditemukan: ${current.val}`,
        node: current.val,
        kRemaining: remaining,
        found: true,
        path: [...path, current.val],
        type: 'done'
      });
      break;
    }
    current = current.right;
  }

  if (remaining > 0) {
    steps.push({
      description: 'k lebih besar dari jumlah node',
      node: null,
      kRemaining: remaining,
      found: false,
      path: [],
      type: 'done'
    });
  }

  return steps;
}

export default function KthSmallestSimulator({ nodes, k }: Props) {
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(900);
  const cardRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const tree = buildTree(nodes);
    const gen = generateSteps(tree, k);
    setSteps(gen);
    setCurrentStep(0);
    setIsPlaying(false);
  }, [nodes, k]);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { x: -20, opacity: 0, scale: 0.95 },
        { x: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' }
      );
    }
  }, [currentStep]);

  useEffect(() => {
    if (isPlaying && currentStep < steps.length - 1) {
      intervalRef.current = window.setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPlaying, currentStep, steps.length, speed]);

  if (steps.length === 0) return null;
  const s = steps[currentStep];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-50 via-violet-50 to-indigo-50 rounded-2xl p-6 shadow-xl border-2 border-purple-200">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-violet-500 text-white rounded-xl shadow-lg">
              <ListOrdered size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-800">Inorder Traversal Simulation</h3>
              <p className="text-sm text-slate-600">Iterative approach with stack - Step {currentStep + 1} / {steps.length}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="px-3 py-2 rounded-lg border-2 border-purple-200 text-sm font-semibold text-purple-700 bg-white shadow-sm hover:border-purple-300 transition-colors"
            >
              <option value={1500}>0.5x</option>
              <option value={900}>1x</option>
              <option value={600}>1.5x</option>
              <option value={300}>3x</option>
            </select>
            <button
              onClick={() => setIsPlaying((p) => !p)}
              disabled={currentStep >= steps.length - 1}
              className={`px-4 py-2 rounded-lg font-semibold shadow-md transition-all ${currentStep >= steps.length - 1
                  ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white active:scale-95'
                }`}
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </button>
            <button onClick={() => { setIsPlaying(false); setCurrentStep(0); }} className="px-4 py-2 rounded-lg bg-white border-2 border-purple-200 text-purple-700 hover:border-purple-300 shadow-sm transition-all active:scale-95">
              <RotateCcw size={18} />
            </button>
            <button onClick={() => setCurrentStep((v) => Math.max(0, v - 1))} className="px-4 py-2 rounded-lg bg-white border-2 border-purple-200 text-purple-700 hover:border-purple-300 shadow-sm transition-all active:scale-95">
              <StepBack size={18} />
            </button>
            <button onClick={() => setCurrentStep((v) => Math.min(steps.length - 1, v + 1))} className="px-4 py-2 rounded-lg bg-white border-2 border-purple-200 text-purple-700 hover:border-purple-300 shadow-sm transition-all active:scale-95">
              <StepForward size={18} />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl border-2 border-purple-200 p-6 shadow-lg" ref={cardRef}>
          {s.found && s.type === 'done' && (
            <div className="mb-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-lg flex items-center gap-3 shadow-lg animate-pulse">
              <div className="text-3xl">🎉</div>
              <div className="flex-1">
                <div className="font-bold text-lg">Kth Smallest Element Found!</div>
                <div className="text-sm opacity-90">Successfully located element via inorder traversal</div>
              </div>
              <div className="text-4xl font-bold">{s.node}</div>
            </div>
          )}

          <p className={`text-base font-semibold mb-4 ${s.type === 'found' || s.type === 'done' ? 'text-green-700' :
              s.type === 'visit' ? 'text-purple-700' : 'text-indigo-700'
            }`}>
            {s.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`p-5 rounded-xl border-2 transition-all ${s.node !== null ? 'bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200 scale-105' : 'bg-slate-50 border-slate-200'
              }`}>
              <p className="text-xs text-slate-600 font-semibold mb-2">Current Node</p>
              <p className="text-3xl font-bold text-purple-700">{s.node ?? 'null'}</p>
            </div>
            <div className={`p-5 rounded-xl border-2 ${s.kRemaining === 0 ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-300 scale-105' : 'bg-violet-50 border-violet-200'
              }`}>
              <p className="text-xs text-slate-600 font-semibold mb-2">K Remaining</p>
              <p className={`text-3xl font-bold ${s.kRemaining === 0 ? 'text-green-600' : 'text-violet-700'}`}>{s.kRemaining}</p>
            </div>
            <div className={`p-5 rounded-xl border-2 ${s.found ? 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-300' : 'bg-slate-50 border-slate-200'
              }`}>
              <p className="text-xs text-slate-600 font-semibold mb-2">Status</p>
              <p className={`text-lg font-bold ${s.found ? 'text-emerald-700' : s.type === 'done' ? 'text-slate-700' : 'text-indigo-700'
                }`}>
                {s.found ? '✅ Found' : s.type === 'done' ? 'Complete' : 'Searching'}
              </p>
            </div>
          </div>

          {s.path.length > 0 && (
            <div className="mt-5 bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-xl border-2 border-indigo-200">
              <p className="text-xs text-indigo-700 font-bold mb-3">Stack Path (Left Traversal):</p>
              <div className="flex flex-wrap gap-2">
                {s.path.map((v, idx) => (
                  <span key={idx} className="px-4 py-2 bg-white text-indigo-700 rounded-lg border-2 border-indigo-300 text-sm font-bold shadow-sm">
                    {v}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
