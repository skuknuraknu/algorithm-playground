import { useEffect, useRef, useState } from 'react';
import { Database, Zap, BookOpen, Trash2, ArrowRight, Hash } from 'lucide-react';
import gsap from 'gsap';

export default function LRUCacheExplanation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  // Interactive Demo State
  const [books, setBooks] = useState([
    { id: 1, title: "Harry Potter", lastUsed: 3 },
    { id: 2, title: "Lord of Rings", lastUsed: 2 },
    { id: 3, title: "The Hobbit", lastUsed: 1 }
  ]);
  const [accessCount, setAccessCount] = useState(4);

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

  // Animation for book interaction
  const accessBook = (index: number) => {
    const newBooks = [...books];
    const [bookToMove] = newBooks.splice(index, 1);
    bookToMove.lastUsed = accessCount;
    newBooks.unshift(bookToMove); // Move to front (MRU)
    setBooks(newBooks);
    setAccessCount(accessCount + 1);

    // GSAP animation for the move
    gsap.from(cardsRef.current[0], {
      x: -100,
      opacity: 0,
      scale: 0.8,
      duration: 0.5,
      ease: "back.out(1.7)"
    });
  };

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <div ref={containerRef} className="space-y-6">
      {/* Problem Introduction */}
      <div ref={addToRefs} className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-8 shadow-lg border-2 border-indigo-200">
        <div className="flex items-start gap-4">
          <div className="text-5xl">💾</div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-slate-800 mb-4 flex items-center gap-3">
              <Database className="text-indigo-600" size={36} />
              LRU Cache (Least Recently Used)
            </h2>
            <p className="text-slate-700 text-lg leading-relaxed mb-4">
              Implementasikan structure data yang menyimpan key-value pairs dengan <strong className="text-indigo-700">kapasitas terbatas</strong>.
              Ketika cache penuh dan kita ingin menambah item baru, kita harus <strong className="text-red-600">membuang item yang paling lama tidak diakses</strong> (Least Recently Used).
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white border-2 border-indigo-200 rounded-lg p-4">
                <div className="text-sm font-semibold text-indigo-700 mb-2">📋 Operations</div>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li><code className="bg-indigo-100 px-2 py-0.5 rounded text-indigo-700">get(key)</code>: Ambil nilai, return -1 jika tidak ada</li>
                  <li><code className="bg-indigo-100 px-2 py-0.5 rounded text-indigo-700">put(key, value)</code>: Simpan/update key-value pair</li>
                </ul>
              </div>
              <div className="bg-white border-2 border-emerald-200 rounded-lg p-4">
                <div className="text-sm font-semibold text-emerald-700 mb-2">⚡ Requirements</div>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>✓ Operasi <code>get</code> dan <code>put</code> harus <strong>O(1)</strong></li>
                  <li>✓ Eviction policy: buang LRU saat penuh</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Real-World Analogy */}
      <div ref={addToRefs} className="bg-white rounded-xl p-8 shadow-lg border-2 border-slate-200">
        <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <BookOpen className="text-indigo-600" size={28} />
          🌍 Analogi Dunia Nyata: Meja Kerja
        </h3>

        <div className="grid md:grid-cols-5 gap-6 items-start">
          <div className="md:col-span-3">
            <div className="bg-indigo-50 p-6 rounded-xl border-2 border-indigo-200 mb-4">
              <p className="text-indigo-800 mb-4">
                Bayangkan meja kerjamu hanya muat <strong className="text-indigo-600">3 buku</strong>.
                Buku yang paling atas adalah yang <strong className="text-green-600">baru saja kamu baca</strong> (MRU - Most Recently Used).
                Buku paling bawah adalah yang <strong className="text-red-600">sudah lama tidak dibaca</strong> (LRU - Least Recently Used).
              </p>
              <div className="text-sm text-indigo-700 bg-white/70 rounded-lg p-3">
                💡 <strong>Coba klik salah satu buku!</strong> Buku yang kamu klik akan pindah ke paling atas (MRU).
              </div>
            </div>

            <div className="flex flex-col gap-3 bg-slate-50 p-6 rounded-xl border-2 border-slate-200 min-h-[280px]">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs font-bold text-green-600 flex items-center gap-1">
                  <Zap size={14} /> MRU (Baru Dipakai)
                </div>
                <div className="text-xs text-slate-500">Access #{accessCount}</div>
              </div>

              {books.map((book, idx) => (
                <button
                  key={book.id}
                  onClick={() => accessBook(idx)}
                  className="flex items-center justify-between bg-white p-4 rounded-xl shadow-md border-2 border-indigo-200 hover:border-indigo-400 hover:shadow-xl transition-all group text-left relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10 flex items-center gap-3 flex-1">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg ${idx === 0 ? 'bg-green-500 text-white' : idx === books.length - 1 ? 'bg-red-500 text-white' : 'bg-slate-300 text-slate-700'
                      }`}>
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-slate-800 group-hover:text-indigo-600">{book.title}</div>
                      <div className="text-xs text-slate-500">Last accessed: #{book.lastUsed}</div>
                    </div>
                  </div>
                  <div className="text-xs text-slate-400 group-hover:text-indigo-600 font-semibold">Click to read →</div>
                </button>
              ))}

              <div className="flex items-center gap-1 mt-2">
                <Trash2 size={14} className="text-red-500" />
                <div className="text-xs font-bold text-red-500">LRU (Akan Dibuang Jika Penuh)</div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 space-y-4">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-5 rounded-xl shadow-md border-2 border-blue-200">
              <h4 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
                <Zap className="text-blue-600" size={20} />
                Aturan Main
              </h4>
              <ul className="space-y-3 text-sm text-blue-700">
                <li className="flex items-start gap-2 bg-white/60 p-2 rounded">
                  <span className="font-bold text-green-600">GET:</span>
                  <span>Mengambil nilai. Item yang diakses pindah ke <strong>MRU (atas)</strong>.</span>
                </li>
                <li className="flex items-start gap-2 bg-white/60 p-2 rounded">
                  <span className="font-bold text-blue-600">PUT:</span>
                  <span>Menambah item baru di <strong>MRU</strong>. Update nilai jika key sudah ada.</span>
                </li>
                <li className="flex items-start gap-2 bg-white/60 p-2 rounded">
                  <span className="font-bold text-red-600">EVICT:</span>
                  <span>Saat penuh, buang item di <strong>LRU (bawah)</strong> sebelum tambah item baru.</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 rounded-xl shadow-md border-2 border-purple-200">
              <h4 className="font-bold text-purple-800 mb-2">🎯 Mengapa LRU?</h4>
              <p className="text-sm text-purple-700 leading-relaxed">
                Asumsi: Data yang <strong>baru saja diakses</strong> cenderung akan <strong>diakses lagi</strong>
                dalam waktu dekat (temporal locality). Jadi kita simpan data "panas" dan buang yang "dingin".
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Solution */}
      <div ref={addToRefs} className="bg-white rounded-xl p-8 shadow-lg border-2 border-slate-200">
        <h3 className="text-2xl font-bold text-slate-800 mb-6">🔧 Solusi Teknis: Hash Map + Doubly Linked List</h3>

        <div className="space-y-6">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-5 rounded-xl border-2 border-amber-200">
            <p className="text-amber-900 mb-3">
              <strong>Challenge:</strong> Kita butuh operasi yang <strong className="text-red-600">super cepat O(1)</strong> untuk:
            </p>
            <ul className="list-disc list-inside text-amber-800 space-y-1 ml-4">
              <li>Mencari apakah key ada (✓ Hash Map bisa)</li>
              <li>Mengambil nilai dengan key (✓ Hash Map bisa)</li>
              <li>Memindahkan item ke posisi MRU (❌ Hash Map tidak bisa, butuh urutan!)</li>
              <li>Menghapus item di posisi LRU (❌ Hash Map tidak bisa)</li>
            </ul>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Hash Map */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border-2 border-blue-200 hover:scale-105 transition-transform duration-300 shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <Hash size={32} className="text-blue-600" />
                <h4 className="font-bold text-blue-800 text-lg">1. Hash Map</h4>
              </div>
              <div className="space-y-3 text-sm">
                <div className="bg-white/70 p-3 rounded-lg border border-blue-200">
                  <div className="font-semibold text-blue-700 mb-1">Fungsi:</div>
                  <p className="text-blue-600">Menyimpan <code>key → node</code> mapping untuk akses O(1)</p>
                </div>
                <div className="bg-white/70 p-3 rounded-lg border border-blue-200">
                  <div className="font-semibold text-blue-700 mb-1">Struktur:</div>
                  <code className="text-xs bg-blue-100 px-2 py-1 rounded block">
                    Map&lt;key, ListNode*&gt;
                  </code>
                </div>
                <div className="bg-white/70 p-3 rounded-lg border border-blue-200">
                  <div className="font-semibold text-blue-700 mb-1">Operasi:</div>
                  <p className="text-blue-600">find(), insert(), delete() - semua O(1)</p>
                </div>
              </div>
            </div>

            {/* Doubly Linked List */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200 hover:scale-105 transition-transform duration-300 shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <ArrowRight size={32} className="text-purple-600" />
                <h4 className="font-bold text-purple-800 text-lg">2. Doubly Linked List</h4>
              </div>
              <div className="space-y-3 text-sm">
                <div className="bg-white/70 p-3 rounded-lg border border-purple-200">
                  <div className="font-semibold text-purple-700 mb-1">Fungsi:</div>
                  <p className="text-purple-600">Mengatur urutan LRU → MRU</p>
                </div>
                <div className="bg-white/70 p-3 rounded-lg border border-purple-200">
                  <div className="font-semibold text-purple-700 mb-1">Struktur:</div>
                  <code className="text-xs bg-purple-100 px-2 py-1 rounded block">
                    head ← → node ← → tail
                  </code>
                </div>
                <div className="bg-white/70 p-3 rounded-lg border border-purple-200">
                  <div className="font-semibold text-purple-700 mb-1">Operasi:</div>
                  <p className="text-purple-600">moveToHead(), removeTail() - semua O(1)</p>
                </div>
              </div>
            </div>
          </div>

          {/* How They Work Together */}
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-xl border-2 border-emerald-200">
            <h4 className="font-bold text-emerald-800 mb-4 text-lg">🤝 Bagaimana Mereka Bekerja Sama</h4>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg border border-emerald-200">
                <div className="flex items-start gap-3">
                  <div className="bg-green-500 text-white font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                    1
                  </div>
                  <div>
                    <div className="font-semibold text-emerald-700">GET(key):</div>
                    <ul className="text-sm text-slate-600 mt-1 space-y-1">
                      <li>→ Hash Map: cek apakah key exists dan ambil pointer ke node (O(1))</li>
                      <li>→ Linked List: pindahkan node tersebut ke head/MRU (O(1))</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-emerald-200">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-500 text-white font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                    2
                  </div>
                  <div>
                    <div className="font-semibold text-emerald-700">PUT(key, value):</div>
                    <ul className="text-sm text-slate-600 mt-1 space-y-1">
                      <li>→ Jika key exists: update value + pindahkan ke head (O(1))</li>
                      <li>→ Jika baru + penuh: hapus tail (LRU) dari list dan hash map (O(1))</li>
                      <li>→ Tambah node baru di head dan simpan di hash map (O(1))</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Complexity Analysis */}
      <div ref={addToRefs} className="grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl p-6 shadow-lg border-2 border-violet-200">
          <h3 className="text-xl font-bold text-violet-800 mb-4 flex items-center gap-2">
            <Zap className="text-violet-600" size={24} />
            ⏱️ Time Complexity
          </h3>
          <div className="space-y-3">
            <div className="bg-white p-4 rounded-lg border border-violet-200">
              <div className="flex items-center justify-between mb-2">
                <code className="text-sm font-semibold text-violet-700">get(key)</code>
                <span className="text-2xl font-bold text-green-600">O(1)</span>
              </div>
              <div className="text-xs text-slate-600">Hash lookup + linked list move</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-violet-200">
              <div className="flex items-center justify-between mb-2">
                <code className="text-sm font-semibold text-violet-700">put(key, value)</code>
                <span className="text-2xl font-bold text-green-600">O(1)</span>
              </div>
              <div className="text-xs text-slate-600">Hash insert/update + list operations</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-6 shadow-lg border-2 border-cyan-200">
          <h3 className="text-xl font-bold text-cyan-800 mb-4 flex items-center gap-2">
            <Database className="text-cyan-600" size={24} />
            💾 Space Complexity
          </h3>
          <div className="bg-white p-4 rounded-lg border border-cyan-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-cyan-700">Total Space</span>
              <span className="text-2xl font-bold text-cyan-600">O(capacity)</span>
            </div>
            <div className="text-xs text-slate-600 space-y-1">
              <div>• Hash Map: O(capacity) entries</div>
              <div>• Linked List: O(capacity) nodes</div>
              <div>• Each node stores (key, value, prev, next)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Common Interview Questions */}
      <div ref={addToRefs} className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl p-6 shadow-lg border-2 border-rose-200">
        <h3 className="text-xl font-bold text-rose-800 mb-4">❓ Common Interview Questions</h3>
        <div className="space-y-3 text-sm">
          <div className="bg-white p-4 rounded-lg border border-rose-200">
            <strong className="text-rose-700">Q: Mengapa tidak pakai array saja?</strong>
            <p className="text-slate-600 mt-1">
              A: Removing/inserting di tengah array itu O(n). Linked list bisa O(1) untuk operasi tersebut.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-rose-200">
            <strong className="text-rose-700">Q: Mengapa perlu doubly linked list, bukan singly?</strong>
            <p className="text-slate-600 mt-1">
              A: Untuk delete node di O(1), kita perlu akses ke node.prev. Singly linked list butuh O(n) untuk cari predecessor.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-rose-200">
            <strong className="text-rose-700">Q: Alternatif selain LRU?</strong>
            <p className="text-slate-600 mt-1">
              A: Ada LFU (Least Frequently Used), FIFO (First In First Out), Random Replacement, dll.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
