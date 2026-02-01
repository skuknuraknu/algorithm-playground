import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { Play, Square, SkipForward, RotateCcw, Clock3 } from 'lucide-react';
import { buildTree, levelOrderWithSteps } from './types';

interface Props {
  nodes: (number | null)[];
}

export default function BinaryTreeLevelOrderSimulator({ nodes }: Props) {
  const tree = useMemo(() => buildTree(nodes), [nodes]);
  const { steps, levels } = useMemo(() => levelOrderWithSteps(tree), [tree]);
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(700);
  const infoRef = useRef<HTMLDivElement>(null);
  const queueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIdx(0);
    setPlaying(false);
  }, [nodes]);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (playing && idx < steps.length - 1) {
      timer = setTimeout(() => setIdx((p) => p + 1), speed);
    }
    if (idx === steps.length - 1) setPlaying(false);
    return () => timer && clearTimeout(timer);
  }, [playing, idx, steps.length, speed]);

  useEffect(() => {
    if (infoRef.current) {
      gsap.fromTo(infoRef.current, { y: 8, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: 'power2.out' });
    }
    if (queueRef.current) {
      const cards = queueRef.current.querySelectorAll('.queue-card');
      gsap.fromTo(cards, { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'back.out(1.6)', stagger: 0.05 });
    }
  }, [idx]);

  const current = steps[idx];

  const handlePlay = () => {
    if (steps.length === 0) return;
    setPlaying(true);
    if (idx === steps.length - 1) setIdx(0);
  };

  const handleStop = () => {
    setPlaying(false);
    setIdx(0);
  };

  const handleNext = () => {
    setPlaying(false);
    setIdx((p) => Math.min(p + 1, steps.length - 1));
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handlePlay}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 shadow"
          >
            <Play size={18} /> Play
          </button>
          <button
            onClick={handleStop}
            className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 shadow"
          >
            <Square size={18} /> Stop
          </button>
          <button
            onClick={handleNext}
            disabled={idx >= steps.length - 1}
            className="bg-slate-700 disabled:bg-slate-300 disabled:cursor-not-allowed hover:bg-slate-800 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 shadow"
          >
            <SkipForward size={18} /> Next
          </button>
          <button
            onClick={() => setIdx(0)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 shadow"
          >
            <RotateCcw size={18} /> Reset
          </button>

          <div className="ml-auto flex items-center gap-2 text-sm text-slate-700">
            <Clock3 size={16} />
            <select
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="border-2 border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
            >
              <option value={1400}>0.5x</option>
              <option value={700}>1x</option>
              <option value={400}>2x</option>
              <option value={200}>4x</option>
            </select>
          </div>
        </div>
        <div className="mt-3 text-sm text-slate-600">Step {steps.length ? idx + 1 : 0} / {steps.length}</div>
      </div>

      {!tree && (
        <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-4 text-amber-800">
          Masukkan tree dulu untuk menjalankan simulasi.
        </div>
      )}

      {tree && current && (
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="bg-slate-900 text-white rounded-xl p-5 shadow-xl" ref={queueRef}>
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-sm text-slate-300">Step {current.step}</div>
                <div className="text-2xl font-bold">{current.current !== null ? `Visit ${current.current}` : 'Level selesai'}</div>
              </div>
              <div className="px-3 py-1 rounded-lg bg-indigo-500/20 border border-indigo-400 text-indigo-100 text-sm font-semibold">
                Queue size: {current.queue.length}
              </div>
            </div>

            <div className="text-sm text-slate-300 mb-2">Queue (front → back)</div>
            <div className="flex flex-wrap gap-2">
              {current.queue.map((v, i) => (
                <div key={i} className="queue-card px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 font-mono text-sm">
                  {v}
                </div>
              ))}
              {current.queue.length === 0 && <div className="text-slate-500 italic">(kosong)</div>}
            </div>

            <div className="mt-4 text-sm text-slate-400 font-mono">
              Levels sementara: [{current.levels.map((lvl) => `[${lvl.join(', ')}]`).join(', ')}]
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-lg border-2 border-slate-200" ref={infoRef}>
            <div className="text-sm text-slate-600 mb-2">Penjelasan</div>
            <div className="text-lg font-semibold text-slate-800 mb-2">{current.action}</div>
            <div className="text-sm text-slate-700 font-mono">
              Queue: [{current.queue.join(', ')}]
            </div>
            <div className="text-xs text-slate-500 mt-2">Traversal valid jika queue kosong dan semua node telah ditambahkan ke levels.</div>
          </div>
        </div>
      )}

      {tree && steps.length > 0 && (
        <div className="rounded-lg border-2 p-4 bg-emerald-50 border-emerald-200 text-emerald-800">
          Output akhir: {JSON.stringify(levels)}
        </div>
      )}
    </div>
  );
}
