import { useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import { ListOrdered, Target } from 'lucide-react';

interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

interface KthSmallestVisualizerProps {
  nodes: (number | null)[];
  k: number;
}

function buildTree(nodes: (number | null)[]): TreeNode | null {
  if (!nodes.length || nodes[0] === null || nodes[0] === undefined) return null;
  const root: TreeNode = { val: nodes[0] as number, left: null, right: null };
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < nodes.length) {
    const node = queue.shift()!;
    if (nodes[i] !== null && nodes[i] !== undefined) {
      node.left = { val: nodes[i] as number, left: null, right: null };
      queue.push(node.left);
    }
    i++;
    if (i < nodes.length && nodes[i] !== null && nodes[i] !== undefined) {
      node.right = { val: nodes[i] as number, left: null, right: null };
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function inorder(root: TreeNode | null, visit: (node: TreeNode) => void) {
  if (!root) return;
  inorder(root.left, visit);
  visit(root);
  inorder(root.right, visit);
}

export default function KthSmallestVisualizer({ nodes, k }: KthSmallestVisualizerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const inorderList = useMemo(() => {
    const tree = buildTree(nodes);
    const list: number[] = [];
    inorder(tree, (n) => list.push(n.val));
    return list;
  }, [nodes]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const circles = gsap.utils.toArray<SVGCircleElement>('circle.node');
      gsap.fromTo(
        circles,
        { scale: 0, opacity: 0, rotateY: -90 },
        { scale: 1, opacity: 1, rotateY: 0, duration: 0.7, stagger: 0.05, ease: 'elastic.out(1,0.6)' }
      );
      const pathNodes = circles.slice(0, k);
      gsap.to(pathNodes, {
        scale: 1.1,
        filter: 'drop-shadow(0 8px 12px rgba(79,70,229,0.35))',
        duration: 0.6,
        ease: 'back.out(1.7)',
        stagger: 0.08
      });
    }, containerRef);
    return () => ctx.revert();
  }, [k, nodes]);

  const tree = useMemo(() => buildTree(nodes), [nodes]);

  const levels: Array<TreeNode[]> = useMemo(() => {
    if (!tree) return [];
    const result: Array<TreeNode[]> = [];
    const queue: Array<{ node: TreeNode; level: number }> = [{ node: tree, level: 0 }];
    while (queue.length) {
      const { node, level } = queue.shift()!;
      if (!result[level]) result[level] = [];
      result[level].push(node);
      if (node.left) queue.push({ node: node.left, level: level + 1 });
      if (node.right) queue.push({ node: node.right, level: level + 1 });
    }
    return result;
  }, [tree]);

  const kthValue = inorderList[k - 1];

  // Calculate positions for simple layered layout
  const nodePositions = useMemo(() => {
    const positions = new Map<TreeNode, { x: number; y: number }>();
    const traverse = (node: TreeNode | null, depth: number, left: number, right: number) => {
      if (!node) return;
      const mid = (left + right) / 2;
      positions.set(node, { x: mid, y: depth * 120 });
      traverse(node.left, depth + 1, left, mid - 40);
      traverse(node.right, depth + 1, mid + 40, right);
    };
    traverse(tree, 0, 0, 800);
    return positions;
  }, [tree]);

  const renderEdges = () => {
    const edges: JSX.Element[] = [];
    if (!tree) return edges;
    const walk = (node: TreeNode | null) => {
      if (!node) return;
      const pos = nodePositions.get(node)!;
      if (node.left) {
        const lp = nodePositions.get(node.left)!;
        edges.push(
          <line key={`${node.val}-l`} x1={pos.x} y1={pos.y} x2={lp.x} y2={lp.y} stroke="#c7d2fe" strokeWidth={3} strokeLinecap="round" />
        );
      }
      if (node.right) {
        const rp = nodePositions.get(node.right)!;
        edges.push(
          <line key={`${node.val}-r`} x1={pos.x} y1={pos.y} x2={rp.x} y2={rp.y} stroke="#c7d2fe" strokeWidth={3} strokeLinecap="round" />
        );
      }
      walk(node.left);
      walk(node.right);
    };
    walk(tree);
    return edges;
  };

  const renderNodes = () => {
    if (!tree) return null;
    const visitedSet = new Set(inorderList.slice(0, k));
    const isTarget = (val: number) => val === kthValue;
    const items: JSX.Element[] = [];
    const walk = (node: TreeNode | null) => {
      if (!node) return;
      const pos = nodePositions.get(node)!;
      items.push(
        <g key={`${node.val}-${pos.x}-${pos.y}`}>
          <circle
            className="node"
            cx={pos.x}
            cy={pos.y}
            r={28}
            fill={isTarget(node.val) ? 'url(#gradTarget)' : visitedSet.has(node.val) ? 'url(#gradVisited)' : 'white'}
            stroke={isTarget(node.val) ? '#22c55e' : visitedSet.has(node.val) ? '#6366f1' : '#cbd5e1'}
            strokeWidth={4}
          />
          <text x={pos.x} y={pos.y + 4} textAnchor="middle" className="font-bold" fill={isTarget(node.val) ? '#0f172a' : '#0f172a'}>
            {node.val}
          </text>
        </g>
      );
      walk(node.left);
      walk(node.right);
    };
    walk(tree);
    return items;
  };

  return (
    <div ref={containerRef} className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-indigo-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-100 text-indigo-700 rounded-xl">
            <ListOrdered size={22} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800">Visualisasi BST & Inorder</h3>
            <p className="text-sm text-slate-500">Kunjungan inorder ke-{k} akan di-highlight.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-3 py-2 bg-indigo-50 rounded-lg border border-indigo-100 text-sm text-slate-700">
            Kunjungan inorder: {inorderList.join(', ') || '-'}
          </div>
          <div className="px-3 py-2 bg-emerald-50 rounded-lg border border-emerald-100 text-sm text-emerald-700 flex items-center gap-2">
            <Target size={16} /> kth = {kthValue ?? 'n/a'}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-indigo-50 to-violet-50 rounded-2xl p-4 shadow-inner border-2 border-indigo-100">
        <svg ref={svgRef} width="100%" height={(levels.length + 1) * 120} viewBox="-40 0 900 600" className="overflow-visible">
          <defs>
            <linearGradient id="gradVisited" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c7d2fe" />
              <stop offset="100%" stopColor="#a5b4fc" />
            </linearGradient>
            <linearGradient id="gradTarget" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#befae4" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>
          </defs>
          {renderEdges()}
          {renderNodes()}
        </svg>
      </div>
    </div>
  );
}
