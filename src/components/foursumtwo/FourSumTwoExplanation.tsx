import { gsap } from 'gsap';
import { useEffect, useRef, useState } from 'react';

export default function FourSumTwoExplanation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [showDemo, setShowDemo] = useState(false);
  const [demoStep, setDemoStep] = useState(0);
  const demoRef = useRef<HTMLDivElement>(null);

  // Initial entrance animation
  useEffect(() => {
    if (!containerRef.current) return;
    
    const tl = gsap.timeline();
    
    tl.fromTo(
      containerRef.current.querySelectorAll('.animate-section'),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'power2.out' }
    );

    return () => { tl.kill(); };
  }, []);

  // Interactive step hover animation
  const handleStepHover = (stepIndex: number) => {
    setActiveStep(stepIndex);
    const stepEl = containerRef.current?.querySelector(`.step-${stepIndex}`);
    if (stepEl) {
      gsap.to(stepEl, { scale: 1.02, duration: 0.3, ease: 'power2.out' });
      gsap.to(stepEl.querySelector('.step-number'), { 
        scale: 1.2, 
        rotation: 360,
        duration: 0.4, 
        ease: 'back.out(1.7)' 
      });
    }
  };

  const handleStepLeave = (stepIndex: number) => {
    setActiveStep(null);
    const stepEl = containerRef.current?.querySelector(`.step-${stepIndex}`);
    if (stepEl) {
      gsap.to(stepEl, { scale: 1, duration: 0.3, ease: 'power2.out' });
      gsap.to(stepEl.querySelector('.step-number'), { 
        scale: 1, 
        rotation: 0,
        duration: 0.3 
      });
    }
  };

  // Interactive demo animation
  const runDemo = () => {
    setShowDemo(true);
    setDemoStep(0);
    
    const steps = [
      { delay: 0.5, step: 1 },
      { delay: 2, step: 2 },
      { delay: 3.5, step: 3 },
      { delay: 5, step: 4 },
      { delay: 6.5, step: 5 },
    ];

    steps.forEach(({ delay, step }) => {
      gsap.delayedCall(delay, () => setDemoStep(step));
    });

    gsap.delayedCall(8, () => {
      if (demoRef.current) {
        gsap.to(demoRef.current.querySelectorAll('.demo-result'), {
          scale: 1.1,
          duration: 0.3,
          yoyo: true,
          repeat: 2,
          ease: 'power2.inOut'
        });
      }
    });
  };

  // Demo visualization data
  const demoA = [1, 2];
  const demoB = [-2, -1];
  const demoC = [-1, 2];
  const demoD = [0, 2];

  return (
    <div ref={containerRef} className="space-y-6 bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="animate-section">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white text-xl font-bold">4Σ</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">4Sum II</h2>
            <p className="text-sm text-slate-500">Hash Map + Divide & Conquer</p>
          </div>
        </div>
        <p className="text-slate-600 leading-relaxed">
          Diberikan empat array <span className="font-mono bg-blue-100 text-blue-700 px-1 rounded">A</span>, 
          <span className="font-mono bg-cyan-100 text-cyan-700 px-1 rounded ml-1">B</span>, 
          <span className="font-mono bg-orange-100 text-orange-700 px-1 rounded ml-1">C</span>, 
          <span className="font-mono bg-rose-100 text-rose-700 px-1 rounded ml-1">D</span> dengan panjang n, 
          hitung berapa banyak tuple <span className="font-mono">(i, j, k, l)</span> sehingga
          <span className="font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded ml-1">
            A[i] + B[j] + C[k] + D[l] = 0
          </span>
        </p>
      </div>

      {/* Intuition Card */}
      <div className="animate-section bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 p-5 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
          <span className="text-2xl">💡</span>
          <span>Intuisi Utama: Divide & Conquer!</span>
        </h3>
        <div className="text-blue-800 text-sm space-y-3">
          <p>
            Mencari 4 angka sekaligus itu <span className="font-bold text-red-600">O(n⁴)</span> — terlalu lambat! 🐌
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="bg-white/80 backdrop-blur px-4 py-2 rounded-lg border border-blue-200 shadow-sm">
              <span className="font-bold text-indigo-600">(A + B)</span>
              <span className="text-slate-500 mx-2">+</span>
              <span className="font-bold text-amber-600">(C + D)</span>
              <span className="text-slate-500 mx-2">=</span>
              <span className="font-bold text-emerald-600">0</span>
            </div>
            <span className="text-blue-700">→</span>
            <div className="bg-white/80 backdrop-blur px-4 py-2 rounded-lg border border-emerald-200 shadow-sm">
              <span className="font-bold text-indigo-600">(A + B)</span>
              <span className="text-slate-500 mx-2">=</span>
              <span className="font-bold text-red-600">-(C + D)</span>
            </div>
          </div>
          <p className="text-blue-700 font-medium">
            ✨ Simpan semua hasil A+B di hash map, lalu cari komplemen -(C+D) di dalamnya!
          </p>
        </div>
      </div>

      {/* Interactive Steps */}
      <div className="animate-section">
        <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span className="text-xl">📋</span>
          <span>Langkah-langkah (Hover untuk interaksi!)</span>
        </h3>
        <ol className="space-y-4">
          {[
            {
              title: 'Buat Hash Map untuk A + B',
              desc: 'Iterasi semua pasangan (i, j) dan simpan jumlah A[i] + B[j] beserta frekuensinya.',
              icon: '🗺️',
              color: 'indigo',
              detail: 'map[sum] = (map[sum] || 0) + 1'
            },
            {
              title: 'Cari Komplemen dari C + D',
              desc: 'Untuk setiap (k, l), hitung complement = -(C[k] + D[l]). Cek di map!',
              icon: '🔍',
              color: 'amber',
              detail: 'complement = -(c + d)'
            },
            {
              title: 'Hitung Total Tuple',
              desc: 'Jika complement ada di map, tambahkan frekuensinya ke hasil akhir.',
              icon: '🎯',
              color: 'emerald',
              detail: 'count += map[complement]'
            }
          ].map((step, idx) => (
            <li
              key={idx}
              className={`step-${idx} flex gap-4 p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                activeStep === idx 
                  ? `bg-${step.color}-50 border-${step.color}-300 shadow-lg` 
                  : 'bg-slate-50 border-slate-200 hover:border-slate-300'
              }`}
              onMouseEnter={() => handleStepHover(idx)}
              onMouseLeave={() => handleStepLeave(idx)}
            >
              <span className={`step-number flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-${step.color}-500 to-${step.color}-600 text-white text-lg font-bold flex items-center justify-center shadow-md`}>
                {idx + 1}
              </span>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{step.icon}</span>
                  <span className="font-semibold text-slate-700">{step.title}</span>
                </div>
                <p className="text-sm text-slate-600 mb-2">{step.desc}</p>
                <code className={`text-xs bg-${step.color}-100 text-${step.color}-700 px-2 py-1 rounded font-mono`}>
                  {step.detail}
                </code>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Interactive Demo */}
      <div className="animate-section bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-emerald-900 flex items-center gap-2">
            <span className="text-xl">🎬</span>
            <span>Demo Interaktif</span>
          </h3>
          <button
            onClick={runDemo}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-all shadow-md hover:shadow-lg active:scale-95"
          >
            {showDemo ? '🔄 Ulang Demo' : '▶️ Jalankan Demo'}
          </button>
        </div>

        <div ref={demoRef} className="space-y-4">
          {/* Input Arrays */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'A', data: demoA, color: 'blue' },
              { label: 'B', data: demoB, color: 'cyan' },
              { label: 'C', data: demoC, color: 'orange' },
              { label: 'D', data: demoD, color: 'rose' },
            ].map(({ label, data, color }) => (
              <div key={label} className={`bg-white rounded-lg p-3 border-2 border-${color}-200 shadow-sm`}>
                <div className={`text-xs font-bold text-${color}-700 mb-1`}>{label} =</div>
                <div className="flex gap-1 flex-wrap">
                  {data.map((val, i) => (
                    <span key={i} className={`px-2 py-0.5 bg-${color}-100 text-${color}-700 rounded text-sm font-mono`}>
                      {val}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {showDemo && (
            <div className="space-y-3 mt-4">
              {/* Step 1: Building HashMap */}
              {demoStep >= 1 && (
                <div className="demo-step bg-white rounded-lg p-4 border-2 border-indigo-200 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-indigo-600 text-white text-xs font-bold rounded">STEP 1</span>
                    <span className="text-sm font-semibold text-indigo-900">Bangun Hash Map A+B</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { sum: -1, pairs: ['1+(-2)', '2+(-2)→0'], freq: 2 },
                      { sum: 0, pairs: ['1+(-1)', '2+(-2)'], freq: 2 },
                      { sum: 1, pairs: ['2+(-1)'], freq: 1 },
                    ].map(({ sum, freq }, i) => (
                      <div 
                        key={i} 
                        className="px-3 py-2 bg-indigo-50 border border-indigo-200 rounded-lg"
                        style={{ animation: `fadeInUp 0.4s ${i * 0.15}s both` }}
                      >
                        <span className="font-mono font-bold text-indigo-700">{sum}</span>
                        <span className="text-slate-500 mx-1">→</span>
                        <span className="text-indigo-600 font-semibold">×{freq}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2-4: Searching */}
              {demoStep >= 2 && (
                <div className="demo-step bg-white rounded-lg p-4 border-2 border-amber-200 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-amber-600 text-white text-xs font-bold rounded">STEP 2</span>
                    <span className="text-sm font-semibold text-amber-900">Cari Komplemen C+D</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    {[
                      { cd: '-1+0=-1', comp: 1, found: true, count: 1, show: demoStep >= 2 },
                      { cd: '-1+2=1', comp: -1, found: true, count: 2, show: demoStep >= 3 },
                      { cd: '2+0=2', comp: -2, found: false, count: 0, show: demoStep >= 4 },
                      { cd: '2+2=4', comp: -4, found: false, count: 0, show: demoStep >= 5 },
                    ].filter(s => s.show).map(({ cd, comp, found, count }, i) => (
                      <div 
                        key={i} 
                        className={`flex items-center gap-3 p-2 rounded-lg ${found ? 'bg-emerald-50' : 'bg-slate-50'}`}
                        style={{ animation: `fadeInLeft 0.3s both` }}
                      >
                        <span className="font-mono text-amber-700">{cd}</span>
                        <span className="text-slate-400">→</span>
                        <span className="text-slate-600">butuh <span className="font-mono font-bold text-red-600">{comp}</span></span>
                        <span className="text-slate-400">→</span>
                        {found ? (
                          <span className="text-emerald-600 font-semibold">✓ Ada! +{count}</span>
                        ) : (
                          <span className="text-slate-400">✗ Tidak ada</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Result */}
              {demoStep >= 5 && (
                <div className="demo-result bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg p-4 text-white shadow-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">🎉 Total Tuple yang Valid:</span>
                    <span className="text-3xl font-bold">2</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Complexity Cards */}
      <div className="animate-section grid md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-5 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg">⏱️</span>
            </div>
            <h3 className="font-bold text-purple-900">Kompleksitas Waktu</h3>
          </div>
          <div className="text-sm text-purple-800 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-purple-600">O(n²)</span>
              <span className="text-purple-500">— Super cepat!</span>
            </div>
            <div className="text-xs bg-white/60 rounded-lg p-2 font-mono">
              O(n²) untuk A×B + O(n²) untuk C×D = O(n²)
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-5 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg">💾</span>
            </div>
            <h3 className="font-bold text-amber-900">Kompleksitas Ruang</h3>
          </div>
          <div className="text-sm text-amber-800 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-amber-600">O(n²)</span>
              <span className="text-amber-500">— Efisien</span>
            </div>
            <div className="text-xs bg-white/60 rounded-lg p-2 font-mono">
              HashMap menyimpan max n² kombinasi A+B
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="animate-section bg-slate-50 border-2 border-slate-200 rounded-xl p-5">
        <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span className="text-xl">📊</span>
          <span>Perbandingan Pendekatan</span>
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-slate-300">
                <th className="text-left py-2 px-3">Pendekatan</th>
                <th className="text-center py-2 px-3">Waktu</th>
                <th className="text-center py-2 px-3">Ruang</th>
                <th className="text-center py-2 px-3">Rating</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-200">
                <td className="py-2 px-3 text-slate-600">Brute Force</td>
                <td className="text-center py-2 px-3 font-mono text-red-600">O(n⁴)</td>
                <td className="text-center py-2 px-3 font-mono text-emerald-600">O(1)</td>
                <td className="text-center py-2 px-3">😰</td>
              </tr>
              <tr className="border-b border-slate-200 bg-emerald-50">
                <td className="py-2 px-3 font-semibold text-emerald-700">Hash Map ✓</td>
                <td className="text-center py-2 px-3 font-mono text-emerald-600 font-bold">O(n²)</td>
                <td className="text-center py-2 px-3 font-mono text-amber-600">O(n²)</td>
                <td className="text-center py-2 px-3">🚀</td>
              </tr>
              <tr>
                <td className="py-2 px-3 text-slate-600">Sort + Two Pointer</td>
                <td className="text-center py-2 px-3 font-mono text-amber-600">O(n³)</td>
                <td className="text-center py-2 px-3 font-mono text-emerald-600">O(n)</td>
                <td className="text-center py-2 px-3">🤔</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Pro Tips */}
      <div className="animate-section bg-gradient-to-r from-indigo-50 to-blue-50 border-2 border-indigo-200 rounded-xl p-5">
        <h3 className="font-semibold text-indigo-900 mb-3 flex items-center gap-2">
          <span className="text-xl">🎓</span>
          <span>Pro Tips</span>
        </h3>
        <ul className="text-sm text-indigo-800 space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-emerald-500">✓</span>
            <span>Selalu pilih <strong>pasangan yang lebih kecil</strong> untuk disimpan di hash map (hemat memori!)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-500">✓</span>
            <span>Pattern ini bisa digeneralisasi untuk <strong>k-Sum</strong> dengan membagi menjadi k/2 + k/2</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-500">✓</span>
            <span>Ingat: <strong>a + b + c + d = 0</strong> ↔ <strong>a + b = -(c + d)</strong></span>
          </li>
        </ul>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
