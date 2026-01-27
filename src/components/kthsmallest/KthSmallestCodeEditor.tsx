import { FileCode, ListOrdered, RefreshCcw, Zap } from 'lucide-react';
import { useMemo } from 'react';

const recursiveCode = `// Rekursif inorder - O(n), O(h) stack
function kthSmallest(root, k) {
  let count = k;
  let answer = null;

  function inorder(node) {
    if (!node || answer !== null) return;
    inorder(node.left);
    count--;
    if (count === 0) {
      answer = node.val;
      return;
    }
    inorder(node.right);
  }

  inorder(root);
  return answer;
}`;

const iterativeCode = `// Iteratif dengan stack - O(n), O(h)
function kthSmallest(root, k) {
  const stack = [];
  let current = root;
  let remaining = k;

  while (current || stack.length) {
    while (current) {
      stack.push(current);
      current = current.left;
    }
    current = stack.pop();
    remaining--;
    if (remaining === 0) return current.val;
    current = current.right;
  }
  return null;
}`;

export default function KthSmallestCodeEditor() {
  const snippets = useMemo(() => [
    {
      title: 'Rekursif inorder',
      code: recursiveCode,
      accent: 'from-indigo-500 to-violet-500'
    },
    {
      title: 'Iteratif dengan stack',
      code: iterativeCode,
      accent: 'from-emerald-500 to-teal-500'
    }
  ], []);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-700"><FileCode size={22} /></div>
        <div>
          <h3 className="text-xl font-bold text-slate-800">Kode Referensi</h3>
          <p className="text-sm text-slate-500">Dua pendekatan populer untuk mencari elemen ke-k terkecil</p>
        </div>
      </div>

      {snippets.map((snip) => (
        <div key={snip.title} className={`rounded-2xl border-2 border-slate-200 bg-gradient-to-br ${snip.accent} p-[1px] shadow-xl`}>
          <div className="bg-white rounded-[14px] p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-slate-800 font-semibold">
                <ListOrdered size={18} />
                {snip.title}
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Zap size={14} /> O(n)
                <RefreshCcw size={14} /> O(h)
              </div>
            </div>
            <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 text-sm overflow-x-auto whitespace-pre">{snip.code}</pre>
          </div>
        </div>
      ))}
    </div>
  );
}
