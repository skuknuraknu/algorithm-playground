import { useEffect, useMemo, useRef, useState } from 'react';
import { Pause, Play, RotateCcw, SkipForward } from 'lucide-react';
import gsap from 'gsap';
import { useLanguage } from '../../i18n';

interface ReverseLinkedListSimulatorProps {
  list: number[];
}

type Step = {
  index: number;
  prev: number | null;
  curr: number | null;
  next: number | null;
  message: string;
};

export default function ReverseLinkedListSimulator({ list }: ReverseLinkedListSimulatorProps) {
  const { t } = useLanguage();
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const nodeRefs = useRef<HTMLDivElement[]>([]);
  const infoRef = useRef<HTMLDivElement | null>(null);

  const preparedSteps = useMemo(() => {
    const s: Step[] = [];
    let prev: number | null = null;
    let currIdx = 0;

    s.push({ index: -1, prev: null, curr: list[0] ?? null, next: list[1] ?? null, message: 'Mulai dari head.' });

    while (currIdx < list.length) {
      const curr = list[currIdx] ?? null;
      const next = list[currIdx + 1] ?? null;

      // save next
      s.push({ index: currIdx, prev, curr, next, message: `Simpan next (${next ?? 'null'})` });
      // reverse pointer
      s.push({ index: currIdx, prev, curr, next, message: `Balikkan pointer: ${curr} -> ${prev ?? 'null'}` });

      // move forward
      prev = curr;
      currIdx += 1;
      s.push({ index: currIdx, prev, curr: list[currIdx] ?? null, next: list[currIdx + 1] ?? null, message: `Geser prev ke ${prev}, curr ke ${list[currIdx] ?? 'null'}` });
    }

    s.push({ index: currIdx, prev, curr: null, next: null, message: `Selesai. Head baru: ${prev ?? 'null'}` });
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
    if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, steps.length]);

  useEffect(() => {
    if (!infoRef.current) return;
    gsap.fromTo(infoRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' });
    const prev = steps[currentStep]?.prev;
    const idx = steps[currentStep]?.index;
    nodeRefs.current.forEach((el, i) => {
      gsap.to(el, {
        backgroundColor:
          i === idx
            ? '#dbeafe'
            : i === list.indexOf(prev ?? NaN)
            ? '#ecfccb'
            : '#ffffff',
        borderColor:
          i === idx
            ? '#60a5fa'
            : i === list.indexOf(prev ?? NaN)
            ? '#a3e635'
            : '#e5e7eb',
        duration: 0.3,
      });
    });
  }, [currentStep, steps, list]);

  if (list.length === 0) {
    return (
      <div className="bg-yellow-50 border-2 border-yellow-200 text-yellow-800 rounded-lg p-4">
        Tambahkan node untuk memulai simulasi.
      </div>
    );
  }

  const step = steps[currentStep];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200 space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-xl font-bold text-slate-800">Simulasi Pointer</h3>
            <p className="text-slate-600 text-sm">Ikuti perubahan <code>prev</code>, <code>curr</code>, dan <code>next</code> di setiap langkah.</p>
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

        <div className="flex items-center gap-2 text-sm text-slate-600">
          {t.step} {currentStep + 1} / {steps.length}
        </div>

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
            <div className="text-slate-400 text-sm">null</div>
          </div>
        </div>

        <div ref={infoRef} className="bg-indigo-50 border-2 border-indigo-200 rounded-lg p-4 text-indigo-800">
          {step?.message}
          <div className="mt-2 grid grid-cols-3 gap-3 text-sm">
            <div><span className="font-semibold">prev:</span> {step?.prev ?? 'null'}</div>
            <div><span className="font-semibold">curr:</span> {step?.curr ?? 'null'}</div>
            <div><span className="font-semibold">next:</span> {step?.next ?? 'null'}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
