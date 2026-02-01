import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { Play, Square, SkipForward, RotateCcw, Clock3, AlertTriangle } from 'lucide-react';
import { buildMinStackSteps, MinStackOp } from './types';

interface MinStackSimulatorProps {
  operations: MinStackOp[];
}

export default function MinStackSimulator({ operations }: MinStackSimulatorProps) {
  const steps = useMemo(() => buildMinStackSteps(operations), [operations]);
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(800);

  const infoRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrent(0);
    setPlaying(false);
  }, [operations]);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (playing && current < steps.length - 1) {
      timer = setTimeout(() => setCurrent((prev) => prev + 1), speed);
    }
    if (current === steps.length - 1) setPlaying(false);
    return () => timer && clearTimeout(timer);
  }, [playing, current, steps.length, speed]);

  useEffect(() => {
    if (infoRef.current) {
      gsap.fromTo(infoRef.current, { y: 8, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: 'power2.out' });
    }
    if (stackRef.current) {
      const cards = stackRef.current.querySelectorAll('.stack-card');
      gsap.fromTo(cards, { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'back.out(1.6)', stagger: 0.05 });
    }
  }, [current]);

  const currentStep = steps[current];

  const handlePlay = () => {
    if (steps.length === 0) return;
    setPlaying(true);
    if (current === steps.length - 1) setCurrent(0);
  };

  const handleStop = () => {
    setPlaying(false);
    setCurrent(0);
  };

  const handleNext = () => {
    setPlaying(false);
    setCurrent((prev) => Math.min(prev + 1, steps.length - 1));
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
            disabled={current >= steps.length - 1}
            className="bg-slate-700 disabled:bg-slate-300 disabled:cursor-not-allowed hover:bg-slate-800 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 shadow"
          >
            <SkipForward size={18} /> Next
          </button>
          <button
            onClick={() => setCurrent(0)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 shadow"
          >
            <RotateCcw size={18} /> Reset Step
          </button>

          <div className="ml-auto flex items-center gap-2 text-sm text-slate-700">
            <Clock3 size={16} />
            <select
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="border-2 border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
            >
              <option value={1400}>0.5x</option>
              <option value={800}>1x</option>
              <option value={400}>2x</option>
              <option value={200}>4x</option>
            </select>
          </div>
        </div>
        <div className="mt-3 text-sm text-slate-600">
          Step {steps.length ? current + 1 : 0} / {steps.length}
        </div>
      </div>

      {steps.length === 0 && (
        <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-4 text-amber-800 flex items-center gap-2">
          <AlertTriangle size={18} />
          Tambahkan operasi terlebih dahulu untuk menjalankan simulasi.
        </div>
      )}

      {currentStep && (
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="bg-slate-900 text-white rounded-xl p-5 shadow-xl" ref={stackRef}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-lg font-bold">State Setelah Operasi #{current + 1}</h4>
                <p className="text-slate-300 text-sm">{currentStep.op.type}{currentStep.op.value !== undefined ? `(${currentStep.op.value})` : '()'}</p>
              </div>
              {currentStep.output !== undefined && (
                <div className="px-3 py-1 rounded-lg bg-emerald-500/20 border border-emerald-400 text-emerald-200 text-sm font-semibold">
                  Output: {currentStep.output ?? 'null'}
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <div className="text-xs uppercase tracking-wide text-slate-400 mb-2">Stack</div>
                <div className="space-y-2">
                  {[...currentStep.stack].reverse().map((v, idx) => (
                    <div key={`s-${idx}`} className="stack-card bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 flex items-center justify-between">
                      <span className="text-lg font-semibold">{v}</span>
                      <span className="text-xs text-slate-400">{idx === 0 ? 'top' : ''}</span>
                    </div>
                  ))}
                  {currentStep.stack.length === 0 && (
                    <div className="text-slate-500 italic">kosong</div>
                  )}
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wide text-slate-400 mb-2">Min Stack</div>
                <div className="space-y-2">
                  {[...currentStep.minStack].reverse().map((v, idx) => (
                    <div key={`m-${idx}`} className="stack-card bg-emerald-500/20 border border-emerald-400 rounded-lg px-4 py-3 flex items-center justify-between text-emerald-100">
                      <span className="text-lg font-bold">{v}</span>
                      <span className="text-xs">{idx === 0 ? 'min now' : ''}</span>
                    </div>
                  ))}
                  {currentStep.minStack.length === 0 && (
                    <div className="text-emerald-200 italic">belum ada minimum</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-lg border-2 border-slate-200" ref={infoRef}>
            <div className="text-sm text-slate-600 mb-3">Penjelasan langkah</div>
            <div className="text-lg font-semibold text-slate-800 mb-2">{currentStep.action}</div>
            <div className="text-sm text-slate-700">
              Stack: <span className="font-mono">[{currentStep.stack.join(', ')}]</span>
              <br />
              Min: <span className="font-mono">[{currentStep.minStack.join(', ')}]</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
