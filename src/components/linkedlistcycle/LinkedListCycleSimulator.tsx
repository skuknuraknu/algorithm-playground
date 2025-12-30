import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, ChevronRight, Flag } from 'lucide-react';
import gsap from 'gsap';
import { useLanguage } from '../../i18n';

interface LinkedListCycleSimulatorProps {
  problemState: {
    list: number[];
    pos: number;
  };
}

export default function LinkedListCycleSimulator({ problemState }: LinkedListCycleSimulatorProps) {
  const { t } = useLanguage();
  const { list, pos } = problemState;
  const [isPlaying, setIsPlaying] = useState(false);
  const [step, setStep] = useState(0);
  const [slow, setSlow] = useState(0);
  const [fast, setFast] = useState(0);
  const [message, setMessage] = useState('Siap memulai simulasi...');
  const [found, setFound] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<any>(null);

  // Reset simulation when input changes
  useEffect(() => {
    resetSimulation();
  }, [list, pos]);

  const resetSimulation = () => {
    setIsPlaying(false);
    setStep(0);
    setSlow(0);
    setFast(0);
    setMessage('Siap memulai simulasi...');
    setFound(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  // Simulation logic step
  const nextStep = () => {
    if (found) return;

    // Check if fast reached end (no cycle)
    // Need to handle the logic carefully based on current pointers
    
    // Current state before move
    const currentSlow = slow;
    const currentFast = fast;

    // Calculate next positions
    // Helper to get next index
    const getNext = (curr: number) => {
      if (curr === -1) return -1; // Already at end
      
      // If at last node
      if (curr === list.length - 1) {
        return pos; // Go to cycle start (pos) or -1 if no cycle
      }
      return curr + 1;
    };

    const nextSlow = getNext(currentSlow);
    
    // Fast moves 2 steps
    let nextFast = getNext(currentFast);
    if (nextFast !== -1) {
      nextFast = getNext(nextFast);
    }

    // Check termination conditions
    if (nextFast === -1 || (currentFast !== -1 && getNext(currentFast) === -1)) {
      // Fast reached end
      setSlow(nextSlow);
      setFast(-1); // Indicate end
      setMessage('Fast pointer mencapai ujung (null). Tidak ada cycle!');
      setFound(true);
      setIsPlaying(false);
      return;
    }

    // Move pointers
    setSlow(nextSlow);
    setFast(nextFast);
    setStep(s => s + 1);

    // Check collision
    if (nextSlow === nextFast && nextSlow !== -1) {
      setMessage(`Cycle terdeteksi! Slow dan Fast bertemu di node index ${nextSlow}.`);
      setFound(true);
      setIsPlaying(false);
      
      // Celebration animation
      if (containerRef.current) {
        gsap.fromTo('.collision-indicator', 
          { scale: 0, rotation: 0 },
          { scale: 1.5, rotation: 360, duration: 0.5, ease: 'back.out' }
        );
      }
    } else {
      setMessage(`Langkah ${step + 1}: Slow ke ${nextSlow}, Fast ke ${nextFast}`);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(nextStep, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isPlaying, step, slow, fast, found]);

  // Visualization coordinates (same logic as Visualizer)
  const getCoordinates = (index: number) => {
    if (index === -1) return { x: -50, y: -50 }; // Off screen

    const spacing = 60;
    const startX = 40;
    const startY = 100;

    if (pos === -1) {
      return { x: startX + index * spacing, y: startY };
    } else {
      if (index < pos) {
        return { x: startX + index * spacing, y: startY };
      } else {
        const cycleLen = list.length - pos;
        const radius = Math.max(50, cycleLen * 12);
        const cycleCenterX = startX + pos * spacing + radius;
        const cycleCenterY = startY;
        const angleStep = (2 * Math.PI) / cycleLen;
        const angle = Math.PI + (index - pos) * angleStep;
        return {
          x: cycleCenterX + radius * Math.cos(angle),
          y: cycleCenterY + radius * Math.sin(angle)
        };
      }
    }
  };

  return (
    <div ref={containerRef} className="space-y-4">
      <div className="bg-white p-4 rounded-xl shadow-md border border-slate-200">
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              disabled={found}
              className={`px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors ${
                found ? 'bg-slate-100 text-slate-400 cursor-not-allowed' :
                isPlaying ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              {isPlaying ? t.pause : t.play}
            </button>
            <button
              onClick={nextStep}
              disabled={isPlaying || found}
              className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-semibold hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <ChevronRight size={18} />
              Langkah
            </button>
            <button
              onClick={resetSimulation}
              className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-semibold hover:bg-slate-200 flex items-center gap-2"
            >
              <RotateCcw size={18} />
              Reset
            </button>
          </div>
          <div className="text-sm font-mono bg-slate-50 px-3 py-1 rounded border border-slate-200">
            {t.step}: {step}
          </div>
        </div>
        
        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-slate-700 font-medium flex items-center gap-2">
          <Flag size={18} className={found ? (slow === fast ? "text-green-600" : "text-red-600") : "text-slate-400"} />
          {message}
        </div>
      </div>

      <div className="relative h-[300px] bg-slate-900 rounded-xl overflow-hidden border-2 border-slate-700 shadow-inner">
        {/* Legend */}
        <div className="absolute top-4 right-4 bg-slate-800/80 p-2 rounded border border-slate-600 text-xs text-white space-y-1 z-20">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Slow (1 step)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <span>Fast (2 steps)</span>
          </div>
        </div>

        {/* Nodes */}
        {list.map((val, i) => {
          const { x, y } = getCoordinates(i);
          return (
            <div
              key={i}
              className="absolute w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-slate-300 text-sm font-mono border border-slate-600"
              style={{ left: x - 16, top: y - 16 }}
            >
              {val}
            </div>
          );
        })}

        {/* Pointers */}
        {slow !== -1 && (
          <div 
            className="absolute w-10 h-10 border-4 border-green-500 rounded-full z-10 transition-all duration-500 ease-in-out shadow-[0_0_15px_rgba(34,197,94,0.5)]"
            style={{ 
              left: getCoordinates(slow).x - 20, 
              top: getCoordinates(slow).y - 20 
            }}
          >
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-green-400 text-xs font-bold">S</div>
          </div>
        )}

        {fast !== -1 && (
          <div 
            className="absolute w-10 h-10 border-4 border-purple-500 rounded-full z-10 transition-all duration-500 ease-in-out shadow-[0_0_15px_rgba(168,85,247,0.5)]"
            style={{ 
              left: getCoordinates(fast).x - 20, 
              top: getCoordinates(fast).y - 20 
            }}
          >
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-purple-400 text-xs font-bold">F</div>
          </div>
        )}

        {/* Collision Indicator */}
        {found && slow === fast && slow !== -1 && (
          <div 
            className="collision-indicator absolute z-30 text-yellow-400 font-bold text-2xl drop-shadow-lg"
            style={{ 
              left: getCoordinates(slow).x - 10, 
              top: getCoordinates(slow).y - 40 
            }}
          >
            💥
          </div>
        )}
      </div>
    </div>
  );
}
