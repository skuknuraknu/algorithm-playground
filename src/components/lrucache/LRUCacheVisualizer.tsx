import { useEffect, useRef } from 'react';
import { Database, ArrowRight, Clock, Trash2, Zap } from 'lucide-react';
import gsap from 'gsap';

interface CacheItem {
  key: number;
  value: number;
  timestamp: number;
}

interface LRUCacheVisualizerProps {
  cache: CacheItem[];
  capacity: number;
  lastOperation?: { type: 'put' | 'get'; key: number; value?: number; result?: number | null };
}

export default function LRUCacheVisualizer({ cache, capacity, lastOperation }: LRUCacheVisualizerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);
  const operationRef = useRef<HTMLDivElement>(null);

  itemsRef.current = [];

  // Entrance animation
  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline();

    // Header slide in
    if (headerRef.current) {
      tl.from(headerRef.current, {
        y: -30,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out'
      });
    }

    return () => {
      tl.kill();
    };
  }, []);

  // Animate operation badge
  useEffect(() => {
    if (operationRef.current && lastOperation) {
      gsap.fromTo(operationRef.current,
        { scale: 0, rotation: -180 },
        { scale: 1, rotation: 0, duration: 0.5, ease: 'back.out(1.7)' }
      );
    }
  }, [lastOperation]);

  // Animate cache items
  useEffect(() => {
    const targets = itemsRef.current.filter(Boolean);
    if (targets.length > 0) {
      targets.forEach((target, index) => {
        gsap.fromTo(target,
          {
            x: index === 0 ? -50 : 0,
            scale: 0.8,
            opacity: 0
          },
          {
            x: 0,
            scale: 1,
            opacity: 1,
            duration: 0.5,
            delay: index * 0.1,
            ease: 'back.out(1.7)'
          }
        );
      });

      // Highlight last operated item
      if (lastOperation) {
        const highlightedIndex = cache.findIndex(item => item.key === lastOperation.key);
        if (highlightedIndex !== -1 && targets[highlightedIndex]) {
          gsap.to(targets[highlightedIndex], {
            scale: 1.15,
            duration: 0.3,
            yoyo: true,
            repeat: 1,
            ease: 'power2.inOut'
          });
        }
      }
    }
  }, [cache, lastOperation]);

  // Empty slots for visualization
  const emptySlots = Math.max(0, capacity - cache.length);

  return (
    <div ref={containerRef} className="space-y-6">
      {/* Header */}
      <div ref={headerRef} className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-8 shadow-xl border-2 border-slate-700 text-white">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <Database className="text-indigo-400" size={40} />
            <div>
              <h3 className="text-2xl font-bold">LRU Cache Visualization</h3>
              <div className="flex items-center gap-4 mt-1">
                <p className="text-slate-400 text-sm">
                  Capacity: <span className="text-white font-semibold">{capacity}</span>
                </p>
                <span className="text-slate-500">•</span>
                <p className="text-slate-400 text-sm">
                  Used: <span className={`font-semibold ${cache.length === capacity ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {cache.length}/{capacity}
                  </span>
                </p>
                {cache.length === capacity && (
                  <span className="text-xs bg-amber-500/20 text-amber-300 px-2 py-1 rounded-full border border-amber-500/50">
                    FULL
                  </span>
                )}
              </div>
            </div>
          </div>

          {lastOperation && (
            <div
              ref={operationRef}
              className={`px-6 py-3 rounded-xl border-2 shadow-lg ${lastOperation.type === 'put'
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 border-blue-400 text-white'
                  : 'bg-gradient-to-r from-purple-500 to-pink-500 border-purple-400 text-white'
                }`}
            >
              <div className="text-xs font-semibold opacity-90">Last Operation</div>
              <div className="font-bold text-lg">
                {lastOperation.type.toUpperCase()}
              </div>
              <div className="font-mono text-sm">
                {lastOperation.type === 'put'
                  ? `(${lastOperation.key}, ${lastOperation.value})`
                  : `(${lastOperation.key}) → ${lastOperation.result !== -1 ? lastOperation.result : '-1'}`
                }
              </div>
            </div>
          )}
        </div>

        {/* LRU to MRU visualization */}
        <div className="relative min-h-[160px]">
          {/* Labels */}
          <div className="absolute -top-3 left-0 flex items-center gap-2 bg-red-500/20 px-3 py-1.5 rounded-lg border border-red-500/50">
            <Clock size={16} className="text-red-400" />
            <span className="text-xs font-bold text-red-400">LRU (Oldest)</span>
          </div>
          <div className="absolute -top-3 right-0 flex items-center gap-2 bg-green-500/20 px-3 py-1.5 rounded-lg border border-green-500/50">
            <span className="text-xs font-bold text-green-400">MRU (Newest)</span>
            <Zap size={16} className="text-green-400" />
          </div>

          {/* Cache Items Container */}
          <div className="mt-8 flex items-center gap-3 overflow-x-auto pb-4 custom-scrollbar">
            {cache.length === 0 && emptySlots === capacity ? (
              <div className="w-full text-center py-12">
                <div className="text-slate-500 text-4xl mb-3">📭</div>
                <div className="text-slate-500 italic">Cache is empty</div>
              </div>
            ) : (
              <>
                {/* Actual cache items */}
                {cache.map((item, index) => {
                  const isLRU = index === 0;
                  const isMRU = index === cache.length - 1;
                  const isHighlighted = lastOperation?.key === item.key;

                  return (
                    <div key={`${item.key}-${item.timestamp}`} className="flex items-center gap-3">
                      <div
                        ref={el => { if (el) itemsRef.current[index] = el }}
                        className={`relative flex-shrink-0 w-28 h-28 rounded-xl border-3 flex flex-col items-center justify-center transition-all duration-300 ${isHighlighted
                            ? lastOperation?.type === 'get'
                              ? 'bg-gradient-to-br from-purple-500 to-pink-500 border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.6)]'
                              : 'bg-gradient-to-br from-blue-500 to-cyan-500 border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.6)]'
                            : isLRU
                              ? 'bg-gradient-to-br from-red-900/50 to-red-800/50 border-red-600'
                              : isMRU
                                ? 'bg-gradient-to-br from-green-900/50 to-green-800/50 border-green-600'
                                : 'bg-slate-700 border-slate-600'
                          }`}
                      >
                        {/* Position badge */}
                        {(isLRU || isMRU || isHighlighted) && (
                          <div className={`absolute -top-2 -right-2 px-2 py-0.5 rounded-full text-[10px] font-bold ${isHighlighted
                              ? 'bg-yellow-400 text-yellow-900'
                              : isLRU
                                ? 'bg-red-500 text-white'
                                : 'bg-green-500 text-white'
                            }`}>
                            {isHighlighted ? '⚡' : isLRU ? 'LRU' : 'MRU'}
                          </div>
                        )}

                        <div className="text-xs text-slate-400 mb-1">Key</div>
                        <div className="text-3xl font-bold font-mono">{item.key}</div>
                        <div className="text-xs text-slate-400 mt-1">Value</div>
                        <div className="text-xl font-bold font-mono text-white">{item.value}</div>

                        {/* Will be evicted indicator */}
                        {isLRU && cache.length === capacity && (
                          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                            <div className="flex items-center gap-1 bg-red-500/20 px-2 py-1 rounded border border-red-500/50">
                              <Trash2 size={12} className="text-red-400" />
                              <span className="text-[10px] text-red-400 font-semibold">Next to evict</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Arrow connector */}
                      {index < cache.length - 1 && (
                        <ArrowRight className="text-slate-600 flex-shrink-0" size={24} />
                      )}
                    </div>
                  );
                })}

                {/* Empty slots */}
                {Array.from({ length: emptySlots }).map((_, index) => (
                  <div key={`empty-${index}`} className="flex items-center gap-3">
                    {cache.length > 0 && index === 0 && (
                      <ArrowRight className="text-slate-600 flex-shrink-0" size={24} />
                    )}
                    <div className="flex-shrink-0 w-28 h-28 rounded-xl border-2 border-dashed border-slate-700 bg-slate-800/30 flex items-center justify-center">
                      <div className="text-slate-600 text-sm text-center">
                        <div className="text-2xl mb-1">○</div>
                        <div>Empty</div>
                      </div>
                    </div>
                    {index < emptySlots - 1 && (
                      <ArrowRight className="text-slate-700 opacity-50 flex-shrink-0" size={24} />
                    )}
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* How It Works */}
        <div className="bg-white p-6 rounded-xl shadow-md border-2 border-slate-200">
          <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Zap className="text-indigo-600" size={20} />
            How It Works
          </h4>
          <ul className="space-y-3 text-sm text-slate-600">
            <li className="flex items-start gap-3 bg-green-50 p-3 rounded-lg border border-green-200">
              <span className="bg-green-500 text-white px-2 py-0.5 rounded text-xs font-bold mt-0.5 flex-shrink-0">GET</span>
              <span>
                Retrieve data. Accessed item moves to <strong className="text-green-700">MRU</strong> (right)
                because it was "just used".
              </span>
            </li>
            <li className="flex items-start gap-3 bg-blue-50 p-3 rounded-lg border border-blue-200">
              <span className="bg-blue-500 text-white px-2 py-0.5 rounded text-xs font-bold mt-0.5 flex-shrink-0">PUT</span>
              <span>
                Add new data at <strong className="text-blue-700">MRU</strong>.
                If key exists, update value and move to MRU.
              </span>
            </li>
            <li className="flex items-start gap-3 bg-red-50 p-3 rounded-lg border border-red-200">
              <span className="bg-red-500 text-white px-2 py-0.5 rounded text-xs font-bold mt-0.5 flex-shrink-0">EVICT</span>
              <span>
                When full, remove item at <strong className="text-red-700">LRU</strong> (left)
                before adding new data.
              </span>
            </li>
          </ul>
        </div>

        {/* Data Structure */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl border-2 border-indigo-200 shadow-md">
          <h4 className="font-bold text-indigo-900 mb-4 flex items-center gap-2">
            <Database className="text-indigo-600" size={20} />
            Data Structure
          </h4>
          <div className="space-y-3 text-sm">
            <div className="bg-white p-3 rounded-lg border border-indigo-200">
              <div className="font-semibold text-indigo-700 mb-1">Hash Map:</div>
              <p className="text-indigo-600">
                Fast O(1) access using key → node pointer mapping
              </p>
            </div>
            <div className="bg-white p-3 rounded-lg border border-indigo-200">
              <div className="font-semibold text-indigo-700 mb-1">Doubly Linked List:</div>
              <p className="text-indigo-600">
                O(1) reordering (delete & insert) to maintain LRU → MRU order
              </p>
            </div>
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-3 rounded-lg text-white">
              <div className="font-semibold mb-1">Result:</div>
              <p className="text-sm">
                Both <code className="bg-white/20 px-1 rounded">get()</code> and{' '}
                <code className="bg-white/20 px-1 rounded">put()</code> run in <strong>O(1)</strong>!
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1e293b;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #475569;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #64748b;
        }
      `}</style>
    </div>
  );
}
