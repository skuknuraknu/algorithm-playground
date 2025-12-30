import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { CheckCircle2, Scissors } from 'lucide-react';

interface PalindromePartitionVisualizerProps {
  partitions: string[][];
}

export default function PalindromePartitionVisualizer({ partitions }: PalindromePartitionVisualizerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && partitions.length > 0) {
      const cards = containerRef.current.querySelectorAll('.partition-card');
      
      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 30,
          scale: 0.9,
          rotateX: -20
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'back.out(1.4)',
          clearProps: 'transform'
        }
      );
    }
  }, [partitions]);

  if (partitions.length === 0) {
    return (
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-12 shadow-xl border-2 border-slate-200">
        <div className="text-center text-slate-400">
          <Scissors size={64} className="mx-auto mb-4 opacity-30" />
          <p className="text-lg">Masukkan string untuk melihat partisi palindrome...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-50 to-fuchsia-50 rounded-2xl p-6 shadow-lg border-2 border-purple-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="text-purple-600" size={24} />
            <div>
              <h3 className="text-xl font-bold text-slate-800">Hasil Partisi</h3>
              <p className="text-sm text-slate-500">
                Ditemukan <span className="font-bold text-purple-600">{partitions.length}</span> partisi palindrome
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Partitions Grid */}
      <div ref={containerRef} className="grid gap-4">
        {partitions.map((partition, idx) => (
          <div
            key={idx}
            className="partition-card bg-white rounded-xl p-5 shadow-lg border-2 border-purple-100 hover:border-purple-300 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-fuchsia-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md">
                  {idx + 1}
                </div>
                <span className="text-sm font-semibold text-slate-600">
                  Partisi {idx + 1}
                </span>
              </div>
              <div className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold">
                {partition.length} bagian
              </div>
            </div>
            
            <div className="flex items-center gap-2 flex-wrap">
              {partition.map((part, partIdx) => (
                <div key={partIdx} className="flex items-center">
                  <div className="px-4 py-2 bg-gradient-to-br from-purple-100 to-fuchsia-100 border-2 border-purple-300 rounded-lg font-mono text-purple-800 font-bold shadow-sm">
                    "{part}"
                  </div>
                  {partIdx < partition.length - 1 && (
                    <Scissors className="mx-2 text-slate-300" size={16} />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Summary Card */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border-2 border-emerald-200 shadow-lg">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-sm text-slate-600 mb-1">Total Partisi</p>
            <p className="text-2xl font-bold text-emerald-600">{partitions.length}</p>
          </div>
          <div>
            <p className="text-sm text-slate-600 mb-1">Min Bagian</p>
            <p className="text-2xl font-bold text-teal-600">
              {Math.min(...partitions.map(p => p.length))}
            </p>
          </div>
          <div>
            <p className="text-sm text-slate-600 mb-1">Max Bagian</p>
            <p className="text-2xl font-bold text-cyan-600">
              {Math.max(...partitions.map(p => p.length))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
