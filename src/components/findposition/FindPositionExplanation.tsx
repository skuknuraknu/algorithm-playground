import { useEffect, useRef } from 'react';
import { ArrowRight, CheckCircle, Search, Target, ListOrdered } from 'lucide-react';
import gsap from 'gsap';

export default function FindPositionExplanation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <div ref={containerRef} className="space-y-6">
      <div ref={addToRefs} className="bg-white rounded-xl p-8 shadow-lg border-2 border-slate-200 hover:border-blue-400 transition-colors duration-300">
        <h2 className="text-3xl font-bold text-slate-800 mb-4 flex items-center gap-3">
          <Target className="text-red-500" size={32} />
          Masalah: Cari Posisi Awal dan Akhir Elemen
        </h2>
        <p className="text-slate-700 text-lg leading-relaxed">
          Diberikan sebuah array angka <code className="bg-slate-100 px-2 py-1 rounded font-mono text-blue-600">nums</code> yang sudah <strong>terurut</strong> (dari kecil ke besar),
          temukan posisi <strong>awal</strong> dan <strong>akhir</strong> dari sebuah angka <code className="bg-slate-100 px-2 py-1 rounded font-mono text-red-600">target</code>.
        </p>
        <p className="text-slate-700 text-lg leading-relaxed mt-4">
          Jika <code className="bg-slate-100 px-2 py-1 rounded font-mono text-red-600">target</code> tidak ditemukan, kembalikan <code className="bg-slate-100 px-2 py-1 rounded font-mono">[-1, -1]</code>.
        </p>
        <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 rounded-r">
          <strong>Tantangan:</strong> Kamu harus membuat algoritma yang sangat cepat dengan kompleksitas waktu <strong>O(log n)</strong>.
        </div>

        <div className="mt-6 bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
          <h3 className="font-bold text-blue-900 text-xl mb-4">Contoh Kasus:</h3>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100 hover:shadow-md transition-shadow">
              <div className="text-sm text-slate-500 mb-1">Input</div>
              <div className="font-mono text-sm mb-2">[5,7,7,8,8,10]</div>
              <div className="text-sm text-slate-500">Target: <strong>8</strong></div>
              <div className="mt-2 text-sm text-slate-500">Output</div>
              <div className="text-2xl font-bold text-blue-600">[3, 4]</div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100 hover:shadow-md transition-shadow">
              <div className="text-sm text-slate-500 mb-1">Input</div>
              <div className="font-mono text-sm mb-2">[5,7,7,8,8,10]</div>
              <div className="text-sm text-slate-500">Target: <strong>6</strong></div>
              <div className="mt-2 text-sm text-slate-500">Output</div>
              <div className="text-2xl font-bold text-blue-600">[-1, -1]</div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100 hover:shadow-md transition-shadow">
              <div className="text-sm text-slate-500 mb-1">Input</div>
              <div className="font-mono text-sm mb-2">[]</div>
              <div className="text-sm text-slate-500">Target: <strong>0</strong></div>
              <div className="mt-2 text-sm text-slate-500">Output</div>
              <div className="text-2xl font-bold text-blue-600">[-1, -1]</div>
            </div>
          </div>
        </div>
      </div>

      <div ref={addToRefs} className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-8 shadow-lg border-2 border-indigo-200">
        <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Search className="text-indigo-600" size={28} />
          Pendekatan: Binary Search Ganda
        </h3>
        <div className="space-y-4 text-slate-700">
          <p className="text-lg">
            Solusi terbaik adalah menggunakan <strong>Binary Search sebanyak dua kali</strong>:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mt-4">
            <div className="bg-white/80 p-5 rounded-lg border border-indigo-100 hover:bg-white transition-colors">
              <h4 className="font-bold text-indigo-700 mb-2 flex items-center gap-2">
                <ListOrdered size={18} />
                Pencarian Pertama (Kiri)
              </h4>
              <p className="text-sm mb-2">Mencari posisi <strong>paling kiri</strong> dari target.</p>
              <ul className="text-sm list-disc list-inside text-slate-600">
                <li>Lakukan Binary Search biasa.</li>
                <li>Jika ketemu target, simpan posisinya, tapi <strong>terus cari ke kiri</strong> (geser batas kanan).</li>
              </ul>
            </div>

            <div className="bg-white/80 p-5 rounded-lg border border-indigo-100 hover:bg-white transition-colors">
              <h4 className="font-bold text-indigo-700 mb-2 flex items-center gap-2">
                <ListOrdered size={18} />
                Pencarian Kedua (Kanan)
              </h4>
              <p className="text-sm mb-2">Mencari posisi <strong>paling kanan</strong> dari target.</p>
              <ul className="text-sm list-disc list-inside text-slate-600">
                <li>Lakukan Binary Search biasa.</li>
                <li>Jika ketemu target, simpan posisinya, tapi <strong>terus cari ke kanan</strong> (geser batas kiri).</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-white rounded-lg p-6 shadow-md border-t-4 border-indigo-500">
          <h4 className="font-bold text-slate-800 mb-3 text-xl">Langkah Algoritma:</h4>
          <div className="space-y-4">
            <div className="flex items-start gap-3 group">
              <div className="bg-indigo-100 p-2 rounded-full group-hover:bg-indigo-200 transition-colors">
                <ArrowRight className="text-indigo-600" size={20} />
              </div>
              <div>
                <strong>Langkah 1:</strong> Jalankan fungsi pencarian untuk batas <strong>kiri</strong>. Jika tidak ketemu, langsung kembalikan <code className="bg-slate-100 px-1 rounded">[-1, -1]</code>.
              </div>
            </div>
            <div className="flex items-start gap-3 group">
              <div className="bg-indigo-100 p-2 rounded-full group-hover:bg-indigo-200 transition-colors">
                <ArrowRight className="text-indigo-600" size={20} />
              </div>
              <div>
                <strong>Langkah 2:</strong> Jika batas kiri ketemu, jalankan fungsi pencarian lagi untuk batas <strong>kanan</strong>.
              </div>
            </div>
            <div className="flex items-start gap-3 group">
              <div className="bg-indigo-100 p-2 rounded-full group-hover:bg-indigo-200 transition-colors">
                <ArrowRight className="text-indigo-600" size={20} />
              </div>
              <div>
                <strong>Langkah 3:</strong> Gabungkan hasil kedua pencarian menjadi array <code className="bg-slate-100 px-1 rounded">[awal, akhir]</code>.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div ref={addToRefs} className="bg-white rounded-xl p-8 shadow-lg border-2 border-slate-200">
        <h3 className="text-2xl font-bold text-slate-800 mb-4">Analisis Kompleksitas</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-50 rounded-lg p-6 border-2 border-green-200 hover:scale-105 transition-transform duration-300">
            <h4 className="font-bold text-green-900 mb-2 text-lg">Kompleksitas Waktu</h4>
            <p className="text-2xl font-mono font-bold text-green-700">O(log n)</p>
            <p className="text-slate-700 mt-2">
              Kita melakukan Binary Search dua kali. Karena O(log n) + O(log n) tetap O(log n), maka sangat efisien.
            </p>
          </div>
          <div className="bg-purple-50 rounded-lg p-6 border-2 border-purple-200 hover:scale-105 transition-transform duration-300">
            <h4 className="font-bold text-purple-900 mb-2 text-lg">Kompleksitas Ruang</h4>
            <p className="text-2xl font-mono font-bold text-purple-700">O(1)</p>
            <p className="text-slate-700 mt-2">
              Hanya membutuhkan sedikit memori tambahan untuk menyimpan variabel pointer dan hasil.
            </p>
          </div>
        </div>
      </div>

      <div ref={addToRefs} className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-8 shadow-lg border-2 border-orange-200">
        <h3 className="text-2xl font-bold text-slate-800 mb-4">Poin Penting</h3>
        <ul className="space-y-3 text-slate-700">
          <li className="flex items-start gap-3">
            <CheckCircle className="text-orange-600 flex-shrink-0 mt-1" size={20} />
            <span>
              <strong>Modifikasi Binary Search:</strong> Jangan berhenti saat target ditemukan! Terus cari ke kiri/kanan untuk menemukan batasnya.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="text-orange-600 flex-shrink-0 mt-1" size={20} />
            <span>
              <strong>Kecepatan Logaritmik:</strong> Jauh lebih cepat daripada mencari satu per satu (Linear Search O(n)) untuk data yang besar.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="text-orange-600 flex-shrink-0 mt-1" size={20} />
            <span>
              <strong>Edge Cases:</strong> Algoritma ini aman menangani array kosong atau target yang tidak ada.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
