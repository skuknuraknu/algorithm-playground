import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { GitBranch, CheckCircle2, XCircle } from 'lucide-react';

interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

interface PathSumVisualizerProps {
  nodes: (number | null)[];
  targetSum: number;
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

function findPathSum(root: TreeNode | null, targetSum: number): { hasPath: boolean; path: number[] } {
  const result: number[] = [];
  
  function dfs(node: TreeNode | null, remaining: number, currentPath: number[]): boolean {
    if (!node) return false;
    
    currentPath.push(node.val);
    
    // Check if leaf and sum matches
    if (!node.left && !node.right && remaining === node.val) {
      result.push(...currentPath);
      return true;
    }
    
    // Recursively check left and right
    if (dfs(node.left, remaining - node.val, currentPath)) return true;
    if (dfs(node.right, remaining - node.val, currentPath)) return true;
    
    currentPath.pop(); // Backtrack
    return false;
  }
  
  const hasPath = dfs(root, targetSum, []);
  return { hasPath, path: result };
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

export default function PathSumVisualizer({ nodes, targetSum }: PathSumVisualizerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const tree = buildTree(nodes);
  const { hasPath, path } = findPathSum(tree, targetSum);
  const levels = getTreeLevels(tree);

  useEffect(() => {
    if (containerRef.current && levels.length > 0) {
      const treeNodes = containerRef.current.querySelectorAll('.tree-node');
      const pathLine = containerRef.current.querySelector('.path-line');
      
      // Animate tree nodes
      gsap.fromTo(
        treeNodes,
        {
          scale: 0,
          opacity: 0,
          rotateY: -90
        },
        {
          scale: 1,
          opacity: 1,
          rotateY: 0,
          duration: 0.6,
          stagger: {
            amount: 0.5,
            from: 'start'
          },
          ease: 'back.out(1.7)',
          clearProps: 'transform'
        }
      );

      // Animate path line if exists
      if (pathLine && hasPath) {
        gsap.fromTo(
          pathLine,
          {
            strokeDashoffset: 1000
          },
          {
            strokeDashoffset: 0,
            duration: 1.5,
            delay: 0.8,
            ease: 'power2.out'
          }
        );
      }

      // Animate path nodes
      const pathNodes = containerRef.current.querySelectorAll('.path-node');
      if (pathNodes.length > 0) {
        gsap.fromTo(
          pathNodes,
          {
            scale: 1
          },
          {
            scale: 1.1,
            duration: 0.4,
            stagger: 0.15,
            delay: 1,
            ease: 'elastic.out(1, 0.5)',
            yoyo: true,
            repeat: 1
          }
        );
      }
    }
  }, [nodes, targetSum, levels, hasPath]);

  if (nodes.length === 0 || nodes[0] === null) {
    return (
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-12 shadow-xl border-2 border-slate-200">
        <div className="text-center text-slate-400">
          <GitBranch size={64} className="mx-auto mb-4 opacity-30" />
          <p className="text-lg">Masukkan nodes dan target sum untuk melihat hasil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Result Header */}
      <div className={`bg-gradient-to-br rounded-2xl p-6 shadow-lg border-2 ${
        hasPath
          ? 'from-emerald-50 to-green-50 border-emerald-100'
          : 'from-red-50 to-rose-50 border-red-100'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {hasPath ? (
              <CheckCircle2 className="text-emerald-600" size={32} />
            ) : (
              <XCircle className="text-red-600" size={32} />
            )}
            <div>
              <h3 className="text-xl font-bold text-slate-800">
                {hasPath ? 'Path Ditemukan! ✓' : 'Tidak Ada Path ✗'}
              </h3>
              <p className="text-sm text-slate-500">
                {hasPath 
                  ? `Path sum = ${targetSum}`
                  : `Tidak ada path root-to-leaf dengan sum = ${targetSum}`}
              </p>
            </div>
          </div>
          {hasPath && (
            <div className="px-4 py-2 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl shadow-lg">
              <p className="text-sm text-emerald-100">Target</p>
              <p className="text-2xl font-bold text-white">{targetSum}</p>
            </div>
          )}
        </div>
      </div>

      {/* Path Display */}
      {hasPath && path.length > 0 && (
        <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-6 border-2 border-emerald-200 shadow-lg">
          <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            🎯 Valid Path
          </h4>
          <div className="flex items-center gap-2 flex-wrap">
            {path.map((val, idx) => (
              <div key={idx} className="flex items-center">
                <div className="px-4 py-2 bg-gradient-to-br from-emerald-500 to-green-600 border-2 border-emerald-300 rounded-lg font-mono text-white font-bold shadow-lg">
                  {val}
                </div>
                {idx < path.length - 1 && (
                  <span className="mx-2 text-emerald-600 font-bold">→</span>
                )}
              </div>
            ))}
            <div className="ml-4 px-4 py-2 bg-white border-2 border-emerald-300 rounded-lg">
              <span className="text-xs text-slate-500">Sum = </span>
              <span className="text-lg font-bold text-emerald-600">
                {path.reduce((sum, val) => sum + val, 0)}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tree Visualization */}
      <div ref={containerRef} className="bg-white rounded-2xl p-8 shadow-xl border-2 border-orange-100 overflow-x-auto">
        <div className="min-w-max">
          <div className="flex flex-col items-center gap-8">
            {levels.map((level, levelIdx) => {
              const gap = Math.max(4, 20 - levelIdx * 3);
              let cumulativeSum = 0;
              
              return (
                <div key={levelIdx} className="w-full">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="px-3 py-1 bg-gradient-to-r from-orange-100 to-amber-100 rounded-lg text-xs font-bold text-orange-700 shadow-sm">
                      Level {levelIdx + 1}
                    </div>
                  </div>
                  <div className="flex justify-center items-center" style={{ gap: `${gap}rem` }}>
                    {level.map((val, nodeIdx) => {
                      if (val === null) {
                        return <div key={nodeIdx} className="w-12 h-12 opacity-0"></div>;
                      }
                      
                      const isInPath = hasPath && path.includes(val);
                      const pathIndex = path.indexOf(val);
                      if (isInPath && pathIndex >= 0) {
                        cumulativeSum = path.slice(0, pathIndex + 1).reduce((sum, v) => sum + v, 0);
                      }
                      
                      return (
                        <div key={nodeIdx} className={`tree-node relative ${isInPath ? 'path-node' : ''}`}>
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-lg border-4 transition-all duration-300 ${
                            isInPath
                              ? 'bg-gradient-to-br from-emerald-500 to-green-600 border-emerald-200 ring-4 ring-emerald-200'
                              : 'bg-gradient-to-br from-orange-400 to-amber-500 border-white'
                          }`}>
                            {val}
                          </div>
                          
                          {isInPath && (
                            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-bold text-emerald-600 whitespace-nowrap bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200">
                              Σ = {cumulativeSum}
                            </div>
                          )}
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

      {/* Statistics */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border-2 border-orange-200 shadow-lg">
          <p className="text-xs text-slate-500 mb-1">Target Sum</p>
          <p className="text-2xl font-bold text-orange-600">{targetSum}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border-2 border-amber-200 shadow-lg">
          <p className="text-xs text-slate-500 mb-1">Total Nodes</p>
          <p className="text-2xl font-bold text-amber-600">
            {nodes.filter(n => n !== null).length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl border-2 border-yellow-200 shadow-lg">
          <p className="text-xs text-slate-500 mb-1">Tree Height</p>
          <p className="text-2xl font-bold text-yellow-600">{levels.length}</p>
        </div>
        <div className={`bg-white p-4 rounded-xl border-2 shadow-lg ${
          hasPath ? 'border-emerald-200' : 'border-red-200'
        }`}>
          <p className="text-xs text-slate-500 mb-1">Path Found</p>
          <p className={`text-2xl font-bold ${hasPath ? 'text-emerald-600' : 'text-red-600'}`}>
            {hasPath ? 'Yes' : 'No'}
          </p>
        </div>
      </div>
    </div>
  );
}
