import { gsap } from 'gsap';
import { useEffect, useRef, useState, useCallback } from 'react';

interface Props {
  a: number[];
  b: number[];
  c: number[];
  d: number[];
}

type AnimationPhase = 'idle' | 'building' | 'searching' | 'complete';

export default function FourSumTwoVisualizer({ a, b, c, d }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [highlightedAB, setHighlightedAB] = useState<number | null>(null);
  const [highlightedCD, setHighlightedCD] = useState<number | null>(null);
  const [matchCount, setMatchCount] = useState(0);
  const [phase, setPhase] = useState<AnimationPhase>('idle');
  const [currentPairA, setCurrentPairA] = useState<number | null>(null);
  const [currentPairB, setCurrentPairB] = useState<number | null>(null);
  const [currentPairC, setCurrentPairC] = useState<number | null>(null);
  const [currentPairD, setCurrentPairD] = useState<number | null>(null);
  const [buildingSum, setBuildingSum] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [speed, setSpeed] = useState(1);
  const timelineRef = useRef<GSAPTimeline | null>(null);

  // Calculate sums
  const abSums = new Map<number, number>();
  a.forEach((x) => b.forEach((y) => abSums.set(x + y, (abSums.get(x + y) ?? 0) + 1)));

  const cdSums = new Map<number, number>();
  c.forEach((x) => d.forEach((y) => cdSums.set(x + y, (cdSums.get(x + y) ?? 0) + 1)));

  // Find matching pairs
  const matches: Array<{abSum: number, cdSum: number, count: number}> = [];
  let totalCount = 0;
  abSums.forEach((abFreq, abSum) => {
    const cdSum = -abSum;
    if (cdSums.has(cdSum)) {
      const count = abFreq * cdSums.get(cdSum)!;
      matches.push({ abSum, cdSum, count });
      totalCount += count;
    }
  });

  // Initial entrance animation
  useEffect(() => {
    if (!containerRef.current) return;
    
    const tl = gsap.timeline();
    tl.fromTo(
      containerRef.current.querySelectorAll('.chip'),
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, stagger: 0.05, ease: 'back.out(1.7)' }
    );

    return () => { tl.kill(); };
  }, [a, b, c, d]);

  // Reset states when arrays change
  useEffect(() => {
    setMatchCount(0);
    setHighlightedAB(null);
    setHighlightedCD(null);
    setCurrentPairA(null);
    setCurrentPairB(null);
    setCurrentPairC(null);
    setCurrentPairD(null);
    setBuildingSum(null);
    setPhase('idle');
    setIsAnimating(false);
  }, [a, b, c, d]);

  // Main animation function
  const runFullAnimation = useCallback(() => {
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    setIsAnimating(true);
    setMatchCount(0);
    setPhase('building');

    const tl = gsap.timeline({
      onComplete: () => {
        setIsAnimating(false);
        setPhase('complete');
        setCurrentPairA(null);
        setCurrentPairB(null);
        setCurrentPairC(null);
        setCurrentPairD(null);
        setBuildingSum(null);
      }
    });
    timelineRef.current = tl;

    const baseDelay = 0.5 / speed;

    // Phase 1: Building HashMap A+B
    a.forEach((valA, idxA) => {
      b.forEach((valB, idxB) => {
        const sum = valA + valB;
        
        tl.add(() => {
          setCurrentPairA(idxA);
          setCurrentPairB(idxB);
          setBuildingSum(sum);
        });
        
        tl.to({}, { duration: baseDelay });
        
        // Animate the sum chip appearing/updating
        tl.add(() => {
          const chip = containerRef.current?.querySelector(`.ab-chip-${sum}`);
          if (chip) {
            gsap.fromTo(chip, 
              { scale: 1.3, backgroundColor: '#818cf8' },
              { scale: 1, backgroundColor: '', duration: 0.3, ease: 'back.out(1.7)' }
            );
          }
        });
      });
    });

    // Transition to search phase
    tl.add(() => {
      setPhase('searching');
      setCurrentPairA(null);
      setCurrentPairB(null);
      setBuildingSum(null);
    });
    tl.to({}, { duration: baseDelay * 2 });

    // Phase 2: Searching for complements
    let runningCount = 0;
    
    c.forEach((valC, idxC) => {
      d.forEach((valD, idxD) => {
        const cdSum = valC + valD;
        const complement = -cdSum;
        const abFreq = abSums.get(complement) ?? 0;
        
        tl.add(() => {
          setCurrentPairC(idxC);
          setCurrentPairD(idxD);
          setHighlightedCD(cdSum);
          setHighlightedAB(abFreq > 0 ? complement : null);
        });
        
        tl.to({}, { duration: baseDelay });
        
        if (abFreq > 0) {
          const matchCount = abFreq * (cdSums.get(cdSum) ?? 1);
          
          tl.add(() => {
            runningCount += matchCount;
            setMatchCount(runningCount);
            
            // Flash effect on match
            const abChip = containerRef.current?.querySelector(`.ab-chip-${complement}`);
            const cdChip = containerRef.current?.querySelector(`.cd-chip-${cdSum}`);
            
            if (abChip) {
              gsap.fromTo(abChip,
                { boxShadow: '0 0 20px 10px rgba(34, 197, 94, 0.8)' },
                { boxShadow: '0 0 0 0 rgba(34, 197, 94, 0)', duration: 0.5 }
              );
            }
            if (cdChip) {
              gsap.fromTo(cdChip,
                { boxShadow: '0 0 20px 10px rgba(34, 197, 94, 0.8)' },
                { boxShadow: '0 0 0 0 rgba(34, 197, 94, 0)', duration: 0.5 }
              );
            }
          });
        }
        
        tl.add(() => {
          setHighlightedAB(null);
          setHighlightedCD(null);
        });
      });
    });

    // Final celebration
    tl.add(() => {
      setCurrentPairC(null);
      setCurrentPairD(null);
      
      if (containerRef.current) {
        gsap.fromTo(
          containerRef.current.querySelector('.result-counter'),
          { scale: 1 },
          { scale: 1.2, duration: 0.3, yoyo: true, repeat: 3, ease: 'power2.inOut' }
        );
      }
    });

  }, [a, b, c, d, abSums, cdSums, speed]);

  const stopAnimation = () => {
    if (timelineRef.current) {
      timelineRef.current.kill();
    }
    setIsAnimating(false);
    setPhase('idle');
    setCurrentPairA(null);
    setCurrentPairB(null);
    setCurrentPairC(null);
    setCurrentPairD(null);
    setBuildingSum(null);
    setHighlightedAB(null);
    setHighlightedCD(null);
  };

  const skipToEnd = () => {
    stopAnimation();
    setMatchCount(totalCount);
    setPhase('complete');
  };

  return (
    <div ref={containerRef} className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-xl p-6 shadow-lg space-y-6">
      {/* Header with controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
            <span className="text-white font-bold">🔍</span>
          </div>
          <div>
            <div className="text-lg font-bold text-indigo-900">Visualisasi Hash Map</div>
            <div className="text-xs text-indigo-600">
              {phase === 'idle' && 'Siap untuk mulai'}
              {phase === 'building' && '📦 Membangun HashMap A+B...'}
              {phase === 'searching' && '🔎 Mencari komplemen C+D...'}
              {phase === 'complete' && '✅ Selesai!'}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Speed control */}
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
            <span className="text-xs text-slate-600">Speed:</span>
            <select 
              value={speed} 
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="text-sm font-semibold text-indigo-600 bg-transparent outline-none cursor-pointer"
              disabled={isAnimating}
            >
              <option value={0.5}>0.5x</option>
              <option value={1}>1x</option>
              <option value={2}>2x</option>
              <option value={4}>4x</option>
            </select>
          </div>

          {/* Control buttons */}
          {!isAnimating ? (
            <button
              onClick={runFullAnimation}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg active:scale-95"
            >
              ▶️ Play
            </button>
          ) : (
            <>
              <button
                onClick={stopAnimation}
                className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-all shadow-md"
              >
                ⏹ Stop
              </button>
              <button
                onClick={skipToEnd}
                className="px-4 py-2 bg-slate-600 text-white rounded-lg font-semibold hover:bg-slate-700 transition-all shadow-md"
              >
                ⏭ Skip
              </button>
            </>
          )}
        </div>
      </div>

      {/* Counter */}
      <div className="result-counter flex items-center justify-center gap-4 bg-white px-6 py-4 rounded-xl shadow-md border-2 border-emerald-200">
        <span className="text-slate-600 font-medium">Total Tuple Ditemukan:</span>
        <span className="text-4xl font-bold text-emerald-600">{matchCount}</span>
        <span className="text-slate-400">/ {totalCount}</span>
      </div>

      {/* Current operation display */}
      {(phase === 'building' || phase === 'searching') && (
        <div className="bg-white/80 backdrop-blur rounded-lg p-4 border-2 border-dashed border-indigo-300">
          {phase === 'building' && buildingSum !== null && currentPairA !== null && currentPairB !== null && (
            <div className="flex items-center justify-center gap-3 text-lg">
              <span className="text-blue-600 font-mono">A[{currentPairA}]={a[currentPairA]}</span>
              <span className="text-slate-400">+</span>
              <span className="text-cyan-600 font-mono">B[{currentPairB}]={b[currentPairB]}</span>
              <span className="text-slate-400">=</span>
              <span className="px-3 py-1 bg-indigo-600 text-white rounded-lg font-bold">{buildingSum}</span>
              <span className="text-indigo-600 animate-pulse">→ HashMap</span>
            </div>
          )}
          {phase === 'searching' && currentPairC !== null && currentPairD !== null && (
            <div className="flex items-center justify-center gap-3 text-lg flex-wrap">
              <span className="text-orange-600 font-mono">C[{currentPairC}]={c[currentPairC]}</span>
              <span className="text-slate-400">+</span>
              <span className="text-rose-600 font-mono">D[{currentPairD}]={d[currentPairD]}</span>
              <span className="text-slate-400">=</span>
              <span className="px-2 py-1 bg-amber-500 text-white rounded font-bold">{c[currentPairC] + d[currentPairD]}</span>
              <span className="text-slate-400">→ butuh</span>
              <span className="px-2 py-1 bg-red-500 text-white rounded font-bold">{-(c[currentPairC] + d[currentPairD])}</span>
              {highlightedAB !== null ? (
                <span className="text-emerald-600 font-bold">✓ Ketemu!</span>
              ) : (
                <span className="text-slate-400">✗</span>
              )}
            </div>
          )}
        </div>
      )}

      {/* Arrays display */}
      <div className="grid grid-cols-2 gap-4">
        {[
          { label: 'A', data: a, color: 'blue', highlight: currentPairA },
          { label: 'B', data: b, color: 'cyan', highlight: currentPairB },
          { label: 'C', data: c, color: 'orange', highlight: currentPairC },
          { label: 'D', data: d, color: 'rose', highlight: currentPairD },
        ].map(({ label, data, color, highlight }) => (
          <div key={label} className="bg-white/80 backdrop-blur rounded-lg p-3 border border-slate-200">
            <div className={`text-xs font-semibold text-${color}-600 mb-2`}>Array {label}</div>
            <div className="flex flex-wrap gap-1">
              {data.map((val, idx) => (
                <span 
                  key={idx} 
                  className={`px-2 py-1 rounded text-sm font-mono transition-all duration-300 ${
                    highlight === idx 
                      ? `bg-${color}-500 text-white scale-110 shadow-lg ring-2 ring-${color}-300` 
                      : `bg-${color}-100 text-${color}-700`
                  }`}
                >
                  {val}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Hash maps */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* A+B Map */}
        <div className="bg-white/90 backdrop-blur rounded-xl p-4 shadow-sm border-2 border-indigo-300">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 bg-indigo-500 rounded-full animate-pulse"></div>
            <div className="text-sm font-bold text-indigo-900">HashMap A + B</div>
            <span className="ml-auto text-xs text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded">
              {abSums.size} entries
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {Array.from(abSums.entries()).map(([sum, freq]) => {
              const isHighlighted = highlightedAB === sum;
              const isBuilding = buildingSum === sum && phase === 'building';
              return (
                <div 
                  key={sum} 
                  className={`ab-chip-${sum} chip px-4 py-2.5 rounded-lg shadow-md text-sm font-bold transition-all duration-300 ${
                    isHighlighted 
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white scale-110 ring-4 ring-emerald-300 shadow-xl' 
                      : isBuilding
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white scale-110 ring-4 ring-indigo-300'
                      : 'bg-white border-2 border-indigo-300 text-indigo-700 hover:scale-105 hover:shadow-lg cursor-pointer'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{sum}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded ${
                      isHighlighted || isBuilding ? 'bg-white/30' : 'bg-indigo-100 text-indigo-600'
                    }`}>
                      ×{freq}
                    </span>
                  </div>
                </div>
              );
            })}
            {abSums.size === 0 && <div className="text-xs text-slate-400 italic">(kosong)</div>}
          </div>
        </div>

        {/* C+D Map */}
        <div className="bg-white/90 backdrop-blur rounded-xl p-4 shadow-sm border-2 border-amber-300">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse"></div>
            <div className="text-sm font-bold text-amber-900">HashMap C + D</div>
            <span className="ml-auto text-xs text-amber-600 bg-amber-100 px-2 py-0.5 rounded">
              {cdSums.size} entries
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {Array.from(cdSums.entries()).map(([sum, freq]) => {
              const isHighlighted = highlightedCD === sum;
              return (
                <div 
                  key={sum} 
                  className={`cd-chip-${sum} chip px-4 py-2.5 rounded-lg shadow-md text-sm font-bold transition-all duration-300 ${
                    isHighlighted 
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white scale-110 ring-4 ring-amber-300 shadow-xl' 
                      : 'bg-white border-2 border-amber-300 text-amber-700 hover:scale-105 hover:shadow-lg cursor-pointer'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{sum}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded ${
                      isHighlighted ? 'bg-white/30' : 'bg-amber-100 text-amber-600'
                    }`}>
                      ×{freq}
                    </span>
                  </div>
                </div>
              );
            })}
            {cdSums.size === 0 && <div className="text-xs text-slate-400 italic">(kosong)</div>}
          </div>
        </div>
      </div>

      {/* Matching pairs visualization */}
      {matches.length > 0 && (
        <div className="bg-emerald-50 border-2 border-emerald-300 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">🎯</span>
            <span className="text-sm font-semibold text-emerald-900">Pasangan yang Match (A+B = -(C+D))</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {matches.map((match, idx) => (
              <div 
                key={idx} 
                className={`bg-white px-4 py-3 rounded-lg border-2 shadow-sm transition-all duration-300 ${
                  highlightedAB === match.abSum && highlightedCD === match.cdSum
                    ? 'border-emerald-500 scale-105 shadow-lg'
                    : 'border-emerald-200 hover:border-emerald-400 hover:shadow-md cursor-pointer'
                }`}
              >
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-mono px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded">{match.abSum}</span>
                  <span className="text-slate-400">+</span>
                  <span className="font-mono px-2 py-0.5 bg-amber-100 text-amber-700 rounded">{match.cdSum}</span>
                  <span className="text-slate-400">=</span>
                  <span className="font-bold text-emerald-600">0</span>
                </div>
                <div className="text-xs text-slate-500 mt-1 text-center">
                  {match.count} tuple{match.count > 1 ? 's' : ''}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="text-xs text-slate-600 bg-white/60 rounded-lg p-4 border border-slate-200">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-base">📖</span>
          <strong>Cara Kerja:</strong>
        </div>
        <ol className="list-decimal list-inside space-y-1 ml-4">
          <li>Pertama, hitung semua kemungkinan <span className="text-indigo-600 font-semibold">A[i] + B[j]</span> dan simpan frekuensinya</li>
          <li>Untuk setiap <span className="text-amber-600 font-semibold">C[k] + D[l]</span>, cari komplemen <span className="text-red-600 font-semibold">-(C+D)</span> di hash map</li>
          <li>Jika ketemu, <span className="text-emerald-600 font-semibold">kalikan frekuensi</span> keduanya untuk mendapat jumlah tuple valid</li>
        </ol>
      </div>
    </div>
  );
}
