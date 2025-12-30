import { useEffect, useMemo, useState } from 'react';
import { Grid3x3, TrendingUp } from 'lucide-react';

interface SubsetsVisualizerProps {
  nums: number[];
}

function getAllSubsets(nums: number[]): number[][] {
  const result: number[][] = [];
  const n = nums.length;

  function backtrack(start: number, current: number[]) {
    result.push([...current]);
    for (let i = start; i < n; i++) {
      current.push(nums[i]);
      backtrack(i + 1, current);
      current.pop();
    }
  }

  backtrack(0, []);
  return result;
}

export default function SubsetsVisualizer({ nums }: SubsetsVisualizerProps) {
  const subsets = useMemo(() => getAllSubsets(nums), [nums]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(false);
    const timer = setTimeout(() => setMounted(true), 20);
    return () => clearTimeout(timer);
  }, [nums]);

  // Group subsets by size for better visualization
  const groupedBySize: Record<number, number[][]> = {};
  subsets.forEach(subset => {
    const size = subset.length;
    if (!groupedBySize[size]) groupedBySize[size] = [];
    groupedBySize[size].push(subset);
  });

  return (
    <div className="bg-gradient-to-br from-white via-violet-50 to-fuchsia-50 rounded-2xl p-8 shadow-xl border-2 border-violet-100 relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-violet-200 rounded-full blur-3xl opacity-20"></div>
      
      <div className="relative">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-violet-500 to-fuchsia-600 rounded-xl shadow-lg">
              <Grid3x3 className="text-white" size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                Semua Subset
              </h3>
              <p className="text-sm text-slate-500 mt-0.5">
                Power Set Visualization
              </p>
            </div>
          </div>
          
          <div className="flex gap-2 flex-wrap">
            <div className="px-4 py-2 bg-gradient-to-r from-violet-100 to-fuchsia-100 border-2 border-violet-200 rounded-xl font-semibold text-violet-700 shadow-sm flex items-center gap-2">
              <TrendingUp size={16} />
              2^{nums.length} = {subsets.length} subset
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {Object.entries(groupedBySize).map(([size, group]) => (
            <div
              key={size}
              className="bg-white p-4 rounded-xl border-2 border-violet-200 shadow-md hover:shadow-lg transition-all duration-300"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'scale(1)' : 'scale(0.9)',
                transitionDelay: `${parseInt(size) * 50}ms`
              }}
            >
              <div className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                {group.length}
              </div>
              <div className="text-xs text-slate-600 mt-1">
                Ukuran {size}
              </div>
            </div>
          ))}
        </div>

        {/* Grouped Subsets Display */}
        <div className="space-y-6">
          {Object.entries(groupedBySize).sort(([a], [b]) => parseInt(a) - parseInt(b)).map(([size, group]) => (
            <div key={size} className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="px-3 py-1 bg-gradient-to-r from-violet-500 to-fuchsia-600 text-white rounded-lg font-semibold text-sm shadow-md">
                  Ukuran {size}
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-violet-200 to-transparent"></div>
              </div>
              <div className="flex flex-wrap gap-3">
                {group.map((subset, idx) => {
                  const globalIdx = subsets.findIndex(s => 
                    s.length === subset.length && s.every((val, i) => val === subset[i])
                  );
                  return (
                    <div
                      key={idx}
                      className="group px-5 py-3 bg-white border-2 border-violet-200 rounded-xl font-mono text-slate-700 hover:border-violet-400 hover:bg-gradient-to-br hover:from-violet-50 hover:to-fuchsia-50 transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 cursor-pointer"
                      style={{
                        opacity: mounted ? 1 : 0,
                        transform: mounted ? 'translateY(0)' : 'translateY(10px)',
                        transitionDelay: `${globalIdx * 40}ms`
                      }}
                    >
                      <span className="text-sm font-semibold">
                        [{subset.join(', ')}]
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <style>{`
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
