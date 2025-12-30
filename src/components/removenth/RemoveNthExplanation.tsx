import { Lightbulb, ListChecks, Pointer, Clock } from 'lucide-react';

export default function RemoveNthExplanation() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200 space-y-3">
        <div className="flex items-center gap-3 text-slate-800">
          <Pointer className="text-blue-600" size={22} />
          <h2 className="text-2xl font-bold">Remove Nth Node From End of List</h2>
        </div>
        <p className="text-slate-600 leading-relaxed">
          Diberi singly linked list, hapus node ke-<strong>n</strong> dari belakang lalu kembalikan head. Kita akan pakai pendekatan
          satu-pass dengan dua pointer (fast & slow) plus <code>dummy</code> untuk mempermudah kasus hapus head.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-blue-50 border-2 border-blue-100 rounded-xl p-4 space-y-2">
          <div className="flex items-center gap-2 text-blue-800 font-semibold"><Lightbulb size={18} /> Inti strategi</div>
          <ul className="list-disc list-inside text-slate-700 space-y-1 text-sm">
            <li>Buat <code>dummy</code> menunjuk ke head (menangani kasus hapus head).</li>
            <li>Gerakkan <code>fast</code> maju <code>n+1</code> langkah → jarak antara <code>slow</code> dan <code>fast</code> = n.</li>
            <li>Geser keduanya bersama sampai <code>fast</code> mencapai null.</li>
            <li>Sekarang <code>slow</code> ada di node sebelum yang harus dihapus → sambungkan ke <code>slow.next.next</code>.</li>
          </ul>
        </div>

        <div className="bg-emerald-50 border-2 border-emerald-100 rounded-xl p-4 space-y-2">
          <div className="flex items-center gap-2 text-emerald-800 font-semibold"><ListChecks size={18} /> Contoh cepat</div>
          <div className="text-slate-700 text-sm space-y-1">
            <p>List: 1 → 2 → 3 → 4 → 5, n = 2</p>
            <p>Fast maju 3 langkah (n+1). Geser bareng sampai fast null.</p>
            <p>Slow berhenti di node 3, hapus node 4 → hasil: 1 → 2 → 3 → 5</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white border-2 border-slate-200 rounded-xl p-4 shadow-sm space-y-2">
          <div className="font-bold text-slate-800">Visualize</div>
          <p className="text-sm text-slate-600">Lihat node dan pointer <code>fast/slow</code>. Klik Animate untuk menyorot node yang dihapus dengan GSAP bounce.</p>
        </div>
        <div className="bg-white border-2 border-slate-200 rounded-xl p-4 shadow-sm space-y-2">
          <div className="font-bold text-slate-800">Simulate</div>
          <p className="text-sm text-slate-600">Step-by-step: advance fast n+1, lalu geser bersama. Play/Skip/Reset membantu mengikuti carry-over pointer.</p>
        </div>
        <div className="bg-white border-2 border-slate-200 rounded-xl p-4 shadow-sm space-y-2">
          <div className="font-bold text-slate-800">Practice</div>
          <p className="text-sm text-slate-600">Tulis solusi dua-pointer ber-one-pass. Test cases disiapkan sebagai ide uji.</p>
        </div>
      </div>

      <div className="bg-orange-50 border-2 border-orange-100 rounded-xl p-4 flex items-start gap-3 text-orange-900 text-sm">
        <Clock size={18} className="mt-0.5" />
        <div>
          <div className="font-semibold">Kompleksitas</div>
          <div>Waktu O(L) satu traversal; ruang O(1) karena pointer saja.</div>
        </div>
      </div>
    </div>
  );
}
