import { gsap } from 'gsap';
import { useEffect, useMemo, useRef, useState } from 'react';

interface Props {
  s: string;
  t: string;
}

function findWindow(s: string, t: string) {
  if (!s || !t || t.length > s.length) return { start: -1, end: -1, needMap: new Map() };
  const need = new Map<string, number>();
  for (const ch of t) need.set(ch, (need.get(ch) ?? 0) + 1);
  const originalNeed = new Map(need);
  let missing = t.length;
  let left = 0;
  let best: [number, number] | null = null;
  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    const curNeed = need.get(ch) ?? 0;
    if (curNeed > 0) missing--;
    need.set(ch, curNeed - 1);

    while (missing === 0) {
      if (!best || right - left < best[1] - best[0]) {
        best = [left, right];
      }
      const leftCh = s[left];
      need.set(leftCh, (need.get(leftCh) ?? 0) + 1);
      if ((need.get(leftCh) ?? 0) > 0) missing++;
      left++;
    }
  }
  return best ? { start: best[0], end: best[1], needMap: originalNeed } : { start: -1, end: -1, needMap: originalNeed };
}

export default function MinWindowVisualizer({ s, t }: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const windowPos = useMemo(() => findWindow(s, t), [s, t]);
  const [animatedLeft, setAnimatedLeft] = useState(windowPos.start);
  const [animatedRight, setAnimatedRight] = useState(windowPos.end);

  useEffect(() => {
    if (!wrapRef.current) return;
    gsap.fromTo(
      wrapRef.current.querySelectorAll('.char'),
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, stagger: 0.02, ease: 'back.out(1.7)' }
    );
  }, [s, t]);

  useEffect(() => {
    if (windowPos.start === -1) {
      setAnimatedLeft(-1);
      setAnimatedRight(-1);
      return;
    }

    // Animate the window appearing
    const tl = gsap.timeline();
    
    // Start from beginning
    setAnimatedLeft(0);
    setAnimatedRight(0);

    // Animate right pointer expanding
    tl.to({}, {
      duration: 1.5,
      ease: 'power2.inOut',
      onUpdate: function() {
        const progress = this.progress();
        setAnimatedRight(Math.floor(progress * windowPos.end));
      }
    })
    // Then animate left pointer contracting
    .to({}, {
      duration: 1,
      ease: 'power2.inOut',
      onUpdate: function() {
        const progress = this.progress();
        setAnimatedLeft(Math.floor(progress * windowPos.start));
      }
    });

    return () => {
      tl.kill();
    };
  }, [windowPos]);

  // Get character frequency in the window
  const windowChars = useMemo(() => {
    if (animatedLeft === -1 || animatedRight === -1) return new Map();
    const map = new Map<string, number>();
    for (let i = animatedLeft; i <= animatedRight; i++) {
      const ch = s[i];
      map.set(ch, (map.get(ch) ?? 0) + 1);
    }
    return map;
  }, [s, animatedLeft, animatedRight]);

  const isValid = windowPos.start !== -1;
  const windowLength = isValid ? windowPos.end - windowPos.start + 1 : 0;

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-300 rounded-xl p-6 shadow-lg space-y-6" ref={wrapRef}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="text-lg font-bold text-emerald-900">Visualisasi Sliding Window</div>
        {isValid && (
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border-2 border-emerald-300">
            <span className="text-sm text-slate-600">Panjang:</span>
            <span className="text-2xl font-bold text-emerald-600">{windowLength}</span>
          </div>
        )}
      </div>

      {/* Target string display */}
      <div className="bg-white/80 backdrop-blur rounded-lg p-4 border border-emerald-200">
        <div className="text-sm font-semibold text-slate-600 mb-2">Target (T):</div>
        <div className="flex flex-wrap gap-2">
          {t.split('').map((ch, idx) => (
            <div key={idx} className="px-3 py-2 bg-gradient-to-br from-emerald-400 to-teal-500 text-white rounded-lg shadow-md font-mono font-bold">
              {ch}
            </div>
          ))}
          {t.length === 0 && <span className="text-slate-400 text-sm">(kosong)</span>}
        </div>
      </div>

      {/* Main string visualization */}
      <div className="bg-white/90 backdrop-blur rounded-xl p-4 border-2 border-emerald-200 shadow-sm">
        <div className="text-sm font-semibold text-slate-600 mb-3">Source (S):</div>
        <div className="flex flex-wrap gap-1 font-mono">
          {s.split('').map((ch, idx) => {
            const inWindow = idx >= animatedLeft && idx <= animatedRight && animatedLeft !== -1;
            const isLeftBoundary = idx === animatedLeft && animatedLeft !== -1;
            const isRightBoundary = idx === animatedRight && animatedRight !== -1;
            const isNeeded = windowPos.needMap.has(ch);
            
            return (
              <div
                key={idx}
                className={`char relative transition-all duration-300 px-3 py-2.5 rounded-lg border-2 text-base font-bold ${
                  inWindow
                    ? isNeeded
                      ? 'bg-gradient-to-br from-emerald-400 to-teal-500 text-white border-emerald-600 shadow-lg scale-110'
                      : 'bg-gradient-to-br from-slate-200 to-slate-300 text-slate-700 border-slate-400 shadow-md'
                    : 'bg-white border-slate-200 text-slate-400'
                }`}
              >
                {ch}
                <div className="absolute -top-2 -right-2 text-[10px] font-bold">
                  {isLeftBoundary && (
                    <span className="inline-block px-1.5 py-0.5 bg-blue-500 text-white rounded-full shadow">L</span>
                  )}
                  {isRightBoundary && (
                    <span className="inline-block px-1.5 py-0.5 bg-purple-500 text-white rounded-full shadow ml-1">R</span>
                  )}
                </div>
              </div>
            );
          })}
          {s.length === 0 && <div className="text-sm text-slate-400">(kosong)</div>}
        </div>
      </div>

      {/* Character frequency comparison */}
      {isValid && (
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white/80 backdrop-blur rounded-lg p-4 border border-teal-200">
            <div className="text-sm font-semibold text-teal-900 mb-2">📊 Kebutuhan (T):</div>
            <div className="flex flex-wrap gap-2">
              {Array.from(windowPos.needMap.entries()).map(([ch, count]) => (
                <div key={ch} className="px-3 py-2 bg-teal-100 border-2 border-teal-300 rounded-lg text-sm">
                  <span className="font-mono font-bold text-teal-800">{ch}</span>
                  <span className="text-xs text-teal-600 ml-1">×{count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur rounded-lg p-4 border border-emerald-200">
            <div className="text-sm font-semibold text-emerald-900 mb-2">✓ Ada di Window:</div>
            <div className="flex flex-wrap gap-2">
              {Array.from(windowChars.entries())
                .sort((a, b) => a[0].localeCompare(b[0]))
                .map(([ch, count]) => {
                  const needed = windowPos.needMap.get(ch) ?? 0;
                  const isSufficient = count >= needed;
                  return (
                    <div key={ch} className={`px-3 py-2 rounded-lg text-sm border-2 ${
                      isSufficient 
                        ? 'bg-emerald-100 border-emerald-300' 
                        : 'bg-orange-100 border-orange-300'
                    }`}>
                      <span className="font-mono font-bold">{ch}</span>
                      <span className="text-xs ml-1">×{count}</span>
                      {windowPos.needMap.has(ch) && (
                        <span className={`text-xs ml-1 ${isSufficient ? 'text-emerald-600' : 'text-orange-600'}`}>
                          ({needed} needed)
                        </span>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}

      {/* Status message */}
      <div className={`rounded-lg p-4 border-2 text-sm ${
        isValid
          ? 'bg-emerald-100 border-emerald-300 text-emerald-900'
          : 'bg-rose-100 border-rose-300 text-rose-900'
      }`}>
        {isValid ? (
          <div className="space-y-1">
            <div className="font-semibold">✓ Window Valid Ditemukan!</div>
            <div>Window: [{windowPos.start}, {windowPos.end}] = <span className="font-mono font-bold">"{s.slice(windowPos.start, windowPos.end + 1)}"</span></div>
            <div>Panjang: {windowLength} karakter</div>
          </div>
        ) : (
          <div>
            <div className="font-semibold">✗ Tidak Ada Window Valid</div>
            <div>String S tidak mengandung semua karakter yang dibutuhkan dari T.</div>
          </div>
        )}
      </div>
    </div>
  );
}
