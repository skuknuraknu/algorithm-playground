import { useState, useEffect, useRef } from 'react';
import { Play, CheckCircle, XCircle } from 'lucide-react';
import gsap from 'gsap';

export default function LRUCacheCodeEditor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, []);

  const [code, setCode] = useState(`class LRUCache {
  capacity: number;
  map: Map<number, any>; // Kamu mungkin butuh Node Doubly Linked List di sini

  constructor(capacity: number) {
    this.capacity = capacity;
    this.map = new Map();
  }

  get(key: number): number {
    if (!this.map.has(key)) return -1;
    
    // Logika pindahkan ke MRU (Most Recently Used) di sini
    const val = this.map.get(key);
    this.map.delete(key);
    this.map.set(key, val);
    return val;
  }

  put(key: number, value: number): void {
    if (this.map.has(key)) {
      this.map.delete(key);
    }
    this.map.set(key, value);
    
    if (this.map.size > this.capacity) {
      // Logika buang LRU (Least Recently Used) di sini
      // Iterator keys() pada Map mengembalikan key sesuai urutan penyisipan
      const firstKey = this.map.keys().next().value;
      this.map.delete(firstKey);
    }
  }
}`);

  const [testResults, setTestResults] = useState<{ passed: boolean; message: string }[]>([]);
  const [showResults, setShowResults] = useState(false);

  const runTests = () => {
    const results = [];
    
    try {
      // Create a safe evaluation context
      const userCode = `
        ${code}
        return LRUCache;
      `;
      
      const LRUCacheClass = new Function(userCode)();
      
      // Test Case 1: Basic Put and Get
      try {
        const lru = new LRUCacheClass(2);
        lru.put(1, 1);
        lru.put(2, 2);
        const val1 = lru.get(1);
        if (val1 === 1) {
          results.push({ passed: true, message: "Tes 1: Put/Get Dasar Berhasil" });
        } else {
          results.push({ passed: false, message: `Tes 1 Gagal: Harusnya 1, dapat ${val1}` });
        }
      } catch (e) {
        results.push({ passed: false, message: `Tes 1 Error: ${e}` });
      }

      // Test Case 2: Eviction
      try {
        const lru = new LRUCacheClass(2);
        lru.put(1, 1);
        lru.put(2, 2);
        lru.put(3, 3); // Should evict 1
        const val1 = lru.get(1);
        if (val1 === -1) {
          results.push({ passed: true, message: "Tes 2: Eviction Berhasil (Key 1 dibuang)" });
        } else {
          results.push({ passed: false, message: `Tes 2 Gagal: Harusnya -1 (dibuang), dapat ${val1}` });
        }
      } catch (e) {
        results.push({ passed: false, message: `Tes 2 Error: ${e}` });
      }

      // Test Case 3: Update moves to MRU
      try {
        const lru = new LRUCacheClass(2);
        lru.put(1, 1);
        lru.put(2, 2);
        lru.get(1); // 1 is now MRU
        lru.put(3, 3); // Should evict 2 (LRU)
        const val2 = lru.get(2);
        const val1 = lru.get(1);
        if (val2 === -1 && val1 === 1) {
          results.push({ passed: true, message: "Tes 3: Update MRU Berhasil" });
        } else {
          results.push({ passed: false, message: `Tes 3 Gagal: Harusnya 2 dibuang, 1 disimpan. Dapat 2=${val2}, 1=${val1}` });
        }
      } catch (e) {
        results.push({ passed: false, message: `Tes 3 Error: ${e}` });
      }

    } catch (error) {
      results.push({ passed: false, message: `Syntax/Runtime Error: ${error}` });
    }

    setTestResults(results);
    setShowResults(true);
  };

  return (
    <div className="space-y-6">
      <div ref={containerRef} className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
        <h3 className="text-xl font-bold text-slate-800 mb-4">Editor Kode</h3>
        <p className="text-sm text-slate-600 mb-4">
          Implementasikan kelas <code>LRUCache</code>. Kode bawaan menggunakan <code>Map</code> JavaScript yang menjaga urutan penyisipan (insertion order), jadi sudah mirip LRU. Cobalah implementasikan menggunakan <strong>Doubly Linked List + HashMap</strong> untuk tantangan O(1) yang sebenarnya!
        </p>

        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-96 p-4 font-mono text-sm bg-slate-900 text-green-400 rounded-lg border-2 border-slate-300 focus:outline-none focus:border-indigo-500"
          spellCheck={false}
        />

        <button
          onClick={runTests}
          className="mt-4 bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center gap-2 shadow-md"
        >
          <Play size={20} />
          Jalankan Tes
        </button>
      </div>

      {showResults && (
        <div ref={resultsRef} className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
          <h3 className="text-xl font-bold text-slate-800 mb-4">Hasil Tes</h3>
          <div className="space-y-3">
            {testResults.map((result, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-2 flex items-center gap-3 ${
                  result.passed
                    ? 'bg-green-50 border-green-300 text-green-800'
                    : 'bg-red-50 border-red-300 text-red-800'
                }`}
              >
                {result.passed ? <CheckCircle size={24} /> : <XCircle size={24} />}
                <span className="font-medium">{result.message}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
