import { Lightbulb, Sparkles, Binary, Workflow, ListTree, Info } from 'lucide-react';

export default function SerializeTreeExplanation() {
  const bullets = [
    {
      title: 'Apa masalahnya?',
      desc: 'Kita perlu menulis codec: fungsi serialize untuk mengubah binary tree menjadi string, dan deserialize untuk membangun kembali tree dari string tersebut.',
      icon: <Info size={18} className="text-indigo-600" />,
    },
    {
      title: 'Kenapa level-order populer?',
      desc: 'BFS (level-order) dengan placeholder "null" memudahkan membangun kembali hubungan parent-child secara berurutan.',
      icon: <ListTree size={18} className="text-indigo-600" />,
    },
    {
      title: 'Alternatif DFS (preorder)',
      desc: 'Preorder dengan penanda # atau null dan delimiter juga valid. Pastikan urutan traversal konsisten untuk encode/decode.',
      icon: <Workflow size={18} className="text-indigo-600" />,
    },
    {
      title: 'Edge case penting',
      desc: 'Tree kosong, node tunggal, rantai kiri/kanan panjang, dan nilai negatif atau bernilai besar harus tetap aman di string.',
      icon: <Sparkles size={18} className="text-indigo-600" />,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white p-8 rounded-2xl shadow-xl">
        <div className="flex items-center gap-3 mb-3">
          <Binary size={28} />
          <h2 className="text-2xl font-bold">Serialize &amp; Deserialize Binary Tree</h2>
        </div>
        <p className="text-indigo-50 leading-relaxed">
          Kita ingin representasi string yang stabil sehingga proses decode selalu menghasilkan tree yang sama. Gunakan placeholder untuk null, delimiter yang konsisten, dan traversal yang deterministik (BFS/DFS).
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {bullets.map((b) => (
          <div key={b.title} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex gap-3 items-start">
            <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-100">{b.icon}</div>
            <div>
              <p className="font-semibold text-slate-800">{b.title}</p>
              <p className="text-slate-600 text-sm leading-relaxed">{b.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {[
          {
            title: 'Complexity',
            text: 'Serialize & deserialize: O(n) waktu, O(n) ruang untuk output dan queue/stack.',
          },
          {
            title: 'Null marker',
            text: 'Gunakan string konsisten (mis. "null" atau "#") supaya parsing mudah dan aman untuk angka negatif.',
          },
          {
            title: 'Stabilitas',
            text: 'Traversal & delimiter harus sama di kedua fungsi agar struktur tree identik setelah decode.',
          },
        ].map((c) => (
          <div key={c.title} className="bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 rounded-2xl p-4 shadow-sm">
            <p className="text-sm font-semibold text-indigo-700 mb-1">{c.title}</p>
            <p className="text-slate-600 text-sm leading-relaxed">{c.text}</p>
          </div>
        ))}
      </div>

      <div className="bg-white border-2 border-indigo-100 rounded-2xl p-5 shadow-md flex gap-3 items-start">
        <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl">
          <Lightbulb className="text-amber-500" size={20} />
        </div>
        <div>
          <p className="font-semibold text-slate-800 mb-1">Intuisi cepat</p>
          <p className="text-slate-600 text-sm leading-relaxed">
            Serialize: lakukan traversal (BFS/DFS), tulis nilai node atau "null" lalu pisahkan dengan koma. Deserialize: parse token, bangun tree lagi dengan queue (untuk BFS) atau rekursi (untuk DFS) mengikuti urutan yang sama.
          </p>
        </div>
      </div>
    </div>
  );
}
