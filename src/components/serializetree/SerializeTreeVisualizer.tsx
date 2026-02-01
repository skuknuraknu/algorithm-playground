import { useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import { GitBranch, ListEnd } from 'lucide-react';

type TreeNode = { val: number; left: TreeNode | null; right: TreeNode | null } | null;

type Props = {
  nodes: (number | null)[];
  onSerializedChange: (s: string) => void;
};

function buildTree(arr: (number | null)[]): TreeNode {
  if (!arr.length || arr[0] === null || arr[0] === undefined) return null;
  const root: TreeNode = { val: arr[0] as number, left: null, right: null };
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < arr.length) {
    const node = queue.shift();
    if (!node) break;
    if (arr[i] !== undefined) {
      if (arr[i] !== null) {
        node.left = { val: arr[i] as number, left: null, right: null };
        queue.push(node.left);
      }
      i++;
    }
    if (i < arr.length && arr[i] !== undefined) {
      if (arr[i] !== null) {
        node.right = { val: arr[i] as number, left: null, right: null };
        queue.push(node.right);
      }
      i++;
    }
  }
  return root;
}

function serializeBFS(root: TreeNode): string[] {
  if (!root) return ['null'];
  const res: string[] = [];
  const q: (TreeNode | null)[] = [root];
  while (q.length) {
    const node = q.shift() ?? null;
    if (node) {
      res.push(String(node.val));
      q.push(node.left, node.right);
    } else {
      res.push('null');
    }
  }
  while (res.length && res[res.length - 1] === 'null') res.pop();
  return res;
}

function layout(root: TreeNode) {
  const nodes: { id: number; val: number; x: number; y: number; depth: number; parentId: number | null }[] = [];
  let maxDepth = 0;
  function dfs(node: TreeNode, depth: number, pos: number, span: number, parentId: number | null) {
    if (!node) return;
    maxDepth = Math.max(maxDepth, depth);
    const id = nodes.length;
    const x = pos * 120;
    const y = depth * 90;
    nodes.push({ id, val: node.val as number, x, y, depth, parentId });
    dfs(node.left, depth + 1, pos * 2 - span, span / 2, id);
    dfs(node.right, depth + 1, pos * 2 + span, span / 2, id);
  }
  dfs(root, 0, 1, 1, null);
  return { nodes, maxDepth };
}

export default function SerializeTreeVisualizer({ nodes, onSerializedChange }: Props) {
  const tree = useMemo(() => buildTree(nodes), [nodes]);
  const serializedArr = useMemo(() => serializeBFS(tree), [tree]);
  const chipsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onSerializedChange(serializedArr.join(','));
  }, [serializedArr, onSerializedChange]);

  useEffect(() => {
    if (chipsRef.current) {
      gsap.fromTo(
        chipsRef.current.children,
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.05, duration: 0.5, ease: 'back.out(1.6)' }
      );
    }
  }, [serializedArr]);

  const { nodes: layoutNodes, maxDepth } = useMemo(() => layout(tree), [tree]);
  const width = 400 + maxDepth * 100;
  const height = (maxDepth + 1) * 110;

  return (
    <div className="space-y-5">
      <div className="bg-white border-2 border-indigo-100 rounded-2xl p-5 shadow-lg">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 rounded-xl bg-indigo-50 text-indigo-700"><GitBranch size={20} /></div>
          <div>
            <h3 className="text-xl font-bold text-slate-800">Visualisasi Serialize (BFS)</h3>
            <p className="text-sm text-slate-500">Traversal level-order dengan marker null, otomatis memangkas null di akhir.</p>
          </div>
        </div>

        <div className="overflow-auto">
          <svg width={width} height={height} className="min-w-full">
            {layoutNodes.map((n) => {
              const parent = layoutNodes.find((p) => p.id === n.parentId);
              return parent ? (
                <line
                  key={`line-${n.id}`}
                  x1={parent.x + 40}
                  y1={parent.y + 40}
                  x2={n.x + 40}
                  y2={n.y + 40}
                  stroke="#c7d2fe"
                  strokeWidth={3}
                />
              ) : null;
            })}
            {layoutNodes.map((n) => (
              <g key={n.id}>
                <circle cx={n.x + 40} cy={n.y + 40} r={26} fill="#eef2ff" stroke="#a5b4fc" strokeWidth={3} />
                <text x={n.x + 40} y={n.y + 46} textAnchor="middle" fontWeight="bold" fill="#312e81">
                  {n.val}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>

      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-5 text-white shadow-xl">
        <div className="flex items-center gap-2 mb-2">
          <ListEnd size={18} />
          <p className="font-semibold">Hasil serialize</p>
        </div>
        <div ref={chipsRef} className="flex flex-wrap gap-2">
          {serializedArr.map((v, i) => (
            <span key={i} className="px-3 py-1 rounded-lg bg-white/15 border border-white/30 text-sm font-semibold">
              {v}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
