import { useEffect, useMemo, useRef, useState } from 'react';
import { Pause, Play, RotateCcw, SkipForward } from 'lucide-react';
import gsap from 'gsap';
import { useLanguage } from '../../i18n';

interface OddEvenSimulatorProps {
  list: number[];
}

type Step = {
  step: number;
  oddIdx: number | null;
  evenIdx: number | null;
  evenHeadIdx: number | null;
  message: string;
};

export default function OddEvenSimulator({ list }: OddEvenSimulatorProps) {
  const { t } = useLanguage();
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const nodeRefs = useRef<HTMLDivElement[]>([]);
  const infoRef = useRef<HTMLDivElement | null>(null);

  const preparedSteps = useMemo(() => {
    const s: Step[] = [];
    if (list.length === 0) {
      s.push({ step: 1, oddIdx: null, evenIdx: null, evenHeadIdx: null, message: 'List kosong. Tambahkan data untuk mulai.' });
      return s;
    }
    if (list.length === 1) {
      s.push({ step: 1, oddIdx: 0, evenIdx: null, evenHeadIdx: null, message: 'Hanya satu node, tidak ada perubahan.' });
      return s;
    }

  let odd = 0;
  let even: number | null = 1;
    const evenHead = 1;
    s.push({ step: s.length + 1, oddIdx: odd, evenIdx: even, evenHeadIdx: evenHead, message: 'Mulai: odd=head (idx 0), even=head.next (idx 1).' });

    while (even !== null && even + 1 < list.length) {
      const nextOdd = even + 1;
      s.push({ step: s.length + 1, oddIdx: odd, evenIdx: even, evenHeadIdx: evenHead, message: `Set odd.next ke idx ${nextOdd} (lompat satu).` });
      odd = nextOdd;
      s.push({ step: s.length + 1, oddIdx: odd, evenIdx: even, evenHeadIdx: evenHead, message: `Majukan odd ke idx ${odd}.` });

  const nextEven: number | null = odd + 1 < list.length ? odd + 1 : null;
      s.push({ step: s.length + 1, oddIdx: odd, evenIdx: even, evenHeadIdx: evenHead, message: nextEven !== null ? `Set even.next ke idx ${nextEven}.` : 'even.next = null (tidak ada node genap tersisa).' });
      even = nextEven;
      s.push({ step: s.length + 1, oddIdx: odd, evenIdx: even, evenHeadIdx: evenHead, message: even !== null ? `Majukan even ke idx ${even}.` : 'Even sekarang null.' });

      if (even === null) break;
    }

    s.push({ step: s.length + 1, oddIdx: odd, evenIdx: even, evenHeadIdx: evenHead, message: `Gabungkan: odd.next menunjuk evenHead (idx ${evenHead}).` });
    s.push({ step: s.length + 1, oddIdx: null, evenIdx: null, evenHeadIdx: evenHead, message: 'Selesai! Urutan baru: ganjil lalu genap.' });
    return s;
  }, [list]);

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
    const { oddIdx, evenIdx, evenHeadIdx } = steps[currentStep] ?? {};
    nodeRefs.current.forEach((el, idx) => {
      const isOdd = idx === oddIdx;
      const isEven = idx === evenIdx;
      const isEvenHead = idx === evenHeadIdx;
      gsap.to(el, {
        backgroundColor: isOdd ? '#dcfce7' : isEven ? '#fee2e2' : isEvenHead ? '#e0f2fe' : '#ffffff',
        borderColor: isOdd ? '#22c55e' : isEven ? '#f87171' : isEvenHead ? '#38bdf8' : '#e5e7eb',
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
            <h3 className="text-xl font-bold text-slate-800">{t.oddEvenPointerSimulation}</h3>
            <p className="text-slate-600 text-sm">{t.oddEvenInstructions}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIsPlaying((p) => !p)}
              className={`px-4 py-2 rounded-lg font-semibold text-white shadow-md flex items-center gap-2 transition-colors ${
                isPlaying ? 'bg-orange-500 hover:bg-orange-600' : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              {isPlaying ? t.pause : t.play}
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
        <div className="text-xs text-slate-500 -mt-2">{t.oddEvenColorExplanation}</div>

        <div className="overflow-x-auto">
          <div className="flex items-center gap-3 py-2">
            {list.map((val, idx) => (
              <div
                key={`${val}-${idx}`}
                ref={(el) => (nodeRefs.current[idx] = el as HTMLDivElement)}
                className="min-w-[64px] px-3 py-2 rounded-xl border-2 border-slate-200 bg-white shadow-sm flex flex-col items-center"
              >
                <div className="font-semibold text-slate-800">{val}</div>
                <div className="text-[10px] text-slate-400">idx {idx}</div>
              </div>
            ))}
            {list.length === 0 && <div className="text-slate-400 text-sm">(kosong)</div>}
          </div>
        </div>

        <div ref={infoRef} className="bg-indigo-50 border-2 border-indigo-200 rounded-lg p-4 text-indigo-900">
          {step?.message}
          <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
            <div><span className="font-semibold">odd idx:</span> {step?.oddIdx ?? 'null'}</div>
            <div><span className="font-semibold">even idx:</span> {step?.evenIdx ?? 'null'}</div>
            <div><span className="font-semibold">evenHead:</span> {step?.evenHeadIdx ?? 'null'}</div>
            <div><span className="font-semibold">len:</span> {list.length}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
