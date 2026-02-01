import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { Play, Square, SkipForward, RotateCcw, Clock3, Home, HandCoins, Award } from 'lucide-react';
import { robWithSteps } from './types';

interface Props {
  houses: number[];
}

export default function HouseRobberSimulator({ houses }: Props) {
  const { steps, max, chosenHouses } = useMemo(() => robWithSteps(houses), [houses]);
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(700);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIdx(0);
    setPlaying(false);
  }, [houses]);

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
  const chosenSet = new Set(current?.bestPath ?? []);
  const finalSet = new Set(chosenHouses);

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
          Masukkan daftar nilai rumah untuk mensimulasikan DP.
        </div>
      )}

      {current && (
        <div className="grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 bg-white rounded-xl p-5 shadow-lg border-2 border-slate-200" ref={cardRef}>
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-slate-500">Rumah #{current.index + 1}</div>
              <div className="text-xs px-2 py-1 rounded-full border bg-indigo-50 text-indigo-700 border-indigo-200">pilih terbaik</div>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="rounded-lg border-2 border-emerald-200 bg-emerald-50 p-3">
                <div className="text-sm text-emerald-700 font-semibold flex items-center gap-2"><HandCoins size={16}/>Pick</div>
                <div className="text-lg font-bold text-emerald-800">{current.pick}</div>
                <div className="text-xs text-emerald-600 mt-1">nums[{current.index}] + best hingga i-2</div>
              </div>
              <div className="rounded-lg border-2 border-slate-200 bg-slate-50 p-3">
                <div className="text-sm text-slate-700 font-semibold">Skip</div>
                <div className="text-lg font-bold text-slate-800">{current.skip}</div>
                <div className="text-xs text-slate-600 mt-1">best hingga i-1</div>
              </div>
            </div>
            <div className="mt-3 text-sm text-slate-700">Keputusan: <span className="font-semibold text-indigo-700 uppercase">{current.chosen}</span> → best = {current.best}</div>
          </div>

          <div className="bg-slate-900 text-white rounded-xl p-5 shadow-xl border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm text-slate-300">Preview Jalur</div>
              <div className="text-xs px-2 py-1 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-100">best so far</div>
            </div>
            <div className="flex flex-wrap gap-2">
              {houses.map((v, i) => (
                <div
                  key={i}
                  className={`px-3 py-2 rounded-lg border text-sm flex items-center gap-1 ${chosenSet.has(i) ? 'bg-emerald-500/20 border-emerald-400 text-emerald-50' : 'bg-slate-800 border-slate-700 text-slate-200'}`}
                >
                  <Home size={14}/> {v}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {steps.length > 0 && (
        <div className="rounded-xl border-2 border-emerald-200 bg-emerald-50 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-emerald-700 font-semibold"><Award size={18}/> Maksimum akhir</div>
          <div className="text-lg font-bold text-emerald-800">{max}</div>
          <div className="text-sm text-emerald-700">Ambil rumah: [{Array.from(finalSet).map((i) => i + 1).join(', ')}]</div>
        </div>
      )}
    </div>
  );
}
