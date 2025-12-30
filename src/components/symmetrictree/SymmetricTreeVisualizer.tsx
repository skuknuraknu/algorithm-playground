import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { CheckCircle2, XCircle, Binary } from 'lucide-react';

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
    
    // Cek apakah level ini semua null
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
  
  const tree = buildTree(nodes);
  const symmetric = isSymmetric(tree);
  const levels = getTreeLevels(tree);

  useEffect(() => {
    if (containerRef.current && levels.length > 0) {
      const treeNodes = containerRef.current.querySelectorAll('.tree-node');
      
      gsap.fromTo(
        treeNodes,
        {
          scale: 0,
          opacity: 0,
          y: -20
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: 'elastic.out(1, 0.5)',
          clearProps: 'transform'
        }
      );

      // Animate mirror indication lines
      const mirrorLines = containerRef.current.querySelectorAll('.mirror-line');
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
            duration: 0.6,
            delay: 0.5,
            ease: 'power2.out'
          }
        );
      }
    }
  }, [nodes, levels]);

  if (nodes.length === 0 || nodes[0] === null) {
    return (
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-12 shadow-xl border-2 border-slate-200">
        <div className="text-center text-slate-400">
          <Binary size={64} className="mx-auto mb-4 opacity-30" />
          <p className="text-lg">Masukkan nodes untuk melihat tree...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Result Header */}
      <div className={`bg-gradient-to-br rounded-2xl p-6 shadow-lg border-2 ${
        symmetric
          ? 'from-emerald-50 to-teal-50 border-emerald-100'
          : 'from-red-50 to-rose-50 border-red-100'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {symmetric ? (
              <CheckCircle2 className="text-emerald-600" size={32} />
            ) : (
              <XCircle className="text-red-600" size={32} />
            )}
            <div>
              <h3 className="text-xl font-bold text-slate-800">
                {symmetric ? 'Tree Symmetric ✓' : 'Tree Tidak Symmetric ✗'}
              </h3>
              <p className="text-sm text-slate-500">
                {symmetric 
                  ? 'Subtree kiri adalah mirror dari subtree kanan'
                  : 'Subtree kiri tidak mirror dengan subtree kanan'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tree Visualization */}
      <div ref={containerRef} className="bg-white rounded-2xl p-8 shadow-xl border-2 border-emerald-100 overflow-x-auto">
        <div className="min-w-max">
          <div className="flex flex-col items-center gap-8">
            {levels.map((level, levelIdx) => {
              const levelWidth = Math.pow(2, levelIdx);
              const gap = Math.max(4, 20 - levelIdx * 3);
              
              return (
                <div key={levelIdx} className="flex justify-center items-center" style={{ gap: `${gap}rem` }}>
                  {level.map((val, nodeIdx) => {
                    if (val === null) {
                      return (
                        <div key={nodeIdx} className="w-12 h-12 opacity-0"></div>
                      );
                    }
                    
                    // Tentukan apakah node ini adalah pasangan mirror
                    const midPoint = level.length / 2;
                    const mirrorIndex = level.length - 1 - nodeIdx;
                    const isMirrorPair = levelIdx > 0 && val === level[mirrorIndex] && nodeIdx !== mirrorIndex;
                    
                    return (
                      <div key={nodeIdx} className="relative tree-node">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-lg border-4 ${
                          isMirrorPair && symmetric
                            ? 'bg-gradient-to-br from-emerald-500 to-teal-600 border-emerald-200'
                            : 'bg-gradient-to-br from-emerald-400 to-teal-500 border-white'
                        }`}>
                          {val}
                        </div>
                        
                        {/* Mirror indicator */}
                        {isMirrorPair && symmetric && nodeIdx < midPoint && (
                          <div className="mirror-line absolute top-1/2 left-full w-full h-0.5 bg-gradient-to-r from-emerald-300 to-teal-300" 
                               style={{ width: `${gap * 16}px`, transformOrigin: 'left' }}>
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
        <div className="bg-white p-4 rounded-xl border-2 border-emerald-200 shadow-lg">
          <p className="text-xs text-slate-500 mb-1">Height</p>
          <p className="text-2xl font-bold text-emerald-600">{levels.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border-2 border-teal-200 shadow-lg">
          <p className="text-xs text-slate-500 mb-1">Total Nodes</p>
          <p className="text-2xl font-bold text-teal-600">
            {nodes.filter(n => n !== null).length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl border-2 border-cyan-200 shadow-lg">
          <p className="text-xs text-slate-500 mb-1">Max Level Nodes</p>
          <p className="text-2xl font-bold text-cyan-600">
            {Math.max(...levels.map(l => l.filter(n => n !== null).length))}
          </p>
        </div>
      </div>
    </div>
  );
}
