import { Lightbulb, Info, AlertTriangle, Briefcase, Zap, GitBranch } from 'lucide-react';

export default function BinaryTreeLevelOrderExplanation() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800 mb-3 flex items-center gap-2">
          🌳 Level Order Traversal: Antrian Sembako
        </h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Bayangkan kamu lagi bagiin sembako (atau thr lebaran). Kamu gak mungkin loncat dari orang pertama langsung ke cucu-cucunya yang ada di belakang kan? Kamu harus adil, bagiin dulu ke barisan paling depan, baru barisan kedua, dan seterusnya.
        </p>
        <p className="text-slate-700 leading-relaxed">
          Nah, di dunia computer science, ini namanya <span className="font-semibold text-indigo-600">Level Order Traversal</span>. Kita jalan-jalan di tree level demi level, dari kiri ke kanan. Gak boleh nyelip!
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border-2 border-indigo-100 shadow">
            <h3 className="text-xl font-bold text-indigo-800 mb-2 flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              Konsep Utama: The Queue (Antrian)
            </h3>
            <p className="text-slate-700 mb-4">
              Senjata rahasia kita adalah <strong>Queue (Antrian)</strong> FIFO (First-In-First-Out).
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-700 text-sm">
              <li>Masukin boss besar (Root) ke antrian.</li>
              <li>Selama antrian gak kosong, keluarin yang paling depan.</li>
              <li>Masukin anak buahnya (Kiri & Kanan) ke antrian.</li>
              <li>Ulangi sampe semua kebagian jatah.</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl border-2 border-slate-200 p-6 shadow-sm">
             <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" />
              Analisis Performa (Jujurly)
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div className="text-xs uppercase font-bold text-slate-500 mb-1">Time Complexity</div>
                <div className="text-lg font-mono font-bold text-indigo-600">O(N)</div>
                <p className="text-xs text-slate-600 mt-1">Karena kita harus salaman sama semua N node tepat satu kali.</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div className="text-xs uppercase font-bold text-slate-500 mb-1">Space Complexity</div>
                <div className="text-lg font-mono font-bold text-pink-600">O(N)</div>
                <p className="text-xs text-slate-600 mt-1">
                  Worst case: Level paling bawah isinya N/2 node. Antrian jadi penuh sesak!
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
           <div className="bg-white rounded-xl border-2 border-slate-200 p-6 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Briefcase className="w-24 h-24" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2 relative z-10">
              <Briefcase className="w-5 h-5 text-emerald-600" />
              Real World Use Cases (Bukan Teori Doang)
            </h3>
            <div className="space-y-4 relative z-10">
              <div className="flex gap-3">
                <div className="mt-1 bg-emerald-100 p-2 rounded-lg h-fit text-emerald-600">
                  <GitBranch className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-700 text-sm">1. Struktur Organisasi Perusahaan</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Mau nge-print daftar karyawan berdasarkan jenjang karir? Dari CEO, VP, Manager, sampe Intern? Pake Level Order Traversal!
                  </p>
                </div>
              </div>
               <div className="flex gap-3">
                <div className="mt-1 bg-blue-100 p-2 rounded-lg h-fit text-blue-600">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-700 text-sm">2. Network Broadcasting</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Router ngirim paket data ke tetangga terdekat dulu, baru diterusin ke yang jauh. Ini biar jaringan gak macet parah.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 rounded-xl border-2 border-amber-100 p-6 shadow-sm">
             <h3 className="text-lg font-bold text-amber-800 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Hati-hati (Jebakan Batman)
            </h3>
            <ul className="text-sm text-amber-800 space-y-2">
              <li className="flex gap-2">
                <span>🦇</span>
                <span><strong>Tree Kosong:</strong> Jangan lupa cek `if (!root) return []`. Kalau gak, errornya sakit tapi tak berdarah.</span>
              </li>
              <li className="flex gap-2">
                <span>🦇</span>
                <span><strong>Lupa Level Size:</strong> Pas lagi looping, simpen dulu `queue.length` buat misahin mana node level sekarang, mana node buat level besok.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
