import { useMemo, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Activity, Zap } from 'lucide-react';

type TreeNode = { val: number; left: TreeNode | null; right: TreeNode | null } | null;

type Props = {
  nodes: (number | null)[];
};

function buildTree(arr: (number | null)[]): TreeNode {
  if (!arr.length || arr[0] === null || arr[0] === undefined) return null;
  const root: TreeNode = { val: arr[0] as number, left: null, right: null };
  const q: (TreeNode)[] = [root];
  let i = 1;
  while (q.length && i < arr.length) {
    const node = q.shift()!;
    if (arr[i] !== undefined) {
      if (arr[i] !== null) {
        node.left = { val: arr[i] as number, left: null, right: null };
        q.push(node.left);
      }
      i++;
    }
    if (i < arr.length && arr[i] !== undefined) {
      if (arr[i] !== null) {
        node.right = { val: arr[i] as number, left: null, right: null };
        q.push(node.right);
      }
      i++;
    }
  }
  return root;
}

function maxPath(root: TreeNode) {
  let best = -Infinity;
  let bestPath: number[] = [];
  function dfs(node: TreeNode): { gain: number; path: number[] } {
    if (!node) return { gain: 0, path: [] };
    const left = dfs(node.left);
    const right = dfs(node.right);
    const gainLeft = Math.max(0, left.gain);
    const gainRight = Math.max(0, right.gain);

    const currentSum = (node.val ?? 0) + gainLeft + gainRight;
    if (currentSum > best) {
      best = currentSum;
      const leftPath = gainLeft > 0 ? left.path : [];
      const rightPath = gainRight > 0 ? right.path : [];
      bestPath = [...leftPath, node.val ?? 0, ...rightPath];
    }
    const betterGainSide = gainLeft >= gainRight ? left : right;
    return {
      gain: (node.val ?? 0) + Math.max(gainLeft, gainRight),
      path: [...betterGainSide.path, node.val ?? 0],
    };
  }
  dfs(root);
  return { best, bestPath };
}

function layout(root: TreeNode) {
  const nodes: { id: number; val: number; x: number; y: number; parentId: number | null }[] = [];
  let maxDepth = 0;
  function dfs(node: TreeNode, depth: number, pos: number, span: number, parentId: number | null) {
    if (!node) return;
    maxDepth = Math.max(maxDepth, depth);
    const id = nodes.length;
    nodes.push({ id, val: node.val as number, x: pos * 120, y: depth * 100, parentId });
    dfs(node.left, depth + 1, pos * 2 - span, span / 2, id);
    dfs(node.right, depth + 1, pos * 2 + span, span / 2, id);
  }
  dfs(root, 0, 1, 1, null);
  return { nodes, maxDepth };
}

export default function MaxPathSumVisualizer({ nodes }: Props) {
  const tree = useMemo(() => buildTree(nodes), [nodes]);
  const { best, bestPath } = useMemo(() => maxPath(tree), [tree]);
  const { nodes: layoutNodes, maxDepth } = useMemo(() => layout(tree), [tree]);
  const chipRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (chipRef.current) {
      gsap.fromTo(
        chipRef.current.children,
        { opacity: 0, y: 8, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.06, duration: 0.5, ease: 'back.out(1.6)' }
      );
    }
    if (svgRef.current) {
      gsap.fromTo(
        svgRef.current.querySelectorAll('circle'),
        { scale: 0.7, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.03, duration: 0.4, ease: 'back.out(1.4)' }
      );
    }
  }, [bestPath]);

  const width = 420 + maxDepth * 120;
  const height = (maxDepth + 1) * 120;

  const bestSet = new Set(bestPath);

  return (
    <div className="space-y-5">
      <div className="bg-white border-2 border-indigo-100 rounded-2xl p-5 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-xl bg-indigo-50 text-indigo-700"><Activity size={20} /></div>
          <div>
            <h3 className="text-xl font-bold text-slate-800">Visualisasi Path Maksimum</h3>
            <p className="text-sm text-slate-500">Menyorot node yang membentuk path terbaik (boleh melewati root atau tidak).</p>
          </div>
        </div>

        <div className="overflow-auto">
          <svg ref={svgRef} width={width} height={height} className="min-w-full">
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
                <circle
                  cx={n.x + 40}
                  cy={n.y + 40}
                  r={28}
                  fill={bestSet.has(n.val) ? '#c7d2fe' : '#eef2ff'}
                  stroke={bestSet.has(n.val) ? '#7c3aed' : '#a5b4fc'}
                  strokeWidth={bestSet.has(n.val) ? 4 : 3}
                />
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
          <Zap size={18} />
          <p className="font-semibold">Path terbaik (sum = {best})</p>
        </div>
        <div ref={chipRef} className="flex flex-wrap gap-2">
          {bestPath.map((v, i) => (
            <span key={i} className="px-3 py-1 rounded-lg bg-white/15 border border-white/30 text-sm font-semibold">
              {v}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
