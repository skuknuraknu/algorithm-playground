import { useEffect, useRef } from 'react';
import { Layers } from 'lucide-react';
import gsap from 'gsap';

interface GroupAnagramsVisualizerProps {
  strs: string[];
}

export default function GroupAnagramsVisualizer({ strs }: GroupAnagramsVisualizerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const groupsRef = useRef<HTMLDivElement[]>([]);

  // Logic to group anagrams
  const groupAnagrams = (strs: string[]): string[][] => {
    const map = new Map<string, string[]>();
    
    for (const s of strs) {
      const key = s.split('').sort().join('');
      if (!map.has(key)) {
        map.set(key, []);
      }
      map.get(key)?.push(s);
    }
    
    return Array.from(map.values());
  };

  const groupedAnagrams = groupAnagrams(strs);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, []);

  useEffect(() => {
    if (groupsRef.current.length > 0) {
      gsap.fromTo(groupsRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, stagger: 0.1, ease: "back.out(1.7)" }
      );
    }
  }, [strs]);

  return (
    <div ref={containerRef} className="space-y-8">
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border-2 border-indigo-200 shadow-md">
        <div className="flex items-center gap-3 mb-6">
          <Layers className="text-indigo-600" size={32} />
          <div>
            <h3 className="text-xl font-bold text-indigo-900">Anagram Groups</h3>
            <p className="text-slate-600">Visualizing how strings are grouped by their sorted characters</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {groupedAnagrams.map((group, groupIndex) => {
            const key = group[0].split('').sort().join('');
            return (
              <div
                key={groupIndex}
                ref={el => { if (el) groupsRef.current[groupIndex] = el }}
                className="bg-white rounded-lg p-4 shadow-sm border-2 border-indigo-100 hover:border-indigo-300 transition-colors"
              >
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Key</span>
                  <code className="bg-slate-100 px-2 py-0.5 rounded text-sm font-mono text-indigo-600 font-bold">
                    {key}
                  </code>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.map((str, strIndex) => (
                    <div
                      key={strIndex}
                      className="bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-md font-mono text-sm font-medium border border-indigo-200"
                    >
                      {str}
                    </div>
                  ))}
                </div>
                <div className="mt-3 text-right">
                  <span className="text-xs text-slate-400 font-medium">
                    Count: {group.length}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {groupedAnagrams.length === 0 && (
          <div className="text-center py-12 text-slate-400 italic">
            Add strings to see them grouped here
          </div>
        )}
      </div>
    </div>
  );
}
