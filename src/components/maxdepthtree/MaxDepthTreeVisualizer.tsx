import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { TreeDeciduous, TrendingUp } from 'lucide-react';

interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

interface MaxDepthTreeVisualizerProps {
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

function maxDepth(root: TreeNode | null): number {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
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

export default function MaxDepthTreeVisualizer({ nodes }: MaxDepthTreeVisualizerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const tree = buildTree(nodes);
  const depth = maxDepth(tree);
  const levels = getTreeLevels(tree);

  useEffect(() => {
    if (containerRef.current && levels.length > 0) {
      const treeNodes = containerRef.current.querySelectorAll('.tree-node');
      const depthBadge = containerRef.current.querySelector('.depth-badge');
      
      // Animate tree nodes
      gsap.fromTo(
        treeNodes,
        {
          scale: 0,
          opacity: 0,
          y: -30
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: {
            amount: 0.4,
            from: 'start'
          },
          ease: 'elastic.out(1, 0.6)',
          clearProps: 'transform'
        }
      );

      // Animate depth badge
      if (depthBadge) {
        gsap.fromTo(
          depthBadge,
          {
            scale: 0,
            rotation: -180
          },
          {
            scale: 1,
            rotation: 0,
            duration: 0.8,
            delay: 0.5,
            ease: 'back.out(1.7)'
          }
        );
      }

      // Animate level labels
      const levelLabels = containerRef.current.querySelectorAll('.level-label');
      gsap.fromTo(
        levelLabels,
        {
          x: -20,
          opacity: 0
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          delay: 0.3,
          ease: 'power2.out'
        }
      );
    }
  }, [nodes, levels]);

  if (nodes.length === 0 || nodes[0] === null) {
    return (
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-12 shadow-xl border-2 border-slate-200">
        <div className="text-center text-slate-400">
          <TreeDeciduous size={64} className="mx-auto mb-4 opacity-30" />
          <p className="text-lg">Masukkan nodes untuk melihat tree dan depth-nya...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Result Header */}
      <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6 shadow-lg border-2 border-cyan-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TrendingUp className="text-cyan-600" size={32} />
            <div>
              <h3 className="text-xl font-bold text-slate-800">Maximum Depth</h3>
              <p className="text-sm text-slate-500">
                Path terpanjang dari root ke leaf terjauh
              </p>
            </div>
          </div>
          <div className="depth-badge px-6 py-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl shadow-lg">
            <p className="text-sm text-cyan-100">Depth</p>
            <p className="text-4xl font-bold text-white">{depth}</p>
          </div>
        </div>
      </div>

      {/* Tree Visualization */}
      <div ref={containerRef} className="bg-white rounded-2xl p-8 shadow-xl border-2 border-cyan-100 overflow-x-auto">
        <div className="min-w-max">
          <div className="flex flex-col items-center gap-8">
            {levels.map((level, levelIdx) => {
              const gap = Math.max(4, 20 - levelIdx * 3);
              const isMaxDepthLevel = levelIdx === levels.length - 1;
              
              return (
                <div key={levelIdx} className="w-full">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="level-label px-3 py-1 bg-gradient-to-r from-cyan-100 to-blue-100 rounded-lg text-xs font-bold text-cyan-700 shadow-sm whitespace-nowrap">
                      Level {levelIdx + 1}
                    </div>
                    {isMaxDepthLevel && (
                      <div className="px-3 py-1 bg-gradient-to-r from-amber-100 to-orange-100 rounded-lg text-xs font-bold text-amber-700 shadow-sm animate-pulse">
                        🎯 Max Depth Here!
                      </div>
                    )}
                  </div>
                  <div className="flex justify-center items-center" style={{ gap: `${gap}rem` }}>
                    {level.map((val, nodeIdx) => {
                      if (val === null) {
                        return <div key={nodeIdx} className="w-12 h-12 opacity-0"></div>;
                      }
                      
                      return (
                        <div key={nodeIdx} className="tree-node relative">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-lg border-4 transition-all duration-300 ${
                            isMaxDepthLevel
                              ? 'bg-gradient-to-br from-amber-500 to-orange-600 border-amber-200 animate-pulse'
                              : 'bg-gradient-to-br from-cyan-400 to-blue-500 border-white'
                          }`}>
                            {val}
                          </div>
                          
                          {/* Depth indicator */}
                          <div className={`absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-bold whitespace-nowrap ${
                            isMaxDepthLevel ? 'text-amber-600' : 'text-cyan-600'
                          }`}>
                            d={levelIdx + 1}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tree Statistics */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border-2 border-cyan-200 shadow-lg">
          <p className="text-xs text-slate-500 mb-1">Max Depth</p>
          <p className="text-2xl font-bold text-cyan-600">{depth}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border-2 border-blue-200 shadow-lg">
          <p className="text-xs text-slate-500 mb-1">Total Levels</p>
          <p className="text-2xl font-bold text-blue-600">{levels.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border-2 border-sky-200 shadow-lg">
          <p className="text-xs text-slate-500 mb-1">Total Nodes</p>
          <p className="text-2xl font-bold text-sky-600">
            {nodes.filter(n => n !== null).length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl border-2 border-teal-200 shadow-lg">
          <p className="text-xs text-slate-500 mb-1">Leaves Count</p>
          <p className="text-2xl font-bold text-teal-600">
            {levels[levels.length - 1]?.filter(n => n !== null).length || 0}
          </p>
        </div>
      </div>
    </div>
  );
}
