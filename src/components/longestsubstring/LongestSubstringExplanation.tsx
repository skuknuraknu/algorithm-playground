import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, CheckCircle, Lightbulb, MousePointerClick, RefreshCw, Zap } from 'lucide-react';
import gsap from 'gsap';

interface Step {
  left: number;
  right: number;
  window: string;
  message: string;
}

const demoString = "abcaef";

function buildSteps(str: string): Step[] {
  if (!str) return [];
  const steps: Step[] = [];
  const seen = new Map<string, number>();
  let left = 0;

  steps.push({ left: 0, right: 0, window: '', message: 'Mulai dari indeks 0, jendela masih kosong.' });

  for (let right = 0; right < str.length; right++) {
    const char = str[right];

    if (seen.has(char) && seen.get(char)! >= left) {
      const newLeft = seen.get(char)! + 1;
      steps.push({
        left,
        right,
        window: str.slice(left, right),
        message: `Duplikasi '${char}' ditemukan. Geser left ke ${newLeft}.`,
      });
      left = newLeft;
    }

    seen.set(char, right);
    steps.push({
      left,
      right,
      window: str.slice(left, right + 1),
      message: `Tambah '${char}' ke jendela → "${str.slice(left, right + 1)}"`,
    });
  }

  steps.push({
    left,
    right: str.length - 1,
    window: str.slice(left),
    message: `Selesai. Substring unik terpanjang pada demo ini adalah "${str.slice(left)}" dengan length ${str.length - left}.`,
  });

  return steps;
}

export default function LongestSubstringExplanation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const charRefs = useRef<HTMLDivElement[]>([]);
  const [stepIndex, setStepIndex] = useState(0);

  const steps = useMemo(() => buildSteps(demoString), []);
  const currentStep = steps[stepIndex] ?? steps[0];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.6)"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      charRefs.current.forEach((el, idx) => {
        if (!el) return;
        const inWindow = idx >= currentStep.left && idx <= currentStep.right;
        gsap.to(el, {
          scale: inWindow ? 1.08 : 1,
          backgroundColor: inWindow ? '#a855f7' : '#e2e8f0',
          color: inWindow ? '#fff' : '#334155',
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [currentStep]);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  const resetDemo = () => setStepIndex(0);
  const nextStep = () => setStepIndex((i) => Math.min(i + 1, steps.length - 1));
  const prevStep = () => setStepIndex((i) => Math.max(0, i - 1));

  return (
    <div ref={containerRef} className="space-y-6">
      {/* Intro */}
      <div ref={addToRefs} className="bg-white rounded-xl p-8 shadow-lg border-2 border-slate-200 hover:border-blue-400 transition-colors duration-300">
        <h2 className="text-3xl font-bold text-slate-800 mb-4 flex items-center gap-3">
          <Lightbulb className="text-yellow-500" size={32} />
          Masalah: Substring Terpanjang Tanpa Karakter Berulang
        </h2>
        <p className="text-slate-700 text-lg leading-relaxed mb-3">
          Diberikan string <code className="bg-slate-100 px-2 py-1 rounded font-mono text-blue-600">s</code>, cari panjang
          <strong> substring terpanjang</strong> yang tidak memiliki karakter berulang.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {[{ input: 'abcabcbb', out: 3, sub: 'abc' }, { input: 'bbbbb', out: 1, sub: 'b' }, { input: 'pwwkew', out: 3, sub: 'wke' }].map((ex, idx) => (
            <div key={idx} className="bg-blue-50 border border-blue-100 rounded-lg p-4 shadow-sm">
              <div className="text-xs uppercase tracking-wide text-blue-700 font-semibold">Contoh {idx + 1}</div>
              <div className="text-sm text-slate-500 mt-2">Input</div>
              <code className="text-lg font-bold text-slate-800">"{ex.input}"</code>
              <div className="text-sm text-slate-500 mt-2">Output</div>
              <div className="text-2xl font-bold text-blue-600">{ex.out}</div>
              <div className="mt-1 text-xs text-slate-600">Substring: "{ex.sub}"</div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Sliding Window Demo */}
      <div ref={addToRefs} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8 shadow-lg border-2 border-purple-200">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle className="text-purple-600" size={26} />
          <h3 className="text-2xl font-bold text-slate-800">Demo Interaktif: Sliding Window</h3>
        </div>

        <p className="text-slate-700 mb-4">
          Tekan tombol <strong>Next</strong> untuk melihat bagaimana jendela bergerak dan menghindari karakter duplikat.
          Contoh string demo: <code className="bg-white/70 px-2 py-1 rounded font-mono text-purple-700">{demoString}</code>
        </p>

        <div className="flex flex-wrap gap-2 justify-center mb-4">
          {demoString.split('').map((ch, idx) => (
            <div key={idx} className="flex flex-col items-center gap-1">
              <div
                ref={(el) => { if (el) charRefs.current[idx] = el; }}
                className="w-12 h-12 flex items-center justify-center rounded-lg font-mono text-xl font-bold border-2 border-slate-300 bg-slate-200 text-slate-700 transition-all"
              >
                {ch}
              </div>
              <span className="text-xs text-slate-500">[{idx}]</span>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg p-4 border-2 border-purple-200 shadow-sm">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="text-sm text-slate-700 font-medium flex items-center gap-2">
              <Zap className="text-yellow-500" size={18} />
              {currentStep?.message}
            </div>
            <div className="flex items-center gap-2">
              <button onClick={prevStep} disabled={stepIndex === 0} className="px-3 py-2 rounded-lg bg-slate-200 text-slate-700 font-semibold disabled:opacity-50">Prev</button>
              <button onClick={nextStep} disabled={stepIndex >= steps.length - 1} className="px-3 py-2 rounded-lg bg-purple-600 text-white font-semibold disabled:opacity-50">Next</button>
              <button onClick={resetDemo} className="px-3 py-2 rounded-lg border border-purple-300 text-purple-700 font-semibold flex items-center gap-1">
                <RefreshCw size={16} /> Reset
              </button>
            </div>
          </div>
          <div className="mt-3 text-sm text-slate-600">
            Window sekarang: <code className="bg-slate-100 px-2 py-1 rounded font-mono text-purple-700">"{currentStep?.window}"</code>
            <span className="ml-2 text-xs text-slate-500">(left: {currentStep?.left}, right: {currentStep?.right})</span>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div ref={addToRefs} className="bg-white rounded-xl p-8 shadow-lg border-2 border-slate-200">
        <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <MousePointerClick className="text-indigo-600" size={24} />
          Cara Kerja Sliding Window
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-indigo-50 p-5 rounded-lg border border-indigo-100">
            <h4 className="font-bold text-indigo-800 mb-3">Inti Ide</h4>
            <ul className="space-y-3 text-sm text-slate-700">
              <li className="flex gap-2"><span className="font-bold text-indigo-600">1.</span><span>Pakai dua pointer <strong>left</strong> dan <strong>right</strong> sebagai batas jendela.</span></li>
              <li className="flex gap-2"><span className="font-bold text-indigo-600">2.</span><span>Gerakkan <strong>right</strong> untuk memperluas jendela.</span></li>
              <li className="flex gap-2"><span className="font-bold text-indigo-600">3.</span><span>Jika ada duplikat, geser <strong>left</strong> sampai duplikat keluar dari jendela.</span></li>
              <li className="flex gap-2"><span className="font-bold text-indigo-600">4.</span><span>Simpan panjang maksimum yang pernah tercapai.</span></li>
            </ul>
          </div>
          <div className="bg-purple-50 p-5 rounded-lg border border-purple-100">
            <h4 className="font-bold text-purple-800 mb-3">Kenapa Efisien?</h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              Setiap karakter hanya "masuk" dan "keluar" jendela maksimal sekali. Total iterasi tetap linear terhadap panjang string (O(n)), sementara pengecekan duplikat konstan dengan Hash Map/Set.
            </p>
          </div>
        </div>

        <div className="mt-6 bg-slate-50 rounded-lg p-4 border-2 border-slate-200">
          <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
            <ArrowRight className="text-slate-600" size={18} /> Langkah Algoritma Singkat
          </h4>
          <div className="space-y-2 text-sm text-slate-700">
            <div className="flex gap-2"><span className="text-slate-500 font-bold">→</span> Inisialisasi <code className="bg-white px-2 py-1 rounded border">Set/Map</code> kosong, left = 0.</div>
            <div className="flex gap-2"><span className="text-slate-500 font-bold">→</span> Untuk setiap <strong>right</strong>, jika char sudah ada di dalam jendela, geser <strong>left</strong> ke kanan setelah posisi char lama.</div>
            <div className="flex gap-2"><span className="text-slate-500 font-bold">→</span> Update posisi char di Map, hitung panjang jendela (right - left + 1), simpan maksimum.</div>
          </div>
        </div>
      </div>

      {/* Complexity & Tips */}
      <div ref={addToRefs} className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-8 shadow-lg border-2 border-green-200">
        <h3 className="text-2xl font-bold text-slate-800 mb-4">Analisis & Poin Penting</h3>
        <div className="grid md:grid-cols-2 gap-6 mb-4">
          <div className="bg-white p-5 rounded-lg border-2 border-green-100 hover:scale-[1.01] transition-transform">
            <h4 className="font-bold text-green-800 mb-1">Kompleksitas Waktu</h4>
            <p className="text-2xl font-mono font-bold text-green-700">O(n)</p>
            <p className="text-sm text-slate-700 mt-1">Setiap karakter diproses paling banyak dua kali.</p>
          </div>
          <div className="bg-white p-5 rounded-lg border-2 border-emerald-100 hover:scale-[1.01] transition-transform">
            <h4 className="font-bold text-emerald-800 mb-1">Kompleksitas Ruang</h4>
            <p className="text-2xl font-mono font-bold text-emerald-700">O(min(m, n))</p>
            <p className="text-sm text-slate-700 mt-1">m = jumlah karakter unik, n = panjang string.</p>
          </div>
        </div>
        <ul className="space-y-2 text-slate-700">
          <li className="flex gap-2 items-start"><CheckCircle className="text-green-600 mt-0.5" size={18} /> <span><strong>Sliding Window:</strong> jendela fleksibel yang digeser tanpa memulai ulang.</span></li>
          <li className="flex gap-2 items-start"><CheckCircle className="text-green-600 mt-0.5" size={18} /> <span><strong>Hash Map/Set:</strong> cek duplikat O(1).</span></li>
          <li className="flex gap-2 items-start"><CheckCircle className="text-green-600 mt-0.5" size={18} /> <span><strong>Single Pass:</strong> linear, cocok untuk string panjang.</span></li>
        </ul>
      </div>
    </div>
  );
}
