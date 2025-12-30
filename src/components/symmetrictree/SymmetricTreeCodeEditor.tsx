export default function SymmetricTreeCodeEditor() {
  const code = `function isSymmetric(root) {
    // Helper function untuk cek apakah dua tree adalah mirror
    function isMirror(left, right) {
        // Jika kedua node null, return true
        if (left === null && right === null) {
            return true;
        }
        
        // Jika salah satu null, return false
        if (left === null || right === null) {
            return false;
        }
        
        // Cek apakah nilai sama dan subtree mirror
        return (left.val === right.val) &&
               isMirror(left.left, right.right) &&
               isMirror(left.right, right.left);
    }
    
    // Tree kosong adalah symmetric
    if (root === null) {
        return true;
    }
    
    // Cek apakah left subtree adalah mirror dari right subtree
    return isMirror(root.left, root.right);
}

// Iterative Solution menggunakan Queue
function isSymmetricIterative(root) {
    if (root === null) return true;
    
    const queue = [root.left, root.right];
    
    while (queue.length > 0) {
        const left = queue.shift();
        const right = queue.shift();
        
        // Kedua null
        if (left === null && right === null) {
            continue;
        }
        
        // Salah satu null atau nilai berbeda
        if (left === null || right === null || left.val !== right.val) {
            return false;
        }
        
        // Tambahkan child nodes dalam urutan mirror
        queue.push(left.left, right.right);
        queue.push(left.right, right.left);
    }
    
    return true;
}

// Contoh penggunaan
const tree1 = {
    val: 1,
    left: { val: 2, left: { val: 3 }, right: { val: 4 } },
    right: { val: 2, left: { val: 4 }, right: { val: 3 } }
};

console.log(isSymmetric(tree1)); // true

const tree2 = {
    val: 1,
    left: { val: 2, right: { val: 3 } },
    right: { val: 2, right: { val: 3 } }
};

console.log(isSymmetric(tree2)); // false`;

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 shadow-2xl border-2 border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">JavaScript Solution</h3>
          <p className="text-slate-400">Recursive & Iterative approaches</p>
        </div>
        <div className="flex gap-2">
          <div className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-lg text-sm font-semibold border border-emerald-500/30">
            Time: O(n)
          </div>
          <div className="px-3 py-1 bg-teal-500/20 text-teal-300 rounded-lg text-sm font-semibold border border-teal-500/30">
            Space: O(h)
          </div>
        </div>
      </div>

      <div className="bg-slate-950 rounded-xl p-6 font-mono text-sm overflow-x-auto border border-slate-700 shadow-inner">
        <pre className="text-slate-300 leading-relaxed">
          <code>{code}</code>
        </pre>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
            Kompleksitas Waktu
          </h4>
          <p className="text-slate-400 text-sm leading-relaxed">
            O(n) - Mengunjungi setiap node dalam tree tepat satu kali
          </p>
        </div>

        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
            Kompleksitas Ruang
          </h4>
          <p className="text-slate-400 text-sm leading-relaxed">
            O(h) - Kedalaman rekursi sesuai tinggi tree h, atau ukuran queue untuk iterative
          </p>
        </div>
      </div>

      <div className="mt-6 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-xl p-4 border border-emerald-500/20">
        <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
          <span className="text-xl">💡</span>
          Penjelasan Algoritma
        </h4>
        <ul className="space-y-2 text-slate-300 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-emerald-400 font-bold">1.</span>
            <span><strong>Recursive:</strong> Bandingkan subtree kiri dan kanan secara rekursif</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-400 font-bold">2.</span>
            <span>Left child dari left subtree harus sama dengan right child dari right subtree</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-400 font-bold">3.</span>
            <span>Right child dari left subtree harus sama dengan left child dari right subtree</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-400 font-bold">4.</span>
            <span><strong>Iterative:</strong> Gunakan queue untuk menyimpan pasangan nodes yang perlu dibandingkan</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-400 font-bold">5.</span>
            <span>Kedua approach memiliki kompleksitas yang sama, pilih sesuai preferensi</span>
          </li>
        </ul>
      </div>

      <div className="mt-6 bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-xl p-4 border border-violet-500/20">
        <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
          <span className="text-xl">🎯</span>
          Key Points
        </h4>
        <ul className="space-y-2 text-slate-300 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-violet-400">•</span>
            <span>Tree symmetric berarti subtree kiri adalah mirror dari subtree kanan</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-violet-400">•</span>
            <span>Null nodes harus di posisi yang sama pada kedua subtree</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-violet-400">•</span>
            <span>Single node atau tree kosong dianggap symmetric</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
