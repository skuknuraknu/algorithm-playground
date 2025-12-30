import { Check, X } from 'lucide-react';

interface MountainVisualizerProps {
  arr: number[];
  peakIndex?: number;
  isValid?: boolean;
  currentIndex?: number;
  phase?: 'ascending' | 'descending' | 'complete';
}

export default function MountainVisualizer({
  arr,
  peakIndex,
  isValid,
  currentIndex,
  phase,
}: MountainVisualizerProps) {
  const maxHeight = Math.max(...arr, 1);
  const barWidth = Math.min(60, 800 / arr.length);

  return (
    <div className="w-full">
      <div className="flex items-end justify-center gap-1 h-80 bg-gradient-to-b from-slate-50 to-slate-100 rounded-xl p-6 border-2 border-slate-200 shadow-lg">
        {arr.map((height, index) => {
          const isPeak = index === peakIndex;
          const isCurrent = index === currentIndex;
          const isInAscending =
            phase === 'ascending' &&
            currentIndex !== undefined &&
            index <= currentIndex;
          const isInDescending =
            phase === 'descending' &&
            currentIndex !== undefined &&
            peakIndex !== undefined &&
            index > peakIndex &&
            index <= currentIndex;

          const barHeight = (height / maxHeight) * 250;

          let barColor = 'from-slate-300 to-slate-200';
          if (isPeak) {
            barColor = 'from-yellow-500 to-yellow-400';
          } else if (isCurrent) {
            barColor = 'from-blue-600 to-blue-400';
          } else if (isInAscending) {
            barColor = 'from-green-500 to-green-400';
          } else if (isInDescending) {
            barColor = 'from-orange-500 to-orange-400';
          }

          return (
            <div
              key={index}
              className="relative flex flex-col items-center justify-end transition-all duration-300"
              style={{ width: `${barWidth}px` }}
            >
              <div className="absolute -top-6 text-xs font-semibold text-slate-600">
                {height}
              </div>

              <div
                className={`relative transition-all duration-500 rounded-t-lg bg-gradient-to-t ${barColor} ${
                  isPeak || isCurrent ? 'shadow-xl scale-105 z-10' : ''
                }`}
                style={{
                  height: `${barHeight}px`,
                  width: '100%',
                }}
              />

              <div className="mt-1 text-xs text-slate-500">{index}</div>

              {isPeak && (
                <div className="absolute -bottom-8 text-xs font-bold text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full">
                  PEAK
                </div>
              )}
            </div>
          );
        })}
      </div>

      {isValid !== undefined && (
        <div className="mt-6">
          <div
            className={`rounded-lg p-4 shadow-md border-2 ${
              isValid
                ? 'bg-green-50 border-green-300'
                : 'bg-red-50 border-red-300'
            }`}
          >
            <div className="flex items-center gap-3">
              {isValid ? (
                <Check className="text-green-600" size={24} />
              ) : (
                <X className="text-red-600" size={24} />
              )}
              <div>
                <div
                  className={`font-bold text-lg ${
                    isValid ? 'text-green-700' : 'text-red-700'
                  }`}
                >
                  {isValid ? 'Valid Mountain Array' : 'Not a Valid Mountain Array'}
                </div>
                {peakIndex !== undefined && isValid && (
                  <div className="text-sm text-slate-600 mt-1">
                    Peak at index {peakIndex} with value {arr[peakIndex]}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
