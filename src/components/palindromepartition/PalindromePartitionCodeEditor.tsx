export default function PalindromePartitionCodeEditor() {
  const code = `function partition(s) {
    const result = [];
    
    // Helper function untuk cek palindrome
    function isPalindrome(str, left, right) {
        while (left < right) {
            if (str[left] !== str[right]) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }
    
    // Backtracking function
    function backtrack(start, currentPartition) {
        // Base case: sudah mencapai akhir string
        if (start === s.length) {
            result.push([...currentPartition]);
            return;
        }
        
        // Coba semua kemungkinan substring dari start
        for (let end = start; end < s.length; end++) {
            // Jika substring adalah palindrome
            if (isPalindrome(s, start, end)) {
                // Tambahkan ke partisi saat ini
                currentPartition.push(s.substring(start, end + 1));
                
                // Rekursi untuk sisa string
                backtrack(end + 1, currentPartition);
                
                // Backtrack: hapus substring yang baru ditambahkan
                currentPartition.pop();
            }
        }
    }
    
    backtrack(0, []);
    return result;
}

// Contoh penggunaan
console.log(partition("aab"));
// Output: [["a","a","b"],["aa","b"]]

console.log(partition("a"));
// Output: [["a"]]`;

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 shadow-2xl border-2 border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">JavaScript Solution</h3>
          <p className="text-slate-400">Backtracking dengan pengecekan palindrome</p>
        </div>
        <div className="flex gap-2">
          <div className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-lg text-sm font-semibold border border-purple-500/30">
            Time: O(n * 2^n)
          </div>
          <div className="px-3 py-1 bg-fuchsia-500/20 text-fuchsia-300 rounded-lg text-sm font-semibold border border-fuchsia-500/30">
            Space: O(n)
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
            <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
            Kompleksitas Waktu
          </h4>
          <p className="text-slate-400 text-sm leading-relaxed">
            O(n * 2^n) - Setiap karakter bisa menjadi titik pemisah atau tidak, dan kita perlu copy array untuk hasil
          </p>
        </div>

        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-fuchsia-500 rounded-full"></span>
            Kompleksitas Ruang
          </h4>
          <p className="text-slate-400 text-sm leading-relaxed">
            O(n) - Kedalaman rekursi maksimal n untuk stack call dan temporary partition
          </p>
        </div>
      </div>

      <div className="mt-6 bg-gradient-to-r from-purple-500/10 to-fuchsia-500/10 rounded-xl p-4 border border-purple-500/20">
        <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
          <span className="text-xl">💡</span>
          Penjelasan Algoritma
        </h4>
        <ul className="space-y-2 text-slate-300 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-purple-400 font-bold">1.</span>
            <span>Gunakan backtracking untuk mencoba semua kemungkinan partisi</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-400 font-bold">2.</span>
            <span>Untuk setiap posisi, cek apakah substring dari start ke end adalah palindrome</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-400 font-bold">3.</span>
            <span>Jika ya, tambahkan ke partisi saat ini dan rekursi untuk sisa string</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-400 font-bold">4.</span>
            <span>Backtrack dengan menghapus substring yang baru ditambahkan</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-400 font-bold">5.</span>
            <span>Ketika mencapai akhir string, tambahkan partisi ke hasil</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
