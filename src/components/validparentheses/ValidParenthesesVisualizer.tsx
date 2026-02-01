import { useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import { buildVPSteps, VPStep } from './types';
import { CheckCircle, XCircle } from 'lucide-react';

interface ValidParenthesesVisualizerProps {
  value: string;
}

export default function ValidParenthesesVisualizer({ value }: ValidParenthesesVisualizerProps) {
  const steps = useMemo(() => buildVPSteps(value), [value]);
  const finalValid = steps.length === 0 ? true : steps[steps.length - 1].isValidSoFar && steps[steps.length - 1].stack.length === 0;
  const badgesRef = useRef<HTMLDivElement[]>([]);
  badgesRef.current = [];

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo('.vp-badge', { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', stagger: 0.05 });
    return () => {
      tl.kill();
    };
  }, [value]);

  const highlightStep = (step: VPStep) => (step.isValidSoFar ? 'border-emerald-200 bg-emerald-50' : 'border-rose-200 bg-rose-50');

  return (
    <div className="space-y-4">
      <div className={`rounded-xl border-2 p-4 shadow-lg flex items-center gap-3 ${finalValid ? 'border-emerald-300 bg-emerald-50' : 'border-rose-300 bg-rose-50'}`}>
        {finalValid ? <CheckCircle className="text-emerald-600" /> : <XCircle className="text-rose-600" />}
        <div>
          <div className="text-lg font-bold text-slate-800">Hasil</div>
          <div className="text-sm text-slate-700">{finalValid ? 'Semua bracket cocok dan stack akhir kosong.' : 'Ditemukan mismatch atau stack tidak kosong.'}</div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-5 shadow-lg border-2 border-slate-200">
        <div className="text-sm font-semibold text-slate-700 mb-3">Visualisasi langkah (static)</div>
        <div className="grid lg:grid-cols-2 gap-3">
          {steps.map((step, idx) => (
            <div
              key={idx}
              ref={(el) => el && badgesRef.current.push(el)}
              className={`vp-badge rounded-lg border p-3 ${highlightStep(step)}`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-indigo-700">Index {step.index}</span>
                <span className="font-mono text-sm">'{step.char}'</span>
              </div>
              <div className="text-sm text-slate-700">{step.action}</div>
              <div className="text-xs text-slate-500 mt-2 font-mono">stack: [{step.stack.join(', ')}]</div>
            </div>
          ))}
          {steps.length === 0 && <div className="text-slate-400 italic">(string kosong)</div>}
        </div>
      </div>
    </div>
  );
}
