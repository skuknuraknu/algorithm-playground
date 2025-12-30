import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, SkipForward, ArrowRight, GitMerge } from 'lucide-react';
import gsap from 'gsap';
import { useLanguage } from '../../i18n';

interface MergeTwoListsSimulatorProps {
  list1: number[];
  list2: number[];
}

interface Step {
  l1Index: number;
  l2Index: number;
  merged: number[];
  message: string;
  comparing: boolean;
}

export default function MergeTwoListsSimulator({ list1, list2 }: MergeTwoListsSimulatorProps) {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [steps, setSteps] = useState<Step[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    generateSteps();
  }, [list1, list2]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && currentStep < steps.length - 1) {
      timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 1500);
    } else if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, steps.length]);

  useEffect(() => {
    if (containerRef.current) {
      const ctx = gsap.context(() => {
        gsap.from('.sim-card', {
          opacity: 0,
          y: 20,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out'
        });
      }, containerRef);
      return () => ctx.revert();
    }
  }, []);

  const generateSteps = () => {
    const newSteps: Step[] = [];
    let i = 0;
    let j = 0;
    const merged: number[] = [];

    newSteps.push({
      l1Index: 0,
      l2Index: 0,
      merged: [],
      message: 'Mulai dengan dua pointer di awal kedua list.',
      comparing: false
    });

    while (i < list1.length && j < list2.length) {
      newSteps.push({
        l1Index: i,
        l2Index: j,
        merged: [...merged],
        message: `Bandingkan ${list1[i]} dan ${list2[j]}`,
        comparing: true
      });

      if (list1[i] <= list2[j]) {
        merged.push(list1[i]);
        newSteps.push({
          l1Index: i + 1,
          l2Index: j,
          merged: [...merged],
          message: `${list1[i]} <= ${list2[j]}, tambahkan ${list1[i]} ke hasil dan majukan pointer List 1.`,
          comparing: false
        });
        i++;
      } else {
        merged.push(list2[j]);
        newSteps.push({
          l1Index: i,
          l2Index: j + 1,
          merged: [...merged],
          message: `${list2[j]} < ${list1[i]}, tambahkan ${list2[j]} ke hasil dan majukan pointer List 2.`,
          comparing: false
        });
        j++;
      }
    }

    if (i < list1.length) {
      newSteps.push({
        l1Index: i,
        l2Index: j,
        merged: [...merged],
        message: 'List 2 habis. Sambungkan sisa List 1 ke hasil.',
        comparing: false
      });
      while (i < list1.length) {
        merged.push(list1[i]);
        i++;
      }
    } else if (j < list2.length) {
      newSteps.push({
        l1Index: i,
        l2Index: j,
        merged: [...merged],
        message: 'List 1 habis. Sambungkan sisa List 2 ke hasil.',
        comparing: false
      });
      while (j < list2.length) {
        merged.push(list2[j]);
        j++;
      }
    }

    newSteps.push({
      l1Index: i,
      l2Index: j,
      merged: [...merged],
      message: 'Selesai! Semua node telah digabungkan.',
      comparing: false
    });

    setSteps(newSteps);
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const step = steps[currentStep];
  if (!step) return <div>Loading...</div>;

  return (
    <div ref={containerRef} className="space-y-6">
      {/* Controls */}
      <div className="sim-card flex flex-wrap gap-4 justify-center mb-8">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white shadow-lg transition-all ${
            isPlaying
              ? 'bg-orange-500 hover:bg-orange-600'
              : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          {isPlaying ? t.pause : t.play}
        </button>

        <button
          onClick={() => {
            if (currentStep < steps.length - 1) {
              setCurrentStep(prev => prev + 1);
              setIsPlaying(false);
            }
          }}
          disabled={currentStep >= steps.length - 1}
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-blue-500 hover:bg-blue-600 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <SkipForward size={20} />
          Langkah Berikutnya
        </button>

        <button
          onClick={() => {
            setCurrentStep(0);
            setIsPlaying(false);
          }}
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-slate-500 hover:bg-slate-600 shadow-lg"
        >
          <RotateCcw size={20} />
          Ulang
        </button>
      </div>

      {/* Message */}
      <div className="sim-card bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border-2 border-indigo-200 text-center shadow-md">
        <p className="text-lg font-semibold text-slate-800">{step.message}</p>
      </div>

      {/* Visualization */}
      <div className="sim-card bg-white p-6 rounded-xl border-2 border-slate-200 shadow-lg space-y-8">
        {/* List 1 */}
        <div className="relative">
          <div className="text-sm font-bold text-slate-500 mb-2">List 1</div>
          <div className="flex items-center gap-2 overflow-x-auto pb-4">
            {list1.map((val, idx) => (
              <React.Fragment key={idx}>
                <div className={`relative w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                  idx === step.l1Index 
                    ? 'bg-blue-500 text-white border-blue-600 scale-110 shadow-lg ring-4 ring-blue-200' 
                    : idx < step.l1Index
                      ? 'bg-slate-100 text-slate-400 border-slate-300'
                      : 'bg-blue-50 text-blue-700 border-blue-300'
                }`}>
                  {val}
                  {idx === step.l1Index && (
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded whitespace-nowrap">
                      Pointer 1
                    </div>
                  )}
                </div>
                {idx < list1.length - 1 && <ArrowRight className="text-slate-300" size={20} />}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* List 2 */}
        <div className="relative">
          <div className="text-sm font-bold text-slate-500 mb-2">List 2</div>
          <div className="flex items-center gap-2 overflow-x-auto pb-4">
            {list2.map((val, idx) => (
              <React.Fragment key={idx}>
                <div className={`relative w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                  idx === step.l2Index 
                    ? 'bg-purple-500 text-white border-purple-600 scale-110 shadow-lg ring-4 ring-purple-200' 
                    : idx < step.l2Index
                      ? 'bg-slate-100 text-slate-400 border-slate-300'
                      : 'bg-purple-50 text-purple-700 border-purple-300'
                }`}>
                  {val}
                  {idx === step.l2Index && (
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold text-purple-600 bg-purple-100 px-2 py-1 rounded whitespace-nowrap">
                      Pointer 2
                    </div>
                  )}
                </div>
                {idx < list2.length - 1 && <ArrowRight className="text-slate-300" size={20} />}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Merged Result */}
        <div className="border-t-2 border-slate-100 pt-6">
          <div className="text-sm font-bold text-green-600 mb-2 flex items-center gap-2">
            <GitMerge size={16} />
            Hasil Gabungan
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-4 min-h-[80px]">
            {step.merged.length === 0 ? (
              <div className="text-slate-400 italic text-sm">Belum ada node yang digabungkan...</div>
            ) : (
              step.merged.map((val, idx) => (
                <React.Fragment key={idx}>
                  <div className="w-12 h-12 rounded-full border-2 bg-green-100 border-green-500 text-green-700 flex items-center justify-center font-bold text-lg shadow-sm animate-in fade-in zoom-in duration-300">
                    {val}
                  </div>
                  <ArrowRight className="text-green-300" size={20} />
                </React.Fragment>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
