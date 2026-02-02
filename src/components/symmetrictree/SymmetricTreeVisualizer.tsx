import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { CheckCircle2, XCircle, Binary, Play, Sparkles } from 'lucide-react';

interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

interface SymmetricTreeVisualizerProps {
  nodes: (number | null)[];
}

function buildTree(nodes: (number | null)[]): TreeNode | null {
  if (nodes.length === 0 || nodes[0] === null) return null;

  const root: TreeNode = { val: nodes[0], left: null, right: null };
  const queue: TreeNode[] = [root];
  let i = 1;

  while (queue.length > 0 && i < nodes.length) {
    const node = queue.shift()!;

    if (i < nodes.length && nodes[i] !== null) {
      node.left = { val: nodes[i]!, left: null, right: null };
      queue.push(node.left);
    }
    i++;

    if (i < nodes.length && nodes[i] !== null) {
      node.right = { val: nodes[i]!, left: null, right: null };
      queue.push(node.right);
    }
    i++;
  }

  return root;
}

function isSymmetric(root: TreeNode | null): boolean {
  if (!root) return true;

  function isMirror(left: TreeNode | null, right: TreeNode | null): boolean {
    if (!left && !right) return true;
    if (!left || !right) return false;

    return left.val === right.val &&
      isMirror(left.left, right.right) &&
      isMirror(left.right, right.left);
  }

  return isMirror(root.left, root.right);
}

function getTreeLevels(root: TreeNode | null): (number | null)[][] {
  if (!root) return [];

  const levels: (number | null)[][] = [];
  const queue: (TreeNode | null)[] = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel: (number | null)[] = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      if (node) {
        currentLevel.push(node.val);
        queue.push(node.left);
        queue.push(node.right);
      } else {
        currentLevel.push(null);
      }
    }

    if (currentLevel.some(val => val !== null)) {
      levels.push(currentLevel);
    } else {
      break;
    }
  }

  return levels;
}

export default function SymmetricTreeVisualizer({ nodes }: SymmetricTreeVisualizerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const tree = buildTree(nodes);
  const symmetric = isSymmetric(tree);
  const levels = getTreeLevels(tree);

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

  // Animate nodes
  useEffect(() => {
    if (containerRef.current && levels.length > 0) {
      const treeNodes = containerRef.current.querySelectorAll('.tree-node');

      const ctx = gsap.context(() => {
        gsap.fromTo(
          treeNodes,
          {
            scale: 0,
            opacity: 0,
            rotationY: -180
          },
          {
            scale: 1,
            opacity: 1,
            rotationY: 0,
            duration: 0.7,
            stagger: 0.06,
            ease: 'elastic.out(1, 0.6)'
          }
        );

        // Animate mirror lines
        const mirrorLines = containerRef.current!.querySelectorAll('.mirror-line');
        if (mirrorLines.length > 0) {
          gsap.fromTo(
            mirrorLines,
            {
              scaleX: 0,
              opacity: 0
            },
            {
              scaleX: 1,
              opacity: 1,
              duration: 0.8,
              delay: 0.7,
              ease: 'power2.out'
            }
          );
        }
      }, containerRef);

      return () => ctx.revert();
    }
  }, [nodes, levels]);

  const handleAnimate = () => {
    if (isAnimating || !containerRef.current) return;
    setIsAnimating(true);

    const treeNodes = containerRef.current.querySelectorAll('.tree-node');

    const tl = gsap.timeline({
      onComplete: () => setIsAnimating(false)
    });

    // Pulse mirror line
    tl.to('.mirror-indicator', {
      scale: 1.2,
      opacity: 1,
      duration: 0.4,
      ease: 'power2.inOut'
    });

    // Highlight mirror pairs sequentially
    levels.forEach((level, levelIdx) => {
      if (levelIdx === 0) return; // Skip root

      const midPoint = level.length / 2;
      level.forEach((val, nodeIdx) => {
        if (val === null || nodeIdx >= midPoint) return;

        const mirrorIndex = level.length - 1 - nodeIdx;
        if (level[mirrorIndex] === val) {
          tl.to(`.node-${levelIdx}-${nodeIdx}, .node-${levelIdx}-${mirrorIndex}`, {
            scale: 1.2,
            boxShadow: symmetric ? '0 0 20px rgba(16,185,129,0.8)' : '0 0 20px rgba(239,68,68,0.8)',
            duration: 0.3
          }, `+=${levelIdx * 0.2}`);

          tl.to(`.node-${levelIdx}-${nodeIdx}, .node-${levelIdx}-${mirrorIndex}`, {
            scale: 1,
            duration: 0.3
          });
        }
      });
    });

    // Final celebration or rejection
    if (symmetric) {
      tl.to(treeNodes, {
        y: -10,
        yoyo: true,
        repeat: 1,
        duration: 0.2,
        stagger: 0.03
      });
    }
  };

  if (nodes.length === 0 || nodes[0] === null) {
    return (
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-12 shadow-xl border-2 border-slate-200">
        <div className="text-center text-slate-400">
          <Binary size={64} className="mx-auto mb-4 opacity-30" />
          <p className="text-lg">Add nodes to visualize the tree...</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="space-y-6">
      {/* Result Header */}
      <div className={`bg-gradient-to-br rounded-2xl p-6 shadow-xl border-2 ${symmetric
        ? 'from-green-50 to-emerald-50 border-green-200'
        : 'from-red-50 to-rose-50 border-red-200'
        }`}>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            {symmetric ? (
              <div className="p-3 bg-green-500 rounded-xl text-white">
                <CheckCircle2 size={32} />
              </div>
            ) : (
              <div className="p-3 bg-red-500 rounded-xl text-white">
                <XCircle size={32} />
              </div>
            )}
            <div>
              <h3 className="text-2xl font-bold text-slate-800">
                {symmetric ? '✅ Tree is Symmetric!' : '❌ Tree is NOT Symmetric'}
              </h3>
              <p className="text-sm text-slate-600">
                {symmetric
                  ? 'Left subtree is a mirror reflection of right subtree'
                  : 'Left and right subtrees are not mirror reflections'}
              </p>
            </div>
          </div>
          <button
            onClick={handleAnimate}
            disabled={isAnimating}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold shadow-md transition-all ${isAnimating
              ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white hover:from-teal-700 hover:to-emerald-700 hover:shadow-lg active:scale-95'
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
                Show Mirror Pairs
              </>
            )}
          </button>
        </div>
      </div>

      {/* Tree Visualization */}
      <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-teal-200 overflow-x-auto relative">
        {/* Mirror indicator line */}
        <div className="mirror-indicator absolute left-1/2 top-0 w-0.5 h-full bg-gradient-to-b from-transparent via-yellow-400 to-transparent opacity-40"></div>

        <div className="min-w-max relative">
          <div className="flex flex-col items-center gap-8">
            {levels.map((level, levelIdx) => {

              const gap = Math.max(4, 20 - levelIdx * 3);

              return (
                <div key={levelIdx} className="flex justify-center items-center relative" style={{ gap: `${gap}rem` }}>
                  {level.map((val, nodeIdx) => {
                    if (val === null) {
                      return (
                        <div key={nodeIdx} className="w-14 h-14 opacity-0"></div>
                      );
                    }

                    const midPoint = level.length / 2;
                    const mirrorIndex = level.length - 1 - nodeIdx;
                    const isMirrorPair = levelIdx > 0 && val === level[mirrorIndex] && nodeIdx !== mirrorIndex;

                    return (
                      <div key={nodeIdx} className={`relative tree-node node-${levelIdx}-${nodeIdx}`}>
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg border-4 transition-all ${isMirrorPair && symmetric
                          ? 'bg-gradient-to-br from-green-500 to-emerald-600 border-green-300 mirror-pair'
                          : 'bg-gradient-to-br from-teal-500 to-cyan-600 border-white'
                          }`}>
                          {val}
                        </div>

                        {/* Mirror indicator line for pairs */}
                        {isMirrorPair && symmetric && nodeIdx < midPoint && (
                          <div className="mirror-line absolute top-1/2 left-full h-0.5 bg-gradient-to-r from-green-400 via-yellow-400 to-green-400 shadow-lg"
                            style={{ width: `${gap * 16}px`, transformOrigin: 'left' }}>
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                              <Sparkles className="text-yellow-500" size={16} />
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tree Statistics */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border-2 border-teal-200 shadow-lg">
          <p className="text-xs text-slate-600 font-semibold mb-2">Tree Height</p>
          <p className="text-3xl font-bold text-teal-600">{levels.length}</p>
        </div>
        <div className="bg-white p-5 rounded-xl border-2 border-emerald-200 shadow-lg">
          <p className="text-xs text-slate-600 font-semibold mb-2">Total Nodes</p>
          <p className="text-3xl font-bold text-emerald-600">
            {nodes.filter(n => n !== null).length}
          </p>
        </div>
        <div className={`p-5 rounded-xl border-2 shadow-lg ${symmetric
          ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-300'
          : 'bg-gradient-to-br from-red-50 to-rose-50 border-red-300'
          }`}>
          <p className="text-xs text-slate-600 font-semibold mb-2">Symmetric?</p>
          <p className={`text-2xl font-bold ${symmetric ? 'text-green-600' : 'text-red-600'}`}>
            {symmetric ? 'YES ✓' : 'NO ✗'}
          </p>
        </div>
      </div>
    </div>
  );
}
