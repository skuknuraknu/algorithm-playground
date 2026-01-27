export default function MaxDepthTreeCodeEditor() {
  const code = `function maxDepth(root) {
    // Base case: node kosong
    if (root === null) {
        return 0;
    }
    
    // Recursive case: hitung depth kiri dan kanan
    const leftDepth = maxDepth(root.left);
    const rightDepth = maxDepth(root.right);
    
    // Return 1 (node saat ini) + max dari kedua subtree
    return 1 + Math.max(leftDepth, rightDepth);
}

// Iterative Solution menggunakan BFS (Level-Order Traversal)
function maxDepthBFS(root) {
    if (root === null) return 0;
    
    const queue = [root];
    let depth = 0;
    
    while (queue.length > 0) {
        const levelSize = queue.length;
        depth++; // Increment untuk setiap level
        
        // Process semua nodes di level ini
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }
    
    return depth;
}

// Iterative DFS menggunakan Stack
function maxDepthDFS(root) {
    if (root === null) return 0;
    
    const stack = [[root, 1]]; // [node, depth]
    let maxDepth = 0;
    
    while (stack.length > 0) {
        const [node, depth] = stack.pop();
        maxDepth = Math.max(maxDepth, depth);
        
        if (node.right) stack.push([node.right, depth + 1]);
        if (node.left) stack.push([node.left, depth + 1]);
    }
    
    return maxDepth;
}

// Contoh penggunaan
const tree = {
    val: 3,
    left: { val: 9, left: null, right: null },
    right: {
        val: 20,
        left: { val: 15, left: null, right: null },
        right: { val: 7, left: null, right: null }
    }
};

console.log(maxDepth(tree)); // 3
console.log(maxDepthBFS(tree)); // 3
console.log(maxDepthDFS(tree)); // 3`;

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 shadow-2xl border-2 border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">JavaScript Solution</h3>
          <p className="text-slate-400">Recursive DFS, BFS, & Iterative DFS approaches</p>
        </div>
        <div className="flex gap-2">
          <div className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-lg text-sm font-semibold border border-cyan-500/30">
            Time: O(n)
          </div>
          <div className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-lg text-sm font-semibold border border-blue-500/30">
            Space: O(h)
          </div>
        </div>
      </div>

      <div className="bg-slate-950 rounded-xl p-6 font-mono text-sm overflow-x-auto border border-slate-700 shadow-inner">
        <pre className="text-slate-300 leading-relaxed">
          <code>{code}</code>
        </pre>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-cyan-500 rounded-full"></span>
            Recursive DFS
          </h4>
          <p className="text-slate-400 text-sm leading-relaxed mb-2">
            Pendekatan paling simple dan intuitif
          </p>
          <p className="text-xs text-slate-500">
            Space: O(h) untuk call stack
          </p>
        </div>

        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            BFS (Level-Order)
          </h4>
          <p className="text-slate-400 text-sm leading-relaxed mb-2">
            Gunakan queue, hitung jumlah level
          </p>
          <p className="text-xs text-slate-500">
            Space: O(w) untuk queue (w = max width)
          </p>
        </div>

        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
            Iterative DFS
          </h4>
          <p className="text-slate-400 text-sm leading-relaxed mb-2">
            Stack dengan pasangan [node, depth]
          </p>
          <p className="text-xs text-slate-500">
            Space: O(h) untuk stack
          </p>
        </div>
      </div>

      <div className="mt-6 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl p-4 border border-cyan-500/20">
        <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
          <span className="text-xl">💡</span>
          Penjelasan Algoritma
        </h4>
        <ul className="space-y-2 text-slate-300 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-cyan-400 font-bold">1.</span>
            <span><strong>Recursive:</strong> Base case return 0 untuk null, rekursi untuk left & right</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-cyan-400 font-bold">2.</span>
            <span>Return 1 (current node) + max dari depth subtree kiri dan kanan</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-cyan-400 font-bold">3.</span>
            <span><strong>BFS:</strong> Gunakan queue untuk traversal level-by-level, increment depth per level</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-cyan-400 font-bold">4.</span>
            <span><strong>Iterative DFS:</strong> Stack menyimpan [node, currentDepth], track max depth</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-cyan-400 font-bold">5.</span>
            <span>Semua approach O(n) waktu karena mengunjungi setiap node tepat sekali</span>
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
            <span>Depth = jumlah nodes dari root ke leaf terjauh (bukan edges)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-violet-400">•</span>
            <span>Tree kosong memiliki depth 0, single node memiliki depth 1</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-violet-400">•</span>
            <span>Recursive approach paling mudah dipahami dan efisien</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-violet-400">•</span>
            <span>BFS bagus untuk tree yang sangat dalam (menghindari stack overflow)</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
