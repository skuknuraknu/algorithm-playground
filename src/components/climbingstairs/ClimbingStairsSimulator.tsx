import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { Play, Square, SkipForward, RotateCcw, Clock3, ChevronsUp } from 'lucide-react';
import { climbWithSteps } from './types';

interface Props {
  n: number;
}

export default function ClimbingStairsSimulator({ n }: Props) {
  const { steps, total } = useMemo(() => climbWithSteps(n), [n]);
  const [idx, setIdx] = useState(steps.length ? steps.length - 1 : 0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(600);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIdx(steps.length ? steps.length - 1 : 0);
    setPlaying(false);
  }, [n, steps.length]);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (playing && idx < steps.length - 1) {
      timer = setTimeout(() => setIdx((p) => Math.min(p + 1, steps.length - 1)), speed);
    }
    if (idx === steps.length - 1) setPlaying(false);
    return () => timer && clearTimeout(timer);
  }, [playing, idx, steps.length, speed]);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(cardRef.current, { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' });
    }
  }, [idx]);

  const current = steps[idx];

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => { if (steps.length) { setPlaying(true); if (idx === steps.length - 1) setIdx(0); } }}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 shadow"
          >
            <Play size={18} /> Play
          </button>
          <button
            onClick={() => { setPlaying(false); setIdx(0); }}
            className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 shadow"
          >
            <Square size={18} /> Stop
          </button>
          <button
            onClick={() => { setPlaying(false); setIdx((p) => Math.min(p + 1, steps.length - 1)); }}
            disabled={idx >= steps.length - 1}
            className="bg-slate-700 disabled:bg-slate-300 disabled:cursor-not-allowed hover:bg-slate-800 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 shadow"
          >
            <SkipForward size={18} /> Next
          </button>
          <button
            onClick={() => { setPlaying(false); setIdx(0); }}
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

      {steps.length === 0 && (
        <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-4 text-amber-800">
          Masukkan n &gt; 0 untuk simulasi DP.
        </div>
      )}

      {current && (
        <div className="grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 bg-white rounded-xl p-5 shadow-lg border-2 border-slate-200" ref={cardRef}>
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-slate-500">Tangga #{current.step}</div>
              <div className="text-xs px-2 py-1 rounded-full border bg-indigo-50 text-indigo-700 border-indigo-200">dp[{current.step}]</div>
            </div>
            <div className="text-3xl font-bold text-slate-800">{current.ways}</div>
            <div className="text-sm text-slate-600 mt-2">dp[i-1]={current.prev1} · dp[i-2]={current.prev2}</div>
          </div>

          <div className="bg-slate-900 text-white rounded-xl p-5 shadow-xl border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm text-slate-300">Preview</div>
              <ChevronsUp size={18} className="text-indigo-200" />
            </div>
            <div className="flex flex-wrap gap-2">
              {steps.map((s, i) => (
                <div
                  key={s.step}
                  className={`px-3 py-2 rounded-lg border text-sm ${i <= idx ? 'bg-indigo-500/30 border-indigo-300 text-indigo-50' : 'bg-slate-800 border-slate-700 text-slate-200'}`}
                >
                  {s.step}:{s.ways}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {steps.length > 0 && (
        <div className="rounded-xl border-2 border-emerald-200 bg-emerald-50 p-4 flex items-center justify-between">
          <div className="text-emerald-700 font-semibold">Total cara: {total}</div>
          <div className="text-sm text-emerald-700">dp[n] dengan n = {n}</div>
        </div>
      )}
    </div>
  );
}
