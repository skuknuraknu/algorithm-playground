import { useEffect, useMemo, useRef, useState } from 'react';
import { Pause, Play, RotateCcw, SkipForward } from 'lucide-react';
import gsap from 'gsap';
import { useLanguage } from '../../i18n';

interface RemoveNthSimulatorProps {
  list: number[];
  n: number;
}

type SimStep = {
  step: number;
  fastPos: number; // index in nodes array (0 = dummy). nodes.length = list.length + 1; nodes.length means null
  slowPos: number;
  message: string;
  removeIndex?: number;
};

export default function RemoveNthSimulator({ list, n }: RemoveNthSimulatorProps) {
  const { t } = useLanguage();
  const [steps, setSteps] = useState<SimStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const nodeRefs = useRef<HTMLDivElement[]>([]);
  const infoRef = useRef<HTMLDivElement | null>(null);

  const nodes = useMemo(() => ['dummy', ...list], [list]);

  const preparedSteps = useMemo(() => {
    const s: SimStep[] = [];
    const length = list.length;

    if (length === 0) {
      s.push({ step: 0, fastPos: 0, slowPos: 0, message: 'List kosong. Tambahkan data untuk simulasi.' });
      return s;
    }
    if (n <= 0 || n > length) {
      s.push({ step: 0, fastPos: 0, slowPos: 0, message: `n harus 1..${length}. Saat ini n = ${n}.` });
      return s;
    }

    let fast = 0; // dummy
    let slow = 0;
    s.push({ step: 1, fastPos: fast, slowPos: slow, message: 'Mulai di dummy agar aman menghapus head.' });

    for (let i = 0; i <= n; i++) {
      fast += 1;
      s.push({ step: s.length + 1, fastPos: Math.min(fast, length + 1), slowPos: slow, message: `Fast maju ${i + 1}/${n + 1} langkah.` });
    }

    while (fast < length + 1) {
      fast += 1;
      slow += 1;
      s.push({
        step: s.length + 1,
        fastPos: Math.min(fast, length + 1),
        slowPos: slow,
        message: 'Fast & Slow maju bersama hingga fast di null.',
      });
    }

    const removeIndex = slow + 1;
    s.push({ step: s.length + 1, fastPos: Math.min(fast, length + 1), slowPos: slow, message: `Hapus node di depan slow (index ${removeIndex}).`, removeIndex });
    s.push({ step: s.length + 1, fastPos: Math.min(fast, length + 1), slowPos: slow, message: 'Selesai. Head baru = dummy.next.' });
    return s;
  }, [list, n]);

  useEffect(() => {
    setSteps(preparedSteps);
    setCurrentStep(0);
    setIsPlaying(false);
  }, [preparedSteps]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && currentStep < steps.length - 1) {
      timer = setTimeout(() => setCurrentStep((s) => s + 1), 1400);
    }
    if (currentStep >= steps.length - 1) setIsPlaying(false);
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, steps.length]);

  useEffect(() => {
    if (!infoRef.current) return;
    gsap.fromTo(infoRef.current, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' });
    const { fastPos, slowPos, removeIndex } = steps[currentStep] ?? {};

    nodeRefs.current.forEach((el, idx) => {
      const isFast = idx === fastPos;
      const isSlow = idx === slowPos;
      const isRemove = removeIndex !== undefined && idx === removeIndex;
      gsap.to(el, {
        backgroundColor: isRemove ? '#fee2e2' : isFast ? '#dbeafe' : isSlow ? '#dcfce7' : '#ffffff',
        borderColor: isRemove ? '#ef4444' : isFast ? '#60a5fa' : isSlow ? '#22c55e' : '#e5e7eb',
        duration: 0.25,
      });
    });
  }, [currentStep, steps]);

  const step = steps[currentStep];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200 space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-xl font-bold text-slate-800">Simulasi Dua Pointer</h3>
            <p className="text-slate-600 text-sm">Fast maju n+1 langkah, lalu fast/slow bergerak bersama. Dummy menangani hapus head.</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIsPlaying((p) => !p)}
              className={`px-4 py-2 rounded-lg font-semibold text-white shadow-md flex items-center gap-2 transition-colors ${
                isPlaying ? 'bg-orange-500 hover:bg-orange-600' : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            <button
              onClick={() => setCurrentStep((s) => Math.min(s + 1, steps.length - 1))}
              className="px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center gap-1"
            >
              <SkipForward size={18} />
            </button>
            <button
              onClick={() => {
                setCurrentStep(0);
                setIsPlaying(false);
              }}
              className="px-3 py-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors flex items-center gap-1"
            >
              <RotateCcw size={18} />
            </button>
          </div>
        </div>

        <div className="text-sm text-slate-600">{t.step} {currentStep + 1} / {steps.length}</div>
        <div className="text-xs text-slate-500 -mt-2">Index 0 = dummy, index 1 = head. Ketika fastPos = nodes.length berarti fast sudah di null.</div>

        <div className="overflow-x-auto">
          <div className="flex items-center gap-3 py-2">
            {nodes.map((val, idx) => (
              <div
                key={`${val}-${idx}`}
                ref={(el) => (nodeRefs.current[idx] = el as HTMLDivElement)}
                className="min-w-[72px] px-3 py-2 rounded-xl border-2 border-slate-200 bg-white shadow-sm flex flex-col items-center"
              >
                <div className="font-semibold text-slate-800">{val}</div>
                <div className="text-[10px] text-slate-400">idx {idx}</div>
                {idx === nodes.length - 1 && <div className="text-[10px] text-rose-400">(tail)</div>}
              </div>
            ))}
            <div className="text-slate-400 text-sm">null</div>
          </div>
        </div>

        <div ref={infoRef} className="bg-emerald-50 border-2 border-emerald-200 rounded-lg p-4 text-emerald-900">
          {step?.message}
          <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
            <div><span className="font-semibold">fast pos:</span> {step?.fastPos}</div>
            <div><span className="font-semibold">slow pos:</span> {step?.slowPos}</div>
            <div><span className="font-semibold">n:</span> {n}</div>
            <div><span className="font-semibold">length:</span> {list.length}</div>
          </div>
          {step?.removeIndex !== undefined && (
            <div className="mt-2 text-sm font-bold text-rose-700">Node di index {step.removeIndex} dihapus (node ke-{n} dari belakang).</div>
          )}
        </div>
      </div>
    </div>
  );
}
