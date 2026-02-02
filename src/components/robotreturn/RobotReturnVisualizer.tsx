import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface RobotReturnVisualizerProps {
  moves: string;
}

export default function RobotReturnVisualizer({ moves }: RobotReturnVisualizerProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const robotRef = useRef<HTMLDivElement>(null);
  const pathRefs = useRef<(HTMLDivElement | null)[]>([]);

  let x = 0;
  let y = 0;
  const path = [{ x, y }];

  for (const move of moves) {
    if (move === 'U') y += 1;
    else if (move === 'D') y -= 1;
    else if (move === 'R') x += 1;
    else if (move === 'L') x -= 1;
    path.push({ x, y });
  }

  const isOrigin = x === 0 && y === 0;

  // Calculate grid bounds
  const minX = Math.min(...path.map(p => p.x), 0);
  const maxX = Math.max(...path.map(p => p.x), 0);
  const minY = Math.min(...path.map(p => p.y), 0);
  const maxY = Math.max(...path.map(p => p.y), 0);

  const gridWidth = Math.max(maxX - minX + 3, 5);
  const gridHeight = Math.max(maxY - minY + 3, 5);
  const cellSize = 60;

  // Convert world coordinates to grid coordinates
  const toGridX = (worldX: number) => (worldX - minX + 1) * cellSize;
  const toGridY = (worldY: number) => (maxY - worldY + 1) * cellSize;

  useEffect(() => {
    if (!robotRef.current) return;

    const tl = gsap.timeline();

    // Animate robot movement
    path.forEach((pos, index) => {
      const gridX = toGridX(pos.x);
      const gridY = toGridY(pos.y);

      if (index === 0) {
        // Initial position
        gsap.set(robotRef.current, {
          x: gridX - cellSize / 2,
          y: gridY - cellSize / 2,
          opacity: 0,
          scale: 0.5,
        });
        tl.to(robotRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: 'back.out(1.7)',
        });
      } else {
        // Move to next position
        tl.to(robotRef.current, {
          x: gridX - cellSize / 2,
          y: gridY - cellSize / 2,
          duration: 0.5,
          ease: 'power2.out',
          onStart: () => {
            // Pulse effect on movement
            gsap.to(robotRef.current, {
              scale: 1.2,
              duration: 0.15,
              yoyo: true,
              repeat: 1,
            });
          },
        });
      }

      // Animate path markers
      if (pathRefs.current[index]) {
        tl.from(
          pathRefs.current[index],
          {
            scale: 0,
            opacity: 0,
            duration: 0.3,
            ease: 'back.out(1.7)',
          },
          '-=0.3'
        );
      }
    });

    // Final celebration or warning
    if (isOrigin) {
      tl.to(robotRef.current, {
        scale: 1.3,
        rotation: 360,
        duration: 0.6,
        ease: 'back.out(1.7)',
      }).to(robotRef.current, {
        scale: 1,
        duration: 0.3,
      });
    } else {
      tl.to(robotRef.current, {
        y: '+=10',
        duration: 0.2,
        yoyo: true,
        repeat: 3,
        ease: 'power1.inOut',
      });
    }

    return () => {
      tl.kill();
    };
  }, [moves, path.length]);

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-2xl font-bold text-slate-800 mb-1">🗺️ Grid Visualization</h3>
            <p className="text-slate-600 text-sm">Jejak posisi robot pada grid 2D</p>
          </div>
          <div
            className={`px-4 py-2 rounded-lg font-semibold border-2 ${isOrigin
                ? 'bg-green-50 border-green-300 text-green-700'
                : 'bg-amber-50 border-amber-300 text-amber-700'
              }`}
          >
            {isOrigin ? '✅ Back to Origin' : '⚠️ Not at Origin'}
          </div>
        </div>

        {/* Grid Canvas */}
        <div className="bg-slate-50 rounded-lg p-6 border-2 border-slate-200 overflow-x-auto">
          <div
            ref={gridRef}
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
                    className={`absolute border border-slate-200 ${isOriginCell
                        ? 'bg-cyan-100 border-cyan-400 border-2'
                        : 'bg-white'
                      }`}
                    style={{
                      left: col * cellSize,
                      top: row * cellSize,
                      width: cellSize,
                      height: cellSize,
                    }}
                  >
                    {isOriginCell && (
                      <div className="absolute inset-0 flex items-center justify-center text-cyan-600 font-bold text-xs">
                        (0,0)
                      </div>
                    )}
                  </div>
                );
              })
            )}

            {/* Path markers */}
            {path.map((pos, index) => (
              <div
                key={index}
                ref={(el) => (pathRefs.current[index] = el)}
                className={`absolute flex items-center justify-center rounded-full border-2 ${index === 0
                    ? 'bg-cyan-500 border-cyan-600 w-4 h-4'
                    : index === path.length - 1
                      ? isOrigin
                        ? 'bg-green-500 border-green-600 w-5 h-5'
                        : 'bg-amber-500 border-amber-600 w-5 h-5'
                      : 'bg-slate-400 border-slate-500 w-3 h-3'
                  }`}
                style={{
                  left: toGridX(pos.x) - (index === 0 || index === path.length - 1 ? 10 : 6),
                  top: toGridY(pos.y) - (index === 0 || index === path.length - 1 ? 10 : 6),
                }}
              >
                {index === 0 && (
                  <span className="text-[8px] text-white font-bold">S</span>
                )}
                {index === path.length - 1 && index !== 0 && (
                  <span className="text-[8px] text-white font-bold">E</span>
                )}
              </div>
            ))}

            {/* Robot */}
            <div
              ref={robotRef}
              className="absolute w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg flex items-center justify-center text-2xl"
              style={{
                transformOrigin: 'center',
              }}
            >
              🤖
            </div>

            {/* Path lines */}
            <svg
              className="absolute inset-0 pointer-events-none"
              style={{
                width: gridWidth * cellSize,
                height: gridHeight * cellSize,
              }}
            >
              <path
                d={path
                  .map((pos, index) => {
                    const x = toGridX(pos.x);
                    const y = toGridY(pos.y);
                    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
                  })
                  .join(' ')}
                stroke="rgba(168, 85, 247, 0.3)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="5,5"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Move sequence */}
      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
        <h3 className="text-xl font-bold text-slate-800 mb-3">📋 Move Sequence</h3>
        <div className="flex flex-wrap gap-2">
          {moves.split('').map((move, index) => {
            const colors = {
              U: 'from-cyan-500 to-blue-500 border-cyan-300',
              D: 'from-amber-500 to-orange-500 border-amber-300',
              L: 'from-rose-500 to-pink-500 border-rose-300',
              R: 'from-emerald-500 to-green-500 border-green-300',
            };
            const color = colors[move as keyof typeof colors] || colors.U;

            return (
              <div
                key={index}
                className={`px-4 py-2 rounded-lg bg-gradient-to-r ${color} text-white font-bold border-2 shadow-md`}
              >
                {index + 1}. {move}
              </div>
            );
          })}
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-cyan-50 border-2 border-cyan-200 rounded-lg p-4">
          <div className="text-sm text-slate-600 mb-1">Total Moves</div>
          <div className="text-3xl font-bold text-cyan-700">{moves.length}</div>
        </div>
        <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4">
          <div className="text-sm text-slate-600 mb-1">Final X</div>
          <div className="text-3xl font-bold text-purple-700">{x}</div>
        </div>
        <div className="bg-pink-50 border-2 border-pink-200 rounded-lg p-4">
          <div className="text-sm text-slate-600 mb-1">Final Y</div>
          <div className="text-3xl font-bold text-pink-700">{y}</div>
        </div>
        <div
          className={`border-2 rounded-lg p-4 ${isOrigin
              ? 'bg-green-50 border-green-200'
              : 'bg-amber-50 border-amber-200'
            }`}
        >
          <div className="text-sm text-slate-600 mb-1">Result</div>
          <div
            className={`text-2xl font-bold ${isOrigin ? 'text-green-700' : 'text-amber-700'
              }`}
          >
            {isOrigin ? 'TRUE' : 'FALSE'}
          </div>
        </div>
      </div>
    </div>
  );
}
