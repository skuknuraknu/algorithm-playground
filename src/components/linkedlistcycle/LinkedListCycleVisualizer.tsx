import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface LinkedListCycleVisualizerProps {
  problemState: {
    list: number[];
    pos: number;
  };
}

export default function LinkedListCycleVisualizer({ problemState }: LinkedListCycleVisualizerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { list, pos } = problemState;

  useEffect(() => {
    if (containerRef.current) {
      const ctx = gsap.context(() => {
        gsap.from('.node-item', {
          scale: 0,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'back.out(1.7)'
        });

        if (pos !== -1) {
          gsap.from('.cycle-arrow', {
            drawSVG: 0, // Note: drawSVG requires plugin, using opacity/path length instead if not available
            opacity: 0,
            duration: 1,
            delay: list.length * 0.1 + 0.5,
            ease: 'power2.out'
          });
        }
      }, containerRef);
      return () => ctx.revert();
    }
  }, [list, pos]);

  // Calculate positions for nodes
  // If cycle exists, arrange nodes in a "lasso" shape: straight line then circle
  const getCoordinates = (index: number, total: number, cyclePos: number) => {
    const spacing = 80;
    const startX = 50;
    const startY = 150;

    if (cyclePos === -1) {
      // Straight line
      return { x: startX + index * spacing, y: startY };
    } else {
      // Lasso shape
      // Nodes before cycle start are straight
      if (index < cyclePos) {
        return { x: startX + index * spacing, y: startY };
      } else {
        // Nodes in cycle form a circle
        const cycleLen = total - cyclePos;
        const radius = Math.max(60, cycleLen * 15);
        const cycleCenterX = startX + cyclePos * spacing + radius;
        const cycleCenterY = startY;
        
        // Angle for this node
        // Start from 180 degrees (left) to connect with straight part
        const angleStep = (2 * Math.PI) / cycleLen;
        const angle = Math.PI + (index - cyclePos) * angleStep;
        
        return {
          x: cycleCenterX + radius * Math.cos(angle),
          y: cycleCenterY + radius * Math.sin(angle)
        };
      }
    }
  };

  return (
    <div ref={containerRef} className="w-full h-[400px] bg-slate-50 rounded-xl border-2 border-slate-200 overflow-hidden relative flex items-center justify-center">
      <svg className="w-full h-full absolute top-0 left-0 pointer-events-none">
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
          </marker>
          <marker id="arrowhead-cycle" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#f97316" />
          </marker>
        </defs>
        
        {/* Connections */}
        {list.map((_, i) => {
          if (i === list.length - 1) {
            // Last node connection
            if (pos !== -1) {
              const start = getCoordinates(i, list.length, pos);
              const end = getCoordinates(pos, list.length, pos);
              
              // Curve for cycle closure
              // Simple quadratic bezier
              const midX = (start.x + end.x) / 2;
              const midY = (start.y + end.y) / 2 - 50; // Curve up

              return (
                <path
                  key={`link-${i}`}
                  d={`M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`}
                  stroke="#f97316"
                  strokeWidth="3"
                  fill="none"
                  markerEnd="url(#arrowhead-cycle)"
                  className="cycle-arrow"
                  strokeDasharray="5,5"
                />
              );
            }
            return null;
          }

          const start = getCoordinates(i, list.length, pos);
          const end = getCoordinates(i + 1, list.length, pos);
          
          return (
            <line
              key={`link-${i}`}
              x1={start.x}
              y1={start.y}
              x2={end.x}
              y2={end.y}
              stroke="#94a3b8"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
            />
          );
        })}
      </svg>

      {/* Nodes */}
      {list.map((val, i) => {
        const { x, y } = getCoordinates(i, list.length, pos);
        const isCycleStart = i === pos;
        
        return (
          <div
            key={`node-${i}`}
            className={`node-item absolute w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-md border-2 z-10 transition-colors
              ${isCycleStart ? 'bg-orange-100 border-orange-500 text-orange-700' : 'bg-white border-slate-400 text-slate-700'}
            `}
            style={{
              left: x - 24, // Center the div (width/2)
              top: y - 24,  // Center the div (height/2)
            }}
          >
            {val}
            <div className="absolute -bottom-6 text-xs text-slate-400 font-normal">
              {i}
            </div>
            {isCycleStart && (
              <div className="absolute -top-8 bg-orange-600 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                Cycle Start
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
