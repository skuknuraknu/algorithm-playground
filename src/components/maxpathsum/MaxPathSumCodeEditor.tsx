import { FileCode, Layers, Zap } from 'lucide-react';

const dfsCode = `// DFS post-order: kembalikan gain maksimum satu arah
function maxPathSum(root) {
  let best = -Infinity;

  function dfs(node) {
    if (!node) return 0;
    const leftGain = Math.max(0, dfs(node.left));
    const rightGain = Math.max(0, dfs(node.right));
    const localBest = node.val + leftGain + rightGain;
    best = Math.max(best, localBest);
    return node.val + Math.max(leftGain, rightGain);
  }

  dfs(root);
  return best;
}`;

export default function MaxPathSumCodeEditor() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-700"><FileCode size={22} /></div>
        <div>
          <h3 className="text-xl font-bold text-slate-800">Kode Referensi</h3>
          <p className="text-sm text-slate-500">DFS post-order dengan gain dan global best</p>
        </div>
      </div>

      <div className="rounded-2xl border-2 border-slate-200 bg-gradient-to-br from-indigo-500 to-violet-500 p-[1px] shadow-xl">
        <div className="bg-white rounded-[14px] p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-slate-800 font-semibold">
              <Zap size={18} /> DFS Gain
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Layers size={14} /> O(n) time, O(h) space
            </div>
          </div>
          <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 text-sm overflow-x-auto whitespace-pre">{dfsCode}</pre>
        </div>
      </div>
    </div>
  );
}
