import { useEffect, useMemo, useState, useRef } from 'react';
import { Play, Square, SkipForward, RotateCcw, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../i18n';
import gsap from 'gsap';

interface RobotReturnSimulatorProps {
  moves: string;
}

interface Step {
  move: string;
  x: number;
  y: number;
  index: number;
}

const moveMeta: Record<string, { label: string; color: string; emoji: string; dx: number; dy: number }> = {
  U: { label: 'Up', color: 'from-cyan-500 to-blue-500', emoji: '⬆️', dx: 0, dy: 1 },
  D: { label: 'Down', color: 'from-amber-500 to-orange-500', emoji: '⬇️', dx: 0, dy: -1 },
  L: { label: 'Left', color: 'from-rose-500 to-pink-500', emoji: '⬅️', dx: -1, dy: 0 },
  R: { label: 'Right', color: 'from-emerald-500 to-green-500', emoji: '➡️', dx: 1, dy: 0 },
};

export default function RobotReturnSimulator({ moves }: RobotReturnSimulatorProps) {
  const { t } = useLanguage();
  const robotRef = useRef<HTMLDivElement>(null);
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);

  const steps = useMemo(() => {
    const s: Step[] = [];
    let x = 0;
    let y = 0;
    moves.split('').forEach((move, index) => {
      if (move === 'U') y += 1;
      if (move === 'D') y -= 1;
      if (move === 'R') x += 1;
      if (move === 'L') x -= 1;
      s.push({ move, x, y, index });
    });
    return s;
  }, [moves]);

  const [currentStep, setCurrentStep] = useState(-1); // -1 means at origin
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(800);
  const progress = steps.length ? ((currentStep + 1) / steps.length) * 100 : 0;

  const currentPos = currentStep >= 0 ? steps[currentStep] : { x: 0, y: 0, move: '', index: -1 };
  const finalX = steps.length ? steps[steps.length - 1].x : 0;
  const finalY = steps.length ? steps[steps.length - 1].y : 0;
  const isOrigin = finalX === 0 && finalY === 0;

  // Calculate grid bounds
  const positions = [{ x: 0, y: 0 }, ...steps.map(s => ({ x: s.x, y: s.y }))];
  const minX = Math.min(...positions.map(p => p.x), 0);
  const maxX = Math.max(...positions.map(p => p.x), 0);
  const minY = Math.min(...positions.map(p => p.y), 0);
  const maxY = Math.max(...positions.map(p => p.y), 0);

  const gridWidth = Math.max(maxX - minX + 3, 5);
  const gridHeight = Math.max(maxY - minY + 3, 5);
  const cellSize = 50;

  const toGridX = (worldX: number) => (worldX - minX + 1) * cellSize + cellSize / 2;
  const toGridY = (worldY: number) => (maxY - worldY + 1) * cellSize + cellSize / 2;

  useEffect(() => {
    setCurrentStep(-1);
    setIsPlaying(false);
  }, [steps]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && currentStep < steps.length - 1) {
      timer = setTimeout(() => setCurrentStep((prev) => prev + 1), speed);
    }
    if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [currentStep, isPlaying, speed, steps.length]);

  // Animate robot movement with GSAP
  useEffect(() => {
    if (!robotRef.current) return;

    const x = toGridX(currentPos.x);
    const y = toGridY(currentPos.y);

    if (currentStep === -1) {
      // Reset to origin
      gsap.to(robotRef.current, {
        x: x - 24,
        y: y - 24,
        rotation: 0,
        scale: 1,
        duration: 0.6,
        ease: 'power2.out',
      });
    } else {
      // Move to new position
      const meta = moveMeta[currentPos.move];
      const rotation = meta.dx > 0 ? 90 : meta.dx < 0 ? -90 : meta.dy > 0 ? 0 : 180;

      gsap.to(robotRef.current, {
        x: x - 24,
        y: y - 24,
        rotation,
        duration: 0.4,
        ease: 'power2.out',
        onStart: () => {
          // Jump animation
          gsap.to(robotRef.current, {
            scale: 1.2,
            duration: 0.2,
            yoyo: true,
            repeat: 1,
            ease: 'power1.inOut',
          });
        },
      });

      // Animate trail
      if (trailRefs.current[currentStep]) {
        gsap.fromTo(
          trailRefs.current[currentStep],
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(2)' }
        );
      }
    }

    // Final celebration or shake
    if (currentStep === steps.length - 1) {
      setTimeout(() => {
        if (isOrigin) {
          gsap.to(robotRef.current, {
            scale: 1.5,
            rotation: '+=720',
            duration: 1,
            ease: 'elastic.out(1, 0.5)',
            onComplete: () => {
              gsap.to(robotRef.current, {
                scale: 1,
                duration: 0.3,
              });
            },
          });
        } else {
          gsap.to(robotRef.current, {
            x: `+=${[5, -5, 5, -5, 0]}`,
            duration: 0.1,
            repeat: 4,
            ease: 'power1.inOut',
          });
        }
      }, 400);
    }
  }, [currentStep, currentPos.x, currentPos.y, currentPos.move]);

  const handlePlay = () => {
    if (!steps.length) return;
    if (currentStep >= steps.length - 1) setCurrentStep(-1);
    setIsPlaying(true);
  };

  const handleStop = () => {
    setIsPlaying(false);
    setCurrentStep(-1);
  };

  const handleNext = () => {
    setIsPlaying(false);
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(-1);
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border-2 border-slate-200 dark:border-slate-700">
        <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">⚡ Interactive Simulation</h3>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          Simulasi step-by-step pergerakan robot dengan animasi GSAP
        </p>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={handlePlay}
            disabled={isPlaying}
            className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 disabled:from-slate-400 disabled:to-slate-500 text-white px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 shadow-md transition-all"
          >
            <Play size={18} /> {t.play}
          </button>
          <button
            onClick={handleStop}
            className="bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 shadow-md transition-all"
          >
            <Square size={18} /> {t.stop}
          </button>
          <button
            onClick={handleNext}
            disabled={currentStep >= steps.length - 1}
            className="bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 disabled:from-slate-300 disabled:to-slate-400 disabled:cursor-not-allowed text-white px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 shadow-md transition-all"
          >
            <SkipForward size={18} /> {t.next}
          </button>
          <button
            onClick={handleReset}
            className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 shadow-md transition-all"
          >
            <RotateCcw size={18} /> {t.reset}
          </button>

          <div className="flex items-center gap-2 ml-auto">
            <span className="text-sm text-slate-700 dark:text-slate-300 font-semibold">{t.speed}</span>
            <select
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="border-2 border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500"
            >
              <option value={1600}>0.5x</option>
              <option value={800}>1x</option>
              <option value={400}>2x</option>
              <option value={200}>4x</option>
            </select>
          </div>
        </div>

        <div className="mt-4 text-sm text-slate-600 dark:text-slate-400">
          {t.step} {currentStep + 1} / {steps.length}
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 mt-2 overflow-hidden">
          <div
            className="h-3 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full transition-all duration-500 relative overflow-hidden"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-[shimmer_2s_infinite]" />
          </div>
        </div>
      </div>

      {/* Grid Visualization */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border-2 border-slate-200 dark:border-slate-700">
        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">🗺️ 2D Grid</h3>
        <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-6 border-2 border-slate-200 dark:border-slate-700 overflow-x-auto">
          <div
            ref={gridContainerRef}
            className="relative mx-auto"
            style={{
              width: gridWidth * cellSize,
              height: gridHeight * cellSize,
            }}
          >
            {/* Grid cells */}
            {Array.from({ length: gridHeight }).map((_, row) =>
              Array.from({ length: gridWidth }).map((_, col) => {
                const worldX = col + minX - 1;
                const worldY = maxY - row + 1;
                const isOriginCell = worldX === 0 && worldY === 0;

                return (
                  <div
                    key={`${row}-${col}`}
                    className={`absolute border border-slate-200 dark:border-slate-700 ${isOriginCell
                        ? 'bg-gradient-to-br from-cyan-100 to-blue-100 dark:from-cyan-900/40 dark:to-blue-900/40 border-cyan-400 dark:border-cyan-600 border-2'
                        : 'bg-white dark:bg-slate-800'
                      }`}
                    style={{
                      left: col * cellSize,
                      top: row * cellSize,
                      width: cellSize,
                      height: cellSize,
                    }}
                  >
                    {isOriginCell && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-cyan-600 dark:text-cyan-400 font-bold text-[10px]">(0,0)</div>
                      </div>
                    )}
                  </div>
                );
              })
            )}

            {/* Trail markers */}
            {steps.map((step, index) => {
              if (index > currentStep) return null;
              return (
                <div
                  key={index}
                  ref={(el) => (trailRefs.current[index] = el)}
                  className={`absolute w-2 h-2 rounded-full ${step.x === 0 && step.y === 0
                      ? 'bg-green-500 dark:bg-green-400'
                      : 'bg-purple-400 dark:bg-purple-500'
                    } opacity-60`}
                  style={{
                    left: toGridX(step.x) - 4,
                    top: toGridY(step.y) - 4,
                  }}
                />
              );
            })}

            {/* Robot */}
            <div
              ref={robotRef}
              className="absolute w-12 h-12"
              style={{
                transformOrigin: 'center',
              }}
            >
              <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-500 to-pink-500 dark:from-purple-600 dark:to-pink-600 shadow-lg flex items-center justify-center text-2xl border-2 border-white dark:border-slate-700">
                🤖
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Current Step Info */}
      {currentStep >= 0 && (
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 shadow-lg border-2 border-purple-200 dark:border-purple-700">
          <div className="flex items-center gap-3 mb-4">
            <div
              className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${moveMeta[currentPos.move]?.color || 'from-cyan-500 to-blue-500'
                } text-white flex items-center justify-center text-3xl shadow-lg`}
            >
              {moveMeta[currentPos.move]?.emoji || '➡️'}
            </div>
            <div className="flex-1">
              <div className="text-sm text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                Step {currentStep + 1}
              </div>
              <div className="text-2xl font-bold text-slate-800 dark:text-white">
                Move: {currentPos.move} ({moveMeta[currentPos.move]?.label || 'Unknown'})
              </div>
              <div className="text-slate-600 dark:text-slate-400 mt-1">
                Position: <span className="font-bold text-purple-600 dark:text-purple-400">({currentPos.x}, {currentPos.y})</span>
              </div>
            </div>
          </div>

          {/* Move sequence visualization */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {steps.map((step, index) => {
              const isCurrent = index === currentStep;
              const isDone = index < currentStep;
              const meta = moveMeta[step.move] || moveMeta.U;

              return (
                <div key={index} className="flex items-center gap-1 flex-shrink-0">
                  <div
                    className={`px-3 py-2 rounded-lg border-2 text-sm font-semibold transition-all duration-300 ${isCurrent
                        ? `bg-gradient-to-r ${meta.color} text-white border-white shadow-lg scale-110`
                        : isDone
                          ? 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-600'
                          : 'bg-white dark:bg-slate-800 text-slate-400 dark:text-slate-500 border-dashed border-slate-300 dark:border-slate-600'
                      }`}
                  >
                    {step.move}
                  </div>
                  {index < steps.length - 1 && (
                    <ChevronRight
                      size={16}
                      className={`flex-shrink-0 ${index < currentStep
                          ? 'text-slate-400 dark:text-slate-600'
                          : 'text-slate-300 dark:text-slate-700'
                        }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Final Result */}
      <div
        className={`p-6 rounded-xl border-2 shadow-lg ${isOrigin
            ? 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-300 dark:border-green-700'
            : 'bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-300 dark:border-amber-700'
          }`}
      >
        <div className="flex items-center gap-4">
          <div className="text-5xl">{isOrigin ? '✅' : '⚠️'}</div>
          <div className="flex-1">
            <div
              className={`text-2xl font-bold mb-1 ${isOrigin
                  ? 'text-green-700 dark:text-green-400'
                  : 'text-amber-700 dark:text-amber-400'
                }`}
            >
              {isOrigin ? 'Robot Kembali ke Origin!' : 'Robot Tidak di Origin'}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              Posisi akhir: <span className="font-bold">({finalX}, {finalY})</span>
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              {isOrigin
                ? 'Semua gerakan saling membatalkan, robot kembali ke titik asal.'
                : 'Masih ada displacement yang belum dibatalkan.'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
