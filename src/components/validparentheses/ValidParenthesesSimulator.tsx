import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { Play, Square, SkipForward, RotateCcw, Clock3 } from 'lucide-react';
import { buildVPSteps } from './types';

interface ValidParenthesesSimulatorProps {
  value: string;
}

export default function ValidParenthesesSimulator({ value }: ValidParenthesesSimulatorProps) {
  const steps = useMemo(() => buildVPSteps(value), [value]);
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(700);
  const infoRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIdx(0);
    setPlaying(false);
  }, [value]);

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
    if (stackRef.current) {
      const cards = stackRef.current.querySelectorAll('.vp-card');
      gsap.fromTo(cards, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: 'back.out(1.6)', stagger: 0.05 });
    }
  }, [idx]);

  const current = steps[idx];
  const finalValid = steps.length === 0 ? true : steps[steps.length - 1].isValidSoFar && steps[steps.length - 1].stack.length === 0;

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => {
              if (steps.length === 0) return;
              setPlaying(true);
              if (idx === steps.length - 1) setIdx(0);
            }}
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
          Masukkan string bracket untuk menjalankan simulasi.
        </div>
      )}

      {current && (
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="bg-slate-900 text-white rounded-xl p-5 shadow-xl" ref={stackRef}>
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-sm text-slate-300">Karakter #{current.index + 1}</div>
                <div className="text-2xl font-bold">'{current.char}'</div>
              </div>
              <div className={`px-3 py-1 rounded-lg text-sm font-semibold border ${current.isValidSoFar ? 'bg-emerald-500/20 border-emerald-400 text-emerald-100' : 'bg-rose-500/20 border-rose-400 text-rose-100'}`}>
                {current.isValidSoFar ? 'valid sejauh ini' : 'mismatch'}
              </div>
            </div>
            <div className="text-sm text-slate-300 mb-2">Stack (top di atas)</div>
            <div className="space-y-2">
              {[...current.stack].reverse().map((c, i) => (
                <div key={i} className="vp-card bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 flex items-center justify-between">
                  <span className="text-lg font-semibold">{c}</span>
                  <span className="text-xs text-slate-400">{i === 0 ? 'top' : ''}</span>
                </div>
              ))}
              {current.stack.length === 0 && <div className="text-slate-500 italic">(kosong)</div>}
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-lg border-2 border-slate-200" ref={infoRef}>
            <div className="text-sm text-slate-600 mb-2">Penjelasan</div>
            <div className="text-lg font-semibold text-slate-800 mb-2">{current.action}</div>
            <div className="text-sm text-slate-700 font-mono">
              stack: [{current.stack.join(', ')}]
            </div>
            <div className="text-xs text-slate-500 mt-2">String valid jika tidak ada mismatch dan stack kosong di akhir.</div>
          </div>
        </div>
      )}

      {steps.length > 0 && (
        <div className={`rounded-lg border-2 p-4 ${finalValid ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-rose-200 bg-rose-50 text-rose-800'}`}>
          Status akhir: {finalValid ? 'VALID' : 'INVALID'}
        </div>
      )}
    </div>
  );
}
