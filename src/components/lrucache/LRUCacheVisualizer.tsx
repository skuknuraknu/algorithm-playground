import { useEffect, useRef } from 'react';
import { Database, ArrowRight, Clock } from 'lucide-react';
import gsap from 'gsap';

interface CacheItem {
  key: number;
  value: number;
  timestamp: number; // For visualization purposes only
}

interface LRUCacheVisualizerProps {
  cache: CacheItem[];
  capacity: number;
  lastOperation?: { type: 'put' | 'get'; key: number; value?: number; result?: number | null };
}

export default function LRUCacheVisualizer({ cache, capacity, lastOperation }: LRUCacheVisualizerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);
  
  // Reset refs on each render to ensure we don't have stale references
  itemsRef.current = [];

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, []);

  useEffect(() => {
    // Animate items when cache changes
    const targets = itemsRef.current.filter(Boolean);
    if (targets.length > 0) {
      gsap.fromTo(targets,
        { scale: 0.95 },
        { scale: 1, duration: 0.3, ease: "back.out(1.7)", stagger: 0.05 }
      );
    }
  }, [cache]);

  return (
    <div ref={containerRef} className="space-y-8">
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-8 shadow-xl border-2 border-slate-700 text-white">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Database className="text-indigo-400" size={32} />
            <div>
              <h3 className="text-xl font-bold">Status Cache LRU</h3>
              <p className="text-slate-400 text-sm">Kapasitas: {capacity} | Terisi: {cache.length}</p>
            </div>
          </div>
          
          {lastOperation && (
            <div className={`px-4 py-2 rounded-lg border ${
              lastOperation.type === 'put' 
                ? 'bg-blue-500/20 border-blue-500 text-blue-300' 
                : 'bg-purple-500/20 border-purple-500 text-purple-300'
            }`}>
              <span className="font-bold mr-2">{lastOperation.type.toUpperCase()}</span>
              <span className="font-mono">
                {lastOperation.type === 'put' 
                  ? `(${lastOperation.key}, ${lastOperation.value})` 
                  : `(${lastOperation.key}) → ${lastOperation.result !== -1 ? lastOperation.result : 'Tidak Ketemu'}`
                }
              </span>
            </div>
          )}
        </div>

        <div className="relative min-h-[120px] flex items-center">
          {/* LRU to MRU Labels */}
          <div className="absolute -top-6 left-0 text-xs font-bold text-red-400 flex items-center gap-1">
            <Clock size={12} /> LRU (Paling Lama)
          </div>
          <div className="absolute -top-6 right-0 text-xs font-bold text-green-400 flex items-center gap-1">
            MRU (Paling Baru) <Clock size={12} />
          </div>

          {/* Cache Items */}
          <div className="flex-1 flex items-center gap-4 overflow-x-auto pb-4 custom-scrollbar">
            {cache.length === 0 ? (
              <div className="w-full text-center text-slate-500 italic">
                Cache masih kosong
              </div>
            ) : (
              cache.map((item, index) => (
                <div
                  key={`${item.key}-${item.timestamp}`}
                  ref={el => { if (el) itemsRef.current[index] = el }}
                  className={`relative flex-shrink-0 w-24 h-24 rounded-lg border-2 flex flex-col items-center justify-center transition-all duration-300 ${
                    lastOperation?.key === item.key
                      ? 'bg-indigo-600 border-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.5)] scale-105'
                      : 'bg-slate-700 border-slate-600'
                  }`}
                >
                  <div className="text-xs text-slate-400 mb-1">Key: {item.key}</div>
                  <div className="text-2xl font-bold font-mono">{item.value}</div>
                  
                  {/* Connector Line */}
                  {index < cache.length - 1 && (
                    <div className="absolute -right-6 top-1/2 -translate-y-1/2 text-slate-600">
                      <ArrowRight size={20} />
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md border-2 border-slate-200">
          <h4 className="font-bold text-slate-800 mb-3">Cara Kerja</h4>
          <ul className="space-y-2 text-sm text-slate-600">
            <li className="flex items-start gap-2">
              <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-bold mt-0.5">GET</span>
              <span>Mengambil data. Data yang diakses akan pindah ke posisi <strong>MRU</strong> (kanan) karena "baru saja dipakai".</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-bold mt-0.5">PUT</span>
              <span>Menambah data baru di posisi <strong>MRU</strong>. Jika key sudah ada, update nilainya dan pindahkan ke MRU.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-xs font-bold mt-0.5">EVICT</span>
              <span>Jika kapasitas penuh, data di posisi <strong>LRU</strong> (kiri) akan dibuang sebelum data baru masuk.</span>
            </li>
          </ul>
        </div>

        <div className="bg-indigo-50 p-6 rounded-xl border-2 border-indigo-100">
          <h4 className="font-bold text-indigo-900 mb-3">Struktur Data</h4>
          <p className="text-sm text-indigo-800 mb-2">
            Kita menggunakan kombinasi <strong>Hash Map</strong> dan <strong>Doubly Linked List</strong>:
          </p>
          <ul className="list-disc list-inside text-sm text-indigo-700 space-y-1">
            <li><strong>Hash Map:</strong> Akses data super cepat O(1) menggunakan key.</li>
            <li><strong>Doubly Linked List:</strong> Memindahkan urutan (hapus & tambah) dengan cepat O(1).</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
