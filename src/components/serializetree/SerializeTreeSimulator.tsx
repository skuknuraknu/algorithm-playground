import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { Play, Pause, RotateCcw, StepForward, StepBack, ListEnd, GitCommit } from 'lucide-react';

type TreeNode = { val: number; left: TreeNode | null; right: TreeNode | null } | null;

type Step = {
  desc: string;
  queue: (number | 'null')[];
  output: (number | 'null')[];
  focus: number | null;
  phase: 'serialize' | 'done';
};

type Props = {
  nodes: (number | null)[];
};

function buildTree(arr: (number | null)[]): TreeNode {
  if (!arr.length || arr[0] === null || arr[0] === undefined) return null;
  const root: TreeNode = { val: arr[0] as number, left: null, right: null };
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < arr.length) {
    const node = queue.shift();
    if (!node) break;
    if (arr[i] !== undefined) {
      if (arr[i] !== null) {
        node.left = { val: arr[i] as number, left: null, right: null };
        queue.push(node.left);
      }
      i++;
    }
    if (i < arr.length && arr[i] !== undefined) {
      if (arr[i] !== null) {
        node.right = { val: arr[i] as number, left: null, right: null };
        queue.push(node.right);
      }
      i++;
    }
  }
  return root;
}

function generateSerializeSteps(root: TreeNode): Step[] {
  if (!root) return [{ desc: 'Tree kosong -> "null"', queue: [], output: ['null'], focus: null, phase: 'done' }];
  const steps: Step[] = [];
  const q: (TreeNode | null)[] = [root];
  const out: (number | 'null')[] = [];

  while (q.length) {
    const node = q.shift() ?? null;
    if (node) {
      out.push(node.val);
      q.push(node.left, node.right);
      steps.push({
        desc: `Visit ${node.val}, enqueue left/right`,
        queue: q.map((n) => (n ? n.val : 'null')),
        output: [...out],
        focus: node.val,
        phase: 'serialize',
      });
    } else {
      out.push('null');
      steps.push({
        desc: 'Visit null (placeholder)',
        queue: q.map((n) => (n ? n.val : 'null')),
        output: [...out],
        focus: null,
        phase: 'serialize',
      });
    }
  }

  while (out.length && out[out.length - 1] === 'null') out.pop();
  steps.push({
    desc: 'Trim null di akhir untuk string yang ringkas',
    queue: [],
    output: [...out],
    focus: null,
    phase: 'done',
  });

  return steps;
}

export default function SerializeTreeSimulator({ nodes }: Props) {
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(900);
  const cardRef = useRef<HTMLDivElement>(null);

  const root = useMemo(() => buildTree(nodes), [nodes]);
  const steps = useMemo(() => generateSerializeSteps(root), [root]);

  useEffect(() => {
    setStepIndex(0);
    setIsPlaying(false);
  }, [nodes]);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(cardRef.current, { y: 6, opacity: 0.9 }, { y: 0, opacity: 1, duration: 0.35, ease: 'power2.out' });
    }
  }, [stepIndex]);

  useEffect(() => {
    if (isPlaying) {
      const id = window.setInterval(() => {
        setStepIndex((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, speed);
      return () => clearInterval(id);
    }
  }, [isPlaying, speed, steps.length]);

  const step = steps[stepIndex];

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-indigo-50 to-violet-50 border-2 border-indigo-100 rounded-2xl p-5 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-100 text-indigo-700 rounded-xl"><GitCommit size={20} /></div>
            <div>
              <h3 className="text-xl font-bold text-slate-800">Simulasi Serialize (BFS)</h3>
              <p className="text-sm text-slate-500">Langkah {stepIndex + 1} / {steps.length}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <select value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="px-2 py-1 rounded-lg border border-indigo-200 bg-white text-sm font-semibold text-indigo-700">
              <option value={1500}>0.5x</option>
              <option value={900}>1x</option>
              <option value={600}>1.5x</option>
              <option value={300}>3x</option>
            </select>
            <button onClick={() => setIsPlaying((p) => !p)} className="px-3 py-2 rounded-lg bg-indigo-600 text-white shadow font-semibold">{isPlaying ? <Pause size={16} /> : <Play size={16} />}</button>
            <button onClick={() => { setIsPlaying(false); setStepIndex(0); }} className="px-3 py-2 rounded-lg bg-white border-2 border-indigo-100 text-slate-700 shadow"><RotateCcw size={16} /></button>
            <button onClick={() => setStepIndex((v) => Math.max(0, v - 1))} className="px-3 py-2 rounded-lg bg-white border-2 border-indigo-100 text-slate-700 shadow"><StepBack size={16} /></button>
            <button onClick={() => setStepIndex((v) => Math.min(steps.length - 1, v + 1))} className="px-3 py-2 rounded-lg bg-white border-2 border-indigo-100 text-slate-700 shadow"><StepForward size={16} /></button>
          </div>
        </div>

        <div ref={cardRef} className="bg-white border-2 border-indigo-100 rounded-xl p-4 shadow-sm">
          <p className="text-sm font-semibold text-indigo-700 mb-3">{step.desc}</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-100">
              <p className="text-xs text-slate-500 mb-1">Queue</p>
              <div className="flex flex-wrap gap-2">
                {step.queue.length === 0 && <span className="text-slate-400 text-sm">kosong</span>}
                {step.queue.map((v, i) => (
                  <span key={i} className={`px-3 py-1 rounded-lg border text-sm font-semibold ${v === 'null' ? 'bg-slate-100 text-slate-500 border-slate-200' : 'bg-indigo-100 text-indigo-700 border-indigo-200'}`}>
                    {v}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-4 rounded-xl bg-violet-50 border border-violet-100">
              <p className="text-xs text-slate-500 mb-1">Output</p>
              <div className="flex flex-wrap gap-2">
                {step.output.map((v, i) => (
                  <span key={i} className={`px-3 py-1 rounded-lg border text-sm font-semibold ${v === 'null' ? 'bg-white text-slate-500 border-slate-200' : 'bg-violet-100 text-violet-700 border-violet-200'} ${step.focus === v ? 'ring-2 ring-violet-300' : ''}`}>
                    {v}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {step.phase === 'done' && (
        <div className="bg-white border-2 border-emerald-100 rounded-2xl p-4 shadow flex items-center gap-2 text-emerald-700">
          <ListEnd size={18} />
          <span>Serialize selesai. String: {step.output.join(',')}</span>
        </div>
      )}
    </div>
  );
}
