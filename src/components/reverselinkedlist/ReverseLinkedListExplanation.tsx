import { ArrowDownUp, Pointer, GitMerge } from 'lucide-react';

export default function ReverseLinkedListExplanation() {
  return (
    <div className="space-y-6 bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-lg bg-indigo-50 border border-indigo-200">
          <ArrowDownUp className="text-indigo-600" size={28} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Reverse Linked List</h2>
          <p className="text-slate-600 mt-1">
            Balik arah pointer <code>next</code> untuk setiap node sehingga kepala dan ekor bertukar posisi.
            Kita lakukan secara <span className="font-semibold text-indigo-600">in-place</span> dengan tiga pointer sederhana.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg border-2 border-slate-200 bg-slate-50">
          <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
            <Pointer size={18} className="text-emerald-600" />
            Tiga Pointer
          </h4>
          <ul className="text-slate-600 text-sm space-y-1">
            <li><span className="font-semibold">prev</span>: node yang sudah dibalik.</li>
            <li><span className="font-semibold">curr</span>: node yang sedang diproses.</li>
            <li><span className="font-semibold">next</span>: simpan node setelah <code>curr</code> agar tidak hilang.</li>
          </ul>
        </div>

        <div className="p-4 rounded-lg border-2 border-slate-200 bg-slate-50">
          <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
            <GitMerge size={18} className="text-blue-600" />
            Langkah Ringkas
          </h4>
          <ol className="text-slate-600 text-sm space-y-1 list-decimal list-inside">
            <li>Simpan <code>next = curr.next</code>.</li>
            <li>Balikkan pointer <code>curr.next = prev</code>.</li>
            <li>Geser <code>prev = curr</code> dan <code>curr = next</code>.</li>
            <li>Ulangi sampai <code>curr</code> habis, lalu <code>prev</code> menjadi kepala baru.</li>
          </ol>
        </div>

        <div className="p-4 rounded-lg border-2 border-slate-200 bg-slate-50">
          <h4 className="font-semibold text-slate-800 mb-2">Kompleksitas</h4>
          <p className="text-slate-600 text-sm">
            Waktu <span className="font-semibold">O(n)</span> (sekali lewat), ruang tambahan <span className="font-semibold">O(1)</span> karena kita hanya memakai tiga pointer.
          </p>
        </div>
      </div>

      <div className="p-4 rounded-lg bg-indigo-50 border-2 border-indigo-200 text-slate-800">
        Tip: Visualisasi di tab <span className="font-semibold">Visualize</span> menunjukkan hasil akhir, sedangkan tab
        <span className="font-semibold"> Simulate</span> memutar langkah pointer satu per satu.
      </div>
    </div>
  );
}
