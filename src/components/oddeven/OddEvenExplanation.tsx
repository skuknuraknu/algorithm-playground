import { Lightbulb, ListChecks, Rocket } from 'lucide-react';

export default function OddEvenExplanation() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200 space-y-3">
        <div className="flex items-center gap-3 text-slate-800">
          <Rocket className="text-indigo-600" size={22} />
          <h2 className="text-2xl font-bold">Odd Even Linked List</h2>
        </div>
        <p className="text-slate-600 leading-relaxed">
          Susun ulang linked list sehingga node ber-index ganjil muncul dulu, diikuti node ber-index genap (1-indexed). Harus in-place, stabil, dan O(1) extra space.
          Triknya: pisahkan dua rantai (odd & even), maju bareng, lalu sambungkan odd tail ke head even.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-indigo-50 border-2 border-indigo-100 rounded-xl p-4 space-y-2">
          <div className="flex items-center gap-2 text-indigo-800 font-semibold"><Lightbulb size={18} /> Inti strategi</div>
          <ul className="list-disc list-inside text-slate-700 space-y-1 text-sm">
            <li>Gunakan pointer <code>odd</code> mulai di head, <code>even</code> di head.next, dan simpan <code>evenHead</code>.</li>
            <li>Loop: sambungkan <code>odd.next = even.next</code>; maju <code>odd</code>. Lalu <code>even.next = odd.next</code>; maju <code>even</code>.</li>
            <li>Setelah loop, tempelkan <code>odd.next = evenHead</code>.</li>
          </ul>
        </div>
        <div className="bg-emerald-50 border-2 border-emerald-100 rounded-xl p-4 space-y-2">
          <div className="flex items-center gap-2 text-emerald-800 font-semibold"><ListChecks size={18} /> Contoh cepat</div>
          <div className="text-slate-700 text-sm space-y-1">
            <p>List: 1 → 2 → 3 → 4 → 5</p>
            <p>Odd: 1 → 3 → 5, Even: 2 → 4</p>
            <p>Gabung: 1 → 3 → 5 → 2 → 4</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white border-2 border-slate-200 rounded-xl p-4 shadow-sm space-y-2">
          <div className="font-bold text-slate-800">Visualize</div>
          <p className="text-sm text-slate-600">Animasi GSAP menyorot node ganjil lalu genap, kemudian menampilkan urutan akhir dengan bounce.</p>
        </div>
        <div className="bg-white border-2 border-slate-200 rounded-xl p-4 shadow-sm space-y-2">
          <div className="font-bold text-slate-800">Simulate</div>
          <p className="text-sm text-slate-600">Step-by-step odd/even pointer dan evenHead, dengan Play/Skip/Reset.</p>
        </div>
        <div className="bg-white border-2 border-slate-200 rounded-xl p-4 shadow-sm space-y-2">
          <div className="font-bold text-slate-800">Practice</div>
          <p className="text-sm text-slate-600">Tulis solusi satu-pass O(1) space. Test cases disiapkan sebagai ide uji.</p>
        </div>
      </div>

      <div className="bg-orange-50 border-2 border-orange-100 rounded-xl p-4 text-orange-900 text-sm">
        <div className="font-semibold">Kompleksitas</div>
        <div>Waktu O(L), ruang O(1) karena hanya pointer.</div>
      </div>
    </div>
  );
}
