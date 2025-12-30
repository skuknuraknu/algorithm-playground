import { useEffect, useMemo, useState } from 'react';
import { Play, Square, SkipForward, RotateCcw } from 'lucide-react';
import { useLanguage } from '../../i18n';

interface SingleNumberSimulatorProps {
  nums: number[];
}

interface Step {
  index: number;
  value: number;
  xorBefore: number;
  xorAfter: number;
}

export default function SingleNumberSimulator({ nums }: SingleNumberSimulatorProps) {
  const { t } = useLanguage();
  const steps = useMemo(() => {
    const s: Step[] = [];
    let xor = 0;
    nums.forEach((value, index) => {
      const before = xor;
      xor = xor ^ value;
      s.push({ index, value, xorBefore: before, xorAfter: xor });
    });
    return s;
  }, [nums]);

  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(800);

  useEffect(() => {
    setCurrentStep(0);
    setIsPlaying(false);
  }, [steps]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && currentStep < steps.length - 1) {
      timer = setTimeout(() => setCurrentStep((prev) => prev + 1), speed);
    }
    if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [currentStep, isPlaying, speed, steps.length]);

  const handlePlay = () => {
    if (steps.length === 0) return;
    if (currentStep >= steps.length - 1) {
      setCurrentStep(0);
    }
    setIsPlaying(true);
  };

  const handleStop = () => {
    setIsPlaying(false);
    setCurrentStep(0);
  };

  const handleNext = () => {
    setIsPlaying(false);
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
  };

  const current = steps[currentStep];
  const finalXor = steps.length ? steps[steps.length - 1].xorAfter : 0;

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
        <h3 className="text-2xl font-bold text-slate-800 mb-2">Algorithm Simulation</h3>
        <p className="text-slate-600">XOR seluruh elemen. Pasangan akan saling menghapus, menyisakan angka unik.</p>

        <div className="mt-4 flex items-center gap-3 flex-wrap">
          <button
            onClick={handlePlay}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 shadow-md"
          >
            <Play size={18} /> {t.play}
          </button>
          <button
            onClick={handleStop}
            className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 shadow-md"
          >
            <Square size={18} /> {t.stop}
          </button>
          <button
            onClick={handleNext}
            disabled={currentStep >= steps.length - 1}
            className="bg-slate-600 hover:bg-slate-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 shadow-md"
          >
            <SkipForward size={18} /> {t.next}
          </button>
          <button
            onClick={handleReset}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 shadow-md"
          >
            <RotateCcw size={18} /> {t.reset}
          </button>

          <div className="flex items-center gap-2 ml-auto">
            <span className="text-sm text-slate-700 font-semibold">{t.speed}</span>
            <select
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="border-2 border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
            >
              <option value={1600}>0.5x</option>
              <option value={800}>1x</option>
              <option value={400}>2x</option>
              <option value={200}>4x</option>
            </select>
          </div>
        </div>

        <div className="mt-4 text-sm text-slate-600">{t.step} {steps.length ? currentStep + 1 : 0} / {steps.length}</div>
        <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
          <div
            className="h-2 bg-indigo-500 rounded-full transition-all"
            style={{ width: steps.length ? `${((currentStep + 1) / steps.length) * 100}%` : '0%' }}
          />
        </div>
      </div>

      {current && (
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-slate-50 border-2 border-slate-200 rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-semibold text-slate-700">Index {current.index}</div>
              <div className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 font-semibold">{current.value}</div>
            </div>
            <div className="text-sm text-slate-700 font-mono">
              xor_before = {current.xorBefore} <span className="text-indigo-500">^</span> {current.value} ={' '}
              <span className="font-bold text-indigo-700">{current.xorAfter}</span>
            </div>
          </div>

          <div className="bg-indigo-50 border-2 border-indigo-200 rounded-lg p-4 text-sm text-slate-700 shadow-sm">
            <div className="font-semibold text-indigo-800 mb-1">Progress Insight</div>
            <p>Hasil XOR terkini setelah memproses elemen ke-{current.index + 1}.</p>
            <div className="mt-2 font-mono text-indigo-800">Current XOR: {current.xorAfter}</div>
          </div>
        </div>
      )}

      <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 text-slate-700">
        <div className="font-semibold text-green-800 mb-1">Hasil Akhir</div>
        <div className="text-2xl font-bold text-green-700">{finalXor}</div>
        <div className="text-xs text-slate-500 mt-1">Angka unik yang tersisa setelah semua XOR langkah demi langkah.</div>
      </div>
    </div>
  );
}
