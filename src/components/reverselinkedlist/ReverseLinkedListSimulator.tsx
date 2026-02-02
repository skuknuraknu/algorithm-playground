import { useEffect, useMemo, useRef, useState } from 'react';
import { Pause, Play, RotateCcw, SkipForward } from 'lucide-react';
import gsap from 'gsap';
import { useLanguage } from '../../i18n';

interface ReverseLinkedListSimulatorProps {
  list: number[];
}

type Step = {
  index: number;
  prev: number | null;
  curr: number | null;
  next: number | null;
  message: string;
  action: 'init' | 'save' | 'reverse' | 'move' | 'complete';
};

export default function ReverseLinkedListSimulator({ list }: ReverseLinkedListSimulatorProps) {
  const { t } = useLanguage();
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1400);

  const nodeRefs = useRef<HTMLDivElement[]>([]);
  const arrowRefs = useRef<HTMLDivElement[]>([]);
  const infoRef = useRef<HTMLDivElement | null>(null);
  const pointerRefs = useRef<{ prev?: HTMLDivElement, curr?: HTMLDivElement, next?: HTMLDivElement }>({});

  const preparedSteps = useMemo(() => {
    const s: Step[] = [];
    let prev: number | null = null;
    let currIdx = 0;

    s.push({
      index: -1,
      prev: null,
      curr: list[0] ?? null,
      next: list[1] ?? null,
      message: '🚀 Initialize: Start at head with prev = null',
      action: 'init'
    });

    while (currIdx < list.length) {
      const curr = list[currIdx] ?? null;
      const next = list[currIdx + 1] ?? null;

      // Save next
      s.push({
        index: currIdx,
        prev,
        curr,
        next,
        message: `💾 Save next pointer: next = ${next ?? 'null'}`,
        action: 'save'
      });

      // Reverse pointer
      s.push({
        index: currIdx,
        prev,
        curr,
        next,
        message: `🔄 Reverse pointer: ${curr}.next = ${prev ?? 'null'}`,
        action: 'reverse'
      });

      // Move forward
      prev = curr;
      currIdx += 1;
      s.push({
        index: currIdx,
        prev,
        curr: list[currIdx] ?? null,
        next: list[currIdx + 1] ?? null,
        message: `➡️ Move: prev = ${prev}, curr = ${list[currIdx] ?? 'null'}`,
        action: 'move'
      });
    }

    s.push({
      index: currIdx,
      prev,
      curr: null,
      next: null,
      message: `✅ Complete! New head = ${prev ?? 'null'}`,
      action: 'complete'
    });

    return s;
  }, [list]);

  useEffect(() => {
    setSteps(preparedSteps);
    setCurrentStep(0);
    setIsPlaying(false);
  }, [preparedSteps]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && currentStep < steps.length - 1) {
      timer = setTimeout(() => setCurrentStep((s) => s + 1), speed);
    }
    if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, steps.length, speed]);

  // Animate on step change
  useEffect(() => {
    if (!steps[currentStep]) return;

    const step = steps[currentStep];
    const tl = gsap.timeline();

    // Animate message
    if (infoRef.current) {
      tl.fromTo(
        infoRef.current,
        { opacity: 0, y: 10, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: 'back.out(1.7)' }
      );
    }

    // Animate nodes based on action
    nodeRefs.current.forEach((el, i) => {
      if (!el) return;

      const isPrev = list.indexOf(step.prev ?? NaN) === i;
      const isCurr = step.index === i;
      const isNext = list.indexOf(step.next ?? NaN) === i;

      let bgColor = '#ffffff';
      let borderColor = '#e5e7eb';
      let scale = 1;

      if (isCurr) {
        bgColor = step.action === 'reverse' ? '#a78bfa' : '#dbeafe';
        borderColor = step.action === 'reverse' ? '#7c3aed' : '#60a5fa';
        scale = 1.1;
      } else if (isPrev) {
        bgColor = '#d9f99d';
        borderColor = '#84cc16';
      } else if (isNext) {
        bgColor = '#fef08a';
        borderColor = '#eab308';
      }

      tl.to(el, {
        backgroundColor: bgColor,
        borderColor: borderColor,
        scale: scale,
        duration: 0.3,
        ease: 'power2.out'
      }, 0);

      // Special animation for reverse action
      if (isCurr && step.action === 'reverse') {
        tl.to(el, {
          rotation: 360,
          duration: 0.6,
          ease: 'back.out(1.7)'
        }, 0.1);
      }
    });

    // Animate arrows
    arrowRefs.current.forEach((el, i) => {
      if (!el) return;

      const isCurrArrow = step.index === i;

      if (step.action === 'reverse' && isCurrArrow) {
        tl.to(el, {
          scaleX: -1,
          color: '#7c3aed',
          duration: 0.4,
          ease: 'power2.inOut'
        }, 0.2);
      } else {
        tl.to(el, {
          scaleX: 1,
          color: isCurrArrow ? '#60a5fa' : '#94a3b8',
          duration: 0.3
        }, 0);
      }
    });

    // Animate pointers
    Object.entries(pointerRefs.current).forEach(([key, el]) => {
      if (!el) return;

      const isActive =
        (key === 'prev' && step.prev !== null) ||
        (key === 'curr' && step.curr !== null) ||
        (key === 'next' && step.next !== null);

      tl.to(el, {
        scale: isActive ? 1.1 : 0.9,
        opacity: isActive ? 1 : 0.5,
        duration: 0.3
      }, 0);
    });

  }, [currentStep, steps, list]);

  if (list.length === 0) {
    return (
      <div className="bg-amber-50 border-2 border-amber-200 text-amber-800 rounded-xl p-6 text-center">
        <div className="text-4xl mb-3">📝</div>
        <div>Add nodes to start the simulation</div>
      </div>
    );
  }

  const step = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <div className="flex items-center gap-4">
            <div className="text-sm font-semibold text-slate-600">
              {t.step} <span className="text-indigo-600 text-xl">{currentStep + 1}</span> / {steps.length}
            </div>
            <div className="h-6 w-px bg-slate-300" />
            <div className="text-sm text-slate-600">
              Nodes: <span className="font-bold">{list.length}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
              <span className="text-xs text-slate-600 font-semibold">Speed:</span>
              <select
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="bg-transparent text-xs font-semibold text-indigo-600 outline-none cursor-pointer"
              >
                <option value={2000}>0.5x</option>
                <option value={1400}>1x</option>
                <option value={700}>2x</option>
                <option value={350}>4x</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            disabled={currentStep >= steps.length - 1}
            className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 shadow-md ${isPlaying
              ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white'
              : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white'
              } disabled:from-slate-300 disabled:to-slate-400 disabled:cursor-not-allowed active:scale-95`}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            {isPlaying ? t.pause : t.play}
          </button>

          <button
            onClick={() => setCurrentStep(Math.min(currentStep + 1, steps.length - 1))}
            disabled={currentStep >= steps.length - 1}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-5 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all disabled:from-slate-300 disabled:to-slate-400 disabled:cursor-not-allowed shadow-md active:scale-95"
          >
            <SkipForward size={20} />
          </button>

          <button
            onClick={() => { setCurrentStep(0); setIsPlaying(false); }}
            className="bg-gradient-to-r from-slate-600 to-slate-700 text-white px-5 py-3 rounded-lg font-semibold hover:from-slate-700 hover:to-slate-800 transition-all shadow-md active:scale-95"
          >
            <RotateCcw size={20} />
          </button>
        </div>

        <div className="relative w-full bg-slate-200 rounded-full h-3 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Message Display */}
      {step && (
        <div
          ref={infoRef}
          className={`rounded-xl p-6 border-2 shadow-lg transition-all ${step.action === 'init' ? 'bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200' :
            step.action === 'save' ? 'bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200' :
              step.action === 'reverse' ? 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200' :
                step.action === 'move' ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200' :
                  'bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200'
            }`}
        >
          <div className="text-xl font-bold text-slate-800 mb-4">{step.message}</div>
          <div className="grid grid-cols-3 gap-4">
            <div
              ref={el => pointerRefs.current.prev = el as HTMLDivElement}
              className="bg-white p-4 rounded-lg border-2 border-lime-200 transition-all"
            >
              <div className="text-xs font-semibold text-lime-700 mb-1">prev</div>
              <div className="text-2xl font-bold font-mono text-lime-600">
                {step.prev ?? 'null'}
              </div>
            </div>
            <div
              ref={el => pointerRefs.current.curr = el as HTMLDivElement}
              className="bg-white p-4 rounded-lg border-2 border-blue-200 transition-all"
            >
              <div className="text-xs font-semibold text-blue-700 mb-1">curr</div>
              <div className="text-2xl font-bold font-mono text-blue-600">
                {step.curr ?? 'null'}
              </div>
            </div>
            <div
              ref={el => pointerRefs.current.next = el as HTMLDivElement}
              className="bg-white p-4 rounded-lg border-2 border-amber-200 transition-all"
            >
              <div className="text-xs font-semibold text-amber-700 mb-1">next</div>
              <div className="text-2xl font-bold font-mono text-amber-600">
                {step.next ?? 'null'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Linked List Visualization */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-8 shadow-xl border-2 border-slate-700">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-lg font-bold text-white">Linked List State</h4>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-lime-500 rounded"></div>
              <span className="text-slate-300">prev</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span className="text-slate-300">curr</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-amber-500 rounded"></div>
              <span className="text-slate-300">next</span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto pb-4">
          <div className="flex items-center gap-3 min-w-max">
            {list.map((val, idx) => (
              <div key={`${val}-${idx}`} className="flex items-center gap-3">
                <div
                  ref={(el) => (nodeRefs.current[idx] = el as HTMLDivElement)}
                  className="w-20 h-20 rounded-xl border-2 border-slate-200 bg-white shadow-lg flex flex-col items-center justify-center transition-all duration-300"
                >
                  <div className="font-bold text-2xl text-slate-800">{val}</div>
                  <div className="text-[10px] text-slate-400 mt-1">idx {idx}</div>
                </div>
                {idx < list.length - 1 && (
                  <div
                    ref={(el) => (arrowRefs.current[idx] = el as HTMLDivElement)}
                    className="text-slate-400 text-3xl font-bold transition-all duration-300"
                  >
                    →
                  </div>
                )}
              </div>
            ))}
            <div className="text-slate-500 text-sm font-mono ml-2">null</div>
          </div>
        </div>
      </div>
    </div>
  );
}
