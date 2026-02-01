import { FileCode, RadioTower, Layers } from 'lucide-react';

const bfsCode = `// BFS (level-order) dengan marker "null"
const NULL = 'null';

function serialize(root) {
  if (!root) return NULL;
  const q = [root];
  const out = [];
  while (q.length) {
    const node = q.shift();
    if (node) {
      out.push(node.val);
      q.push(node.left, node.right);
    } else {
      out.push(NULL);
    }
  }
  // pangkas null di belakang
  while (out.length && out[out.length - 1] === NULL) out.pop();
  return out.join(',');
}

function deserialize(data) {
  if (!data || data === NULL) return null;
  const vals = data.split(',');
  const root = { val: Number(vals[0]), left: null, right: null };
  const q = [root];
  let i = 1;
  while (q.length && i < vals.length) {
    const node = q.shift();
    if (!node) continue;
    const left = vals[i++];
    const right = vals[i++];
    if (left !== undefined && left !== NULL) {
      node.left = { val: Number(left), left: null, right: null };
      q.push(node.left);
    }
    if (right !== undefined && right !== NULL) {
      node.right = { val: Number(right), left: null, right: null };
      q.push(node.right);
    }
  }
  return root;
}`;

const dfsCode = `// DFS Preorder dengan marker '#'
const MARK = '#';

function serialize(root) {
  const res = [];
  function dfs(node) {
    if (!node) {
      res.push(MARK);
      return;
    }
    res.push(node.val);
    dfs(node.left);
    dfs(node.right);
  }
  dfs(root);
  return res.join(',');
}

function deserialize(data) {
  const vals = data.split(',');
  let idx = 0;
  function build() {
    const val = vals[idx++];
    if (val === MARK) return null;
    const node = { val: Number(val), left: null, right: null };
    node.left = build();
    node.right = build();
    return node;
  }
  return build();
}`;

export default function SerializeTreeCodeEditor() {
  const snippets = [
    { title: 'BFS (Level-order)', code: bfsCode, accent: 'from-indigo-500 to-violet-500', notes: 'Pangkas null trailing agar string ringkas.' },
    { title: 'DFS Preorder', code: dfsCode, accent: 'from-emerald-500 to-teal-500', notes: 'Gunakan marker konsisten agar rekonstruksi tepat.' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-700"><FileCode size={22} /></div>
        <div>
          <h3 className="text-xl font-bold text-slate-800">Kode Referensi</h3>
          <p className="text-sm text-slate-500">Dua pendekatan populer: BFS level-order dan DFS preorder</p>
        </div>
      </div>

      {snippets.map((snip) => (
        <div key={snip.title} className={`rounded-2xl border-2 border-slate-200 bg-gradient-to-br ${snip.accent} p-[1px] shadow-xl`}>
          <div className="bg-white rounded-[14px] p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-slate-800 font-semibold">
                <RadioTower size={18} />
                {snip.title}
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Layers size={14} /> O(n) time, O(n) space
              </div>
            </div>
            <p className="text-xs text-slate-500 mb-2">{snip.notes}</p>
            <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 text-sm overflow-x-auto whitespace-pre">{snip.code}</pre>
          </div>
        </div>
      ))}
    </div>
  );
}
