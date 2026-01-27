import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check, Code2, Zap, GitBranch } from 'lucide-react';

export default function PathSumCodeEditor() {
  const [copied, setCopied] = useState(false);
  const [selectedApproach, setSelectedApproach] = useState<'recursive' | 'iterative'>('recursive');

  const recursiveCode = `/**
 * Path Sum - Recursive DFS Solution
 * 
 * Diberikan root binary tree dan integer targetSum,
 * return true jika tree memiliki path root-to-leaf
 * sehingga sum semua node values = targetSum.
 * 
 * Leaf adalah node tanpa children.
 */

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
  }
}

function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
  // Base case: tree kosong
  if (!root) return false;
  
  // Kurangi target dengan node value saat ini
  const remainingSum = targetSum - root.val;
  
  // Cek apakah ini leaf node
  if (!root.left && !root.right) {
    // Jika leaf dan remaining sum = 0, path valid!
    return remainingSum === 0;
  }
  
  // Rekursif cek left subtree ATAU right subtree
  // Return true jika salah satu menemukan path valid
  return hasPathSum(root.left, remainingSum) || 
         hasPathSum(root.right, remainingSum);
}

// Contoh penggunaan:
const tree = new TreeNode(
  5,
  new TreeNode(
    4,
    new TreeNode(11, new TreeNode(7), new TreeNode(2)),
    null
  ),
  new TreeNode(
    8,
    new TreeNode(13),
    new TreeNode(4, null, new TreeNode(1))
  )
);

console.log(hasPathSum(tree, 22));  // true (5→4→11→2)
console.log(hasPathSum(tree, 27));  // true (5→8→4→1 atau 5→4→11→7)
console.log(hasPathSum(tree, 100)); // false

/**
 * Time Complexity: O(n)
 * - Mengunjungi setiap node sekali dalam worst case
 * - n = jumlah nodes dalam tree
 * 
 * Space Complexity: O(h)
 * - h = height tree untuk recursion call stack
 * - Best case: O(log n) untuk balanced tree
 * - Worst case: O(n) untuk skewed tree
 */`;

  const iterativeCode = `/**
 * Path Sum - Iterative DFS Solution
 * 
 * Menggunakan stack untuk simulasi DFS tanpa recursion.
 * Menyimpan pasangan [node, remainingSum] di stack.
 */

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
  }
}

function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
  if (!root) return false;
  
  // Stack menyimpan [node, remaining sum]
  const stack: [TreeNode, number][] = [[root, targetSum - root.val]];
  
  while (stack.length > 0) {
    const [node, remaining] = stack.pop()!;
    
    // Cek jika leaf node
    if (!node.left && !node.right) {
      if (remaining === 0) {
        return true; // Path valid ditemukan!
      }
      continue;
    }
    
    // Push children ke stack dengan remaining sum ter-update
    if (node.right) {
      stack.push([node.right, remaining - node.right.val]);
    }
    
    if (node.left) {
      stack.push([node.left, remaining - node.left.val]);
    }
  }
  
  return false; // Tidak ada path valid
}

// Contoh penggunaan:
const tree = new TreeNode(
  5,
  new TreeNode(
    4,
    new TreeNode(11, new TreeNode(7), new TreeNode(2)),
    null
  ),
  new TreeNode(
    8,
    new TreeNode(13),
    new TreeNode(4, null, new TreeNode(1))
  )
);

console.log(hasPathSum(tree, 22));  // true
console.log(hasPathSum(tree, 27));  // true  
console.log(hasPathSum(tree, 100)); // false

/**
 * Time Complexity: O(n)
 * - Mengunjungi setiap node sekali
 * - n = jumlah nodes dalam tree
 * 
 * Space Complexity: O(h)
 * - h = height tree untuk ukuran maksimum stack
 * - Best case: O(log n) untuk balanced tree
 * - Worst case: O(n) untuk skewed tree
 * 
 * Catatan: Space complexity sama dengan recursive karena
 * explicit stack menggantikan implicit call stack.
 */`;

  const handleCopy = async () => {
    const code = selectedApproach === 'recursive' ? recursiveCode : iterativeCode;
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-600 rounded-2xl p-6 shadow-xl text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <Code2 size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Path Sum Implementation</h2>
              <p className="text-orange-100">Binary Tree DFS Problem</p>
            </div>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl transition-all duration-300 backdrop-blur-sm border-2 border-white/30 hover:scale-105 active:scale-95"
          >
            {copied ? <Check size={18} /> : <Copy size={18} />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>

        {/* Approach Selector */}
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedApproach('recursive')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
              selectedApproach === 'recursive'
                ? 'bg-white text-orange-600 shadow-lg'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <GitBranch size={18} />
            Recursive DFS
          </button>
          <button
            onClick={() => setSelectedApproach('iterative')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
              selectedApproach === 'iterative'
                ? 'bg-white text-orange-600 shadow-lg'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Zap size={18} />
            Iterative DFS
          </button>
        </div>
      </div>

      {/* Code Display */}
      <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-orange-200">
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <span className="px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-lg shadow-lg">
            TypeScript
          </span>
          <span className="px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-lg shadow-lg">
            O(n)
          </span>
        </div>
        <SyntaxHighlighter
          language="typescript"
          style={oneDark}
          customStyle={{
            margin: 0,
            padding: '2rem',
            fontSize: '0.9rem',
            lineHeight: '1.6',
            borderRadius: '1rem'
          }}
          showLineNumbers
        >
          {selectedApproach === 'recursive' ? recursiveCode : iterativeCode}
        </SyntaxHighlighter>
      </div>

      {/* Key Points */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Recursive Approach */}
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 border-2 border-orange-100 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <GitBranch className="text-orange-600" size={24} />
            <h3 className="font-bold text-slate-800 text-lg">Pendekatan Recursive</h3>
          </div>
          <ul className="space-y-3 text-sm text-slate-700">
            <li className="flex items-start gap-2">
              <span className="text-orange-600 font-bold mt-0.5">✓</span>
              <span><strong>Lebih Simpel:</strong> Kode lebih pendek dan mudah dipahami</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-600 font-bold mt-0.5">✓</span>
              <span><strong>Base Case:</strong> Tree kosong atau leaf node dengan remaining sum = 0</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-600 font-bold mt-0.5">✓</span>
              <span><strong>OR Logic:</strong> Return true jika left OR right subtree menemukan path</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-600 font-bold mt-0.5">✓</span>
              <span><strong>Natural Backtracking:</strong> Otomatis backtrack saat return dari rekursi</span>
            </li>
          </ul>
        </div>

        {/* Iterative Approach */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border-2 border-amber-100 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="text-amber-600" size={24} />
            <h3 className="font-bold text-slate-800 text-lg">Pendekatan Iterative</h3>
          </div>
          <ul className="space-y-3 text-sm text-slate-700">
            <li className="flex items-start gap-2">
              <span className="text-amber-600 font-bold mt-0.5">✓</span>
              <span><strong>Explicit Stack:</strong> Menggunakan array sebagai stack untuk DFS</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 font-bold mt-0.5">✓</span>
              <span><strong>Pair Storage:</strong> Setiap elemen stack: [node, remainingSum]</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 font-bold mt-0.5">✓</span>
              <span><strong>No Stack Overflow:</strong> Aman untuk tree yang sangat dalam</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 font-bold mt-0.5">✓</span>
              <span><strong>Early Return:</strong> Langsung return true saat path valid ditemukan</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Algorithm Explanation */}
      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-orange-100">
        <h3 className="font-bold text-slate-800 text-lg mb-4 flex items-center gap-2">
          <GitBranch className="text-orange-600" size={20} />
          Cara Kerja Algorithm
        </h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 text-white flex items-center justify-center font-bold flex-shrink-0 mt-1">
              1
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 mb-1">Inisialisasi & Base Case</h4>
              <p className="text-sm text-slate-600">
                Jika tree kosong (root = null), langsung return false. Tidak mungkin ada path di tree kosong.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 text-white flex items-center justify-center font-bold flex-shrink-0 mt-1">
              2
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 mb-1">Update Remaining Sum</h4>
              <p className="text-sm text-slate-600">
                Di setiap node, kurangi target sum dengan node value saat ini. Ini mengurangi problem ke subproblem yang lebih kecil.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 text-white flex items-center justify-center font-bold flex-shrink-0 mt-1">
              3
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 mb-1">Cek Leaf Node</h4>
              <p className="text-sm text-slate-600">
                Jika node adalah leaf (tidak punya children) DAN remaining sum = 0, maka path valid ditemukan! Return true.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 text-white flex items-center justify-center font-bold flex-shrink-0 mt-1">
              4
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 mb-1">Explore Subtrees</h4>
              <p className="text-sm text-slate-600">
                Jika bukan leaf, rekursif cek left subtree DAN right subtree. Return true jika salah satu menemukan path valid.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 text-white flex items-center justify-center font-bold flex-shrink-0 mt-1">
              5
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 mb-1">Backtracking Otomatis</h4>
              <p className="text-sm text-slate-600">
                Saat rekursi return, stack frame di-pop otomatis. Ini adalah backtracking implisit - kembali ke node parent dan coba jalur lain.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Complexity Analysis */}
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 shadow-lg border-2 border-slate-200">
        <h3 className="font-bold text-slate-800 text-lg mb-4">⚡ Complexity Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 border-2 border-orange-100">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">⏱️</span>
              <h4 className="font-semibold text-slate-800">Time Complexity</h4>
            </div>
            <div className="space-y-2 text-sm">
              <div className="font-mono font-bold text-orange-600 text-xl">O(n)</div>
              <p className="text-slate-600">
                Mengunjungi setiap node tepat sekali dalam worst case
              </p>
              <p className="text-slate-600">
                <strong>n</strong> = jumlah total nodes di tree
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border-2 border-purple-100">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">💾</span>
              <h4 className="font-semibold text-slate-800">Space Complexity</h4>
            </div>
            <div className="space-y-2 text-sm">
              <div className="font-mono font-bold text-purple-600 text-xl">O(h)</div>
              <p className="text-slate-600">
                <strong>h</strong> = height tree (untuk recursion stack atau explicit stack)
              </p>
              <p className="text-slate-600">
                Best: <strong>O(log n)</strong> (balanced) | Worst: <strong>O(n)</strong> (skewed)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Edge Cases */}
      <div className="bg-gradient-to-br from-rose-50 to-red-50 rounded-xl p-6 shadow-lg border-2 border-rose-100">
        <h3 className="font-bold text-slate-800 text-lg mb-4 flex items-center gap-2">
          <span className="text-2xl">⚠️</span>
          Edge Cases Penting
        </h3>
        <div className="space-y-3 text-sm text-slate-700">
          <div className="bg-white rounded-lg p-3 border-l-4 border-rose-400">
            <strong className="text-rose-600">Tree Kosong:</strong> root = null → return false
          </div>
          <div className="bg-white rounded-lg p-3 border-l-4 border-rose-400">
            <strong className="text-rose-600">Single Node:</strong> root tanpa children → cek apakah root.val = targetSum
          </div>
          <div className="bg-white rounded-lg p-3 border-l-4 border-rose-400">
            <strong className="text-rose-600">Negative Values:</strong> Node bisa punya nilai negatif, algorithm tetap bekerja
          </div>
          <div className="bg-white rounded-lg p-3 border-l-4 border-rose-400">
            <strong className="text-rose-600">Target Sum = 0:</strong> Cari path dengan sum = 0, bukan path kosong
          </div>
          <div className="bg-white rounded-lg p-3 border-l-4 border-rose-400">
            <strong className="text-rose-600">Multiple Paths:</strong> Return true jika minimal satu path valid ada
          </div>
        </div>
      </div>
    </div>
  );
}
