import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, SkipForward, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { useLanguage } from '../../i18n';

interface LRUCacheSimulatorProps {
  capacity: number;
}

interface SimulationStep {
  message: string;
  cacheState: { key: number; value: number }[];
  highlightKey?: number;
  action: 'read' | 'write' | 'evict' | 'move' | 'idle';
}

export default function LRUCacheSimulator({ capacity }: LRUCacheSimulatorProps) {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [steps, setSteps] = useState<SimulationStep[]>([]);
  
  const containerRef = useRef<HTMLDivElement>(null);

  // Pre-defined scenario for simulation
  const scenario = [
    { type: 'put', key: 1, value: 1 },
    { type: 'put', key: 2, value: 2 },
    { type: 'get', key: 1 },    // Returns 1, moves 1 to MRU
    { type: 'put', key: 3, value: 3 }, // Evicts 2 (LRU) if cap=2
    { type: 'get', key: 2 },    // Returns -1 (not found)
    { type: 'put', key: 4, value: 4 }, // Evicts 1 (LRU)
    { type: 'get', key: 1 },    // Returns -1
    { type: 'get', key: 3 },    // Returns 3
    { type: 'get', key: 4 },    // Returns 4
  ];

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, []);

  useEffect(() => {
    generateSteps();
  }, [capacity]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && currentStep < steps.length - 1) {
      timer = setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, 2000);
    } else if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, steps.length]);

  const generateSteps = () => {
    const newSteps: SimulationStep[] = [];
    // Simple array to simulate LRU: index 0 is LRU, last index is MRU
    let cache: { key: number; value: number }[] = [];

    newSteps.push({
      message: `Memulai simulasi dengan Kapasitas = ${capacity}`,
      cacheState: [],
      action: 'idle'
    });

    for (const op of scenario) {
      const currentCache = [...cache];

      if (op.type === 'put') {
        const existingIdx = currentCache.findIndex(item => item.key === op.key);
        
        if (existingIdx !== -1) {
          // Update existing
          newSteps.push({
            message: `PUT(${op.key}, ${op.value}): Key ${op.key} sudah ada. Mengupdate nilai...`,
            cacheState: [...currentCache],
            highlightKey: op.key,
            action: 'write'
          });
          
          currentCache.splice(existingIdx, 1);
          currentCache.push({ key: op.key, value: op.value! });
          
          newSteps.push({
            message: `PUT(${op.key}, ${op.value}): Memindahkan ${op.key} ke posisi MRU (Paling Baru).`,
            cacheState: [...currentCache],
            highlightKey: op.key,
            action: 'move'
          });
        } else {
          // Insert new
          if (currentCache.length >= capacity) {
            const evicted = currentCache[0];
            newSteps.push({
              message: `PUT(${op.key}, ${op.value}): Cache penuh! Membuang key ${evicted.key} (LRU/Paling Lama).`,
              cacheState: [...currentCache],
              highlightKey: evicted.key,
              action: 'evict'
            });
            currentCache.shift(); // Remove LRU
          }

          currentCache.push({ key: op.key, value: op.value! });
          newSteps.push({
            message: `PUT(${op.key}, ${op.value}): Menambahkan key ${op.key} baru ke posisi MRU.`,
            cacheState: [...currentCache],
            highlightKey: op.key,
            action: 'write'
          });
        }
      } else if (op.type === 'get') {
        const idx = currentCache.findIndex(item => item.key === op.key);
        
        if (idx !== -1) {
          const item = currentCache[idx];
          newSteps.push({
            message: `GET(${op.key}): Ditemukan key ${op.key} dengan nilai ${item.value}.`,
            cacheState: [...currentCache],
            highlightKey: op.key,
            action: 'read'
          });

          currentCache.splice(idx, 1);
          currentCache.push(item);

          newSteps.push({
            message: `GET(${op.key}): Memindahkan ${op.key} ke posisi MRU (Paling Baru).`,
            cacheState: [...currentCache],
            highlightKey: op.key,
            action: 'move'
          });
        } else {
          newSteps.push({
            message: `GET(${op.key}): Key ${op.key} tidak ditemukan (-1).`,
            cacheState: [...currentCache],
            action: 'read'
          });
        }
      }
      cache = currentCache;
    }

    newSteps.push({
      message: 'Simulasi selesai!',
      cacheState: cache,
      action: 'idle'
    });

    setSteps(newSteps);
    setCurrentStep(0);
  };

  if (steps.length === 0) {
    return <div className="text-center p-8 text-slate-500">Menyiapkan simulasi...</div>;
  }

  const step = steps[currentStep];

  return (
    <div ref={containerRef} className="space-y-6">
      {/* Controls */}
      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-semibold text-slate-600">
            {t.step} {currentStep + 1} / {steps.length}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 ${
                isPlaying
                  ? 'bg-orange-600 hover:bg-orange-700 text-white'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              {isPlaying ? t.pause : t.play}
            </button>
            <button
              onClick={() => currentStep < steps.length - 1 && setCurrentStep(currentStep + 1)}
              disabled={currentStep >= steps.length - 1}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
            >
              <SkipForward size={20} />
            </button>
            <button
              onClick={() => { setCurrentStep(0); setIsPlaying(false); }}
              className="bg-slate-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-slate-700 transition-colors"
            >
              <RotateCcw size={20} />
            </button>
          </div>
        </div>

        <div className="w-full bg-slate-200 rounded-full h-2">
          <div
            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Visualization */}
      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
        <div className="mb-8">
          <div className={`text-lg font-bold p-4 rounded-lg transition-colors duration-300 text-center ${
            step.action === 'evict' ? 'bg-red-50 text-red-800 border-2 border-red-300' :
            step.action === 'write' ? 'bg-blue-50 text-blue-800 border-2 border-blue-300' :
            step.action === 'read' ? 'bg-green-50 text-green-800 border-2 border-green-300' :
            step.action === 'move' ? 'bg-purple-50 text-purple-800 border-2 border-purple-300' :
            'bg-slate-50 text-slate-800 border-2 border-slate-300'
          }`}>
            {step.message}
          </div>
        </div>

        <div className="relative min-h-[160px] bg-slate-900 rounded-xl p-8 flex items-center justify-center overflow-hidden">
          {/* Labels */}
          <div className="absolute top-4 left-4 text-xs font-bold text-red-400">LRU (Lama)</div>
          <div className="absolute top-4 right-4 text-xs font-bold text-green-400">MRU (Baru)</div>

          <div className="flex items-center gap-4">
            {step.cacheState.length === 0 ? (
              <div className="text-slate-500 italic">Cache Kosong</div>
            ) : (
              step.cacheState.map((item, idx) => (
                <div key={`${item.key}-${idx}`} className="flex items-center">
                  <div 
                    className={`w-20 h-20 rounded-lg border-2 flex flex-col items-center justify-center transition-all duration-500 ${
                      step.highlightKey === item.key
                        ? step.action === 'evict' ? 'bg-red-900/50 border-red-500 scale-90 opacity-50' :
                          step.action === 'read' ? 'bg-green-900/50 border-green-500 scale-110' :
                          'bg-indigo-600 border-indigo-400 scale-110'
                        : 'bg-slate-800 border-slate-600'
                    }`}
                  >
                    <div className="text-xs text-slate-400">K: {item.key}</div>
                    <div className="text-xl font-bold text-white">{item.value}</div>
                  </div>
                  {idx < step.cacheState.length - 1 && (
                    <ArrowRight className="text-slate-600 mx-2" size={20} />
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
