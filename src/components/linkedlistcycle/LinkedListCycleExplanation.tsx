import { useEffect, useRef } from 'react';
import { RefreshCw, AlertTriangle, CheckCircle } from 'lucide-react';
import gsap from 'gsap';

export default function LinkedListCycleExplanation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const ctx = gsap.context(() => {
        gsap.from('.explanation-card', {
          opacity: 0,
          y: 30,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out'
        });

        gsap.from('.concept-icon', {
          scale: 0,
          rotation: -180,
          duration: 1,
          delay: 0.5,
          ease: 'elastic.out(1, 0.5)'
        });
      }, containerRef);
      return () => ctx.revert();
    }
  }, []);

  return (
    <div ref={containerRef} className="space-y-6">
      <div className="explanation-card bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 shadow-lg border-2 border-orange-200">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-orange-100 rounded-lg">
            <RefreshCw className="concept-icon w-8 h-8 text-orange-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Linked List Cycle</h2>
        </div>
        <p className="text-slate-700 leading-relaxed">
          Masalah ini meminta kita untuk mendeteksi apakah sebuah Linked List memiliki siklus (cycle) di dalamnya. 
          Siklus terjadi jika ada node dalam list yang menunjuk kembali ke node sebelumnya, sehingga jika kita menelusuri list tersebut, kita tidak akan pernah mencapai ujung (null).
        </p>
      </div>

      <div className="explanation-card bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <AlertTriangle className="text-amber-500" />
          Analogi Dunia Nyata
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <h4 className="font-semibold text-slate-700 mb-2">Lintasan Balap (Sirkuit)</h4>
            <p className="text-sm text-slate-600">
              Bayangkan dua pelari di lintasan balap berbentuk lingkaran. Pelari cepat akhirnya akan menyusul pelari lambat (overlap). Jika lintasannya lurus tanpa ujung, pelari cepat akan meninggalkan pelari lambat selamanya.
            </p>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <h4 className="font-semibold text-slate-700 mb-2">Jalan Buntu vs Bundaran</h4>
            <p className="text-sm text-slate-600">
              Linked list biasa seperti jalan yang berujung pada jalan buntu (null). Linked list dengan siklus seperti jalan yang masuk ke bundaran dan tidak pernah keluar, berputar selamanya.
            </p>
          </div>
        </div>
      </div>

      <div className="explanation-card bg-blue-50 rounded-xl p-6 shadow-lg border-2 border-blue-200">
        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <CheckCircle className="text-blue-600" />
          Algoritma Floyd's Cycle-Finding (Kura-kura dan Kelinci)
        </h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 p-2 rounded-full mt-1">
              <span className="font-bold text-blue-600">1</span>
            </div>
            <div>
              <h4 className="font-semibold text-slate-800">Dua Pointer</h4>
              <p className="text-slate-600">Gunakan dua pointer: <strong>Slow</strong> (kura-kura) bergerak 1 langkah, dan <strong>Fast</strong> (kelinci) bergerak 2 langkah.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 p-2 rounded-full mt-1">
              <span className="font-bold text-blue-600">2</span>
            </div>
            <div>
              <h4 className="font-semibold text-slate-800">Deteksi Pertemuan</h4>
              <p className="text-slate-600">Jika ada siklus, pointer Fast akhirnya akan bertemu dengan pointer Slow di dalam siklus tersebut.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-blue-100 p-2 rounded-full mt-1">
              <span className="font-bold text-blue-600">3</span>
            </div>
            <div>
              <h4 className="font-semibold text-slate-800">Tanpa Siklus</h4>
              <p className="text-slate-600">Jika tidak ada siklus, pointer Fast akan mencapai ujung list (null) lebih dulu.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="explanation-card bg-slate-800 text-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-bold mb-4">Kompleksitas</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-slate-400 text-sm mb-1">Waktu</div>
            <div className="text-2xl font-mono text-green-400">O(N)</div>
            <p className="text-xs text-slate-400 mt-1">Kita mengunjungi setiap node paling banyak dua kali.</p>
          </div>
          <div>
            <div className="text-slate-400 text-sm mb-1">Ruang</div>
            <div className="text-2xl font-mono text-green-400">O(1)</div>
            <p className="text-xs text-slate-400 mt-1">Hanya menggunakan dua pointer, tanpa memori tambahan.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
