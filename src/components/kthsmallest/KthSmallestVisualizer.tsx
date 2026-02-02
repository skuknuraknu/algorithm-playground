import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ListOrdered, Target, Play, Sparkles } from 'lucide-react';

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
  const [isAnimating, setIsAnimating] = useState(false);

  const inorderList = useMemo(() => {
    const tree = buildTree(nodes);
    const list: number[] = [];
    inorder(tree, (n) => list.push(n.val));
    return list;
  }, [nodes]);

  const tree = useMemo(() => buildTree(nodes), [nodes]);
  const kthValue = inorderList[k - 1];

  // Calculate positions for tree layout
  const nodePositions = useMemo(() => {
    const positions = new Map<TreeNode, { x: number; y: number }>();
    const traverse = (node: TreeNode | null, depth: number, left: number, right: number) => {
      if (!node) return;
      const mid = (left + right) / 2;
      positions.set(node, { x: mid, y: depth * 120 + 60 });
      traverse(node.left, depth + 1, left, mid - 40);
      traverse(node.right, depth + 1, mid + 40, right);
    };
    traverse(tree, 0, 0, 800);
    return positions;
  }, [tree]);

  // Entrance animation
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(containerRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power2.out'
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Animate nodes on load or k change
  useEffect(() => {
    if (!svgRef.current) return;

    const circles = gsap.utils.toArray<SVGCircleElement>('circle.node');

    const ctx = gsap.context(() => {
      // Entrance animation
      gsap.fromTo(
        circles,
        { scale: 0, opacity: 0, rotation: -180 },
        { scale: 1, opacity: 1, rotation: 0, duration: 0.7, stagger: 0.07, ease: 'elastic.out(1,0.6)' }
      );
    }, svgRef);

    return () => ctx.revert();
  }, [nodes, k]);

  const handleAnimate = () => {
    if (isAnimating || !svgRef.current) return;
    setIsAnimating(true);

    const circles = gsap.utils.toArray<SVGElement>('circle.node');
    const texts = gsap.utils.toArray<SVGElement>('text.node-text');

    const tl = gsap.timeline({
      onComplete: () => setIsAnimating(false)
    });

    // Reset all nodes
    tl.to(circles, {
      scale: 1,
      filter: 'none',
      duration: 0.3
    });

    // Highlight path nodes sequentially
    const pathIndices = inorderList.slice(0, k);
    pathIndices.forEach((val, idx) => {
      const nodeIndex = circles.findIndex((c: any) => {
        const text = c.nextElementSibling;
        return text && text.textContent === String(val);
      });

      if (nodeIndex !== -1) {
        tl.to([circles[nodeIndex], texts[nodeIndex]], {
          scale: 1.15,
          filter: idx === k - 1 ? 'drop-shadow(0 0 15px rgba(34,197,94,0.8))' : 'drop-shadow(0 0 10px rgba(99,102,241,0.6))',
          duration: 0.4,
          ease: 'back.out(1.7)'
        }, `+=${idx === 0 ? 0 : 0.2}`);
      }
    });

    // Final celebration for kth element
    const kthIndex = circles.findIndex((c: any) => {
      const text = c.nextElementSibling;
      return text && text.textContent === String(kthValue);
    });

    if (kthIndex !== -1) {
      tl.to([circles[kthIndex], texts[kthIndex]], {
        scale: 1.3,
        rotation: 360,
        duration: 0.6,
        ease: 'back.out(1.7)'
      });

      tl.to([circles[kthIndex], texts[kthIndex]], {
        y: -10,
        yoyo: true,
        repeat: 2,
        duration: 0.2,
        ease: 'power2.inOut'
      });
    }
  };

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
            r={32}
            fill={isTarget(node.val) ? 'url(#gradTarget)' : visitedSet.has(node.val) ? 'url(#gradVisited)' : 'white'}
            stroke={isTarget(node.val) ? '#22c55e' : visitedSet.has(node.val) ? '#6366f1' : '#cbd5e1'}
            strokeWidth={isTarget(node.val) ? 5 : 3}
          />
          <text
            className="node-text font-bold text-lg"
            x={pos.x}
            y={pos.y + 5}
            textAnchor="middle"
            fill={isTarget(node.val) || visitedSet.has(node.val) ? '#0f172a' : '#64748b'}
          >
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

  const levels = useMemo(() => {
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

  return (
    <div ref={containerRef} className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-purple-200">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-violet-500 text-white rounded-xl">
              <ListOrdered size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-800">BST Visualization</h3>
              <p className="text-sm text-slate-600">Inorder traversal highlights path to Kth element</p>
            </div>
          </div>
          <button
            onClick={handleAnimate}
            disabled={isAnimating || !tree}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold shadow-md transition-all ${isAnimating || !tree
              ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-600 to-violet-600 text-white hover:from-purple-700 hover:to-violet-700 hover:shadow-lg active:scale-95'
              }`}
          >
            {isAnimating ? (
              <>
                <Sparkles className="animate-spin" size={20} />
                Animating...
              </>
            ) : (
              <>
                <Play size={20} />
                Animate Path
              </>
            )}
          </button>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4">
            <div className="text-sm text-purple-700 font-semibold mb-2">Inorder Sequence:</div>
            <div className="flex flex-wrap gap-2">
              {inorderList.map((val, idx) => (
                <div
                  key={idx}
                  className={`px-3 py-1 rounded-lg font-bold text-sm ${idx === k - 1
                    ? 'bg-green-500 text-white ring-2 ring-green-300'
                    : idx < k
                      ? 'bg-purple-200 text-purple-800'
                      : 'bg-slate-200 text-slate-600'
                    }`}
                >
                  {val}
                </div>
              ))}
            </div>
          </div>
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 flex items-center justify-center">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Target className="text-green-600" size={20} />
                <span className="text-sm text-green-700 font-semibold">Kth Smallest (K={k})</span>
              </div>
              <div className="text-4xl font-bold text-green-600">{kthValue ?? 'N/A'}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50 rounded-2xl p-6 shadow-inner border-2 border-purple-200">
        <svg ref={svgRef} width="100%" height={(levels.length + 1) * 120 + 40} viewBox="-40 0 900 650" className="overflow-visible">
          <defs>
            <linearGradient id="gradVisited" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ddd6fe" />
              <stop offset="100%" stopColor="#c4b5fd" />
            </linearGradient>
            <linearGradient id="gradTarget" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#86efac" />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
          </defs>
          {renderEdges()}
          {renderNodes()}
        </svg>
      </div>
    </div>
  );
}
