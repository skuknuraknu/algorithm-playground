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
        { y: 8, opacity: 0, scale: 0.97 },
        { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.6)' }
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
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, currentStep, steps.length, speed]);

  if (steps.length === 0) return null;
  const s = steps[currentStep];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-50 to-violet-50 rounded-2xl p-6 shadow-xl border-2 border-indigo-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-100 text-indigo-700 rounded-xl"><ListOrdered size={22} /></div>
            <div>
              <h3 className="text-xl font-bold text-slate-800">Simulasi Inorder (Iteratif)</h3>
              <p className="text-sm text-slate-500">Langkah {currentStep + 1} / {steps.length}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="px-3 py-2 rounded-lg border-2 border-indigo-100 text-sm font-semibold text-indigo-700 bg-white"
            >
              <option value={1500}>0.5x</option>
              <option value={900}>1x</option>
              <option value={600}>1.5x</option>
              <option value={300}>3x</option>
            </select>
            <button
              onClick={() => setIsPlaying((p) => !p)}
              className="px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow"
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>
            <button onClick={() => { setIsPlaying(false); setCurrentStep(0); }} className="px-3 py-2 rounded-lg bg-white border-2 border-indigo-100 text-slate-700 hover:border-indigo-200 shadow"><RotateCcw size={16} /></button>
            <button onClick={() => setCurrentStep((v) => Math.max(0, v - 1))} className="px-3 py-2 rounded-lg bg-white border-2 border-indigo-100 text-slate-700 hover:border-indigo-200 shadow"><StepBack size={16} /></button>
            <button onClick={() => setCurrentStep((v) => Math.min(steps.length - 1, v + 1))} className="px-3 py-2 rounded-lg bg-white border-2 border-indigo-100 text-slate-700 hover:border-indigo-200 shadow"><StepForward size={16} /></button>
          </div>
        </div>

        <div className="bg-white rounded-xl border-2 border-indigo-100 p-5 shadow-lg" ref={cardRef}>
          <p className="text-sm font-semibold text-indigo-700 mb-3">{s.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-100">
              <p className="text-xs text-slate-500 mb-1">Node</p>
              <p className="text-2xl font-bold text-slate-800">{s.node ?? 'null'}</p>
            </div>
            <div className="p-4 rounded-xl bg-violet-50 border border-violet-100">
              <p className="text-xs text-slate-500 mb-1">k tersisa</p>
              <p className="text-2xl font-bold text-slate-800">{s.kRemaining}</p>
            </div>
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100">
              <p className="text-xs text-slate-500 mb-1">Status</p>
              <p className="text-lg font-semibold text-emerald-700">{s.found ? 'Ditemukan' : s.type === 'done' ? 'Selesai' : 'Berlanjut'}</p>
            </div>
          </div>

          {s.path.length > 0 && (
            <div className="mt-4">
              <p className="text-xs text-slate-500 mb-2">Stack path (kiri):</p>
              <div className="flex flex-wrap gap-2">
                {s.path.map((v, idx) => (
                  <span key={idx} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg border border-indigo-200 text-sm font-semibold">
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
