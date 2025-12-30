import React, { useEffect, useRef } from 'react';
import { GitMerge, ArrowRight, List, CheckCircle, AlertTriangle } from 'lucide-react';
import gsap from 'gsap';

export default function MergeTwoListsExplanation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const ctx = gsap.context(() => {
        gsap.from('.section-card', {
          opacity: 0,
          y: 30,
          duration: 0.6,
          stagger: 0.2,
          ease: 'power2.out'
        });
      }, containerRef);
      return () => ctx.revert();
    }
  }, []);

  return (
    <div ref={containerRef} className="space-y-8">
      {/* Problem Statement */}
      <div className="section-card bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-xl border border-blue-200">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-blue-600 p-3 rounded-xl shadow-lg">
            <GitMerge className="text-white" size={32} />
          </div>
          <h2 className="text-3xl font-bold text-slate-800">Gabungkan Dua List Terurut</h2>
        </div>
        
        <p className="text-lg text-slate-700 leading-relaxed mb-6">
          Bayangkan kamu memiliki dua tumpukan kartu yang sudah diurutkan dari kecil ke besar. 
          Tugasmu adalah menggabungkan kedua tumpukan tersebut menjadi satu tumpukan baru yang juga terurut.
        </p>
        
        <div className="bg-white rounded-xl p-6 border-l-4 border-blue-500 shadow-md">
          <h3 className="font-bold text-slate-800 text-lg mb-2">Tugas:</h3>
          <p className="text-slate-700">
            Diberikan kepala (head) dari dua linked list terurut, <code className="bg-slate-100 px-2 py-1 rounded font-mono text-blue-600">list1</code> dan <code className="bg-slate-100 px-2 py-1 rounded font-mono text-blue-600">list2</code>.
            Gabungkan keduanya menjadi satu <strong>sorted linked list</strong>. List baru harus dibuat dengan menyambungkan node-node dari dua list pertama.
          </p>
        </div>
      </div>

      {/* Visual Example */}
      <div className="section-card bg-white rounded-2xl p-8 shadow-xl border border-slate-200">
        <h3 className="text-2xl font-bold mb-6 text-slate-800 flex items-center gap-2">
          <List className="text-purple-600" />
          Contoh Visual
        </h3>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-600 w-12">List 1:</span>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-blue-100 border-2 border-blue-500 flex items-center justify-center font-bold text-blue-700">1</div>
                <ArrowRight size={20} className="text-slate-400" />
                <div className="w-10 h-10 rounded-full bg-blue-100 border-2 border-blue-500 flex items-center justify-center font-bold text-blue-700">2</div>
                <ArrowRight size={20} className="text-slate-400" />
                <div className="w-10 h-10 rounded-full bg-blue-100 border-2 border-blue-500 flex items-center justify-center font-bold text-blue-700">4</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-600 w-12">List 2:</span>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-purple-100 border-2 border-purple-500 flex items-center justify-center font-bold text-purple-700">1</div>
                <ArrowRight size={20} className="text-slate-400" />
                <div className="w-10 h-10 rounded-full bg-purple-100 border-2 border-purple-500 flex items-center justify-center font-bold text-purple-700">3</div>
                <ArrowRight size={20} className="text-slate-400" />
                <div className="w-10 h-10 rounded-full bg-purple-100 border-2 border-purple-500 flex items-center justify-center font-bold text-purple-700">4</div>
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <ArrowRight size={40} className="text-slate-300" />
          </div>

          <div className="bg-green-50 p-4 rounded-xl border-2 border-green-200">
            <div className="font-bold text-green-800 mb-2 text-center">Hasil Gabungan:</div>
            <div className="flex items-center gap-2 flex-wrap justify-center">
              {[1, 1, 2, 3, 4, 4].map((val, idx) => (
                <React.Fragment key={idx}>
                  <div className="w-10 h-10 rounded-full bg-green-100 border-2 border-green-500 flex items-center justify-center font-bold text-green-700">
                    {val}
                  </div>
                  {idx < 5 && <ArrowRight size={16} className="text-slate-400" />}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Intuition */}
      <div className="section-card bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 shadow-xl border border-purple-200">
        <h3 className="text-2xl font-bold mb-4 text-slate-800">💡 Intuisi & Strategi</h3>
        <p className="text-lg text-slate-700 leading-relaxed mb-6">
          Karena kedua list sudah terurut, kita bisa menggunakan pendekatan <strong>Two Pointers</strong> (Dua Penunjuk).
          Kita cukup membandingkan elemen pertama dari kedua list, ambil yang lebih kecil, lalu majukan penunjuknya.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h4 className="font-bold text-purple-900 text-lg mb-3 flex items-center gap-2">
              <CheckCircle className="text-green-500" />
              Langkah-langkah:
            </h4>
            <ol className="list-decimal list-inside space-y-2 text-slate-700">
              <li>Buat node dummy sebagai kepala list hasil.</li>
              <li>Bandingkan nilai kepala <code className="bg-slate-100 px-1 rounded">list1</code> dan <code className="bg-slate-100 px-1 rounded">list2</code>.</li>
              <li>Sambungkan node dengan nilai lebih kecil ke list hasil.</li>
              <li>Majukan pointer list yang dipilih.</li>
              <li>Ulangi sampai salah satu list habis.</li>
              <li>Sambungkan sisa list yang belum habis.</li>
            </ol>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <h4 className="font-bold text-orange-900 text-lg mb-3 flex items-center gap-2">
              <AlertTriangle className="text-orange-500" />
              Poin Penting:
            </h4>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-orange-500 font-bold">•</span>
                <span>Gunakan <strong>Dummy Node</strong> untuk memudahkan penanganan head list baru.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 font-bold">•</span>
                <span>Jangan lupa menyambungkan sisa list jika salah satu list sudah habis lebih dulu.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Complexity */}
      <div className="section-card bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 shadow-xl border border-green-200">
        <h3 className="text-2xl font-bold mb-6 text-slate-800">⚡ Analisis Kompleksitas</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 border-2 border-green-300 shadow-lg">
            <h4 className="font-bold text-green-900 text-xl mb-2">Waktu: O(n + m)</h4>
            <p className="text-slate-700">
              Dimana n dan m adalah panjang dari kedua list. Kita hanya perlu melakukan iterasi sekali melewati kedua list tersebut.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 border-2 border-emerald-300 shadow-lg">
            <h4 className="font-bold text-emerald-900 text-xl mb-2">Ruang: O(1)</h4>
            <p className="text-slate-700">
              Kita hanya mengubah pointer dari node yang sudah ada, jadi kita hanya butuh ruang konstan untuk beberapa variabel pointer.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
