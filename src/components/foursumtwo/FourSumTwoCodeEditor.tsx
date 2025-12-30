import { gsap } from 'gsap';
import { useEffect, useRef, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { duotoneSpace } from 'react-syntax-highlighter/dist/esm/styles/prism';

const codeLines = [
  { line: 'function fourSumCount(A, B, C, D) {', explanation: '📦 Fungsi utama menerima 4 array input' },
  { line: '  const map = new Map();', explanation: '🗺️ Buat hash map untuk menyimpan sum A+B' },
  { line: '  for (const a of A) {', explanation: '🔄 Loop pertama: iterasi array A' },
  { line: '    for (const b of B) {', explanation: '🔄 Loop kedua: iterasi array B (nested)' },
  { line: '      const sum = a + b;', explanation: '➕ Hitung jumlah a + b' },
  { line: '      map.set(sum, (map.get(sum) || 0) + 1);', explanation: '💾 Simpan sum dengan frekuensinya di map' },
  { line: '    }', explanation: '' },
  { line: '  }', explanation: '✅ Selesai membangun hash map A+B' },
  { line: '', explanation: '' },
  { line: '  let count = 0;', explanation: '🔢 Inisialisasi counter untuk tuple valid' },
  { line: '  for (const c of C) {', explanation: '🔍 Loop ketiga: iterasi array C' },
  { line: '    for (const d of D) {', explanation: '🔍 Loop keempat: iterasi array D (nested)' },
  { line: '      const complement = - (c + d);', explanation: '🎯 Hitung komplemen: -(c + d)' },
  { line: '      if (map.has(complement)) {', explanation: '❓ Cek apakah komplemen ada di map' },
  { line: '        count += map.get(complement);', explanation: '✨ Tambahkan frekuensi ke counter!' },
  { line: '      }', explanation: '' },
  { line: '    }', explanation: '' },
  { line: '  }', explanation: '✅ Selesai mencari semua komplemen' },
  { line: '', explanation: '' },
  { line: '  return count; // O(n²)', explanation: '🏁 Return total tuple yang valid' },
  { line: '}', explanation: '' },
];

const fullCode = codeLines.map(l => l.line).join('\n');

type CodeVariant = 'hashmap' | 'bruteforce' | 'optimized';

const variants: Record<CodeVariant, { title: string; code: string; complexity: string; badge: string }> = {
  hashmap: {
    title: 'Hash Map Approach',
    badge: '⭐ Recommended',
    complexity: 'O(n²)',
    code: fullCode,
  },
  bruteforce: {
    title: 'Brute Force',
    badge: '🐌 Slow',
    complexity: 'O(n⁴)',
    code: `function fourSumCount(A, B, C, D) {
  let count = 0;
  
  // 4 nested loops - O(n⁴)
  for (const a of A) {
    for (const b of B) {
      for (const c of C) {
        for (const d of D) {
          if (a + b + c + d === 0) {
            count++;
          }
        }
      }
    }
  }
  
  return count;
}`,
  },
  optimized: {
    title: 'With Early Exit',
    badge: '🚀 Optimized',
    complexity: 'O(n²)',
    code: `function fourSumCount(A, B, C, D) {
  // Store smaller pair in map for memory efficiency
  const [small1, small2] = A.length * B.length <= C.length * D.length 
    ? [A, B] : [C, D];
  const [large1, large2] = A.length * B.length <= C.length * D.length 
    ? [C, D] : [A, B];
  
  const map = new Map();
  for (const x of small1) {
    for (const y of small2) {
      const sum = x + y;
      map.set(sum, (map.get(sum) || 0) + 1);
    }
  }

  let count = 0;
  for (const x of large1) {
    for (const y of large2) {
      count += map.get(-(x + y)) || 0;
    }
  }
  
  return count;
}`,
  },
};

export default function FourSumTwoCodeEditor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeVariant, setActiveVariant] = useState<CodeVariant>('hashmap');
  const [highlightedLine, setHighlightedLine] = useState<number | null>(null);
  const [isWalking, setIsWalking] = useState(false);
  const walkIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
    );
  }, [activeVariant]);

  const startCodeWalk = () => {
    if (activeVariant !== 'hashmap') return;
    
    setIsWalking(true);
    setHighlightedLine(0);

    let step = 0;
    walkIntervalRef.current = setInterval(() => {
      step++;
      if (step >= codeLines.length) {
        setIsWalking(false);
        setHighlightedLine(null);
        if (walkIntervalRef.current) clearInterval(walkIntervalRef.current);
        return;
      }
      setHighlightedLine(step);
    }, 1200);
  };

  const stopCodeWalk = () => {
    setIsWalking(false);
    setHighlightedLine(null);
    if (walkIntervalRef.current) {
      clearInterval(walkIntervalRef.current);
    }
  };

  useEffect(() => {
    return () => {
      if (walkIntervalRef.current) {
        clearInterval(walkIntervalRef.current);
      }
    };
  }, []);

  // Get current explanation
  const currentExplanation = activeVariant === 'hashmap' && highlightedLine !== null
    ? codeLines[highlightedLine]?.explanation
    : null;

  return (
    <div ref={containerRef} className="space-y-4">
      {/* Variant Selector */}
      <div className="flex flex-wrap gap-2">
        {(Object.keys(variants) as CodeVariant[]).map((variant) => (
          <button
            key={variant}
            onClick={() => {
              stopCodeWalk();
              setActiveVariant(variant);
            }}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
              activeVariant === variant
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {variants[variant].title}
          </button>
        ))}
      </div>

      {/* Code Container */}
      <div className="bg-slate-900 rounded-xl overflow-hidden shadow-xl border border-slate-800">
        {/* Header */}
        <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="text-xs uppercase tracking-[0.2em] text-slate-400">
              {variants[activeVariant].title}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 text-xs rounded font-semibold ${
              activeVariant === 'hashmap' 
                ? 'bg-emerald-500/20 text-emerald-400'
                : activeVariant === 'bruteforce'
                ? 'bg-red-500/20 text-red-400'
                : 'bg-blue-500/20 text-blue-400'
            }`}>
              {variants[activeVariant].badge}
            </span>
            <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded font-mono">
              {variants[activeVariant].complexity}
            </span>
          </div>
        </div>

        {/* Code Walk Controls (only for hashmap) */}
        {activeVariant === 'hashmap' && (
          <div className="px-4 py-2 bg-slate-900/50 border-b border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400">
              💡 Klik "Walk Through" untuk penjelasan baris per baris
            </span>
            <button
              onClick={isWalking ? stopCodeWalk : startCodeWalk}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                isWalking
                  ? 'bg-red-500 text-white'
                  : 'bg-indigo-500 text-white hover:bg-indigo-600'
              }`}
            >
              {isWalking ? '⏹ Stop' : '▶️ Walk Through'}
            </button>
          </div>
        )}

        {/* Code with line highlighting */}
        {activeVariant === 'hashmap' ? (
          <div className="relative">
            <div className="overflow-x-auto">
              <pre className="p-4 text-sm font-mono">
                {codeLines.map((item, idx) => (
                  <div
                    key={idx}
                    className={`px-2 py-0.5 rounded transition-all duration-300 ${
                      highlightedLine === idx
                        ? 'bg-indigo-500/30 border-l-2 border-indigo-400'
                        : 'hover:bg-slate-800/50 border-l-2 border-transparent'
                    }`}
                    onMouseEnter={() => !isWalking && setHighlightedLine(idx)}
                    onMouseLeave={() => !isWalking && setHighlightedLine(null)}
                  >
                    <span className="text-slate-500 select-none w-6 inline-block text-right mr-4">
                      {idx + 1}
                    </span>
                    <code 
                      className="text-slate-300"
                      dangerouslySetInnerHTML={{
                        __html: highlightCode(item.line)
                      }}
                    />
                  </div>
                ))}
              </pre>
            </div>

            {/* Explanation tooltip */}
            {currentExplanation && (
              <div className="absolute bottom-4 left-4 right-4 bg-slate-800 border border-slate-700 rounded-lg p-3 shadow-xl animate-fadeIn">
                <div className="flex items-center gap-2">
                  <span className="text-indigo-400 text-sm font-semibold">Line {highlightedLine! + 1}:</span>
                  <span className="text-slate-300 text-sm">{currentExplanation}</span>
                </div>
              </div>
            )}
          </div>
        ) : (
          <SyntaxHighlighter 
            language="javascript" 
            style={duotoneSpace} 
            customStyle={{ margin: 0, padding: '16px', background: 'transparent' }}
            showLineNumbers
            lineNumberStyle={{ color: '#475569', fontSize: '12px' }}
          >
            {variants[activeVariant].code}
          </SyntaxHighlighter>
        )}
      </div>

      {/* Key Insights */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-xl p-4">
          <h4 className="font-bold text-indigo-900 mb-2 flex items-center gap-2">
            <span>🧠</span> Key Insight
          </h4>
          <p className="text-sm text-indigo-800">
            Kunci dari solusi ini adalah <strong>membagi 4 array menjadi 2 pasangan</strong>. 
            Dengan menyimpan sum A+B di hash map, kita bisa mencari komplemen -(C+D) dalam O(1)!
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-xl p-4">
          <h4 className="font-bold text-emerald-900 mb-2 flex items-center gap-2">
            <span>⚡</span> Mengapa O(n²)?
          </h4>
          <p className="text-sm text-emerald-800">
            Meskipun ada 4 array, kita hanya perlu <strong>2 nested loops × 2</strong>. 
            Hash map lookup adalah O(1), jadi total: O(n²) + O(n²) = O(n²)
          </p>
        </div>
      </div>

      {/* Code Pattern Box */}
      <div className="bg-slate-900 rounded-xl p-5 border border-slate-800">
        <h4 className="font-bold text-white mb-3 flex items-center gap-2">
          <span>📝</span> Pattern: Meet in the Middle
        </h4>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <span className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">1</span>
            <div>
              <div className="text-indigo-400 font-semibold text-sm">Build Phase</div>
              <code className="text-xs text-slate-400">map[a + b]++ untuk semua kombinasi</code>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">2</span>
            <div>
              <div className="text-amber-400 font-semibold text-sm">Search Phase</div>
              <code className="text-xs text-slate-400">count += map[-(c + d)] untuk semua kombinasi</code>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">3</span>
            <div>
              <div className="text-emerald-400 font-semibold text-sm">Result</div>
              <code className="text-xs text-slate-400">return count (total valid tuples)</code>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Problems */}
      <div className="bg-slate-100 rounded-xl p-4 border-2 border-slate-200">
        <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
          <span>🔗</span> Similar Problems
        </h4>
        <div className="flex flex-wrap gap-2">
          {['Two Sum', '3Sum', '4Sum', 'Subarray Sum Equals K'].map((problem) => (
            <span 
              key={problem}
              className="px-3 py-1.5 bg-white text-slate-700 rounded-lg text-sm border border-slate-300 hover:border-indigo-300 hover:bg-indigo-50 transition-colors cursor-pointer"
            >
              {problem}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

// Simple syntax highlighting helper
function highlightCode(line: string): string {
  return line
    .replace(/\b(function|const|let|var|for|if|return|of)\b/g, '<span style="color: #c792ea;">$1</span>')
    .replace(/\b(map|Map)\b/g, '<span style="color: #82aaff;">$1</span>')
    .replace(/(\/\/.*$)/g, '<span style="color: #676e95;">$1</span>')
    .replace(/(\d+)/g, '<span style="color: #f78c6c;">$1</span>')
    .replace(/(['"].*?['"])/g, '<span style="color: #c3e88d;">$1</span>');
}
