import { Activity, Lightbulb, ShieldCheck, Workflow } from 'lucide-react';

export default function MaxPathSumExplanation() {
  const faqs = [
    {
      title: 'Apa yang dicari?',
      body: 'Path dengan jumlah nilai maksimum di binary tree. Path boleh mulai dan berakhir di node mana saja, tetapi harus menyambung (tidak boleh lompat).',
    },
    {
      title: 'Intuisi cepat',
      body: 'Gunakan DFS post-order: setiap node mengembalikan "gain" maksimum satu arah ke atas (node + max(0, leftGain, rightGain)). Global answer diupdate dengan node.val + max(0,leftGain) + max(0,rightGain).',
    },
    {
      title: 'Kenapa pakai max(0, gain)?',
      body: 'Jika cabang memberi nilai negatif, lebih baik tidak dipakai (anggap 0). Ini menjaga path tetap maksimal.',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white p-8 rounded-2xl shadow-xl">
        <div className="flex items-center gap-3 mb-3">
          <Activity size={28} />
          <h2 className="text-2xl font-bold">Binary Tree Maximum Path Sum</h2>
        </div>
        <p className="text-indigo-50 leading-relaxed">
          Kita hitung dua hal sekaligus: (1) gain maksimum yang bisa diberikan subtree ke parent, (2) jawaban global yang mungkin berhenti di node ini dengan memakai kedua anak. DFS post-order memudahkan karena kita sudah tahu nilai anak sebelum menghitung node.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {faqs.map((f) => (
          <div key={f.title} className="bg-white border-2 border-indigo-50 rounded-2xl p-5 shadow-sm">
            <p className="font-semibold text-slate-800 mb-2">{f.title}</p>
            <p className="text-slate-600 text-sm leading-relaxed">{f.body}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {[ 
          { title: 'Output', text: 'Integer maksimum dari semua path yang mungkin.' },
          { title: 'Waktu', text: 'O(n) — setiap node dihitung sekali.' },
          { title: 'Ruang', text: 'O(h) untuk stack DFS (h = tinggi tree).' },
        ].map((c) => (
          <div key={c.title} className="bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 rounded-2xl p-4 shadow-sm">
            <p className="text-sm font-semibold text-indigo-700 mb-1">{c.title}</p>
            <p className="text-slate-600 text-sm leading-relaxed">{c.text}</p>
          </div>
        ))}
      </div>

      <div className="bg-white border-2 border-emerald-100 rounded-2xl p-5 shadow-sm flex gap-3 items-start">
        <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl">
          <Lightbulb className="text-emerald-500" size={20} />
        </div>
        <div>
          <p className="font-semibold text-slate-800 mb-1">Formulasi</p>
          <p className="text-slate-600 text-sm leading-relaxed">
            gain(node) = node.val + max(0, max(gain(left), gain(right))). Global best = max(global best, node.val + max(0, gain(left)) + max(0, gain(right))).
          </p>
        </div>
      </div>

      <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5 shadow-sm flex gap-3 items-start">
        <div className="p-3 bg-white border border-indigo-200 rounded-xl">
          <ShieldCheck className="text-indigo-600" size={20} />
        </div>
        <div>
          <p className="font-semibold text-slate-800 mb-1">Edge case</p>
          <ul className="list-disc list-inside text-slate-600 text-sm leading-relaxed space-y-1">
            <li>Tree kosong (kembalikan 0 atau -∞ sesuai definisi; di sini asumsi minimal node ada satu).</li>
            <li>Semua nilai negatif: tetap bekerja karena kita tidak memaksa 0 saat menghitung jawaban global, hanya untuk gain.</li>
            <li>Rantai tunggal: hasilnya jadi maximum subarray sederhana.</li>
          </ul>
        </div>
      </div>

      <div className="bg-white border-2 border-purple-100 rounded-2xl p-5 shadow-sm flex gap-3 items-start">
        <div className="p-3 bg-purple-50 border border-purple-100 rounded-xl">
          <Workflow className="text-purple-600" size={20} />
        </div>
        <div>
          <p className="font-semibold text-slate-800 mb-1">Alur animasi</p>
          <p className="text-slate-600 text-sm leading-relaxed">Simulator akan menyorot subtree yang sedang dihitung, menampilkan gain kiri/kanan, dan memperbarui best path dengan GSAP.</p>
        </div>
      </div>
    </div>
  );
}
