import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, SkipForward, ArrowRight, Zap, Trash2, Plus } from 'lucide-react';
import gsap from 'gsap';
import { useLanguage } from '../../i18n';

interface LRUCacheSimulatorProps {
  capacity: number;
}

interface SimulationStep {
  message: string;
  cacheState: { key: number; value: number }[];
  highlightKey?: number;
  action: 'read' | 'write' | 'evict' | 'move' | 'idle' | 'update';
  details?: string;
}

export default function LRUCacheSimulator({ capacity }: LRUCacheSimulatorProps) {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [steps, setSteps] = useState<SimulationStep[]>([]);
  const [speed, setSpeed] = useState(2000);

  const containerRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);
  const cacheItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Pre-defined scenario for simulation
  const scenario = [
    { type: 'put', key: 1, value: 10 },
    { type: 'put', key: 2, value: 20 },
    { type: 'get', key: 1 },
    { type: 'put', key: 3, value: 30 },
    { type: 'get', key: 2 },
    { type: 'put', key: 4, value: 40 },
    { type: 'get', key: 1 },
    { type: 'get', key: 3 },
    { type: 'put', key: 5, value: 50 },
  ];

  // Entrance animation
  useEffect(() => {
    if (!containerRef.current) return;

    gsap.from(containerRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: 'power2.out'
    });
  }, []);

  // Generate simulation steps
  useEffect(() => {
    generateSteps();
  }, [capacity]);

  // Auto-play logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && currentStep < steps.length - 1) {
      timer = setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, speed);
    } else if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, steps.length, speed]);

  // Animate message change
  useEffect(() => {
    if (messageRef.current && steps[currentStep]) {
      gsap.fromTo(messageRef.current,
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.7)' }
      );
    }
  }, [currentStep, steps]);

  // Animate cache items
  useEffect(() => {
    if (!steps[currentStep]) return;

    const step = steps[currentStep];
    cacheItemsRef.current.forEach((item, index) => {
      if (!item) return;

      const cacheItem = step.cacheState[index];
      const isHighlighted = cacheItem && cacheItem.key === step.highlightKey;

      if (isHighlighted) {
        const tl = gsap.timeline();

        switch (step.action) {
          case 'evict':
            tl.to(item, {
              x: -100,
              opacity: 0,
              scale: 0.5,
              rotation: -90,
              duration: 0.6,
              ease: 'power2.in'
            });
            break;

          case 'write':
            tl.fromTo(item,
              { scale: 0, rotation: -180, opacity: 0 },
              { scale: 1, rotation: 0, opacity: 1, duration: 0.6, ease: 'elastic.out(1, 0.5)' }
            );
            break;

          case 'move':
            tl.to(item, {
              y: -10,
              duration: 0.3,
              yoyo: true,
              repeat: 1,
              ease: 'power2.inOut'
            });
            break;

          case 'read':
            tl.to(item, {
              scale: 1.2,
              duration: 0.3,
              yoyo: true,
              repeat: 1,
              ease: 'power2.inOut'
            });
            break;

          case 'update':
            tl.to(item, {
              rotateY: 180,
              duration: 0.3
            }).to(item, {
              rotateY: 360,
              duration: 0.3
            });
            break;
        }
      }
    });
  }, [currentStep, steps]);

  const generateSteps = () => {
    const newSteps: SimulationStep[] = [];
    let cache: { key: number; value: number }[] = [];

    newSteps.push({
      message: `🚀 Starting simulation with capacity = ${capacity}`,
      cacheState: [],
      action: 'idle',
      details: 'Cache is empty. Ready to receive operations.'
    });

    for (const op of scenario) {
      const currentCache = [...cache];

      if (op.type === 'put') {
        const existingIdx = currentCache.findIndex(item => item.key === op.key);

        if (existingIdx !== -1) {
          // Update existing
          newSteps.push({
            message: `PUT(${op.key}, ${op.value}): Key ${op.key} already exists`,
            cacheState: [...currentCache],
            highlightKey: op.key,
            action: 'update',
            details: `Updating value from ${currentCache[existingIdx].value} to ${op.value}`
          });

          currentCache.splice(existingIdx, 1);
          currentCache.push({ key: op.key, value: op.value! });

          newSteps.push({
            message: `PUT(${op.key}, ${op.value}): Moved to MRU position`,
            cacheState: [...currentCache],
            highlightKey: op.key,
            action: 'move',
            details: 'Item moved to the end (Most Recently Used)'
          });
        } else {
          // Insert new
          if (currentCache.length >= capacity) {
            const evicted = currentCache[0];
            newSteps.push({
              message: `PUT(${op.key}, ${op.value}): Cache is FULL! Evicting LRU`,
              cacheState: [...currentCache],
              highlightKey: evicted.key,
              action: 'evict',
              details: `Removing key ${evicted.key} (Least Recently Used)`
            });
            currentCache.shift();
          }

          currentCache.push({ key: op.key, value: op.value! });
          newSteps.push({
            message: `PUT(${op.key}, ${op.value}): Added to MRU position`,
            cacheState: [...currentCache],
            highlightKey: op.key,
            action: 'write',
            details: 'New item added at the end (Most Recently Used)'
          });
        }
      } else if (op.type === 'get') {
        const idx = currentCache.findIndex(item => item.key === op.key);

        if (idx !== -1) {
          const item = currentCache[idx];
          newSteps.push({
            message: `GET(${op.key}): Found! Value = ${item.value}`,
            cacheState: [...currentCache],
            highlightKey: op.key,
            action: 'read',
            details: `Key ${op.key} exists in cache, returning ${item.value}`
          });

          currentCache.splice(idx, 1);
          currentCache.push(item);

          newSteps.push({
            message: `GET(${op.key}): Moved to MRU position`,
            cacheState: [...currentCache],
            highlightKey: op.key,
            action: 'move',
            details: 'Accessed item moved to Most Recently Used position'
          });
        } else {
          newSteps.push({
            message: `GET(${op.key}): Not found! Returning -1`,
            cacheState: [...currentCache],
            action: 'read',
            details: `Key ${op.key} does not exist in cache`
          });
        }
      }
      cache = currentCache;
    }

    newSteps.push({
      message: '🎉 Simulation completed!',
      cacheState: cache,
      action: 'idle',
      details: 'All operations executed successfully'
    });

    setSteps(newSteps);
    setCurrentStep(0);
  };

  if (steps.length === 0) {
    return (
      <div className="text-center p-12 bg-slate-50 rounded-xl border-2 border-slate-200">
        <div className="text-4xl mb-3">⚙️</div>
        <div className="text-slate-500">Preparing simulation...</div>
      </div>
    );
  }

  const step = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div ref={containerRef} className="space-y-6">
      {/* Controls */}
      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <div className="flex items-center gap-4">
            <div className="text-sm font-semibold text-slate-600">
              {t.step} <span className="text-indigo-600 text-lg">{currentStep + 1}</span> / {steps.length}
            </div>
            <div className="h-6 w-px bg-slate-300" />
            <div className="text-sm text-slate-600">
              Capacity: <span className="font-bold text-slate-800">{capacity}</span>
            </div>
          </div>

          <div className="flex gap-2 items-center">
            <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
              <Zap size={14} className="text-amber-500" />
              <span className="text-xs text-slate-600 font-semibold">{t.speed}:</span>
              <select
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="bg-transparent text-xs font-semibold text-indigo-600 outline-none cursor-pointer"
              >
                <option value={3000}>0.5x</option>
                <option value={2000}>1x</option>
                <option value={1000}>2x</option>
                <option value={500}>4x</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            disabled={currentStep >= steps.length - 1}
            className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-95 ${isPlaying
                ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white'
                : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white'
              } disabled:from-slate-300 disabled:to-slate-400 disabled:cursor-not-allowed`}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            {isPlaying ? t.pause : t.play}
          </button>

          <button
            onClick={() => currentStep < steps.length - 1 && setCurrentStep(currentStep + 1)}
            disabled={currentStep >= steps.length - 1}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-5 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all disabled:from-slate-300 disabled:to-slate-400 disabled:cursor-not-allowed shadow-md active:scale-95"
          >
            <SkipForward size={20} />
          </button>

          <button
            onClick={() => { setCurrentStep(0); setIsPlaying(false); }}
            className="bg-gradient-to-r from-slate-600 to-slate-700 text-white px-5 py-3 rounded-lg font-semibold hover:from-slate-700 hover:to-slate-800 transition-all shadow-md active:scale-95"
          >
            <RotateCcw size={20} />
          </button>
        </div>

        <div className="relative w-full bg-slate-200 rounded-full h-3 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-500 relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-[shimmer_2s_infinite]" />
          </div>
        </div>
      </div>

      {/* Message Display */}
      <div
        ref={messageRef}
        className={`rounded-xl p-6 transition-all duration-300 border-2 shadow-lg ${step.action === 'evict' ? 'bg-gradient-to-r from-red-50 to-pink-50 border-red-300' :
            step.action === 'write' ? 'bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-300' :
              step.action === 'read' ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-300' :
                step.action === 'move' ? 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-300' :
                  step.action === 'update' ? 'bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-300' :
                    'bg-gradient-to-r from-slate-50 to-gray-50 border-slate-300'
          }`}
      >
        <div className="flex items-start gap-4">
          <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-2xl ${step.action === 'evict' ? 'bg-red-500 text-white' :
              step.action === 'write' ? 'bg-blue-500 text-white' :
                step.action === 'read' ? 'bg-green-500 text-white' :
                  step.action === 'move' ? 'bg-purple-500 text-white' :
                    step.action === 'update' ? 'bg-amber-500 text-white' :
                      'bg-slate-500 text-white'
            }`}>
            {step.action === 'evict' ? <Trash2 size={24} /> :
              step.action === 'write' ? <Plus size={24} /> :
                step.action === 'read' ? '👁️' :
                  step.action === 'move' ? '↗️' :
                    step.action === 'update' ? '🔄' : '💤'}
          </div>
          <div className="flex-1">
            <div className={`text-xl font-bold mb-2 ${step.action === 'evict' ? 'text-red-800' :
                step.action === 'write' ? 'text-blue-800' :
                  step.action === 'read' ? 'text-green-800' :
                    step.action === 'move' ? 'text-purple-800' :
                      step.action === 'update' ? 'text-amber-800' :
                        'text-slate-800'
              }`}>
              {step.message}
            </div>
            {step.details && (
              <div className="text-sm text-slate-600 bg-white/60 px-3 py-2 rounded-lg border border-slate-200">
                💡 {step.details}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cache Visualization */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-8 shadow-xl border-2 border-slate-700 text-white">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 bg-red-500/20 px-3 py-1.5 rounded-lg border border-red-500/50">
            <Trash2 size={16} className="text-red-400" />
            <span className="text-xs font-bold text-red-400">LRU (Will be evicted)</span>
          </div>
          <div className="flex items-center gap-2 bg-green-500/20 px-3 py-1.5 rounded-lg border border-green-500/50">
            <span className="text-xs font-bold text-green-400">MRU (Most recent)</span>
            <Zap size={16} className="text-green-400" />
          </div>
        </div>

        <div className="min-h-[180px] flex items-center justify-center">
          <div className="flex items-center gap-4 overflow-x-auto pb-4 w-full justify-center">
            {step.cacheState.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-slate-500 text-4xl mb-3">📭</div>
                <div className="text-slate-500 italic">Cache is empty</div>
              </div>
            ) : (
              step.cacheState.map((item, idx) => (
                <div key={`${item.key}-${idx}`} className="flex items-center gap-4">
                  <div
                    ref={el => cacheItemsRef.current[idx] = el}
                    className={`w-24 h-24 rounded-xl border-2 flex flex-col items-center justify-center transition-all duration-500 ${step.highlightKey === item.key
                        ? step.action === 'evict'
                          ? 'bg-red-900/50 border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.5)]'
                          : step.action === 'read'
                            ? 'bg-green-900/50 border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.5)]'
                            : step.action === 'update'
                              ? 'bg-amber-900/50 border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.5)]'
                              : 'bg-indigo-600 border-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.5)]'
                        : idx === 0
                          ? 'bg-slate-800 border-red-600/50'
                          : idx === step.cacheState.length - 1
                            ? 'bg-slate-800 border-green-600/50'
                            : 'bg-slate-800 border-slate-600'
                      }`}
                  >
                    <div className="text-xs text-slate-400">Key</div>
                    <div className="text-2xl font-bold font-mono">{item.key}</div>
                    <div className="text-xs text-slate-400 mt-1">Val: {item.value}</div>
                  </div>
                  {idx < step.cacheState.length - 1 && (
                    <ArrowRight className="text-slate-600 flex-shrink-0" size={20} />
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
