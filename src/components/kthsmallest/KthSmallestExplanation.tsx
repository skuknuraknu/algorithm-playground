import { useState } from 'react';
import { HelpCircle, Sparkles, GitBranch, ListOrdered, Lightbulb } from 'lucide-react';

const faqs = [
  {
    q: 'Apa itu Kth Smallest Element in a BST?',
    a: 'Diberikan sebuah Binary Search Tree (BST) dan integer k, kita diminta menemukan elemen terkecil ke-k berdasarkan urutan inorder (kecil ke besar).',
  },
  {
    q: 'Mengapa inorder traversal penting?',
    a: 'Pada BST, inorder traversal (Left-Root-Right) menghasilkan urutan terurut menaik. Dengan menghitung kunjungan ke-k, kita bisa mendapatkan elemen terkecil ke-k.',
  },
  {
    q: 'Bagaimana pendekatan utamanya?',
    a: 'Gunakan DFS inorder. Simpan penghitung; ketika penghitung mencapai k, node saat ini adalah jawabannya. Bisa dilakukan rekursif atau iteratif dengan stack.',
  },
  {
    q: 'Kapan perlu optimasi?',
    a: 'Jika banyak query, kita bisa menyimpan ukuran subtree atau melakukan transformasi ke array terurut satu kali. Untuk single query, DFS biasa sudah cukup.',
  },
];

export default function KthSmallestExplanation() {
  const [open, setOpen] = useState(0);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-6 text-white shadow-xl flex items-center gap-4">
        <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
          <ListOrdered size={28} />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Kth Smallest Element in a BST</h2>
          <p className="text-indigo-100">Gunakan inorder traversal untuk menemukan elemen ke-k secara efisien.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-5 shadow-lg border-2 border-indigo-100">
          <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
            <GitBranch className="text-indigo-600" size={18} /> Kunci Konsep
          </h3>
          <ul className="list-disc list-inside space-y-2 text-slate-700 text-sm">
            <li>BST: kiri &lt; root &lt; kanan</li>
            <li>Inorder menghasilkan urutan sorted</li>
            <li>Hitung kunjungan inorder ke-k</li>
            <li>Iteratif: gunakan stack; Rekursif: gunakan counter</li>
          </ul>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-lg border-2 border-violet-100">
          <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
            <Lightbulb className="text-violet-600" size={18} /> Tips Cepat
          </h3>
          <ul className="list-disc list-inside space-y-2 text-slate-700 text-sm">
            <li>Berhenti lebih awal saat elemen ke-k ditemukan</li>
            <li>Validasi k: 1 ≤ k ≤ jumlah node</li>
            <li>Untuk banyak query, simpan ukuran subtree</li>
            <li>Iteratif stack menghindari deep recursion</li>
          </ul>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border-2 border-indigo-100 divide-y divide-slate-200">
        {faqs.map((item, idx) => (
          <button
            key={idx}
            onClick={() => setOpen(open === idx ? -1 : idx)}
            className="w-full text-left px-5 py-4 flex items-center gap-3 hover:bg-indigo-50 transition"
          >
            <div className={`p-2 rounded-xl ${open === idx ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-700'}`}>
              <HelpCircle size={18} />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-slate-800">{item.q}</p>
              {open === idx && (
                <p className="text-sm text-slate-600 mt-1 leading-relaxed">{item.a}</p>
              )}
            </div>
            <Sparkles className={`transition ${open === idx ? 'text-indigo-500 rotate-12' : 'text-slate-300'}`} size={18} />
          </button>
        ))}
      </div>
    </div>
  );
}
