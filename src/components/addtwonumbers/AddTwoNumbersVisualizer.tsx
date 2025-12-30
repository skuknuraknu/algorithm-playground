import { useMemo, useRef, useState } from 'react';
import { Play, Plus } from 'lucide-react';
import gsap from 'gsap';

interface AddTwoNumbersVisualizerProps {
  l1: number[];
  l2: number[];
}

export default function AddTwoNumbersVisualizer({ l1, l2 }: AddTwoNumbersVisualizerProps) {
  const resultRowRef = useRef<HTMLDivElement | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const addTwoNumbers = (a: number[], b: number[]): number[] => {
    const result: number[] = [];
    let carry = 0;
    let i = 0;
    while (i < a.length || i < b.length || carry > 0) {
      const val1 = a[i] ?? 0;
      const val2 = b[i] ?? 0;
      const sum = val1 + val2 + carry;
      result.push(sum % 10);
      carry = Math.floor(sum / 10);
      i++;
    }
    return result;
  };

  const result = useMemo(() => addTwoNumbers(l1, l2), [l1, l2]);

  const handleAnimate = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    const tl = gsap.timeline({ onComplete: () => setIsAnimating(false) });

    if (resultRowRef.current) {
      const children = Array.from(resultRowRef.current.children);
      tl.fromTo(
        children,
        { opacity: 0, y: 20, scale: 0.85, rotateY: -45 },
        { opacity: 1, y: 0, scale: 1, rotateY: 0, duration: 0.6, stagger: 0.1, ease: 'elastic.out(1, 0.6)' }
      );
    }
  };

  const renderList = (values: number[], label: string, colorClass: string) => (
    <div className="space-y-2">
      <div className="text-sm font-semibold text-slate-600 uppercase tracking-wide">{label}</div>
      <div className="flex items-center gap-2 flex-wrap">
        {values.length === 0 ? (
          <div className="text-slate-400 italic">(kosong)</div>
        ) : (
          values.map((val, idx) => (
            <div
              key={`${label}-${idx}`}
              className={`w-12 h-12 flex items-center justify-center rounded-lg border-2 font-bold text-lg ${colorClass} shadow-sm`}
            >
              {val}
            </div>
          ))
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-slate-800">Lihat Hasil Akhir</h3>
            <p className="text-slate-600 text-sm">Digit disimpan terbalik (head = satuan). Klik Animate untuk melihat node hasil muncul satu per satu.</p>
          </div>
          <button
            onClick={handleAnimate}
            disabled={isAnimating || (l1.length === 0 && l2.length === 0)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold shadow-md transition-colors ${
              isAnimating || (l1.length === 0 && l2.length === 0)
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-emerald-600 text-white hover:bg-emerald-700'
            }`}
          >
            <Play size={18} />
            {isAnimating ? 'Animating...' : 'Animate'}
          </button>
        </div>

        <div className="space-y-4">
          {renderList(l1, 'L1', 'bg-blue-50 border-blue-300 text-blue-700')}
          <div className="flex items-center gap-2 text-slate-500 text-xl font-bold">
            <Plus size={20} /> (Tambah)
          </div>
          {renderList(l2, 'L2', 'bg-purple-50 border-purple-300 text-purple-700')}

          <div className="border-t-4 border-dashed border-slate-300 my-4"></div>

          <div className="space-y-2">
            <div className="text-sm font-semibold text-emerald-700 uppercase tracking-wide">Result (Linked List)</div>
            <div ref={resultRowRef} className="flex items-center gap-2 flex-wrap">
              {result.length === 0 ? (
                <div className="text-slate-400 italic">(kosong)</div>
              ) : (
                result.map((val, idx) => (
                  <div
                    key={`result-${idx}`}
                    className="w-12 h-12 flex items-center justify-center rounded-lg border-2 border-emerald-400 bg-emerald-50 text-emerald-800 font-bold text-lg shadow-md"
                  >
                    {val}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg px-3 py-2 text-sm">
          GSAP memberi efek bounce 3D saat hasil muncul—lihat digit hasil menempel dari kiri (satuan) ke kanan.
        </div>
      </div>
    </div>
  );
}
