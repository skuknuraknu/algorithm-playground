import { useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import { ShieldCheck, ArrowDownCircle } from 'lucide-react';
import { buildMinStackSteps, MinStackOp } from './types';

interface MinStackVisualizerProps {
  operations: MinStackOp[];
}

export default function MinStackVisualizer({ operations }: MinStackVisualizerProps) {
  const steps = useMemo(() => buildMinStackSteps(operations), [operations]);
  const finalState = steps[steps.length - 1];

  const stackRefs = useRef<HTMLDivElement[]>([]);
  const minStackRefs = useRef<HTMLDivElement[]>([]);
  stackRefs.current = [];
  minStackRefs.current = [];

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      '.minstack-panel',
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.08 }
    );
    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    const cards = [...stackRefs.current, ...minStackRefs.current].filter(Boolean);
    if (cards.length === 0) return;
    gsap.fromTo(cards, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.6)', stagger: 0.04 });
  }, [finalState?.stack.length, finalState?.minStack.length, operations]);

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4 minstack-panel">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-xl p-6 border border-slate-700 shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck className="text-emerald-400" />
            <div>
              <h3 className="text-xl font-bold">Stack Utama</h3>
              <p className="text-slate-300 text-sm">Top di atas, bottom di bawah</p>
            </div>
          </div>
          <div className="space-y-3">
            {[...(finalState?.stack || [])].reverse().map((val, idx) => (
              <div
                key={`${val}-${idx}`}
                ref={(el) => el && stackRefs.current.push(el)}
                className="rounded-lg border border-slate-600 bg-slate-700 px-4 py-3 flex items-center justify-between shadow"
              >
                <span className="text-lg font-semibold">{val}</span>
                <span className="text-xs text-slate-300">{idx === 0 ? 'top' : ''}</span>
              </div>
            ))}
            {(finalState?.stack?.length ?? 0) === 0 && (
              <div className="text-center text-slate-400 italic">(kosong)</div>
            )}
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6 border-2 border-emerald-200 shadow-sm minstack-panel">
          <div className="flex items-center gap-3 mb-4">
            <ArrowDownCircle className="text-emerald-700" />
            <div>
              <h3 className="text-xl font-bold text-emerald-900">Min Stack</h3>
              <p className="text-emerald-700 text-sm">Menjaga minimum berjalan</p>
            </div>
          </div>
          <div className="space-y-3">
            {[...(finalState?.minStack || [])].reverse().map((val, idx) => (
              <div
                key={`${val}-min-${idx}`}
                ref={(el) => el && minStackRefs.current.push(el)}
                className="rounded-lg border-2 border-emerald-300 bg-white px-4 py-3 flex items-center justify-between shadow-sm"
              >
                <span className="text-lg font-bold text-emerald-800">{val}</span>
                <span className="text-xs text-emerald-600">{idx === 0 ? 'min now' : ''}</span>
              </div>
            ))}
            {(finalState?.minStack?.length ?? 0) === 0 && (
              <div className="text-center text-emerald-600 italic">(belum ada minimum)</div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-5 shadow-lg border-2 border-slate-200 minstack-panel">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h4 className="text-lg font-bold text-slate-800">Jejak Operasi</h4>
            <p className="text-sm text-slate-600">Tiap langkah merubah kedua stack</p>
          </div>
          <div className="text-xs text-slate-500 font-mono">Total: {operations.length} operasi</div>
        </div>
        <div className="grid lg:grid-cols-2 gap-3">
          {steps.map((step) => (
            <div key={step.op.id} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-indigo-700">#{step.index + 1} {step.op.type}</span>
                {step.output !== undefined && (
                  <span className="text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">
                    output: {step.output ?? 'null'}
                  </span>
                )}
              </div>
              <div className="text-sm text-slate-700 font-mono">{step.action}</div>
              <div className="text-xs text-slate-500 mt-2 flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-white rounded border">stack → [{step.stack.join(', ')}]</span>
                <span className="px-2 py-1 bg-white rounded border">min → [{step.minStack.join(', ')}]</span>
              </div>
            </div>
          ))}
          {steps.length === 0 && <div className="text-slate-400 italic">Belum ada operasi.</div>}
        </div>
      </div>
    </div>
  );
}
