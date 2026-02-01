import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { Play, Pause, StepForward, StepBack, RotateCcw, Activity, TrendingUp } from 'lucide-react';

type TreeNode = { val: number; left: TreeNode | null; right: TreeNode | null } | null;

type Step = {
  node: number | null;
  leftGain: number;
  rightGain: number;
  localBest: number;
  globalBest: number;
  description: string;
};

type Props = {
  nodes: (number | null)[];
};

function buildTree(arr: (number | null)[]): TreeNode {
  if (!arr.length || arr[0] === null || arr[0] === undefined) return null;
  const root: TreeNode = { val: arr[0] as number, left: null, right: null };
  const q: (TreeNode)[] = [root];
  let i = 1;
  while (q.length && i < arr.length) {
    const node = q.shift()!;
    if (arr[i] !== undefined) {
      if (arr[i] !== null) {
        node.left = { val: arr[i] as number, left: null, right: null };
        q.push(node.left);
      }
      i++;
    }
    if (i < arr.length && arr[i] !== undefined) {
      if (arr[i] !== null) {
        node.right = { val: arr[i] as number, left: null, right: null };
        q.push(node.right);
      }
      i++;
    }
  }
  return root;
}

function generateSteps(root: TreeNode): Step[] {
  const steps: Step[] = [];
  let globalBest = -Infinity;

  function dfs(node: TreeNode): number {
    if (!node) return 0;
    const leftGain = Math.max(0, dfs(node.left));
    const rightGain = Math.max(0, dfs(node.right));
    const localBest = (node.val ?? 0) + leftGain + rightGain;
    globalBest = Math.max(globalBest, localBest);
    steps.push({
      node: node.val ?? null,
      leftGain,
      rightGain,
      localBest,
      globalBest,
      description: `Node ${node.val}: gainL=${leftGain}, gainR=${rightGain}, bestLocal=${localBest}, global=${globalBest}`,
    });
    return (node.val ?? 0) + Math.max(leftGain, rightGain);
  }

  dfs(root);
  return steps;
}

export default function MaxPathSumSimulator({ nodes }: Props) {
  const tree = useMemo(() => buildTree(nodes), [nodes]);
  const steps = useMemo(() => generateSteps(tree), [tree]);
  const [idx, setIdx] = useState(steps.length ? steps.length - 1 : 0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(900);
  const cardRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    setIdx(steps.length ? steps.length - 1 : 0);
    setPlaying(false);
  }, [steps]);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { y: 10, opacity: 0, scale: 0.97 },
        { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.6)' }
      );
    }
  }, [idx]);

  useEffect(() => {
    if (playing) {
      intervalRef.current = window.setInterval(() => {
        setIdx((prev) => {
          if (prev >= steps.length - 1) {
            setPlaying(false);
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
  }, [playing, speed, steps.length]);

  if (!steps.length) return null;
  const s = steps[idx];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-50 to-violet-50 rounded-2xl p-6 shadow-xl border-2 border-indigo-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-100 text-indigo-700 rounded-xl"><Activity size={22} /></div>
            <div>
              <h3 className="text-xl font-bold text-slate-800">Simulasi DFS Gain</h3>
              <p className="text-sm text-slate-500">Langkah {idx + 1} / {steps.length}</p>
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
              onClick={() => setPlaying((p) => !p)}
              className="px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow"
            >
              {playing ? <Pause size={16} /> : <Play size={16} />}
            </button>
            <button onClick={() => { setPlaying(false); setIdx(0); }} className="px-3 py-2 rounded-lg bg-white border-2 border-indigo-100 text-slate-700 hover:border-indigo-200 shadow"><RotateCcw size={16} /></button>
            <button onClick={() => setIdx((v) => Math.max(0, v - 1))} className="px-3 py-2 rounded-lg bg-white border-2 border-indigo-100 text-slate-700 hover:border-indigo-200 shadow"><StepBack size={16} /></button>
            <button onClick={() => setIdx((v) => Math.min(steps.length - 1, v + 1))} className="px-3 py-2 rounded-lg bg-white border-2 border-indigo-100 text-slate-700 hover:border-indigo-200 shadow"><StepForward size={16} /></button>
          </div>
        </div>

        <div className="bg-white rounded-xl border-2 border-indigo-100 p-5 shadow-lg" ref={cardRef}>
          <p className="text-sm font-semibold text-indigo-700 mb-3">{s.description}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-100">
              <p className="text-xs text-slate-500 mb-1">Node</p>
              <p className="text-2xl font-bold text-slate-800">{s.node ?? 'null'}</p>
            </div>
            <div className="p-4 rounded-xl bg-violet-50 border border-violet-100">
              <p className="text-xs text-slate-500 mb-1">Gain kiri</p>
              <p className="text-2xl font-bold text-slate-800">{s.leftGain}</p>
            </div>
            <div className="p-4 rounded-xl bg-cyan-50 border border-cyan-100">
              <p className="text-xs text-slate-500 mb-1">Gain kanan</p>
              <p className="text-2xl font-bold text-slate-800">{s.rightGain}</p>
            </div>
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100">
              <p className="text-xs text-slate-500 mb-1">Global best</p>
              <p className="text-2xl font-bold text-emerald-700">{s.globalBest}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border-2 border-indigo-100 rounded-2xl p-5 shadow-lg">
        <div className="flex items-center gap-2 mb-2 text-slate-700 font-semibold">
          <TrendingUp size={18} /> Rumus gain: node + max(0, left, right)
        </div>
        <p className="text-sm text-slate-600">Local best memakai kedua sisi: node + max(0,left) + max(0,right)</p>
      </div>
    </div>
  );
}
