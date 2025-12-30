import { useEffect, useMemo, useRef, useState } from 'react';
import { Pause, Play, RotateCcw, SkipForward } from 'lucide-react';
import gsap from 'gsap';
import { useLanguage } from '../../i18n';

interface AddTwoNumbersSimulatorProps {
  l1: number[];
  l2: number[];
}

type SimStep = {
  index: number;
  val1: number | null;
  val2: number | null;
  carry: number;
  sum: number;
  digit: number;
  message: string;
};

export default function AddTwoNumbersSimulator({ l1, l2 }: AddTwoNumbersSimulatorProps) {
  const { t } = useLanguage();
  const [steps, setSteps] = useState<SimStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const infoRef = useRef<HTMLDivElement | null>(null);
  const nodeRefs = useRef<{ l1: HTMLDivElement[]; l2: HTMLDivElement[]; result: HTMLDivElement[] }>({
    l1: [],
    l2: [],
    result: [],
  });

  const preparedSteps = useMemo(() => {
    const st: SimStep[] = [];
    let carry = 0;
    let i = 0;
    const maxLen = Math.max(l1.length, l2.length);

    st.push({ index: -1, val1: null, val2: null, carry: 0, sum: 0, digit: 0, message: 'Mulai penjumlahan dari digit paling kanan (head).' });

    while (i < maxLen || carry > 0) {
      const v1 = l1[i] ?? 0;
      const v2 = l2[i] ?? 0;
      const sum = v1 + v2 + carry;
      const digit = sum % 10;
      const newCarry = Math.floor(sum / 10);

      st.push({
        index: i,
        val1: l1[i] !== undefined ? v1 : null,
        val2: l2[i] !== undefined ? v2 : null,
        carry,
        sum,
        digit,
        message: `Posisi ${i}: (${v1} + ${v2} + carry ${carry}) = ${sum} → digit ${digit}, carry ${newCarry}`,
      });

      carry = newCarry;
      i++;
    }

    st.push({ index: i, val1: null, val2: null, carry, sum: 0, digit: 0, message: 'Selesai! Semua digit sudah dijumlahkan.' });
    return st;
  }, [l1, l2]);

  useEffect(() => {
    setSteps(preparedSteps);
    setCurrentStep(0);
    setIsPlaying(false);
  }, [preparedSteps]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && currentStep < steps.length - 1) {
      timer = setTimeout(() => setCurrentStep((s) => s + 1), 1500);
    }
    if (currentStep >= steps.length - 1) setIsPlaying(false);
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, steps.length]);

  useEffect(() => {
    if (infoRef.current) {
      gsap.fromTo(infoRef.current, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' });
    }
    const idx = steps[currentStep]?.index ?? -1;
    [nodeRefs.current.l1, nodeRefs.current.l2].forEach((arr) => {
      arr.forEach((el, i) => {
        gsap.to(el, {
          backgroundColor: i === idx ? '#dbeafe' : '#ffffff',
          borderColor: i === idx ? '#60a5fa' : '#e5e7eb',
          duration: 0.25,
        });
      });
    });
  }, [currentStep, steps]);

  if (l1.length === 0 && l2.length === 0) {
    return (
      <div className="bg-yellow-50 border-2 border-yellow-200 text-yellow-800 rounded-lg p-4">
        Tambahkan input untuk memulai simulasi.
      </div>
    );
  }

  const step = steps[currentStep];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200 space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-xl font-bold text-slate-800">{t.digitByDigitSimulation}</h3>
            <p className="text-slate-600 text-sm">{t.digitByDigitInstructions}</p>
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
              className="px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              <SkipForward size={18} />
            </button>
            <button
              onClick={() => {
                setCurrentStep(0);
                setIsPlaying(false);
              }}
              className="px-3 py-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
            >
              <RotateCcw size={18} />
            </button>
          </div>
        </div>

        <div className="text-sm text-slate-600">
          {t.step} {currentStep + 1} / {steps.length}
        </div>
        <div className="text-xs text-slate-500 -mt-2">{t.indexExplanation}</div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="text-sm font-semibold text-slate-600">L1</div>
            <div className="flex gap-2 flex-wrap">
              {l1.length === 0 ? (
                <div className="text-slate-400 text-sm italic">({t.empty})</div>
              ) : (
                l1.map((v, i) => (
                  <div
                    key={`l1-${i}`}
                    ref={(el) => (nodeRefs.current.l1[i] = el as HTMLDivElement)}
                    className="w-10 h-10 flex items-center justify-center rounded-lg border-2 border-slate-200 bg-white font-semibold"
                  >
                    {v}
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-semibold text-slate-600">L2</div>
            <div className="flex gap-2 flex-wrap">
              {l2.length === 0 ? (
                <div className="text-slate-400 text-sm italic">({t.empty})</div>
              ) : (
                l2.map((v, i) => (
                  <div
                    key={`l2-${i}`}
                    ref={(el) => (nodeRefs.current.l2[i] = el as HTMLDivElement)}
                    className="w-10 h-10 flex items-center justify-center rounded-lg border-2 border-slate-200 bg-white font-semibold"
                  >
                    {v}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div ref={infoRef} className="bg-emerald-50 border-2 border-emerald-200 rounded-lg p-4 text-emerald-900">
          {step?.message}
          <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
            <div><span className="font-semibold">val1:</span> {step?.val1 ?? '–'}</div>
            <div><span className="font-semibold">val2:</span> {step?.val2 ?? '–'}</div>
            <div><span className="font-semibold">sum:</span> {step?.sum ?? 0}</div>
            <div><span className="font-semibold">carry:</span> {step?.carry ?? 0}</div>
          </div>
          {step && step.index >= 0 && (
            <div className="mt-2 text-sm font-bold text-emerald-700">
              Digit baru: {step.digit}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
