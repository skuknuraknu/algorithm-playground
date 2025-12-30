import { useEffect, useRef, useState } from 'react';
import { Database, Zap, BookOpen, Trash2 } from 'lucide-react';
import gsap from 'gsap';

export default function LRUCacheExplanation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  
  // Interactive Demo State
  const [books, setBooks] = useState([
    { id: 1, title: "Harry Potter" },
    { id: 2, title: "Lord of Rings" },
    { id: 3, title: "The Hobbit" }
  ]);

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
    newBooks.unshift(bookToMove); // Move to front (top of stack)
    setBooks(newBooks);
  };

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <div ref={containerRef} className="space-y-8">
      {/* Intro Card */}
      <div ref={addToRefs} className="bg-white rounded-xl p-8 shadow-lg border-2 border-slate-200">
        <h2 className="text-3xl font-bold text-slate-800 mb-4 flex items-center gap-3">
          <Database className="text-indigo-600" size={32} />
          Problem: LRU Cache
        </h2>
        <p className="text-slate-700 text-lg leading-relaxed mb-4">
          Bayangkan kamu punya meja kerja yang kecil. Kamu hanya bisa menaruh <strong>3 buku</strong> di atasnya.
          Saat kamu ingin membaca buku baru, tapi meja sudah penuh, buku mana yang akan kamu singkirkan?
        </p>
        <p className="text-slate-700 text-lg leading-relaxed">
          Pasti kamu akan menyingkirkan buku yang <strong>paling lama tidak kamu baca</strong> (Least Recently Used).
          Inilah konsep dasar dari <strong>LRU Cache</strong>.
        </p>
      </div>

      {/* Interactive Analogy */}
      <div ref={addToRefs} className="bg-indigo-50 rounded-xl p-8 shadow-lg border-2 border-indigo-200">
        <h3 className="text-2xl font-bold text-indigo-900 mb-6 flex items-center gap-2">
          <BookOpen className="text-indigo-600" size={28} />
          Analogi Tumpukan Buku
        </h3>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-indigo-800 mb-4">
              Coba klik salah satu buku di bawah ini. Buku yang kamu klik (baca) akan pindah ke posisi <strong>Paling Atas (MRU)</strong>.
              Buku di posisi paling bawah adalah kandidat yang akan dibuang jika ada buku baru masuk.
            </p>
            <div className="flex flex-col gap-2 bg-white/50 p-4 rounded-xl border-2 border-indigo-100 min-h-[200px]">
               <div className="text-xs font-bold text-green-600 mb-1">Posisi Paling Atas (Baru Saja Dipakai)</div>
               {books.map((book, idx) => (
                 <button
                   key={book.id}
                   onClick={() => accessBook(idx)}
                   className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm border border-indigo-100 hover:border-indigo-400 hover:shadow-md transition-all group text-left"
                 >
                   <span className="font-bold text-slate-700 group-hover:text-indigo-600">{book.title}</span>
                   <span className="text-xs text-slate-400">Klik untuk baca</span>
                 </button>
               ))}
               <div className="text-xs font-bold text-red-500 mt-1">Posisi Paling Bawah (Akan Dibuang)</div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-indigo-100">
            <h4 className="font-bold text-slate-800 mb-3">Aturan Main:</h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <Zap size={16} className="text-yellow-500 mt-1" />
                <span><strong>Akses (Get):</strong> Saat data diakses, dia jadi "paling baru" (pindah ke depan).</span>
              </li>
              <li className="flex items-start gap-2">
                <Zap size={16} className="text-green-500 mt-1" />
                <span><strong>Tambah (Put):</strong> Data baru selalu ditaruh di posisi "paling baru".</span>
              </li>
              <li className="flex items-start gap-2">
                <Trash2 size={16} className="text-red-500 mt-1" />
                <span><strong>Penuh (Evict):</strong> Jika kapasitas penuh, buang data yang ada di posisi "paling lama" (belakang).</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Technical Solution */}
      <div ref={addToRefs} className="bg-white rounded-xl p-8 shadow-lg border-2 border-slate-200">
        <h3 className="text-2xl font-bold text-slate-800 mb-6">Solusi Teknis: Hash Map + Doubly Linked List</h3>
        
        <div className="space-y-6">
          <p className="text-slate-700">
            Untuk membuat operasi <code>get</code> dan <code>put</code> berjalan secepat kilat (<strong>O(1)</strong>), kita butuh dua struktur data yang bekerja sama:
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-100 hover:scale-105 transition-transform duration-300">
              <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
                1. Hash Map (Kamus)
              </h4>
              <p className="text-blue-700 text-sm">
                Berfungsi untuk <strong>mencari lokasi buku</strong> secara instan. Tanpa ini, kita harus mencari satu per satu (O(N)).
                <br/><br/>
                <em>"Dimana buku Harry Potter?" &rarr; "Di Rak 3" (Langsung ketemu!)</em>
              </p>
            </div>

            <div className="bg-purple-50 p-6 rounded-xl border-2 border-purple-100 hover:scale-105 transition-transform duration-300">
              <h4 className="font-bold text-purple-800 mb-2 flex items-center gap-2">
                2. Doubly Linked List (Rantai)
              </h4>
              <p className="text-purple-700 text-sm">
                Berfungsi untuk <strong>mengatur urutan</strong>. Kita bisa mencabut buku dari tengah tumpukan dan menaruhnya di atas dengan sangat cepat.
                <br/><br/>
                <em>"Pindahkan buku ini ke paling atas" (Tinggal ubah sambungan rantainya)</em>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
